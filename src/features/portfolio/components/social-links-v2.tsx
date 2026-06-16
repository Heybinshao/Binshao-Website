import { ArrowUpRight } from "lucide-react"

import { addQueryParams } from "@/utils/url"
import { UTM_PARAMS } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links-v2"

export function SocialLinks() {
  return (
    <section data-slot="panel" className="screen-line-before screen-line-after border-x border-edge">
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge" />
          <div className="border-l border-edge" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              className="group/link flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-accent2 max-sm:screen-line-before max-sm:screen-line-after sm:[&:nth-child(2n+1)]:screen-line-before sm:[&:nth-child(2n+1)]:screen-line-after"
              href={addQueryParams(item.href, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
            >
              <div className="relative size-12 shrink-0">
                <img alt={item.title} loading="lazy" width={48} height={48} className="rounded-xl select-none corner-squircle supports-corner-shape:rounded-[50%]" style={{ color: "transparent" }} src={item.iconUrl} />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 corner-squircle ring-inset dark:ring-white/15 supports-corner-shape:rounded-[50%]" />
              </div>
              <div className="flex-1">
                <h3 className="flex items-center font-medium underline-offset-4 group-hover/link:underline">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.username}</p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
