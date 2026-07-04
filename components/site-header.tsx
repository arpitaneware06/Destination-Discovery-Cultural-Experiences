'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Heart, Sparkles, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/components/favorites-provider'

const links = [
  { href: '/', label: 'Discover', icon: Compass },
  { href: '/recommend', label: 'For You', icon: Sparkles },
  { href: '/companion', label: 'Companion', icon: MessageCircle },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { favorites, ready } = useFavorites()

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Compass className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            Wayfare
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
          <Link
            href="/favorites"
            className={cn(
              'relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname.startsWith('/favorites')
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
            )}
          >
            <Heart className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Saved</span>
            {ready && favorites.length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
