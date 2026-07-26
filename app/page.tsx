import { AlertsCta } from '@/components/alerts-cta'
import { DealFeed } from '@/components/deal-feed'
import { Hero } from '@/components/hero'
import { PriceDecoder } from '@/components/price-decoder'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main>
        <Hero />
        <DealFeed />
        <PriceDecoder />
        <AlertsCta />
      </main>
      <SiteFooter />
    </div>
  )
}
