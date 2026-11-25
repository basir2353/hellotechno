import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router'

import { cx } from '../lib/cx'
import { EASE, revealVariants, staggerContainer, type RevealVariant } from '../lib/motion'

/** Scroll-triggered entrance — slide / scale / rise (not fade-only). */
export function Reveal({
  delay = 0,
  y = 36,
  variant = 'up',
  className,
  children,
  once = true,
  immediate = false,
}: HTMLAttributes<HTMLDivElement> & {
  delay?: number
  y?: number
  variant?: RevealVariant
  once?: boolean
  /** Play on mount (hero / above-the-fold) instead of waiting for scroll. */
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  const variants = revealVariants(variant, y)

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' as const }
        : {
            whileInView: 'visible' as const,
            viewport: { once, amount: 0.05 as const, margin: '0px 0px -12% 0px' },
          })}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Parent for staggered children Reveals / motion items. */
export function Stagger({
  className,
  children,
  once = true,
}: {
  className?: string
  children: ReactNode
  once?: boolean
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

/** Count-up once when scrolled into view. */
export function CountUp({ value, duration = 1.35 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    if (!inView) return
    motionValue.set(0)
    const id = window.setTimeout(() => motionValue.set(value), 40)
    return () => window.clearTimeout(id)
  }, [inView, value, motionValue, reduce])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  void duration
  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}

/** A live dot that keeps breathing. */
export function PulseDot({ className, tone = 'teal' }: { className?: string; tone?: 'teal' | 'brand' }) {
  return (
    <span className={cx('relative inline-grid size-2 shrink-0 place-items-center', className)} aria-hidden>
      <span className={cx('absolute inset-0 rounded-full', tone === 'teal' ? 'bg-teal' : 'bg-brand', 'animate-pulse-ring')} />
      <span className={cx('size-2 rounded-full', tone === 'teal' ? 'bg-teal' : 'bg-brand')} />
    </span>
  )
}

const buttonBase =
  'round group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] prs:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const buttonVariants = {
  primary:
    'bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-white shadow-[var(--shadow-brand)] hov:brightness-[1.06] hov:shadow-[0_26px_60px_-20px_rgb(26_99_216/0.7)]',
  solid: 'bg-ink text-white hov:bg-ink-2',
  outline: 'border border-line-strong bg-white/70 text-ink hov:border-brand hov:text-brand',
  ghost: 'text-ink hov:bg-white/70',
  light: 'on-dark bg-white text-ink hov:bg-white/90',
} as const

const buttonSizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
} as const

export function Btn({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconRight,
  external,
}: {
  href: string
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  className?: string
  children: ReactNode
  iconRight?: ReactNode
  external?: boolean
}) {
  const classNames = cx(buttonBase, buttonVariants[variant], buttonSizes[size], className)
  const content = (
    <>
      <span>{children}</span>
      {iconRight}
    </>
  )

  if (!external && href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={classNames}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classNames}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {content}
    </a>
  )
}

/** Eyebrow + heading + supporting copy, used to open each section. */
export function SectionHead({
  eyebrow,
  title,
  body,
  align = 'center',
  tone = 'ink',
  accent = '#1A63D8',
  className,
}: {
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  align?: 'center' | 'left'
  tone?: 'ink' | 'light'
  accent?: string
  className?: string
}) {
  return (
    <div className={cx('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-start', className)}>
      <span
        className={cx('caps inline-flex items-center gap-2')}
        style={{ color: tone === 'light' ? 'rgb(255 255 255 / 0.7)' : accent }}
      >
        <span className={cx('h-px w-6')} style={{ background: tone === 'light' ? 'rgb(255 255 255 / 0.4)' : accent }} aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={cx(
          'display mt-4 text-[clamp(1.9rem,1.2rem+2.4vw,3.4rem)] tracking-[-0.03em]',
          tone === 'light' ? 'text-white' : 'text-ink',
          align === 'center' ? 'mx-auto max-w-[22ch] text-center' : 'max-w-[20ch] text-start',
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cx(
            'mt-5 text-[clamp(1rem,0.96rem+0.2vw,1.12rem)] leading-relaxed text-pretty',
            tone === 'light' ? 'text-night-muted' : 'text-muted',
            align === 'center' ? 'mx-auto max-w-2xl text-center' : 'w-full max-w-[36ch] text-start',
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/** One question open at a time — numbered floating rows. */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i
        const n = String(i + 1).padStart(2, '0')
        return (
          <motion.li
            key={item.q}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
            className={cx(
              'overflow-hidden rounded-[20px] border transition-[border-color,box-shadow,background-color] duration-[var(--duration-base)]',
              isOpen
                ? 'border-brand/25 bg-white shadow-[0_18px_40px_-28px_rgb(26_99_216/0.45)]'
                : 'border-line bg-white/75 hover:border-line-strong hover:bg-white hover:shadow-[0_12px_28px_-24px_rgb(9_30_74/0.4)]',
            )}
          >
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-3.5 px-4 py-4 text-start sm:gap-4 sm:px-5 sm:py-5"
              >
                <span
                  className={cx(
                    'mt-0.5 grid size-9 shrink-0 place-items-center rounded-[12px] text-[12px] font-semibold tabular-nums transition-colors duration-[var(--duration-fast)]',
                    isOpen
                      ? 'bg-[linear-gradient(140deg,#1a63d8,#4b53e8)] text-white shadow-[0_10px_20px_-12px_rgb(26_99_216/0.7)]'
                      : 'bg-soft text-muted group-hover:bg-brand-soft group-hover:text-brand',
                  )}
                  aria-hidden
                >
                  {n}
                </span>
                <span
                  className={cx(
                    'min-w-0 flex-1 pt-1 text-[clamp(0.98rem,0.92rem+0.3vw,1.12rem)] leading-snug font-medium tracking-[-0.02em] transition-colors',
                    isOpen ? 'text-ink' : 'text-ink-2 group-hover:text-ink',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cx(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-[var(--duration-fast)]',
                    isOpen
                      ? 'border-brand bg-brand text-white'
                      : 'border-line-strong text-muted group-hover:border-brand group-hover:text-brand',
                  )}
                >
                  {isOpen ? <Minus className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-brand/10 px-4 pt-1 pb-5 sm:px-5">
                    <p className="max-w-3xl ps-[3.25rem] text-[14.5px] leading-relaxed text-muted sm:ps-[3.5rem]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </ul>
  )
}
