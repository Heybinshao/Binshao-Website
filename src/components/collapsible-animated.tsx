"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ChevronsUpDown, ChevronDown } from "lucide-react"

import { Collapsible as CollapsibleRoot } from "@/components/ui/collapsible"

type CollapsibleContextType = {
  open: boolean
}

const CollapsibleContext = createContext<CollapsibleContextType | null>(null)

const useCollapsible = () => {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw new Error(
      "Collapsible components must be used within a CollapsibleWithContext"
    )
  }

  return context
}

function CollapsibleWithContext({
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof CollapsibleRoot>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false)
  const open = controlledOpen ?? uncontrolledOpen

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <CollapsibleRoot
        open={open}
        onOpenChange={(open) => {
          if (controlledOpen === undefined) {
            setUncontrolledOpen(open)
          }
          onOpenChange?.(open)
        }}
        {...props}
      />
    </CollapsibleContext.Provider>
  )
}

function useCollapsibleAnimation<
  T extends { startAnimation: () => void; stopAnimation: () => void },
>(ref: React.RefObject<T | null>) {
  const { open } = useCollapsible()

  useEffect(() => {
    const controls = ref.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [open, ref])
}

function CollapsibleChevronsUpDownIcon(
  props: React.ComponentPropsWithoutRef<"svg">
) {
  return <ChevronsUpDown {...props} />
}

function CollapsibleChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return <ChevronDown {...props} />
}

export {
  CollapsibleWithContext as Collapsible,
  CollapsibleChevronDownIcon,
  CollapsibleChevronsUpDownIcon,
  useCollapsible,
  useCollapsibleAnimation,
}
