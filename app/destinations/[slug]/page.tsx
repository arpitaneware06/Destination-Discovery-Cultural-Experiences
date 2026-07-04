import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Languages,
  CalendarDays,
  Gem,
  Landmark,
  HandHeart,
  ArrowLeft,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FavoriteButton } from '@/components/favorite-button'
import { ImmersiveStory } from '@/components/immersive-story'
import { destinations, getDestination } from '@/lib/destinations'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = getDestination(slug)
  if (!destination) notFound()

  return (
    <div>
      <section className="relative">
        <div className="relative h-[52vh] min-h-80 w-full overflow-hidden">
          <Image
            src={destination.image || '/placeholder.svg'}
            alt={`${destination.name}, ${destination.country}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="mx-auto max-w-4xl px-4">
          <div className="-mt-28 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to discover
            </Link>
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {destination.region}, {destination.country}
            </div>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {destination.name}
              </h1>
              <FavoriteButton slug={destination.slug} variant="full" />
            </div>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              {destination.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {destination.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <CalendarDays className="size-5 text-primary" aria-hidden="true" />
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Best months
              </div>
              <div className="font-medium">{destination.bestMonths}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <Languages className="size-5 text-primary" aria-hidden="true" />
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Languages
              </div>
              <div className="font-medium">
                {destination.languages.join(', ')}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ImmersiveStory slug={destination.slug} />
        </div>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Landmark className="size-5 text-accent" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-semibold">
              Heritage &amp; traditions
            </h2>
          </div>
          <p className="mt-3 text-muted-foreground text-pretty leading-relaxed">
            {destination.heritage}
          </p>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Gem className="size-5 text-accent" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-semibold">Hidden gems</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {destination.hiddenGems.map((gem) => (
              <div
                key={gem.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-serif text-lg font-semibold">{gem.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
                  {gem.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-accent" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-semibold">Local events</h2>
          </div>
          <div className="mt-4 space-y-3">
            {destination.events.map((event) => (
              <div
                key={event.name}
                className="flex flex-col gap-1 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div>
                  <h3 className="font-serif text-lg font-semibold">
                    {event.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <Badge className="w-fit shrink-0">{event.season}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <HandHeart className="size-5 text-accent" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-semibold">
              Authentic experiences
            </h2>
          </div>
          <ul className="mt-4 space-y-2">
            {destination.experiences.map((exp) => (
              <li
                key={exp}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="mt-1 flex size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="text-pretty">{exp}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 text-center">
          <h2 className="font-serif text-xl font-semibold">
            Planning a trip to {destination.name}?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask the culture companion for a day-by-day cultural itinerary.
          </p>
          <Link
            href={`/companion?d=${destination.slug}`}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open the companion
          </Link>
        </div>
      </div>
    </div>
  )
}
