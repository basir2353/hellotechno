import { cx } from '../lib/cx'

/** Official Hello Techno mark asset (transparent PNG). */
export const LOGO_SRC = '/images/hello-techno-mark.png'

/**
 * Hello Techno mark — brain + waveform + handset (uploaded brand icon).
 */
export function Mark({ className, glow = false }: { className?: string; glow?: boolean }) {
  return (
    <span className={cx('relative inline-grid shrink-0 place-items-center', className)}>
      {glow && (
        <span
          className="pointer-events-none absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.5),transparent_70%)] blur-md"
          aria-hidden
        />
      )}
      <img
        src={LOGO_SRC}
        alt=""
        width={120}
        height={120}
        className="relative size-full object-contain bg-transparent"
        decoding="async"
      />
    </span>
  )
}

/** Clear, readable wordmark — Hello / Techno stacked. */
export function Wordmark({
  className,
  size = 'md',
  light = false,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}) {
  return (
    <span
      className={cx(
        'flex flex-col leading-[0.95]',
        size === 'sm' && 'text-[1.05rem]',
        size === 'md' && 'text-[1.35rem]',
        size === 'lg' && 'text-[1.95rem]',
        className,
      )}
    >
      <span
        className={cx(
          'font-[family-name:var(--font-display)] font-semibold tracking-[-0.04em]',
          light
            ? 'text-white drop-shadow-[0_1px_8px_rgb(0_0_0/0.25)]'
            : 'bg-[linear-gradient(100deg,#0b3a9c,#1a63d8_55%,#2563eb)] bg-clip-text text-transparent',
        )}
        aria-hidden
      >
        Hello
      </span>
      <span
        className={cx(
          'mt-[0.08em] font-[family-name:var(--font-display)] text-[0.82em] font-semibold tracking-[-0.02em]',
          light ? 'text-[#7DE8E2]' : 'text-teal',
        )}
        aria-hidden
      >
        Techno
      </span>
      <span className="sr-only">Hello Techno</span>
    </span>
  )
}

/**
 * Site brand — mark icon + Hello Techno wordmark.
 */
export function Brand({
  size = 'md',
  light = false,
  className,
  onDarkPlate = false,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  light?: boolean
  className?: string
  onDarkPlate?: boolean
}) {
  const lockup = (
    <BrandLockup
      size={size === 'xs' ? 'sm' : size}
      light={onDarkPlate ? false : light}
      className={!onDarkPlate ? className : undefined}
      compact={size === 'xs'}
    />
  )

  if (onDarkPlate) {
    return (
      <span
        className={cx(
          'inline-flex items-center rounded-2xl bg-white shadow-[0_10px_24px_-18px_rgb(9_30_74/0.45)]',
          size === 'xs' ? 'px-2 py-1.5' : 'px-2.5 py-1.5',
          className,
        )}
      >
        {lockup}
      </span>
    )
  }

  return lockup
}

export function BrandLockup({
  className,
  size = 'md',
  light = false,
  compact = false,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  compact?: boolean
}) {
  const markClass =
    size === 'lg' ? 'size-[3.25rem]' : size === 'md' ? 'size-11' : compact ? 'size-8' : 'size-10'

  return (
    <span className={cx('inline-flex items-center', compact ? 'gap-2' : 'gap-2.5', className)}>
      <Mark className={cx(markClass, 'drop-shadow-[0_8px_16px_rgb(11_58_156/0.22)]')} glow={size === 'lg'} />
      <Wordmark size={size} light={light} />
    </span>
  )
}
