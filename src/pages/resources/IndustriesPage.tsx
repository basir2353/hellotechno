import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { Mark } from '../../components/Logo'
import { ChannelMark, type ChannelKey } from '../../components/Social'
import { Btn, PulseDot, Reveal } from '../../components/Ui'
import { INDUSTRIES, INTEGRATIONS, SITE } from '../../data'
import { cx } from '../../lib/cx'
import { useLocale } from '../../lib/locale'
import { EASE } from '../../lib/motion'
import { ResourceFooterBand, ResourceHeroShell, ResourceTopBar } from './shared'

type SectorSim = {
  channel: ChannelKey
  systems: string[]
  userEn: string
  userAr: string
  aiEn: string
  aiAr: string
  actionEn: string
  actionAr: string
  speedEn: string
  speedAr: string
}

const SECTOR_SIMS: Record<string, SectorSim> = {
  hospitality: {
    channel: 'whatsapp',
    systems: ['OPERA Cloud', 'Mews', 'SiteMinder', 'HotSOS'],
    userEn: 'Hi, do you have a sea-view suite available for 2 nights this Friday with late checkout?',
    userAr: 'مرحباً، هل يتوفر جناح مطل على البحر ليلتين بدءاً من الجمعة مع مغادرة متأخرة؟',
    aiEn: 'Yes! Our Deluxe Sea-View Suite is available Fri–Sun at QAR 1,280/night (incl. fees), with complimentary 2 PM checkout. Shall I hold it under your name?',
    aiAr: 'نعم! يتوفر جناح ديلوكس مطل على البحر من الجمعة للأحد بسعر 1,280 ر.ق/الليلة شاملاً الرسوم مع مغادرة مجانية 2 ظهراً. هل أحجزه باسمك؟',
    actionEn: 'Suite held in OPERA Cloud · Job #HT-4821',
    actionAr: 'تم حجز الجناح في OPERA Cloud · رقم #HT-4821',
    speedEn: 'Replied in 2.1s',
    speedAr: 'تم الرد خلال 2.1ث',
  },
  clinics: {
    channel: 'instagram',
    systems: ['Clinic Diary', 'WhatsApp', 'Instagram DM', 'Voice AI'],
    userEn: 'How much is laser facial and do you have a female specialist tomorrow evening?',
    userAr: 'كم سعر جلسة الليزر للوجه وهل تتوفر أخصائية غداً مساءً؟',
    aiEn: 'Laser facial starts at QAR 550. Dr. Sara has openings tomorrow at 6:00 PM and 7:30 PM at our West Bay branch. Which slot suits you?',
    aiAr: 'تبدأ جلسة الليزر من 550 ر.ق. د. سارة متاحة غداً الساعة 6:00 و7:30 مساءً في فرع الخليج الغربي. أي موعد يناسبك؟',
    actionEn: 'Consult booked · Reminder scheduled',
    actionAr: 'تم تأكيد الاستشارة · جُدول التذكير',
    speedEn: 'Replied in 1.8s',
    speedAr: 'تم الرد خلال 1.8ث',
  },
  restaurants: {
    channel: 'whatsapp',
    systems: ['Foodics', 'Symphony POS', 'WhatsApp', 'Voice AI'],
    userEn: 'Can I order 2 saffron boxes + 4 iced Spanish lattes for pickup in 30 mins?',
    userAr: 'أريد طلب صندوقين زعفران مع 4 سبانش لاتيه بارد للاستلام خلال 30 دقيقة؟',
    aiEn: 'Got it! 2x Saffron Box + 4x Iced Spanish Latte = QAR 210, ready at 5:45 PM. Here is your secure payment link to lock the order into the kitchen.',
    aiAr: 'تم! 2 صندوق زعفران + 4 سبانش لاتيه = 210 ر.ق، جاهز الساعة 5:45 مساءً. إليك رابط الدفع الآمن لتأكيد الطلب مباشرة للمطبخ.',
    actionEn: 'Order #412 sent to Foodics POS · Paid',
    actionAr: 'طلب #412 أُرسل إلى Foodics POS · مدفوع',
    speedEn: 'Replied in 2.4s',
    speedAr: 'تم الرد خلال 2.4ث',
  },
  automobile: {
    channel: 'web',
    systems: ['Keyloop', 'CDK Global', 'Autoline', 'Voice AI'],
    userEn: 'Is the 2026 Hybrid SUV available for a test drive Saturday morning? Also need 40k service quote.',
    userAr: 'هل تتوفر سيارة SUV الهجينة لتجربة قيادة صباح السبت؟ وأحتاج تسعيرة صيانة 40 ألف كم.',
    aiEn: 'Saturday 10:30 AM is open at Salwa Rd showroom for the 2026 Hybrid SUV, and your 40,000 km major service is QAR 1,450 with valet pickup. Book both?',
    aiAr: 'الساعة 10:30 صباح السبت متاحة في معرض طريق سلوى لتجربة القيادة، وصيانة 40,000 كم بسعر 1,450 ر.ق مع خدمة الاستلام. أحجزهما لك؟',
    actionEn: 'Test drive + Workshop Bay #3 reserved',
    actionAr: 'حُجزت تجربة القيادة + خانة الورشة #3',
    speedEn: 'Replied in 2.9s',
    speedAr: 'تم الرد خلال 2.9ث',
  },
  smb: {
    channel: 'whatsapp',
    systems: ['Shopify', 'Zoho CRM', 'Google Calendar', 'Payment Links'],
    userEn: 'Do you still have the 6-session membership offer and can I book Friday 4 PM?',
    userAr: 'هل عرض باقة 6 جلسات ما زال متاحاً وهل يمكن الحجز الجمعة الساعة 4 عصراً؟',
    aiEn: 'Yes, the 6-session pack is QAR 890! Friday 4:00 PM is available. Tap below to reserve your slot and activate your membership instantly.',
    aiAr: 'نعم، باقة 6 جلسات بسعر 890 ر.ق! وموعد الجمعة 4:00 عصراً متاح. اضغط بالأسفل لتأكيد الحجز وتفعيل عضويتك فوراً.',
    actionEn: 'Slot locked · Payment link issued',
    actionAr: 'تم حجز الموعد · أُصدر رابط الدفع',
    speedEn: 'Replied in 1.9s',
    speedAr: 'تم الرد خلال 1.9ث',
  },
}

