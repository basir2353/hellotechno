"use client";

import Link from "next/link";
import { IconChat, IconMail, IconPhone, IconPin, IconWhatsApp, LogoMark } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const partners = [
  { src: images.partnerMicrosoft, label: "Microsoft for Startups" },
  { src: images.partnerAws, label: "AWS for Startups" },
  { src: images.partnerGcp, label: "GCP for Startups" },
  { src: images.partnerAnthropic, label: "Anthropic Claude for Startups" },
  { src: images.partnerAtlassian, label: "Atlassian for Startups" },
] as const;

export function Footer() {
  const { t, locale, setLocale } = useLocale();
  const en = locale === "en";

  const platform = [
    [routes.pricing, en ? "Pricing Plans" : "خطط الأسعار"],
    ["/#why-os", en ? "Why a Platform" : "لماذا منصة"],
    [routes.useCases, t.nav.useCases],
    ["/#product", en ? "Dashboard" : "لوحة التحكم"],
    ["/#numbers", en ? "Numbers" : "الأرقام"],
    ["/#trust", en ? "Trust" : "الثقة"],
    [routes.faq, t.nav.faq],
  ] as const;

  const industries = t.nav.industryItems.map((item) => [item.href, item.title] as const);

  const company = [
    [routes.trial, en ? "Start Free Trial" : "ابدأ تجربة مجانية"],
    [routes.demo, en ? "Book a Free Demo" : "احجز عرضًا مجانيًا"],
    [routes.talk, en ? "Contact" : "تواصل"],
    [routes.partnerships, en ? "Partnerships" : "الشراكات"],
    [routes.blog, t.nav.blog],
    [routes.news, t.nav.news],
  ] as const;

  const legal = [
    [routes.privacy, en ? "Privacy Policy" : "سياسة الخصوصية"],
    [routes.terms, en ? "Terms & Conditions" : "الشروط والأحكام"],
  ] as const;

  return (
    <>
      <footer className="site-footer">
        <div className="shell site-footer-grid">
          <div className="site-footer-brand">
            <Link href={routes.home} className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="text-[1.05rem] font-semibold tracking-tight text-white">{brand.short}</span>
            </Link>

            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-[#aeb4c8]">
              {en
                ? "The AI customer experience platform. Deployed, governed, managed."
                : "منصة تجربة العملاء بالذكاء الاصطناعي. تُنشر وتُحكم وتُدار."}
            </p>

            <div className="mt-6 space-y-5 text-sm text-[#aeb4c8]">
              <div className="flex gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8b93ad]" />
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
                    {en ? "Dubai, UAE" : "دبي، الإمارات"}
                  </p>
                  <p className="mt-1 max-w-xs leading-relaxed">
                    {en ? "Dubai, United Arab Emirates" : "دبي، الإمارات العربية المتحدة"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8b93ad]" />
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
                    {en ? "Bahrain" : "البحرين"}
                  </p>
                  <p className="mt-1 max-w-xs leading-relaxed">
                    {en ? "Manama, Bahrain" : "المنامة، البحرين"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <nav className="site-footer-nav" aria-label={en ? "Footer" : "تذييل"}>
            <div>
              <p className="site-footer-heading">{en ? "Platform" : "المنصة"}</p>
              <ul className="site-footer-links">
                {platform.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="site-footer-heading">{t.nav.industries}</p>
              <ul className="site-footer-links">
                {industries.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="site-footer-heading">{en ? "Company" : "الشركة"}</p>
              <ul className="site-footer-links">
                {company.map(([href, label]) => (
                  <li key={href}>
                    {href.startsWith("http") ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="site-footer-heading">{en ? "Legal" : "قانوني"}</p>
              <ul className="site-footer-links">
                {legal.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="shell site-footer-selected">
          <a className="site-footer-email is-row" href={`mailto:${brand.email}`}>
            <IconMail className="h-4 w-4 shrink-0" />
            {brand.email}
          </a>
          <p className="site-footer-selected-label">{en ? "Selected for" : "مختارة لـ"}</p>
          <ul className="site-footer-partners">
            {partners.map((partner) => (
              <li key={partner.label} className="site-footer-partner">
                <span className="site-footer-partner-mark">
                  {/* native img keeps SVG logos small/consistent in footer cards */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={partner.src} alt="" className="site-footer-partner-logo" />
                </span>
                <span className="site-footer-partner-name">{partner.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell site-footer-bottom">
          <p className="site-footer-rights">
            {en ? `© 2026 ${brand.short}. All rights reserved.` : `© 2026 ${brand.short}. جميع الحقوق محفوظة.`}
          </p>
          <div className="site-footer-socials" aria-label={en ? "Social" : "التواصل"}>
            {[
              ["LinkedIn", "in"],
              ["YouTube", "▶"],
              ["Instagram", "ig"],
              ["Facebook", "f"],
              ["X", "𝕏"],
            ].map(([label, glyph]) => (
              <span key={label} className="site-footer-social" title={label} aria-label={label}>
                {glyph}
              </span>
            ))}
          </div>
          <div className="site-footer-lang">
            <button
              type="button"
              className={locale === "en" ? "is-active" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-ar ${locale === "ar" ? "is-active" : ""}`}
              onClick={() => setLocale("ar")}
            >
              العربية
            </button>
          </div>
        </div>
      </footer>

      <div
        className="float-stack !hidden min-[361px]:!flex"
        aria-label={en ? "Contact shortcuts" : "اختصارات التواصل"}
      >
        <a
          href={routes.talk}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn bg-[#25d366]"
          aria-label={en ? "WhatsApp" : "واتساب"}
        >
          <IconWhatsApp className="h-5 w-5" />
        </a>
        <Link href={routes.demo} className="float-btn bg-[var(--primary)]" aria-label={en ? "Book a demo" : "احجز عرضًا"}>
          <IconChat className="h-5 w-5" />
        </Link>
        <div className="float-stack-row">
          <Link href={routes.trial} className="float-trial">
            <span className="float-trial-dot" aria-hidden />
            {en ? "Start Free Trial" : "ابدأ تجربة مجانية"}
          </Link>
          <a
            href={routes.talk}
            target="_blank"
            rel="noopener noreferrer"
            className="float-btn bg-[#3730a3]"
            aria-label={en ? "Contact" : "تواصل"}
          >
            <IconPhone className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="sticky-mobile-cta">
        <div className="sticky-mobile-cta-row">
          <Link href={routes.trial} className="btn-primary sticky-cta-btn">
            {locale === "ar" ? "تجربة" : "Free trial"}
          </Link>
          <Link href={routes.demo} className="btn-secondary sticky-cta-btn">
            {locale === "ar" ? "عرض" : "Demo"}
          </Link>
        </div>
      </div>
    </>
  );
}
