"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconBuilding, IconSparkle, IconUtensils, LogoMark } from "@/components/Icons";
import { SiteShell } from "@/components/SiteShell";
import { blogPosts, pick, type Article } from "@/lib/content";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

const TOPICS = ["All topics", "Agentic AI", "WhatsApp AI", "AI customer experience"] as const;

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CoverArt({ post, featured }: { post: Article; featured?: boolean }) {
  const { locale } = useLocale();
  const tag = pick(post.tag, locale);

  return (
    <div className={`bp-cover ${featured ? "is-featured" : ""}`} aria-hidden>
      <div className="bp-cover-rings" />
      <p className="bp-cover-tag">{tag}</p>
      <h3 className="bp-cover-title">{pick(post.title, locale)}</h3>
      <div className="bp-cover-foot">
        <span className="bp-cover-brand">
          <LogoMark className="h-7 w-7 brightness-0 invert" />
          <span>
            <span className="block text-[0.8rem] font-semibold leading-tight text-white">
              {brand.short}
            </span>
            <span className="block text-[0.65rem] text-white/70">{brand.tagline}</span>
          </span>
        </span>
        <span className="bp-cover-pill">Blog</span>
      </div>
    </div>
  );
}

function MetaRow({ post }: { post: Article }) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <div className="bp-meta">
      <span className="bp-topic">{pick(post.tag, locale)}</span>
      <span className="bp-date">
        {post.date}
        {" · "}
        {post.readMins} {en ? "min read" : "دقيقة قراءة"}
      </span>
    </div>
  );
}

function FeaturedCard({ post }: { post: Article }) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <article className="bp-featured">
      <Link href={`/blog/${post.slug}`} className="bp-featured-media">
        <CoverArt post={post} featured />
      </Link>
      <div className="bp-featured-body">
        <MetaRow post={post} />
        <h2 className="bp-featured-title">
          <Link href={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
        </h2>
        <p className="bp-excerpt">{pick(post.excerpt, locale)}</p>
        <Link href={`/blog/${post.slug}`} className="bp-read">
          {en ? "Read the article" : "اقرأ المقال"} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

function GridCard({ post }: { post: Article }) {
  const { locale } = useLocale();
  const en = locale === "en";
  return (
    <article className="bp-card">
      <Link href={`/blog/${post.slug}`} className="bp-card-media">
        <CoverArt post={post} />
      </Link>
      <div className="bp-card-body">
        <MetaRow post={post} />
        <h2 className="bp-card-title">
          <Link href={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
        </h2>
        <p className="bp-excerpt">{pick(post.excerpt, locale)}</p>
        <Link href={`/blog/${post.slug}`} className="bp-read">
          {en ? "Read the article" : "اقرأ المقال"} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export function BlogPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All topics");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const tagEn = post.tag.en;
      const topicOk = topic === "All topics" || tagEn === topic;
      if (!topicOk) return false;
      if (!q) return true;
      const hay = `${post.title.en} ${post.title.ar} ${post.excerpt.en} ${post.excerpt.ar} ${tagEn}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, topic]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <SiteShell>
      <section className="bp-hero">
        <div className="shell">
          <nav className="bp-crumbs" aria-label={en ? "Breadcrumb" : "مسار التنقل"}>
            <Link href={routes.home}>{en ? "Home" : "الرئيسية"}</Link>
            <span aria-hidden>/</span>
            <span>{t.nav.blog}</span>
          </nav>

          <span className="bp-pill">
            <span aria-hidden />
            {t.nav.blog}
          </span>

          <h1 className="bp-hero-title">
            {en ? "Insights on AI customer experience" : "رؤى حول تجربة العملاء بالذكاء الاصطناعي"}
          </h1>
          <p className="bp-hero-body">
            {en
              ? "Articles on answering customers over WhatsApp, voice, web chat and Instagram with AI, for hotels, clinics, restaurants, cafes, bakeries and the teams behind them. New articles appear here first."
              : "مقالات عن الرد على العملاء عبر واتساب والصوت والدردشة وإنستغرام بالذكاء الاصطناعي، للفنادق والعيادات والمطاعم والمقاهي والمخابز وفرقها. المقالات الجديدة تظهر هنا أولًا."}
          </p>

          <div className="bp-toolbar">
            <label className="bp-search">
              <IconSearch className="h-4 w-4 shrink-0 text-[var(--soft)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={en ? "Search articles" : "ابحث في المقالات"}
                aria-label={en ? "Search articles" : "ابحث في المقالات"}
              />
            </label>
            <div className="bp-filters" role="tablist" aria-label={en ? "Topics" : "المواضيع"}>
              {TOPICS.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={topic === item}
                  className={`bp-filter ${topic === item ? "is-active" : ""}`}
                  onClick={() => setTopic(item)}
                >
                  {en
                    ? item
                    : item === "All topics"
                      ? "كل المواضيع"
                      : item === "Agentic AI"
                        ? "الذكاء الوكيلي"
                        : item === "WhatsApp AI"
                          ? "واتساب AI"
                          : "تجربة العملاء بالذكاء الاصطناعي"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bp-list">
        <div className="shell">
          {featured ? <FeaturedCard post={featured} /> : null}

          {rest.length ? (
            <div className="bp-grid">
              {rest.map((post) => (
                <GridCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}

          {!filtered.length ? (
            <p className="bp-empty">
              {en ? "No articles match your search." : "لا توجد مقالات مطابقة لبحثك."}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bp-industries">
        <div className="shell">
          <h2 className="bp-industries-title">
            {en ? "See the platform in your industry." : "شاهد المنصة في قطاعك."}
          </h2>
          <div className="bp-industries-grid">
            {[
              {
                href: routes.hospitality,
                Icon: IconBuilding,
                title: en ? "Hospitality" : "الضيافة",
                body: en
                  ? "Hotels, resorts and hospitality groups"
                  : "فنادق ومنتجعات ومجموعات ضيافة",
              },
              {
                href: routes.aesthetics,
                Icon: IconSparkle,
                title: en ? "Aesthetics and Dental" : "التجميل وطب الأسنان",
                body: en
                  ? "Clinics, medspas and dental groups"
                  : "عيادات ومراكز تجميل ومجموعات أسنان",
              },
              {
                href: routes.dining,
                Icon: IconUtensils,
                title: en ? "Restaurants, Cafes and Bakeries" : "المطاعم والمقاهي والمخابز",
                body: en
                  ? "Orders, reservations and multi-branch groups"
                  : "طلبات وحجوزات ومجموعات متعددة الفروع",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bp-industry-card">
                <span className="bp-industry-icon">
                  <item.Icon className="h-5 w-5" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
