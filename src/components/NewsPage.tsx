"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconCheck, LogoMark } from "@/components/Icons";
import { SiteShell } from "@/components/SiteShell";
import { newsPosts, pick, type Article } from "@/lib/content";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

const FILTERS = ["All updates", "Announcement"] as const;

function NewsCover({ post }: { post: Article }) {
  const { locale } = useLocale();
  return (
    <div className="np-cover" aria-hidden>
      <div className="np-cover-rings" />
      <p className="np-cover-tag">{pick(post.coverLabel ?? post.tag, locale)}</p>
      <h3 className="np-cover-title">{pick(post.title, locale)}</h3>
      <div className="np-cover-foot">
        <span className="np-cover-brand">
          <LogoMark className="h-7 w-7 brightness-0 invert" />
          <span>
            <span className="block text-[0.8rem] font-semibold leading-tight text-white">
              {brand.short}
            </span>
            <span className="block text-[0.65rem] text-white/65">{brand.tagline}</span>
          </span>
        </span>
        <span className="np-cover-pill">News and Updates</span>
      </div>
    </div>
  );
}

function FeaturedUpdate({ post }: { post: Article }) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <article className="np-featured">
      <Link href={`/news/${post.slug}`} className="np-featured-media">
        <NewsCover post={post} />
      </Link>
      <div className="np-featured-body">
        <div className="np-featured-meta">
          <span className="np-badge">{pick(post.tag, locale)}</span>
          <span className="np-featured-date">{post.fullDate ?? post.date}</span>
        </div>
        <h2 className="np-featured-title">
          <Link href={`/news/${post.slug}`}>{pick(post.title, locale)}</Link>
        </h2>
        <p className="np-featured-excerpt">{pick(post.excerpt, locale)}</p>
        <Link href={`/news/${post.slug}`} className="np-featured-cta">
          {en ? "Read the update" : "اقرأ التحديث"}
        </Link>
      </div>
    </article>
  );
}

function TimelineItem({ post }: { post: Article }) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <li className="np-timeline-item">
      <div className="np-date-chip" aria-hidden>
        <span className="np-date-day">{post.day ?? post.date.split(" ")[0]}</span>
        <span className="np-date-month">{post.monthLabel ?? post.date}</span>
      </div>
      <article className="np-card">
        <span className="np-badge is-light">{pick(post.tag, locale)}</span>
        <h3 className="np-card-title">
          <Link href={`/news/${post.slug}`}>{pick(post.title, locale)}</Link>
        </h3>
        <p className="np-card-excerpt">{pick(post.excerpt, locale)}</p>
        <Link href={`/news/${post.slug}`} className="np-card-link">
          {en ? "Read the update" : "اقرأ التحديث"} <span aria-hidden>→</span>
        </Link>
      </article>
    </li>
  );
}

