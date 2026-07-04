'use client'

import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/components/favorites-provider'

export function FavoriteButton({
  slug,
  variant = 'icon',
  className,
}: {
  slug: string
  variant?: 'icon' | 'full'
  className?: string
}) {
  const { isFavorite, toggleFavorite, ready } = useFavorites()
  const active = ready && isFavorite(slug)

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(slug)}
        aria-pressed={active}
        className={cn(
          'inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors',
          active
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-card text-foreground hover:bg-secondary',
          className,
        )}
      >
        <Heart className={cn('size-4', active && 'fill-current')} aria-hidden="true" />
        {active ? 'Saved to your trips' : 'Save to my trips'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(slug)
      }}
      aria-label={active ? 'Remove from saved' : 'Save destination'}
      aria-pressed={active}
      className={cn(
        'flex size-9 items-center justify-center rounded-full backdrop-blur transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-background/80 text-foreground hover:bg-background',
        className,
      )}
    >
      <Heart className={cn('size-4', active && 'fill-current')} aria-hidden="true" />
    </button>
  )
}
