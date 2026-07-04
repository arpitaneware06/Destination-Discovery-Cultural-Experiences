'use client'

import Link from 'next/link'
import { Heart, Compass } from 'lucide-react'
import { useFavorites } from '@/components/favorites-provider'
import { DestinationCard } from '@/components/destination-card'
import { destinations } from '@/lib/destinations'
import { Skeleton } from '@/components/ui/skeleton'

export function FavoritesView() {
  const { favorites, ready } = useFavorites()

  if (!ready) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
        ))}
      </div>
    )
  }

  const saved = destinations.filter((d) => favorites.includes(d.slug))

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-serif text-2xl font-semibold">
          No saved trips yet
        </h2>
        <p className="mt-2 max-w-sm text-muted-foreground text-pretty">
          Tap the heart on any destination to build your collection of
          culturally rich places to explore.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Compass className="size-4" aria-hidden="true" />
          Start discovering
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((destination) => (
        <DestinationCard key={destination.slug} destination={destination} />
      ))}
    </div>
  )
}
