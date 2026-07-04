import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, MessageCircle } from 'lucide-react'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-culture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            AI-guided cultural travel
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-6xl">
            Discover culture, not just places.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty leading-relaxed">
            Wayfare uses generative AI to surface hidden gems, tell the stories
            behind the heritage, and connect you with the artisans, cooks, and
            traditions that make a place unforgettable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/recommend"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Get personal recommendations
            </Link>
            <Link
              href="/companion"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask the culture companion
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
