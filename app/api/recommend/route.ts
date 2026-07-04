import { generateText, Output } from 'ai'
import { z } from 'zod'
import { destinations } from '@/lib/destinations'
import { RECOMMEND_MODEL } from '@/lib/ai'

export const maxDuration = 30

const schema = z.object({
  recommendations: z
    .array(
      z.object({
        slug: z
          .string()
          .describe('The slug of the recommended destination from the list'),
        reason: z
          .string()
          .describe(
            'A warm, specific 1-2 sentence reason this fits the traveler, referencing their interests',
          ),
        culturalHighlight: z
          .string()
          .describe('One concrete cultural experience they should not miss'),
      }),
    )
    .describe('3 to 4 ranked recommendations, best match first'),
})

export async function POST(req: Request) {
  const {
    interests,
    vibe,
    travelStyle,
  }: { interests: string; vibe: string; travelStyle: string } =
    await req.json()

  const catalog = destinations
    .map(
      (d) =>
        `- ${d.slug}: ${d.name}, ${d.country}. ${d.tagline}. Tags: ${d.tags.join(', ')}.`,
    )
    .join('\n')

  try {
    const { output } = await generateText({
      model: RECOMMEND_MODEL,
      output: Output.object({ schema }),
      system:
        'You are a thoughtful cultural travel curator. Recommend ONLY destinations from the provided list, ' +
        'using their exact slugs. Match the traveler to places that fit their interests and style. ' +
        'Be specific and avoid generic language. Never invent destinations that are not in the list.',
      prompt:
        `Traveler interests: ${interests || 'open to anything'}\n` +
        `Desired vibe: ${vibe || 'no preference'}\n` +
        `Travel style: ${travelStyle || 'no preference'}\n\n` +
        `Available destinations:\n${catalog}`,
    })

    return Response.json(output)
  } catch {
    return new Response('Failed to generate recommendations', { status: 500 })
  }
}
