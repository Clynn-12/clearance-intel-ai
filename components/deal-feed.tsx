'use client'

import { useMemo, useState } from 'react'
import { DealCard } from '@/components/deal-card'
import { DEALS, STORES, type StoreId } from '@/lib/deals'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'penny' | StoreId
type Sort = 'signal' | 'price' | 'recent'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All deals' },
  { id: 'penny', label: 'Penny only' },
  ...(Object.values(STORES).map((s) => ({ id: s.id, label: s.name })) as { id: Filter; label: string }[]),
]

const SORTS: { id: Sort; label: string }[] = [
  { id: 'signal', label: 'Signal' },
  { id: 'price', label: 'Price' },
  { id: 'recent', label: 'Newest' },
]

export function DealFeed() {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('signal')

  const deals = useMemo(() => {
    const list = DEALS.filter((d) => {
      if (filter === 'all') return true
      if (filter === 'penny') return d.penny
      return d.store === filter
    })

    return [...list].sort((a, b) => {
      if (sort === 'price') return a.price - b.price
      if (sort === 'recent') return DEALS.indexOf(a) - DEALS.indexOf(b)
      return b.signal - a.signal
    })
  }, [filter, sort])

  return (
    <section id="feed" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-14 md:py-20">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-wide text-primary uppercase">Live feed</p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Confirmed markdowns, sorted by how likely they still are
        </h2>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-y border-border py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter deals by store">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                'rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors',
                filter === f.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">Sort</span>
          <div className="flex overflow-hidden rounded-md border border-border">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                aria-pressed={sort === s.id}
                className={cn(
                  'px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors',
                  sort === s.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {deals.length === 0 && (
        <p className="mt-10 font-mono text-sm text-muted-foreground">
          No active intel for that filter. Check back after the next reset.
        </p>
      )}
    </section>
  )
}
