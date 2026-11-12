"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { PromoBar } from "@/components/Header";
import {
  IconChat,
  IconCheck,
  IconChevron,
  IconMail,
  IconMenu,
  IconPhone,
  IconPlay,
  IconSms,
  IconWhatsApp,
  IconInstagram,
  LogoMark,
} from "@/components/Icons";
import { Pricing } from "@/components/Pricing";
import { messages } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const accents = ["Emirati", "Saudi", "MSA (Fusha)", "Kuwaiti", "Qatari"] as const;
const voices = [
  { id: "noor", name: "Noor", gender: "FEMALE", letter: "N" },
  { id: "yousuf", name: "Yousuf", gender: "MALE", letter: "Y" },
  { id: "sultan", name: "Sultan", gender: "MALE", letter: "S" },
] as const;

const useCases = [
  {
    title: "Guest Intake & Booking",
    body: "Rates, availability, confirmed reservations",
  },
  {
    title: "Pre-Arrival & Concierge",
    body: "Transfers, early check-in, spa and dining",
  },
  {
    title: "In-Stay & Housekeeping",
    body: "Requests routed and dispatched in seconds",
  },
  {
    title: "Service Recovery",
    body: "Caught during the stay, not in the review",
  },
  {
    title: "Meetings & Events",
    body: "Qualifies the inquiry, sends the proposal",
  },
] as const;

const featureCards = [
  {
    title: "Always-On Reception",
    body: "Voice, SMS, chat and WhatsApp, answered in under 2 seconds, 24/7/365, in your guest’s language.",
    image: images.hospitality,
  },
  {
    title: "Missed-Call Recovery",
    body: "Every missed call auto-recovered with an SMS and callback sequence within 30 seconds.",
    image: images.useCases,
  },
  {
    title: "Smart Booking",
    body: "Two-way calendar and CRM sync. Books, reschedules and confirms. No double-booking.",
    image: images.team,
  },
  {
    title: "Upsell Engine",
    body: "Offers upgrades, spa and dining from your rules — never discounts outside policy.",
    image: images.dining,
  },
  {
    title: "Lead Qualification",
    body: "Hospitality-specific discovery scripts. Filters casual browsers and routes ready-to-book guests to your team in real time.",
    image: images.team,
  },
  {
    title: "Follow-Up & Reactivation",
    body: "Nurture sequences, no-show recovery and dormant-guest reactivation. All automated.",
    image: images.hero,
  },
] as const;

const metrics = [
  { label: "Coverage autonomy", value: "92%" },
  { label: "Resolution rate", value: "87%" },
  { label: "Recovered revenue / seat", value: "AED 52K" },
] as const;

function HospDropdown({ label, children }: { label: string; children: ReactNode }) {
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
        className="hp-nav-link"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <IconChevron className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute start-0 top-[calc(100%+8px)] z-50 min-w-[300px] rounded-2xl border border-[var(--border)] bg-white p-2 shadow-[var(--shadow-soft)]">
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}

