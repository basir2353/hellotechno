import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Clock3,
  Languages,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  Utensils,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { CalendlyEmbed } from '../components/CalendlyEmbed'
import { Brand, Mark } from '../components/Logo'
import { ChannelMark, SocialRow } from '../components/Social'
import { CHANNELS, INDUSTRIES, SITE } from '../data'
import { cx } from '../lib/cx'
import { LangToggle, useLocale } from '../lib/locale'
import { EASE } from '../lib/motion'

const STEPS_EN = [
  {
    n: '01',
    title: 'Pick a slot',
    body: 'Choose a time that fits. Thirty minutes, calendar confirmed instantly.',
  },
  {
    n: '02',
    title: 'We run your scenario',
    body: 'Live on WhatsApp, voice or web chat — Arabic and English — with your kind of inquiries.',
  },
  {
    n: '03',
    title: 'Leave with a plan',
    body: 'Channels, go-live order and a clear next step. No deck. No obligation.',
  },
] as const

const STEPS_AR = [
  {
    n: '01',
    title: 'اختر وقتاً',
    body: 'اختر وقتاً يناسبك. ثلاثون دقيقة، ويُؤكَّد الموعد فوراً في التقويم.',
  },
  {
    n: '02',
    title: 'نشغّل سيناريوك',
    body: 'مباشرة على واتساب أو الصوت أو الدردشة — بالعربية والإنجليزية — بأسئلة من نوع عملك.',
  },
  {
    n: '03',
    title: 'تغادر بخطة',
    body: 'القنوات، ترتيب الإطلاق، وخطوة تالية واضحة. بلا عرض شرائح. بلا التزام.',
  },
] as const

const AGENDA_EN = [
  'Your channels into one governed inbox',
  'Arabic + English replies from your knowledge',
  'A live booking or order into a system you already run',
  'One-click human takeover and the audit trail',
  'Go-live order sized to your operation',
] as const

const AGENDA_AR = [
  'قنواتك في صندوق وارد واحد محكوم',
  'ردود بالعربية والإنجليزية من معرفتك المعتمدة',
  'حجز أو طلب حي في نظام تستخدمه أصلاً',
  'تسليم بشري بنقرة والتدقيق الكامل',
  'ترتيب إطلاق يناسب تشغيلك',
] as const

const PROOF_EN = [
  { value: '30 min', label: 'live product walkthrough' },
  { value: '6', label: 'channels in one queue' },
  { value: 'EN + AR', label: 'native on chat & voice' },
  { value: 'GCC', label: 'hospitality to SMB' },
] as const

const PROOF_AR = [
  { value: '٣٠ د', label: 'عرض منتج مباشر' },
  { value: '٦', label: 'قنوات في صندوق واحد' },
  { value: 'عر + إن', label: 'أصلي على الدردشة والصوت' },
  { value: 'الخليج', label: 'من الضيافة إلى الأعمال' },
] as const

const INDUSTRY_ICONS = [Building2, MessageCircle, Utensils, Phone, Store] as const

function SiteAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-canvas" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgb(226_237_255/0.95),transparent_48%),radial-gradient(ellipse_at_88%_8%,rgb(236_230_255/0.55),transparent_42%),radial-gradient(ellipse_at_50%_100%,rgb(221_245_244/0.45),transparent_50%)]" />
      <div className="absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,#000,transparent_72%)]" />
      <div className="absolute -top-32 -left-24 size-[min(100vw,520px)] animate-[float_11s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.38),transparent_65%)] blur-2xl motion-reduce:animate-none" />
      <div className="absolute -top-20 right-0 size-[min(90vw,460px)] animate-[float_14s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.34),transparent_65%)] blur-2xl motion-reduce:animate-none" />
      <div className="absolute top-[42%] left-1/3 size-[min(80vw,420px)] animate-[drift_16s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.3),transparent_65%)] blur-2xl motion-reduce:animate-none" />
      <div className="absolute right-[8%] bottom-[18%] size-[min(70vw,360px)] animate-[float_13s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.22),transparent_70%)] blur-2xl motion-reduce:animate-none" />
    </div>
  )
}

