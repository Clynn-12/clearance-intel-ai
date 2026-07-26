import { Button } from '@/components/ui/button'
import { Radar } from 'lucide-react'

const PERKS = [
  'Penny-list drops the minute they are confirmed',
  'Store-level availability for your ZIP radius',
  'Reset calendars for tools, seasonal, and electronics',
]

export function AlertsCta() {
  return (
    <section id="alerts" className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-14 md:py-20">
        <div className="rounded-xl border border-border bg-card p-6 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="font-mono text-[11px] tracking-wide text-primary uppercase">Alerts</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                Get pinged before the shelf is empty
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
                Penny windows usually last under a day. Alerts go out the moment a scan is verified in your region.
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <form className="w-full max-w-sm" aria-label="Sign up for deal alerts">
              <label htmlFor="alert-email" className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                Email address
              </label>
              <input
                id="alert-email"
                type="email"
                required
                placeholder="hunter@example.com"
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <label
                htmlFor="alert-zip"
                className="mt-4 block font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
              >
                ZIP code
              </label>
              <input
                id="alert-zip"
                inputMode="numeric"
                placeholder="73301"
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="mt-4 w-full font-mono text-xs">
                <Radar className="size-4" aria-hidden="true" />
                Start tracking
              </Button>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                Free tier: 3 alerts per day. No card required.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
