'use client'

import { useState } from 'react'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const LENSES = [
  { id: 'arrival', label: 'First arrival' },
  { id: 'heritage', label: 'Living heritage' },
  { id: 'cuisine', label: 'At the table' },
  { id: 'artisan', label: "An artisan's hands" },
]

export function ImmersiveStory({ slug }: { slug: string }) {
  const [lens, setLens] = useState('arrival')
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function generate(selectedLens: string) {
    setLoading(true)
    setError(false)
    setStory('')
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, lens: selectedLens }),
      })
      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setStory((prev) => prev + decoder.decode(value, { stream: true }))
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="size-5" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          Immersive story
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose a lens and let AI carry you there.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {LENSES.map((l) => (
          <button
            key={l.id}
            type="button"
            disabled={loading}
            onClick={() => {
              setLens(l.id)
              generate(l.id)
            }}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors disabled:opacity-60',
              lens === l.id && (story || loading)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:bg-secondary',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-24">
        {!story && !loading && !error && (
          <p className="text-muted-foreground">
            Pick a lens above to generate a one-of-a-kind vignette about this
            place.
          </p>
        )}
        {loading && !story && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Composing your story…
          </div>
        )}
        {error && (
          <div className="text-sm text-destructive">
            Something went wrong generating the story.{' '}
            <button
              type="button"
              onClick={() => generate(lens)}
              className="font-medium underline"
            >
              Try again
            </button>
          </div>
        )}
        {story && (
          <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/90">
            {story.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      {story && !loading && (
        <button
          type="button"
          onClick={() => generate(lens)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
          Regenerate
        </button>
      )}
    </div>
  )
}
