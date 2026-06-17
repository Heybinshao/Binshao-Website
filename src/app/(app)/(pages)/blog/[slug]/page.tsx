import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { getDocBySlug, findNeighbour, getAllDocs } from "@/features/doc/data/documents"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { X_HANDLE } from "@/config/site"
import { MDXContent } from "./mdx-content"
import { DocShareMenu } from "@/features/doc/components/doc-share-menu"
import { Button } from "@/components/ui/button"
import { CopyMDButton } from "./copy-md-button"

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

  const allPosts = getAllDocs()
  const { previous, next } = findNeighbour(allPosts, slug)

  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.metadata.title, href: `/blog/${slug}` },
        ])}
      />

      <div className="screen-line-before mx-auto md:max-w-3xl" />
      <div className="stripe-divider screen-line-after mx-auto md:max-w-3xl" />

      <div className="min-h-svh">
        {/* Toolbar */}
        <div className="screen-line-after flex items-center justify-between p-2 pl-4">
          <Button variant="link" size="sm" asChild>
            <Link href="/blog" className="gap-2 font-mono text-muted-foreground hover:text-foreground border-none px-0">
              <ArrowLeftIcon className="size-3.5" />
              Blog
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <CopyMDButton content={post.content} />
            <DocShareMenu title={post.metadata.title} url={`/blog/${slug}`} />
            {previous ? (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={`/blog/${previous.slug}` as any} aria-label="Previous">
                  <ArrowLeftIcon className="size-3.5" />
                </Link>
              </Button>
            ) : (
              <Button variant="secondary" size="icon-sm" disabled aria-label="No previous">
                <ArrowLeftIcon className="size-3.5" />
              </Button>
            )}
            {next ? (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={`/blog/${next.slug}` as any} aria-label="Next">
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Button>
            ) : (
              <Button variant="secondary" size="icon-sm" disabled aria-label="No next">
                <ArrowRightIcon className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        <div className="stripe-divider screen-line-after mx-auto md:max-w-3xl" />

        {post.metadata.image && (
          <div className="px-4 pt-4">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full rounded-xl object-cover ring-1 ring-black/10 ring-inset dark:ring-white/10"
            />
          </div>
        )}

        <div className="screen-line-after px-4 pt-6 pb-4">
          <h1 className="text-3xl font-semibold">{post.metadata.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.metadata.createdAt}>
              {new Date(post.metadata.createdAt).toISOString().slice(0, 10).replace(/-/g, ".")}
            </time>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <span className="flex flex-wrap gap-1.5">
                {post.metadata.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 text-xs text-muted-foreground dark:bg-zinc-900">{tag}</span>
                ))}
              </span>
            )}
          </div>
        </div>

        <div className="stripe-divider screen-line-after mx-auto h-4" />

        <div className="screen-line-after px-4 py-6">
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXContent content={post.content} />
          </article>
        </div>

        <div className="stripe-divider screen-line-after mx-auto h-4" />

        <div className="screen-line-after flex items-center justify-between p-2 pl-4">
          <Button variant="link" size="sm" asChild>
            <Link href="/blog" className="gap-2 font-mono text-muted-foreground hover:text-foreground border-none px-0">
              <ArrowLeftIcon className="size-3.5" />
              Blog
            </Link>
          </Button>
          <div className="flex items-center gap-1">
            {previous && (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={`/blog/${previous.slug}` as any} aria-label={`Previous: ${previous.metadata.title}`}>
                  <ArrowLeftIcon className="size-3.5" />
                </Link>
              </Button>
            )}
            {next && (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={`/blog/${next.slug}` as any} aria-label={`Next: ${next.metadata.title}`}>
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="screen-line-before mx-auto" />
      <div className="stripe-divider mx-auto" />
    </>
  )
}
