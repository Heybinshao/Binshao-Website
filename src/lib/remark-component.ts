import fs from "node:fs"
import path from "node:path"
import { visit } from "unist-util-visit"

import type { UnistNode, UnistTree } from "@/types/unist"

import { fixImport } from "./registry"

export function remarkComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode, index, parent) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string
          value?: string
          type?: string
        }) || {}

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined

        if (!name && !srcPath) {
          return null
        }

        try {
          let src: string

          if (srcPath) {
            src = path.join(/*turbopackIgnore: true*/ process.cwd(), srcPath)
          } else {
            // Registry has been removed - component not found
            console.error(
              `Component "${name}" not found (registry removed). Skipping ComponentSource.`
            )
            return null
          }

          // Read the source file.
          const filePath = src
          let source = fs.readFileSync(
            /*turbopackIgnore: true*/ filePath,
            "utf8"
          )

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = fixImport(source)

          const title = getNodeAttributeByName(node, "title")
          const showLineNumbers = getNodeAttributeByName(
            node,
            "showLineNumbers"
          )

          const codeBlock = {
            type: "code",
            meta: [
              title ? `title="${title.value}"` : "",
              showLineNumbers ? "showLineNumbers" : "",
            ].join(" "),
            lang: path.extname(filePath).slice(1),
            value: source,
          }

          if (parent && typeof index === "number") {
            parent.children.splice(index, 1, codeBlock)
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string

        if (!name) {
          return null
        }

        // Registry has been removed - skip ComponentPreview
        console.error(
          `Component "${name}" not found (registry removed). Skipping ComponentPreview.`
        )
      }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}
