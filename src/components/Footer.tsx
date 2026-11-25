import { ArrowUp, MapPin } from 'lucide-react'
import { Link } from 'react-router'

import { SITE } from '../data'
import { useLocale } from '../lib/locale'
import { Brand } from './Logo'
import { ChannelMark, SocialRow } from './Social'
import { Reveal } from './Ui'

export function Footer() {
  const { copy } = useLocale()

  return (
    <footer className="on-dark relative overflow-hidden bg-night px-4 pt-16 pb-8 text-white sm:px-6">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1a63d8 0%, #6f4bf2 45%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1320px]">
        <Reveal className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Brand size="lg" light onDarkPlate />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-night-muted">{copy.footer.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {copy.footer.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[12px] text-white/80"
                  style={{ borderColor: 'rgb(255 255 255 / 0.18)', background: 'rgb(255 255 255 / 0.05)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <p className="caps text-[10px] text-white/40">{copy.footer.answersWhere}</p>
              <SocialRow className="mt-3 gap-2" itemClassName="size-9" label={copy.footer.answersWhere} />
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="caps text-white/45">{copy.footer.sections}</p>
            <ul className="mt-4 space-y-2.5">
              {copy.nav.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} className="text-[14.5px] text-white/80 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-[14.5px] text-white/80 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="caps text-white/45">{copy.footer.talkSales}</p>
            <ul className="mt-4 space-y-3 text-[14.5px]">
              <li>
                <a href={`mailto:${SITE.email}`} className="group flex items-center gap-2.5 text-white/85 transition-colors hover:text-white">
                  <ChannelMark kind="email" className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="group flex items-center gap-2.5 text-white/85 transition-colors hover:text-white">
                  <ChannelMark kind="voice" className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${copy.navUi.chatWhatsApp} ${SITE.phone}`}
                  className="group flex items-center gap-2.5 text-white/85 transition-colors hover:text-white"
                >
                  <ChannelMark kind="whatsapp" className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                  WhatsApp · {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/70">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/70">
                  <MapPin className="size-3.5" aria-hidden />
                </span>
                {SITE.location}
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col-reverse items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-white/45">
            © {new Date().getFullYear()} {SITE.brand}. {copy.footer.rights}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-[12.5px] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            {copy.footer.backTop}
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </footer>
  )
}
