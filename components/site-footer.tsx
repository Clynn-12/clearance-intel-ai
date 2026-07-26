export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] text-muted-foreground">
          CLEARANCE<span className="text-primary">/</span>INTEL — independent price intelligence. Not affiliated with any
          retailer.
        </p>
        <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted-foreground">
          Penny items are meant to be pulled from shelves. Stores may decline a sale at any time — be decent to the
          staff.
        </p>
      </div>
    </footer>
  )
}
