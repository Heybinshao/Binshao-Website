"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

const TEXT = "CRAFTED WITH CARE BY NCDAI • "
const DURATION = 4

function SpinningCircularText({
  text,
  charSpacing,
  className,
  spinClassName,
  renderChar,
}: {
  text: string
  charSpacing: number
  className?: string
  spinClassName?: string
  renderChar: (char: string, index: number) => React.ReactNode
}) {
  return (
    <div className={className}>
      {text.split("").map((char, index) => (
        <span key={index} style={{ marginRight: charSpacing ? `${charSpacing}em` : undefined }}>
          {renderChar(char, index)}
        </span>
      ))}
    </div>
  )
}

export function SiteFooterBuiltBySpinner() {
  const shouldReduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  return (
    <SpinningCircularText
      text={TEXT}
      charSpacing={1.2}
      className="[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]"
      spinClassName="duration-[12s] motion-reduce:animate-none"
      renderChar={(char, index) =>
        shouldReduceMotion ? (
          <span className="text-(--shimmering-color)" suppressHydrationWarning>
            {char}
          </span>
        ) : (
          <motion.span
            key={resolvedTheme}
            animate={{
              color: [
                "var(--color)",
                "var(--shimmering-color)",
                "var(--color)",
              ],
            }}
            transition={{
              duration: DURATION,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: TEXT.length * 0.03,
              delay: (index * DURATION) / TEXT.length,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        )
      }
    />
  )
}
