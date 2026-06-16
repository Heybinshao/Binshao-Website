"use client"

import { useRef } from "react"
import { motion } from "motion/react"

import { registryConfig } from "@/config/registry"
import type { PackageManager } from "@/hooks/use-package-manager"
import { usePackageManager } from "@/hooks/use-package-manager"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "./base/ui/tabs"
import { CopyButton } from "./copy-button"
import { getIconForPackageManager } from "./icons"

function IconSwap({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function IconSwapItem({ children, className, key }: { children: React.ReactNode; className?: string; key?: string }) {
  return <span className={className} key={key}>{children}</span>
}

const registryItemNames: string[] = []

export function RegistryCommandAnimated() {
  const [packageManager, setPackageManager] = usePackageManager()

  const currentItemRef = useRef(registryItemNames[0])

  return (
    <div className="relative overflow-hidden">
      <Tabs
        className="gap-0"
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as PackageManager)
        }}
      >
        <div className="px-4 shadow-[inset_0_-1px_0_0] shadow-line">
          <TabsList className="h-10 rounded-none bg-transparent p-0 inset-ring-0 dark:bg-transparent [&_svg]:size-4 [&_svg]:text-muted-foreground">
            <IconSwap>
              <IconSwapItem className="mr-2" key={packageManager}>
                {getIconForPackageManager(packageManager)}
              </IconSwapItem>
            </IconSwap>

            {Object.entries({ pnpm: "pnpm", yarn: "yarn", npm: "npm", bun: "bun" }).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="h-7 rounded-lg p-0 px-2 font-mono"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              )
            })}

            <TabsIndicator className="h-0.5 translate-y-0 rounded-none bg-foreground ring-0 dark:bg-foreground" />
          </TabsList>
        </div>

        <pre className="-translate-y-px p-4">
          <code
            data-language="bash"
            className="block font-mono text-sm text-muted-foreground max-sm:leading-6"
          >
            {Object.entries({ pnpm: "pnpm dlx", yarn: "yarn", npm: "npx", bun: "bunx --bun" }).map(([key, command]) => {
              return (
                <TabsContent
                  key={key}
                  value={key}
                  render={<span className="block sm:inline-block" />}
                >
                  {command} shadcn add{" "}
                  <span className="select-none sm:hidden" aria-hidden="true">
                    \
                  </span>
                </TabsContent>
              )
            })}

            <span>{registryConfig.namespace}/</span>

            <span className="text-foreground">
              [component-name]
            </span>
          </code>
        </pre>
      </Tabs>

      <CopyButton
        className="absolute top-1.5 right-1.5 z-10 size-7 border-none text-muted-foreground"
        variant="ghost"
        size="icon-sm"
        text={() => {
          const baseCommand = { pnpm: "pnpm dlx", yarn: "yarn", npm: "npx", bun: "bunx --bun" }[packageManager] || "pnpm dlx"
          return `${baseCommand} shadcn@latest add ${registryConfig.namespace}/[component-name]`
        }}
        event="copy_npm_command"
      />
    </div>
  )
}
