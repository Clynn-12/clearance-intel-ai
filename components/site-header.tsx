import { Button } from '@/components/ui/button'
import { Radar } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Radar className="size-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">
            CLEARANCE<span className="text-primary">/</span>INTEL
          </span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 md:flex">
          <a href="#feed" className="font-mono text-xs text-muted-foreground uppercase hover:text-foreground">
            Feed
          </a>
          <a href="#decoder" className="font-mono text-xs text-muted-foreground uppercase hover:text-foreground">
            Decoder
          </a>
          <a href="#alerts" className="font-mono text-xs text-muted-foreground uppercase hover:text-foreground">
            Alerts
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            LIVE
          </span>
          <Button size="sm" className="h-8 font-mono text-xs">
            Get alerts
          </Button>
        </div>
      </div>
    </header>
  )
}
