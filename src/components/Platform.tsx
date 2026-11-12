"use client";

import Link from "next/link";
import {
  IconChat,
  IconCheck,
  IconLayers,
  IconMessageLines,
  IconPhone,
  IconUsers,
} from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { routes } from "@/lib/site";

const pointIcons = [IconChat, IconLayers, IconMessageLines, IconUsers];

export function Platform() {
  const { t } = useLocale();

  return (
    <section id="why-platform" className="platform-section">
      <div className="shell">
        <div className="platform-hero">
          <div className="platform-copy">
            <span className="pill pill-purple">{t.platform.label}</span>
            <h2 className="type-h2 mt-5 max-w-xl">{t.platform.title}</h2>
            <p className="type-lead mt-4 max-w-xl">{t.platform.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={routes.trial} className="btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
          </div>

          <div className="platform-orbit" aria-hidden>
            <div className="platform-orbit-ring a" />
            <div className="platform-orbit-ring b" />
            <div className="platform-orbit-spin is-outer">
              <span className="platform-orbit-node is-mail">
                <span className="platform-orbit-node-face">✉</span>
              </span>
            </div>
            <div className="platform-orbit-spin is-mid">
              <span className="platform-orbit-node is-phone">
                <span className="platform-orbit-node-face">
                  <IconPhone className="h-4 w-4" />
                </span>
              </span>
            </div>
            <div className="platform-orbit-spin is-inner">
              <span className="platform-orbit-node is-chat">
                <span className="platform-orbit-node-face">
                  <IconChat className="h-4 w-4" />
                </span>
              </span>
            </div>
            <div className="platform-orbit-core">
              <IconChat className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="platform-points">
          {t.platform.points.map((point, index) => {
            const Icon = pointIcons[index] ?? IconCheck;
            return (
              <article key={point.title} className="platform-point">
                <div className="platform-point-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
