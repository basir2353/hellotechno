import {
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  Bell,
  Brain,
  Calendar,
  Check,
  Clock,
  Database,
  Lightbulb,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import { Mark } from './Logo'
import { ChannelMark, type ChannelKey } from './Social'
import { PulseDot, Reveal } from './Ui'

/* ------------------------------------------------------------------ atoms */

function Panel({
  n,
  title,
  sub,
  tone,
  children,
}: {
  n: string
  title: string
  sub: string
  tone: 'blue' | 'iris' | 'teal'
  children: ReactNode
}) {
  return (
    <div
      className={cx(
        '@container relative flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border p-3 shadow-[0_16px_40px_-30px_rgb(9_30_74/0.35)] sm:p-3.5',
        tone === 'blue' && 'border-[#cfe0fb] bg-[linear-gradient(168deg,#f8fbff,#e9f2ff_70%,#e4efff)]',
        tone === 'iris' && 'border-[#ded4ff] bg-[linear-gradient(168deg,#fbfaff,#f0ecff_70%,#eae6ff)]',
        tone === 'teal' && 'border-[#c6ebe9] bg-[linear-gradient(168deg,#f8fffe,#e7f8f7_70%,#dff5f4)]',
      )}
    >
      <div className="relative flex items-start gap-2.5">
        <span
          className={cx(
            'grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white shadow-[0_8px_16px_-8px_rgb(9_30_74/0.55)]',
            tone === 'blue' && 'bg-[linear-gradient(140deg,#2b7fe0,#12479f)]',
            tone === 'iris' && 'bg-[linear-gradient(140deg,#7c5cf5,#4c2bc4)]',
            tone === 'teal' && 'bg-[linear-gradient(140deg,#14b5b0,#0a7d86)]',
          )}
        >
          {n}
        </span>
        <div className="min-w-0">
          <h3 className="text-[0.95rem] leading-tight font-semibold tracking-[-0.03em] text-ink">{title}</h3>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{sub}</p>
        </div>
      </div>
      <div className="relative mt-3 flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

function StepBridge({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <div
      className={cx(
        'flex items-center justify-center',
        horizontal ? 'hidden lg:flex' : 'flex py-0.5 lg:hidden',
      )}
      aria-hidden
    >
      <span className="grid size-7 place-items-center rounded-full border border-line bg-white text-brand shadow-[0_8px_18px_-12px_rgb(9_30_74/0.4)]">
        <ArrowRight className={cx('size-3.5', !horizontal && 'rotate-90')} />
      </span>
    </div>
  )
}

function MiniCard({
  icon,
  title,
  note,
  check = false,
  accent = '#1A63D8',
  className,
  children,
}: {
  icon?: ReactNode
  title: string
  note?: string
  check?: boolean
  accent?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cx(
        'min-w-0 overflow-hidden rounded-[12px] border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_8px_18px_-14px_rgb(9_30_74/0.45)]',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {icon && (
          <span
            className="grid size-6 shrink-0 place-items-center overflow-hidden rounded-[8px]"
            style={{ background: `${accent}16`, color: accent }}
          >
            {icon}
          </span>
        )}
        <p className="min-w-0 flex-1 truncate text-[11.5px] leading-tight font-medium text-ink">{title}</p>
        {check && <Check className="size-3 shrink-0 text-success" aria-hidden />}
      </div>
      {note && <p className="mt-0.5 truncate pl-[1.875rem] text-[10px] leading-snug text-faint">{note}</p>}
      {children}
    </div>
  )
}

function LiveTag({ children }: { children?: string }) {
  const { copy } = useLocale()
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.04em] text-success uppercase">
      <PulseDot className="size-1.5" />
      {children ?? copy.diagram.live}
    </span>
  )
}

/* --------------------------------------------------------------- panel 1 */

function AiCore() {
  return (
    <div className="relative mx-auto grid h-[7.5rem] w-[7.5rem] shrink-0 place-items-center">
      <span
        className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgb(111_75_242/0.38),transparent_62%)] blur-md"
        aria-hidden
      />
      <span
        className="absolute size-full rounded-full border border-brand/25 bg-[radial-gradient(circle_at_30%_28%,#eaf1ff_0%,#d4e3ff_45%,#cfc4ff_100%)] shadow-[0_12px_28px_-16px_rgb(11_58_156/0.4)]"
        aria-hidden
      />
      <span className="absolute size-[88%] animate-spin-slower rounded-full border border-dashed border-brand/55 motion-reduce:animate-none" aria-hidden />
      <span className="absolute size-[72%] animate-spin-slow rounded-full border border-dashed border-iris/60 motion-reduce:animate-none" aria-hidden />
      <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-brand/45 motion-reduce:animate-none" aria-hidden />

      <div className="relative z-[1] grid size-[4.25rem] place-items-center overflow-hidden rounded-full bg-white p-1.5 shadow-[0_10px_22px_-12px_rgb(11_58_156/0.4)] ring-2 ring-white">
        <Mark className="size-[3.1rem]" glow />
      </div>

      <span className="absolute top-1 right-0 z-[2] rounded-full bg-[linear-gradient(135deg,#6f4bf2,#1a63d8)] px-1.5 py-px text-[9px] font-semibold tracking-[0.12em] text-white shadow-[0_6px_14px_-6px_rgb(111_75_242/0.9)]">
        AI
      </span>
    </div>
  )
}

