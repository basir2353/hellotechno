import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

import { generateChatReply } from './src/shared/chatAi'
import { validateContact } from './src/shared/validation'

function readJsonBody(req: import('http').IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function json(res: import('http').ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify(body))
}

function localApi(): Plugin {
  return {
    name: 'hello-techno-local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0]
        if (req.method !== 'POST' || (path !== '/api/chat' && path !== '/api/contact')) {
          next()
          return
        }

        let body: unknown
        try {
          body = await readJsonBody(req)
        } catch {
          json(res, 400, { error: 'Invalid JSON' })
          return
        }

        if (path === '/api/contact') {
          if (!body || typeof body !== 'object' || Array.isArray(body)) {
            json(res, 400, { error: 'Send a JSON object.' })
            return
          }
          const fieldErrors = validateContact(body as Record<string, unknown>)
          if (Object.keys(fieldErrors).length) {
            json(res, 422, { error: 'Please check the highlighted fields.', fieldErrors })
            return
          }
          const reference = `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          json(res, 201, { ok: true, reference })
          return
        }

        const payload = body as { messages?: unknown; locale?: unknown }
        const messages = payload.messages
        const locale = payload.locale === 'ar' ? 'ar' : 'en'
        const env = loadEnv(server.config.mode, server.config.root, '')
        try {
          const reply = await generateChatReply((messages as never) ?? [], {
            GEMINI_API_KEY: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
            OPENAI_API_KEY: env.OPENAI_API_KEY || process.env.OPENAI_API_KEY,
          }, locale)
          json(res, 200, { ok: true, reply })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Chat failed'
          json(res, message === 'MISSING_API_KEY' ? 503 : 502, {
            error:
              message === 'MISSING_API_KEY'
                ? 'Add GEMINI_API_KEY or OPENAI_API_KEY to a .env file in the project root.'
                : 'The assistant could not reply right now. Please try again.',
          })
        }
      })
    },
  }
}

// Local SPA-only config — skips Cloudflare workerd (fails on this machine).
export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
  server: { port: 5305, strictPort: false, host: '0.0.0.0' },
})
