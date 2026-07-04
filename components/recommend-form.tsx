'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { getDestination } from '@/lib/destinations'

type Recommendation = {
  slug: string
  reason: string
  culturalHighlight: string
}

const VIBES = ['Slow & soulful', 'Vibrant & festive', 'Remote & wild', 'Historic & grand']
const STYLES = ['Solo explorer', 'Couple', 'Family', 'Group of friends']

export function RecommendForm() {
  const [interests, setInterests] = useState('')
  const [vibe, setVibe] = useState('')
  const [travelStyle, setTravelStyle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [results, setResults] = useState<Recommendation[] | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setResults(null)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, vibe, travelStyle }),
      })
      if (!res.ok) throw new Error('failed')
      const data = await res.json()
      setResults(data.recommendations ?? [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form
        onSubmit={handleSubmit}
        className="h-fit rounded-2xl border border-border bg-card p-6"
      >
        <label className="block text-sm font-medium" htmlFor="interests">
          What draws you in?
        </label>
        <Input
          id="interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g. textiles, temple food, live music"
          className="mt-2"
        />

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Desired vibe</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {VIBES.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVibe(v === vibe ? '' : v)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  vibe === v
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-secondary',
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Travel style</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTravelStyle(s === travelStyle ? '' : s)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  travelStyle === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-secondary',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Curating…
            </>
          ) : (
            <>
              <Sparkles className="size-4" aria-hidden="true" />
              Find my destinations
            </>
          )}
        </button>
      </form>

      <div>
        {!results && !loading && !error && (
          <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="max-w-sm text-muted-foreground text-pretty">
              Tell us what moves you, and our AI curator will match you with
              culturally rich destinations and the experiences to seek out.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-border bg-card p-8 text-muted-foreground">
            <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" />
            Matching you to the world…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-destructive/40 bg-card p-6 text-destructive">
            We couldn&apos;t generate recommendations just now. Please try again.
          </div>
        )}

        {results && (
          <div className="space-y-4">
            {results.map((rec, i) => {
              const dest = getDestination(rec.slug)
              if (!dest) return null
              return (
                <Link
                  key={rec.slug}
                  href={`/destinations/${dest.slug}`}
                  className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg sm:flex-row"
                >
                  <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-48">
                    <Image
                      src={dest.image || '/placeholder.svg'}
                      alt={`${dest.name}, ${dest.country}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="font-serif text-xl font-semibold">
                      {dest.name}, {dest.country}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/90 text-pretty leading-relaxed">
                      {rec.reason}
                    </p>
                    <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-pretty">{rec.culturalHighlight}</span>
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Explore
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