function DemoStage({ ar }: { ar: boolean }) {
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setTick((t) => (t + 1) % 3), 2800)
    return () => window.clearInterval(id)
  }, [reduce])

  const lines = ar
    ? [
        { who: 'guest' as const, text: 'هل عندكم طاولة لشخصين الساعة ٨؟' },
        { who: 'ai' as const, text: 'نعم — الطاولة محجوزة. أرسل رابط التأكيد.' },
        { who: 'guest' as const, text: 'تمام، شكراً.' },
      ]
    : [
        { who: 'guest' as const, text: 'Table for two at 8pm?' },
        { who: 'ai' as const, text: 'Held. Confirmation link is in this chat.' },
        { who: 'guest' as const, text: 'Perfect — see you then.' },
      ]

  const visible = lines.slice(0, tick + 1)

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgb(26_99_216/0.2),transparent_55%),radial-gradient(circle_at_80%_70%,rgb(14_154_158/0.18),transparent_50%)] blur-2xl"
        animate={reduce ? undefined : { opacity: [0.55, 0.95, 0.55], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
        className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/85 shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-line/80 bg-[linear-gradient(115deg,#0b3a9c,#1a63d8_55%,#0e9a9e)] px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <Mark className="size-8 rounded-full bg-white p-1" />
            <div>
              <p className="text-[13px] font-semibold tracking-[-0.02em]">Hello Techno</p>
              <p className="text-[11px] text-white/70">{ar ? 'عرض مباشر · ٣٠ دقيقة' : 'Live demo · 30 min'}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#9ff0ea]">
            <span className="size-1.5 animate-pulse-ring rounded-full bg-teal" />
            {ar ? 'متصل' : 'Live'}
          </span>
        </div>

        <div className="min-h-[13.5rem] space-y-2.5 bg-[linear-gradient(180deg,#f6f9ff,#ffffff)] p-4">
          {visible.map((line, i) => (
            <motion.div
              key={`${tick}-${i}-${line.text}`}
              initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={cx('flex', line.who === 'guest' ? 'justify-end' : 'justify-start')}
            >
              <p
                className={cx(
                  'max-w-[85%] rounded-[16px] px-3.5 py-2 text-[13px] leading-relaxed',
                  line.who === 'guest'
                    ? 'rounded-ee-md bg-[linear-gradient(125deg,#1a63d8,#0e9a9e)] text-white'
                    : 'rounded-es-md border border-line bg-white text-ink-2',
                )}
              >
                {line.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
          {[
            { Icon: Clock3, label: ar ? '٣٠ دقيقة' : '30 minutes' },
            { Icon: Languages, label: ar ? 'عربي + إنجليزي' : 'EN + AR' },
            { Icon: Sparkles, label: ar ? 'منتج حي' : 'Live product' },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-1.5 bg-white px-2 py-3 text-[11.5px] font-medium text-muted">
              <Icon className="size-3.5 text-brand" aria-hidden />
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute -start-3 top-16 hidden size-12 place-items-center rounded-2xl border border-line bg-white shadow-[0_16px_32px_-18px_rgb(9_30_74/0.4)] sm:grid"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChannelMark kind="whatsapp" className="size-8" glyphClassName="size-4" rounded="rounded-xl" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute -end-2 bottom-24 hidden size-12 place-items-center rounded-2xl border border-line bg-white shadow-[0_16px_32px_-18px_rgb(9_30_74/0.4)] sm:grid"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <ChannelMark kind="voice" className="size-8" glyphClassName="size-4" rounded="rounded-xl" />
      </motion.div>
    </div>
  )
}

export function Demo() {
  const { copy, locale } = useLocale()
  const ar = locale === 'ar'
  const reduce = useReducedMotion()
  const steps = ar ? STEPS_AR : STEPS_EN
  const agenda = ar ? AGENDA_AR : AGENDA_EN
  const proof = ar ? PROOF_AR : PROOF_EN

  const headline = ar ? 'احجز عرضاً مجانياً' : 'Book a free demo'
  const support = ar
    ? 'ثلاثون دقيقة على قنوات عملك — مباشرة، بالعربية والإنجليزية.'
    : 'Thirty minutes on your business channels — live, in English and Arabic.'

  return (
    <main id="main" className="relative min-h-svh overflow-x-hidden bg-canvas text-ink">
      <SiteAtmosphere />

      {/* Top bar */}
      <header className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link to="/" aria-label="Hello Techno — home" className="inline-flex transition-opacity hover:opacity-90">
          <Brand size="md" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-[14px] border border-line-strong/80 bg-white/80 px-3 py-2 text-[13px] font-medium text-ink backdrop-blur sm:inline-flex"
          >
            <ChannelMark kind="voice" className="size-6" glyphClassName="size-3" rounded="rounded-full" />
            {SITE.phone}
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" aria-hidden />
            {ar ? 'الرئيسية' : 'Home'}
          </Link>
        </div>
      </header>

      {/* -------- Hero -------- */}
      <section className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-12 pt-4 sm:px-6 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
        <div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="caps inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pr-3.5 pl-2 text-brand"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
              <Sparkles className="size-3 animate-[bob_3.5s_ease-in-out_infinite]" aria-hidden />
            </span>
            <span className="truncate">{copy.hero.partnerEyebrow}</span>
          </motion.span>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE }}
            className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.35rem,1.2rem+3.8vw,4.2rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          >
            <span className="bg-[linear-gradient(105deg,#0b3a9c_0%,#1a63d8_45%,#0e9a9e_100%)] bg-clip-text text-transparent">
              Hello Techno
            </span>
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,1.1rem+2.2vw,2.85rem)] font-semibold tracking-[-0.035em] text-ink"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-muted sm:text-[17px]"
          >
            {support}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-faint sm:text-[14px]"
          >
            {SITE.serving}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#schedule"
              className="group inline-flex h-12 items-center gap-2 rounded-[16px] bg-[linear-gradient(115deg,#1a63d8,#4b53e8_40%,#0e9a9e)] px-6 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-[transform,filter] hover:brightness-105 active:scale-[0.98] sm:h-14 sm:px-7 sm:text-[16px]"
            >
              {ar ? 'اختر وقتك' : 'Pick a time'}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-12 items-center gap-2 rounded-[16px] border border-line-strong bg-white/80 px-5 text-[14.5px] font-medium text-ink backdrop-blur transition-colors hover:border-brand hover:text-brand sm:h-14"
            >
              <ChannelMark kind="whatsapp" className="size-7" glyphClassName="size-3.5" rounded="rounded-full" />
              WhatsApp
            </a>
          </motion.div>

          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
            className="mt-9 grid max-w-lg grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-6 sm:grid-cols-4"
          >
            {proof.map((p) => (
              <div key={p.label}>
                <dt className="text-[1.05rem] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[1.12rem]">
                  {p.value}
                </dt>
                <dd className="mt-1.5 text-[11px] leading-tight text-muted sm:text-[11.5px]">{p.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <DemoStage ar={ar} />
      </section>

      {/* -------- Channels strip -------- */}
      <section className="relative z-10 border-y border-line/80 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="caps text-brand">{copy.channelStrip.eyebrow}</p>
            <p className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-[16px]">
              {ar ? 'نلتقي عملاءك حيث هم بالفعل.' : 'Meet customers where they already are.'}
            </p>
          </div>
          <SocialRow kinds={CHANNELS.map((c) => c.kind)} className="justify-start lg:justify-end" />
        </div>
      </section>

      {/* -------- Built for your business -------- */}
      <section className="relative z-10">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 sm:py-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="caps text-teal">{ar ? 'لقطاعك' : 'For your industry'}</p>
            <h2 className="display mt-3 text-[clamp(1.65rem,1.1rem+1.7vw,2.4rem)] text-ink">
              {ar ? 'مبني لأعمال الخليج' : 'Built for GCC businesses'}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {ar
                ? 'الضيافة، العيادات، المطاعم، وكالات السيارات والأعمال النامية — نفس المنصة، قواعدك أنت.'
                : 'Hospitality, clinics, restaurants, dealerships and growing businesses — one platform, your rules.'}
            </p>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRIES.map((ind, i) => {
              const Icon = INDUSTRY_ICONS[i] ?? Building2
              return (
                <motion.div
                  key={ind.key}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className="rounded-[18px] border border-line bg-white/75 p-4 backdrop-blur-sm transition-[border-color,transform] hover:-translate-y-0.5 hover:border-brand/35"
                >
                  <span
                    className="grid size-9 place-items-center rounded-[12px]"
                    style={{ background: `${ind.accent}18`, color: ind.accent }}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <p className="mt-3 text-[14px] font-semibold tracking-[-0.02em] text-ink">{ind.name}</p>
                  <p className="mt-1 text-[12px] leading-snug text-muted">{ind.tagline}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -------- Schedule + agenda -------- */}
      <section id="schedule" className="relative z-10 scroll-mt-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(226_237_255/0.7),transparent_45%),radial-gradient(ellipse_at_80%_100%,rgb(221_245_244/0.5),transparent_45%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.15fr] lg:items-start lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:sticky lg:top-8"
          >
            <p className="caps text-brand">{ar ? 'التقويم' : 'Calendar'}</p>
            <h2 className="display mt-3 text-[clamp(1.7rem,1.15rem+1.8vw,2.5rem)] text-ink">
              {ar ? 'اختر اليوم والوقت' : 'Choose a day and time'}
            </h2>
            <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-muted">
              {ar
                ? 'تقويم Hello Techno هنا مباشرة. أكّد الموعد في أقل من دقيقة — بلا تسجيل مسبق.'
                : 'Hello Techno’s calendar is right here. Confirm in under a minute — no signup first.'}
            </p>

            <div className="mt-7 rounded-[22px] border border-line bg-white/80 p-5 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.02em] text-ink">
                <ShieldCheck className="size-4 text-teal" aria-hidden />
                {ar ? 'ماذا سترى في العرض' : 'What you will see'}
              </p>
              <ul className="mt-4 space-y-3">
                {agenda.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5 text-[13px]">
              <a href={`mailto:${SITE.email}`} className="font-semibold text-brand hover:underline">
                {SITE.email}
              </a>
              <span className="text-faint">·</span>
              <a href={SITE.phoneHref} className="font-semibold text-brand hover:underline">
                {SITE.phone}
              </a>
              <span className="text-faint">·</span>
              <span className="text-muted">{SITE.location}</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, delay: 0.06, ease: EASE }}
            className="overflow-hidden rounded-[24px] border border-line bg-white p-1.5 shadow-[0_30px_70px_-36px_rgb(9_30_74/0.35)] sm:p-2.5"
          >
            <div className="border-b border-line bg-[linear-gradient(180deg,#f8fbff,#ffffff)] px-4 py-3 sm:px-5">
              <p className="text-[13px] font-semibold text-ink">
                {ar ? 'احجز جلسة ٣٠ دقيقة' : 'Book a 30-minute session'}
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                {ar ? 'منتج حي — لا شرائح' : 'Live product — not slides'}
              </p>
            </div>
            <CalendlyEmbed height={680} />
          </motion.div>
        </div>
      </section>

      {/* -------- What happens next -------- */}
      <section className="relative z-10 border-t border-line/70 bg-white/40 backdrop-blur-sm">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <p className="caps text-teal">{ar ? 'بعد الحجز' : 'After you book'}</p>
            <h2 className="display mt-3 text-[clamp(1.65rem,1.1rem+1.6vw,2.35rem)] text-ink">
              {ar ? 'ثلاث خطوات بسيطة' : 'Three simple steps'}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{copy.demo.body}</p>
          </motion.div>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              >
                <p className="font-[family-name:var(--font-display)] text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-brand/20">
                  {step.n}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.body}</p>
              </motion.li>
            ))}
          </ol>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-8 text-[13.5px] text-ink-2">
            {copy.demo.bullets.map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <Check className="size-3.5 shrink-0 text-teal" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------- Close -------- */}
      <footer className="relative z-10 overflow-hidden border-t border-line bg-[linear-gradient(155deg,#040d1c_0%,#081b3a_48%,#062a32_100%)] text-white">
        <div
          className="pointer-events-none absolute -top-28 -end-24 size-[min(90vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.35),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-36 -start-20 size-[min(80vw,460px)] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.32),transparent_70%)] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
          <div>
            <Brand size="sm" light />
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-night-muted">
              {ar
                ? 'جاهزون عندما تكون جاهزاً. اختر وقتاً أو راسلنا مباشرة من الدوحة.'
                : 'Ready when you are. Pick a time, or reach us directly from Doha.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#schedule"
              className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-semibold text-brand-deep transition-[transform,filter] hover:brightness-105 active:scale-[0.98]"
            >
              {ar ? 'افتح التقويم' : 'Open calendar'}
              <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-white/20 px-5 text-[14px] font-medium text-white transition-colors hover:border-white/45"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
