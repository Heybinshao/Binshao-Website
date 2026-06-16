import type { ReactElement } from "react"

export type SocialLink = {
  /** Unique key for the social link */
  name: string
  /** Icon element to display */
  icon: ReactElement
  /** Display title (e.g., "X", "GitHub") */
  title: string
  /** Optional handle/username */
  handle?: string
  /** External profile URL */
  href: string
}
