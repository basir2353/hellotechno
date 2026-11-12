"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  IconChart,
  IconCode,
  IconLayers,
  IconLinkedIn,
  IconMessageLines,
  IconShieldCheck,
  IconUsers,
} from "@/components/Icons";
import { SiteShell } from "@/components/SiteShell";
import { useLocale } from "@/lib/locale";
import { images, routes } from "@/lib/site";

const functionIcons = [
  IconCode,
  IconShieldCheck,
  IconChart,
  IconUsers,
  IconMessageLines,
  IconLayers,
] as const satisfies readonly ComponentType<{ className?: string }>[];

export function TeamPage() {
  const { t } = useLocale();
  const team = t.team;

  return (
    <SiteShell>
      <section className="tp-hero">
        <div className="shell">
          <div className="tp-hero-inner">
            <span className="tp-pill">
              <span aria-hidden />
              {team.label}
            </span>
            <h1 className="tp-hero-title">{team.title}</h1>
            <p className="tp-hero-body">{team.body}</p>
            <div className="tp-hero-actions">
              <Link href={routes.trial} className="tp-btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="tp-btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-founder">
        <div className="shell">
          <div className="tp-founder-grid">
            <div className="tp-founder-frame">
              <span className="tp-founder-circle" aria-hidden />
              <div className="tp-founder-photo">
                <Image
                  src={images.founder}
                  alt={`${team.founderName}, ${team.founderBadge}`}
                  fill
                  className="object-cover object-[center_12%]"
                  sizes="(max-width: 900px) 80vw, 440px"
                  priority
                />
              </div>
            </div>

            <div className="tp-founder-copy">
              <p className="tp-founder-label">
                <span aria-hidden />
                {team.founderBadge}
              </p>
              <h2 className="tp-founder-name">{team.founderName}</h2>
              <p className="tp-founder-role">{team.founderRole}</p>
              <p className="tp-founder-bio">{team.founderBio1}</p>
              <p className="tp-founder-bio">{team.founderBio2}</p>
              <div className="tp-founder-actions">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="tp-btn-ghost"
                >
                  <IconLinkedIn className="h-4 w-4" />
                  {team.linkedIn}
                </a>
                <a
                  href={routes.talk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-btn-ghost"
                >
                  {team.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-built">
        <div className="shell">
          <div className="tp-built-head">
            <span className="tp-pill">
              <span aria-hidden />
              {team.builtLabel}
            </span>
            <h2 className="tp-built-title">{team.builtTitle}</h2>
            <p className="tp-built-body">{team.builtBody}</p>
          </div>

          <div className="tp-fn-grid">
            {team.functions.map((item, index) => {
              const Icon = functionIcons[index] ?? IconCode;
              return (
                <article key={item.title} className="tp-fn-card">
                  <span className="tp-fn-icon" aria-hidden>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tp-meet">
        <div className="shell">
          <div className="tp-meet-card">
            <h2 className="tp-meet-title">{team.meetTitle}</h2>
            <p className="tp-meet-body">{team.meetBody}</p>
            <div className="tp-meet-actions">
              <Link href={routes.trial} className="tp-btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="tp-btn-secondary">
                {t.nav.demo}
              </Link>
              <Link href={routes.hospitality} className="tp-btn-secondary">
                {team.forHospitality}
              </Link>
              <Link href={routes.aesthetics} className="tp-btn-secondary">
                {team.forClinics}
              </Link>
              <Link href={routes.dining} className="tp-btn-secondary">
                {team.forDining}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
