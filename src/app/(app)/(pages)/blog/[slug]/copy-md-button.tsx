"use client"

import { useState } from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

export function CopyMDButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-1.5 h-7 px-2 rounded-lg text-[0.8125rem] font-medium whitespace-nowrap border-none bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-none transition-all select-none"
    >
      {copied ? (
        <IconCheck className="size-3.5" />
      ) : (
        <IconCopy className="size-3.5" />
      )}
      <span className="max-[28rem]:hidden">复制 MD</span>
    </button>
  )
}
