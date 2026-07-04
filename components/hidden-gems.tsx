import Link from 'next/link'
import { Gem } from 'lucide-react'
import { destinations } from '@/lib/destinations'

export function HiddenGems() {
  const gems = destinations.flatMap((d) =>
    d.hiddenGems.map((gem) => ({ ...gem, destination: d })),
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {gems.map((gem) => (
        <Link
          key={`${gem.destination.slug}-${gem.name}`}
          href={`/destinations/${gem.destination.slug}`}
          className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-secondary/40"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Gem className="size-5" aria-hidden="true" />
          </span>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Near {gem.destination.name}
            </div>
            <h3 className="mt-0.5 font-serif text-lg font-semibold">
              {gem.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
              {gem.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
