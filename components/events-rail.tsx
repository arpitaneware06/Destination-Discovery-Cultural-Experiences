import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { destinations } from '@/lib/destinations'

export function EventsRail() {
  const events = destinations.flatMap((d) =>
    d.events.map((event) => ({ ...event, destination: d })),
  )

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {events.map((event) => (
        <Link
          key={`${event.destination.slug}-${event.name}`}
          href={`/destinations/${event.destination.slug}`}
          className="group flex w-72 shrink-0 flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
        >
          <div className="flex items-center gap-2 text-primary">
            <CalendarDays className="size-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{event.season}</span>
          </div>
          <h3 className="mt-2 font-serif text-lg font-semibold">
            {event.name}
          </h3>
          <p className="mt-1 flex-1 text-sm text-muted-foreground text-pretty leading-relaxed">
            {event.description}
          </p>
          <span className="mt-3 text-xs font-medium text-muted-foreground">
            {event.destination.name}, {event.destination.country}
          </span>
        </Link>
      ))}
    </div>
  )
}
