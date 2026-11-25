import { ArrowLeft, ArrowRight, Building2, Calculator, CalendarCheck2, Rocket, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { ChannelMark } from '../../components/Social'
import { Btn, Reveal } from '../../components/Ui'
import { SITE } from '../../data'
import { cx } from '../../lib/cx'
import { useLocale } from '../../lib/locale'
import { EASE } from '../../lib/motion'

export type ResourceSlug = 'go-live' | 'credits' | 'industries' | 'walkthrough'

export const RESOURCE_SLUGS: ResourceSlug[] = ['go-live', 'credits', 'industries', 'walkthrough']

export const RESOURCE_META: Record<
  ResourceSlug,
  {
    accent: string
    accentSecondary: string
    soft: string
    heroGradient: string
    glow: string
    glowSecondary: string
    badgeTint: string
    icon: typeof Rocket
  }
> = {
  'go-live': {
    accent: '#1A63D8',
    accentSecondary: '#0E9A9E',
    soft: '#e2edff',
    heroGradient: 'linear-gradient(155deg,#040d1c 0%,#081b3a 48%,#0b2a63 100%)',
    glow: 'rgb(26 99 216 / 0.45)',
    glowSecondary: 'rgb(14 154 158 / 0.34)',
    badgeTint: '#7DE8E2',
    icon: Rocket,
  },
  credits: {
    accent: '#0E9A9E',
    accentSecondary: '#1A63D8',
    soft: '#ddf5f4',
    heroGradient: 'linear-gradient(155deg,#041317 0%,#062634 50%,#0b3b4e 100%)',
    glow: 'rgb(14 154 158 / 0.45)',
    glowSecondary: 'rgb(26 99 216 / 0.36)',
    badgeTint: '#7DE8E2',
    icon: Calculator,
  },
  industries: {
    accent: '#6F4BF2',
    accentSecondary: '#1A63D8',
    soft: '#ece6ff',
    heroGradient: 'linear-gradient(155deg,#07091e 0%,#151242 50%,#0e2a66 100%)',
    glow: 'rgb(111 75 242 / 0.45)',
    glowSecondary: 'rgb(26 99 216 / 0.35)',
    badgeTint: '#B9A6FF',
    icon: Building2,
  },
  walkthrough: {
    accent: '#1A63D8',
    accentSecondary: '#E1306C',
    soft: '#ece6ff',
    heroGradient: 'linear-gradient(155deg,#080b1f 0%,#16153c 48%,#2b1644 100%)',
    glow: 'rgb(111 75 242 / 0.42)',
    glowSecondary: 'rgb(225 48 108 / 0.34)',
    badgeTint: '#FF9CC2',
    icon: CalendarCheck2,
  },
}

/** Shared top navigation: back to resources + animated 4-guide pill switcher. */
export function ResourceTopBar({ activeSlug }: { activeSlug: ResourceSlug }) {
  const { copy } = useLocale()
  const rp = copy.resourcePages
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Link
        to="/#resources"
        className="group inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/85 px-3.5 py-2 text-[13px] font-medium text-muted shadow-[0_8px_20px_-16px_rgb(9_30_74/0.4)] backdrop-blur-md transition-[border-color,color,transform] hover:border-brand/35 hover:text-brand"
      >
        <ArrowLeft
          className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
          aria-hidden
        />
        {rp.back}
      </Link>

      <nav
        aria-label={copy.resources.eyebrow}
        className="hide-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto rounded-full border border-line bg-white/80 p-1 shadow-[0_10px_26px_-20px_rgb(9_30_74/0.35)] backdrop-blur-md sm:mx-0"
      >
        {RESOURCE_SLUGS.map((slug) => {
          const active = slug === activeSlug
          const item = rp.pages[slug]
          const meta = RESOURCE_META[slug]
          const Icon = meta.icon
          return (
            <Link
              key={slug}
              to={`/resources/${slug}`}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors',
                active ? 'text-white' : 'text-muted hover:text-ink',
              )}
            >
              {active && (
                <motion.span
                  layoutId={reduce ? undefined : 'resource-top-pill'}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] shadow-[0_8px_20px_-10px_rgb(26_99_216/0.8)]"
                  aria-hidden
                />
              )}
              <Icon className="relative z-10 size-3.5 shrink-0" aria-hidden />
              <span className="relative z-10 whitespace-nowrap">{item.tag}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

/** Shared atmospheric dark hero shell with animated floating orbs and shimmer top hairline. */
export function ResourceHeroShell({
  slug,
  children,
}: {
  slug: ResourceSlug
  children: ReactNode
}) {
  const theme = RESOURCE_META[slug]
  const reduce = useReducedMotion()

  return (
    <div
      className="on-dark relative mt-5 overflow-hidden rounded-[26px] border border-white/12 px-5 py-7 text-white shadow-[0_34px_80px_-34px_rgb(4_13_28/0.75)] sm:mt-6 sm:rounded-[34px] sm:px-9 sm:py-10 lg:px-11 lg:py-12"
      style={{ background: theme.heroGradient }}
    >
      {/* Animated ambient orbs */}
      <motion.span
        className="pointer-events-none absolute -top-28 -end-20 size-[24rem] rounded-full blur-3xl motion-reduce:transform-none"
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 68%)` }}
        animate={reduce ? undefined : { x: [0, -18, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.span
        className="pointer-events-none absolute -bottom-32 -start-16 size-[20rem] rounded-full blur-3xl motion-reduce:transform-none"
        style={{ background: `radial-gradient(circle, ${theme.glowSecondary}, transparent 70%)` }}
        animate={reduce ? undefined : { x: [0, 16, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_60%_30%,#000,transparent_78%)]"
        aria-hidden
      />
      {/* Top animated gradient hairline */}
      <motion.span
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left"
        style={{ background: `linear-gradient(90deg, ${theme.badgeTint}, ${theme.accent}, transparent)` }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-hidden
      />

      <div className="relative">{children}</div>
    </div>
  )
}

/** Shared Pro Tip callout + related briefs cards + closing CTA band. */
export function ResourceFooterBand({ slug }: { slug: ResourceSlug }) {
  const { copy, locale } = useLocale()
  const rp = copy.resourcePages
  const page = rp.pages[slug]
  const theme = RESOURCE_META[slug]
  const related = RESOURCE_SLUGS.filter((s) => s !== slug)

  return (
    <>
      {/* ------------------------------------------------------------ pro tip */}
      <section className="relative px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="scale" y={20}>
            <div
              className="relative overflow-hidden rounded-[24px] border bg-white/90 p-5 shadow-[0_22px_48px_-34px_rgb(9_30_74/0.4)] backdrop-blur-sm sm:rounded-[28px] sm:p-7"
              style={{
                borderColor: `${theme.accent}30`,
                background: `linear-gradient(135deg, ${theme.soft}aa 0%, #ffffff 52%, #f6faff 100%)`,
              }}
            >
              <span
                className="pointer-events-none absolute -top-16 -end-12 size-44 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${theme.accent}28, transparent 70%)` }}
                aria-hidden
              />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-[0_14px_26px_-14px_rgb(26_99_216/0.6)]"
                    style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary})` }}
                  >
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="caps text-[10.5px]" style={{ color: theme.accent }}>
                      {rp.tipLabel}
                    </p>
                    <p className="mt-1.5 max-w-3xl text-[14.5px] leading-relaxed font-medium text-ink-2 sm:text-[15.5px]">
                      {page.tip}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Btn href="/demo" size="sm" variant="primary" iconRight={<ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />}>
                    {rp.ctaDemo}
                  </Btn>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-[13.5px] font-medium text-ink transition-colors hover:border-[#25D366] hover:text-[#128C7E]"
                  >
                    <ChannelMark kind="whatsapp" className="size-5" glyphClassName="size-3" rounded="rounded-full" />
                    {rp.ctaWa}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ related */}
      <section className="relative px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-16">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="caps text-brand">{rp.related}</p>
                <h2 className="display mt-1.5 text-[1.4rem] text-ink sm:text-[1.75rem]">
                  {locale === 'ar' ? 'واصل استكشاف المنصة' : 'Keep exploring the briefs'}
                </h2>
              </div>
              <Link
                to="/ai-employee"
                className="hidden items-center gap-1.5 rounded-full border border-line-strong bg-white/85 px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand sm:inline-flex"
              >
                <Sparkles className="size-3.5 text-brand" aria-hidden />
                {copy.resources.featuredCta}
                <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-5 grid gap-3.5 md:grid-cols-3">
            {related.map((otherSlug, i) => {
              const item = copy.resources.items.find((it) => it.href === `/resources/${otherSlug}`)
              const meta = RESOURCE_META[otherSlug]
              const Icon = meta.icon
              if (!item) return null
              return (
                <li key={otherSlug} className="h-full">
                  <Reveal delay={0.06 * i} variant="up" y={22} className="h-full">
                    <Link
                      to={item.href}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white/90 p-5 shadow-[0_16px_36px_-28px_rgb(9_30_74/0.4)] transition-[transform,border-color,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1.5 hover:border-brand/35 hover:shadow-[0_26px_50px_-28px_rgb(26_99_216/0.4)] sm:p-6"
                    >
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-50 opacity-75 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                        style={{ background: `linear-gradient(90deg, ${meta.accent}, ${meta.accentSecondary})` }}
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute -top-14 -end-10 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle, ${meta.accent}24, transparent 70%)` }}
                        aria-hidden
                      />
                      <div className="relative flex items-center justify-between gap-2">
                        <span
                          className="grid size-10 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                          style={{ background: meta.soft, color: meta.accent }}
                        >
                          <Icon className="size-4.5" aria-hidden />
                        </span>
                        <span
                          className="caps rounded-full px-2.5 py-1 text-[10px]"
                          style={{ background: meta.soft, color: meta.accent }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="relative mt-4 text-[16px] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
                        {item.title}
                      </h3>
                      <p className="relative mt-1.5 flex-1 text-[13.5px] leading-relaxed text-muted">{item.body}</p>

                      <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                        {copy.resources.read}
                        <ArrowRight
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
