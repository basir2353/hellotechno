import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  Clock,
  Globe,
  Mic,
  PlayCircle,
  Sparkles,
  Users,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import { BRANDS, ChannelMark, SOCIALS, type ChannelKey } from '../../components/Social'
import { Btn, PulseDot, Reveal } from '../../components/Ui'
import { SITE } from '../../data'
import { cx } from '../../lib/cx'
import { useLocale } from '../../lib/locale'
import { EASE } from '../../lib/motion'
import { ResourceFooterBand, ResourceHeroShell, ResourceTopBar } from './shared'

const AGENDA_ACTS = [
  {
    id: 'wire',
    minutes: '00 – 10',
    accent: '#1A63D8',
    soft: '#e2edff',
    titleEn: 'Wire your real channels live',
    titleAr: 'ربط قنواتك الحقيقية مباشرة',
    descEn: 'We plug in a sample of your real menu, hours or rates and trigger live Arabic & English messages right in front of you.',
    descAr: 'نُدخل عينة من قائمتك وساعاتك وأسعارك ونختبر ردوداً حية بالعربية والإنجليزية أمامك مباشرة.',
    highlightEn: 'Hear EN + AR voice & WhatsApp replies in under 5 seconds',
    highlightAr: 'اسمع الرد الصوتي وواتساب بالعربية والإنجليزية خلال أقل من 5 ثوانٍ',
  },
  {
    id: 'action',
    minutes: '10 – 20',
    accent: '#6F4BF2',
    soft: '#ece6ff',
    titleEn: 'Watch real actions & 1-click takeover',
    titleAr: 'شاهد الإجراءات الحقيقية والتسليم بنقرة',
    descEn: 'See a live booking or order land in one threaded inbox, inspect audit trails, and test how your staff steps in with one click.',
    descAr: 'شاهد حجزاً أو طلباً يصل لصندوق موحّد، وراجع سجل التدقيق وجرّب تدخّل الموظف بنقرة واحدة.',
    highlightEn: 'Live escalation rules + full staff control in one queue',
    highlightAr: 'قواعد تصعيد حية مع تحكم كامل للفريق في طابور واحد',
  },
  {
    id: 'plan',
    minutes: '20 – 30',
    accent: '#0E9A9E',
    soft: '#ddf5f4',
    titleEn: 'Go-live sketch & exact credit sizing',
    titleAr: 'خطة الإطلاق وتحجيم الأرصدة بدقة',
    descEn: 'Map your weekly message and call volume to a clear monthly plan, pick a shadow-mode pilot date, and leave with a written summary.',
    descAr: 'نطابق حجم رسائلك ومكالماتك مع الباقة الأنسب ونحدد موعد الوضع الظلي مع ملخص مكتوب في اليوم نفسه.',
    highlightEn: 'Same-day written plan · Zero hard sell',
    highlightAr: 'ملخص مكتوب في اليوم نفسه · بلا ضغط بيع',
  },
] as const

const LANG_OPTIONS = [
  { id: 'both', labelEn: 'Both EN + العربية', labelAr: 'العربية + الإنجليزية معاً' },
  { id: 'en', labelEn: 'English only', labelAr: 'الإنجليزية فقط' },
  { id: 'ar', labelEn: 'Arabic (العربية)', labelAr: 'العربية فقط' },
] as const

const ROLE_OPTIONS = [
  { id: 'ops', labelEn: 'Ops / GM', labelAr: 'التشغيل / المدير العام' },
  { id: 'frontdesk', labelEn: 'Front Desk Lead', labelAr: 'قائد الاستقبال' },
  { id: 'it', labelEn: 'IT / Systems', labelAr: 'تقنية المعلومات' },
] as const

const SECTION_META = [
  { icon: PlayCircle, color: '#1A63D8', soft: '#e2edff' },
  { icon: Users, color: '#6F4BF2', soft: '#ece6ff' },
  { icon: ClipboardCheck, color: '#0E9A9E', soft: '#ddf5f4' },
] as const

const WAVE_HEIGHTS = [36, 68, 48, 92, 62, 100, 54, 84, 44, 76, 58, 90, 42, 70, 50, 82]

