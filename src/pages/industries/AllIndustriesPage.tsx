import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import {
  ALL_INDUSTRIES,
  INDUSTRY_CATEGORIES,
  type IndustryCategory,
} from '../../data/industriesCatalog'
import { useLocale } from '../../lib/locale'
import '../../raya/raya.css'
import { Cta } from '../../raya/components/Cta'
import { Pricing } from '../../raya/components/Pricing'

export function AllIndustriesPage() {
  const { locale } = useLocale()
  const ar = locale === 'ar'
  const [category, setCategory] = useState<IndustryCategory>('all')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered =
    category === 'all'
      ? ALL_INDUSTRIES
      : ALL_INDUSTRIES.filter((item) => item.category === category)

  return (
    <main id="main" className="flex-1 pt-28 pb-10">
      <section className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f1f2ff] px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-[#5457e6] uppercase">
            <span className="size-1.5 rounded-full bg-[#5457e6]" aria-hidden />
            {ar ? '15 قطاعاً رسمياً' : '15 Official Industries'}
          </span>
          <h1 className="display mt-4 text-[clamp(2rem,1.4rem+2.4vw,3.3rem)] text-ink">
            {ar ? 'منصة واحدة. لكل قطاع نخدمه.' : 'Every industry we serve. One AI layer.'}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted">
            {ar
              ? 'اختر قطاعك لاستعراض حالات الاستخدام الفعلية، المحاكاة المباشرة، وربط الأنظمة بالعربية والإنجليزية.'
              : 'Explore live workflows, channels, and system integrations across all 15 industries — native English and Arabic, 24/7.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {INDUSTRY_CATEGORIES.map((cat) => {
            const active = category === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={
                  active
                    ? 'rounded-full bg-[#5457e6] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_-12px_rgb(84_87_230/0.7)] transition-all'
                    : 'rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:border-[#5457e6] hover:text-ink'
                }
              >
                {ar ? cat.ar : cat.en}
              </button>
            )
          })}
        </div>

        {/* 15 Industries Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const copy = ar ? item.ar : item.en
            return (
              <article
                key={item.slug}
                className="group flex flex-col justify-between rounded-[24px] border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgb(9_30_74/0.35)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#5457e6]/40 hover:shadow-[0_24px_50px_-28px_rgb(84_87_230/0.25)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
                      {copy.title}
                    </h2>
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1 text-[12px] font-medium text-faint">{copy.tagline}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{copy.summary}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-line/70 pt-4">
                    {copy.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2 text-[13px] text-ink-2">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0"
                          style={{ color: item.accent }}
                          aria-hidden
                        />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#5457e6] transition-colors hover:text-brand-deep"
                  >
                    {ar ? 'استعرض القطاع' : 'Explore workflow'}
                    <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                  </Link>
                  <Link
                    to={`/demo?industry=${encodeURIComponent(copy.title)}`}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-[12.5px] font-medium text-ink transition-colors hover:border-[#5457e6] hover:text-[#5457e6]"
                  >
                    {ar ? 'احجز عرضاً' : 'Book demo'}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <div className="raya-page mt-12">
        <Pricing />
        <Cta />
      </div>
    </main>
  )
}
