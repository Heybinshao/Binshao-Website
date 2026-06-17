export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-4 px-4 text-center text-sm text-balance text-muted-foreground">
          此网站基于开源项目{" "}
          <a
            className="link"
            href="https://github.com/ncdai/chanhdai.com"
            target="_blank"
            rel="noopener"
          >
            chanhdai.com
          </a>
          .
        </p>

        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex w-full items-center justify-between bg-background px-4">
            <div className="flex items-center gap-3">
              {/* X（暂不启用）
              <a ...> ... </a>

              <div className="flex h-11 w-px bg-edge" />

              GitHub（暂不启用）
              <a ...> ... </a>

              <div className="flex h-11 w-px bg-edge" />
              */}

              {/* RSS（暂不启用）
              <Link ...> ... </Link>
              */}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  )
}
