"use client"

import { LoaderIcon } from "lucide-react"

export type Activity = {
  date: string
  count: number
  level?: number
}

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>
}) {
  return (
    <div className="flex h-45 w-full items-center justify-center text-sm text-muted-foreground">
      GitHub contributions graph (registry component removed)
    </div>
  )
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