const BRIEF_ACCENTS = [
  { color: '#1A63D8', soft: '#e2edff' },
  { color: '#6F4BF2', soft: '#ece6ff' },
  { color: '#0E9A9E', soft: '#ddf5f4' },
] as const

export function IndustriesPage() {
  const { copy, locale } = useLocale()
  const reduce = useReducedMotion()
  const rp = copy.resourcePages
  const page = rp.pages.industries
  const isAr = locale === 'ar'

  const sectors = INDUSTRIES.map((base, i) => {
    const localized = copy.industries.items[i]
    return {
      ...base,
      name: localized?.name ?? base.name,
      tagline: localized?.tagline ?? base.tagline,
      pain: localized?.pain ?? base.pain,
      win: localized?.win ?? base.win,
      uses: localized?.uses ?? base.uses,
    }
  })

  const [activeKey, setActiveKey] = useState(sectors[0]?.key ?? 'hospitality')
  const activeSector = sectors.find((s) => s.key === activeKey) ?? sectors[0]
  const sim = SECTOR_SIMS[activeSector.key] ?? SECTOR_SIMS.hospitality

  return (
    <main id="main" className="relative overflow-x-hidden bg-canvas pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, #ece6ff, transparent 52%), radial-gradient(ellipse at 86% 12%, rgb(26 99 216 / 0.14), transparent 44%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-45" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1160px]">
          <Reveal immediate variant="up" y={14}>
            <ResourceTopBar activeSlug="industries" />
          </Reveal>

          <Reveal immediate delay={0.06} variant="up" y={22}>
            <ResourceHeroShell slug="industries">
              <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
                <div>
                  <span className="caps inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/85">
                    <Sparkles className="size-3 text-[#B9A6FF]" aria-hidden />
                    {page.tag}
                  </span>

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

                {/* Same Core · Local Rules Visual Hub */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/14 bg-white/[0.06] p-4 backdrop-blur-xl sm:p-5">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="size-4 text-[#7DE8E2]" aria-hidden />
                      <span className="caps text-[10px] text-white/80">
                        {isAr ? 'نواة واحدة · قواعد كل قطاع' : 'One AI Core · Sector Playbooks'}
                      </span>
                    </div>
                    <span className="rounded-full bg-[#6F4BF2]/30 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#dcd2ff]">
                      {isAr ? '5 قطاعات رئيسية' : '5 Priority Sectors'}
                    </span>
                  </div>

                  {/* Center Brand Core + Interactive Sector Nodes */}
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="relative grid size-16 place-items-center rounded-[20px] bg-white shadow-[0_18px_40px_-14px_rgb(111_75_242/0.8)]">
                      {!reduce && (
                        <span
                          className="pointer-events-none absolute -inset-2 rounded-[26px] border border-[#7DE8E2]/40 animate-pulse-ring"
                          aria-hidden
                        />
                      )}
                      <Mark className="size-11" glow />
                    </div>

                    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
                      {sectors.map((sector) => {
                        const Icon = sector.icon
                        const selected = sector.key === activeSector.key
                        return (
                          <button
                            key={sector.key}
                            type="button"
                            onClick={() => setActiveKey(sector.key)}
                            className={cx(
                              'flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-start transition-all duration-200',
                              selected
                                ? 'border-white/40 bg-white/18 text-white shadow-[0_12px_28px_-14px_rgb(111_75_242/0.7)]'
                                : 'border-white/10 bg-white/[0.04] text-white/75 hover:border-white/25 hover:bg-white/[0.08] hover:text-white',
                            )}
                          >
                            <span
                              className="grid size-7 shrink-0 place-items-center rounded-xl"
                              style={{ background: `${sector.accent}35`, color: '#fff' }}
                            >
                              <Icon className="size-3.5" aria-hidden />
                            </span>
                            <span className="min-w-0 truncate text-[12px] font-semibold">{sector.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Live Connectors Marquee */}
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-night/45 py-2">
                    <div className="marquee-mask">
                      <ul className="flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
                        {[...INTEGRATIONS, ...INTEGRATIONS].map((tool, i) => (
                          <li
                            key={`${tool}-${i}`}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-white/70"
                          >
                            <span className="size-1.5 rounded-full bg-[#7DE8E2]" aria-hidden />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ResourceHeroShell>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------- interactive sector blueprint */}
      <section className="relative px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="up" y={20}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="caps text-iris">{isAr ? 'استوديو القطاعات التفاعلي' : 'Interactive Sector Blueprints'}</p>
                <h2 className="display mt-1.5 text-[1.45rem] text-ink sm:text-[1.95rem]">
                  {isAr ? 'اختر قطاعك وشاهد الذكاء يعمل على تشغيلك' : 'Pick a sector to inspect its live AI workflow'}
                </h2>
              </div>
              <p className="max-w-md text-[13.5px] text-muted">
                {isAr
                  ? 'كل قطاع يعمل على نفس المنصة الموحّدة مع معرفة وموصلات ولغة مخصصة لكل فرع.'
                  : 'Every vertical runs on the same governed layer — tailored knowledge, connectors and local rules per branch.'}
              </p>
            </div>

            {/* Animated Segmented Sector Tabs */}
            <div
              role="tablist"
              aria-label={copy.industries.eyebrow}
              className="hide-scrollbar mt-5 flex items-center gap-1.5 overflow-x-auto rounded-[20px] border border-line bg-white/85 p-1.5 shadow-[0_12px_28px_-22px_rgb(9_30_74/0.4)] backdrop-blur-md"
            >
              {sectors.map((sector) => {
                const Icon = sector.icon
                const selected = sector.key === activeSector.key
                return (
                  <button
                    key={sector.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveKey(sector.key)}
                    className={cx(
                      'relative inline-flex shrink-0 items-center gap-2 rounded-[14px] px-4 py-2.5 text-[13px] font-semibold transition-colors',
                      selected ? 'text-white' : 'text-muted hover:text-ink',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId={reduce ? undefined : 'industry-blueprint-tab'}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 rounded-[14px] shadow-[0_12px_24px_-12px_rgb(26_99_216/0.7)]"
                        style={{ background: `linear-gradient(115deg, ${sector.accent}, #1A63D8)` }}
                        aria-hidden
                      />
                    )}
                    <Icon className="relative z-10 size-4 shrink-0" aria-hidden />
                    <span className="relative z-10 whitespace-nowrap">{sector.name}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Active Sector Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-5"
            >
              <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                {/* Left: Pain -> Win + Systems */}
                <div className="relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-white/95 p-5 shadow-[var(--shadow-card)] sm:p-7">
                  <span
                    className="pointer-events-none absolute -top-24 -end-16 size-56 rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${activeSector.accent}24, transparent 70%)` }}
                    aria-hidden
                  />

                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className="caps inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
                        style={{ background: activeSector.tint, color: activeSector.accent }}
                      >
                        <Building2 className="size-3" aria-hidden />
                        {activeSector.tagline}
                      </span>
                      <div className="flex items-center -space-x-1 rtl:space-x-reverse">
                        {(['whatsapp', 'voice', 'instagram', 'web'] as ChannelKey[]).map((ch) => (
                          <ChannelMark
                            key={ch}
                            kind={ch}
                            className="size-7 ring-2 ring-white"
                            glyphClassName="size-3.5"
                            rounded="rounded-full"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="display mt-4 text-[clamp(1.55rem,1.2rem+1.2vw,2.2rem)] text-ink">
                      {activeSector.name}
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-line bg-canvas/75 p-4">
                        <p className="caps text-[10px] text-faint">{copy.industries.pain}</p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{activeSector.pain}</p>
                      </div>
                      <div
                        className="rounded-2xl border p-4"
                        style={{ borderColor: `${activeSector.accent}35`, background: `${activeSector.tint}88` }}
                      >
                        <p className="caps text-[10px]" style={{ color: activeSector.accent }}>
                          {copy.industries.win}
                        </p>
                        <p className="mt-2 text-[13.5px] leading-relaxed font-medium text-ink-2">{activeSector.win}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Systems Strip */}
                  <div className="relative mt-5 border-t border-line pt-4">
                    <p className="caps text-[10px] text-faint">
                      {isAr ? 'الأنظمة التي نربطها مباشرة' : 'Scoped Connectors'}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {sim.systems.map((sys) => (
                        <span
                          key={sys}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-[12px] font-medium text-ink-2"
                        >
                          <Layers className="size-3 text-brand" aria-hidden />
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Live Simulated AI Conversation & Action */}
                <div className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-[linear-gradient(155deg,#040d1c,#0b234d_55%,#0e2b58)] p-5 text-white shadow-[0_28px_60px_-30px_rgb(4_13_28/0.75)] sm:p-7">
                  <span
                    className="pointer-events-none absolute -top-20 -end-16 size-56 rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${activeSector.accent}48, transparent 70%)` }}
                    aria-hidden
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-2 border-b border-white/12 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <ChannelMark kind={sim.channel} className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                        <div>
                          <p className="text-[13px] font-semibold text-white">
                            {isAr ? `محاكاة حية · ${activeSector.name}` : `Live Flow · ${activeSector.name}`}
                          </p>
                          <p className="text-[11px] text-white/55">
                            {isAr ? 'العربية + الإنجليزية · 24/7' : 'EN + AR Native · 24/7'}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/20 px-2.5 py-1 text-[11px] font-semibold text-[#86ffae]">
                        <Zap className="size-3" aria-hidden />
                        {isAr ? sim.speedAr : sim.speedEn}
                      </span>
                    </div>

                    {/* Chat Bubbles */}
                    <div className="mt-4 space-y-3">
                      <motion.div
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08, duration: 0.4, ease: EASE }}
                        className="max-w-[90%] rounded-2xl rounded-ss-md border border-white/12 bg-white/10 px-4 py-3 text-[13.5px] leading-relaxed text-white/90"
                      >
                        {isAr ? sim.userAr : sim.userEn}
                      </motion.div>

                      <motion.div
                        initial={reduce ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.45, ease: EASE }}
                        className="ms-auto max-w-[92%] rounded-2xl rounded-ee-md bg-[linear-gradient(125deg,#1a63d8,#4b53e8_60%,#0e9a9e)] px-4 py-3 text-[13.5px] leading-relaxed text-white shadow-[0_16px_34px_-18px_rgb(26_99_216/0.9)]"
                      >
                        {isAr ? sim.aiAr : sim.aiEn}
                      </motion.div>
                    </div>
                  </div>

                  {/* Executed System Action Pill */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.4, ease: EASE }}
                    className="relative mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#7DE8E2]/30 bg-[#7DE8E2]/12 px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-[12.5px] font-semibold text-[#b4f5f0]">
                      <CheckCircle2 className="size-4 shrink-0 text-[#7DE8E2]" aria-hidden />
                      {isAr ? sim.actionAr : sim.actionEn}
                    </span>
                    <span className="text-[11px] font-medium text-white/60">
                      {isAr ? 'إجراء مسجّل' : 'Audited action'}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* 3 Concrete Use-Case Cards */}
              <div className="mt-4 grid gap-3.5 md:grid-cols-3">
                {activeSector.uses.map((use, ui) => (
                  <article
                    key={use.title}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-line bg-white/95 p-5 shadow-[0_14px_32px_-26px_rgb(9_30_74/0.4)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_44px_-28px_rgb(26_99_216/0.35)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="display text-[12px] font-bold tabular-nums"
                          style={{ color: activeSector.accent }}
                        >
                          0{ui + 1}
                        </span>
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </span>
                      </div>
                      <h4 className="mt-2 text-[15.5px] font-semibold tracking-[-0.02em] text-ink">{use.title}</h4>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{use.body}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[12px] font-semibold text-success">
                      <PulseDot className="size-1.5" />
                      {use.result}
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ------------------------------------------ sector brief summaries */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1160px]">
          <Reveal variant="up" y={18}>
            <p className="caps text-brand">{isAr ? 'ملخص القطاعات ذات الأولوية' : 'Priority Rollout Summary'}</p>
            <h2 className="display mt-1.5 text-[1.4rem] text-ink sm:text-[1.75rem]">
              {isAr ? 'أين يظهر الأثر الأسرع في الخليج' : 'Where GCC operators see fastest impact'}
            </h2>
          </Reveal>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {page.sections.map((section, i) => {
              const accent = BRIEF_ACCENTS[i] ?? BRIEF_ACCENTS[0]
              return (
                <Reveal key={section.title} delay={0.07 * i} variant="up" y={24} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white/95 p-5 shadow-[0_18px_40px_-30px_rgb(9_30_74/0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(111_75_242/0.35)] sm:p-6">
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }}
                      aria-hidden
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="display grid size-10 place-items-center rounded-2xl text-[1rem] text-white"
                        style={{ background: `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)` }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="caps rounded-full px-2.5 py-1 text-[10px]"
                        style={{ background: accent.soft, color: accent.color }}
                      >
                        {isAr ? 'مُجرّب بالخليج' : 'GCC Ready'}
                      </span>
                    </div>

                    <h3 className="display mt-4 text-[1.2rem] tracking-[-0.025em] text-ink">{section.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{section.body}</p>

                    {section.points && section.points.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
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

      <ResourceFooterBand slug="industries" />
    </main>
  )
}