function WalkthroughStudioPreview() {
  const { locale } = useLocale()
  const reduce = useReducedMotion()
  const isAr = locale === 'ar'

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.06] p-4 shadow-[0_24px_56px_-28px_rgb(0_0_0/0.65)] backdrop-blur-xl sm:p-5">
      {/* Window Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <PulseDot className="size-2" />
          <span className="caps text-[10px] text-white/85">
            {isAr ? 'جلسة منتج حية' : 'Live Product Studio'}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF9CC2]/35 bg-[#E1306C]/20 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-[#ffc2da]">
          <Clock className="size-3" aria-hidden />
          30:00
        </span>
      </div>

      {/* Live Bilingual Voice & Chat Waveform */}
      <div className="mt-4 rounded-2xl border border-white/12 bg-night/55 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
            <span className="grid size-6 place-items-center rounded-full bg-[linear-gradient(135deg,#1a63d8,#E1306C)]">
              <Mic className="size-3.5 text-white" aria-hidden />
            </span>
            {isAr ? 'تجربة الصوت والدردشة الحية' : 'Live Bilingual Voice & Chat'}
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-medium text-[#7DE8E2]">
            EN · العربية
          </span>
        </div>

        {/* Animated Equalizer Bars */}
        <div className="mt-4 flex h-14 items-center justify-between gap-1.5 px-1" aria-hidden>
          {WAVE_HEIGHTS.map((h, i) => (
            <motion.span
              key={i}
              className="w-full rounded-full"
              style={{
                height: `${h}%`,
                background:
                  i % 3 === 0
                    ? 'linear-gradient(180deg,#7DE8E2,#0E9A9E)'
                    : i % 3 === 1
                      ? 'linear-gradient(180deg,#8B7CFF,#6F4BF2)'
                      : 'linear-gradient(180deg,#FF9CC2,#1A63D8)',
              }}
              animate={
                reduce
                  ? undefined
                  : {
                      scaleY: [0.35, 1, 0.45, 0.85, 0.35],
                    }
              }
              transition={{
                duration: 1.8 + (i % 4) * 0.3,
                repeat: Infinity,
                delay: i * 0.08,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/65">
          <span>{isAr ? 'ردود على أرقامك وقنواتك الفعلية' : 'Running on your real use case'}</span>
          <span className="font-semibold text-[#7DE8E2]">{isAr ? 'بدون شرائح عرض' : 'Product, not slides'}</span>
        </div>
      </div>

      {/* Channels Covered */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
        <span className="text-[11.5px] font-medium text-white/75">
          {isAr ? 'القنوات المختبرة' : 'Channels in session'}
        </span>
        <div className="flex items-center -space-x-1.5 rtl:space-x-reverse">
          {SOCIALS.map((kind) => (
            <ChannelMark
              key={kind}
              kind={kind}
              className="size-7 ring-2 ring-night"
              glyphClassName="size-3.5"
              rounded="rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function WalkthroughPage() {
  const { copy, locale } = useLocale()
  const reduce = useReducedMotion()
  const rp = copy.resourcePages
  const page = rp.pages.walkthrough
  const isAr = locale === 'ar'

  const [activeAct, setActiveAct] = useState(0)
  const [selectedChannels, setSelectedChannels] = useState<ChannelKey[]>(['whatsapp', 'voice'])
  const [selectedLang, setSelectedLang] = useState<(typeof LANG_OPTIONS)[number]['id']>('both')
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['ops', 'frontdesk'])

  const toggleChannel = (kind: ChannelKey) => {
    setSelectedChannels((prev) => {
      if (prev.includes(kind)) {
        return prev.length > 1 ? prev.filter((k) => k !== kind) : prev
      }
      return [...prev, kind]
    })
  }

  const toggleRole = (id: string) => {
    setSelectedRoles((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((r) => r !== id) : prev
      }
      return [...prev, id]
    })
  }

  const whatsappHref = useMemo(() => {
    const channelNames = selectedChannels.map((c) => BRANDS[c].label).join(', ')
    const langObj = LANG_OPTIONS.find((l) => l.id === selectedLang) ?? LANG_OPTIONS[0]
    const roleNames = ROLE_OPTIONS.filter((r) => selectedRoles.includes(r.id))
      .map((r) => (isAr ? r.labelAr : r.labelEn))
      .join(', ')

    const text = isAr
      ? `مرحباً Hello Techno — أرغب بحجز جولة مباشرة (30 دقيقة).\nالقنوات: ${channelNames}\nاللغة: ${langObj.labelAr}\nالحضور: ${roleNames}`
      : `Hi Hello Techno — I'd like to book a 30-min live walkthrough.\nChannels: ${channelNames}\nLanguage: ${langObj.labelEn}\nJoining: ${roleNames}`
    return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`
  }, [selectedChannels, selectedLang, selectedRoles, isAr])

  const currentAct = AGENDA_ACTS[activeAct] ?? AGENDA_ACTS[0]

  return (
    <main id="main" className="relative overflow-x-hidden bg-canvas pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, #ece6ff, transparent 52%), radial-gradient(ellipse at 86% 12%, rgb(225 48 108 / 0.12), transparent 44%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-45" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1160px]">
          <Reveal immediate variant="up" y={14}>
            <ResourceTopBar activeSlug="walkthrough" />
          </Reveal>

          <Reveal immediate delay={0.06} variant="up" y={22}>
            <ResourceHeroShell slug="walkthrough">
              <div className="grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="caps inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/85">
                      <Sparkles className="size-3 text-[#FF9CC2]" aria-hidden />
                      {page.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7DE8E2]/30 bg-[#7DE8E2]/12 px-3 py-1 text-[11px] font-semibold text-[#b4f5f0]">
                      <Clock className="size-3" aria-hidden />
                      {isAr ? '30 دقيقة · منتج حي لا شرائح' : '30 mins · Live product, not slides'}
                    </span>
                  </div>

                  <h1 className="display mt-4 max-w-[15ch] text-[clamp(1.9rem,1.25rem+2.5vw,3.35rem)] tracking-[-0.04em] text-balance text-white">
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
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-[14px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15"
                    >
                      <ChannelMark kind="whatsapp" className="size-6" glyphClassName="size-3" rounded="rounded-full" />
                      {rp.ctaWa}
                    </a>
                  </div>
                </div>

                <WalkthroughStudioPreview />
              </div>
            </ResourceHeroShell>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------- interactive 30-min timeline */}
      <section className="relative px-4 py-5 sm:px-6 sm:py-7">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="up" y={20}>
            <div className="overflow-hidden rounded-[26px] border border-line bg-white/95 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm sm:rounded-[30px] sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="caps text-brand">{isAr ? 'جدول الجلسة الدقيقة بالدقيقة' : 'Minute-by-Minute Session Arc'}</p>
                  <h2 className="display mt-1.5 text-[1.4rem] text-ink sm:text-[1.8rem]">
                    {isAr ? 'كيف تمضي الثلاثون دقيقة مع فريقنا' : 'Exactly how the 30 minutes unfold'}
                  </h2>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-soft px-3 py-1 text-[12px] font-semibold text-brand">
                  <CalendarCheck2 className="size-3.5" aria-hidden />
                  {isAr ? 'بلا التزام · بلا عروض تقليدية' : 'No obligation · Zero slide decks'}
                </span>
              </div>

              {/* 3 Interactive Time Blocks */}
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {AGENDA_ACTS.map((act, i) => {
                  const selected = i === activeAct
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setActiveAct(i)}
                      className={cx(
                        'relative flex flex-col overflow-hidden rounded-[20px] border p-4 text-start transition-all duration-300',
                        selected
                          ? 'border-brand/40 bg-[linear-gradient(155deg,#ffffff,#e9f1fe)] shadow-[0_18px_36px_-24px_rgb(26_99_216/0.5)]'
                          : 'border-line bg-canvas/65 hover:border-line-strong hover:bg-white',
                      )}
                    >
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] transition-opacity"
                        style={{ background: act.accent, opacity: selected ? 1 : 0.25 }}
                        aria-hidden
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums"
                          style={{ background: act.soft, color: act.accent }}
                        >
                          {act.minutes} {isAr ? 'د' : 'min'}
                        </span>
                        <span className="display text-[12px] tabular-nums text-faint">0{i + 1}</span>
                      </div>
                      <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.02em] text-ink">
                        {isAr ? act.titleAr : act.titleEn}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                        {isAr ? act.descAr : act.descEn}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Animated Progress & Highlight Strip */}
              <div className="mt-5">
                <div className="h-1.5 overflow-hidden rounded-full bg-soft">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#1A63D8,#6F4BF2,#0E9A9E)]"
                    animate={{ width: `${((activeAct + 1) / AGENDA_ACTS.length) * 100}%` }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAct.id}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-canvas/80 px-4 py-3 text-[13px] font-medium text-ink-2"
                  >
                    <span className="inline-flex items-center gap-2">
                      <PulseDot className="size-2" />
                      {isAr ? currentAct.highlightAr : currentAct.highlightEn}
                    </span>
                    <span className="text-[11.5px] font-semibold tabular-nums text-brand">
                      {currentAct.minutes} {isAr ? 'دقيقة' : 'min'}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------- interactive walkthrough builder */}
      <section className="relative px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="scale" y={22}>
            <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
              {/* Left Configurator Controls */}
              <div className="rounded-[26px] border border-line bg-white/95 p-5 shadow-[var(--shadow-card)] sm:rounded-[30px] sm:p-7">
                <span className="caps inline-flex items-center gap-1.5 rounded-full bg-iris-soft px-3 py-1 text-[10px] text-iris">
                  <Sparkles className="size-3" aria-hidden />
                  {isAr ? 'خصّص جولتك المباشرة' : 'Tailor Your Live Session'}
                </span>
                <h2 className="display mt-2.5 text-[1.4rem] text-ink sm:text-[1.75rem]">
                  {isAr ? 'اختر القنوات واللغة التي تريد اختبارها معنا' : 'Pick the channels & languages you want wired live'}
                </h2>

                {/* Step 1: Channels */}
                <div className="mt-6">
                  <p className="text-[13px] font-semibold text-ink">
                    {isAr ? '1. القنوات المطلوب تجربتها (اختر واحدة أو أكثر)' : '1. Channels to test live (pick one or more)'}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SOCIALS.map((kind) => {
                      const active = selectedChannels.includes(kind)
                      return (
                        <button
                          key={kind}
                          type="button"
                          onClick={() => toggleChannel(kind)}
                          aria-pressed={active}
                          className={cx(
                            'flex items-center gap-2.5 rounded-2xl border p-2.5 text-start transition-all duration-200',
                            active
                              ? 'border-brand/45 bg-brand-soft/60 shadow-[0_10px_22px_-16px_rgb(26_99_216/0.6)]'
                              : 'border-line bg-canvas/60 hover:border-line-strong hover:bg-white',
                          )}
                        >
                          <ChannelMark kind={kind} className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                          <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink">
                            {BRANDS[kind].label}
                          </span>
                          <span
                            className={cx(
                              'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                              active ? 'border-brand bg-brand text-white' : 'border-line-strong bg-white text-transparent',
                            )}
                          >
                            <Check className="size-3" aria-hidden />
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2: Language */}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                    <Globe className="size-3.5 text-brand" aria-hidden />
                    {isAr ? '2. لغة العرض' : '2. Walkthrough language'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {LANG_OPTIONS.map((opt) => {
                      const active = selectedLang === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedLang(opt.id)}
                          className={cx(
                            'relative rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors',
                            active ? 'border-transparent text-white' : 'border-line bg-canvas/70 text-ink-2 hover:border-brand/40',
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId={reduce ? undefined : 'walkthrough-lang-pill'}
                              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                              className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,#1a63d8,#6f4bf2)]"
                              aria-hidden
                            />
                          )}
                          <span className="relative z-10">{isAr ? opt.labelAr : opt.labelEn}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Who's Joining */}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                    <Users className="size-3.5 text-teal" aria-hidden />
                    {isAr ? '3. من سيحضر الجلسة؟' : '3. Who is joining from your team?'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ROLE_OPTIONS.map((role) => {
                      const active = selectedRoles.includes(role.id)
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => toggleRole(role.id)}
                          aria-pressed={active}
                          className={cx(
                            'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-all',
                            active
                              ? 'border-teal/40 bg-teal-soft text-teal-deep'
                              : 'border-line bg-canvas/70 text-muted hover:border-line-strong hover:text-ink',
                          )}
                        >
                          <Check className={cx('size-3.5', active ? 'opacity-100' : 'opacity-30')} aria-hidden />
                          {isAr ? role.labelAr : role.labelEn}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Live Session Ticket */}
              <div className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-[linear-gradient(155deg,#040d1c,#121d47_52%,#261442)] p-5 text-white shadow-[0_28px_60px_-28px_rgb(4_13_28/0.75)] sm:rounded-[30px] sm:p-7">
                <span
                  className="pointer-events-none absolute -top-24 -end-16 size-56 rounded-full bg-[radial-gradient(circle,rgb(225_48_108/0.35),transparent_70%)] blur-3xl"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -bottom-24 -start-16 size-52 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.38),transparent_70%)] blur-3xl"
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-2 border-b border-white/12 pb-4">
                    <div>
                      <p className="caps text-[10px] text-[#FF9CC2]">
                        {isAr ? 'ملخص جلستك المخصص' : 'Your Custom Walkthrough Brief'}
                      </p>
                      <h3 className="display mt-1 text-[1.35rem] text-white">
                        {isAr ? 'جولة حية لمدة 30 دقيقة' : '30-Min Live Product Demo'}
                      </h3>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#7DE8E2]">
                      <CalendarCheck2 className="size-5" aria-hidden />
                    </span>
                  </div>

                  {/* Summary Details */}
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-[11px] font-semibold tracking-wider text-white/50 uppercase">
                        {isAr ? 'القنوات المختارة' : 'Selected Channels'}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {selectedChannels.map((ch) => (
                          <span
                            key={ch}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] font-medium text-white"
                          >
                            <ChannelMark kind={ch} className="size-4.5" glyphClassName="size-2.5" rounded="rounded-full" />
                            {BRANDS[ch].label}
                          </span>
                        ))}
                      </dd>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                      <div>
                        <dt className="text-[11px] font-semibold tracking-wider text-white/50 uppercase">
                          {isAr ? 'اللغة' : 'Language'}
                        </dt>
                        <dd className="mt-1 text-[13.5px] font-semibold text-[#7DE8E2]">
                          {isAr
                            ? (LANG_OPTIONS.find((l) => l.id === selectedLang)?.labelAr ?? '')
                            : (LANG_OPTIONS.find((l) => l.id === selectedLang)?.labelEn ?? '')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold tracking-wider text-white/50 uppercase">
                          {isAr ? 'الحضور' : 'Attendees'}
                        </dt>
                        <dd className="mt-1 text-[13px] font-medium text-white/85">
                          {ROLE_OPTIONS.filter((r) => selectedRoles.includes(r.id))
                            .map((r) => (isAr ? r.labelAr : r.labelEn))
                            .join(' · ')}
                        </dd>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#7DE8E2]/25 bg-[#7DE8E2]/10 px-3.5 py-3 text-[12.5px] leading-snug text-[#c5f8f4]">
                      {isAr
                        ? 'تخرج من الجلسة بخطة إطلاق، تحجيم أرصدة واضح، وخيار تجربة الوضع الظلي.'
                        : 'You leave with a go-live sketch, clear credit sizing, and an optional shadow-mode pilot.'}
                    </div>
                  </dl>
                </div>

                <div className="relative mt-6 flex flex-col gap-2.5">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-[14px] font-semibold text-white shadow-[0_14px_30px_-14px_rgb(37_211_102/0.8)] transition-all hover:brightness-105 active:scale-[0.98]"
                  >
                    <ChannelMark kind="whatsapp" className="size-6" glyphClassName="size-3.5" rounded="rounded-full" />
                    {isAr ? 'أرسل الملخص على واتساب الآن' : 'Send Custom Brief on WhatsApp'}
                  </a>
                  <Link
                    to="/demo"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-[14px] font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/15"
                  >
                    {rp.ctaDemo}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- 3-column brief breakdown */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="grid gap-4 lg:grid-cols-3">
            {page.sections.map((section, i) => {
              const meta = SECTION_META[i] ?? SECTION_META[0]
              const Icon = meta.icon
              return (
                <Reveal key={section.title} delay={0.07 * i} variant="up" y={24} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white/95 p-5 shadow-[0_18px_40px_-30px_rgb(9_30_74/0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(26_99_216/0.35)] sm:p-6">
                    <span
                      className="pointer-events-none absolute -top-16 -end-12 size-40 rounded-full opacity-70 blur-2xl transition-opacity group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${meta.color}28, transparent 70%)` }}
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-between gap-2">
                      <span
                        className="grid size-11 place-items-center rounded-2xl text-white shadow-[0_12px_24px_-12px_rgb(9_30_74/0.55)]"
                        style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}
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
                              style={{ background: meta.soft, color: meta.color }}
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

      <ResourceFooterBand slug="walkthrough" />
    </main>
  )
}
