"use client"

import { useMotionValueEvent, useScroll } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { USER } from "@/features/portfolio/data/user"
import { META_THEME_COLORS } from "@/config/site"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/* ── WAV 音效 ── */
function useClickSound() {
  const bufferRef = useRef<AudioBuffer | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    ctxRef.current = ctx
    fetch("/audio/click.wav")
      .then((r) => r.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((buf) => { bufferRef.current = buf })
      .catch(() => {})
    return () => { ctx.close() }
  }, [])

  return [
    useCallback(() => {
      const ctx = ctxRef.current
      const buf = bufferRef.current
      if (!ctx || !buf) return
      const src = ctx.createBufferSource()
      const g = ctx.createGain()
      src.buffer = buf
      g.gain.value = 0.4
      src.connect(g)
      g.connect(ctx.destination)
      src.start(0)
    }, []),
  ] as const
}

/* ── 滚动浮现的头像 ── */
function ScrollAwareHeaderMark() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === "/") {
      setVisible(latest >= 320)
    }
  })

  // 非主页始终显示
  const alwaysShow = pathname !== "/"

  return (
    <Link className="has-data-[visible=false]:pointer-events-none" href="/" aria-label="Home">
      <img
        src={USER.avatar}
        alt="彬少"
        data-visible={alwaysShow || visible}
        className="h-8 w-8 rounded-full border-2 border-border data-[visible=false]:translate-y-2 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 transition-[opacity,translate] duration-300"
      />
    </Link>
  )
}

/* ── 主题：light/dark（huazi 原创含 sunny 暖色主题，暂不启用） ── */
export function SiteHeader() {
  const pathname = usePathname()
  // huazi 原创设计，含 sunny 暖色主题，此处暂不启用
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")

  // 从 head 脚本同步的 DOM class 读取实际主题
  useEffect(() => {
    const h = document.documentElement
    const current = h.classList.contains("dark") ? "dark" : "light"
    if (current !== "light") setThemeMode(current)
  }, [])
  const [click] = useClickSound()

  function applyTheme(mode: "light" | "dark") {
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(mode)
    localStorage.setItem("theme", mode)
    localStorage.setItem("theme-mode", "")

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute(
        "content",
        mode === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
      )
    }
  }

  const cycleTheme = useCallback(() => {
    const nextMode = themeMode === "light" ? "dark" : "light"
    click()
    setThemeMode(nextMode)
    applyTheme(nextMode)
  }, [themeMode, click])

  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2 data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black] not-dark:data-[affix=true]:**:data-header-container:after:bg-border transition-shadow duration-300">
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <ScrollAwareHeaderMark />
        <div className="flex-1" />

        <nav className="flex items-center gap-4 max-sm:hidden">
          <Link className={`text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"}`} href="/">主页</Link>
          <Link className={`text-sm font-medium ${pathname === "/blog" ? "text-foreground" : "text-muted-foreground"}`} href="/blog">博客</Link>
        </nav>

        <div className="flex items-center *:first:mr-2">
          <button data-slot="command-menu-trigger"
            onClick={() => document.dispatchEvent(new CustomEvent("open-cmd-palette"))}
            className="inline-flex items-center justify-center text-sm font-medium whitespace-nowrap transition-[scale] ease-out outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-8 gap-1.5 rounded-full border border-input px-2.5 text-muted-foreground shadow-xs select-none bg-muted hover:bg-accent dark:bg-input/30 dark:hover:bg-input/30"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
              <path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            <span className="text-sm/4 font-medium sm:hidden">搜索</span>
            <kbd data-slot="kbd-group" className="items-center gap-1 hidden sm:in-[.os-macos_&]:flex">
              <kbd data-slot="kbd" className="pointer-events-none inline-flex h-5 items-center justify-center gap-1 rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10 w-5 min-w-5">⌘</kbd>
              <kbd data-slot="kbd" className="pointer-events-none inline-flex h-5 items-center justify-center gap-1 rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10 w-5 min-w-5">K</kbd>
            </kbd>
            <kbd data-slot="kbd-group" className="items-center gap-1 hidden sm:not-[.os-macos_&]:flex">
              <kbd data-slot="kbd" className="pointer-events-none inline-flex h-5 w-fit min-w-6 items-center justify-center gap-1 rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10">Ctrl</kbd>
              <kbd data-slot="kbd" className="pointer-events-none inline-flex h-5 items-center justify-center gap-1 rounded-sm px-1 text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10 w-5 min-w-5">K</kbd>
            </kbd>
          </button>

          <span className="mx-2 flex h-4 w-px bg-border" />

          {/* Theme toggle  */}
            <button
              data-slot="button"
              onClick={cycleTheme}
              className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-[scale] ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground size-8"
            >
              {themeMode === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
              <span className="sr-only">主题切换</span>
            </button>

          {/* Mobile hamburger */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-[scale] ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground size-8 sm:hidden"
              >
                <div className="relative size-5">
                  <span className="absolute left-0 top-[4px] block h-[2px] w-5 rounded-full bg-current transition-all duration-300" />
                  <span className="absolute left-0 bottom-[4px] block h-[2px] w-5 rounded-full bg-current transition-all duration-300" />
                </div>
                <span className="sr-only">菜单</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="w-36 p-2"
            >
              <nav className="flex flex-col">
                <Link
                  href="/"
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  onClick={() => {
                    const btn = document.querySelector('[data-state="open"][role="dialog"]')
                    if (btn) btn.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  主页
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  onClick={() => {
                    const btn = document.querySelector('[data-state="open"][role="dialog"]')
                    if (btn) btn.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  博客
                </Link>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
