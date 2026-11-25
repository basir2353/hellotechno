import { useEffect, useRef } from 'react'

export const CALENDLY_URL =
  'https://calendly.com/rabbiazaheer8/30min?hide_gdpr_banner=1&primary_color=1a63d8'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget?: (opts: {
        url: string
        parentElement: HTMLElement
        resize?: boolean
      }) => void
      initPopupWidget?: (opts: { url: string }) => void
    }
  }
}

let calendlyReady: Promise<void> | null = null

/** Load Calendly script + CSS once, then resolve. */
export function ensureCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Calendly?.initPopupWidget && window.Calendly?.initInlineWidget) {
    return Promise.resolve()
  }
  if (calendlyReady) return calendlyReady

  calendlyReady = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      document.head.appendChild(link)
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`)
    if (existing) {
      if (window.Calendly) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Calendly failed to load')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = CALENDLY_SCRIPT
    script.async = true
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Calendly failed to load')), { once: true })
    document.body.appendChild(script)
  }).catch((err) => {
    calendlyReady = null
    throw err
  })

  return calendlyReady
}

/** Open Calendly’s official popup calendar (used by “Book a free demo” clicks). */
export async function openCalendlyPopup() {
  await ensureCalendly()
  window.Calendly?.initPopupWidget?.({ url: CALENDLY_URL })
}

export function CalendlyEmbed({ height = 650 }: { height?: number }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    let cancelled = false

    void ensureCalendly().then(() => {
      if (cancelled || !hostRef.current || !window.Calendly?.initInlineWidget) return
      hostRef.current.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: hostRef.current,
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className="calendly-inline-widget w-full overflow-hidden rounded-[18px] bg-white"
      data-url={CALENDLY_URL}
      style={{ minWidth: '280px', height: `${height}px` }}
    />
  )
}
