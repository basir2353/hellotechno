import { useEffect } from 'react'

import { SITE } from '../data'

const API_BASE = 'https://admin-api.heyservo.ai'
const CORE_URL = 'https://admin-api.heyservo.ai/widget/assets/core-7bec3584d2.js'
const KEY_RE = /^pk_live_[A-Za-z0-9_-]{20,64}$/

const LAUNCHER_CSS = `
:host, * { box-sizing: border-box; font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif; }
.hs-launch {
  position: fixed; bottom: max(24px, env(safe-area-inset-bottom, 0px)); height: 56px; min-width: 56px; padding: 0;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.22); cursor: pointer; color: #fff;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  z-index: 2147483000;
  box-shadow: 0 18px 38px -12px rgba(26,99,216,0.58), 0 4px 12px rgba(15,23,42,0.16);
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.hs-pos-right { right: max(24px, env(safe-area-inset-right, 0px)); }
.hs-pos-left { left: max(24px, env(safe-area-inset-left, 0px)); }
.hs-launch:hover { transform: translateY(-2px) scale(1.04); filter: brightness(1.06); }
.hs-launch:active { transform: scale(0.97); }
.hs-launch img { width: 32px; height: 32px; border-radius: 50%; object-fit: contain; background: #fff; padding: 3px; }
.hs-launch svg { width: 24px; height: 24px; }
.hs-launch-spin {
  width: 20px; height: 20px; border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,.35); border-top-color: #fff;
  animation: hs-spin .7s linear infinite;
}
@keyframes hs-spin { to { transform: rotate(360deg); } }
`

const CHAT_SVG =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.1-3.5A7.96 7.96 0 0 1 4 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'

type HeyServoSession = {
  visitor_token?: string
  agent_name?: string
  theme?: Record<string, unknown>
  [key: string]: unknown
}

type HeyServoCoreModule = {
  mount: (opts: {
    hostEl: HTMLElement
    shadow: ShadowRoot
    apiBase: string
    publicKey: string
    session: HeyServoSession
    openOnMount: boolean
    openMode: string
  }) => { open?: () => void; destroy?: () => void }
}

declare global {
  interface Window {
    HeyServoWidget?: {
      publicKey: string
      open: () => void
      destroy: () => void
    }
  }
}

function visitorStorageKey(key: string) {
  return `heyservo.visitor.${key}`
}

function readVisitorToken(key: string) {
  try {
    return window.localStorage.getItem(visitorStorageKey(key))
  } catch {
    return null
  }
}

function saveVisitorToken(key: string, token: string) {
  try {
    window.localStorage.setItem(visitorStorageKey(key), token)
  } catch {
    /* ignore storage errors */
  }
}

function publicKey() {
  return (import.meta.env.VITE_HEYSERVO_PUBLIC_KEY || SITE.heyservoPublicKey || '').trim()
}

export function HeyServoWidget() {
  useEffect(() => {
    const key = publicKey()
    if (!KEY_RE.test(key)) {
      console.warn('[heyservo] Missing or invalid public widget key (pk_live_…).')
      return
    }
    // Avoid duplicate loaders; clear orphan hosts left by HMR / interrupted mounts.
    if (window.HeyServoWidget) return
    document.getElementById('heyservo-widget-host')?.remove()

    let cancelled = false
    let mountedWidget: { open?: () => void; destroy?: () => void } | null = null
    let corePromise: Promise<HeyServoCoreModule> | null = null

    const loadCore = () =>
      corePromise ?? (corePromise = import(/* @vite-ignore */ CORE_URL) as Promise<HeyServoCoreModule>)

    // Create host & instant launcher immediately on page load so there is zero delay
    const hostEl = document.createElement('div')
    hostEl.id = 'heyservo-widget-host'
    document.body.appendChild(hostEl)

    const shadow = hostEl.attachShadow({ mode: 'open' })
    const styleEl = document.createElement('style')
    styleEl.textContent = LAUNCHER_CSS
    shadow.appendChild(styleEl)

    const btn = document.createElement('button')
    btn.type = 'button'
    // Default matches official widget.js when theme.position is bottom_right
    btn.className = 'hs-launch hs-pos-right'
    btn.style.background = 'linear-gradient(135deg, #5457e6, #6366f1)'
    btn.setAttribute('aria-label', 'Chat with Hello Techno')
    btn.innerHTML = `<img src="/images/hello-techno-mark.png" alt="" />`
    shadow.appendChild(btn)

    let sessionPromise: Promise<HeyServoSession> | null = null
    const getSession = () => {
      if (sessionPromise) return sessionPromise
      sessionPromise = (async () => {
        const res = await fetch(`${API_BASE}/widget/v1/session?k=${encodeURIComponent(key)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_token: readVisitorToken(key) }),
        })
        if (!res.ok) throw new Error(`HeyServo session failed (${res.status})`)
        const raw = (await res.json()) as HeyServoSession
        if (raw.visitor_token) saveVisitorToken(key, raw.visitor_token)

        // Customize presentation only. Server flags such as emailGate stay unchanged.
        const theme = {
          ...(raw.theme ?? {}),
          primaryColor: '#5457e6',
          title: 'Hello Techno',
          subtitle: null,
          greeting:
            "Hi! I'm Hello Techno's AI assistant, and someone from our team can join anytime. How can I help you today?\n\nمرحباً! أنا المساعد الذكي من Hello Techno، ويمكن لأحد أعضاء فريقنا الانضمام في أي وقت. كيف يمكنني مساعدتك اليوم؟",
          launcherLabel: 'Chat with us',
          logoUrl: null,
        }

        return {
          ...raw,
          agent_name: 'Hello Techno',
          theme,
        }
      })()
      return sessionPromise
    }

    // Warm up session; apply official theme.position to the pre-open launcher
    void getSession()
      .then((session) => {
        if (cancelled || !shadow.contains(btn)) return
        const position = (session.theme as { position?: string } | undefined)?.position
        btn.className = `hs-launch ${position === 'bottom_left' ? 'hs-pos-left' : 'hs-pos-right'}`
        const label = (session.theme as { launcherLabel?: string } | undefined)?.launcherLabel
        if (label) btn.setAttribute('aria-label', label)
      })
      .catch(() => {
        sessionPromise = null
      })

    const openWidget = async () => {
      btn.innerHTML = '<span class="hs-launch-spin"></span>'
      try {
        const [session, core] = await Promise.all([getSession(), loadCore()])
        if (cancelled) return
        while (shadow.firstChild) shadow.removeChild(shadow.firstChild)
        mountedWidget = core.mount({
          hostEl,
          shadow,
          apiBase: API_BASE,
          publicKey: key,
          session,
          openOnMount: true,
          openMode: 'default',
        })
      } catch (err) {
        console.error('[heyservo] Failed to open widget:', err)
        corePromise = null
        sessionPromise = null
        btn.innerHTML = CHAT_SVG
      }
    }

    btn.addEventListener('pointerenter', () => void loadCore().catch(() => (corePromise = null)), { once: true })
    btn.addEventListener('click', () => void openWidget())

    window.HeyServoWidget = {
      publicKey: key,
      open: () => {
        if (mountedWidget?.open) mountedWidget.open()
        else void openWidget()
      },
      destroy: () => {
        mountedWidget?.destroy?.()
        hostEl.remove()
        delete window.HeyServoWidget
      },
    }

    return () => {
      cancelled = true
      mountedWidget?.destroy?.()
      hostEl.remove()
      delete window.HeyServoWidget
    }
  }, [])

  return null
}
