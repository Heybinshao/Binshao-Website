import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import type { WebSite, WithContext } from "schema-dts"

import { META_THEME_COLORS, SITE_INFO, X_HANDLE } from "@/config/site"
import { fontVariables } from "@/lib/fonts"
import { JsonLdScript } from "@/lib/json-ld"
import { Providers } from "@/components/providers"
import { USER } from "@/features/portfolio/data/user"

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [USER.username],
  }
}

// 同步主题脚本：在 React 渲染前执行，消除闪白和第一帧样式异常
const themeScript = String.raw`
  try {
    var html = document.documentElement
    var theme = localStorage.getItem('theme')
    var mode = localStorage.getItem('theme-mode')
    var meta = document.querySelector('meta[name="theme-color"]')

    // 默认 sunny 主题
    if (mode === 'sunny') {
      html.classList.add('sunny', 'light')
      if (meta) meta.setAttribute('content', '#f5f1ea')
    } else if (theme === 'dark') {
      html.classList.add('dark')
      if (meta) meta.setAttribute('content', '${META_THEME_COLORS.dark}')
    } else if (theme === 'light') {
      html.classList.add('light')
      if (meta) meta.setAttribute('content', '${META_THEME_COLORS.light}')
    } else {
      // 无 localStorage 偏好 → 跟随系统
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark')
        if (meta) meta.setAttribute('content', '${META_THEME_COLORS.dark}')
      } else {
        html.classList.add('light')
        if (meta) meta.setAttribute('content', '${META_THEME_COLORS.light}')
      }
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    template: `%s – ${SITE_INFO.name}`,
    default: `彬少-设计师`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: "ncdai",
      url: SITE_INFO.url,
    },
  ],
  creator: "ncdai",
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "profile",
    locale: "en_US",
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: USER.gender,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [SITE_INFO.ogImage],
  },
  icons: {
    icon: {
      url: "/binshao.jpg",
      sizes: "any",
      type: "image/jpeg",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${Buffer.from(themeScript).toString("base64")}`} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('avatarLights');
                document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
              } catch(_) {}
            `,
          }}
        />
        <JsonLdScript data={getWebSiteJsonLd()} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css" />
        <link rel="preload" as="image" href="/binshao.jpg" />
      </head>

      <body>
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  )
}
