import { HomeHero } from '@/components/home-hero'
import { DiscoverExplorer } from '@/components/discover-explorer'
import { HiddenGems } from '@/components/hidden-gems'
import { EventsRail } from '@/components/events-rail'
import { SectionHeading } from '@/components/section-heading'

export default function HomePage() {
  return (
    <div>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Explore"
          title="Destinations worth understanding"
          description="A curated starting point of culturally rich places. Filter by what moves you, then dive in for AI-generated stories and local experiences."
        />
        <div className="mt-8">
          <DiscoverExplorer />
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            eyebrow="Hidden gems"
            title="Beyond the guidebook"
            description="The quiet villages, backstreet workshops, and family cellars our AI surfaces so you can travel deeper."
          />
          <div className="mt-8">
            <HiddenGems />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Local calendar"
          title="Time your visit to the culture"
          description="Festivals, harvests, and ceremonies that turn a good trip into a once-in-a-lifetime one."
        />
        <div className="mt-8">
          <EventsRail />
        </div>
      </section>
    </div>
  )
}
