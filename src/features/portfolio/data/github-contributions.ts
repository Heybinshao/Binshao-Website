import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"

export type Activity = {
  date: string
  count: number
  level?: number
}

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getGitHubContributions = unstable_cache(
  async () => {
    try {
      const res = await fetch(
        `${process.env.GITHUB_CONTRIBUTIONS_API_URL || "https://github-contributions.chanhdai.com"}/v4/${GITHUB_USERNAME}?y=last`,
        { signal: AbortSignal.timeout(5000) }
      )
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions
    } catch {
      return []
    }
  },
  ["github-contributions"],
  { revalidate: 86400 }
)
