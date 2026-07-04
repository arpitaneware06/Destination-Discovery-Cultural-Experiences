'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { DestinationCard } from '@/components/destination-card'
import { destinations, allTags } from '@/lib/destinations'

export function DiscoverExplorer() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter((d) => {
      const matchesTag = !activeTag || d.tags.includes(activeTag)
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, countries, or interests"
            className="pl-9"
            aria-label="Search destinations"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors',
              !activeTag
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:bg-secondary',
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition-colors',
                tag === activeTag
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:bg-secondary',
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted-foreground">
          No destinations match that yet. Try the{' '}
          <span className="font-medium text-foreground">culture companion</span>{' '}
          for ideas beyond our featured list.
        </p>
      )}
    </div>
  )
}
