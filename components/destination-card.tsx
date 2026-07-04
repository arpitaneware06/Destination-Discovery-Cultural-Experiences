import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FavoriteButton } from '@/components/favorite-button'
import type { Destination } from '@/lib/destinations'

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton slug={destination.slug} />
      </div>
      <Link href={`/destinations/${destination.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={destination.image || '/placeholder.svg'}
            alt={`${destination.name}, ${destination.country}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {destination.region}, {destination.country}
          </div>
          <h3 className="mt-1 font-serif text-xl font-semibold">
            {destination.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground text-pretty">
            {destination.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
