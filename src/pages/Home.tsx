import { ArrowRight, ArrowUpRight, Check, Shield, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'

import { Mark } from '../components/Logo'

import { Diagram } from '../components/Diagram'
import { HeroOrbit } from '../components/HeroOrbit'
import { ChannelMark, SocialRow } from '../components/Social'
import { Accordion, Btn, CountUp, PulseDot, Reveal, SectionHead } from '../components/Ui'
import {
  CAPABILITIES,
  CHANNELS,
  INDUSTRIES,
  INTEGRATIONS,
  SITE,
} from '../data'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import '../raya/raya.css'
import { Pricing as RayaPricing } from '../raya/components/Pricing'

/* ------------------------------------------------------------------- hero */

function Hero() {
  const { copy } = useLocale()
  const titleParts = copy.hero.title.split('. ').filter(Boolean)

  return (
    <section className="relative overflow-hidden pt-24 pb-8 sm:pt-28 lg:pt-32 lg:pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,#000,transparent_72%)]" />
        <div className="absolute -top-32 -left-24 size-[min(100vw,520px)] animate-[float_11s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.38),transparent_65%)] blur-2xl motion-reduce:animate-none" />
        <div className="absolute -top-20 right-0 size-[min(90vw,460px)] animate-[float_14s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.34),transparent_65%)] blur-2xl motion-reduce:animate-none" />
        <div className="absolute bottom-0 left-1/3 size-[min(80vw,420px)] animate-[drift_16s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.3),transparent_65%)] blur-2xl motion-reduce:animate-none" />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <Reveal immediate variant="down" y={20}>
            <span className="caps inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pr-3.5 pl-2 text-brand">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
                <Sparkles className="size-3 animate-[bob_3.5s_ease-in-out_infinite]" aria-hidden />
              </span>
              <span className="truncate">{copy.hero.partnerEyebrow}</span>
            </span>
          </Reveal>

          <Reveal immediate delay={0.08} variant="up" y={28}>
            <h1 className="display mt-5 text-[clamp(2.05rem,1.05rem+4vw,4.6rem)] text-ink sm:mt-6">
              {titleParts.length === 3 ? (
                <>
                  {titleParts[0]}. <span className="rainbow-text">{titleParts[1]}.</span> {titleParts[2]}
                </>
              ) : (
                copy.hero.title
              )}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.14} variant="up" y={20}>
            <p className="mt-4 max-w-xl text-[clamp(1.05rem,0.98rem+0.4vw,1.3rem)] font-semibold tracking-[-0.02em] text-ink-2 sm:mt-5">
              {copy.hero.subhead}
            </p>
          </Reveal>

          <Reveal immediate delay={0.18} variant="up" y={18}>
            <p className="mt-3 max-w-xl text-[clamp(0.98rem,0.94rem+0.28vw,1.12rem)] leading-relaxed text-muted">
              {copy.hero.lead}
            </p>
          </Reveal>

          <Reveal immediate delay={0.22} variant="up" y={16}>
            <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-faint sm:text-[14.5px]">{copy.hero.body}</p>
          </Reveal>

          <Reveal immediate delay={0.26} variant="up" y={14}>
            <p className="mt-4 max-w-xl text-[15px] font-semibold tracking-[-0.02em] text-brand sm:text-[16px]">
              {copy.hero.tagline}
            </p>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted sm:text-[13.5px]">{copy.hero.closing}</p>
          </Reveal>

          <Reveal immediate delay={0.28} variant="scale" y={20}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              <Btn href="/demo" size="lg" className="max-sm:w-full" iconRight={<ArrowRight className="size-4 transition-transform duration-[var(--duration-base)] group-hover/btn:translate-x-0.5" aria-hidden />}>
                {copy.hero.primary}
              </Btn>
              <Btn href={SITE.phoneHref} variant="outline" size="lg" className="max-sm:min-w-0 max-sm:flex-1">
                <span className="flex items-center gap-2">
                  <ChannelMark kind="voice" className="size-6" glyphClassName="size-3" rounded="rounded-full" />
                  <span className="truncate">{SITE.phone}</span>
                </span>
              </Btn>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${copy.navUi.chatWhatsApp} ${SITE.phone}`}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-white/80 transition-[box-shadow,transform] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:size-14"
              >
                <ChannelMark kind="whatsapp" className="size-8 sm:size-9" glyphClassName="size-4 sm:size-5" rounded="rounded-full" />
              </a>
            </div>
          </Reveal>

          <Reveal immediate delay={0.34} variant="left" y={22}>
            <p className="mt-4 text-[12.5px] text-faint">
              {copy.hero.orEmail}{' '}
              <a href={`mailto:${SITE.email}`} className="font-medium text-brand underline decoration-brand/25 underline-offset-4 hover:decoration-brand">
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal immediate delay={0.4} variant="up" y={26}>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-6 sm:mt-9 sm:grid-cols-4 sm:gap-x-6">
              {copy.hero.proof.map((p) => (
                <div key={p.label} className="transition-transform duration-[var(--duration-base)] hover:-translate-y-0.5">
                  <dt className="text-[1.05rem] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[1.15rem]">{p.value}</dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-muted sm:text-[11.5px]">{p.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal immediate delay={0.46} variant="right" y={20}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="caps text-[10px] text-faint">{copy.hero.answersOn}</span>
              <SocialRow itemClassName="size-8" className="gap-1.5" label={copy.hero.answersOn} />
            </div>
          </Reveal>
        </div>

        <Reveal immediate delay={0.18} variant="scale" className="relative">
          <HeroOrbit />
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- channels */

function ChannelStrip() {
  const { copy } = useLocale()
  const channels = CHANNELS.map((c, i) => ({
    kind: c.kind,
    name: copy.channels[i]?.name ?? c.name,
    note: copy.channels[i]?.note ?? c.note,
  }))

  return (
    <section className="relative border-y border-line bg-white/70 py-8 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <Reveal variant="left" y={24} className="shrink-0">
            <p className="caps max-w-[16rem] text-muted">{copy.channelStrip.eyebrow}</p>
          </Reveal>
          <div className="marquee-mask flex-1 overflow-hidden">
            <ul className="flex w-max animate-marquee items-center gap-3 hover:[animation-play-state:paused]">
              {[...channels, ...channels].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= channels.length || undefined}
                  className="flex items-center gap-2.5 rounded-full border border-line bg-white px-3 py-2 whitespace-nowrap shadow-[0_8px_20px_-18px_rgb(9_30_74/0.5)] transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-16px_rgb(9_30_74/0.45)]"
                >
                  <ChannelMark kind={c.kind} className="size-7" glyphClassName="size-3.5" rounded="rounded-full" />
                  <span className="text-[13.5px] font-medium text-ink">{c.name}</span>
                  <span className="text-[11.5px] text-faint">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
          <span className="caps shrink-0 text-[10px] text-faint">{copy.channelStrip.connectsTo}</span>
          <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
            <ul className="flex w-max animate-marquee-slow items-center gap-2 hover:[animation-play-state:paused]">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={i >= INTEGRATIONS.length || undefined}
                  className="rounded-md bg-soft/70 px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap text-muted"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- capabilities */

function Platform() {
  const { copy } = useLocale()
  const capabilities = CAPABILITIES.map((c, i) => ({
    icon: c.icon,
    accent: c.accent,
    title: copy.capabilities[i]?.title ?? c.title,
    body: copy.capabilities[i]?.body ?? c.body,
    note: copy.capabilities[i]?.note ?? c.note,
  }))

  return (
    <section id="platform" className="relative overflow-hidden py-12 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_8%_0%,rgb(226_237_255/0.85),transparent_45%),radial-gradient(ellipse_at_92%_18%,rgb(236_230_255/0.55),transparent_42%),radial-gradient(ellipse_at_50%_100%,rgb(221_245_244/0.4),transparent_48%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-35" aria-hidden />
      <span
        className="pointer-events-none absolute top-24 -left-20 size-[22rem] animate-[drift_14s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.28),transparent_70%)] blur-2xl motion-reduce:animate-none"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-0 bottom-10 size-[18rem] animate-[float_12s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.24),transparent_70%)] blur-2xl motion-reduce:animate-none"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
          <Reveal variant="left" y={40} className="lg:sticky lg:top-28">
            <SectionHead
              align="left"
              eyebrow={copy.platform.eyebrow}
              accent="#1A63D8"
              title={<>{copy.platform.title}</>}
              body={copy.platform.body}
            />

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Btn href="/demo" variant="solid" iconRight={<ArrowRight className="size-4" aria-hidden />}>
                {copy.hero.primary}
              </Btn>
              <Btn href="#how-it-works" variant="ghost">
                {copy.platform.seePlatform}
              </Btn>
            </div>

            <div className="mt-8 overflow-hidden rounded-[22px] border border-[#cfe0fb] bg-[linear-gradient(155deg,#f8fbff,#eef4ff_60%,#f5f0ff)] p-4 shadow-[0_18px_40px_-32px_rgb(26_99_216/0.4)]">
              <p className="caps text-[10px] tracking-[0.1em] text-brand">{copy.channelStrip.eyebrow}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {INTEGRATIONS.slice(0, 8).map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-white/90 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-2 shadow-[0_6px_14px_-12px_rgb(9_30_74/0.35)]"
                  >
                    {name}
                  </span>
                ))}
                <span className="rounded-full border border-dashed border-brand/30 bg-white/50 px-2.5 py-1 text-[11px] font-medium text-brand">
                  +{INTEGRATIONS.length - 8}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((c, i) => {
              const wide = i === 0 || i === 3
              const variants = ['left', 'right', 'scale', 'up', 'up', 'right'] as const
              return (
                <Reveal
                  key={c.title}
                  delay={0.05 * i}
                  variant={variants[i % variants.length]}
                  y={32}
                  className={cx(wide && 'sm:col-span-2 lg:col-span-1')}
                >
                  <article
                    className={cx(
                      'group relative h-full overflow-hidden rounded-[22px] border border-white/90 bg-white/80 p-5 shadow-[0_14px_34px_-28px_rgb(9_30_74/0.35)] backdrop-blur-sm transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(9_30_74/0.45)]',
                      wide && 'sm:flex sm:items-start sm:gap-5 lg:block',
                    )}
                    style={{ borderColor: `${c.accent}22` }}
                  >
                    <span
                      className="pointer-events-none absolute -top-20 -right-14 size-40 rounded-full opacity-70 blur-2xl transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${c.accent}28, transparent 70%)` }}
                      aria-hidden
                    />
                    <span
                      className="absolute inset-y-4 start-0 w-[3px] rounded-full opacity-80"
                      style={{ background: `linear-gradient(180deg, ${c.accent}, transparent)` }}
                      aria-hidden
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <span
                        className="grid size-11 place-items-center rounded-[14px] shadow-[inset_0_1px_0_rgb(255_255_255/0.65)]"
                        style={{ background: `${c.accent}18`, color: c.accent }}
                      >
                        <c.icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-[11px] font-semibold tracking-[0.08em] text-faint tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className={cx('relative', wide ? 'sm:mt-0 lg:mt-4' : 'mt-4', wide && 'sm:flex-1 lg:flex-none')}>
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.025em] text-ink">{c.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
                      <p
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
                        style={{ background: `${c.accent}14`, color: c.accent }}
                      >
                        <Check className="size-3.5" aria-hidden />
                        {c.note}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- industries */

