import { useEffect } from 'react'

const SCRIPT_SRC = 'https://admin-api.heyservo.ai/widget.js'
const KEY_RE = /^pk_live_[A-Za-z0-9_-]{20,64}$/
const SCRIPT_ATTR = 'data-heyservo-official'

function publicKey() {
  return (import.meta.env.VITE_HEYSERVO_PUBLIC_KEY || '').trim()
}

/**
 * Temporary A/B loader: injects HeyServo's official widget.js exactly once.
 * Does not mount custom core or override session/theme.
 */
export function OfficialHeyServoScript() {
  useEffect(() => {
    const key = publicKey()
    if (!KEY_RE.test(key)) {
      console.warn('[heyservo] Missing or invalid public widget key (pk_live_…).')
      return
    }

    // Official widget.js also no-ops if window.HeyServoWidget already exists.
    if (window.HeyServoWidget) return
    if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return
    if (document.querySelector(`script[src="${SCRIPT_SRC}"][data-key]`)) return
    // Custom React loader host — must not run alongside official script.
    if (document.getElementById('heyservo-widget-host')) return

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.defer = true
    script.dataset.key = key
    script.setAttribute(SCRIPT_ATTR, '1')
    document.body.appendChild(script)

    // Official script owns the DOM host; do not remove it on React StrictMode remount.
    // Only skip re-injection via the guards above.
  }, [])

  return null
}
