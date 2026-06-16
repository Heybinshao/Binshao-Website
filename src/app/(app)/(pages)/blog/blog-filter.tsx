"use client"

import { Suspense, useState, useMemo } from "react"

import type { Doc } from "@/features/doc/types/document"
import { PostList } from "@/features/blog/components/post-list"
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search"

export function BlogFilter({
  allPosts,
  allTags,
}: {
  allPosts: Doc[]
  allTags: string[]
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts
    return allPosts.filter((post) =>
      (post.metadata.tags ?? []).includes(activeTag)
    )
  }, [allPosts, activeTag])

  return (
    <>
      <div className="screen-line-before screen-line-after p-2">
        <div
          role="group"
          aria-label="Filter posts by category"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">筛选:</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`inline-flex items-center rounded-lg border px-2 py-1 text-sm transition-[background-color,border-color] ease-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none ${
              activeTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-zinc-50 text-muted-foreground hover:border-foreground/30 hover:text-foreground dark:bg-zinc-900"
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`inline-flex items-center rounded-lg border px-2 py-1 text-sm transition-[background-color,border-color] ease-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none ${
                activeTag === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-zinc-50 text-muted-foreground hover:border-foreground/30 hover:text-foreground dark:bg-zinc-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Suspense fallback={<PostList posts={allPosts} />}>
        <PostListWithSearch posts={filteredPosts} />
      </Suspense>
    </>
  )
}
