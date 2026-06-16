"use client"

import { useRef, useState, useEffect } from "react"
import { useInView, usePageInView, motion, AnimatePresence } from "motion/react"

export function FlipSentences({
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "ref"> & {
  children: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isPageInView = usePageInView()
  const isInView = useInView(ref)
  const [index, setIndex] = useState(0)
  const play = isPageInView && isInView

  useEffect(() => {
    if (!play) return
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % children.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [play, children.length])

  return (
    <div ref={ref} {...props}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="text-sm text-balance text-muted-foreground inline-block"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: -1, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
