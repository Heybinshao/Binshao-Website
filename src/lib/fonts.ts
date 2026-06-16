import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

const fontSans = GeistSans
const fontMono = GeistMono

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-geist-mono)]",
  // huazi uses IBM Plex Sans; try it first if installed, fallback to Geist
  "[--font-ibm-plex-sans:'IBM Plex Sans','IBM Plex Sans Fallback']"
)
