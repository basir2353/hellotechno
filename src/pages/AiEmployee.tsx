import {
  ArrowRight,
  Box,
  Check,
  Lock,
  MapPin,
  Play,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserRound,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router'

import { Mark } from '../components/Logo'
import { ChannelMark, SOCIALS } from '../components/Social'
import { PulseDot } from '../components/Ui'
import { SITE } from '../data'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import { EASE, revealVariants, type RevealVariant } from '../lib/motion'

const FEATURE_ICONS = [ShoppingBag, UserRound, Lock, Box, Truck, Star]

const WA_QR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE.whatsapp)}`

function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  variant = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  variant?: RevealVariant
}) {
  const reduce = useReducedMotion()
  const variants = revealVariants(variant, y)
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px', amount: 0.05 }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function WaBtn({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13.5px] font-semibold text-white shadow-[0_14px_32px_-14px_rgb(37_211_102/0.75)] transition-[transform,filter] duration-[var(--duration-fast)] hover:brightness-105 active:scale-[0.98] sm:w-auto sm:px-5 sm:text-[14.5px]',
        className,
      )}
    >
      <ChannelMark kind="whatsapp" className="size-6 shrink-0" glyphClassName="size-3.5" rounded="rounded-full" />
      <span className="text-center leading-snug">{label}</span>
    </a>
  )
}

function DemoBtn({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      to="/demo"
      className={cx(
        'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_55%,#6f4bf2)] px-4 py-3 text-[13.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-[transform,filter] duration-[var(--duration-fast)] hover:brightness-105 active:scale-[0.98] sm:w-auto sm:px-5 sm:text-[14.5px]',
        className,
      )}
    >
      <span className="text-center leading-snug">{label}</span>
      <ArrowRight className="size-4 shrink-0" aria-hidden />
    </Link>
  )
}

function StatValue({ value }: { value: string }) {
  return (
    <span className="display text-[clamp(1.55rem,1.2rem+1.4vw,2.45rem)] break-words text-brand">
      {value}
    </span>
  )
}

function CallCard() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!agree || !phone.trim()) return
    const msg = encodeURIComponent(
      `Hi Hello Techno — please call me for an AI Employee demo.\nNumber: +974 ${phone.trim()}${marketing ? '\n(OK to keep me posted)' : ''}`,
    )
    window.open(`${SITE.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-line bg-white/90 p-4 shadow-[var(--shadow-card)] backdrop-blur-sm sm:rounded-[28px] sm:p-8">
      <span className="pointer-events-none absolute -top-16 -end-10 size-40 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.18),transparent_70%)] blur-2xl" aria-hidden />
      <div className="relative flex items-start gap-2">
        <PulseDot className="mt-1.5 size-1.5 shrink-0" />
        <h2 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.3rem]">{p.callTitle}</h2>
      </div>
      <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">{p.callBody}</p>

      <form onSubmit={submit} className="relative mt-5 flex flex-1 flex-col sm:mt-6">
        <div className="flex overflow-hidden rounded-2xl border border-line-strong bg-soft/50 transition-[border-color,box-shadow] focus-within:border-brand focus-within:shadow-[var(--shadow-focus)]">
          <span className="flex shrink-0 items-center gap-1 border-e border-line px-2.5 text-[12px] font-medium text-ink sm:gap-1.5 sm:px-3.5 sm:text-[13.5px]">
            <span aria-hidden>🇶🇦</span>
            <span className="whitespace-nowrap">+974</span>
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={p.callPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[14.5px] text-ink outline-none placeholder:text-faint sm:px-3.5 sm:py-3.5"
            required
          />
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-snug text-muted">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-brand"
            required
          />
          <span>{p.callAgree}</span>
        </label>

        <label className="mt-2.5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-snug text-muted">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-brand"
          />
          <span>{p.callMarketing}</span>
        </label>

        <button
          type="submit"
          disabled={!agree}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_55%,#6f4bf2)] text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-[filter,opacity,transform] hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {p.callCta}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className="mt-2.5 text-center text-[12px] text-faint">{p.callHint}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="text-[12px] text-faint">{p.callOr}</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>
        <Link to="/demo" className="mt-3 text-center text-[14px] font-semibold text-brand hover:text-brand-deep">
          {p.callBrowser}
        </Link>
      </form>
    </article>
  )
}

