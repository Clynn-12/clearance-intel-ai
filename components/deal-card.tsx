'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { STORES, type Deal } from '@/lib/deals'
import { CheckCircle2, MapPin, Sparkles, Loader2 } from 'lucide-react'

function money(n: number) {
  return `$${n.toFixed(2)}`
}

type CheckResult = {
  status: 'pending_confirmation' | 'unknown'
  message: string
  nearestStore?: string
  nearestAddress?: string
  distanceMiles?: number
}

export function DealCard({ deal }: { deal: Deal }) {
  const store = STORES[deal.store]
  const off = Math.round((1 - deal.price / deal.retail) * 100)

  const [open, setOpen] = useState(false)
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheck() {
    if (!/^\d{5}$/.test(zip)) {
      setError('Enter a valid 5-digit ZIP code')
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/check-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku: deal.sku, store: deal.store, zip }),
      })
      if (!res.ok) throw new Error('Lookup failed')
      const data: CheckResult = await res.json()
      setResult(data)
    } catch {
      setError('Could not check that ZIP right now. Try again shortly.')
    } finally {
      setLoading(false)
    }
  }

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

        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) {
              setResult(null)
              setError(null)
            }
          }}
        >
          <DialogTrigger
  render={<Button variant="outline" size="sm" className="font-mono text-xs" />}
>
  Check my store
</DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-mono text-sm">Check {store.name} near you</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Enter your ZIP code to find the nearest {store.name} carrying{' '}
                <span className="text-foreground">{deal.name}</span>.
              </p>

              <div className="flex gap-2">
                <Input
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="ZIP code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                  className="font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                />
                <Button onClick={handleCheck} disabled={loading} size="sm">
                  {loading ? <Loader2 className="size-4 animate-spin" /> : 'Check'}
                </Button>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              {result && (
                <div className="rounded-md border border-border bg-background p-3 text-sm">
                  <p className="font-medium text-foreground">{result.message}</p>
                  {result.nearestStore && (
                    <div className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                      <p>{result.nearestStore}</p>
                      {result.nearestAddress && <p>{result.nearestAddress}</p>}
                      {result.distanceMiles != null && <p>{result.distanceMiles} mi away</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}