function Industries() {
  const { copy, locale } = useLocale()
  const [active, setActive] = useState(0)
  const industries = INDUSTRIES.map((item) => {
    const t = copy.industries.items.find((i) => i.key === item.key)
    return {
      key: item.key,
      icon: item.icon,
      accent: item.accent,
      tint: item.tint,
      name: t?.name ?? item.name,
      tagline: t?.tagline ?? item.tagline,
      pain: t?.pain ?? item.pain,
      win: t?.win ?? item.win,
      uses: t?.uses ?? item.uses,
    }
  })
  const industry = industries[active]

  return (
    <section id="industries" className="relative overflow-hidden bg-white/60 py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <Reveal variant="up" y={28}>
          <SectionHead
            eyebrow={copy.industries.eyebrow}
            accent="#6F4BF2"
            title={<>{copy.industries.title}</>}
            body={copy.industries.body}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="hide-scrollbar mt-9 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 touch-pan-x sm:mx-0 sm:px-0"
            role="tablist"
            aria-label={copy.industries.eyebrow}
          >
            {industries.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cx(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2.5 text-[13px] font-medium transition-[background-color,color,border-color,box-shadow] duration-[var(--duration-fast)] sm:px-4 sm:text-[13.5px]',
                  active === i
                    ? 'border-transparent text-white shadow-[0_14px_30px_-18px_rgb(9_30_74/0.55)]'
                    : 'bg-white/70',
                )}
                style={
                  active === i
                    ? { background: item.accent }
                    : { borderColor: `${item.accent}44`, color: item.accent }
                }
              >
                <item.icon className="size-4" aria-hidden />
                {item.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-6 min-h-0 lg:min-h-[26rem]">
          <div key={industry.key} className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
              <div
                className="flex flex-col justify-between rounded-[26px] border border-line p-6 sm:p-8"
                style={{ background: `linear-gradient(160deg,#ffffff,${industry.tint})` }}
              >
                <div>
                  <p className="caps" style={{ color: industry.accent }}>{industry.tagline}</p>
                  <h3 className="display mt-3 text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] text-ink">{industry.name}</h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="caps text-[10px] text-faint">{copy.industries.pain}</p>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{industry.pain}</p>
                    </div>
                    <div>
                      <p className="caps text-[10px]" style={{ color: industry.accent }}>{copy.industries.win}</p>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{industry.win}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Btn href="/demo" variant="outline" size="md">
                    {copy.industries.seeOp}
                  </Btn>
                  <Link
                    to="/industries"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#5457e6] hover:underline"
                  >
                    {locale === 'ar' ? 'تصفح جميع القطاعات (15)' : 'Browse all 15 industries'}
                    <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {industry.uses.map((use, i) => (
                  <article
                    key={use.title}
                    className={cx(
                      'group relative overflow-hidden rounded-[22px] border border-line bg-white p-5',
                      i === 0 && 'sm:col-span-2',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-[1rem] font-semibold tracking-[-0.02em] text-ink">{use.title}</h4>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-muted">{use.body}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                      {['Voice', 'WhatsApp', 'Web'].map((channel) => (
                        <span
                          key={channel}
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                          style={{ background: `${industry.accent}14`, color: industry.accent }}
                        >
                          {channel}
                        </span>
                      ))}
                      <span className="ml-auto flex items-center gap-1.5 text-[11.5px] font-medium text-success">
                        <PulseDot className="size-1.5" />
                        {use.result}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- results */

function Results() {
  const { copy } = useLocale()
  const accents = ['#25D366', '#8B7CFF', '#F59E0B', '#45D4E8'] as const

  return (
    <section id="results" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <div className="on-dark relative overflow-hidden rounded-[24px] bg-night px-5 py-10 text-white sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -top-32 -right-24 size-[min(100vw,560px)] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, #1a63d8 0%, #6f4bf2 45%, transparent 72%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 size-[min(90vw,480px)] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0e9a9e 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative flex flex-col gap-10">
          <Reveal variant="scale" y={24}>
            <SectionHead
              align="center"
              tone="light"
              eyebrow={copy.results.eyebrow}
              title={copy.results.title}
              body={copy.results.body}
              className="mx-auto max-w-3xl"
            />
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {copy.results.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[12px] text-white/80"
                >
                  <Shield className="size-3.5" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {copy.results.stats.map((stat, i) => {
              const accent = accents[i % accents.length]
              return (
                <Reveal key={stat.label} delay={0.06 * i} variant={i % 2 === 0 ? 'up' : 'scale'} y={28}>
                  <div
                    className="group relative h-full overflow-hidden rounded-[20px] border border-white/12 p-5 backdrop-blur-sm transition-[transform,border-color] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-white/25 sm:p-6"
                    style={{ background: `linear-gradient(150deg, ${accent}28, rgb(255 255 255 / 0.05) 62%)` }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-700 group-hover:scale-x-100"
                      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                      aria-hidden
                    />
                    <dt className="display text-[clamp(2rem,1.4rem+2.2vw,3rem)]" style={{ color: accent }}>
                      {/^[1-9]\d*$/.test(stat.value) ? <CountUp value={Number(stat.value)} /> : stat.value}
                    </dt>
                    <dd className="mt-2.5 max-w-[16ch] text-[12.5px] leading-snug text-night-muted sm:text-[13px]">
                      {stat.label}
                    </dd>
                  </div>
                </Reveal>
              )
            })}
          </dl>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.05]">
              <div className="marquee-mask">
                <ul className="flex w-max animate-marquee items-center gap-6 py-3.5 hover:[animation-play-state:paused]">
                  {[...copy.results.proofLines, ...copy.results.proofLines, ...copy.results.proofLines].map((line, i) => (
                    <li key={`${line}-${i}`} className="flex items-center gap-2 text-[12.5px] whitespace-nowrap text-white/75">
                      <Check className="size-3.5 text-teal" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- pricing */

function Pricing() {
  return (
    <div className="raya-page">
      <RayaPricing />
    </div>
  )
}

/* --------------------------------------------------------------------- faq */

function Faq() {
  const { copy } = useLocale()

  return (
    <section id="faq" className="relative overflow-hidden py-12 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgb(255_237_213/0.55),transparent_42%),radial-gradient(ellipse_at_88%_10%,rgb(226_237_255/0.7),transparent_40%),radial-gradient(ellipse_at_70%_90%,rgb(236_230_255/0.45),transparent_45%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHead
              align="left"
              eyebrow={copy.faq.eyebrow}
              accent="#F59E0B"
              title={<>{copy.faq.title}</>}
              body={copy.faq.body}
            />

            <div className="mt-8 overflow-hidden rounded-[22px] border border-[#fde68a]/80 bg-[linear-gradient(160deg,#fffbeb,#fff7ed_55%,#eff6ff)] p-5 shadow-[0_20px_44px_-32px_rgb(180_83_9/0.35)]">
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.06em] text-amber-700 uppercase">
                <Sparkles className="size-3.5" aria-hidden />
                {copy.footer.talkSales}
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 rounded-[14px] border border-white/90 bg-white/90 px-3 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  <ChannelMark kind="email" className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                  <span className="min-w-0 truncate">{SITE.email}</span>
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2.5 rounded-[14px] border border-white/90 bg-white/90 px-3 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  <ChannelMark kind="voice" className="size-8" glyphClassName="size-4" rounded="rounded-full" />
                  {SITE.phone}
                </a>
                <Link
                  to="/demo"
                  className="mt-1 flex h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-[13.5px] font-medium text-white shadow-[0_12px_26px_-16px_rgb(26_99_216/0.85)] transition-[filter,transform] hover:brightness-105 active:scale-[0.98]"
                >
                  {copy.navUi.bookDemo}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion items={copy.faq.items} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- resources */

const RESOURCE_EASE = [0.22, 1, 0.36, 1] as const

function ResourceLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (href.startsWith('/') && !href.includes('#')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

function Resources() {
  const { copy } = useLocale()
  const r = copy.resources
  const reduce = useReducedMotion()

  return (
    <section id="resources" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <div className="on-dark relative overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,#040d1c_0%,#081b3a_48%,#062a32_100%)] px-5 py-10 text-white sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <motion.div
            className="absolute -top-28 -end-24 size-[min(90vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.35),transparent_68%)] blur-3xl motion-reduce:transform-none"
            animate={reduce ? undefined : { y: [0, 22, 0], x: [0, -14, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-36 -start-20 size-[min(80vw,460px)] rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.32),transparent_70%)] blur-3xl motion-reduce:transform-none"
            animate={reduce ? undefined : { y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgb(255_255_255/0.11)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_75%)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-14">
          <Reveal>
            <SectionHead
              align="left"
              tone="light"
              accent="#7DE8E2"
              eyebrow={r.eyebrow}
              title={<>{r.title}</>}
              body={r.body}
            />
            <motion.div
              className="mt-8 hidden h-px origin-left bg-[linear-gradient(90deg,rgb(125_232_226/0.7),transparent)] lg:block"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: RESOURCE_EASE }}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <ResourceLink
              href={r.featuredHref}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur-sm transition-[border-color,background-color] duration-[var(--duration-base)] hover:border-teal/40 hover:bg-white/[0.08] sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            >
              <motion.span
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,#7DE8E2,#1a63d8,transparent)]"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: RESOURCE_EASE }}
              />
              <span className="relative grid size-16 shrink-0 place-items-center rounded-[18px] bg-white shadow-[0_16px_36px_-18px_rgb(0_0_0/0.55)] sm:size-[4.5rem]">
                <Mark className="size-11 sm:size-12" />
                <span className="absolute -top-1 -end-1 grid size-5 place-items-center rounded-full bg-teal text-night">
                  <Sparkles className="size-3" aria-hidden />
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="caps text-[10px] text-teal">{r.featuredTag}</span>
                <span className="display mt-1.5 block text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] tracking-[-0.03em] text-white">
                  {r.featuredTitle}
                </span>
                <span className="mt-2 block max-w-xl text-[13.5px] leading-relaxed text-night-muted sm:text-[14px]">
                  {r.featuredBody}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition-[background-color,border-color] group-hover:border-teal/50 group-hover:bg-teal/15 sm:self-center">
                {r.featuredCta}
                <ArrowUpRight className="size-3.5 transition-transform duration-[var(--duration-base)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </ResourceLink>
          </Reveal>
        </div>

        <ol className="relative mt-8 border-t border-white/10 sm:mt-10">
          {r.items.map((item, i) => {
            const n = String(i + 1).padStart(2, '0')
            return (
              <motion.li
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: RESOURCE_EASE }}
                className="border-b border-white/10"
              >
                <ResourceLink
                  href={item.href}
                  className="group relative flex items-start gap-3.5 py-5 sm:items-center sm:gap-5 sm:py-6"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,rgb(125_232_226/0.55),transparent)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                    aria-hidden
                  />
                  <span className="display w-10 shrink-0 text-[1.35rem] tabular-nums text-white/25 transition-colors group-hover:text-teal sm:w-14 sm:text-[1.55rem]">
                    {n}
                  </span>
                  <span className="hidden w-24 shrink-0 caps text-[10px] text-teal sm:block">{item.tag}</span>
                  <span className="min-w-0 flex-1">
                    <span className="caps text-[10px] text-teal sm:hidden">{item.tag}</span>
                    <span className="mt-1 block text-[15px] font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-teal sm:mt-0 sm:text-[1.05rem]">
                      {item.title}
                    </span>
                    <span className="mt-1 block max-w-xl text-[13px] leading-snug text-night-muted sm:text-[13.5px]">
                      {item.body}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/50 transition-[background-color,border-color,color] group-hover:border-teal/40 group-hover:bg-teal/15 group-hover:text-teal sm:size-10">
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" aria-hidden />
                  </span>
                </ResourceLink>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- contact */

function Contact() {
  const { copy } = useLocale()

  return (
    <section id="contact" className="relative px-4 pb-6 sm:px-6">
      <div className="on-dark relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#061225,#081b3a_48%,#07293a)] px-5 py-10 text-white sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div
          className="pointer-events-none absolute -top-40 left-1/4 size-[min(100vw,600px)] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, #1a63d8 0%, #6f4bf2 48%, transparent 72%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -bottom-40 size-[min(90vw,520px)] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0e9a9e 0%, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="caps inline-flex items-center gap-2 text-white/60">
              <span className="h-px w-6 bg-white/40" aria-hidden />
              {copy.demo.eyebrow}
            </span>
            <h2 className="display mt-4 text-[clamp(2rem,1.2rem+2.6vw,3.2rem)] text-white">{copy.demo.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-night-muted">{copy.demo.body}</p>
            <ul className="mx-auto mt-6 max-w-md space-y-2.5 text-left">
              {copy.demo.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
                  <span className="grid size-5 place-items-center rounded-full bg-teal/20 text-teal">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/demo"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-brand-deep shadow-[0_16px_36px_-18px_rgb(255_255_255/0.55)] transition-[transform,filter] hover:brightness-105 active:scale-[0.98]"
            >
              {copy.demo.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-3 text-[12.5px] text-white/50">{copy.demo.hint}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-2 sm:grid-cols-3">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30"
              >
                <ChannelMark kind="email" className="size-9" glyphClassName="size-4" rounded="rounded-full" />
                <span className="min-w-0 text-left">
                  <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">{copy.demo.email}</span>
                  <span className="block truncate text-[12.5px] font-medium text-white">{SITE.email}</span>
                </span>
              </a>
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30"
              >
                <ChannelMark kind="voice" className="size-9" glyphClassName="size-4" rounded="rounded-full" />
                <span className="min-w-0 text-left">
                  <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">{copy.demo.phone}</span>
                  <span className="block truncate text-[12.5px] font-medium text-white">{SITE.phone}</span>
                </span>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${copy.navUi.chatWhatsApp} ${SITE.phone}`}
                className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30"
              >
                <ChannelMark kind="whatsapp" className="size-9" glyphClassName="size-4" rounded="rounded-full" />
                <span className="min-w-0 text-left">
                  <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">{copy.demo.whatsapp}</span>
                  <span className="block truncate text-[12.5px] font-medium text-white">{SITE.phone}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */

export function Home() {
  return (
    <main id="main">
      <Hero />
      <ChannelStrip />
      <Diagram />
      <Platform />
      <Industries />
      <Results />
      <Pricing />
      <Resources />
      <Faq />
      <Contact />
    </main>
  )
}
