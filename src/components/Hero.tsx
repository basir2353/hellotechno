"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconCheck, IconMessageLines, IconPhone } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { images, media, routes } from "@/lib/site";

function IconBrandInstagram({ className, gradId }: { className?: string; gradId: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#${gradId})`} />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="#fff" />
    </svg>
  );
}

function IconBrandWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#25d366" />
      <path
        fill="#fff"
        d="M12.04 6.2a5.8 5.8 0 0 0-5.02 8.7L6.4 17.7l2.9-.76a5.8 5.8 0 1 0 2.74-10.74Zm3.38 8.28c-.14.4-.83.77-1.16.82-.3.04-.67.06-1.08-.07-.25-.08-.57-.18-.98-.35-1.72-.74-2.84-2.47-2.93-2.58-.08-.12-.7-.93-.7-1.77 0-.84.44-1.25.6-1.42.15-.17.33-.21.44-.21h.32c.1 0 .24-.04.37.28.14.33.47 1.15.51 1.23.04.08.07.18 0 .28-.07.1-.1.17-.2.26-.1.1-.2.2-.3.27-.1.08-.2.17-.09.33.12.17.52.85 1.11 1.38.77.68 1.41.9 1.61 1 .2.1.31.08.43-.05.11-.13.49-.57.62-.77.13-.2.26-.16.44-.1.18.07 1.14.54 1.34.64.2.1.33.15.38.23.05.08.05.46-.09.86Z"
      />
    </svg>
  );
}

function IconBrandGmail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M3.5 6.2 12 12.4l8.5-6.2V18a1.7 1.7 0 0 1-1.7 1.7H5.2A1.7 1.7 0 0 1 3.5 18V6.2Z" />
      <path fill="#C5221F" d="M3.5 6.2 12 12.4V20.5H5.2A1.7 1.7 0 0 1 3.5 18V6.2Z" opacity=".35" />
      <path fill="#fff" d="M3.5 6.2 12 12.4l8.5-6.2-1.4-1.1L12 10.2 4.9 5.1 3.5 6.2Z" />
      <path fill="#4285F4" d="M20.5 6.2V18a1.7 1.7 0 0 1-.3 1L12 12.4l8.5-6.2Z" opacity=".9" />
      <path fill="#34A853" d="M3.5 6.2v11.8c0 .4.1.8.3 1L12 12.4 3.5 6.2Z" opacity=".85" />
    </svg>
  );
}

type RailItem =
  | { kind: "channel"; key: string; label: string; icon: ReactNode }
  | { kind: "logo"; key: string; icon: ReactNode }
  | { kind: "system"; key: string; label: string };

const SYSTEM_PILLS = [
  "OPERA Cloud",
  "Mews",
  "Cloudbeds",
  "SiteMinder",
  "HotSOS",
  "Simphony POS",
] as const;

