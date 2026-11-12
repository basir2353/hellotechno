"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { PromoBar } from "@/components/Header";
import {
  IconCheck,
  IconChevron,
  IconMenu,
  IconPhone,
  IconPlay,
  LogoMark,
} from "@/components/Icons";
import { Pricing } from "@/components/Pricing";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const accents = ["Emirati", "Saudi", "MSA (Fusha)", "Kuwaiti", "Qatari", "Omani", "Bahraini"] as const;
const voices = [
  { id: "noor", name: "Noor", gender: "FEMALE", letter: "N" },
  { id: "yousuf", name: "Yousuf", gender: "MALE", letter: "Y" },
  { id: "sultan", name: "Sultan", gender: "MALE", letter: "S" },
] as const;

const moduleCards = [
  {
    title: "The quote that went quiet",
    body: "Every clinic has treatment plans that were quoted at consult and never booked: the implant case, the veneers plan, the filler package. The platform follows up politely, in the patient’s language, on your schedule.",
    image: images.clinics,
  },
  {
    title: "Reviews and reputation",
    body: "After the visit, patients get a well-timed invitation to leave a review. The moment any reply signals a problem, the platform alerts your practice manager before it becomes a public review.",
    image: images.employee,
  },
  {
    title: "Multi-branch by design",
    body: "Each branch keeps its own name, price list and escalation rules. One dashboard for the group, one number patients already know.",
    image: images.team,
  },
  {
    title: "Seasonal load, handled",
    body: "Ramadan, Eid and wedding-season spikes flood Instagram and WhatsApp. The platform holds the queue, books consults and only escalates clinical questions.",
    image: images.hero,
  },
  {
    title: "Clinical guardrails",
    body: "It never diagnoses or invents medical advice. Scripts stay inside rules your medical director approved — everything else goes to a person.",
    image: images.useCases,
  },
  {
    title: "Outcome reporting",
    body: "AI answer rate, consults booked, no-shows recovered and AED value attributed — weekly, per branch and per channel.",
    image: images.dashboard,
  },
] as const;

function AdDropdown({ label, children }: { label: string; children: ReactNode }) {
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
      <button type="button" className="hp-nav-link" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
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

function AestheticsHeader() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const links = [
    ["#ad-preview", en ? "Live preview" : "معاينة مباشرة"],
    ["#ad-modules", en ? "Modules" : "الوحدات"],
    ["#ad-voice", en ? "Arabic & voice" : "العربية والصوت"],
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
          <AdDropdown label={en ? "AI Employee" : "موظف AI"}>
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
          </AdDropdown>
          <a href="#ad-pricing" className="hp-nav-link">
            {t.nav.pricing}
          </a>
          <Link href={routes.team} className="hp-nav-link">
            {t.nav.team}
          </Link>
          <AdDropdown label={t.nav.resources}>
            <Link href={routes.blog} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.blog}</span>
            </Link>
            <Link href={routes.news} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.news}</span>
            </Link>
          </AdDropdown>
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
          <button type="button" className="hp-menu-btn" aria-label={t.nav.menu} onClick={() => setMenuOpen((v) => !v)}>
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-white hp-mobile-panel">
          <div className="shell flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-3">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
                {label}
              </a>
            ))}
            <Link href={routes.employee} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
              {en ? "AI Employee" : "موظف AI"}
            </Link>
            <a href="#ad-pricing" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
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

