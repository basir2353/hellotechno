import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'

function HashScroller() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!location.hash || !lenis) return
    const el = document.querySelector(location.hash)
    if (!(el instanceof HTMLElement)) return
    const id = window.setTimeout(() => {
      lenis.scrollTo(el, { offset: -88, duration: 1.15 })
    }, 40)
    return () => window.clearTimeout(id)
  }, [location.pathname, location.hash, lenis])

  useEffect(() => {
    if (!lenis) return

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href^="#"], a[href^="/#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const hash = href.includes('#') ? href.slice(href.indexOf('#')) : ''
      if (!hash || hash === '#') return

      if (href.startsWith('#') || (href.startsWith('/#') && location.pathname === '/')) {
        const el = document.querySelector(hash)
        if (!el) return
        event.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.2 })
        history.pushState(null, '', hash === '#top' ? '/' : hash)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis, location.pathname])

  return null
}

/** Sitewide momentum scrolling. Honours prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [smooth, setSmooth] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setSmooth(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!smooth) return children

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.35,
      }}
    >
      <HashScroller />
      {children}
    </ReactLenis>
  )
}
