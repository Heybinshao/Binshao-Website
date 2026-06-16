import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://binshao.top",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/HeyBinshao/Binshao-Website/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Blog",
    href: "/blog",
  },
]

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = "@Binshaogg"
export const GITHUB_USERNAME = "HeyBinshao"
export const SOURCE_CODE_GITHUB_REPO = "HeyBinshao/Binshao-Website"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/HeyBinshao/Binshao-Website"

export const SPONSORSHIP_URL = ""

export const UTM_PARAMS = {
  utm_source: "binshao.top",
}