export function AestheticsPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [accent, setAccent] = useState<(typeof accents)[number]>("Emirati");
  const [voice, setVoice] = useState("noor");

  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <AestheticsHeader />
      </div>

      <main>
        {/* 1. Hero */}
        <section className="hp-hero">
          <div className="shell text-center">
            <span className="hp-badge">
              <span aria-hidden />
              {en
                ? "Built for aesthetics clinics and dental groups across the GCC"
                : "مبني لعيادات التجميل ومجموعات الأسنان في الخليج"}
            </span>
            <h1 className="hp-hero-title">
              {en ? (
                <>
                  Your AI-powered
                  <br />
                  patient experience
                  <br />
                  <span>platform for clinics.</span>
                </>
              ) : (
                <>
                  منصة تجربة المريض
                  <br />
                  بالذكاء الاصطناعي
                  <br />
                  <span>للعيادات.</span>
                </>
              )}
            </h1>
            <p className="hp-hero-body">
              {en
                ? "One platform that answers every patient on Instagram, WhatsApp, phone and web chat. In English and Arabic, day and night, at every branch. It books consults into the systems you already run, escalates by rules your team writes, and shows you exactly what it did."
                : "منصة واحدة ترد على كل مريض عبر إنستغرام وواتساب والهاتف والدردشة. بالعربية والإنجليزية، ليلًا ونهارًا، في كل فرع. تحجز الاستشارات في أنظمتك، وتصعّد حسب قواعد فريقك، وتُظهر لك ما فعلته."}
            </p>
          </div>
        </section>

        {/* 2–3. Live preview */}
        <section id="ad-preview" className="hp-agent">
          <div className="shell">
            <div className="hp-mid-promo">{t.promo}</div>
            <div className="ad-preview-card">
              <h2>{en ? "Talk to the agent — live" : "تحدث مع الوكيل — مباشرة"}</h2>
              <p>
                {en
                  ? "Enter your number and it calls you in seconds. Talk to it like a customer would, in Arabic or English."
                  : "أدخل رقمك فيتصل بك خلال ثوانٍ. تحدّث معه كما يفعل المريض، بالعربية أو الإنجليزية."}
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
                      I agree to a demo call and the <Link href={routes.privacy}>Privacy Policy</Link>
                    </>
                  ) : (
                    <>
                      أوافق على مكالمة العرض و<Link href={routes.privacy}>سياسة الخصوصية</Link>
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
                      <button key={item} type="button" className={accent === item ? "is-active" : ""} onClick={() => setAccent(item)}>
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
                      <button key={item.id} type="button" className={voice === item.id ? "is-active" : ""} onClick={() => setVoice(item.id)}>
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
                <button type="button" className="ad-browser-link">
                  {en ? "Talk in your browser" : "تحدث في المتصفح"}
                </button>
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
            <p className="ad-see-link">
              <a href="#ad-modules">{en ? "See it in action" : "شاهده يعمل"}</a>
            </p>
            <p className="hp-hero-meta">
              {en
                ? "Arabic native · runs on your own +971 numbers · your medical director approves every rule"
                : "عربي أصيل · على أرقام +971 الخاصة بك · المدير الطبي يعتمد كل قاعدة"}
            </p>
          </div>
        </section>

        {/* 4–5. Video */}
        <section className="hp-video">
          <div className="shell">
            <div className="hp-video-frame">
              <div className="hp-video-copy">
                <h2>
                  {en ? (
                    <>
                      EVERY PATIENT
                      <br />
                      <span>ANSWERED IN SECONDS</span>
                    </>
                  ) : (
                    <>
                      كل مريض
                      <br />
                      <span>يُجاب خلال ثوانٍ</span>
                    </>
                  )}
                </h2>
                <p>{en ? "See how clinics increase their ROI" : "شاهد كيف ترفع العيادات عائدها"}</p>
                <button type="button" className="hp-tour-btn">
                  <IconPlay className="h-4 w-4" />
                  {en ? "1-MIN TOUR" : "جولة دقيقة"}
                </button>
              </div>
              <div className="hp-video-media">
                <Image src={images.clinics} alt="" fill className="object-cover" sizes="720px" />
                <button type="button" className="hp-play" aria-label={en ? "Play" : "تشغيل"}>
                  <IconPlay className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6–7. Modules */}
        <section id="ad-modules" className="ad-modules">
          <div className="shell">
            <p className="selected-eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {en ? "Platform use cases in this vertical" : "حالات استخدام المنصة في هذا القطاع"}
            </p>
            <h2 className="hp-section-title text-center">
              {en ? "Built for how clinics actually lose and win patients" : "مبني لكيف تخسر العيادات المرضى وتكسبهم فعليًا"}
            </h2>
            <p className="hp-section-body mx-auto text-center">
              {en
                ? "Six capabilities, live from day one, each governed by rules your team approves."
                : "ست قدرات، حية من اليوم الأول، كل واحدة محكومة بقواعد يعتمدها فريقك."}
            </p>
            <div className="hp-feature-grid ad-module-grid">
              {moduleCards.map((card) => (
                <article key={card.title} className="hp-feature-card">
                  <Image src={card.image} alt="" fill className="object-cover" sizes="400px" />
                  <div className="hp-feature-overlay" />
                  <div className="hp-feature-content">
                    <span className="hp-feature-icon">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
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
              {en ? "Same clinic. Different platform." : "نفس العيادة. منصة مختلفة."}
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
                          "Instagram DMs sit unread overnight",
                          "Phone rings out mid-procedure",
                          "Quoted plans never get followed up",
                          "No-shows empty the chair the same week",
                        ]
                      : [
                          "رسائل إنستغرام تبقى بلا قراءة ليلًا",
                          "الهاتف يرن أثناء الإجراء",
                          "خطط الأسعار بلا متابعة",
                          "الغياب يفرّغ الكرسي في نفس الأسبوع",
                        ]
                    ).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="hp-compare-card is-after">
                <Image src={images.clinics} alt="" fill className="object-cover" sizes="560px" />
                <div className="hp-compare-shade" />
                <div className="hp-compare-content">
                  <p className="is-after-label">{en ? "With AI CX Platform" : "مع منصة تجربة العملاء"}</p>
                  <ul>
                    {(en
                      ? [
                          "Every DM and call answered in seconds",
                          "Consults booked into your diary",
                          "Quiet quotes recovered automatically",
                          "No-shows chased and refilled the same day",
                        ]
                      : [
                          "كل رسالة ومكالمة تُجاب خلال ثوانٍ",
                          "الاستشارات تُحجز في مفكرتك",
                          "العروض الهادئة تُستعاد تلقائيًا",
                          "الغياب يُلاحق ويُملأ في نفس اليوم",
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
            <div className="hp-hero-ctas">
              <Link href={routes.trial} className="btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
          </div>
        </section>

        {/* Language & dialect */}
        <section id="ad-voice" className="hp-arabic">
          <div className="shell hp-arabic-grid">
            <div>
              <span className="hp-badge">
                <span aria-hidden />
                {en ? "Language & dialect" : "اللغة واللهجة"}
              </span>
              <h2 className="hp-section-title">
                {en ? "It hears the dialect, and answers in it" : "يسمع اللهجة ويرد بها"}
              </h2>
              <p className="hp-section-body">
                {en
                  ? "Khaleeji, Shami, Egyptian or MSA — and it can switch to English or Russian for aesthetics clinics that need it. Same booking rules, same escalation, in the patient’s language."
                  : "خليجي أو شامي أو مصري أو فصحى — ويمكنه التحويل للإنجليزية أو الروسية لعيادات التجميل عند الحاجة. نفس قواعد الحجز والتصعيد، بلغة المريض."}
              </p>
              <div className="hp-dialects">
                {(en
                  ? ["Gulf · خليجي", "Levantine · شامي", "Egyptian · مصري", "Modern Standard · فصحى"]
                  : ["خليجي", "شامي", "مصري", "فصحى"]
                ).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="ad-extra-lang">
                {en ? "+ English and Russian, natively" : "+ الإنجليزية والروسية أصليًا"}
              </p>
              <div className="hp-hero-ctas" style={{ justifyContent: "flex-start" }}>
                <Link href={routes.trial} className="btn-primary">
                  {t.nav.trial}
                </Link>
                <Link href={routes.demo} className="btn-secondary">
                  {t.nav.demo}
                </Link>
              </div>
            </div>
            <div className="hp-arabic-media">
              <Image
                src={images.clinics}
                alt={en ? "Patients in an aesthetics clinic" : "مريضات في عيادة تجميل"}
                fill
                className="object-cover"
                sizes="560px"
              />
            </div>
          </div>
        </section>

        <div id="ad-pricing">
          <Pricing />
        </div>
        <Cta />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
