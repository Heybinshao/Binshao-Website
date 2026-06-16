"use client"

/** 静态头像，禁用拖拽功能 */
export function InteractiveAvatar({
  src,
  alt = "Avatar",
}: {
  src?: string
  alt?: string
}) {
  return (
    <div className="relative flex leading-none">
      <img
        className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
        src={src || "/binshao.jpg"}
        alt={alt}
        fetchPriority="high"
        draggable={false}
      />
    </div>
  )
}
