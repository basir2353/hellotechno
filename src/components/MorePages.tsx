"use client";

import Link from "next/link";
import { useState } from "react";
import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import type { Article } from "@/lib/content";
import { pick } from "@/lib/content";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

function ShellSection({ children, soft = false }: { children: React.ReactNode; soft?: boolean }) {
  return (
    <section className={`section ${soft ? "section-soft" : "bg-white"}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function PartnershipsPage() {
  const { locale } = useLocale();
  const en = locale === "en";
  const [sent, setSent] = useState(false);
  const paths = en
    ? [
        ["01", "Referral", "You make the introduction. Hello Techo qualifies, demos and supports the account."],
        ["02", "Reseller", "You sell Hello Techo to operators you already work with, on the same four plans."],
        ["03", "OEM", "You embed the customer-experience layer inside a product you already ship."],
      ]
    : [
        ["01", "إحالة", "تعرّفنا على المشغّل. Hello Techo تؤهل وتعرض وتدعم الحساب."],
        ["02", "إعادة بيع", "تبيع Hello Techo لمشغّلين تعمل معهم، على الخطط الأربع نفسها."],
        ["03", "دمج", "تضمّن طبقة تجربة العملاء داخل منتج تشحنه أصلًا."],
      ];

  return (
    <SiteShell>
      <PageHero
        eyebrow={en ? "Partner programme · GCC" : "برنامج الشراكة · الخليج"}
        title={en ? "Three ways to build with Hello Techo." : "ثلاث طرق للبناء مع Hello Techo."}
        body={
          en
            ? "Refer, resell or embed the AI customer-experience platform. Tell us which path fits and we reply from hello@hellotecho.example."
            : "أحِل أو أعد البيع أو ادمج منصة تجربة العملاء. أخبرنا أي مسار يناسبك ونرد من hello@hellotecho.example."
        }
        image={images.team}
        primaryHref={routes.talk}
        primaryLabel={en ? "Register interest" : "سجّل الاهتمام"}
        secondaryHref={routes.demo}
      />
      <ShellSection soft>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map(([index, title, body]) => (
            <article key={title} className="card p-6">
              <p className="section-label">{index}</p>
              <h2 className="type-h3 mt-3 !text-[1.25rem]">{title}</h2>
              <p className="type-body mt-2">{body}</p>
            </article>
          ))}
        </div>
        <form
          className="card mx-auto mt-8 grid max-w-xl gap-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="type-h3 !text-[1.25rem]">{en ? "Register interest" : "سجّل الاهتمام"}</h2>
          {sent ? (
            <p className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--mint-text)]">
              {en ? `Received. We will reply from ${brand.email}.` : `تم الاستلام. سنرد من ${brand.email}.`}
            </p>
          ) : null}
          <input required placeholder={en ? "Name" : "الاسم"} className="min-h-11 rounded-xl border border-[var(--border)] px-3" />
          <input required type="email" placeholder={en ? "Work email" : "البريد"} className="min-h-11 rounded-xl border border-[var(--border)] px-3" />
          <select className="min-h-11 rounded-xl border border-[var(--border)] px-3" defaultValue="referral">
            <option value="referral">{paths[0][1]}</option>
            <option value="reseller">{paths[1][1]}</option>
            <option value="oem">{paths[2][1]}</option>
          </select>
          <button className="btn-primary" type="submit">{en ? "Send" : "إرسال"}</button>
        </form>
      </ShellSection>
    </SiteShell>
  );
}

export function ContactPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <PageHero
        eyebrow={en ? "Contact" : "تواصل"}
        title={en ? "Book a demo" : "احجز عرضًا"}
        body={t.cta.body}
        primaryHref={routes.demo}
        secondaryHref={routes.trial}
      />
      <ShellSection soft>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-sm text-[var(--muted)]">
            <p><span className="block font-semibold text-[var(--ink)]">{t.footer.dubai}</span></p>
            <p><span className="block font-semibold text-[var(--ink)]">{t.footer.bahrain}</span></p>
            <a className="font-semibold text-[var(--primary)]" href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
          <form
            className="card grid gap-3 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <p className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm text-[var(--mint-text)]">
                {en ? `Message received. We reply from ${brand.email}.` : `وصلت الرسالة. نرد من ${brand.email}.`}
              </p>
            ) : null}
            <input required placeholder={en ? "Name" : "الاسم"} className="min-h-11 rounded-xl border border-[var(--border)] px-3" />
            <input required type="email" placeholder={en ? "Work email" : "البريد"} className="min-h-11 rounded-xl border border-[var(--border)] px-3" />
            <textarea required placeholder={en ? "How can Hello Techo help?" : "كيف تساعد Hello Techo؟"} className="min-h-28 rounded-xl border border-[var(--border)] px-3 py-2" />
            <button className="btn-primary" type="submit">{en ? "Send" : "إرسال"}</button>
          </form>
        </div>
      </ShellSection>
    </SiteShell>
  );
}

export function ArticlePage({ post, kind }: { post: Article; kind: "blog" | "news" }) {
  const { locale } = useLocale();
  const back = kind === "blog" ? routes.blog : routes.news;
  return (
    <SiteShell>
      <article className="section bg-white">
        <div className="shell max-w-3xl">
          <Link href={back} className="text-sm font-semibold text-[var(--primary)]">
            {locale === "ar" ? "رجوع" : "Back"}
          </Link>
          <p className="section-label mt-6 !text-[var(--primary)]">{pick(post.tag, locale)}</p>
          <h1 className="type-display-page mt-3">{pick(post.title, locale)}</h1>
          <p className="type-small mt-3">{post.date}</p>
          <div className="mt-8 space-y-4">
            {post.body.map((paragraph) => (
              <p key={paragraph.en} className="type-lead">
                {pick(paragraph, locale)}
              </p>
            ))}
          </div>
        </div>
      </article>
      <Cta />
    </SiteShell>
  );
}
