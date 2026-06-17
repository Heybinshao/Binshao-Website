import type { ImageProps } from "next/image"
import Image from "next/image"
import Link from "next/link"

import type { Doc } from "@/features/doc/types/document"

type HeadingTypes = "h2" | "h3" | "h4"

export function PostItem({
  post,
  headingAs,
  imageLoading = "lazy",
}: {
  post: Doc
  headingAs?: HeadingTypes
  imageLoading?: ImageProps["loading"]
}) {
  const Heading = headingAs ?? "h2"

  return (
    <Link
      href={`/blog/${post.slug}` as any as React.ComponentPropsWithoutRef<typeof Link>['href']}
      className="group/post flex flex-col gap-2 p-2 max-sm:screen-line-before max-sm:screen-line-after sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
    >
      {post.metadata.image && (
        <div className="relative select-none [&_img]:aspect-1200/630 [&_img]:rounded-xl">
          <Image
            className="rounded-xl object-cover"
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1200}
            height={630}
            quality={100}
            loading={imageLoading}
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <Heading className="text-lg leading-snug font-medium underline-offset-4 group-hover/post:underline line-clamp-2">
          {post.metadata.title}
        </Heading>

        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {post.metadata.tags?.map((tag: string) => (
              <span
                key={tag}
                data-slot="tag"
                className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 text-xs text-muted-foreground dark:bg-zinc-900"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="shrink-0 text-sm text-muted-foreground">
            <dt className="sr-only">Published on</dt>
            <dd>
              <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
                {new Date(post.metadata.createdAt)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, ".")}
              </time>
            </dd>
          </dl>
        </div>
      </div>
    </Link>
  )
}
