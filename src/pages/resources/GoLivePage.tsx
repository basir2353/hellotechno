import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Eye,
  Layers,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { ChannelMark, type ChannelKey } from '../../components/Social'
import { Btn, PulseDot, Reveal } from '../../components/Ui'
import { SITE } from '../../data'
import { cx } from '../../lib/cx'
import { useLocale } from '../../lib/locale'
import { EASE } from '../../lib/motion'
import { ResourceFooterBand, ResourceHeroShell, ResourceTopBar } from './shared'

const WEEK_META = [
  {
    icon: BookOpen,
    accent: '#1A63D8',
    soft: '#e2edff',
    daysEn: 'Days 1–5',
    daysAr: 'الأيام 1–5',
    badgeEn: 'Foundation',
    badgeAr: 'التأسيس',
  },
  {
    icon: Eye,
    accent: '#6F4BF2',
    soft: '#ece6ff',
    daysEn: 'Days 6–12',
    daysAr: 'الأيام 6–12',
    badgeEn: 'Zero Risk',
    badgeAr: 'بلا مخاطرة',
  },
  {
    icon: Zap,
    accent: '#0E9A9E',
    soft: '#ddf5f4',
    daysEn: 'Days 13–21',
    daysAr: 'الأيام 13–21',
    badgeEn: 'Live Rollout',
    badgeAr: 'إطلاق مباشر',
  },
] as const

const CONSOLE_STAGES = [
  { key: 'knowledge', en: 'Knowledge', ar: 'المعرفة', accent: '#1A63D8' },
  { key: 'rules', en: 'Rules', ar: 'القواعد', accent: '#6F4BF2' },
  { key: 'shadow', en: 'Shadow Mode', ar: 'الوضع الظلي', accent: '#0E9A9E' },
  { key: 'cutover', en: 'Live Cutover', ar: 'إطلاق حي', accent: '#25D366' },
] as const

const CUTOVER_STEPS: {
  step: string
  channels: ChannelKey[]
  accent: string
  soft: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  timingEn: string
  timingAr: string
}[] = [
  {
    step: '01',
    channels: ['whatsapp', 'instagram'],
    accent: '#25D366',
    soft: '#e6f9ed',
    titleEn: 'WhatsApp & Instagram',
    titleAr: 'واتساب وإنستغرام',
    descEn: 'Highest-volume DMs and inquiries go live first — instant sub-5s replies on your existing number.',
    descAr: 'القنوات الأعلى حجماً تنطلق أولاً — ردود فورية خلال أقل من 5 ثوانٍ على رقمك الحالي.',
    timingEn: 'Day 13',
    timingAr: 'اليوم 13',
  },
  {
    step: '02',
    channels: ['web', 'sms'],
    accent: '#1A63D8',
    soft: '#e2edff',
    titleEn: 'Web Chat & SMS',
    titleAr: 'دردشة الموقع والرسائل',
    descEn: 'Embed on every page with automated appointment reminders, confirmations and review links.',
    descAr: 'تفعيل على كل صفحات الموقع مع تذكيرات المواعيد والتأكيدات وروابط التقييم.',
    timingEn: 'Day 16',
    timingAr: 'اليوم 16',
  },
  {
    step: '03',
    channels: ['voice'],
    accent: '#6F4BF2',
    soft: '#ece6ff',
    titleEn: 'Voice Reception',
    titleAr: 'الاستقبال الصوتي',
    descEn: 'Your own phone lines wired for bilingual EN + AR voice answering before the third ring.',
    descAr: 'ربط خطوط هاتفك الخاصة للرد الصوتي بالعربية والإنجليزية قبل الرنة الثالثة.',
    timingEn: 'Day 19',
    timingAr: 'اليوم 19',
  },
  {
    step: '04',
    channels: ['email'],
    accent: '#0E9A9E',
    soft: '#ddf5f4',
    titleEn: 'Full 24/7 Governance',
    titleAr: 'حوكمة كاملة 24/7',
    descEn: 'Every channel routed into one auditable inbox with night coverage and instant rollback safety.',
    descAr: 'كل القنوات في صندوق موحّد قابل للتدقيق مع تغطية ليلية وخيار تراجع فوري.',
    timingEn: 'Day 21',
    timingAr: 'اليوم 21',
  },
]

