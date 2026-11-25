import type { ReactNode, SVGProps } from 'react'

import { cx } from '../lib/cx'

export type ChannelKey = 'whatsapp' | 'voice' | 'web' | 'sms' | 'instagram' | 'email'

type SvgProps = SVGProps<SVGSVGElement>

/** Official WhatsApp glyph (Meta). */
export function IconWhatsApp({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

/** Official Instagram glyph (Meta). */
export function IconInstagram({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  )
}

/** Official multicolor Gmail mark. */
export function IconGmail({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...props}>
      <path fill="#4285F4" d="M1.8 5.4v13.2A1.8 1.8 0 0 0 3.6 20.4H7.2V9.36L1.8 5.4Z" />
      <path fill="#34A853" d="M22.2 5.4v13.2a1.8 1.8 0 0 1-1.8 1.8H16.8V9.36l5.4-3.96Z" />
      <path fill="#FBBC04" d="M7.2 20.4h9.6V9.36l-4.8 3.48-4.8-3.48V20.4Z" />
      <path fill="#EA4335" d="M1.8 5.4 12 12.72 22.2 5.4 19.8 3.6 12 9.48 4.2 3.6 1.8 5.4Z" />
    </svg>
  )
}

/** iOS Phone app handset. */
export function IconPhone({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" {...props}>
      <path d="M15.05 14.95c-.4-.2-.85-.1-1.15.2l-1.45 1.45a12.3 12.3 0 0 1-5.05-5.05l1.45-1.45c.3-.3.4-.75.2-1.15l-1.7-3.7A1.1 1.1 0 0 0 6.2 4.5H4.4A1.9 1.9 0 0 0 2.5 6.5C2.5 14.23 9.77 21.5 17.5 21.5a1.9 1.9 0 0 0 2-1.9v-1.8a1.1 1.1 0 0 0-.75-1.05l-3.7-1.8Z" />
    </svg>
  )
}

/** Apple Messages / iMessage bubble. */
export function IconSms({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" {...props}>
      <path d="M12 2.5c5.25 0 9.5 3.47 9.5 7.75S17.25 18 12 18c-.7 0-1.38-.06-2.03-.18l-3.72 2.05a.85.85 0 0 1-1.25-.84l.35-2.72C3.7 15.1 2.5 13.3 2.5 10.25 2.5 5.97 6.75 2.5 12 2.5Z" />
    </svg>
  )
}

/** Facebook Messenger glyph (web chat). */
export function IconMessenger({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor" {...props}>
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.92 1.43 5.52 3.66 7.22V22l3.36-1.85c.94.26 1.94.4 2.98.4 5.64 0 10.2-4.13 10.2-9.85C22.2 6.13 17.64 2 12 2Zm1.02 13.25-2.6-2.78-5.08 2.78 5.58-5.92 2.66 2.78 5.02-2.78-5.58 5.92Z" />
    </svg>
  )
}

type Brand = {
  label: string
  color: string
  tile: string
  nativeColors?: boolean
  glyph: (props: { className?: string }) => ReactNode
}

export const BRANDS: Record<ChannelKey, Brand> = {
  whatsapp: {
    label: 'WhatsApp',
    color: '#25D366',
    tile: '#25D366',
    glyph: ({ className }) => <IconWhatsApp className={className} />,
  },
  voice: {
    label: 'Voice / Call',
    color: '#34C759',
    tile: 'linear-gradient(160deg,#5BE07A 0%,#34C759 55%,#28A745 100%)',
    glyph: ({ className }) => <IconPhone className={className} />,
  },
  web: {
    label: 'Web chat',
    color: '#0084FF',
    tile: 'linear-gradient(135deg,#00C6FF 0%,#0084FF 48%,#A033FF 100%)',
    glyph: ({ className }) => <IconMessenger className={className} />,
  },
  sms: {
    label: 'SMS',
    color: '#34C759',
    tile: 'linear-gradient(160deg,#6EE7A0 0%,#34C759 100%)',
    glyph: ({ className }) => <IconSms className={className} />,
  },
  instagram: {
    label: 'Instagram',
    color: '#E1306C',
    tile: 'linear-gradient(45deg,#f9ce34 0%,#ee2a7b 45%,#6228d7 100%)',
    glyph: ({ className }) => <IconInstagram className={className} />,
  },
  email: {
    label: 'Gmail',
    color: '#EA4335',
    tile: '#FFFFFF',
    nativeColors: true,
    glyph: ({ className }) => <IconGmail className={className} />,
  },
}

export function brandColor(kind: ChannelKey) {
  return BRANDS[kind].color
}

/** A brand-coloured tile holding the real platform mark. */
export function ChannelMark({
  kind,
  className,
  glyphClassName,
  tone = 'solid',
  rounded = 'rounded-[10px]',
}: {
  kind: ChannelKey
  className?: string
  glyphClassName?: string
  tone?: 'solid' | 'soft'
  rounded?: string
}) {
  const brand = BRANDS[kind]
  const Glyph = brand.glyph
  const glyphCls = cx('size-4', glyphClassName)

  if (tone === 'soft') {
    return (
      <span
        className={cx('grid shrink-0 place-items-center', rounded, className)}
        style={{
          background: brand.nativeColors ? '#fff' : `${brand.color}18`,
          color: brand.nativeColors ? undefined : brand.color,
          boxShadow: brand.nativeColors ? 'inset 0 0 0 1px rgb(9 30 74 / 0.08)' : undefined,
        }}
      >
        <Glyph className={glyphCls} />
      </span>
    )
  }

  return (
    <span
      className={cx(
        'grid shrink-0 place-items-center shadow-[0_10px_20px_-12px_rgb(9_30_74/0.65)]',
        rounded,
        className,
      )}
      style={{
        background: brand.tile,
        color: brand.nativeColors ? undefined : '#fff',
        boxShadow: brand.nativeColors
          ? '0 10px 20px -12px rgb(9 30 74 / 0.45), inset 0 0 0 1px rgb(9 30 74 / 0.1)'
          : undefined,
      }}
    >
      <Glyph className={cx(glyphCls, !brand.nativeColors && 'text-white')} />
    </span>
  )
}

/** The six channels Hello Techno answers on — used everywhere social icons appear. */
export const SOCIALS: ChannelKey[] = ['whatsapp', 'voice', 'web', 'sms', 'instagram', 'email']

/** A row of platform marks with their names available to assistive tech. */
export function SocialRow({
  kinds = SOCIALS,
  className,
  itemClassName,
  label = 'Channels we answer on',
  showLabels = false,
}: {
  kinds?: ChannelKey[]
  className?: string
  itemClassName?: string
  label?: string
  showLabels?: boolean
}) {
  return (
    <ul className={cx('flex flex-wrap items-center gap-2', className)} aria-label={label}>
      {kinds.map((kind) => {
        const brand = BRANDS[kind]
        return (
          <li key={kind} title={brand.label} className={cx(showLabels && 'flex items-center gap-2')}>
            <span className="sr-only">{brand.label}</span>
            <span className="inline-grid transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:scale-110">
              <ChannelMark kind={kind} className={cx('size-9', itemClassName)} glyphClassName="size-[55%]" rounded="rounded-full" />
            </span>
            {showLabels && <span className="text-[13px] font-medium text-ink-2">{brand.label}</span>}
          </li>
        )
      })}
    </ul>
  )
}