function SeeItLive() {
  const { locale } = useLocale();
  const en = locale === "en";

  return (
    <section className="np-live">
      <div className="np-live-grid shell">
        <div className="np-live-copy">
          <span className="np-live-pill">
            <span aria-hidden />
            {en ? "See it live" : "شاهده مباشرة"}
          </span>
          <h2 className="np-live-title">
            {en
              ? "Watch the platform answer a real customer, end to end"
              : "شاهد المنصة ترد على عميل حقيقي من البداية للنهاية"}
          </h2>
          <p className="np-live-body">
            {en
              ? "A 30-minute demo on your own numbers: a question answered, a booking taken and a handover to a person, in English or Arabic."
              : "عرض لمدة 30 دقيقة على أرقامك: سؤال يُجاب وحجز يُؤخذ وتسليم لشخص، بالعربية أو الإنجليزية."}
          </p>
          <div className="np-live-actions">
            <Link href={routes.trial} className="np-live-btn-primary">
              {en ? "Start Free Trial" : "ابدأ تجربة مجانية"}
            </Link>
            <Link href={routes.demo} className="np-live-btn-secondary">
              {en ? "Book a Free Demo" : "احجز عرضًا مجانيًا"}
            </Link>
          </div>
          <ul className="np-live-checks">
            {(en
              ? [
                  "Sign up now and start free trial with 50 credits at $0 setup cost.",
                  "Upgrade only when you are ready",
                  "People step in with one click",
                ]
              : [
                  "سجّل الآن وابدأ تجربة مجانية بـ 50 رصيدًا بدون رسوم إعداد.",
                  "رقِّ عندما تكون جاهزًا فقط",
                  "يتدخل الأشخاص بنقرة واحدة",
                ]
            ).map((line) => (
              <li key={line}>
                <IconCheck className="h-4 w-4 shrink-0 text-[#34d399]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="np-live-visual" aria-hidden>
          <div className="np-chat is-customer">
            <div className="np-chat-head">
              <span className="np-chat-avatar is-customer">P</span>
              <span>{en ? "CUSTOMER, 10:42 PM" : "عميل، 10:42 م"}</span>
            </div>
            <p>
              {en
                ? "Hi, do you have a table for four tomorrow at eight?"
                : "مرحبًا، هل لديكم طاولة لأربعة غدًا في الثامنة؟"}
            </p>
          </div>
          <div className="np-chat is-agent">
            <div className="np-chat-head">
              <span className="np-chat-avatar is-agent">✦</span>
              <span>{en ? `${brand.short.toUpperCase()}, INSTANT` : `${brand.short}، فوري`}</span>
            </div>
            <p>
              {en
                ? "Yes, a table for four at 8:00 pm tomorrow is available. Shall I book it under your name?"
                : "نعم، طاولة لأربعة في الثامنة مساء غدًا متاحة. هل أحجزها باسمك؟"}
            </p>
          </div>
          <div className="np-chat is-done">
            <div className="np-chat-head">
              <span className="np-chat-avatar is-done">
                <IconCheck className="h-3.5 w-3.5" />
              </span>
              <span>{en ? "Table booked and confirmed" : "الطاولة محجوزة ومؤكدة"}</span>
            </div>
            <p>
              {en
                ? "Reservation sent to the floor manager, reminder scheduled for 5 pm."
                : "أُرسل الحجز لمدير القاعة، وتذكير مجدول للساعة 5 مساءً."}
            </p>
          </div>
          <div className="np-channels">
            {(en
              ? ["WhatsApp", "Voice", "Web chat", "Instagram", "Email"]
              : ["واتساب", "صوت", "دردشة", "إنستغرام", "بريد"]
            ).map((ch) => (
              <span key={ch}>{ch}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All updates");

  const filtered = useMemo(() => {
    if (filter === "All updates") return newsPosts;
    return newsPosts.filter((post) => post.tag.en === "Announcement");
  }, [filter]);

  const featured = filtered[0] ?? newsPosts[0];
  const list = filtered;

  const years = useMemo(() => {
    const map = new Map<string, Article[]>();
    for (const post of list) {
      const y = post.year ?? "2026";
      const arr = map.get(y) ?? [];
      arr.push(post);
      map.set(y, arr);
    }
    return [...map.entries()];
  }, [list]);

  return (
    <SiteShell>
      <section className="np-hero">
        <div className="shell">
          <nav className="np-crumbs" aria-label={en ? "Breadcrumb" : "مسار التنقل"}>
            <Link href={routes.home}>{en ? "Home" : "الرئيسية"}</Link>
            <span aria-hidden>/</span>
            <span>{t.nav.news}</span>
          </nav>

          <span className="np-pill">
            <span aria-hidden />
            {t.nav.news}
          </span>

          <h1 className="np-hero-title">
            {en
              ? `Company news and product updates from ${brand.short}`
              : `أخبار الشركة وتحديثات المنتج من ${brand.short}`}
          </h1>
          <p className="np-hero-body">
            {en
              ? "Announcements, milestones, partnerships and product releases from the team building the AI customer experience platform. Latest first."
              : "إعلانات ومعالم وشراكات وإصدارات منتج من الفريق الذي يبني منصة تجربة العملاء بالذكاء الاصطناعي. الأحدث أولًا."}
          </p>

          <div className="np-filters" role="tablist" aria-label={en ? "Filters" : "تصفية"}>
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`np-filter ${filter === item ? "is-active" : ""}`}
                onClick={() => setFilter(item)}
              >
                {en ? item : item === "All updates" ? "كل التحديثات" : "إعلان"}
              </button>
            ))}
          </div>

          {featured ? <FeaturedUpdate post={featured} /> : null}
        </div>
      </section>

      <section className="np-feed">
        <div className="shell np-feed-grid">
          <div>
            <h2 className="np-feed-title">{en ? "All updates" : "كل التحديثات"}</h2>

            {years.map(([year, posts]) => (
              <div key={year} className="np-year-block">
                <p className="np-year">{year}</p>
                <ol className="np-timeline">
                  {posts.map((post) => (
                    <TimelineItem key={post.slug} post={post} />
                  ))}
                </ol>
              </div>
            ))}

            {!list.length ? (
              <p className="np-empty">{en ? "No updates in this filter." : "لا تحديثات في هذا التصفية."}</p>
            ) : null}
          </div>

          <aside className="np-aside">
            <div className="np-aside-card">
              <p className="np-aside-label">{en ? "About Hello Techo" : "عن Hello Techo"}</p>
              <p className="np-aside-body">
                {en
                  ? "The AI customer experience platform for hotels, clinics, restaurants and multi-branch groups — deployed, governed and managed."
                  : "منصة تجربة العملاء بالذكاء الاصطناعي للفنادق والعيادات والمطاعم والمجموعات متعددة الفروع — منشورة ومحكومة ومُدارة."}
              </p>
              <Link href="/#why-os" className="np-aside-link">
                {en ? "Why a platform" : "لماذا منصة"}
              </Link>
            </div>

            <div className="np-aside-card">
              <p className="np-aside-label">{en ? "Press and media" : "الصحافة والإعلام"}</p>
              <p className="np-aside-body">
                {en ? (
                  <>
                    For interviews and logo packs, email{" "}
                    <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                  </>
                ) : (
                  <>
                    للمقابلات وحزم الشعارات راسل{" "}
                    <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                  </>
                )}
              </p>
              <Link href={routes.team} className="np-aside-link">
                {en ? "Meet the team" : "تعرّف على الفريق"}
              </Link>
            </div>

            <div className="np-aside-card">
              <p className="np-aside-label">{en ? "Follow along" : "تابعنا"}</p>
              <p className="np-aside-body">
                {en
                  ? "Updates land here first, and on LinkedIn."
                  : "التحديثات تظهر هنا أولًا، وعلى لينكدإن."}
              </p>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="np-aside-link"
              >
                {en ? `${brand.short} on LinkedIn` : `${brand.short} على لينكدإن`}
              </a>
            </div>

            <div className="np-aside-card">
              <p className="np-aside-label">RSS</p>
              <p className="np-aside-body">
                {en
                  ? "Subscribe to the news feed or the blog feed."
                  : "اشترك في موجز الأخبار أو موجز المدونة."}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SeeItLive />
    </SiteShell>
  );
}
