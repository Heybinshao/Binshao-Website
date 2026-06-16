import dynamic from "next/dynamic"

import { CommandMenu } from "@/components/command-menu"
import { LeavesOverlay } from "@/components/leaves-overlay"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
)

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/layout">
      <SiteHeader />
      <main className="max-w-screen overflow-clip px-2">{children}</main>
      <div className="screen-line-before mx-auto" />
      <div className="stripe-divider mx-auto" />
      <SiteFooter />
      <ScrollToTop />
      <CommandMenu docs={[]} blocks={[]} />
      <LeavesOverlay />
    </div>
  )
}
