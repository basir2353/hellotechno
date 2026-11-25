import { Check, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { useLocale } from '../lib/locale'
import { cx } from '../lib/cx'
import { Mark } from './Logo'
import { ChannelMark, SOCIALS, type ChannelKey } from './Social'
import { PulseDot } from './Ui'

const INNER: ChannelKey[] = ['whatsapp', 'voice', 'instagram']
const OUTER: ChannelKey[] = ['web', 'sms', 'email']

const TOASTS_EN = [
  { channel: 'whatsapp' as const, text: 'New WhatsApp inquiry' },
  { channel: 'voice' as const, text: 'Call answered · 2 rings' },
  { channel: 'instagram' as const, text: 'DM replied in 3s' },
  { channel: 'email' as const, text: 'Booking held · OPERA' },
]

const TOASTS_AR = [
  { channel: 'whatsapp' as const, text: 'استفسار واتساب جديد' },
  { channel: 'voice' as const, text: 'مكالمة رُدت · رنتان' },
  { channel: 'instagram' as const, text: 'رد على الرسالة خلال 3ث' },
  { channel: 'email' as const, text: 'حجز محفوظ · OPERA' },
]

function OrbitRing({
  channels,
  radius,
  duration,
  reverse = false,
  size = 'md',
}: {
  channels: ChannelKey[]
  radius: number
  duration: number
  reverse?: boolean
  size?: 'sm' | 'md'
}) {
  const count = channels.length
  return (
    <div
      className={cx('absolute inset-0 motion-reduce:animate-none', reverse ? 'orbit-reverse' : 'orbit')}
      style={{ animationDuration: `${duration}s` }}
      aria-hidden
    >
      {channels.map((kind, i) => {
        const angle = (360 / count) * i - 90
        const rad = (angle * Math.PI) / 180
        const mark = size === 'sm' ? 'size-8 sm:size-9' : 'size-9 sm:size-10 lg:size-11'
        const glyph = size === 'sm' ? 'size-3.5 sm:size-4' : 'size-4 lg:size-5'
        return (
          <span
            key={kind}
            className="absolute"
            style={{
              left: `${50 + Math.cos(rad) * radius}%`,
              top: `${50 + Math.sin(rad) * radius}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span
              className={cx('orbit-counter block motion-reduce:animate-none')}
              style={{ animationDuration: `${duration}s` }}
            >
              <ChannelMark
                kind={kind}
                className={cx(mark, 'shadow-[0_14px_28px_-12px_rgb(9_30_74/0.55)] ring-2 ring-white/90')}
                glyphClassName={glyph}
                rounded="rounded-full"
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}

/**
 * Hero visual — glowing AI hub with dual channel orbits and live toasts.
 */
export function HeroOrbit() {
  const { locale, copy } = useLocale()
  const toasts = locale === 'ar' ? TOASTS_AR : TOASTS_EN
  const [toastIdx, setToastIdx] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setToastIdx((n) => (n + 1) % toasts.length), 2800)
    return () => window.clearInterval(id)
  }, [toasts.length])

  const toast = toasts[toastIdx]
  const online = locale === 'ar' ? 'موظف ذكي · متصل' : 'AI Employee · online'
  const confirmed = locale === 'ar' ? 'تم تأكيد الحجز ✓' : 'Booking confirmed ✓'

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,360px)] sm:max-w-[460px] lg:max-w-[540px]">
      {/* Stage */}
      <div
        className="absolute inset-[2%] overflow-hidden rounded-[32px] border border-white/90 bg-[linear-gradient(165deg,#f7faff_0%,#eef3ff_42%,#f3efff_78%,#eafaf8_100%)] shadow-[var(--shadow-float)] sm:rounded-[40px]"
        aria-hidden
      >
        <span className="absolute -top-16 -left-10 size-48 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.42),transparent_70%)] blur-2xl" />
        <span className="absolute -right-12 top-10 size-44 rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.36),transparent_70%)] blur-2xl" />
        <span className="absolute bottom-0 left-1/3 size-52 rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.32),transparent_70%)] blur-2xl" />
        <span className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(rgb(26_99_216/0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <span className="pointer-events-none absolute inset-[24%] animate-pulse-ring rounded-full border-2 border-brand/45 motion-reduce:animate-none" aria-hidden />
      <span className="pointer-events-none absolute inset-[28%] animate-pulse-ring rounded-full border border-iris/50 motion-reduce:animate-none [animation-delay:1.2s]" aria-hidden />
      <span className="pointer-events-none absolute inset-[34%] rounded-full border border-brand/30 bg-[radial-gradient(circle_at_40%_35%,rgb(255_255_255/0.55),transparent_72%)]" aria-hidden />

      {/* Soft ambient glow behind core */}
      <div
        className="pointer-events-none absolute inset-[30%] rounded-full bg-[radial-gradient(circle,#9ec2ff,#b8a6ff_50%,transparent_70%)] blur-xl opacity-80"
        aria-hidden
      />

      {/* Dual orbits — the one intentional product motion on the page */}
      <div className="absolute inset-[8%]">
        <OrbitRing channels={OUTER} radius={46} duration={48} size="sm" />
        <OrbitRing channels={INNER} radius={30} duration={36} reverse size="md" />
      </div>

      {/* Brand core */}
      <div className="absolute inset-[36%] grid place-items-center sm:inset-[37%]">
        <div className="relative grid size-full place-items-center rounded-[28px] bg-white/95 p-3 shadow-[0_22px_48px_-22px_rgb(11_58_156/0.45)] ring-1 ring-white sm:rounded-[32px] sm:p-4">
          <Mark className="size-[72%] max-h-[7.5rem] drop-shadow-[0_12px_24px_rgb(11_58_156/0.28)]" glow />
          <span className="absolute -top-2 -end-2 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#6f4bf2,#1a63d8)] px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-white shadow-[0_10px_20px_-10px_rgb(111_75_242/0.9)]">
            <Sparkles className="size-2.5" aria-hidden />
            AI
          </span>
          <div className="absolute -bottom-1 flex items-end gap-[2px]" aria-hidden>
            {[0.35, 0.7, 0.45, 1, 0.55, 0.8, 0.4].map((h, i) => (
              <span
                key={i}
                className="w-[2.5px] origin-bottom rounded-full bg-[linear-gradient(180deg,#6f4bf2,#1a63d8)] opacity-70"
                style={{ height: `${h * 12}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Live toast */}
      <div className="absolute top-[7%] start-[6%] z-[2] w-[min(68%,13.5rem)] sm:start-[8%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={toast.text}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 rounded-[14px] border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-18px_rgb(9_30_74/0.5)] backdrop-blur-sm"
          >
            <ChannelMark kind={toast.channel} className="size-7 shrink-0" glyphClassName="size-3.5" rounded="rounded-full" />
            <span className="min-w-0 truncate text-[11.5px] font-medium text-ink-2">{toast.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Confirmed chip */}
      <div className="absolute top-[18%] end-[5%] z-[2] hidden items-center gap-1.5 rounded-full border border-white bg-white/95 px-2.5 py-1.5 text-[11px] font-medium text-success shadow-[0_12px_24px_-16px_rgb(9_30_74/0.45)] sm:flex">
        <Check className="size-3.5" aria-hidden />
        {confirmed}
      </div>

      <ul className="sr-only" aria-label={copy.hero.answersOn}>
        {SOCIALS.map((kind) => (
          <li key={kind}>{kind}</li>
        ))}
      </ul>

      {/* Status dock */}
      <div className="absolute bottom-[3%] left-1/2 z-[2] w-[min(90%,19rem)] -translate-x-1/2 rounded-[16px] border border-white bg-white/95 px-3 py-2.5 shadow-[0_20px_40px_-24px_rgb(9_30_74/0.55)] sm:w-[78%]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] font-medium text-ink sm:text-[12.5px]">
            <PulseDot className="size-1.5" />
            <span className="truncate">{online}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10.5px] font-medium text-success">
            <Check className="size-3" aria-hidden />
            {copy.chat.live}
          </span>
        </div>
      </div>
    </div>
  )
}
