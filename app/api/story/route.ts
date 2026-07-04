import { streamText } from 'ai'
import { getDestination } from '@/lib/destinations'
import { STORY_MODEL } from '@/lib/ai'

export const maxDuration = 30

const LENSES: Record<string, string> = {
  arrival:
    'Write as if the reader is arriving for the very first time — the sounds, smells, and light of that first hour.',
  heritage:
    'Focus on the deep history and living traditions — who kept them alive and why they still matter.',
  cuisine:
    'Center the story on food and the table — ingredients, the people who cook, and what a meal reveals about the culture.',
  artisan:
    'Follow a single craft and the hands that practice it — the workshop, the materials, the lineage.',
}

export async function POST(req: Request) {
  const { slug, lens }: { slug: string; lens: string } = await req.json()
  const destination = getDestination(slug)

  if (!destination) {
    return new Response('Unknown destination', { status: 400 })
  }

  const lensInstruction = LENSES[lens] ?? LENSES.arrival

  const result = streamText({
    model: STORY_MODEL,
    system:
      'You are a gifted travel writer in the tradition of the best cultural long-form journalism. ' +
      'You write immersive, sensory, second-person present-tense vignettes that honor local people and traditions. ' +
      'You are warm, specific, and never clichéd or exoticizing. Keep it to 3 short paragraphs (about 180 words). ' +
      'Do not use headings or lists. Do not invent specific named living people.',
    prompt:
      `Write an immersive story about ${destination.name}, ${destination.country}.\n\n` +
      `Context to weave in truthfully:\n` +
      `- Character: ${destination.tagline}\n` +
      `- Heritage: ${destination.heritage}\n` +
      `- Signature experiences: ${destination.experiences.join('; ')}\n\n` +
      `Lens: ${lensInstruction}`,
  })

  return result.toTextStreamResponse()
}
