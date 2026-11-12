"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { routes } from "@/lib/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  primaryHref = routes.trial,
  secondaryHref = routes.demo,
  primaryLabel,
  secondaryLabel,
}: PageHeroProps) {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-[#fbfbfe] pb-10 pt-10 md:pb-14 md:pt-14">
      <div className="hero-arcs" aria-hidden />
      <div
        className={`shell relative grid items-center gap-8 ${
          image ? "lg:grid-cols-2 lg:gap-12 xl:gap-16" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12"
        }`}
      >
        <div className="animate-rise w-full min-w-0 max-w-full">
          <span className="pill pill-purple">{eyebrow}</span>
          <h1 className="type-display-page mt-5 max-w-full text-[var(--ink)] md:max-w-3xl">{title}</h1>
          <p className="type-lead mt-5 max-w-full break-words md:mt-6 md:max-w-xl">{body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {primaryHref.startsWith("http") ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {primaryLabel ?? t.nav.trial}
              </a>
            ) : (
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel ?? t.nav.trial}
              </Link>
            )}
            {secondaryHref.startsWith("http") ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {secondaryLabel ?? t.nav.demo}
              </a>
            ) : (
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel ?? t.nav.demo}
              </Link>
            )}
          </div>
        </div>

        {image ? (
          <div className="animate-rise-2 relative min-w-0">
            <div className="relative overflow-hidden rounded-[22px] shadow-[0_24px_60px_rgba(16,18,35,0.16)] md:rounded-[28px]">
              <div className="relative aspect-[16/10] sm:aspect-[16/11]">
                <Image
                  src={image}
                  alt={imageAlt || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-rise-2 hidden min-w-0 lg:block" aria-hidden>
            <div className="rounded-[28px] border border-[var(--border)] bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <div className="h-2 w-24 rounded-full bg-[var(--primary-soft)]" />
              <div className="mt-5 space-y-3">
                <div className="h-3 w-full rounded-full bg-[var(--page-soft)]" />
                <div className="h-3 w-5/6 rounded-full bg-[var(--page-soft)]" />
                <div className="h-3 w-4/5 rounded-full bg-[var(--page-soft)]" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[var(--primary-soft)] p-4">
                  <div className="h-2 w-10 rounded-full bg-[var(--primary)]/30" />
                  <div className="mt-3 h-6 w-16 rounded-lg bg-[var(--primary)]/20" />
                </div>
                <div className="rounded-2xl bg-[var(--page-soft)] p-4">
                  <div className="h-2 w-10 rounded-full bg-[var(--border)]" />
                  <div className="mt-3 h-6 w-16 rounded-lg bg-[var(--border)]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
