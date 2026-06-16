"use server"

import type { registryItemSchema } from "shadcn/schema"
import type { z } from "zod"

import { blockCategories } from "@/config/registry"

export async function getAllBlockStaticParams(): Promise<
  Array<{ category: string; name: string }>
> {
  return []
}

export async function getAllBlockIds(
  types: z.infer<typeof registryItemSchema>["type"][] = ["registry:block"],
  categories: string[] = []
): Promise<string[]> {
  return []
}

export async function getAllBlocks(
  types: z.infer<typeof registryItemSchema>["type"][] = ["registry:block"],
  categories: string[] = []
) {
  return []
}
