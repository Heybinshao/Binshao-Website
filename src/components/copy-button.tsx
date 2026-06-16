"use client"

import { useCallback, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Event } from "@/lib/events"
import { trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"

type CopyButtonProps = {
  text: string | (() => string)
  size?: "default" | "icon" | "icon-sm" | "sm" | "lg" | "xs" | "icon-xs" | "icon-lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  className?: string
  onCopySuccess?: () => void
  idleIcon?: React.ReactNode
}

export function CopyButton({
  size = "icon-sm",
  variant = "outline",
  event,
  className,
  onCopySuccess,
  idleIcon,
  ...props
}: CopyButtonProps & {
  event?: Event["name"]
}) {
  const [copied, setCopied] = useState(false)
  const text = typeof props.text === "function" ? props.text() : (props.text ?? "")

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (event) {
        trackEvent({
          name: event,
          properties: {
            code: text,
          },
        })
      }
      onCopySuccess?.()
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }, [text, event, onCopySuccess])

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleCopy}
    >
      {copied ? <CheckIcon className="size-4" /> : (idleIcon ?? <CopyIcon className="size-4" />)}
    </Button>
  )
}
