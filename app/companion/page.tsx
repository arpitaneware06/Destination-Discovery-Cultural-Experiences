import { CompanionChat } from '@/components/companion-chat'

export const metadata = {
  title: 'Culture Companion — AI travel guide | Wayfare',
  description:
    'Chat with an AI cultural companion to plan immersive, respectful trips and discover authentic local experiences.',
}

export default async function CompanionPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>
}) {
  const { d } = await searchParams

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <CompanionChat destinationSlug={d} />
    </div>
  )
}
