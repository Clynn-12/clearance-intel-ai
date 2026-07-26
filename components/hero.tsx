import { Button } from '@/components/ui/button'
import { METRICS, TICKER } from '@/lib/deals'
import { ArrowRight, Bell } from 'lucide-react'

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-card">
      <div className="flex w-max animate-ticker items-center">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 py-2 font-mono text-[11px] text-muted-foreground">
            <span className="px-4">{item}</span>
            <span aria-hidden="true" className="text-primary">
              //
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-60" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-14 pb-10 md:pt-20 md:pb-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          41 penny items confirmed today
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
          Find the markdowns the shelf tag <span className="text-primary">never shows you</span>.
        </h1>

        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground text-pretty">
          Clearance Intel reads price-ending patterns, inventory resets, and penny lists across Home Depot, Walmart, and
          Dollar General — then tells you which SKUs are actually ringing up at a cent, and where.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-10 px-5 font-mono text-xs"
            nativeButton={false}
            render={<a href="#feed" />}
          >
            Browse live feed
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-10 px-5 font-mono text-xs"
            nativeButton={false}
            render={<a href="#alerts" />}
          >
            <Bell className="size-4" aria-hidden="true" />
            Penny alerts
          </Button>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="border-l-2 border-primary/60 pl-3">
              <dd className="font-mono text-2xl font-semibold tracking-tight md:text-3xl">{m.value}</dd>
              <dt className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <Ticker />
    </section>
  )
}
