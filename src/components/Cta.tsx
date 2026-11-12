"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconChat, IconPhone, IconWhatsApp } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

function buildNovemberDays() {
  // November 2026 starts on Sunday; calendar headers are Mon–Sun.
  const firstDow = 6;
  const daysInMonth = 30;
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const availableDays = new Set([12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30]);

export function Cta() {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const cells = useMemo(() => buildNovemberDays(), []);
  const [selected, setSelected] = useState<number | null>(30);

  const weekdays = en
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["إث", "ثل", "أر", "خم", "جم", "سب", "أح"];

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
              {t.cta.ready}{" "}
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
                <Link href={routes.demo} className="cta-channel bg-[var(--primary)]" aria-label={en ? "Demo chat" : "دردشة العرض"}>
                  <IconChat className="h-4 w-4" />
                </Link>
                <a
                  href={routes.talk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-channel bg-[#3730a3]"
                  aria-label={en ? "Contact" : "تواصل"}
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
              {t.cta.promo}{" "}
              <span className="font-semibold text-[var(--primary)]">{t.cta.promoAccent}</span>
            </div>

            <div className="cta-calendar-body">
              <p className="text-center text-[0.95rem] font-semibold text-[var(--ink)]">{t.cta.selectDay}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[var(--ink)]">
                <span>{en ? "November 2026" : "نوفمبر 2026"}</span>
                <span className="text-[var(--soft)]">‹ ›</span>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.7rem] font-medium text-[var(--soft)]">
                {weekdays.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1">
                {cells.map((day, idx) => {
                  if (!day) return <span key={`e-${idx}`} />;
                  const isAvailable = availableDays.has(day);
                  const isSelected = selected === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        setSelected(day);
                      }}
                      className={`cta-day ${isAvailable ? "is-available" : ""} ${isSelected ? "is-selected" : ""}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
                <span>{t.cta.timeZone}</span>
                <span className="truncate font-medium text-[var(--ink)]">
                  {en ? "Asia/Dubai (GST)" : "آسيا/دبي (GST)"}
                </span>
              </div>

              <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-[var(--soft)]">
                {t.cta.fallback}{" "}
                <a className="font-semibold text-[var(--primary)]" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>{" "}
                {t.cta.fallbackEnd}
              </p>

              <Link href={routes.demo} className="btn-primary mt-5 w-full">
                {t.cta.demo}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
