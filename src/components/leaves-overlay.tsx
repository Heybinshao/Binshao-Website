"use client"

import { useEffect, useRef, useState } from "react"

/**
 * 树叶投影效果 — 仅当 html 有 .sunny 类时激活
 * 对应 huazi 的暖色主题专属叶片氛围
 */
export function LeavesOverlay() {
  const [active, setActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const html = document.documentElement

    const check = () => {
      const isSunny = html.classList.contains("sunny")
      setActive(isSunny)
    }

    // Initial check
    check()

    // Observe class changes on <html>
    const observer = new MutationObserver(check)
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  // Play/pause video when active changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] opacity-0 transition-opacity duration-700 data-[active=true]:opacity-100"
      data-active={active}
      style={{ mixBlendMode: "multiply" }}
    >
      <video
        ref={videoRef}
        src="/leaves.mp4"
        muted
        loop
        playsInline
        disablePictureInPicture
        className="pointer-events-none h-full w-full object-cover select-none"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
      />
    </div>
  )
}
