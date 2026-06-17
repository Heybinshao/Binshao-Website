"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import type { Components } from "react-markdown"

const components: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-edge text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/50">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-edge px-3 py-2 text-left font-medium">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-edge px-3 py-2">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg border border-edge bg-muted/30 p-4 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const content = Array.isArray(children) ? children.join('') : String(children || '')
    const isInline = !className && !content.includes('\n')
    if (isInline) {
      return (
        <code
          className="rounded-md border bg-muted/50 px-1.5 py-0.5 text-sm font-normal before:content-none after:content-none"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-line pl-4 text-muted-foreground not-italic">
      {children}
    </blockquote>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-lg font-semibold tracking-tight">{children}</h3>
  ),
  hr: () => <hr className="my-8 border-line" />,
}

export function MDXContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
}
