import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { getDocBySlug } from "@/features/doc/data/documents"
import { X_HANDLE } from "@/config/site"
import { MDXContent } from "./mdx-content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getDocBySlug(slug)
  if (!post) return {}

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      url: `/blog/${slug}`,
      type: "article",
      images: post.metadata.image
        ? { url: post.metadata.image, width: 1200, height: 630 }
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getDocBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <div className="screen-line-before mx-auto md:max-w-3xl" />
      <div className="stripe-divider screen-line-after mx-auto md:max-w-3xl" />

      <article className="min-h-svh">
        {/* Back link */}
        <div className="screen-line-after px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="size-3.5" />
            返回博客
          </Link>
        </div>

        {/* Title */}
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-3xl font-semibold">{post.metadata.title}</h1>
          {post.metadata.tags && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.metadata.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 text-xs text-muted-foreground dark:bg-zinc-900"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <time className="mt-2 block text-sm text-muted-foreground">
            {new Date(post.metadata.createdAt).toISOString().slice(0, 10).replace(/-/g, ".")}
          </time>
        </div>

        {/* Cover image */}
        {post.metadata.image && (
          <div className="px-4 pb-6">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10"
            />
          </div>
        )}

        {/* Content */}
        <div className="border-t border-edge px-4 py-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXContent content={post.content} />
          </div>
        </div>
      </article>
    </>
  )
}
