import { STORES } from '@/lib/deals'

const ENDINGS: Record<string, { code: string; meaning: string }[]> = {
  'home-depot': [
    { code: '.97', meaning: 'First markdown, more cuts coming' },
    { code: '.06', meaning: 'Manager markdown, near the floor' },
    { code: '.03', meaning: 'Final price — buy it now' },
  ],
  walmart: [
    { code: '.X7', meaning: 'Rollback, not true clearance' },
    { code: '.X4', meaning: 'Mid-ladder clearance' },
    { code: '.00', meaning: 'Terminal clearance, then pulled' },
  ],
  'dollar-general': [
    { code: '.50', meaning: '50% ladder rung' },
    { code: '.25', meaning: '70–75% rung' },
    { code: '.01', meaning: 'Penny list — free to clear' },
  ],
}

export function PriceDecoder() {
  return (
    <section id="decoder" className="border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-14 md:py-20">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] tracking-wide text-primary uppercase">Price decoder</p>
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Every retailer hides the markdown stage in the last two digits
          </h2>
          <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Learn the endings once and you can read any shelf tag in seconds. Our model uses the same signals, at scale,
            across tens of thousands of stores.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {Object.values(STORES).map((store) => (
            <div key={store.id} className="rounded-lg border border-border bg-background p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                  {store.short}
                </span>
                <h3 className="font-medium">{store.name}</h3>
              </div>

              <ul className="mt-4 flex flex-col gap-3">
                {ENDINGS[store.id].map((e) => (
                  <li key={e.code} className="flex items-start gap-3">
                    <span className="min-w-11 rounded-sm border border-primary/40 px-1.5 py-0.5 text-center font-mono text-xs text-primary">
                      {e.code}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{e.meaning}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {store.tell}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
