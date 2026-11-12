"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconChevron, IconMenu, IconWhatsApp, LogoMark } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

export function PromoBar() {
  const { t } = useLocale();
  return (
    <div className="promo-bar">
      <div className="shell promo-bar-inner">
        <p className="promo-bar-text">
          <span className="promo-bar-dot" aria-hidden />
          <span className="truncate sm:hidden">{t.promoShort}</span>
          <span className="hidden sm:inline">{t.promo}</span>
        </p>
        <Link href={routes.trial} className="promo-bar-cta">
          {t.promoCta}
        </Link>
      </div>
    </div>
  );
}

function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.875rem] font-medium text-[var(--muted)] hover:bg-[var(--page-soft)]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <IconChevron className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute start-0 top-[calc(100%+8px)] z-50 min-w-[280px] rounded-2xl border border-[var(--border)] bg-white p-2 shadow-[var(--shadow-soft)]">
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="shell flex h-16 min-w-0 items-center gap-2 sm:h-[72px] sm:gap-3">
        <Link href={routes.home} className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-2.5">
          <LogoMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[14px] font-semibold tracking-tight text-[var(--ink)] sm:text-[15px]">
              {brand.short}
            </span>
            <span className="hidden text-[11px] text-[var(--soft)] sm:block">{t.tagline}</span>
          </span>
        </Link>

        <nav className="ms-2 hidden flex-1 items-center justify-center gap-0 xl:flex">
          <Link href={routes.pricing} className="nav-link">
            {t.nav.pricing}
          </Link>
          <Link href={routes.useCases} className="nav-link">
            {t.nav.useCases}
          </Link>
          <NavDropdown label={t.nav.industries}>
            {t.nav.industryItems.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
                <span className="block text-sm font-semibold text-[var(--ink)]">{item.title}</span>
                <span className="mt-0.5 block text-xs text-[var(--soft)]">{item.desc}</span>
              </Link>
            ))}
          </NavDropdown>
          <Link href={routes.faq} className="nav-link">
            {t.nav.faq}
          </Link>
          <Link href={routes.team} className="nav-link">
            {t.nav.team}
          </Link>
          <NavDropdown label={t.nav.resources}>
            <Link href={routes.blog} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.blog}</span>
              <span className="mt-0.5 block text-xs text-[var(--soft)]">{t.nav.blogDesc}</span>
            </Link>
            <Link href={routes.news} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.news}</span>
              <span className="mt-0.5 block text-xs text-[var(--soft)]">{t.nav.newsDesc}</span>
            </Link>
          </NavDropdown>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="lang-switch flex h-9 items-center rounded-full border border-[var(--border)] bg-[var(--page-soft)] p-0.5 sm:h-[42px]">
            <button
              type="button"
              className={`h-8 rounded-full px-2 text-[12px] font-medium transition sm:h-9 sm:px-3 sm:text-[13px] ${
                locale === "en" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-ar h-8 rounded-full px-2 text-[12px] font-medium transition sm:h-9 sm:px-3 sm:text-[13px] ${
                locale === "ar" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("ar")}
              aria-label={t.langAr}
            >
              العربية
            </button>
          </div>

          <a
            href={routes.talk}
            target="_blank"
            rel="noopener noreferrer"
            className="header-talk !hidden lg:!inline-flex"
          >
            <IconWhatsApp className="h-4 w-4 text-[#25d366]" />
            {t.nav.talk}
          </a>
          <Link href={routes.trial} className="btn-primary !hidden !min-h-10 !px-4 !text-[0.8125rem] lg:!inline-flex">
            {t.nav.trial}
          </Link>
          <Link href={routes.login} className="btn-secondary !hidden !min-h-10 !px-4 !text-[0.8125rem] lg:!inline-flex">
            {t.nav.login}
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--ink)] sm:h-10 sm:w-10 xl:hidden"
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-white xl:hidden">
          <div className="shell flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-3">
            {[
              [routes.pricing, t.nav.pricing],
              [routes.useCases, t.nav.useCases],
              [routes.team, t.nav.team],
              [routes.blog, t.nav.blog],
              [routes.news, t.nav.news],
              [routes.faq, t.nav.faq],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] hover:bg-[var(--page-soft)]"
              >
                {label}
              </Link>
            ))}
            <a
              href={routes.talk}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] hover:bg-[var(--page-soft)]"
            >
              {t.nav.talk}
            </a>
            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-[var(--soft)]">
              {t.nav.industries}
            </p>
            {t.nav.industryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 hover:bg-[var(--page-soft)]"
              >
                <span className="block text-sm font-semibold text-[var(--ink)]">{item.title}</span>
                <span className="block text-xs text-[var(--soft)]">{item.desc}</span>
              </Link>
            ))}
            <Link href={routes.trial} onClick={() => setMenuOpen(false)} className="btn-primary mt-2">
              {t.nav.trial}
            </Link>
            <Link href={routes.demo} onClick={() => setMenuOpen(false)} className="btn-secondary mt-1">
              {t.nav.demo}
            </Link>
            <Link href={routes.login} onClick={() => setMenuOpen(false)} className="btn-secondary mt-1">
              {t.nav.login}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
