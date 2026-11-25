import Image from '../next-image'
import Link from '../next-link'
import { CalendlyEmbed } from '../../components/CalendlyEmbed'
import { IconChat, IconPhone, IconWhatsApp } from './Icons'
import { useLocale } from '../lib/locale'
import { brand, images, routes } from '../lib/site'

export function Cta() {
  const { t, locale } = useLocale()
  const en = locale === 'en'

  return (
    <section id="book-meeting" className="cta-section">
      <div className="shell">
        <div className="cta-layout">
          <div className="cta-copy">
            <span className="pill pill-purple">{t.cta.eyebrow}</span>
            <h2 className="type-h2 mt-5 max-w-xl">{t.cta.title}</h2>
            <p className="type-lead mt-4 max-w-xl">{t.cta.body}</p>
            <p className="mt-4 text-[0.875rem] font-medium text-[var(--muted)]">{t.cta.meta}</p>
            <p className="mt-5 text-[0.9375rem] text-[var(--ink)]">
              {t.cta.ready}{' '}
              <Link href={routes.trial} className="font-semibold text-[var(--primary)] hover:underline">
                {t.cta.trial}
              </Link>
            </p>

            <div className="cta-bento" aria-hidden={false}>
              <div className="cta-bento-tall">
                <Image
                  src={images.team}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 50vw, 220px"
                />
              </div>

              <div className="cta-bento-chat">
                <p className="cta-bento-chat-bubble" dir="rtl">
                  {t.cta.chatSample}
                </p>
                <span className="cta-bento-chat-btn" dir="rtl">
                  {t.cta.chatAction}
                </span>
              </div>

              <div className="cta-bento-stat">
                <p className="text-[2rem] font-semibold leading-none text-[var(--primary-deep)]">24/7</p>
                <p className="mt-2 text-[0.78rem] font-medium leading-snug text-[var(--primary-deep)]/80">
                  {t.cta.alwaysOn}
                </p>
              </div>

              <div className="cta-bento-channels">
                <span className="cta-channel cta-channel-wa" aria-hidden>
                  <IconWhatsApp className="h-4 w-4" />
                </span>
                <Link
                  href={routes.demo}
                  className="cta-channel bg-[var(--primary)]"
                  aria-label={en ? 'Demo chat' : 'دردشة العرض'}
                >
                  <IconChat className="h-4 w-4" />
                </Link>
                <a
                  href={routes.talk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-channel bg-[#3730a3]"
                  aria-label={en ? 'Contact' : 'تواصل'}
                >
                  <IconPhone className="h-4 w-4" />
                </a>
              </div>

              <div className="cta-bento-wide">
                <Image
                  src={images.dashboard}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 50vw, 280px"
                />
              </div>
            </div>
          </div>

          <div className="cta-calendar-card">
            <div className="cta-calendar-promo">
              {t.cta.promo}{' '}
              <span className="font-semibold text-[var(--primary)]">{t.cta.promoAccent}</span>
            </div>

            <div className="cta-calendar-body p-3 sm:p-4">
              <CalendlyEmbed height={650} />
              <p className="mt-3 text-center text-[0.8rem] leading-relaxed text-[var(--soft)]">
                {t.cta.fallback}{' '}
                <a className="font-semibold text-[var(--primary)]" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>{' '}
                {t.cta.fallbackEnd}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
