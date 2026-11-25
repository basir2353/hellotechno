"use client";

import Image from "../next-image";
import Link from "../next-link";
import { useMemo, useState } from "react";
import { IconChat, IconPhone, IconWhatsApp } from "./Icons";
import { useLocale } from "../lib/locale";
import { brand, images, routes } from "../lib/site";

function buildMonthDays(year: number, monthZeroBased: number) {
  // Calendar headers are Mon–Sun (0 = Mon ... 6 = Sun).
  const jsDay = new Date(year, monthZeroBased, 1).getDay();
  const firstDow = (jsDay + 6) % 7;
  const daysInMonth = new Date(year, monthZeroBased + 1, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const availableDays = new Set([2, 3, 5, 9, 10, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30]);
const timeSlots = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"] as const;

export function Cta() {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const [selected, setSelected] = useState<number | null>(30);
  const [monthIdx, setMonthIdx] = useState(1);
  const [timeSlot, setTimeSlot] = useState<(typeof timeSlots)[number]>("10:00 AM");
  const months = en
    ? ["October 2026", "November 2026", "December 2026"]
    : ["أكتوبر 2026", "نوفمبر 2026", "ديسمبر 2026"];
  const cells = useMemo(() => buildMonthDays(2026, 9 + monthIdx), [monthIdx]);

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
                <span>{months[monthIdx]}</span>
                <span className="flex items-center gap-1 text-[var(--soft)]">
                  <button
                    type="button"
                    aria-label={en ? "Previous month" : "الشهر السابق"}
                    onClick={() => setMonthIdx((m) => (m > 0 ? m - 1 : months.length - 1))}
                    className="grid size-7 place-items-center rounded-full transition-colors hover:bg-[var(--page-soft)] hover:text-[var(--ink)]"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label={en ? "Next month" : "الشهر التالي"}
                    onClick={() => setMonthIdx((m) => (m + 1) % months.length)}
                    className="grid size-7 place-items-center rounded-full transition-colors hover:bg-[var(--page-soft)] hover:text-[var(--ink)]"
                  >
                    ›
                  </button>
                </span>
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

              <div className="mt-4 flex flex-wrap gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                      timeSlot === slot
                        ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]"
                        : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--primary)]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
                <span>{t.cta.timeZone}</span>
                <span className="truncate font-medium text-[var(--ink)]">
                  {en ? "Asia/Qatar (AST)" : "آسيا/قطر (AST)"}
                </span>
              </div>

              <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-[var(--soft)]">
                {t.cta.fallback}{" "}
                <a className="font-semibold text-[var(--primary)]" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>{" "}
                {t.cta.fallbackEnd}
              </p>

              <Link
                href={`${routes.demo}?date=${encodeURIComponent(`${months[monthIdx]} ${selected ?? 30}`)}&time=${encodeURIComponent(timeSlot)}`}
                className="btn-primary mt-5 w-full"
              >
                {t.cta.demo}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
