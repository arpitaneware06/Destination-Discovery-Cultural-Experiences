import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { destinations } from '@/lib/destinations'
import { CHAT_MODEL } from '@/lib/ai'

export const maxDuration = 30

const catalog = destinations
  .map(
    (d) =>
      `${d.name}, ${d.country} (/destinations/${d.slug}) — ${d.tagline}. Known for: ${d.tags.join(', ')}.`,
  )
  .join('\n')

const SYSTEM = `You are the Wayfare Culture Companion, a warm and knowledgeable guide for travelers who want to engage authentically with local culture, heritage, and communities.

Your purpose:
- Recommend attractions, hidden gems, and heritage sites.
- Suggest local events, festivals, food, and artisan experiences.
- Help plan culturally respectful, immersive itineraries.
- Explain traditions, etiquette, and history so travelers engage meaningfully.

Guidelines:
- Be specific, sensory, and practical. Prefer authentic, community-based experiences over generic tourism.
- Encourage respectful, sustainable travel that benefits locals.
- Keep responses focused and skimmable; use short paragraphs and, when helpful, tight bullet lists.
- When a place in our collection is relevant, mention it by name so the traveler can explore its page.
- If asked about somewhere outside our collection, still help using your general knowledge, and gently note details should be verified locally.

Our featured collection:
${catalog}`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: CHAT_MODEL,
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
