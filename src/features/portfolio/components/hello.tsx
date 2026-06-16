import { Prose } from "@/components/ui/typography"
import { Markdown } from "@/components/markdown"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { USER } from "@/features/portfolio/data/user"

export function Hello() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>关于</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  )
}