function LaunchMissionConsole() {
  const { locale } = useLocale()
  const reduce = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => {
      setActiveStage((prev) => (prev + 1) % CONSOLE_STAGES.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [reduce])

  const channels: { kind: ChannelKey; name: string; stageIndex: number }[] = [
    { kind: 'whatsapp', name: 'WhatsApp', stageIndex: 0 },
    { kind: 'instagram', name: 'Instagram', stageIndex: 1 },
    { kind: 'web', name: 'Web Chat', stageIndex: 2 },
    { kind: 'voice', name: 'Voice', stageIndex: 3 },
  ]

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/14 bg-white/[0.06] p-4 shadow-[0_24px_54px_-28px_rgb(0_0_0/0.65)] backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <PulseDot className="size-2" />
          <span className="caps text-[10px] text-white/80">
            {locale === 'ar' ? 'مسار الإطلاق المباشر' : 'Launch Mission Control'}
          </span>
        </div>
        <span className="rounded-full border border-[#7DE8E2]/30 bg-[#7DE8E2]/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#7DE8E2]">
          {locale === 'ar' ? '14–21 يوماً' : '14–21 Days'}
        </span>
      </div>

      {/* 4-Stage Animated Pipeline */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CONSOLE_STAGES.map((stage, idx) => {
          const isActive = idx === activeStage
          const isDone = idx < activeStage
          return (
            <button
              key={stage.key}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={cx(
                'relative flex flex-col items-start rounded-2xl border p-2.5 text-start transition-all duration-300',
                isActive
                  ? 'border-white/35 bg-white/15 shadow-[0_12px_24px_-14px_rgb(125_232_226/0.5)]'
                  : isDone
                    ? 'border-[#7DE8E2]/25 bg-[#7DE8E2]/[0.07]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20',
              )}
            >
              <span className="flex w-full items-center justify-between">
                <span className="text-[10px] font-semibold tabular-nums text-white/55">0{idx + 1}</span>
                <span
                  className={cx(
                    'grid size-4 place-items-center rounded-full text-[9px] transition-colors',
                    isActive
                      ? 'bg-[#7DE8E2] text-night'
                      : isDone
                        ? 'bg-[#25D366]/25 text-[#25D366]'
                        : 'bg-white/10 text-white/40',
                  )}
                >
                  {isDone ? <Check className="size-2.5" aria-hidden /> : <span className="size-1.5 rounded-full bg-current" />}
                </span>
              </span>
              <span className="mt-2 text-[11.5px] font-semibold text-white">
                {locale === 'ar' ? stage.ar : stage.en}
              </span>
            </button>
          )
        })}
      </div>

      {/* Animated Progress Track */}
      <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#1a63d8,#6f4bf2,#7DE8E2,#25D366)]"
          animate={{ width: `${((activeStage + 1) / CONSOLE_STAGES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      {/* Channel Status Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {channels.map((ch) => {
          const live = ch.stageIndex <= activeStage
          return (
            <div
              key={ch.kind}
              className={cx(
                'flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 transition-all duration-300',
                live ? 'border-white/20 bg-white/10' : 'border-white/8 bg-white/[0.02] opacity-65',
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                <ChannelMark kind={ch.kind} className="size-6" glyphClassName="size-3.5" rounded="rounded-full" />
                <span className="truncate text-[11.5px] font-medium text-white">{ch.name}</span>
              </div>
              <span
                className={cx(
                  'shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold tracking-wide uppercase',
                  live ? 'bg-[#25D366]/20 text-[#7dffad]' : 'bg-white/10 text-white/50',
                )}
              >
                {live ? (locale === 'ar' ? 'جاهز' : 'Active') : locale === 'ar' ? 'التالي' : 'Next'}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-3 flex items-center justify-between text-[11px] text-white/55">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-[#7DE8E2]" aria-hidden />
          {locale === 'ar' ? 'مسار تراجع فوري في كل مرحلة' : 'Instant rollback path at every stage'}
        </span>
        <span className="tabular-nums text-[#7DE8E2]">{Math.round(((activeStage + 1) / 4) * 100)}%</span>
      </p>
    </div>
  )
}

function ShadowModeSimulator() {
  const { locale } = useLocale()
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<'shadow' | 'live'>('shadow')
  const [status, setStatus] = useState<'draft' | 'approved' | 'edited'>('draft')

  const isAr = locale === 'ar'

  const customerMsg = isAr
    ? 'مرحباً، هل يوجد طاولة لأربعة أشخاص الليلة الساعة 8 مساءً في الجلسة الخارجية؟'
    : 'Hi! Do you have a table for 4 tonight at 8:00 PM with outdoor seating?'

  const aiDraft =
    status === 'edited'
      ? isAr
        ? 'أهلاً بك! نعم تتوفر طاولة لـ 4 أشخاص الساعة 8:00 مساءً في التراس الخارجي (مع إطلالة الحديقة). هل أؤكد الحجز باسمك ورقمك؟'
        : 'Welcome! Yes, we have an outdoor terrace table for 4 at 8:00 PM (garden view). Would you like me to confirm it under your name?'
      : isAr
        ? 'أهلاً بك! نعم تتوفر طاولة لـ 4 أشخاص الليلة الساعة 8:00 مساءً في الجلسة الخارجية. هل تود تأكيد الحجز الآن؟'
        : 'Hi there! Yes, we have an outdoor table for 4 tonight at 8:00 PM. Shall I confirm the reservation for you?'

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-line bg-white/90 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm sm:rounded-[30px] sm:p-7">
      <span
        className="pointer-events-none absolute -top-24 -end-16 size-64 rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.14),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="caps inline-flex items-center gap-1.5 rounded-full bg-iris-soft px-3 py-1 text-[10px] text-iris">
            <Eye className="size-3" aria-hidden />
            {isAr ? 'معاينة تفاعلية · الأسبوع 2' : 'Interactive Preview · Week 2'}
          </span>
          <h3 className="display mt-2.5 text-[1.35rem] text-ink sm:text-[1.6rem]">
            {isAr ? 'جرّب كيف يعمل الوضع الظلي قبل الإطلاق' : 'See how Shadow Mode keeps staff in control'}
          </h3>
          <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted">
            {isAr
              ? 'الذكاء يقرأ سؤالك ويصيغ الرد من معرفتك المعتمدة، وفريقك يوافق أو يعدّل بنقرة قبل أن يرى العميل أي تغيير.'
              : 'The AI drafts every reply from your approved knowledge while your team approves or refines with one click — zero risk to live customers.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="inline-flex w-fit shrink-0 rounded-full border border-line bg-soft/80 p-1">
          {(
            [
              { id: 'shadow', labelEn: 'Shadow Mode', labelAr: 'الوضع الظلي' },
              { id: 'live', labelEn: 'Live Autopilot', labelAr: 'الإطلاق الحي' },
            ] as const
          ).map((tab) => {
            const active = mode === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setMode(tab.id)
                  setStatus('draft')
                }}
                className={cx(
                  'relative rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors',
                  active ? 'text-white' : 'text-muted hover:text-ink',
                )}
              >
                {active && (
                  <motion.span
                    layoutId={reduce ? undefined : 'shadow-mode-toggle'}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,#1a63d8,#6f4bf2)]"
                    aria-hidden
                  />
                )}
                <span className="relative z-10">{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat & Approval Stage */}
      <div className="relative mt-6 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        {/* Customer inbound card */}
        <div className="flex flex-col justify-between rounded-[20px] border border-line bg-canvas/80 p-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ChannelMark kind="whatsapp" className="size-7" glyphClassName="size-3.5" rounded="rounded-full" />
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">{isAr ? 'رسالة ضيف واردة' : 'Inbound Guest Message'}</p>
                  <p className="text-[11px] text-faint">WhatsApp · 20:14</p>
                </div>
              </div>
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-brand">
                {isAr ? 'لغة تلقائية' : 'Auto-detected'}
              </span>
            </div>
            <div className="mt-3.5 rounded-2xl rounded-ss-md border border-line bg-white p-3.5 text-[13.5px] leading-relaxed text-ink shadow-[0_8px_20px_-16px_rgb(9_30_74/0.3)]">
              {customerMsg}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px] text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 border border-line">
              <Layers className="size-3 text-brand" aria-hidden />
              {isAr ? 'مصدر: قائمة الفروع + التوفر' : 'Source: Branch Hours & Seating'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-1 font-medium text-teal-deep">
              {isAr ? 'تطابق 98%' : '98% Knowledge Match'}
            </span>
          </div>
        </div>

        {/* AI Draft / Approval Panel */}
        <div className="relative overflow-hidden rounded-[20px] border border-brand/20 bg-[linear-gradient(155deg,#040d1c,#0b234d)] p-4 text-white sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-[#7DE8E2]/20 text-[#7DE8E2]">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <span className="text-[12.5px] font-semibold text-white">
                {mode === 'shadow'
                  ? isAr
                    ? 'مسودة الذكاء · بانتظار موافقة الموظف'
                    : 'AI Draft · Waiting for Staff Approval'
                  : isAr
                    ? 'تم الإرسال تلقائياً خلال 2.4 ثانية'
                    : 'Sent Automatically in 2.4s'}
              </span>
            </div>
            <span
              className={cx(
                'rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase',
                mode === 'live' || status === 'approved'
                  ? 'bg-[#25D366]/20 text-[#7dffad]'
                  : 'bg-amber-400/20 text-amber-200',
              )}
            >
              {mode === 'live'
                ? isAr
                  ? 'حي 24/7'
                  : 'Live 24/7'
                : status === 'approved'
                  ? isAr
                    ? 'أُرسل'
                    : 'Sent'
                  : isAr
                    ? 'مسودة'
                    : 'Draft'}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${status}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-3.5 rounded-2xl border border-white/15 bg-white/10 p-3.5 text-[13.5px] leading-relaxed text-white/90"
            >
              {aiDraft}
            </motion.div>
          </AnimatePresence>

          {mode === 'shadow' ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setStatus('approved')}
                className={cx(
                  'inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold transition-all',
                  status === 'approved'
                    ? 'bg-[#25D366] text-night'
                    : 'bg-white text-brand-deep hover:bg-white/90',
                )}
              >
                <Check className="size-3.5" aria-hidden />
                {status === 'approved'
                  ? isAr
                    ? 'تم الإرسال للضيف'
                    : 'Approved & Sent'
                  : isAr
                    ? 'موافقة وإرسال'
                    : 'Approve & Send'}
              </button>
              <button
                type="button"
                onClick={() => setStatus((s) => (s === 'edited' ? 'draft' : 'edited'))}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 text-[12.5px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15"
              >
                {status === 'edited'
                  ? isAr
                    ? 'تم التحديث في المعرفة ✓'
                    : 'Knowledge Updated ✓'
                  : isAr
                    ? 'تعديل وتعليم الذكاء'
                    : 'Edit & Teach AI'}
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#7DE8E2]/20 bg-[#7DE8E2]/10 px-3 py-2 text-[12px] text-[#b4f5f0]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-[#7DE8E2]" aria-hidden />
                {isAr ? 'مُثبّت في سجل المحادثات مع خيار تدخل بشري بنقرة' : 'Logged to audit trail · 1-click human takeover ready'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function GoLivePage() {
  const { copy, locale } = useLocale()
  const reduce = useReducedMotion()
  const rp = copy.resourcePages
  const page = rp.pages['go-live']
  const isAr = locale === 'ar'

  const allPoints = page.sections.flatMap((section, si) =>
    (section.points ?? []).map((_, pi) => `${si}-${pi}`),
  )

  // Start with Week 1 pre-checked so visitors immediately feel the interactive progress bar
  const [checked, setChecked] = useState<Record<string, boolean>>({
    '0-0': true,
    '0-1': true,
  })

  const completedCount = allPoints.filter((id) => checked[id]).length
  const pct = allPoints.length > 0 ? Math.round((completedCount / allPoints.length) * 100) : 0

  const togglePoint = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleAll = () => {
    if (completedCount === allPoints.length) {
      setChecked({})
    } else {
      const next: Record<string, boolean> = {}
      for (const id of allPoints) next[id] = true
      setChecked(next)
    }
  }

  return (
    <main id="main" className="relative overflow-x-hidden bg-canvas pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, #e2edff, transparent 52%), radial-gradient(ellipse at 86% 12%, rgb(14 154 158 / 0.14), transparent 44%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-45" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1160px]">
          <Reveal immediate variant="up" y={14}>
            <ResourceTopBar activeSlug="go-live" />
          </Reveal>

          <Reveal immediate delay={0.06} variant="up" y={22}>
            <ResourceHeroShell slug="go-live">
              <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
                <div>
                  <span className="caps inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/85">
                    <Sparkles className="size-3 text-[#7DE8E2]" aria-hidden />
                    {page.tag}
                  </span>

                  <h1 className="display mt-4 max-w-[16ch] text-[clamp(1.9rem,1.25rem+2.5vw,3.35rem)] tracking-[-0.04em] text-balance text-white">
                    {page.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-[16.5px]">
                    {page.lead}
                  </p>

                  {/* Mini Telemetry Strip */}
                  <dl className="mt-6 grid max-w-md grid-cols-3 gap-2.5">
                    {[
                      { val: '14–21', labelEn: 'Days to live', labelAr: 'يوماً للإطلاق' },
                      { val: '0', labelEn: 'Downtime', labelAr: 'توقف للخدمة' },
                      { val: '6', labelEn: 'Channels ready', labelAr: 'قنوات جاهزة' },
                    ].map((stat) => (
                      <div
                        key={stat.labelEn}
                        className="rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2.5 backdrop-blur-sm"
                      >
                        <dt className="display text-[1.25rem] text-[#7DE8E2] sm:text-[1.45rem]">{stat.val}</dt>
                        <dd className="mt-0.5 text-[11px] leading-tight text-white/65">
                          {isAr ? stat.labelAr : stat.labelEn}
                        </dd>
                      </div>
                    ))}
                  </dl>

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

                <LaunchMissionConsole />
              </div>
            </ResourceHeroShell>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- interactive readiness */}
      <section className="relative px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-[1160px]">
          {/* Interactive Progress Header */}
          <Reveal variant="up" y={20}>
            <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white/90 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-4">
                <div className="relative grid size-14 shrink-0 place-items-center">
                  <svg viewBox="0 0 56 56" className="size-14 -rotate-90" aria-hidden>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#e9f1fe" strokeWidth="5" />
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="url(#go-live-ring)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={138.23}
                      animate={{ strokeDashoffset: 138.23 * (1 - pct / 100) }}
                      transition={{ duration: 0.55, ease: EASE }}
                    />
                    <defs>
                      <linearGradient id="go-live-ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1A63D8" />
                        <stop offset="55%" stopColor="#6F4BF2" />
                        <stop offset="100%" stopColor="#0E9A9E" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-[13px] font-bold tabular-nums text-ink">{pct}%</span>
                </div>
                <div>
                  <p className="caps text-[10px] text-brand">
                    {isAr ? 'قائمة جاهزية تفاعلية' : 'Interactive Readiness Tracker'}
                  </p>
                  <h2 className="mt-1 text-[1.1rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                    {completedCount === allPoints.length
                      ? isAr
                        ? 'جاهز تماماً للإطلاق!'
                        : 'All launch gates checked — ready for cutover!'
                      : isAr
                        ? `تم إنجاز ${completedCount} من ${allPoints.length} خطوات`
                        : `${completedCount} of ${allPoints.length} milestones checked`}
                  </h2>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {isAr
                      ? 'اضغط على أي بند أدناه لتجربة تتبّع خطة الإطلاق خطوة بخطوة.'
                      : 'Tap any milestone below to preview your team’s cutover checklist.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAll}
                className="inline-flex h-10 w-fit items-center gap-2 self-start rounded-full border border-line-strong bg-soft/70 px-4 text-[12.5px] font-semibold text-ink transition-colors hover:border-brand hover:bg-white hover:text-brand sm:self-center"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {completedCount === allPoints.length
                  ? isAr
                    ? 'إعادة ضبط'
                    : 'Reset checklist'
                  : isAr
                    ? 'تحديد الكل'
                    : 'Check all'}
              </button>
            </div>
          </Reveal>

          {/* 3-Week Connected Timeline Cards */}
          <div className="relative mt-6 space-y-4 sm:space-y-5">
            {/* Vertical glowing spine on desktop */}
            <span
              className="pointer-events-none absolute top-10 bottom-10 start-[1.85rem] hidden w-[2px] bg-[linear-gradient(180deg,#1A63D8,#6F4BF2,#0E9A9E)] opacity-25 md:block"
              aria-hidden
            />

            {page.sections.map((section, si) => {
              const meta = WEEK_META[si] ?? WEEK_META[0]
              const Icon = meta.icon
              const sectionPoints = section.points ?? []
              const sectionDone = sectionPoints.filter((_, pi) => checked[`${si}-${pi}`]).length
              const allDone = sectionPoints.length > 0 && sectionDone === sectionPoints.length

              return (
                <Reveal key={section.title} delay={0.07 * si} variant={si % 2 === 0 ? 'left' : 'right'} y={26}>
                  <article className="group relative overflow-hidden rounded-[24px] border border-line bg-white/95 p-5 shadow-[0_18px_42px_-32px_rgb(9_30_74/0.4)] transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_28px_54px_-30px_rgb(26_99_216/0.35)] sm:rounded-[28px] sm:p-7">
                    <span
                      className="pointer-events-none absolute inset-y-6 start-0 w-[3.5px] rounded-full"
                      style={{ background: `linear-gradient(180deg, ${meta.accent}, transparent)` }}
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute -top-20 -end-16 size-52 rounded-full opacity-65 blur-3xl transition-opacity group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${meta.accent}24, transparent 70%)` }}
                      aria-hidden
                    />

                    <div className="relative grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-8">
                      {/* Left Phase Info */}
                      <div className="flex items-start gap-4">
                        <div className="relative flex flex-col items-center">
                          <span
                            className="display grid size-13 shrink-0 place-items-center rounded-[18px] text-[1.1rem] text-white shadow-[0_14px_26px_-14px_rgb(9_30_74/0.6)]"
                            style={{ background: `linear-gradient(140deg, ${meta.accent}, ${meta.accent}cc)` }}
                          >
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <span
                            className="mt-2 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums"
                            style={{ background: meta.soft, color: meta.accent }}
                          >
                            0{si + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="caps rounded-full px-2.5 py-1 text-[10px]"
                              style={{ background: meta.soft, color: meta.accent }}
                            >
                              {isAr ? meta.daysAr : meta.daysEn}
                            </span>
                            <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 text-[11px] font-medium text-muted">
                              {isAr ? meta.badgeAr : meta.badgeEn}
                            </span>
                            {allDone && (
                              <motion.span
                                initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-0.5 text-[11px] font-semibold text-success"
                              >
                                <Check className="size-3" aria-hidden />
                                {isAr ? 'مكتمل' : 'Complete'}
                              </motion.span>
                            )}
                          </div>

                          <h3 className="display mt-3 text-[1.3rem] tracking-[-0.03em] text-ink sm:text-[1.45rem]">
                            {section.title}
                          </h3>
                          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{section.body}</p>
                        </div>
                      </div>

                      {/* Right Interactive Checklist Pills */}
                      {sectionPoints.length > 0 && (
                        <ul className="space-y-2.5">
                          {sectionPoints.map((point, pi) => {
                            const id = `${si}-${pi}`
                            const isChecked = !!checked[id]
                            return (
                              <li key={point}>
                                <button
                                  type="button"
                                  onClick={() => togglePoint(id)}
                                  aria-pressed={isChecked}
                                  className={cx(
                                    'flex w-full items-start gap-3 rounded-2xl border p-3.5 text-start transition-all duration-200',
                                    isChecked
                                      ? 'border-brand/25 bg-brand-soft/40 shadow-[0_10px_24px_-20px_rgb(26_99_216/0.55)]'
                                      : 'border-line bg-canvas/55 hover:border-line-strong hover:bg-white',
                                  )}
                                >
                                  <span
                                    className={cx(
                                      'mt-0.5 grid size-5.5 shrink-0 place-items-center rounded-full border transition-all duration-200',
                                      isChecked ? 'border-transparent text-white scale-105' : 'border-line-strong bg-white text-transparent',
                                    )}
                                    style={
                                      isChecked
                                        ? { background: `linear-gradient(135deg, ${meta.accent}, #0E9A9E)` }
                                        : undefined
                                    }
                                  >
                                    <Check className="size-3" aria-hidden />
                                  </span>
                                  <span
                                    className={cx(
                                      'min-w-0 flex-1 text-[13.5px] leading-snug font-medium transition-colors sm:text-[14px]',
                                      isChecked ? 'text-ink' : 'text-ink-2',
                                    )}
                                  >
                                    {point}
                                  </span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- shadow mode simulator */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="scale" y={22}>
            <ShadowModeSimulator />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------- calm cutover sequence */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="up" y={20}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="caps text-teal">{isAr ? 'ترتيب التفعيل الهادئ' : 'Calm Channel Cutover Order'}</p>
                <h2 className="display mt-1.5 text-[1.45rem] text-ink sm:text-[1.85rem]">
                  {isAr ? 'قناة تلو الأخرى — بلا مفاجآت للفريق' : 'One channel at a time — never all at once'}
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-teal/25 bg-teal-soft px-3 py-1.5 text-[12px] font-semibold text-teal-deep">
                <ShieldCheck className="size-3.5" aria-hidden />
                {isAr ? 'خيار تراجع فوري متاح دائماً' : 'Instant rollback on every step'}
              </span>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {CUTOVER_STEPS.map((item, i) => (
              <Reveal key={item.step} delay={0.06 * i} variant="up" y={24} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white/90 p-5 shadow-[0_14px_34px_-28px_rgb(9_30_74/0.4)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-28px_rgb(26_99_216/0.35)]">
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: item.accent }}
                    aria-hidden
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center -space-x-1.5 rtl:space-x-reverse">
                      {item.channels.map((ch) => (
                        <ChannelMark
                          key={ch}
                          kind={ch}
                          className="size-9 ring-2 ring-white"
                          glyphClassName="size-4"
                          rounded="rounded-full"
                        />
                      ))}
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold tabular-nums"
                      style={{ background: item.soft, color: item.accent }}
                    >
                      {isAr ? item.timingAr : item.timingEn}
                    </span>
                  </div>
                  <span className="display mt-4 text-[11px] tracking-[0.14em] text-faint uppercase">
                    {isAr ? `الخطوة ${item.step}` : `Step ${item.step}`}
                  </span>
                  <h3 className="mt-1 text-[15.5px] font-semibold tracking-[-0.02em] text-ink">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ResourceFooterBand slug="go-live" />
    </main>
  )
}
