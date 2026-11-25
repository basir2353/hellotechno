import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  Coins,
  Layers,
  MessageSquare,
  PhoneCall,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import { ChannelMark } from '../../components/Social'
import { Btn, PulseDot, Reveal } from '../../components/Ui'
import { PLANS, SITE } from '../../data'
import { cx } from '../../lib/cx'
import { useLocale } from '../../lib/locale'
import { EASE } from '../../lib/motion'
import { ResourceFooterBand, ResourceHeroShell, ResourceTopBar } from './shared'

type Preset = {
  id: string
  labelEn: string
  labelAr: string
  messages: number
  voiceMins: number
  locations: number
}

const PRESETS: Preset[] = [
  { id: 'cafe', labelEn: 'Boutique Café / Salon', labelAr: 'مقهى / صالون', messages: 1500, voiceMins: 0, locations: 1 },
  { id: 'clinic', labelEn: 'Busy Clinic / Restaurant', labelAr: 'عيادة / مطعم مزدحم', messages: 3000, voiceMins: 60, locations: 2 },
  { id: 'hotel', labelEn: 'Hotel / Multi-Branch', labelAr: 'فندق / عدة فروع', messages: 7000, voiceMins: 150, locations: 3 },
  { id: 'group', labelEn: 'Franchise Group', labelAr: 'مجموعة امتيازات', messages: 12000, voiceMins: 240, locations: 4 },
]

const SECTION_ICONS = [Coins, Layers, SlidersHorizontal] as const
const SECTION_ACCENTS = [
  { color: '#0E9A9E', soft: '#ddf5f4' },
  { color: '#1A63D8', soft: '#e2edff' },
  { color: '#6F4BF2', soft: '#ece6ff' },
] as const

function recommendPlanIndex(credits: number, voiceMins: number, locations: number) {
  if (locations >= 4 || credits > 750) return 3 // Enterprise
  if (locations === 3 || credits > 300 || voiceMins > 75) return 2 // Connected
  if (locations === 2 || voiceMins > 0 || credits > 100) return 1 // Growth
  return 0 // Starter
}

const PLAN_CAPACITY = [100, 300, 750, 1500] as const

