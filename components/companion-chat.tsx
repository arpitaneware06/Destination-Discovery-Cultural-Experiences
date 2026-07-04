'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Send, Sparkles, Compass, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDestination } from '@/lib/destinations'

const STARTERS = [
  'Plan a 3-day cultural itinerary in Oaxaca',
  'What festivals happen in Kyoto in spring?',
  'Where can I meet artisans in Fez?',
  'Suggest a hidden gem for slow travel',
]

export function CompanionChat({ destinationSlug }: { destinationSlug?: string }) {
  const destination = destinationSlug ? getDestination(destinationSlug) : undefined
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, status])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
  }

  const greeting = destination
    ? `Ask me anything about experiencing ${destination.name} authentically.`
    : 'Ask me anything about experiencing a place through its culture.'

  return (
    <div className="flex h-[calc(100dvh-13rem)] min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6"
      >
        {messages.length === 0 && (
          <div className="mx-auto max-w-md py-8 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Compass className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-serif text-2xl font-semibold">
              Your culture companion
            </h2>
            <p className="mt-2 text-muted-foreground text-pretty">{greeting}</p>
            <div className="mt-6 grid gap-2 text-left">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
                >
                  <Sparkles
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground',
              )}
            >
              {message.parts.map((part, i) =>
                part.type === 'text' ? (
                  <span key={i} className="whitespace-pre-wrap text-pretty">
                    {part.text}
                  </span>
                ) : null,
              )}
            </div>
          </div>
        ))}

        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Thinking…
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-sm text-destructive">
            Something went wrong. Please try again.
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
        className="border-t border-border bg-background/60 p-3 sm:p-4"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={1}
            placeholder="Ask about culture, food, festivals, or itineraries…"
            className="max-h-40 min-h-11 flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Message the culture companion"
          />
          {busy ? (
            <button
              type="button"
              onClick={stop}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-secondary"
              aria-label="Stop generating"
            >
              <span className="size-3 rounded-sm bg-foreground" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
