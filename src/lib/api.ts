export type ApiResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

/** POST JSON to a worker/API route and normalise the response. */
export async function postJson<T = unknown>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const raw = await res.text()
    const contentType = res.headers.get('content-type') ?? ''
    let parsed: Record<string, unknown> | null = null
    if (raw) {
      try {
        parsed = JSON.parse(raw) as Record<string, unknown>
      } catch {
        parsed = null
      }
    }

    if (!parsed || typeof parsed !== 'object') {
      if (!contentType.includes('application/json')) {
        return {
          ok: false,
          error:
            res.status === 404 || res.status >= 500
              ? 'The assistant service is unavailable right now. Email us or try again shortly.'
              : 'Something went wrong. Please try again.',
        }
      }
      return { ok: false, error: 'Something went wrong. Please try again.' }
    }

    if (!res.ok) {
      return {
        ok: false,
        error: typeof parsed.error === 'string' ? parsed.error : 'Something went wrong. Please try again.',
        fieldErrors: (parsed.fieldErrors as Record<string, string>) ?? undefined,
      }
    }
    return { ok: true, data: parsed as T }
  } catch {
    return { ok: false, error: 'We could not reach the server. Check your connection and try again.' }
  }
}