function WhatsAppCard() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const reduce = useReducedMotion()

  return (
    <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-line bg-white/90 p-4 shadow-[var(--shadow-card)] backdrop-blur-sm sm:rounded-[28px] sm:p-8">
      <span className="pointer-events-none absolute -top-12 -start-8 size-36 rounded-full bg-[radial-gradient(circle,rgb(37_211_102/0.2),transparent_70%)] blur-2xl" aria-hidden />
      <span className="relative inline-flex w-fit max-w-full items-center gap-1.5 self-center rounded-full bg-[#25D366]/15 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#128C7E] uppercase">
        <ChannelMark kind="whatsapp" className="size-4 shrink-0" glyphClassName="size-2.5" rounded="rounded-full" />
        {p.waBadge}
      </span>
      <h2 className="relative mt-3 text-center text-[1.15rem] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.3rem]">
        {p.waTitle}
      </h2>
      <p className="relative mt-2 text-center text-[13.5px] leading-relaxed text-muted sm:text-[14px]">{p.waBody}</p>

      <div className="relative mt-5 flex flex-1 flex-col gap-4 rounded-[18px] bg-[linear-gradient(160deg,#e8f8ef,#f4fcf7)] p-3 sm:rounded-[22px] sm:p-4 md:flex-row md:items-stretch">
        <div className="flex flex-col items-center justify-center gap-2 md:w-[40%]">
          <motion.div
            className="rounded-2xl bg-white p-2 shadow-[0_12px_28px_-18px_rgb(9_30_74/0.35)] motion-reduce:transform-none sm:p-2.5"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={WA_QR} alt="" width={160} height={160} className="size-[120px] sm:size-[140px] md:size-[150px]" />
          </motion.div>
          <p className="text-[12.5px] font-medium text-[#128C7E]">{p.waScan}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          {[
            {
              key: 'u',
              node: (
                <div className="max-w-full self-end rounded-2xl rounded-ee-md bg-white px-3 py-2 text-[12px] leading-snug break-words text-ink shadow-sm sm:max-w-[95%] sm:text-[12.5px]">
                  {p.waUserMsg}
                </div>
              ),
            },
            {
              key: 'v',
              node: (
                <>
                  <div className="flex max-w-full items-center gap-2 self-start rounded-2xl rounded-es-md bg-[#25D366] px-3 py-2 text-white shadow-sm sm:max-w-[90%]">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/20">
                      <Play className="size-3.5 fill-white" aria-hidden />
                    </span>
                    <span className="h-5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/25">
                      <span className="block h-full w-2/3 animate-shimmer rounded-full bg-white/40" />
                    </span>
                    <span className="shrink-0 text-[11px] tabular-nums opacity-90">0:12</span>
                  </div>
                  <p className="ps-1 text-[10.5px] text-[#128C7E]">{p.waVoice}</p>
                </>
              ),
            },
            {
              key: 'b',
              node: (
                <div className="max-w-full self-start rounded-2xl rounded-es-md bg-white px-3 py-2 text-[12px] leading-snug break-words text-ink shadow-sm sm:max-w-[95%] sm:text-[12.5px]">
                  {p.waBotMsg}
                </div>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={item.key}
              className="flex flex-col gap-1"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.45, ease: EASE }}
            >
              {item.node}
            </motion.div>
          ))}
        </div>
      </div>

      <p className="relative mt-4 text-center text-[12px] break-words text-muted sm:text-[12.5px]">
        {p.waOn} · {SITE.phone}
      </p>
      <WaBtn label={p.waCta} className="relative mt-3 !w-full" />
    </article>
  )
}

function FeatureCard({
  title,
  body,
  image,
  icon: Icon,
  delay,
}: {
  title: string
  body: string
  image: string
  icon: typeof ShoppingBag
  delay: number
}) {
  return (
    <FadeIn delay={delay} y={36} variant={delay > 0.1 ? 'scale' : 'up'}>
      <article className="group relative min-h-[240px] overflow-hidden rounded-[20px] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgb(5_16_31/0.55)] sm:min-h-[300px] sm:rounded-[24px] lg:min-h-[320px]">
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_16_31/0.1)_0%,rgb(5_16_31/0.45)_42%,rgb(5_16_31/0.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(26_99_216/0.25),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-full min-h-[240px] flex-col justify-end p-4 sm:min-h-[300px] sm:p-6 lg:min-h-[320px]">
          <span className="mb-3 grid size-9 place-items-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 sm:size-10">
            <Icon className="size-4" aria-hidden />
          </span>
          <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-balance text-white sm:text-[1.15rem]">{title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-pretty text-white/80 sm:text-[13.5px]">{body}</p>
        </div>
      </article>
    </FadeIn>
  )
}

