import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { USER } from "@/features/portfolio/data/user"
import type { TechStack } from "../types/tech-stack"
import { TECH_STACK } from "../data/tech-stack"

function ToolGrid({ items }: { items: TechStack[] }) {
  return (
    <ul className="flex flex-wrap gap-4 select-none">
      {items.map((item) => (
        <li key={item.key} className="flex">
          <Tooltip>
            <TooltipTrigger>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <img
                    alt={`${item.name} icon`}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="rounded-xl ring-1 ring-black/10 dark:ring-white/15 corner-squircle supports-corner-shape:rounded-[50%]"
                    style={{ color: "transparent" }}
                    src={item.iconImage}
                  />
                </a>
              ) : (
                <span aria-label={item.name}>
                  <img
                    alt={`${item.name} icon`}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="rounded-xl ring-1 ring-black/10 dark:ring-white/15 corner-squircle supports-corner-shape:rounded-[50%]"
                    style={{ color: "transparent" }}
                    src={item.iconImage}
                  />
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}

export function TechStack() {
  const tools = TECH_STACK.filter((item) => item.categories.includes("工具"))
  const entertainment = TECH_STACK.filter((item) => item.categories.includes("娱乐"))

  return (
    <>
      <Panel id="stack">
        <PanelHeader>
          <PanelTitle>工具</PanelTitle>
        </PanelHeader>
        <PanelContent
          className="[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center bg-zinc-950/0.75 dark:bg-white/0.75"
        >
          <ToolGrid items={tools} />
        </PanelContent>
      </Panel>

      {entertainment.length > 0 && (
        <Panel id="entertainment" className="screen-line-top-none">
          <PanelHeader>
            <PanelTitle>娱乐</PanelTitle>
          </PanelHeader>
          <PanelContent
            className="[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center bg-zinc-950/0.75 dark:bg-white/0.75"
          >
            <ToolGrid items={entertainment} />
          </PanelContent>
        </Panel>
      )}
    </>
  )
}
