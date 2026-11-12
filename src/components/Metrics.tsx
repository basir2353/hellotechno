"use client";

import Link from "next/link";
import {
  IconChat,
  IconCheck,
  IconInstagram,
  IconMail,
  IconPhone,
  IconSms,
  IconWhatsApp,
  LogoMark,
} from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { routes } from "@/lib/site";

export function Metrics() {
  const { t } = useLocale();

  return (
    <section id="numbers" className="metrics-section">
      <div className="shell metrics-layout">
        <div className="metrics-copy">
          <span className="pill pill-purple">{t.metrics.label}</span>
          <h2 className="type-h2 mt-5 max-w-xl">{t.metrics.title}</h2>
          <p className="type-lead mt-4 max-w-xl">{t.metrics.body}</p>

          <div className="metrics-cards">
            {t.metrics.items.map((item) => (
              <article key={item.label} className="metrics-card">
                <p className="metrics-value">{item.value}</p>
                <div>
                  <p className="metrics-card-title">{item.label}</p>
                  <p className="metrics-card-detail">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="metrics-orbit" aria-hidden>
          <div className="metrics-orbit-ring metrics-orbit-ring-a" />
          <div className="metrics-orbit-ring metrics-orbit-ring-b" />
          <div className="metrics-orbit-ring metrics-orbit-ring-c" />

          <div className="metrics-orbit-spin is-outer">
            <span className="metrics-orbit-node is-ig is-pos-tr">
              <span className="metrics-orbit-face">
                <IconInstagram className="h-4 w-4" />
              </span>
            </span>
            <span className="metrics-orbit-node is-wa is-pos-br">
              <span className="metrics-orbit-face">
                <IconWhatsApp className="h-4 w-4" />
              </span>
            </span>
          </div>

          <div className="metrics-orbit-spin is-mid">
            <span className="metrics-orbit-node is-mail is-pos-top">
              <span className="metrics-orbit-face">
                <IconMail className="h-4 w-4" />
              </span>
            </span>
            <span className="metrics-orbit-node is-phone is-pos-br">
              <span className="metrics-orbit-face">
                <IconPhone className="h-4 w-4" />
              </span>
            </span>
            <span className="metrics-orbit-node is-chat is-pos-bottom">
              <span className="metrics-orbit-face">
                <IconChat className="h-4 w-4" />
              </span>
            </span>
            <span className="metrics-orbit-node is-sms is-pos-left">
              <span className="metrics-orbit-face">
                <IconSms className="h-4 w-4" />
              </span>
            </span>
          </div>

          <div className="metrics-orbit-core">
            <LogoMark className="h-12 w-12" />
            <span className="metrics-orbit-dot" />
          </div>

          <span className="metrics-orbit-toast is-a">
            <IconCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
            {t.metrics.activity[0]}
          </span>
          <span className="metrics-orbit-toast is-b">
            <IconCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
            {t.metrics.activity[1]}
          </span>
          <span className="metrics-orbit-toast is-c">
            <IconCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
            {t.metrics.activity[2]}
          </span>

          <Link href={routes.trial} className="metrics-orbit-cta">
            <span className="metrics-orbit-cta-dot" />
            {t.band.trial}
          </Link>
        </div>
      </div>
    </section>
  );
}
