"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"

export function MDXContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        h2: ({ children, ...props }) => (
          <h2 className="mt-8 mb-4 text-2xl font-semibold" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="mt-6 mb-3 text-xl font-semibold" {...props}>
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p className="mb-4 leading-relaxed" {...props}>
            {children}
          </p>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code
                className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono dark:bg-zinc-800"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <pre className="mb-4 overflow-x-auto rounded-lg border bg-zinc-50 p-4 text-sm dark:bg-zinc-900 dark:border-zinc-700">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          )
        },
        pre: ({ children }) => <>{children}</>,
        ul: ({ children, ...props }) => (
          <ul className="mb-4 list-disc pl-6 space-y-1" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mb-4 list-decimal pl-6 space-y-1" {...props}>
            {children}
          </ol>
        ),
        a: ({ children, href, ...props }) => (
          <a
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="mb-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-600 dark:text-zinc-400"
            {...props}
          >
            {children}
          </blockquote>
        ),
        img: ({ src, alt, ...props }) => (
          <img
            src={src}
            alt={alt || ""}
            className="my-4 rounded-lg"
            {...props}
          />
        ),
        hr: () => <hr className="my-8 border-edge" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
