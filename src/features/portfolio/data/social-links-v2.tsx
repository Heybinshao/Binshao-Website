export interface SocialLink {
  name: string
  title: string
  username: string
  href: string
  iconUrl: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "redbook",
    title: "小红书",
    username: "宝藏彬少",
    href: "https://xhslink.com/m/1kIYBWSWMfO",
    iconUrl: "/logos/RedBook.svg",
  },
  {
    name: "x",
    title: "X",
    username: "@Binshaogg",
    href: "https://x.com/Binshaogg",
    iconUrl: "/logos/x.svg",
  },
  {
    name: "github",
    title: "GitHub",
    username: "@HeyBinshao",
    href: "https://github.com/HeyBinshao",
    iconUrl: "/logos/github.svg",
  },
  {
    name: "jike",
    title: "即刻",
    username: "@彬少",
    href: "https://okjk.co/Br3w4c",
    iconUrl: "/logos/jike.svg",
  },
]