function UnifiedPanel() {
  const { copy } = useLocale()
  const p1 = copy.diagram.p1

  const channels: { icon: ReactNode; title: string; meta?: string; accent: string; marks?: ChannelKey[] }[] = [
    {
      icon: <ChannelMark kind="whatsapp" className="size-5" glyphClassName="size-2.5" rounded="rounded-md" />,
      title: p1.messaging,
      accent: '#E1306C',
      marks: ['whatsapp', 'instagram', 'email'],
    },
    {
      icon: <ChannelMark kind="voice" className="size-5" glyphClassName="size-2.5" rounded="rounded-md" />,
      title: p1.voice,
      meta: p1.voiceMeta,
      accent: '#34C759',
    },
    {
      icon: <ChannelMark kind="web" className="size-5" glyphClassName="size-2.5" rounded="rounded-md" />,
      title: p1.web,
      meta: p1.webMeta,
      accent: '#0084FF',
    },
  ]

  const outcomes = [
    { accent: '#6F4BF2', icon: <Calendar className="size-3.5" />, title: p1.bookings, note: p1.booked },
    { accent: '#F59E0B', icon: <Clock className="size-3.5" />, title: p1.appointments, note: p1.scheduled },
    { accent: '#0E9A9E', icon: <Bell className="size-3.5" />, title: p1.reminders, note: p1.sent },
  ]

  return (
    <Panel
      n="1"
      title={p1.title}
      sub={p1.sub}
      tone="blue"
    >
      <div className="relative flex flex-1 flex-col gap-2.5">
        <span
          className="pointer-events-none absolute inset-x-2 top-2 bottom-6 rounded-[40%] bg-[radial-gradient(ellipse_at_50%_40%,rgb(167_139_250/0.14),transparent_70%)] blur-lg"
          aria-hidden
        />

        <div className="relative z-[1] flex justify-center">
          <AiCore />
        </div>

        <div className="relative z-[1] grid grid-cols-2 gap-1.5">
          <div className="flex min-w-0 flex-col gap-1.5">
            {channels.map((c) => (
              <MiniCard key={c.title} icon={c.icon} title={c.title} note={c.meta} accent={c.accent}>
                {c.marks && (
                  <div className="mt-1 flex min-w-0 items-center gap-1 pl-[1.875rem]">
                    {c.marks.map((kind) => (
                      <ChannelMark
                        key={kind}
                        kind={kind}
                        className="size-3.5 shrink-0 rounded-[3px] shadow-none"
                        glyphClassName="size-2"
                      />
                    ))}
                    <span className="min-w-0 truncate text-[9.5px] leading-none text-faint">{p1.messagingMeta}</span>
                  </div>
                )}
              </MiniCard>
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            {outcomes.map((o) => (
              <MiniCard key={o.title} accent={o.accent} icon={o.icon} title={o.title} note={o.note} check />
            ))}
          </div>
        </div>

        <p className="relative z-[1] mt-auto border-t border-white/70 pt-2 text-center text-[10.5px] font-medium text-ink-2">
          {p1.footer}
        </p>
      </div>
    </Panel>
  )
}

/* --------------------------------------------------------------- panel 2 */

function Hub() {
  return (
    <div className="relative mx-auto grid size-[72px] place-items-center">
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#e4d8ff,#d4eaff)]" aria-hidden />
      <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-iris/70" aria-hidden />
      <span className="absolute -inset-1 animate-pulse-ring rounded-full border border-brand/50 [animation-delay:1.1s]" aria-hidden />
      <span className="absolute inset-1.5 animate-spin-slow rounded-full border border-dashed border-iris/65" aria-hidden />
      <span className="relative grid size-10 place-items-center rounded-full bg-[linear-gradient(140deg,#6f4bf2,#1a63d8)] text-white shadow-[0_12px_24px_-12px_rgb(111_75_242/0.8)]">
        <Brain className="size-5" aria-hidden />
      </span>
    </div>
  )
}

function ConnectedPanel() {
  const { copy } = useLocale()
  const p2 = copy.diagram.p2

  return (
    <Panel
      n="2"
      title={p2.title}
      sub={p2.sub}
      tone="iris"
    >
      <div className="relative flex min-w-0 flex-1 flex-col gap-2">
        <div className="relative z-[1] flex justify-center py-0.5">
          <Hub />
        </div>

        <div className="relative z-[1] grid grid-cols-2 gap-1.5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <MiniCard icon={<Calendar className="size-3.5" />} title={p2.bookings} note={p2.bookingsNote}>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Sparkles className="size-3.5" />} title={p2.sentiment} note={p2.sentimentNote}>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <MiniCard icon={<MessageSquare className="size-3.5" />} title={p2.chats} note={p2.chatsNote}>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Users className="size-3.5" />} title={p2.history} note={p2.historyNote}>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Bell className="size-3.5" />} title={p2.escalations} note={p2.escalationsNote}>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
          </div>
        </div>

        <div className="relative z-[1] flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-full bg-[linear-gradient(100deg,#6f4bf2,#3f5ce4)] px-2.5 py-1 text-center text-white shadow-[0_10px_22px_-12px_rgb(111_75_242/0.85)]">
          <Clock className="size-3 shrink-0" aria-hidden />
          <span className="text-[13px] leading-none font-semibold tabular-nums">1–4</span>
          <span className="text-[10px] leading-tight">{p2.reply}</span>
        </div>

        <div className="relative z-[1] mt-auto rounded-[12px] border border-white/90 bg-white/80 p-2">
          <p className="caps text-[9px] tracking-[0.08em] text-brand">{p2.systems}</p>
          <div className="mt-1 grid grid-cols-3 gap-1">
            {[
              { name: 'OPERA', sub: 'PMS', icon: <Database className="size-3" /> },
              { name: 'F&B', sub: 'Symphony', icon: <ChartColumn className="size-3" /> },
              { name: 'ERP', sub: 'Ops', icon: <Zap className="size-3" /> },
            ].map((s) => (
              <div key={s.name} className="flex min-w-0 items-center gap-1 rounded-[8px] border border-line bg-white px-1 py-1">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-iris-soft text-iris">{s.icon}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[9.5px] leading-tight font-semibold text-ink">{s.name}</span>
                  <span className="block truncate text-[8.5px] leading-tight text-faint">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

/* --------------------------------------------------------------- panel 3 */

function FlowCard({ icon, title, note }: { icon: ReactNode; title: string; note: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-[10px] border border-white bg-white/95 px-1.5 py-1.5 text-center shadow-[0_8px_18px_-16px_rgb(9_30_74/0.45)]">
      <span className="grid size-6 place-items-center rounded-full bg-teal-soft text-teal">{icon}</span>
      <p className="mt-1 line-clamp-2 text-[10px] leading-tight font-semibold text-ink">{title}</p>
      <p className="mt-0.5 line-clamp-2 text-[8.5px] leading-snug text-faint">{note}</p>
    </div>
  )
}

function RoleCard({
  title,
  metric,
  delta,
  children,
  accent,
}: {
  title: string
  metric: string
  delta: string
  accent: string
  children: ReactNode
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[10px] border border-white bg-white/95 p-1.5 shadow-[0_8px_18px_-16px_rgb(9_30_74/0.45)]">
      <p className="truncate text-[8.5px] leading-tight font-semibold" style={{ color: accent }}>{title}</p>
      <p className="mt-0.5 text-[13px] leading-none font-semibold text-ink tabular-nums">{metric}</p>
      <p className="mt-0.5 text-[8px] leading-tight text-success">▲ {delta}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function SavedPanel() {
  const { copy } = useLocale()
  const p3 = copy.diagram.p3

  return (
    <Panel
      n="3"
      title={p3.title}
      sub={p3.sub}
      tone="teal"
    >
      <div className="grid grid-cols-3 gap-1">
        <FlowCard icon={<Database className="size-3.5" />} title={p3.storage} note={p3.storageNote} />
        <FlowCard icon={<Brain className="size-3.5" />} title={p3.analytics} note={p3.analyticsNote} />
        <FlowCard icon={<TrendingUp className="size-3.5" />} title={p3.reports} note={p3.reportsNote} />
      </div>

      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <RoleCard title={p3.owner} metric="$24,850" delta="12%" accent="#0b3a9c">
          <div className="flex h-4 items-end gap-[2px]" aria-hidden>
            {[0.3, 0.45, 0.35, 0.6, 0.5, 0.8, 1].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </RoleCard>
        <RoleCard title={p3.manager} metric="96%" delta="4%" accent="#6f4bf2">
          <div className="flex items-center gap-1">
            <span
              className="grid size-6 place-items-center rounded-full text-[7px] font-semibold text-iris"
              style={{ background: 'conic-gradient(#6f4bf2 0 88%, #ece6ff 88% 100%)' }}
              aria-hidden
            >
              <span className="grid size-4 place-items-center rounded-full bg-white">88</span>
            </span>
            <span className="text-[8px] leading-tight text-faint">Satisfaction</span>
          </div>
        </RoleCard>
        <RoleCard title={p3.ops} metric="248" delta="6%" accent="#0e9a9e">
          <svg viewBox="0 0 60 16" className="w-full" aria-hidden>
            <path d="M1 13 L10 9 L19 11 L28 5 L37 8 L46 3 L59 4" fill="none" stroke="#14b5b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </RoleCard>
        <RoleCard title={p3.marketing} metric="8.4%" delta="2.1%" accent="#c2410c">
          <div className="flex h-4 items-end gap-[2px]" aria-hidden>
            {[0.25, 0.4, 0.35, 0.55, 0.7, 1].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-[#f59e0b]/60" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </RoleCard>
      </div>

      <div className="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-teal-soft/80 px-2.5 py-1">
        <Lightbulb className="size-3 text-teal" aria-hidden />
        <p className="text-[10px] font-medium text-teal-deep">{p3.footer}</p>
      </div>
    </Panel>
  )
}

/* ------------------------------------------------------------------ export */

const FEATURE_ICONS = [
  <MessageSquare className="size-4" key="msg" />,
  <Zap className="size-4" key="zap" />,
  <ChartColumn className="size-4" key="chart" />,
  <Sparkles className="size-4" key="spark" />,
]

export function Diagram() {
  const { copy } = useLocale()
  const d = copy.diagram
  const features = d.features.map((label, i) => ({
    icon: FEATURE_ICONS[i],
    label,
  }))

  return (
    <section id="how-it-works" className="relative mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:py-12">
      <Reveal className="flex flex-col items-center text-center">
        <span className="caps inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-brand">
          <Sparkles className="size-3" aria-hidden />
          {d.eyebrow}
        </span>
        <h2 className="display mt-4 text-[clamp(1.6rem,1rem+2.6vw,2.8rem)] text-ink">
          {d.titleBefore} <span className="rainbow-text">{d.titleAccent}</span>
        </h2>
        <p className="mt-2 max-w-xl text-[0.95rem] text-muted">
          {d.body}
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-2">
        <Reveal delay={0.05} className="min-w-0">
          <UnifiedPanel />
        </Reveal>
        <StepBridge />
        <StepBridge horizontal />
        <Reveal delay={0.15} className="min-w-0">
          <ConnectedPanel />
        </Reveal>
        <StepBridge />
        <StepBridge horizontal />
        <Reveal delay={0.25} className="min-w-0">
          <SavedPanel />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-4">
          {features.map((f, i) => (
            <li key={f.label} className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
                <span className="text-brand">{f.icon}</span>
                {f.label}
              </span>
              {i < features.length - 1 && <span className="hidden h-3.5 w-px bg-line-strong sm:block" aria-hidden />}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15} className="mt-5 flex justify-center">
        <Link
          to="/demo"
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-brand transition-colors hover:text-brand-deep"
        >
          {d.cta}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </Reveal>
    </section>
  )
}
