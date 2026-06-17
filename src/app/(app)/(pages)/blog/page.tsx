import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { getAllDocs } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"
import { BlogFilter } from "./blog-filter"

const title = "博客"
const description = "热爱是创作的种子，创作是表达热爱的语言。这里还放了一些我的历史作品，这些作品代表了我在不同阶段的设计成果。或许它们并不完美，但正是它们让我不断进步，帮助我变得更好。"

const ogImage = `/og/simple?title=${encodeURIComponent("Blog")}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    type: "website",
    images: { url: ogImage, width: 1200, height: 630, alt: title },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

function getAllTags(posts: Doc[]): string[] {
  const tags = new Set<string>()
  for (const p of posts) {
    for (const t of p.metadata.tags ?? []) tags.add(t)
  }
  return Array.from(tags)
}

export default function Page() {
  const allPosts = getAllDocs()
  const allTags = getAllTags(allPosts)

  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ])}
      />

      <div className="screen-line-before mx-auto md:max-w-3xl" />
      <div className="stripe-divider screen-line-after mx-auto md:max-w-3xl" />

      <div className="min-h-svh">
        <div className="screen-line-after px-4">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>

        <div className="px-3 py-4 sm:px-4">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <BlogFilter allPosts={allPosts} allTags={allTags} />
      </div>

      <div className="screen-line-before mx-auto" />
      <div className="stripe-divider mx-auto" />
    </>
  )
}
