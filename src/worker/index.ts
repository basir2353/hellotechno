import { Hono } from 'hono'

import { generateChatReply } from '../shared/chatAi'
import type { ChatTurn } from '../shared/chatKnowledge'
import { validateContact, type FieldErrors } from '../shared/validation'

// The Worker in front of the static site. /api/contact validates the demo
// request and returns a reference; connect it to email, a CRM or a D1 table
// to keep the requests. Everything else falls through to the built assets.
type Env = {
  ASSETS: Fetcher
  GEMINI_API_KEY?: string
  OPENAI_API_KEY?: string
}

const app = new Hono<{ Bindings: Env }>()

const reference = () => `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

const invalid = (fieldErrors: FieldErrors) =>
  Response.json({ error: 'Please check the highlighted fields.', fieldErrors }, { status: 422 })

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/contact', async (c) => {
  const body = await readBody(c.req.raw)
  if (!body) return Response.json({ error: 'Send a JSON object.' }, { status: 400 })

  const errors = validateContact(body)
  if (Object.keys(errors).length) return invalid(errors)

  return c.json({ ok: true, reference: reference() }, 201)
})

app.post('/api/chat', async (c) => {
  const body = await readBody(c.req.raw)
  if (!body) return Response.json({ error: 'Send a JSON object with messages.' }, { status: 400 })

  const raw = body.messages
  if (!Array.isArray(raw) || raw.length === 0) {
    return Response.json({ error: 'messages must be a non-empty array.' }, { status: 400 })
  }

  const locale = body.locale === 'ar' ? 'ar' : 'en'

  const messages: ChatTurn[] = raw
    .filter(
      (m): m is ChatTurn =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatTurn).role === 'user' || (m as ChatTurn).role === 'assistant') &&
        typeof (m as ChatTurn).content === 'string',
    )
    .map((m) => ({ role: m.role, content: m.content }))

  try {
    const reply = await generateChatReply(messages, {
      GEMINI_API_KEY: c.env.GEMINI_API_KEY,
      OPENAI_API_KEY: c.env.OPENAI_API_KEY,
    }, locale)
    return c.json({ ok: true, reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed'
    if (message === 'MISSING_API_KEY') {
      return Response.json(
        { error: 'AI chatbot is not configured yet. Add GEMINI_API_KEY or OPENAI_API_KEY.' },
        { status: 503 },
      )
    }
    return Response.json({ error: 'The assistant could not reply right now. Please try again.' }, { status: 502 })
  }
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
