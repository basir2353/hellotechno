import { generateChatReply, type ChatAiEnv } from '../src/shared/chatAi'
import type { ChatTurn } from '../src/shared/chatKnowledge'

export const config = { runtime: 'edge' }

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Send a JSON object with messages.' }, 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Send a JSON object with messages.' }, 400)
  }

  const payload = body as { messages?: unknown; locale?: unknown }
  const messages = payload.messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'messages must be a non-empty array.' }, 400)
  }

  const locale = payload.locale === 'ar' ? 'ar' : 'en'

  const turns: ChatTurn[] = messages
    .filter(
      (m): m is ChatTurn =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatTurn).role === 'user' || (m as ChatTurn).role === 'assistant') &&
        typeof (m as ChatTurn).content === 'string',
    )
    .map((m) => ({ role: m.role, content: m.content }))

  const env: ChatAiEnv = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  }

  try {
    const reply = await generateChatReply(turns, env, locale)
    return json({ ok: true, reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed'
    if (message === 'MISSING_API_KEY') {
      return json(
        {
          error:
            'AI chatbot is not configured yet. Add GEMINI_API_KEY or OPENAI_API_KEY in Vercel Project Settings → Environment Variables.',
        },
        503,
      )
    }
    console.error('[api/chat]', message)
    return json({ error: 'The assistant could not reply right now. Please try again.' }, 502)
  }
}
