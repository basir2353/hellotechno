import { IconWhatsApp } from './Social'
import { SITE } from '../data'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'

/**
 * Site WhatsApp FAB, stacked above the official HeyServo launcher
 * (HeyServo sits at bottom: 24px / right: 24px, 56px tall).
 */
export function FloatingActions() {
  const { copy } = useLocale()

  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${copy.navUi.chatWhatsApp} ${SITE.phone}`}
      className={cx(
        'fixed z-[54] grid size-14 place-items-center rounded-full bg-[#25D366] text-white',
        // Match HeyServo launcher: right/left 24px, stacked above 56px FAB + gap
        'end-6 bottom-[5.75rem] sm:bottom-[6.25rem]',
        'shadow-[0_10px_24px_-6px_rgba(15,23,42,0.32),0_2px_6px_rgba(15,23,42,0.12)]',
        'transition-[transform,box-shadow] duration-[var(--duration-fast)] active:scale-[0.97]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand',
      )}
    >
      <IconWhatsApp className="size-[1.65rem]" />
    </a>
  )
}
