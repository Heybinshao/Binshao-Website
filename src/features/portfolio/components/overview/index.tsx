import { urlToName } from "@/utils/url"
import {
  BriefcaseBusinessIcon,
  LinkIcon,
  MapPinIcon,
} from "lucide-react"

import { USER } from "@/features/portfolio/data/user"

import { Panel, PanelContent } from "../panel"
import { EmailItem } from "./email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {/* 工作 — 仅显示标题，不显示公司 */}
        <IntroItem>
          <IntroItemIcon>
            <BriefcaseBusinessIcon />
          </IntroItemIcon>
          <IntroItemContent>
            {USER.jobTitle}
          </IntroItemContent>
        </IntroItem>

        {/* 地址 */}<IntroItem>
          <IntroItemIcon>
            <MapPinIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
              aria-label={`Location: ${USER.address}`}
            >
              {USER.address}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        {/* 邮箱 */}
        <EmailItem emailB64={USER.emailB64} />

        {/* 网站 */}
        <IntroItem>
          <IntroItemIcon>
            <LinkIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={USER.website}
              aria-label={`Personal website: ${urlToName(USER.website)}`}
            >
              {urlToName(USER.website)}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        {/* <CurrentLocalTimeItem timeZone={USER.timeZone} /> */}

        {/* <PhoneItem phoneNumberB64={USER.phoneNumberB64} /> */}

        {/* <IntroItem>
          <IntroItemIcon>{getGenderIcon(USER.gender)}</IntroItemIcon>
          <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
            {USER.pronouns}
          </IntroItemContent>
        </IntroItem> */}
      </PanelContent>
    </Panel>
  )
}
