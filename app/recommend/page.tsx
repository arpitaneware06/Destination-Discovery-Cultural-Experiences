import { RecommendForm } from '@/components/recommend-form'
import { SectionHeading } from '@/components/section-heading'

export const metadata = {
  title: 'For You — AI destination matches | Wayfare',
  description:
    'Answer a few prompts and let AI curate culturally rich destinations tailored to you.',
}

export default function RecommendPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <SectionHeading
        eyebrow="For you"
        title="Let AI find your kind of place"
        description="Share a little about what moves you. Our AI curator matches you with destinations from our collection and the cultural experiences to seek out."
      />
      <div className="mt-10">
        <RecommendForm />
      </div>
    </div>
  )
}
