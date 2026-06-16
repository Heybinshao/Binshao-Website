import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"
import { getDocsByCategory } from "@/features/doc/data/documents"

import { cn } from "@/lib/utils"
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "components"

function GridItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-background", className)}>
      {children}
    </div>
  )
}

function PlaceholderDemo({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground p-4">
      {label}
    </div>
  )
}

export function ComponentsShowcase() {
  const components = getDocsByCategory("components")

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Components</a>
          <PanelTitleSup>({components.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="grid auto-rows-[minmax(--spacing(42),auto)] grid-cols-1 gap-1 p-1 md:grid-cols-3">
        <GridItem className="md:row-span-2">
          <PlaceholderDemo label="Apple Hello Effect (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Slide to Unlock (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Theme Switcher (registry removed)" />
        </GridItem>

        <GridItem className="md:row-span-2">
          <PlaceholderDemo label="Elastic Slider (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Theme Toggle Effect (registry removed)" />
        </GridItem>

        <GridItem className="**:data-rwp-wrapper:rounded-xl md:row-span-2">
          <PlaceholderDemo label="Wheel Picker (registry removed)" />
        </GridItem>

        <GridItem className="md:row-span-2">
          <PlaceholderDemo label="Middle Truncation (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Testimonial Spotlight (registry removed)" />
        </GridItem>

        <GridItem className="px-0 md:col-span-2 md:row-span-2">
          <PlaceholderDemo label="GitHub Contributions (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Text Flip (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Copy Button (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Brand Assets Menu (registry removed)" />
        </GridItem>

        <GridItem className="[--code:var(--surface)]">
          <PlaceholderDemo label="Code Block Command (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Icon Swap (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Twemoji (registry removed)" />
        </GridItem>

        <GridItem className="md:col-span-2 md:row-span-2">
          <PlaceholderDemo label="Fluid Gradient Text (registry removed)" />
        </GridItem>

        <GridItem>
          <PlaceholderDemo label="Shimmering Text (registry removed)" />
        </GridItem>
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 pr-2.5 pl-3"
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<Link href={"/components" as any} />}
        >
          All Components
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}

export default ComponentsShowcase
