import type { Transition, Variants } from 'motion/react'

/** Shared brand easing — soft overshoot, never snappy. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const springSoft = {
  type: 'spring',
  stiffness: 120,
  damping: 22,
  mass: 0.85,
} as const

export const tweenSoft = (delay = 0, duration = 0.7): Transition => ({
  duration,
  delay,
  ease: EASE,
})

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'clip'

export function revealVariants(variant: RevealVariant, distance = 36): Variants {
  const hidden: Record<string, number | string> = { opacity: 0 }
  const visible: Record<string, number | string> = { opacity: 1 }

  switch (variant) {
    case 'down':
      hidden.y = -distance
      visible.y = 0
      break
    case 'left':
      hidden.x = -distance
      visible.x = 0
      break
    case 'right':
      hidden.x = distance
      visible.x = 0
      break
    case 'scale':
      hidden.scale = 0.9
      visible.scale = 1
      break
    case 'blur':
      // Soft rise only — avoid filter:blur which can leave text invisible with Lenis.
      hidden.y = distance * 0.7
      hidden.scale = 0.98
      visible.y = 0
      visible.scale = 1
      break
    case 'clip':
      // Wipe-up without clip-path (clip-path + whileInView often sticks hidden).
      hidden.y = distance * 0.85
      hidden.opacity = 0
      visible.y = 0
      visible.opacity = 1
      break
    case 'up':
    default:
      hidden.y = distance
      visible.y = 0
      break
  }

  return {
    hidden,
    visible,
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
}

export const staggerItem = (variant: RevealVariant = 'up'): Variants => ({
  hidden: revealVariants(variant).hidden,
  visible: {
    ...revealVariants(variant).visible,
    transition: { duration: 0.55, ease: EASE },
  },
})