export function AiEmployee() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main id="main" className="relative overflow-x-hidden bg-canvas pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-24 pb-10 sm:px-6 sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_20%,transparent_75%)]" />
          <div className="absolute -top-28 left-1/2 size-[min(100vw,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#cfe2ff_0%,transparent_68%)] blur-2xl" />
          <div className="absolute top-24 -start-24 hidden size-[22rem] rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.16),transparent_70%)] blur-3xl sm:block" />
          <div className="absolute top-40 -end-16 hidden size-[18rem] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.14),transparent_70%)] blur-3xl sm:block" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3 py-1.5 text-[11.5px] font-medium text-brand shadow-[0_10px_24px_-18px_rgb(26_99_216/0.5)] backdrop-blur-sm sm:px-3.5 sm:text-[12.5px]"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
              <Sparkles className="size-3" aria-hidden />
            </span>
            <span className="min-w-0 text-start leading-snug text-pretty sm:text-center">{p.badge}</span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mx-auto mt-6 grid size-14 place-items-center rounded-[20px] bg-white shadow-[var(--shadow-card)] ring-1 ring-line sm:mt-7 sm:size-[4.5rem] sm:rounded-[22px]"
          >
            <Mark className="size-10 sm:size-12" glow />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            className="display mt-4 text-[clamp(1.9rem,1.2rem+3.2vw,4.2rem)] tracking-[-0.045em] text-ink sm:mt-5"
          >
            {copy.nav.find((n) => n.href === '/ai-employee')?.label ?? 'AI Employee'}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="display mx-auto mt-3 max-w-[22ch] text-[clamp(1.25rem,1rem+1.6vw,2.35rem)] leading-[1.25] tracking-[-0.03em] text-balance text-ink sm:mt-4 sm:max-w-none"
          >
            {p.headlineLead}{' '}
            <span className="bg-[linear-gradient(115deg,#1a63d8,#6f4bf2_55%,#0e9a9e)] bg-clip-text text-transparent">
              {p.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl px-1 text-[14.5px] leading-relaxed text-pretty text-muted sm:mt-5 sm:text-[16.5px]"
          >
            {p.body}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-2.5"
          >
            {SOCIALS.map((kind, i) => (
              <motion.span
                key={kind}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.05, duration: 0.4, ease: EASE }}
              >
                <ChannelMark
                  kind={kind}
                  className="size-8 shadow-[0_10px_20px_-12px_rgb(9_30_74/0.45)] ring-2 ring-white sm:size-9"
                  glyphClassName="size-3.5 sm:size-4"
                  rounded="rounded-full"
                />
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------ try it live */}
      <section className="relative px-4 pb-12 sm:px-6 sm:pb-20">
        <div className="mx-auto grid w-full max-w-[1100px] gap-4 sm:gap-5 lg:grid-cols-2">
          <FadeIn delay={0.05} variant="left" className="min-w-0">
            <CallCard />
          </FadeIn>
          <FadeIn delay={0.15} variant="right" className="min-w-0">
            <WhatsAppCard />
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------------------------------------- features */}
      <section className="relative px-3 py-4 sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-[1200px] rounded-[22px] border border-line bg-white/70 p-4 shadow-[0_24px_60px_-40px_rgb(9_30_74/0.35)] backdrop-blur-sm sm:rounded-[32px] sm:p-8 lg:p-10">
          <FadeIn>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/80 px-3 py-1 text-[11.5px] font-medium text-brand sm:text-[12px]">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span className="min-w-0 leading-snug">{p.handlesBadge}</span>
                </span>
                <h2 className="display mt-3 text-[clamp(1.45rem,1.1rem+1.6vw,2.6rem)] tracking-[-0.03em] text-balance text-ink sm:mt-4">
                  {p.handlesTitle}
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-pretty text-muted sm:text-[14.5px] lg:pb-1">
                {p.handlesBody}
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <FeatureCard key={f.title} {...f} icon={FEATURE_ICONS[i] ?? ShoppingBag} delay={0.04 * i} />
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:mt-5 md:grid-cols-3">
            {p.stats.map((s, i) => (
              <FadeIn key={s.label} delay={0.06 * i}>
                <div className="rounded-[18px] border border-line bg-[linear-gradient(165deg,#ffffff,#f3f7ff)] px-4 py-5 text-center sm:rounded-[22px] sm:px-5 sm:py-6">
                  <p className="caps px-1 text-[10px] leading-snug text-faint">{s.label}</p>
                  <div className="mt-2">
                    <StatValue value={s.value} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[11.5px] leading-relaxed text-pretty text-faint sm:text-[12px]">
            {p.statsNote}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- multi-brand */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <FadeIn className="min-w-0">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-teal/20 bg-teal-soft/80 px-3 py-1 text-[11.5px] font-medium text-teal-deep sm:text-[12px]">
              <span className="size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
              <span className="min-w-0 leading-snug">{p.multiBadge}</span>
            </span>
            <h2 className="display mt-3 text-[clamp(1.45rem,1.1rem+1.6vw,2.55rem)] tracking-[-0.03em] text-balance text-ink sm:mt-4">
              {p.multiTitle}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-pretty text-muted sm:mt-4 sm:text-[15px]">{p.multiBody}</p>
            <ul className="mt-5 space-y-3 sm:mt-6">
              {p.multiPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: EASE }}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-2 sm:text-[14.5px]"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="min-w-0 text-pretty">{point}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <DemoBtn label={p.multiDemo} />
              <WaBtn label={p.multiWa} />
            </div>
          </FadeIn>

          <FadeIn delay={0.12} y={40} variant="scale" className="min-w-0">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <span className="pointer-events-none absolute -inset-3 rounded-[36px] bg-[radial-gradient(circle_at_40%_30%,rgb(26_99_216/0.2),transparent_65%)] blur-xl sm:-inset-4" aria-hidden />
              <motion.div
                className="relative overflow-hidden rounded-[22px] shadow-[var(--shadow-float)] ring-1 ring-white/80 motion-reduce:transform-none sm:rounded-[28px]"
                animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src={p.multiImage} alt="" className="aspect-[5/4] w-full object-cover sm:aspect-[5/6]" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(5_16_31/0.55))] p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[12.5px] font-medium text-white sm:text-[13px]">
                    <PulseDot className="size-1.5" />
                    24/7 · EN + AR
                  </p>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------- people */}
      <section className="relative px-4 py-10 sm:px-6 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgb(233_241_254/0.7),transparent)]" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <FadeIn className="min-w-0">
            <span className="inline-flex max-w-full items-center gap-2 text-[12.5px] font-medium text-brand sm:text-[13px]">
              <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              {p.peopleBadge}
            </span>
            <h2 className="display mt-3 text-[clamp(1.45rem,1.1rem+1.6vw,2.55rem)] tracking-[-0.03em] text-balance text-ink sm:mt-4">
              {p.peopleTitleLead}{' '}
              <span className="bg-[linear-gradient(115deg,#1a63d8,#6f4bf2)] bg-clip-text text-transparent">
                {p.peopleTitleAccent}
              </span>
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-pretty text-muted sm:mt-4 sm:text-[15px]">{p.peopleBody}</p>
            <ul className="mt-5 space-y-3 sm:mt-6">
              {p.peoplePoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-2 sm:text-[14.5px]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="min-w-0 text-pretty">{point}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} y={32} className="min-w-0">
            <aside className="relative overflow-hidden rounded-[22px] border border-line bg-white/95 p-4 shadow-[var(--shadow-float)] sm:rounded-[28px] sm:p-7">
              <span className="pointer-events-none absolute -top-20 -end-16 size-48 rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.18),transparent_70%)] blur-2xl" aria-hidden />
              <div className="relative flex items-center gap-3 sm:gap-3.5">
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-soft ring-2 ring-white shadow-[0_10px_24px_-12px_rgb(26_99_216/0.45)] sm:size-14">
                  <Mark className="size-8 sm:size-9" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[1rem] font-semibold text-ink sm:text-[1.05rem]">{p.peopleName}</p>
                  <p className="text-[12.5px] text-muted sm:text-[13px]">{p.peopleRole}</p>
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-brand sm:text-[12.5px]">
                    <MapPin className="size-3.5 shrink-0" aria-hidden />
                    {p.peoplePlace}
                  </p>
                </div>
              </div>
              <blockquote className="relative mt-4 rounded-2xl border-s-4 border-brand bg-soft/90 px-3.5 py-3 text-[13px] leading-relaxed text-pretty text-ink-2 sm:mt-5 sm:px-4 sm:py-3.5 sm:text-[13.5px]">
                {p.peopleQuote}
              </blockquote>
              <div className="relative mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row">
                <DemoBtn label={p.peopleDemo} className="sm:flex-1" />
                <WaBtn label={p.peopleWa} className="sm:flex-1" />
              </div>
              <p className="relative mt-4 text-[12px] leading-relaxed text-pretty text-muted sm:text-[12.5px]">
                {p.peopleFoot}{' '}
                <a href={SITE.phoneHref} className="font-semibold break-all text-brand underline underline-offset-2">
                  {SITE.phone}
                </a>
              </p>
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* ----------------------------------------------------------- language */}
      <section className="relative px-3 pb-12 sm:px-6 sm:pb-20">
        <FadeIn y={40}>
          <div className="relative mx-auto grid w-full max-w-[1200px] overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,#061225_0%,#0a1f3d_48%,#07293a_100%)] sm:rounded-[32px] lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=60)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(180deg, transparent, black 55%)',
              }}
              aria-hidden
            />
            <span className="pointer-events-none absolute -top-20 start-1/4 size-72 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.45),transparent_70%)] blur-3xl" aria-hidden />

            <div className="relative z-[1] order-2 p-5 sm:p-10 lg:order-1 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-medium text-white/85 backdrop-blur-sm sm:text-[12px]">
                <PulseDot className="size-1.5" />
                {p.langBadge}
              </span>
              <h2 className="display mt-4 text-[clamp(1.4rem,1.05rem+1.5vw,2.4rem)] tracking-[-0.03em] text-balance text-white sm:mt-5">
                {p.langTitle}
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-pretty text-white/70 sm:mt-4 sm:text-[14.5px]">{p.langBody}</p>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {p.dialects.map((d, i) => (
                  <motion.span
                    key={d.en}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.4, ease: EASE }}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] text-white/90 backdrop-blur-sm sm:px-3.5 sm:text-[13px]"
                  >
                    <span className="font-medium">{d.ar}</span>
                    <span className="text-white/50"> · {d.en}</span>
                  </motion.span>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] text-pretty text-white/55 sm:text-[13px]">{p.langMore}</p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <DemoBtn label={p.langDemo} />
                <WaBtn label={p.langWa} />
              </div>
              <p className="mt-3 text-[12px] text-white/45 sm:text-[12.5px]">{p.langHint}</p>
            </div>

            <div className="relative z-[1] order-1 p-4 sm:p-7 lg:order-2 lg:p-8">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-[20px] shadow-[0_30px_60px_-28px_rgb(0_0_0/0.55)] sm:max-w-none sm:rounded-[24px]">
                <img
                  src={p.langImage}
                  alt=""
                  className="aspect-[5/4] w-full object-cover object-[center_20%] sm:aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-night/80 p-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
                  <p className="caps flex items-center gap-1.5 text-[9.5px] text-aqua sm:text-[10px]">
                    <PulseDot className="size-1.5" />
                    Voice call · Arabic
                  </p>
                  <p className="mt-2 rounded-xl bg-white/10 px-2.5 py-1.5 text-[11.5px] leading-snug text-white/80 sm:px-3 sm:py-2 sm:text-[12.5px]" dir="rtl">
                    مرحباً، أبي أحجز كيكة ليوم الجمعة لو سمحت
                  </p>
                  <p className="mt-2 max-w-full rounded-xl bg-brand px-2.5 py-1.5 text-[11.5px] leading-snug text-white sm:max-w-[90%] sm:px-3 sm:py-2 sm:text-[12.5px]" dir="rtl">
                    أكيد. لأي مناسبة؟ وأبغى الاسم يُكتب على الكيكة؟
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