export function CreditsPage() {
  const { copy, locale } = useLocale()
  const reduce = useReducedMotion()
  const rp = copy.resourcePages
  const page = rp.pages.credits
  const isAr = locale === 'ar'

  const [messages, setMessages] = useState(3000)
  const [voiceMins, setVoiceMins] = useState(60)
  const [locations, setLocations] = useState(2)

  const calc = useMemo(() => {
    const chatCredits = Math.ceil(messages / 20)
    const voiceCredits = voiceMins * 2
    const totalCredits = chatCredits + voiceCredits
    const estBookings = Math.max(10, Math.round(messages / 10))
    const matchedIdx = recommendPlanIndex(totalCredits, voiceMins, locations)
    const chatShare = totalCredits > 0 ? Math.round((chatCredits / totalCredits) * 100) : 100
    const voiceShare = 100 - chatShare
    const capacity = PLAN_CAPACITY[matchedIdx]
    const utilization = Math.min(100, Math.round((totalCredits / capacity) * 100))
    return {
      chatCredits,
      voiceCredits,
      totalCredits,
      estBookings,
      matchedIdx,
      chatShare,
      voiceShare,
      capacity,
      utilization,
    }
  }, [messages, voiceMins, locations])

  const localizedPlans = useMemo(
    () =>
      PLANS.map((plan, i) => {
        const t = copy.pricing.plans[i]
        return {
          accent: plan.accent,
          price: plan.price,
          featured: plan.featured,
          name: t?.name ?? plan.name,
          blurb: t?.blurb ?? plan.blurb,
          estimate: t?.estimate ?? plan.estimate,
          credits: t?.credits ?? plan.credits,
          currency: t?.currency ?? plan.currency,
          per: t?.per ?? plan.per,
        }
      }),
    [copy.pricing.plans],
  )

  const matchedPlan = localizedPlans[calc.matchedIdx]

  const heroUnits = [
    {
      icon: MessageSquare,
      accent: '#7DE8E2',
      val: '1 → 20',
      titleEn: '1 credit = 20 messages',
      titleAr: 'رصيد واحد = 20 رسالة',
      subEn: 'WhatsApp, IG, Web & SMS',
      subAr: 'واتساب، إنستغرام، الموقع و SMS',
    },
    {
      icon: PhoneCall,
      accent: '#45D4E8',
      val: '2 = 1 min',
      titleEn: '2 credits = 1 call minute',
      titleAr: 'رصيدان = دقيقة مكالمة',
      subEn: 'Bilingual AI Voice (Growth+)',
      subAr: 'صوت ذكي ثنائي اللغة (النمو+)',
    },
    {
      icon: TrendingUp,
      accent: '#8B7CFF',
      val: '~10 msgs',
      titleEn: 'Per confirmed booking',
      titleAr: 'لكل حجز أو طلب مؤكد',
      subEn: 'Full thread from hello to paid',
      subAr: 'محادثة كاملة حتى التأكيد',
    },
    {
      icon: Coins,
      accent: '#25D366',
      val: '≈ QAR 0.88',
      titleEn: 'Published rate / credit',
      titleAr: 'السعر المنشور لكل رصيد',
      subEn: 'Start with 50 free credits',
      subAr: 'ابدأ بـ 50 رصيداً مجانياً',
    },
  ]

  const applyPlanPreset = (index: number) => {
    const presets = [
      { messages: 1800, voiceMins: 0, locations: 1 },
      { messages: 3000, voiceMins: 75, locations: 2 },
      { messages: 7500, voiceMins: 165, locations: 3 },
      { messages: 12000, voiceMins: 240, locations: 4 },
    ]
    const p = presets[index]
    if (!p) return
    setMessages(p.messages)
    setVoiceMins(p.voiceMins)
    setLocations(p.locations)
  }

  return (
    <main id="main" className="relative overflow-x-hidden bg-canvas pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, #ddf5f4, transparent 52%), radial-gradient(ellipse at 86% 12%, rgb(26 99 216 / 0.14), transparent 44%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-45" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1160px]">
          <Reveal immediate variant="up" y={14}>
            <ResourceTopBar activeSlug="credits" />
          </Reveal>

          <Reveal immediate delay={0.06} variant="up" y={22}>
            <ResourceHeroShell slug="credits">
              <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="caps inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/85">
                      <Sparkles className="size-3 text-[#7DE8E2]" aria-hidden />
                      {page.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/15 px-3 py-1 text-[11px] font-semibold text-[#86ffae]">
                      <PulseDot className="size-1.5" />
                      {isAr ? '50 رصيداً مجانياً · صفر رسوم إعداد' : '50 free credits · Zero setup fee'}
                    </span>
                  </div>

                  <h1 className="display mt-4 max-w-[16ch] text-[clamp(1.9rem,1.25rem+2.5vw,3.35rem)] tracking-[-0.04em] text-balance text-white">
                    {page.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-[16.5px]">
                    {page.lead}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    <Btn
                      href="/demo"
                      size="md"
                      variant="light"
                      iconRight={<ArrowRight className="size-4 rtl:rotate-180" aria-hidden />}
                    >
                      {rp.ctaDemo}
                    </Btn>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-[14px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15"
                    >
                      <ChannelMark kind="whatsapp" className="size-6" glyphClassName="size-3" rounded="rounded-full" />
                      {rp.ctaWa}
                    </a>
                  </div>
                </div>

                {/* Animated Credit Conversion Matrix */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {heroUnits.map((unit, i) => {
                    const Icon = unit.icon
                    return (
                      <motion.div
                        key={unit.val}
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14 + i * 0.08, duration: 0.55, ease: EASE }}
                        whileHover={reduce ? undefined : { y: -4 }}
                        className="relative overflow-hidden rounded-[20px] border border-white/14 bg-white/[0.06] p-4 backdrop-blur-xl transition-colors hover:border-white/28 hover:bg-white/[0.09]"
                      >
                        <span
                          className="pointer-events-none absolute -top-10 -end-8 size-24 rounded-full blur-2xl"
                          style={{ background: `radial-gradient(circle, ${unit.accent}45, transparent 70%)` }}
                          aria-hidden
                        />
                        <span
                          className="relative grid size-9 place-items-center rounded-xl border border-white/15 bg-white/10"
                          style={{ color: unit.accent }}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <p
                          className="display relative mt-3.5 text-[1.25rem] tabular-nums sm:text-[1.45rem]"
                          style={{ color: unit.accent }}
                        >
                          {unit.val}
                        </p>
                        <p className="relative mt-1 text-[12.5px] font-semibold leading-snug text-white">
                          {isAr ? unit.titleAr : unit.titleEn}
                        </p>
                        <p className="relative mt-0.5 text-[11px] leading-snug text-white/55">
                          {isAr ? unit.subAr : unit.subEn}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </ResourceHeroShell>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------- interactive credit estimator */}
      <section className="relative px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="scale" y={24}>
            <div className="relative overflow-hidden rounded-[26px] border border-line bg-white/95 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm sm:rounded-[32px] sm:p-8">
              <span
                className="pointer-events-none absolute -top-28 -end-20 size-72 rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.14),transparent_70%)] blur-3xl"
                aria-hidden
              />

              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="caps inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1 text-[10px] text-teal-deep">
                    <Calculator className="size-3" aria-hidden />
                    {isAr ? 'حاسبة الأرصدة المباشرة' : 'Interactive Credit Estimator'}
                  </span>
                  <h2 className="display mt-2.5 text-[1.45rem] text-ink sm:text-[1.9rem]">
                    {isAr ? 'قدّر باقتك المناسبة خلال ثوانٍ' : 'Size your exact plan before you sign'}
                  </h2>
                  <p className="mt-1.5 max-w-xl text-[14px] text-muted">
                    {isAr
                      ? 'حرّك المؤشرات لحجم رسائلك ودقائق المكالمات وفروعك، وشاهد الرصيد الشهري والباقة المثالية فوراً.'
                      : 'Slide to match your busy-week chat volume, voice minutes and branch count — see the exact credit breakdown instantly.'}
                  </p>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((preset) => {
                    const active =
                      preset.messages === messages &&
                      preset.voiceMins === voiceMins &&
                      preset.locations === locations
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setMessages(preset.messages)
                          setVoiceMins(preset.voiceMins)
                          setLocations(preset.locations)
                        }}
                        className={cx(
                          'rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all',
                          active
                            ? 'border-brand bg-brand text-white shadow-[0_10px_20px_-12px_rgb(26_99_216/0.8)]'
                            : 'border-line bg-canvas/80 text-muted hover:border-brand/40 hover:text-ink',
                        )}
                      >
                        {isAr ? preset.labelAr : preset.labelEn}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Calculator Split Grid */}
              <div className="relative mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                {/* Left Sliders */}
                <div className="flex flex-col justify-between gap-5 rounded-[22px] border border-line bg-canvas/70 p-4 sm:p-6">
                  {/* Messages slider */}
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor="calc-messages" className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                        <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-brand">
                          <MessageSquare className="size-3.5" aria-hidden />
                        </span>
                        {isAr ? 'الرسائل الشهرية (واتساب، إنستغرام، الموقع)' : 'Monthly chat messages'}
                      </label>
                      <div className="text-end">
                        <span className="display text-[1.25rem] tabular-nums text-brand">
                          {messages.toLocaleString()}
                        </span>
                        <span className="ms-1.5 text-[11.5px] font-medium text-muted">
                          ({calc.chatCredits} {isAr ? 'رصيد' : 'credits'})
                        </span>
                      </div>
                    </div>
                    <input
                      id="calc-messages"
                      type="range"
                      min={500}
                      max={14000}
                      step={250}
                      value={messages}
                      onChange={(e) => setMessages(Number(e.target.value))}
                      className="ht-range mt-3.5 w-full"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-faint">
                      <span>500</span>
                      <span>3,000</span>
                      <span>7,500</span>
                      <span>14,000</span>
                    </div>
                  </div>

                  {/* Voice Minutes Slider */}
                  <div className="border-t border-line pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor="calc-voice" className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                        <span className="grid size-7 place-items-center rounded-lg bg-teal-soft text-teal-deep">
                          <PhoneCall className="size-3.5" aria-hidden />
                        </span>
                        {isAr ? 'دقائق المكالمات الصوتية شهرياً' : 'Monthly AI voice minutes'}
                      </label>
                      <div className="text-end">
                        <span className="display text-[1.25rem] tabular-nums text-teal-deep">{voiceMins}</span>
                        <span className="ms-1.5 text-[11.5px] font-medium text-muted">
                          ({calc.voiceCredits} {isAr ? 'رصيد' : 'credits'})
                        </span>
                      </div>
                    </div>
                    <input
                      id="calc-voice"
                      type="range"
                      min={0}
                      max={300}
                      step={15}
                      value={voiceMins}
                      onChange={(e) => setVoiceMins(Number(e.target.value))}
                      className="ht-range ht-range-teal mt-3.5 w-full"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-faint">
                      <span>0 {isAr ? 'د' : 'min'}</span>
                      <span>75 {isAr ? 'د' : 'min'}</span>
                      <span>180 {isAr ? 'د' : 'min'}</span>
                      <span>300 {isAr ? 'د' : 'min'}</span>
                    </div>
                  </div>

                  {/* Locations Selector */}
                  <div className="border-t border-line pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                        <span className="grid size-7 place-items-center rounded-lg bg-iris-soft text-iris">
                          <Building2 className="size-3.5" aria-hidden />
                        </span>
                        {isAr ? 'عدد المواقع أو الفروع' : 'Number of locations / branches'}
                      </span>
                      <span className="text-[12px] font-medium text-muted">
                        {locations >= 4
                          ? isAr
                            ? '4+ فروع'
                            : '4+ branches'
                          : isAr
                            ? `${locations} فرع`
                            : `${locations} ${locations === 1 ? 'location' : 'locations'}`}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((loc) => {
                        const active = locations === loc
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => setLocations(loc)}
                            className={cx(
                              'relative h-10 rounded-xl border text-[13px] font-semibold transition-all',
                              active
                                ? 'border-transparent text-white shadow-[0_10px_22px_-12px_rgb(111_75_242/0.8)]'
                                : 'border-line bg-white text-ink-2 hover:border-brand/40',
                            )}
                          >
                            {active && (
                              <motion.span
                                layoutId={reduce ? undefined : 'credits-loc-pill'}
                                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                                className="absolute inset-0 rounded-xl bg-[linear-gradient(115deg,#1a63d8,#6f4bf2)]"
                                aria-hidden
                              />
                            )}
                            <span className="relative z-10">{loc === 4 ? '4+' : loc}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Live Output Slab */}
                <div className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[linear-gradient(155deg,#040d1c,#0b2a63_52%,#063a47)] p-5 text-white shadow-[0_26px_54px_-28px_rgb(4_13_28/0.75)] sm:p-6">
                  <span
                    className="pointer-events-none absolute -top-20 -end-14 size-48 rounded-full bg-[radial-gradient(circle,rgb(125_232_226/0.35),transparent_70%)] blur-2xl"
                    aria-hidden
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-2">
                      <span className="caps text-[10px] text-[#7DE8E2]">
                        {isAr ? 'التقدير الشهري' : 'Monthly Estimate'}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {isAr ? 'الباقة الأنسب' : 'Best match'}: {matchedPlan.name}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <motion.span
                        key={calc.totalCredits}
                        initial={reduce ? false : { opacity: 0.5, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="display text-[clamp(2.2rem,1.8rem+1.6vw,3.1rem)] tabular-nums text-white"
                      >
                        {calc.totalCredits}
                      </motion.span>
                      <span className="text-[14px] text-white/70">
                        {isAr ? 'رصيداً / شهرياً' : 'credits / month'}
                      </span>
                    </div>

                    {/* Stacked Chat vs Voice Split Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[11.5px] text-white/75">
                        <span>
                          {isAr ? 'دردشة' : 'Chat'}: {calc.chatCredits} ({calc.chatShare}%)
                        </span>
                        <span>
                          {isAr ? 'صوت' : 'Voice'}: {calc.voiceCredits} ({calc.voiceShare}%)
                        </span>
                      </div>
                      <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-[#3b82f6]"
                          animate={{ width: `${calc.chatShare}%` }}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                        <motion.div
                          className="h-full bg-[#7DE8E2]"
                          animate={{ width: `${calc.voiceShare}%` }}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      </div>
                    </div>

                    {/* Estimated Outcomes */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-3">
                        <p className="text-[11px] text-white/60">
                          {isAr ? 'حجوزات / طلبات متوقعة' : 'Est. bookings / orders'}
                        </p>
                        <p className="display mt-1 text-[1.25rem] tabular-nums text-[#7DE8E2]">
                          ≈ {calc.estBookings.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-3">
                        <p className="text-[11px] text-white/60">
                          {isAr ? 'تكلفة الباقة المقترحة' : 'Matched plan price'}
                        </p>
                        <p className="display mt-1 text-[1.25rem] tabular-nums text-white">
                          {matchedPlan.price === 'Custom'
                            ? copy.pricing.customPrice
                            : `${matchedPlan.price} ${matchedPlan.currency}`}
                        </p>
                      </div>
                    </div>

                    {/* Matched Plan Card */}
                    <div className="mt-4 rounded-2xl border border-[#7DE8E2]/30 bg-white/10 p-3.5 backdrop-blur-md">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13.5px] font-semibold text-white">{matchedPlan.name}</p>
                        <span className="text-[11px] text-[#7DE8E2]">{matchedPlan.credits}</span>
                      </div>
                      <p className="mt-1 text-[12px] leading-snug text-white/75">{matchedPlan.blurb}</p>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    <Link
                      to="/demo"
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 text-[13.5px] font-semibold text-brand-deep transition-all hover:bg-white/90 active:scale-[0.98]"
                    >
                      {isAr ? 'ابدأ بـ 50 رصيداً مجانياً' : 'Start with 50 free credits'}
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------- clickable plan snapshots */}
      <section className="relative px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="up" y={18}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="caps text-brand">{copy.pricing.eyebrow}</p>
                <h2 className="display mt-1 text-[1.35rem] text-ink sm:text-[1.7rem]">
                  {isAr ? 'اضغط أي باقة لمعاينة حجمها في الحاسبة' : 'Tap any tier to test its volume above'}
                </h2>
              </div>
              <span className="text-[12.5px] text-muted">
                {isAr ? 'كل الباقات تبدأ بـ 50 رصيداً مجانياً' : 'All plans start with 50 free credits'}
              </span>
            </div>
          </Reveal>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {localizedPlans.map((plan, i) => {
              const isMatched = i === calc.matchedIdx
              return (
                <Reveal key={plan.name} delay={0.05 * i} variant="up" y={20} className="h-full">
                  <button
                    type="button"
                    onClick={() => applyPlanPreset(i)}
                    className={cx(
                      'group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border p-5 text-start transition-all duration-300 hover:-translate-y-1',
                      isMatched
                        ? 'border-brand/50 bg-[linear-gradient(155deg,#ffffff,#e9f1fe)] shadow-[0_22px_44px_-24px_rgb(26_99_216/0.5)] ring-2 ring-brand/25'
                        : 'border-line bg-white/90 shadow-[0_14px_30px_-24px_rgb(9_30_74/0.35)] hover:border-line-strong',
                    )}
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-1"
                      style={{ background: plan.accent }}
                      aria-hidden
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[15px] font-semibold text-ink">{plan.name}</span>
                      {isMatched && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold text-white">
                          <Check className="size-2.5" aria-hidden />
                          {isAr ? 'مطابق' : 'Matched'}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="display text-[1.75rem]" style={{ color: plan.accent }}>
                        {plan.price === 'Custom' ? copy.pricing.customPrice : plan.price}
                      </span>
                      {plan.price !== 'Custom' && (
                        <span className="text-[12px] text-faint">
                          {plan.currency}
                          {plan.per}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 rounded-xl bg-soft/80 px-2.5 py-1.5 text-[11.5px] font-medium text-ink-2">
                      {plan.credits}
                    </p>
                    <p className="mt-2.5 flex-1 text-[12.5px] leading-relaxed text-muted">{plan.blurb}</p>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------- structured bento sections */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="grid gap-4 lg:grid-cols-3">
            {page.sections.map((section, i) => {
              const Icon = SECTION_ICONS[i] ?? Coins
              const accent = SECTION_ACCENTS[i] ?? SECTION_ACCENTS[0]
              return (
                <Reveal key={section.title} delay={0.07 * i} variant="up" y={26} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white/95 p-5 shadow-[0_18px_40px_-30px_rgb(9_30_74/0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(14_154_158/0.35)] sm:p-6">
                    <span
                      className="pointer-events-none absolute -top-16 -end-12 size-40 rounded-full opacity-70 blur-2xl transition-opacity group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${accent.color}28, transparent 70%)` }}
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-between gap-2">
                      <span
                        className="grid size-11 place-items-center rounded-2xl text-white shadow-[0_12px_24px_-12px_rgb(9_30_74/0.55)]"
                        style={{ background: `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)` }}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="display text-[1.1rem] tabular-nums text-faint/60">0{i + 1}</span>
                    </div>

                    <h3 className="display relative mt-4 text-[1.2rem] tracking-[-0.025em] text-ink">
                      {section.title}
                    </h3>
                    <p className="relative mt-2 text-[14px] leading-relaxed text-muted">{section.body}</p>

                    {section.points && section.points.length > 0 && (
                      <ul className="relative mt-5 space-y-2.5 border-t border-line pt-4">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                            <span
                              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                              style={{ background: accent.soft, color: accent.color }}
                            >
                              <Check className="size-3" aria-hidden />
                            </span>
                            <span className="min-w-0 text-pretty">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <ResourceFooterBand slug="credits" />
    </main>
  )
}
