import { FavoritesView } from '@/components/favorites-view'
import { SectionHeading } from '@/components/section-heading'

export const metadata = {
  title: 'Saved trips | Wayfare',
  description: 'Your collection of saved culturally rich destinations.',
}

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Saved"
        title="Your trips"
        description="Destinations you've saved to explore. Open any one for AI stories, hidden gems, and local experiences."
      />
      <div className="mt-10">
        <FavoritesView />
      </div>
    </div>
  )
}