function HospitalityHeader() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const links = [
    ["#hp-usecase", en ? "Use Case" : "حالة الاستخدام"],
    ["#hp-hero", en ? "Hospitality CX" : "ضيافة CX"],
    ["#hp-dashboard", en ? "Dashboard" : "لوحة التحكم"],
    ["#hp-voice", en ? "Arabic & voice" : "العربية والصوت"],
  ] as const;

  return (
    <header className="border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="shell hp-header-row">
        <Link href={routes.home} className="hp-brand">
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="hp-brand-text">
            <span className="hp-brand-name">{brand.short}</span>
            <span className="hp-brand-tag">{t.tagline}</span>
          </span>
        </Link>

        <nav className="hp-header-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hp-nav-link">
              {label}
            </a>
          ))}
          <HospDropdown label={en ? "AI Employee" : "موظف AI"}>
            <Link href={routes.employee} className="ai-emp-item">
              <span className="ai-emp-thumb">
                <Image src={images.employee} alt="Noor" fill className="object-cover" sizes="48px" />
              </span>
              <span className="ai-emp-copy">
                <span className="ai-emp-title">
                  {en ? "Noor AI Order Taking Employee" : "نور · موظفة طلبات بالذكاء الاصطناعي"}
                </span>
                <span className="ai-emp-desc">
                  {en ? "Takes orders for bakeries and cafes, 24/7" : "تستقبل طلبات المخابز والمقاهي على مدار الساعة"}
                </span>
              </span>
            </Link>
          </HospDropdown>
          <a href="#hp-pricing" className="hp-nav-link">
            {t.nav.pricing}
          </a>
          <Link href={routes.team} className="hp-nav-link">
            {t.nav.team}
          </Link>
          <HospDropdown label={t.nav.resources}>
            <Link href={routes.blog} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.blog}</span>
            </Link>
            <Link href={routes.news} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.news}</span>
            </Link>
          </HospDropdown>
        </nav>

        <div className="hp-header-actions">
          <div className="lang-switch flex h-9 items-center rounded-full border border-[var(--border)] bg-[var(--page-soft)] p-0.5 sm:h-[42px]">
            <button
              type="button"
              className={`h-8 rounded-full px-2 text-[12px] font-medium sm:h-9 sm:px-3 sm:text-[13px] ${
                locale === "en" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-ar h-8 rounded-full px-2 text-[12px] font-medium sm:h-9 sm:px-3 sm:text-[13px] ${
                locale === "ar" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("ar")}
            >
              العربية
            </button>
          </div>
          <Link href={routes.trial} className="btn-primary hp-header-cta">
            {t.nav.trial}
          </Link>
          <Link href={routes.login} className="btn-secondary hp-header-cta">
            {t.nav.login}
          </Link>
          <button
            type="button"
            className="hp-menu-btn"
            aria-label={t.nav.menu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-white hp-mobile-panel">
          <div className="shell flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-3">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
              >
                {label}
              </a>
            ))}
            <Link href={routes.employee} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {en ? "AI Employee" : "موظف AI"}
            </Link>
            <a href="#hp-pricing" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {t.nav.pricing}
            </a>
            <Link href={routes.team} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {t.nav.team}
            </Link>
            <Link href={routes.blog} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {t.nav.blog}
            </Link>
            <Link href={routes.news} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {t.nav.news}
            </Link>
            <Link href={routes.trial} onClick={() => setMenuOpen(false)} className="btn-primary mt-2">
              {t.nav.trial}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function HospitalityPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [accent, setAccent] = useState<(typeof accents)[number]>("Emirati");
  const [voice, setVoice] = useState("noor");
  const [caseIndex, setCaseIndex] = useState(1);
  const [guestLang, setGuestLang] = useState<"en" | "ar">("en");
  const [channel, setChannel] = useState("WhatsApp");
  const scenario = messages[guestLang].scenarios.hospitality;
  const hospTab = t.industries.tabs.find((item) => item.id === "hospitality") ?? t.industries.tabs[0];

  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <HospitalityHeader />
      </div>

      <main>
        {/* Hero */}
        <section id="hp-hero" className="hp-hero">
          <div className="shell text-center">
            <span className="hp-badge">
              <span aria-hidden />
              {en
                ? "Built for hotels, resorts and hospitality groups across the GCC"
                : "مبني للفنادق والمنتجعات ومجموعات الضيافة في الخليج"}
            </span>
            <h1 className="hp-hero-title">
              {en ? (
                <>
                  Your AI-powered
                  <br />
                  customer experience
                  <br />
                  <span>platform for hospitality.</span>
                </>
              ) : (
                <>
                  منصة تجربة العملاء
                  <br />
                  بالذكاء الاصطناعي
                  <br />
                  <span>للضيافة.</span>
                </>
              )}
            </h1>
            <p className="hp-hero-body">
              {en
                ? "One platform that answers every guest on WhatsApp, phone, web chat and Instagram. In English and Arabic, day and night, at every property. It books, resolves and escalates by your rules, and shows you exactly what it did."
                : "منصة واحدة ترد على كل ضيف عبر واتساب والهاتف والدردشة وإنستغرام. بالعربية والإنجليزية، ليلًا ونهارًا، في كل عقار. تحجز وتحل وتصعّد حسب قواعدك، وتُظهر لك ما فعلته."}
            </p>
            <Link href={routes.trial} className="hp-promo-cta">
              <span className="hp-promo-dot" aria-hidden />
              {t.promo}
            </Link>
          </div>
        </section>

        {/* Live agent */}
        <section id="hp-agent" className="hp-agent">
          <div className="shell">
            <div className="hp-mid-promo">{t.promo}</div>
            <div className="hp-agent-grid">
              <div className="hp-agent-form">
                <h2>{en ? "Talk to the agent — live" : "تحدث مع الوكيل — مباشرة"}</h2>
                <p>
                  {en
                    ? "Enter your number and it calls you in seconds. Talk to it like a customer would, in Arabic or English."
                    : "أدخل رقمك فيتصل بك خلال ثوانٍ. تحدّث معه كما يفعل الضيف، بالعربية أو الإنجليزية."}
                </p>
                <div className="hp-phone-row">
                  <span className="hp-dial">AE +971</span>
                  <input type="tel" placeholder="50 123 4567" aria-label={en ? "Phone" : "الهاتف"} />
                </div>
                <label className="hp-check">
                  <input type="checkbox" defaultChecked />
                  <span>
                    {en ? (
                      <>
                        I agree to the <Link href={routes.privacy}>Privacy Policy</Link>
                      </>
                    ) : (
                      <>
                        أوافق على <Link href={routes.privacy}>سياسة الخصوصية</Link>
                      </>
                    )}
                  </span>
                </label>
                <label className="hp-check">
                  <input type="checkbox" />
                  <span>{en ? "Send me product updates" : "أرسل لي تحديثات المنتج"}</span>
                </label>

                <div className="hp-pickers">
                  <div>
                    <p className="hp-picker-label">{en ? "Accent" : "اللهجة"}</p>
                    <div className="hp-picker-list">
                      {accents.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={accent === item ? "is-active" : ""}
                          onClick={() => setAccent(item)}
                        >
                          {accent === item ? <IconCheck className="h-3.5 w-3.5" /> : null}
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="hp-picker-label">{en ? "Voice" : "الصوت"}</p>
                    <div className="hp-picker-list">
                      {voices.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={voice === item.id ? "is-active" : ""}
                          onClick={() => setVoice(item.id)}
                        >
                          <span className="hp-voice-avatar">{item.letter}</span>
                          <span>
                            {item.name} <small>({item.gender})</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hp-agent-actions">
                  <button type="button" className="btn-primary">
                    <IconPhone className="h-4 w-4" />
                    {en ? "Call me now →" : "اتصل بي الآن ←"}
                  </button>
                  <p className="hp-agent-note">
                    {en ? "Rings in ~10s · one call only · EN / العربية" : "يرن خلال ~10 ث · مكالمة واحدة · EN / العربية"}
                  </p>
                </div>
              </div>

              <div className="hp-agent-card">
                <div className="hp-agent-photo">
                  <Image
                    src={images.employee}
                    alt={en ? "AI hotel receptionist" : "موظفة استقبال بالذكاء الاصطناعي"}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                  <span className="hp-ready">{en ? "Ready to talk" : "جاهز للحديث"}</span>
                </div>
                <div className="hp-agent-card-body">
                  <h3>{en ? "Talk to our AI hotel receptionist" : "تحدث مع موظفة الاستقبال بالذكاء الاصطناعي"}</h3>
                  <p>
                    {en
                      ? "Ask about rooms, rates, dining or check-in. The same AI that answers your guests, now with a face."
                      : "اسأل عن الغرف والأسعار والمطاعم أو تسجيل الوصول. نفس الذكاء الاصطناعي الذي يرد على ضيوفك."}
                  </p>
                  <button type="button" className="btn-primary w-full">
                    {en ? "Start conversation" : "ابدأ المحادثة"}
                  </button>
                  <p className="hp-agent-note">
                    {en ? "AI avatar · uses your microphone · up to 5 minutes" : "صورة AI · يستخدم الميكروفون · حتى 5 دقائق"}
                  </p>
                </div>
              </div>
            </div>

            <div className="hp-hero-ctas">
              <Link href={routes.trial} className="btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
            <p className="hp-hero-meta">
              {en
                ? "Arabic native · runs on your own +971 numbers · your team approves every rule"
                : "عربي أصيل · يعمل على أرقام +971 الخاصة بك · فريقك يعتمد كل قاعدة"}
            </p>
          </div>
        </section>

        {/* Video band */}
        <section id="hp-tour" className="hp-video">
          <div className="shell">
            <div className="hp-video-frame">
              <div className="hp-video-copy">
                <h2>
                  {en ? (
                    <>
                      EVERY GUEST
                      <br />
                      <span>ANSWERED IN SECONDS</span>
                    </>
                  ) : (
                    <>
                      كل ضيف
                      <br />
                      <span>يُجاب خلال ثوانٍ</span>
                    </>
                  )}
                </h2>
                <p>{en ? "See how hotels increase their ROI" : "شاهد كيف ترفع الفنادق عائدها"}</p>
                <button type="button" className="hp-tour-btn">
                  <IconPlay className="h-4 w-4" />
                  {en ? "2-MIN TOUR" : "جولة دقيقتين"}
                </button>
              </div>
              <div className="hp-video-media">
                <Image
                  src={images.hospitality}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="720px"
                />
                <button type="button" className="hp-play" aria-label={en ? "Play" : "تشغيل"}>
                  <IconPlay className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section id="hp-usecase" className="hp-usecases">
          <div className="shell">
            <p className="selected-eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {en ? "Live preview" : "معاينة مباشرة"}
            </p>
            <h2 className="hp-section-title text-center">
              {en ? "Pick a hotel use case. See it in action." : "اختر حالة استخدام فندقية. شاهدها تعمل."}
            </h2>
            <p className="hp-section-body mx-auto text-center">
              {en
                ? "Five hospitality scenarios, real conversations. Watch each one get answered, booked or handed to your team, exactly as it happens in the product."
                : "خمس سيناريوهات ضيافة ومحادثات حقيقية. شاهد كل واحدة تُجاب أو تُحجز أو تُسلَّم لفريقك كما في المنتج."}
            </p>

            <div className="hp-usecase-layout">
              <aside className="hp-usecase-side">
                <p className="hp-side-label">{en ? "Platform use case" : "حالة استخدام المنصة"}</p>
                <div className="hp-case-list">
                  {useCases.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`hp-case ${caseIndex === index ? "is-active" : ""}`}
                      onClick={() => setCaseIndex(index)}
                    >
                      <span className="hp-case-title">{item.title}</span>
                      <span className="hp-case-body">{item.body}</span>
                    </button>
                  ))}
                </div>

                <p className="hp-side-label mt-5">{en ? "Channel" : "القناة"}</p>
                <div className="hp-channels">
                  {[
                    ["WhatsApp", IconWhatsApp],
                    ["Voice", IconPhone],
                    ["Web chat", IconChat],
                    ["SMS", IconSms],
                    ["Instagram", IconInstagram],
                    ["Email", IconMail],
                  ].map(([label, Icon]) => (
                    <button
                      key={label as string}
                      type="button"
                      className={channel === label ? "is-active" : ""}
                      onClick={() => setChannel(label as string)}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label as string}
                    </button>
                  ))}
                </div>

                <p className="hp-side-label mt-5">{en ? "Guest language" : "لغة الضيف"}</p>
                <div className="hp-lang">
                  <button
                    type="button"
                    className={guestLang === "en" ? "is-active" : ""}
                    onClick={() => setGuestLang("en")}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={guestLang === "ar" ? "is-active" : ""}
                    onClick={() => setGuestLang("ar")}
                  >
                    العربية
                  </button>
                </div>

                <div className="hp-duty">
                  <span>Y</span>
                  <div>
                    <p>{en ? "On duty" : "في الخدمة"}</p>
                    <strong>Yousef Karim</strong>
                    <small>{en ? "Guest Relations · Al Bandar Collection" : "علاقات الضيوف · مجموعة البندر"}</small>
                  </div>
                </div>
              </aside>

              <div className="hp-transcript">
                <div className="hp-transcript-bar">
                  <span className="hp-live">{en ? "Live transcript" : "نص مباشر"}</span>
                  <span className="hp-path">
                    {channel} · {guestLang === "en" ? "English" : "العربية"} · Marsa Al Bandar
                  </span>
                  <span className="hp-scripted">{en ? "Scripted scenario" : "سيناريو مكتوب"}</span>
                </div>
                <div className="hp-transcript-bg">
                  <Image src={images.hospitality} alt="" fill className="object-cover opacity-30" sizes="800px" />
                </div>
                <div className="hp-bubbles">
                  {scenario.lines.map((line, i) => (
                    <div key={`${caseIndex}-${i}`} className={`hp-bubble is-${line.who}`}>
                      <p>{line.text}</p>
                    </div>
                  ))}
                  <p className="hp-system">
                    ✦{" "}
                    {en
                      ? "Request logged and confirmed in the property system"
                      : "طُلب وسُجّل في نظام العقار"}
                  </p>
                </div>
              </div>
            </div>

            <div className="hp-hero-ctas mt-8">
              <Link href={routes.trial} className="btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
            <p className="hp-hero-meta">
              {en
                ? "See these scenarios answering for your own property."
                : "شاهد هذه السيناريوهات ترد لعقارك."}
            </p>
          </div>
        </section>

        {/* Platform */}
        <section id="hp-platform" className="hp-platform">
          <div className="shell">
            <div className="hp-platform-head">
              <span className="pill pill-purple">{en ? "The platform" : "المنصة"}</span>
              <h2>
                {en
                  ? "AI CX Platform, the managed platform for your front desk"
                  : "منصة تجربة العملاء، المنصة المُدارة لمكتب الاستقبال"}
              </h2>
              <p>
                {en
                  ? "Not a voice agent. A four-layer platform: intake, orchestration, escalation and revenue intelligence. Fully managed, continuously optimized for hospitality."
                  : "ليست وكيل صوت فقط. منصة من أربع طبقات: الاستقبال والتنسيق والتصعيد وذكاء الإيرادات. مُدارة بالكامل ومُحسَّنة للضيافة."}
              </p>
            </div>

            <div className="hp-feature-grid">
              {featureCards.map((card) => (
                <article key={card.title} className="hp-feature-card">
                  <Image src={card.image} alt="" fill className="object-cover" sizes="400px" />
                  <div className="hp-feature-overlay" />
                  <div className="hp-feature-content">
                    <span className="hp-feature-icon">
                      <IconPhone className="h-4 w-4" />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="hp-metrics">
              {metrics.map((item) => (
                <div key={item.label} className="hp-metric">
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs after */}
        <section className="hp-compare">
          <div className="shell">
            <p className="selected-eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {en ? "Before vs after" : "قبل وبعد"}
            </p>
            <h2 className="hp-section-title text-center">
              {en ? "Same hotel. Different platform." : "نفس الفندق. منصة مختلفة."}
            </h2>
            <div className="hp-compare-grid">
              <article className="hp-compare-card is-before">
                <Image src={images.useCases} alt="" fill className="object-cover" sizes="560px" />
                <div className="hp-compare-shade" />
                <div className="hp-compare-content">
                  <p className="is-before-label">{en ? "Before Hello Techo" : "قبل Hello Techo"}</p>
                  <ul>
                    {(en
                      ? [
                          "12 missed calls before lunch",
                          "Receptionist double-booked 3 slots",
                          "Voicemail full, WhatsApp unread",
                          "Owner interrupting service to answer the phone",
                        ]
                      : [
                          "12 مكالمة فائتة قبل الغداء",
                          "الاستقبال حجز 3 مواعيد مرتين",
                          "البريد الصوتي ممتلئ وواتساب بلا قراءة",
                          "المالك يقطع الخدمة للرد على الهاتف",
                        ]
                    ).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="hp-compare-card is-after">
                <Image src={images.hospitality} alt="" fill className="object-cover" sizes="560px" />
                <div className="hp-compare-shade" />
                <div className="hp-compare-content">
                  <p className="is-after-label">{en ? "With AI CX Platform" : "مع منصة تجربة العملاء"}</p>
                  <ul>
                    {(en
                      ? [
                          "0 missed. 100% answered in under 2 seconds",
                          "Calendar synced, zero conflicts",
                          "Every channel answered, one unified thread",
                          "Owner works on the business, not in it",
                        ]
                      : [
                          "صفر فائت. 100% رد خلال أقل من ثانيتين",
                          "تقويم متزامن بلا تعارض",
                          "كل قناة مجابة في خيط واحد",
                          "المالك يعمل على العمل لا داخله",
                        ]
                    ).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <Link href={routes.trial} className="btn-primary hp-compare-cta">
                    {t.nav.trial}
                  </Link>
                </div>
              </article>
            </div>

            <div className="hp-trend-grid">
              <div className="hp-trend is-down">
                <svg viewBox="0 0 320 120" className="hp-trend-svg" aria-hidden>
                  <path d="M8 28 C60 34, 90 70, 140 78 C190 86, 230 96, 312 108" fill="none" stroke="#f87171" strokeWidth="3" />
                </svg>
                <p>{en ? "Revenue trend: down" : "اتجاه الإيراد: هابط"}</p>
              </div>
              <div className="hp-trend is-up">
                <svg viewBox="0 0 320 120" className="hp-trend-svg" aria-hidden>
                  <path d="M8 100 C70 92, 110 70, 160 48 C210 28, 250 18, 312 12" fill="none" stroke="#60a5fa" strokeWidth="3" />
                </svg>
                <p>{en ? "Revenue recovered this month: +AED 173,000" : "إيراد مستعاد هذا الشهر: +173,000 درهم"}</p>
              </div>
            </div>
            <div className="hp-hero-ctas">
              <Link href={routes.trial} className="btn-primary">{t.nav.trial}</Link>
              <Link href={routes.demo} className="btn-secondary">{t.nav.demo}</Link>
            </div>
            <p className="hp-hero-meta">
              {en ? "Recover this revenue at your own property." : "استعد هذا الإيراد في عقارك."}
            </p>
          </div>
        </section>

        {/* Vertical playbook */}
        <section className="hp-playbook">
          <div className="shell">
            <p className="selected-eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {en ? "Vertical playbook" : "دليل القطاع"}
            </p>
            <h2 className="hp-section-title text-center">
              {en ? "Built for the hospitality industry" : "مبني لقطاع الضيافة"}
            </h2>
            <p className="hp-section-body mx-auto text-center">
              {en
                ? "Purpose-built Platform use cases for hotels, resorts and hotel apartments. Each ships with its own scripts, KPIs, integrations and voice persona, tuned to how a GCC property actually runs."
                : "حالات استخدام مخصصة للفنادق والمنتجعات والشقق الفندقية. كل واحدة بسكربتاتها ومؤشراتها وتكاملاتها وصوتها، وفق تشغيل عقار خليجي فعليًا."}
            </p>

            <div className="hp-playbook-panel">
              <p className="hp-playbook-kicker">
                {en ? "Resorts · Hotel groups · Multi-property" : "منتجعات · مجموعات فندقية · متعدد العقارات"}
              </p>
              <h3>{en ? "Hospitality" : "الضيافة"}</h3>
              <div className="hp-pain-win">
                <article className="is-pain">
                  <p>{t.industries.pain}</p>
                  <h4>{hospTab.pain}</h4>
                </article>
                <article className="is-win">
                  <p>{t.industries.win}</p>
                  <h4>{hospTab.win}</h4>
                </article>
              </div>

              <p className="hp-side-label mt-6">
                {en ? "Platform use cases in this vertical" : "حالات استخدام المنصة في هذا القطاع"}
              </p>
              <div className="hp-uc-grid">
                {hospTab.cases.map((item, index) => (
                  <article key={item.title} className="hp-uc-card">
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <div className="hp-uc-chips">
                      {t.scenario.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                      ))}
                    </div>
                    <p className="hp-uc-systems">
                      {["OPERA Cloud · HotSOS", "OPERA · SevenRooms", "HotSOS · Slack", "Review alerts · PMS"][index]}
                    </p>
                    <p className="hp-uc-sla">
                      <span />
                      {en ? "Replies in under 5 seconds" : "يرد خلال أقل من 5 ثوانٍ"}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section id="hp-dashboard" className="hp-dash">
          <div className="shell">
            <Link href="#hp-usecase" className="hp-dash-jump">
              {en ? "See these use cases in the live preview →" : "شاهد حالات الاستخدام في المعاينة المباشرة ←"}
            </Link>
            <div className="hp-dash-hero">
              <span className="hp-badge is-on-dark">
                <span aria-hidden />
                {en ? "Inside the product" : "داخل المنتج"}
              </span>
              <h2>
                {en ? "The dashboard your team actually runs" : "لوحة التحكم التي يشغّلها فريقك فعليًا"}
              </h2>
              <p>
                {en
                  ? "This is the shipped AI CX Platform, loaded with a GCC hotel group, walking through the screens a Director of Rooms lives in. Watch it move, or step through yourself."
                  : "هذه منصة تجربة العملاء المشحونة، محمّلة بمجموعة فندقية خليجية، عبر الشاشات التي يعيشها مدير الغرف. شاهدها تتحرك أو تنقّل بنفسك."}
              </p>
            </div>

            <div className="hp-dash-tabs" role="tablist">
              {["Overview", "Agent", "Conversations", "Knowledge base", "Channels", "Properties", "Voice"].map(
                (tab, i) => (
                  <button key={tab} type="button" className={i === 0 ? "is-active" : ""}>
                    {tab}
                  </button>
                ),
              )}
            </div>

            <div className="hp-dash-frame">
              <div className="hp-dash-chrome">
                <span />
                <span />
                <span />
                <p>app.hellotecho.example / al-bandar-collection</p>
                <em>{en ? "Sample data" : "بيانات عينة"}</em>
              </div>
              <div className="hp-dash-body">
                <aside className="hp-dash-side">
                  <p className="hp-dash-side-brand">{brand.short}</p>
                  {["Overview", "Agent", "Conversations", "Knowledge base", "Channels", "Properties", "Voice"].map(
                    (item, i) => (
                      <span key={item} className={i === 0 ? "is-active" : ""}>
                        {item}
                      </span>
                    ),
                  )}
                  <p className="hp-dash-side-meta">{en ? "3 properties · 478 keys" : "3 عقارات · 478 مفتاحًا"}</p>
                </aside>
                <div className="hp-dash-main">
                  <div className="hp-dash-main-head">
                    <div>
                      <h3>{en ? "Overview" : "نظرة عامة"}</h3>
                      <p>{en ? "Last 7 days · outcome-first · All properties" : "آخر 7 أيام · كل العقارات"}</p>
                    </div>
                    <span>{en ? "7 days" : "7 أيام"}</span>
                  </div>
                  <div className="hp-dash-stats">
                    <article>
                      <p>{en ? "Resolved by AI" : "حلّها الذكاء الاصطناعي"}</p>
                      <strong>92%</strong>
                      <small>1,181 / 1,284</small>
                    </article>
                    <article>
                      <p>{en ? "Reservations taken" : "حجوزات مأخوذة"}</p>
                      <strong>318</strong>
                      <small>+9%</small>
                    </article>
                    <article>
                      <p>{en ? "Escalations" : "تصعيدات"}</p>
                      <strong>104</strong>
                      <small>CSAT 4.6</small>
                    </article>
                  </div>
                  <div className="hp-dash-tables">
                    <div>
                      <div className="hp-dash-table-head">
                        <h4>{en ? "By property" : "حسب العقار"}</h4>
                        <span>3</span>
                      </div>
                      {[
                        ["Marsa Al Bandar - JBR", "796", "94%", "198", "61"],
                        ["Al Bandar Saadiyat", "336", "91%", "84", "28"],
                        ["Al Qasr Sharjah", "152", "88%", "36", "15"],
                      ].map((row) => (
                        <div key={row[0]} className="hp-dash-row">
                          <strong>{row[0]}</strong>
                          <span>{row[1]}</span>
                          <span className="hp-bar">
                            <i style={{ width: row[2] }} />
                            {row[2]}
                          </span>
                          <span>{row[3]}</span>
                          <span>{row[4]}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="hp-dash-table-head">
                        <h4>{en ? "Top topics" : "أبرز المواضيع"}</h4>
                        <span>{en ? "auto" : "تلقائي"}</span>
                      </div>
                      {[
                        [en ? "Rates & availability" : "الأسعار والتوفر", "29%"],
                        [en ? "Airport transfers" : "نقل المطار", "17%"],
                        [en ? "Housekeeping requests" : "طلبات التدبير", "12%"],
                        [en ? "Groups & events" : "مجموعات وفعاليات", "8%"],
                        [en ? "Billing & folio" : "الفوترة", "6%"],
                      ].map(([topic, vol]) => (
                        <div key={topic} className="hp-dash-row is-topic">
                          <strong>{topic}</strong>
                          <span className="hp-bar">
                            <i style={{ width: vol }} />
                            {vol}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hp-dash-footer-copy">
              <p>
                {en
                  ? "The number a cluster GM is judged on, per property and per topic, plus what to fix next."
                  : "الرقم الذي يُحاسب عليه المدير العام للمجموعة، لكل عقار وموضوع، وما يجب إصلاحه تاليًا."}
              </p>
              <div className="hp-hero-ctas">
                <Link href={routes.trial} className="btn-primary">{t.nav.trial}</Link>
                <Link href={routes.demo} className="btn-secondary is-on-dark">{t.nav.demo}</Link>
              </div>
              <p className="hp-hero-meta is-on-dark">
                {en ? "See these screens live, on your own property" : "شاهد هذه الشاشات مباشرة على عقارك"}
              </p>
            </div>
          </div>
        </section>

        {/* Arabic & voice */}
        <section id="hp-voice" className="hp-arabic">
          <div className="shell hp-arabic-grid">
            <div>
              <span className="hp-badge">
                <span aria-hidden />
                {en ? "Arabic & voice" : "العربية والصوت"}
              </span>
              <h2 className="hp-section-title">
                {en
                  ? "Across the GCC, Arabic is the standard, not a setting"
                  : "عبر الخليج، العربية معيار وليست إعدادًا"}
              </h2>
              <p className="hp-section-body">
                {en
                  ? "Dubai’s consumer protection rules and Saudi mandates make bilingual service non-negotiable. Hello Techo is Arabic-first: Gulf, Levantine, Egyptian and MSA, on voice and chat, with the same booking and escalation rules."
                  : "قواعد حماية المستهلك في دبي ومتطلبات السعودية تجعل الخدمة باللغتين غير قابلة للتفاوض. Hello Techo عربية أولًا: خليجي وشامي ومصري وفصحى، على الصوت والدردشة، بنفس قواعد الحجز والتصعيد."}
              </p>
              <div className="hp-dialects">
                {(en
                  ? ["خليجي · Gulf", "شامي · Levantine", "مصري · Egyptian", "فصحى · Modern Standard"]
                  : ["خليجي", "شامي", "مصري", "فصحى"]
                ).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="hp-arabic-media">
              <Image
                src={images.team}
                alt={en ? "Guests arriving at a GCC hotel" : "ضيوف يصلون إلى فندق خليجي"}
                fill
                className="object-cover"
                sizes="560px"
              />
            </div>
          </div>
        </section>

        <div id="hp-pricing">
          <Pricing />
        </div>
        <Cta />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
