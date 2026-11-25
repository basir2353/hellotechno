import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'

import { ALL_INDUSTRIES } from '../../data/industriesCatalog'
import { useLocale } from '../../lib/locale'
import '../../raya/raya.css'
import { Cta } from '../../raya/components/Cta'
import { Faq } from '../../raya/components/Faq'
import { Pricing } from '../../raya/components/Pricing'

export function IndustryDetailPage() {
  const { slug } = useParams()
  const { locale } = useLocale()
  const ar = locale === 'ar'

  const item = ALL_INDUSTRIES.find((entry) => entry.slug === slug)
  const [simLang, setSimLang] = useState<'en' | 'ar'>(locale)
  const [replayKey, setReplayKey] = useState(0)
  const [step, setStep] = useState<number>(3)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    setSimLang(locale)
  }, [locale])

  useEffect(() => {
    setStep(1)
    const t1 = window.setTimeout(() => setStep(2), 650)
    const t2 = window.setTimeout(() => setStep(3), 1300)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [slug, simLang, replayKey])

  if (!item) {
    return <Navigate to="/industries" replace />
  }

  const copy = ar ? item.ar : item.en
  const chat = simLang === 'ar' ? item.ar.sampleChat : item.en.sampleChat

  return (
    <main id="main" className="flex-1 pt-28">
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6">
        <Link
          to="/industries"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-[#5457e6]"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
          {ar ? 'جميع القطاعات (15)' : 'All 15 industries'}
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
              style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: item.accent }} aria-hidden />
              {copy.tagline}
            </span>

            <h1 className="display mt-4 text-[clamp(2rem,1.4rem+2.2vw,3.1rem)] text-ink">
              {copy.title}
            </h1>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{copy.summary}</p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {copy.useCases.map((uc) => (
                <div
                  key={uc}
                  className="flex items-center gap-2.5 rounded-[14px] border border-line bg-white px-3.5 py-2.5 text-[13.5px] font-medium text-ink shadow-[0_8px_20px_-16px_rgb(9_30_74/0.25)]"
                >
                  <Check className="size-4 shrink-0" style={{ color: item.accent }} aria-hidden />
                  <span>{uc}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] px-6 text-[14px] font-medium text-white shadow-[0_12px_26px_-16px_rgb(26_99_216/0.9)] transition-[filter,transform] hover:brightness-105 active:scale-[0.98]"
              >
                {ar ? 'احجز عرضاً مجانياً' : 'Book a free demo'}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => window.HeyServoWidget?.open?.()}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-white px-5 text-[14px] font-medium text-ink transition-colors hover:border-[#5457e6] hover:text-[#5457e6]"
              >
                {ar ? 'تحدث مع المساعد الذكي' : 'Try live chat'}
              </button>
            </div>
          </div>

          {/* Interactive Live Preview Card */}
          <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_24px_60px_-30px_rgb(9_30_74/0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-soft/60 px-4 py-3">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-ink">
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                {ar ? 'معاينة مباشرة' : 'Live preview'} · WhatsApp
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSimLang('en')}
                  className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                    simLang === 'en' ? 'bg-white text-ink shadow-xs' : 'text-muted'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setSimLang('ar')}
                  className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                    simLang === 'ar' ? 'bg-white text-ink shadow-xs' : 'text-muted'
                  }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setReplayKey((k) => k + 1)}
                  aria-label="Replay"
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-muted hover:text-ink"
                >
                  <RotateCcw className="size-3" />
                  {ar ? 'إعادة' : 'Replay'}
                </button>
              </div>
            </div>

            <div className="space-y-3 p-5" dir={simLang === 'ar' ? 'rtl' : 'ltr'}>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-[18px] rounded-ee-md bg-[#5457e6] px-4 py-2.5 text-[13.5px] leading-relaxed text-white">
                  {chat.guest}
                </div>
              </div>

              {step >= 2 ? (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-[18px] rounded-es-md border border-line bg-[#f4f5ff] px-4 py-2.5 text-[13.5px] leading-relaxed text-ink">
                    {chat.agent}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="rounded-[18px] border border-line bg-[#f4f5ff] px-4 py-2 text-[12.5px] text-muted">
                    {simLang === 'ar' ? 'جارٍ الكتابة…' : 'Typing…'}
                  </div>
                </div>
              )}

              {step >= 3 && (
                <p className="rounded-xl bg-emerald-50 px-3.5 py-2 text-center text-[12px] font-semibold text-emerald-700">
                  ✦ {chat.system}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="raya-page">
        <Pricing />
        <Cta />
        <Faq />
      </div>
    </main>
  )
}
