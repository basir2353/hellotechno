import { Check, Play } from 'lucide-react'
import { useRef, useState } from 'react'

import { useLocale } from '../lib/locale'
import { Mark } from './Logo'

export function HeroVideo() {
  const { locale } = useLocale()
  const ar = locale === 'ar'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const startPlay = () => {
    setPlaying(true)
    window.setTimeout(() => {
      void videoRef.current?.play()
    }, 30)
  }

  return (
    <section className="relative py-6 sm:py-8 lg:py-10" aria-label={ar ? 'فيديو تعريفي' : 'Product film'}>
      <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-[#0b1020] shadow-[0_28px_70px_-24px_rgb(9_30_74/0.42)] sm:rounded-[28px]">
          <video
            ref={videoRef}
            src="/videos/video1.mp4#t=0.5"
            controls={playing}
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
            className="size-full object-cover"
          />

          {!playing && (
            <>
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(95deg,rgba(8,12,26,0.78)_0%,rgba(8,12,26,0.48)_48%,rgba(8,12,26,0.2)_100%)]"
                aria-hidden
              />

              {/* Top-left brand pill */}
              <div className="absolute top-4 start-4 z-10 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink shadow-md sm:top-6 sm:start-6">
                <Mark className="size-4" />
                <span>Hello Techno</span>
              </div>

              {/* Top-right status pills */}
              <div className="pointer-events-none absolute top-4 end-4 z-10 hidden flex-col items-end gap-2 sm:top-6 sm:end-6 sm:flex">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11.5px] font-medium text-white/90 backdrop-blur-md">
                  <Check className="size-3.5 text-emerald-400" aria-hidden />
                  {ar ? 'تم الرد على العميل' : 'Customer replied'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11.5px] font-medium text-white/90 backdrop-blur-md">
                  <Check className="size-3.5 text-emerald-400" aria-hidden />
                  {ar ? 'تمت المتابعة بنجاح' : 'Follow-up completed'}
                </span>
              </div>

              {/* Left copy + film button */}
              <div className="absolute inset-y-0 start-0 z-10 flex max-w-[34rem] flex-col justify-center p-5 sm:p-10 lg:p-12">
                <h2 className="display text-[clamp(1.6rem,1rem+2.5vw,3.15rem)] leading-[1.06] tracking-[-0.03em] text-white">
                  {ar ? (
                    <>
                      لا تفوّت
                      <br />
                      <span className="text-[#b8beff]">أي عميل بعد اليوم.</span>
                    </>
                  ) : (
                    <>
                      Never miss
                      <br />
                      <span className="text-[#b8beff]">another customer.</span>
                    </>
                  )}
                </h2>
                <p className="mt-2.5 max-w-md text-[12.5px] leading-relaxed text-white/85 sm:mt-3.5 sm:text-[15px]">
                  {ar
                    ? 'شاهد منصة الذكاء الاصطناعي ترد وتحجز وتبيع على كل قناة، على مدار الساعة.'
                    : 'Watch the AI platform answer, book and sell on every channel, 24/7.'}
                </p>

                <button
                  type="button"
                  onClick={startPlay}
                  className="mt-4 inline-flex w-fit items-center gap-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6 sm:text-[14px]"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-[#5457e6] text-white shadow-[0_10px_24px_-6px_rgb(84_87_230/0.8)] sm:size-11">
                    <Play className="size-4 fill-current ms-0.5" aria-hidden />
                  </span>
                  <span>{ar ? 'شاهد الفيلم التعريفي' : 'Watch the 2-minute film'}</span>
                </button>
              </div>

              {/* Center play button */}
              <button
                type="button"
                onClick={startPlay}
                aria-label={ar ? 'تشغيل الفيديو' : 'Play video'}
                className="group absolute top-1/2 left-1/2 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#5457e6] text-white shadow-[0_18px_40px_-8px_rgb(84_87_230/0.85)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:size-18"
              >
                <Play className="size-6 fill-current ms-0.5 sm:size-7" aria-hidden />
              </button>

              {/* Bottom-right live badges */}
              <div className="pointer-events-none absolute end-4 bottom-4 z-10 hidden items-center gap-2 sm:end-6 sm:bottom-5 sm:flex">
                <span className="rounded-full border border-white/20 bg-black/55 px-3.5 py-1 text-[11.5px] font-medium text-white backdrop-blur-md">
                  {ar ? 'منصة تجربة العملاء · منتج مباشر' : 'AI CX Platform · live product'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5457e6] px-3 py-1 text-[11.5px] font-semibold text-white shadow-md">
                  <span className="size-1.5 rounded-full bg-white" />
                  24/7
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
