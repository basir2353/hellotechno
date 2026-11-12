"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import {
  EveryPlan,
  PlanCompare,
  Pricing,
  PricingEnterprise,
  PricingFaq,
  PricingHero,
  PricingUnsure,
} from "@/components/Pricing";
import { SiteShell } from "@/components/SiteShell";
import { pick, playbookMeta } from "@/lib/content";
import type { IndustryId } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { brand, images, industryPages, routes } from "@/lib/site";

function Section({
  children,
  className = "bg-white",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`section ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function PricingPage() {
  return (
    <SiteShell>
      <PricingHero />
      <Pricing hideIntro />
      <EveryPlan />
      <PricingUnsure />
      <PlanCompare />
      <PricingEnterprise />
      <PricingFaq />
    </SiteShell>
  );
}

export function UseCasesPage() {
  const { t } = useLocale();
  return (
    <SiteShell>
      <PageHero
        eyebrow={t.platform.label}
        title={t.platform.title}
        body={t.platform.body}
        image={images.useCases}
      />
      <Section className="section-soft">
        <div className="grid gap-4 md:grid-cols-2 xl:gap-5">
          {t.platform.points.map((point, index) => (
            <article key={point.title} className="card p-5 md:p-6">
              <p className="section-label">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="type-h3 mt-3 !text-[1.125rem]">{point.title}</h2>
              <p className="type-body mt-2">{point.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Cta />
    </SiteShell>
  );
}

export function IndustriesIndexPage() {
  const { t, locale } = useLocale();
  return (
    <SiteShell>
      <PageHero
        eyebrow={t.industries.label}
        title={t.industries.title}
        body={t.industries.body}
        image={images.hospitality}
      />
      <Section className="section-soft">
        <div className="grid gap-5 md:grid-cols-2">
          {industryPages.map((page) => {
            const copy = locale === "ar" ? page.ar : page.en;
            return (
              <Link
                key={page.slug}
                href={page.href}
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(16,18,35,0.1)]"
              >
                <div className="relative aspect-[16/9]">
                  <Image src={page.image} alt={copy.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="560px" />
                </div>
                <div className="p-5 md:p-6">
                  <p className="section-label !text-[var(--primary)]">{copy.focus}</p>
                  <h2 className="type-h3 mt-2 !text-[1.25rem]">{copy.title}</h2>
                  <p className="type-body mt-2">{copy.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
      <Cta />
    </SiteShell>
  );
}

export function IndustryDetailPage({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const page = industryPages.find((item) => item.slug === slug);
  const tabs = t.industries.tabs.filter((item) => {
    if (slug === "hospitality") return item.id === "hospitality";
    if (slug === "aesthetics-dental") return item.id === "clinics";
    if (slug === "restaurants-cafes-bakeries") return item.id === "dining" || item.id === "bakeries";
    if (slug === "smb") return item.id === "smb";
    return false;
  });
  const tab = tabs[0] ?? t.industries.tabs[0];
  const copy = page
    ? locale === "ar"
      ? page.ar
      : page.en
    : { title: tab.name, focus: tab.focus, summary: tab.win };

  return (
    <SiteShell>
      <PageHero
        eyebrow={copy.focus}
        title={copy.title}
        body={"summary" in copy ? copy.summary : tab.win}
        image={page?.image ?? images.hospitality}
        primaryHref={routes.demo}
        primaryLabel={t.hero.live}
        secondaryHref={routes.trial}
        secondaryLabel={t.nav.trial}
      />
      {tabs.map((item) => {
        const meta = playbookMeta[item.id as IndustryId];
        return (
          <Section key={item.id}>
            <p className="text-sm font-medium text-[var(--primary)]">{item.focus}</p>
            <h2 className="type-h2 mt-2">{item.name}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="card p-5">
                <p className="section-label">{t.industries.pain}</p>
                <p className="type-body mt-2">{item.pain}</p>
              </article>
              <article className="card p-5">
                <p className="section-label">{t.industries.win}</p>
                <p className="type-body mt-2">{item.win}</p>
              </article>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {item.cases.map((useCase, index) => (
                <article key={useCase.title} className="card p-5">
                  <h3 className="type-h3">{useCase.title}</h3>
                  <p className="type-body mt-2">{useCase.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.scenario.chips.map((chip) => (
                      <span key={chip} className="rounded-full bg-[var(--primary-soft)] px-2 py-0.5 text-[0.65rem] font-semibold text-[var(--primary)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                  {meta[index] ? (
                    <p className="mt-3 text-xs text-[var(--muted)]">
                      {meta[index].systems} · {locale === "ar" ? meta[index].sla.ar : meta[index].sla.en}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>
        );
      })}
      <Cta />
    </SiteShell>
  );
}

export function FaqPage() {
  const { t } = useLocale();
  return (
    <SiteShell>
      <PageHero eyebrow={t.faq.label} title={t.faq.title} body={t.cta.body} />
      <Faq hideIntro />
      <Cta />
    </SiteShell>
  );
}

export function DemoPage() {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <PageHero
        eyebrow={t.nav.demo}
        title={t.cta.title}
        body={t.cta.body}
        image={images.dashboard}
        primaryHref={routes.trial}
        secondaryHref={routes.pricing}
        primaryLabel={t.nav.trial}
        secondaryLabel={t.nav.pricing}
      />
      <Section className="section-soft">
        <form
          className="card mx-auto grid w-full max-w-xl gap-4 p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <p className="section-label">{t.nav.demo}</p>
            <h2 className="type-h2 mt-2 !text-[1.5rem]">{locale === "ar" ? "احجز عرضًا مجانيًا" : "Book a free demo"}</h2>
          </div>
          {sent ? (
            <p className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--mint-text)]">
              {locale === "ar"
                ? `تم استلام الطلب. سنرسل الأوقات من ${brand.email}.`
                : `Request received. We will send times from ${brand.email}.`}
            </p>
          ) : null}
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "الاسم" : "Name"}</span>
            <input className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "البريد" : "Work email"}</span>
            <input type="email" className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "الشركة" : "Company"}</span>
            <input className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
          </label>
          <button type="submit" className="btn-primary mt-2">
            {t.nav.demo}
          </button>
          <p className="text-center text-xs text-[var(--soft)]">{t.cta.meta}</p>
        </form>
      </Section>
    </SiteShell>
  );
}

export function TrialPage() {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <PageHero
        eyebrow={t.nav.trial}
        title={locale === "ar" ? "ابدأ بـ 50 رصيدًا مجانًا" : "Start with 50 free credits"}
        body={t.hero.offer}
        image={images.useCases}
        primaryHref={routes.demo}
        secondaryHref={routes.pricing}
        primaryLabel={t.nav.demo}
        secondaryLabel={t.nav.pricing}
      />
      <Section className="section-soft">
        <form
          className="card mx-auto grid w-full max-w-xl gap-4 p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <p className="section-label">{t.nav.trial}</p>
            <h2 className="type-h2 mt-2 !text-[1.5rem]">
              {locale === "ar" ? "أنشئ حسابك" : "Create your account"}
            </h2>
          </div>
          {sent ? (
            <p className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--mint-text)]">
              {locale === "ar"
                ? "الحساب جاهز للتجربة. 50 رصيدًا بدون رسوم إعداد."
                : "Your trial is ready. 50 credits at $0 setup."}
            </p>
          ) : null}
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "البريد" : "Work email"}</span>
            <input type="email" className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "كلمة المرور" : "Password"}</span>
            <input type="password" className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
          </label>
          <button type="submit" className="btn-primary mt-2">
            {t.nav.trial}
          </button>
          <p className="text-center text-xs text-[var(--soft)]">
            {locale === "ar" ? "بدون رسوم إعداد. يمكنك الإلغاء في أي وقت." : "$0 setup. Cancel anytime."}
          </p>
        </form>
      </Section>
    </SiteShell>
  );
}

export function LoginPage() {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[#fbfbfe] py-14 md:py-20">
        <div className="hero-arcs" aria-hidden />
        <div className="shell relative">
          <form
            className="card mx-auto grid w-full max-w-md gap-4 p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <p className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--mint-text)]">
                {locale === "ar" ? "تم التحقق من النموذج. حساب Hello Techo محلي على هذا الموقع." : "Form checked. This Hello Techo sign-in stays on this site."}
              </p>
            ) : null}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-bold text-white">
                HT
              </div>
              <h1 className="type-h2 mt-4 !text-[1.75rem]">{t.nav.login}</h1>
              <p className="type-small mt-1">{brand.name}</p>
            </div>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "البريد" : "Email"}</span>
              <input type="email" className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-[var(--ink)]">{locale === "ar" ? "كلمة المرور" : "Password"}</span>
              <input type="password" className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 outline-none ring-[var(--primary)] focus:ring-2" required />
            </label>
            <button type="submit" className="btn-primary">
              {t.nav.login}
            </button>
            <Link href={routes.trial} className="text-center text-sm font-semibold text-[var(--primary)]">
              {t.nav.trial}
            </Link>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
