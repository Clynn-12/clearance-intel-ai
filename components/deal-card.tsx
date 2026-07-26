import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { STORES, type Deal } from '@/lib/deals'
import { CheckCircle2, MapPin, Sparkles } from 'lucide-react'

function money(n: number) {
  return n < 1 ? `$${n.toFixed(2)}` : `$${n.toFixed(2)}`
}

export function DealCard({ deal }: { deal: Deal }) {
  const store = STORES[deal.store]
  const off = Math.round((1 - deal.price / deal.retail) * 100)

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] font-semibold tracking-wide text-foreground uppercase">
          {store.name}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{deal.spotted}</span>
      </div>

      <div className="relative aspect-16/10 bg-secondary">
        <Image
          src={deal.image || '/placeholder.svg'}
          alt={deal.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="object-contain p-4"
        />
        {deal.penny ? (
          <span className="absolute top-2 left-2 rounded-sm bg-destructive px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-destructive-foreground uppercase">
            Penny item · $0.01
          </span>
        ) : (
          <span className="absolute top-2 left-2 rounded-sm bg-primary px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
            {off}% off
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="leading-snug font-medium text-pretty">{deal.name}</h3>
          <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
            {deal.sku} · {deal.category}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold tracking-tight text-primary">{money(deal.price)}</span>
          <span className="font-mono text-sm text-muted-foreground line-through">{money(deal.retail)}</span>
        </div>

        <div>
          <div className="flex items-center justify-between font-mono text-[11px] tracking-wide uppercase">
            <span className="text-muted-foreground">Still-live signal</span>
            <span className="text-foreground">{deal.signal}%</span>
          </div>
          <div
            className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={deal.signal}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Likelihood this price is still live for ${deal.name}`}
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${deal.signal}%` }} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-background p-3">
          <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-primary uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            AI read
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{deal.note}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
            {deal.confirmations} confirmed
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            {deal.region}
          </span>
        </div>

        <Button variant="outline" size="sm" className="font-mono text-xs">
          Check my store
        </Button>
      </div>
    </article>
  )
}
