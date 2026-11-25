import { useEffect, useRef } from 'react'

const CALENDLY_URL =
  'https://calendly.com/rabbiazaheer8/30min?hide_gdpr_banner=1&primary_color=4f46e5'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget?: (opts: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

export function CalendlyEmbed({ height = 650 }: { height?: number }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    const init = () => {
      if (window.Calendly?.initInlineWidget && hostRef.current) {
        hostRef.current.innerHTML = ''
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: hostRef.current,
        })
      }
    }

    if (window.Calendly?.initInlineWidget) {
      init()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = CALENDLY_SCRIPT
      script.async = true
      script.addEventListener('load', init, { once: true })
      document.body.appendChild(script)
    } else {
      script.addEventListener('load', init, { once: true })
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