export function Hero() {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const buildRailItems = (copy: number): RailItem[] => [
    {
      kind: "channel",
      key: "sms",
      label: en ? "SMS" : "الرسائل",
      icon: <IconMessageLines className="h-5 w-5 text-[#4f6ef7]" />,
    },
    {
      kind: "logo",
      key: "instagram",
      icon: <IconBrandInstagram className="h-7 w-7" gradId={`hs-ig-${copy}`} />,
    },
    {
      kind: "logo",
      key: "gmail",
      icon: <IconBrandGmail className="h-7 w-7" />,
    },
    ...SYSTEM_PILLS.map(
      (label): RailItem => ({
        kind: "system",
        key: label,
        label,
      }),
    ),
    {
      kind: "logo",
      key: "whatsapp",
      icon: <IconBrandWhatsApp className="h-7 w-7" />,
    },
    {
      kind: "channel",
      key: "voice",
      label: en ? "Voice / Call" : "المكالمات",
      icon: <IconPhone className="h-5 w-5 text-[#4f6ef7]" />,
    },
  ];

  return (
    <section id="top" className="hs-hero">
      <div className="hs-hero-orbit" aria-hidden>
        <div className="hs-orbit-ring is-a">
          <span className="hs-orbit-dot is-1" />
          <span className="hs-orbit-dot is-2" />
        </div>
        <div className="hs-orbit-ring is-b">
          <span className="hs-orbit-dot is-3" />
          <span className="hs-orbit-dot is-4" />
          <span className="hs-orbit-dot is-5" />
        </div>
        <div className="hs-orbit-ring is-c">
          <span className="hs-orbit-dot is-6" />
          <span className="hs-orbit-dot is-7" />
        </div>
      </div>

      <div className="shell relative z-[1]">
        <div className="hs-hero-grid">
          <div className="hs-hero-col-left">
            <p className="hs-hero-eyebrow">
              <span aria-hidden />
              {t.hero.eyebrow}
            </p>
            <h1 className="hs-hero-title">
              <span className="hs-hero-title-ink">{t.hero.headlineBefore}</span>
              <br />
              <span className="hs-hero-title-accent">
                {en ? (
                  <>
                    but the AI platform
                    <br />
                    that runs your
                    <br />
                    customer experience.
                  </>
                ) : (
                  t.hero.headlineAccent
                )}
              </span>
            </h1>
            <p className="hs-hero-status">
              <span aria-hidden />
              {t.hero.status}
            </p>
          </div>

          <div className="hs-hero-col-right">
            <p className="hs-hero-body">{t.hero.body}</p>
            <Link href={routes.trial} className="hs-hero-offer">
              <span aria-hidden />
              {t.hero.offer}
            </Link>
            <div className="hs-hero-actions">
              <Link href={routes.trial} className="hs-btn-primary">
                {t.hero.trial}
              </Link>
              <Link href={routes.demo} className="hs-btn-secondary">
                {t.hero.demo}
              </Link>
            </div>
            <Link href={routes.demo} className="hs-hero-live">
              {t.hero.live}
            </Link>
          </div>
        </div>

        <div className="hs-hero-video-wrap">
          <div className="hs-hero-video">
            <Image
              src={images.hero}
              alt={t.hero.watch}
              fill
              priority
              className={`object-cover transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 1200px) 100vw, 1120px"
            />
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              poster={media.heroPoster}
              preload="metadata"
              playsInline
              controls={playing}
              onClick={(e) => {
                if (!playing) {
                  e.preventDefault();
                  void togglePlay();
                }
              }}
            >
              <source src={media.heroVideo} type="video/mp4" />
            </video>

            {!playing ? (
              <button type="button" className="hs-hero-play" aria-label={t.hero.watch} onClick={() => void togglePlay()}>
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9 7.2v9.6l8.4-4.8L9 7.2Z" />
                </svg>
              </button>
            ) : null}

            <span className="hs-hero-toast">
              <IconCheck className="h-3.5 w-3.5 text-[var(--success)]" />
              {t.hero.toast}
            </span>
            <span className="hs-hero-247">
              <span className="hs-hero-247-dot" aria-hidden />
              {t.hero.alwaysOn}
            </span>
          </div>
        </div>

        <div id="why-os" className="hs-compare">
          <p className="hs-compare-label">{t.compare.label}</p>
          <div className="hs-compare-grid">
            {t.compare.cards.map((card) => (
              <article key={card} className="hs-compare-card">
                <p>{card}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="hs-channel-rail">
        <p className="hs-compare-strip">{t.compare.strip}</p>
        <div className="hs-channel-marquee" aria-hidden>
          <div className="hs-channel-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="hs-channel-group">
                {buildRailItems(copy).map((item) => {
                  if (item.kind === "channel") {
                    return (
                      <span key={`${copy}-${item.key}`} className="hs-channel-item is-channel">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    );
                  }
                  if (item.kind === "logo") {
                    return (
                      <span key={`${copy}-${item.key}`} className="hs-channel-item is-logo">
                        {item.icon}
                      </span>
                    );
                  }
                  return (
                    <span key={`${copy}-${item.key}`} className="hs-channel-item is-pill">
                      {item.label}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
