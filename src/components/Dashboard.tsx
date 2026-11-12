"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const tabsEn = ["Overview", "Agent", "Conversations", "Knowledge base", "Channels", "Properties", "Voice"] as const;
const tabsAr = ["نظرة عامة", "الوكيل", "المحادثات", "قاعدة المعرفة", "القنوات", "العقارات", "الصوت"] as const;

const properties = [
  {
    name: "Marsa Al Bandar - JBR",
    keys: "214 keys",
    code: "jbr",
    desk: "24 hours",
    number: "+971 4 512 0100",
    rules: "Dubai · AED 20/night + municipality + 5% VAT",
    flagship: true,
  },
  {
    name: "Saadiyat Collection",
    keys: "168 keys",
    code: "sdt",
    desk: "24 hours",
    number: "+971 2 498 2200",
    rules: "Abu Dhabi · tourism fee + 5% VAT",
    flagship: false,
  },
  {
    name: "Sharjah Waterfront",
    keys: "96 keys",
    code: "shj",
    desk: "06:00–00:00",
    number: "+971 6 555 0180",
    rules: "Sharjah · municipality + 5% VAT",
    flagship: false,
  },
] as const;

function SparkIcon() {
  return (
    <svg className="dashboard-spark" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.5l1.35 5.2L18.5 9l-5.15 1.3L12 15.5l-1.35-5.2L5.5 9l5.15-1.3L12 2.5zm6.5 9.5l.7 2.7 2.8.7-2.8.7-.7 2.7-.7-2.7-2.8-.7 2.8-.7.7-2.7zM5.2 14.2l.55 2.1 2.15.55-2.15.55-.55 2.1-.55-2.1-2.15-.55 2.15-.55.55-2.1z"
      />
    </svg>
  );
}

export function Dashboard() {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const tabs = en ? tabsEn : tabsAr;
  const [step, setStep] = useState(0);

  const headCopy = [
    {
      en: "Last 7 days · outcome-first · All properties",
      ar: "آخر 7 أيام · النتائج أولًا · كل العقارات",
    },
    {
      en: "How your agent behaves, in plain English",
      ar: "كيف يتصرف وكيلك، بلغة بسيطة",
    },
    {
      en: "Watch, understand why, take over when needed",
      ar: "راقب، افهم السبب، وتدخل عند الحاجة",
    },
    {
      en: "Grounded content plus the gaps the agent found",
      ar: "محتوى موثّق مع الفجوات التي اكتشفها الوكيل",
    },
    {
      en: "Where guests reach your agent",
      ar: "أين يصل الضيوف إلى وكيلك",
    },
    {
      en: "Each with its own numbers, hours, knowledge and tools",
      ar: "لكل منها أرقامها وساعاتها ومعرفتها وأدواتها",
    },
    {
      en: "Telephony: trunk, numbers, per-language voices.",
      ar: "الهاتف: الجذع والأرقام والأصوات لكل لغة.",
    },
  ] as const;

  const procedures = en
    ? [
        "Quote the tourism dirham, municipality fee and VAT from the property rate card before confirming any Dubai booking.",
        "For Abu Dhabi properties use the percentage tourism fee, never the per-night Dubai rate.",
        "During Ramadan, give Iftar and suhoor timings before quoting restaurant hours.",
        "Confirm halal and allergen handling whenever a guest raises dietary needs.",
      ]
    : [
        "اعرض درهم السياحة ورسوم البلدية وضريبة القيمة المضافة من بطاقة أسعار العقار قبل تأكيد أي حجز في دبي.",
        "لعقارات أبوظبي استخدم نسبة رسوم السياحة، ولا تستخدم سعر دبي لليلة.",
        "خلال رمضان، أعطِ مواقيت الإفطار والسحور قبل ذكر ساعات المطاعم.",
        "أكّد التعامل الحلال ومسببات الحساسية كلما ذكر الضيف احتياجات غذائية.",
      ];

  const inbox = [
    {
      id: "1",
      title: "+971 50 44 4412",
      meta: en ? "WhatsApp · Rates · Sea view, 3 nights, confirmed" : "واتساب · أسعار · إطلالة بحر، 3 ليالٍ، مؤكد",
      pill: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      badge: null as string | null,
      selected: true,
    },
    {
      id: "2",
      title: "+971 55 99 9021",
      meta: en ? "WhatsApp · Groups · Escalated to groups team" : "واتساب · مجموعات · صُعِّد لفريق المجموعات",
      pill: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      badge: en ? "needs you" : "يحتاجك",
      selected: false,
    },
    {
      id: "3",
      title: en ? "Web visitor" : "زائر الويب",
      meta: en ? "Web chat · Late checkout · Held until 16:00, no charge" : "دردشة ويب · مغادرة متأخرة · محجوز حتى 16:00 بلا رسوم",
      pill: en ? "Al Bandar Saadiyat" : "البندر سعديات",
      badge: null,
      selected: false,
    },
    {
      id: "4",
      title: "+971 52 33 3390",
      meta: en ? "Voice · Transfer · DXB T3 06:30 - AED 260" : "صوت · تحويل · DXB T3 06:30 - 260 درهم",
      pill: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      badge: null,
      selected: false,
    },
    {
      id: "5",
      title: "@guest.handle",
      meta: en ? "Instagram · Spa · Couples ritual 18:00 booked" : "إنستغرام · سبا · طقس زوجي 18:00 محجوز",
      pill: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      badge: null,
      selected: false,
    },
  ];

  const gaps = [
    {
      q: en ? "Is there a Qibla direction marked in every room?" : "هل توجد علامة اتجاه القبلة في كل غرفة؟",
      asked: "14x",
      type: "gap" as const,
    },
    {
      q: en ? "Ramadan iftar and suhoor timings, dated" : "مواقيت الإفطار والسحور لرمضان، منتهية",
      asked: "9x",
      type: "outdated" as const,
    },
    {
      q: en ? "Do you allow pets in the Saadiyat villas?" : "هل تسمحون بالحيوانات الأليفة في فلل سعديات؟",
      asked: "6x",
      type: "gap" as const,
    },
    {
      q: en ? "Sharjah policy for in-room dining" : "سياسة الشارقة للطعام داخل الغرفة",
      asked: "4x",
      type: "outdated" as const,
    },
  ];

  const sources = [
    {
      source: en ? "Rate plans & packages" : "خطط الأسعار والباقات",
      items: "128",
      property: en ? "All properties" : "كل العقارات",
      language: en ? "Any" : "أي",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Rate plans & packages (AR)" : "خطط الأسعار والباقات (عربي)",
      items: "128",
      property: en ? "All properties" : "كل العقارات",
      language: en ? "Arabic" : "العربية",
      status: en ? "Indexed" : "مفهرس",
      langAccent: true,
    },
    {
      source: en ? "Housekeeping SOP" : "إجراءات التدبير المنزلي",
      items: "42",
      property: en ? "JBR · Saadiyat" : "جي بي آر · سعديات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Spa & wellness menus" : "قوائم السبا والعافية",
      items: "86",
      property: "Marsa Al Bandar · JBR",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "F&B menus & allergen cards" : "قوائم المطاعم وبطاقات مسببات الحساسية",
      items: "64",
      property: en ? "All properties" : "كل العقارات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Ramadan schedule 2026" : "جدول رمضان 2026",
      items: "12",
      property: en ? "All properties" : "كل العقارات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Escalation playbook" : "دليل التصعيد",
      items: "31",
      property: en ? "All properties" : "كل العقارات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Abu Dhabi fee rules" : "قواعد رسوم أبوظبي",
      items: "24",
      property: en ? "Al Bandar Saadiyat" : "البندر سعديات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
    {
      source: en ? "Airport transfer tariffs" : "تعرفة نقل المطار",
      items: "18",
      property: en ? "All properties" : "كل العقارات",
      language: "EN · AR",
      status: en ? "Indexed" : "مفهرس",
    },
  ];

  const channelCards = [
    {
      title: en ? "WhatsApp Business (JBR)" : "واتساب للأعمال (جي بي آر)",
      live: true,
      detail: "+971 4 512 0100 · JBR",
      pill: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
    },
    {
      title: en ? "WhatsApp Business (Saadiyat)" : "واتساب للأعمال (سعديات)",
      live: true,
      detail: "+971 2 401 0200 · Saadiyat",
      pill: en ? "Al Bandar Saadiyat" : "البندر سعديات",
    },
    {
      title: en ? "WhatsApp Business (Sharjah)" : "واتساب للأعمال (الشارقة)",
      live: true,
      detail: "+971 6 533 0300 · Sharjah",
      pill: en ? "Al Qasr Sharjah" : "القصر الشارقة",
    },
    {
      title: en ? "Web Chat Widget" : "ودجت دردشة الويب",
      live: true,
      detail: en ? "Embedded on albandar.ae" : "مدمج على albandar.ae",
      pill: en ? "All properties" : "كل العقارات",
    },
    {
      title: en ? "Voice" : "الصوت",
      live: true,
      detail: en ? "Your licensed e& SIP trunk" : "خط SIP مرخّص من e&",
      pill: en ? "All properties" : "كل العقارات",
    },
    {
      title: en ? "Instagram DM" : "رسائل إنستغرام",
      live: false,
      detail: en ? "Not connected" : "غير متصل",
      pill: null,
      connect: true,
    },
  ];

  const voiceDids = [
    {
      number: "+971 4 512 0100",
      label: en ? "JBR main line" : "خط جي بي آر الرئيسي",
      property: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      direction: en ? "both" : "كلا الاتجاهين",
      carrier: en ? "e& licensed" : "e& مرخّص",
    },
    {
      number: "+971 4 512 0180",
      label: en ? "JBR reservations" : "حجوزات جي بي آر",
      property: en ? "Marsa Al Bandar · JBR" : "مرسى البندر · جي بي آر",
      direction: en ? "inbound" : "وارد",
      carrier: en ? "e& licensed" : "e& مرخّص",
    },
    {
      number: "+971 2 401 0200",
      label: en ? "Saadiyat main line" : "خط سعديات الرئيسي",
      property: en ? "Al Bandar Saadiyat" : "البندر سعديات",
      direction: en ? "both" : "كلا الاتجاهين",
      carrier: en ? "e& licensed" : "e& مرخّص",
    },
  ];

  return (
    <section
      id="product"
      className="dashboard-section"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(8,10,22,.78), rgba(8,10,22,.88)), url(${images.dashboard})`,
      }}
    >
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="faq-eyebrow">{t.dashboard.label}</span>
          <h2 className="mt-5 text-[1.85rem] font-semibold tracking-[-0.03em] text-white md:text-[2.35rem]">
            {t.dashboard.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-relaxed text-white/70">{t.dashboard.body}</p>
        </div>

        <div className="dashboard-tabs" role="tablist">
          {tabs.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={step === index}
              className={step === index ? "is-active" : ""}
              onClick={() => setStep(index)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="dashboard-window">
          <div className="dashboard-chrome">
            <span className="dashboard-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="dashboard-url">{t.dashboard.url}</span>
            <span className="dashboard-sample">{t.dashboard.sample}</span>
          </div>

          <div className="dashboard-body">
            <aside className="dashboard-side">
              <div className="dashboard-brand">
                <LogoMark className="h-8 w-8" />
                <span>{brand.short}</span>
              </div>
              <div className="dashboard-tenant">
                <span>AB</span>
                <p>{en ? "Al Bandar Collection" : "مجموعة البندر"}</p>
              </div>
              <nav>
                {tabs.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className={step === index ? "is-active" : ""}
                    onClick={() => setStep(index)}
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <p className="dashboard-side-foot">
                {en ? "3 properties · 478 keys" : "3 عقارات · 478 مفتاحًا"}
              </p>
            </aside>

            <div className="dashboard-main">
              <div className="dashboard-main-head">
                <div>
                  <h3>{tabs[step]}</h3>
                  <p>{en ? headCopy[step].en : headCopy[step].ar}</p>
                </div>
                {step === 0 ? <span className="dashboard-range">{en ? "7 days" : "7 أيام"}</span> : null}
                {step === 1 ? (
                  <div className="dashboard-head-actions">
                    <button type="button" className="dashboard-btn-outline">
                      {en ? "Test cases" : "حالات الاختبار"}
                    </button>
                    <button type="button" className="dashboard-btn-primary">
                      {en ? "Publish changes" : "نشر التغييرات"}
                    </button>
                  </div>
                ) : null}
                {step === 3 ? (
                  <div className="dashboard-head-actions">
                    <button type="button" className="dashboard-btn-outline">
                      {en ? "Re-train" : "إعادة التدريب"}
                    </button>
                    <button type="button" className="dashboard-btn-primary">
                      {en ? "+ Add content" : "+ إضافة محتوى"}
                    </button>
                  </div>
                ) : null}
                {step === 4 ? (
                  <div className="dashboard-head-actions">
                    <button type="button" className="dashboard-btn-primary">
                      {en ? "+ Add channel" : "+ إضافة قناة"}
                    </button>
                  </div>
                ) : null}
                {step === 6 ? (
                  <div className="dashboard-head-actions">
                    <button type="button" className="dashboard-btn-outline">
                      {en ? "Test connection" : "اختبار الاتصال"}
                    </button>
                    <button type="button" className="dashboard-btn-primary">
                      {en ? "Save" : "حفظ"}
                    </button>
                  </div>
                ) : null}
              </div>

              {step === 0 ? (
                <>
                  <div className="dashboard-stats">
                    <article className="dashboard-metric is-ai">
                      <div className="dashboard-donut" style={{ background: "conic-gradient(#4f46e5 0 92%, #e8e9f2 92% 100%)" }} aria-hidden>
                        <span>92%</span>
                      </div>
                      <div>
                        <p>{en ? "RESOLVED BY AI" : "حلّها الذكاء الاصطناعي"}</p>
                        <strong>1,181 / 1,284</strong>
                        <small className="dashboard-metric-up">▲ 3 pts · ~148 {en ? "agent-hrs saved" : "ساعة وكيل وفّرت"}</small>
                      </div>
                    </article>
                    <article>
                      <p>{en ? "RESERVATIONS TAKEN" : "حجوزات مأخوذة"}</p>
                      <strong>318</strong>
                      <small className="dashboard-metric-up">▲ 9%</small>
                    </article>
                    <article>
                      <p>{en ? "ESCALATIONS" : "تصعيدات"}</p>
                      <strong>104</strong>
                      <small>CSAT 4.6</small>
                    </article>
                  </div>

                  <div className="dashboard-split is-overview">
                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Optimize" : "تحسين"}</h4>
                        <span className="dashboard-badge">{en ? "AI suggestions" : "اقتراحات AI"}</span>
                      </div>
                      <div className="dashboard-optimize-row">
                        <SparkIcon />
                        <div>
                          <strong>{en ? "Answer a repeated question" : "أجب عن سؤال متكرر"}</strong>
                          <p>
                            {en
                              ? "'Is there a Qibla direction in every room?' asked 14 times with no grounded answer."
                              : "«هل توجد اتجاه القبلة في كل غرفة؟» سُئل 14 مرة بلا إجابة موثّقة."}
                          </p>
                        </div>
                        <button type="button" className="dashboard-btn-primary is-sm">
                          {en ? "Add" : "إضافة"}
                        </button>
                      </div>
                      <div className="dashboard-optimize-row">
                        <SparkIcon />
                        <div>
                          <strong>{en ? "Ramadan schedule expires in 6 days" : "جدول رمضان ينتهي خلال 6 أيام"}</strong>
                          <p>
                            {en
                              ? "Iftar and suhoor timings are dated. Update before the agent quotes them."
                              : "مواقيت الإفطار والسحور قديمة. حدّثها قبل أن يقتبسها الوكيل."}
                          </p>
                        </div>
                        <button type="button" className="dashboard-btn-primary is-sm">
                          {en ? "Update" : "تحديث"}
                        </button>
                      </div>
                    </div>

                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Needs your attention" : "يحتاج انتباهك"}</h4>
                      </div>
                      <div className="dashboard-attention-row">
                        <span className="dashboard-dot is-amber" aria-hidden />
                        <div>
                          <strong>{en ? "2 conversations waiting on a human" : "محادثتان بانتظار إنسان"}</strong>
                          <p>{en ? "Oldest 11m · Saadiyat" : "الأقدم 11د · سعديات"}</p>
                        </div>
                        <button type="button" className="dashboard-btn-ghost">
                          {en ? "Open" : "فتح"}
                        </button>
                      </div>
                      <div className="dashboard-attention-row">
                        <span className="dashboard-dot is-rose" aria-hidden />
                        <div>
                          <strong>{en ? "Spa PMS connector intermittent" : "موصل نظام السبا متقطع"}</strong>
                          <p>{en ? "JBR · 3 failures / 24h" : "جي بي آر · 3 أعطال / 24س"}</p>
                        </div>
                        <button type="button" className="dashboard-btn-ghost">
                          {en ? "Open" : "فتح"}
                        </button>
                      </div>
                      <div className="dashboard-attention-row">
                        <span className="dashboard-dot is-sky" aria-hidden />
                        <div>
                          <strong>{en ? "1 knowledge gap detected" : "فجوة معرفة واحدة مكتشفة"}</strong>
                          <p>{en ? "Qibla direction in rooms" : "اتجاه القبلة في الغرف"}</p>
                        </div>
                        <button type="button" className="dashboard-btn-ghost">
                          {en ? "Open" : "فتح"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <div className="dashboard-agent-layout">
                  <div className="dashboard-agent-stack">
                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Persona" : "الشخصية"}</h4>
                        <button type="button" className="dashboard-link-btn">
                          {en ? "Edit" : "تعديل"}
                        </button>
                      </div>
                      <div className="dashboard-persona-grid">
                        <div>
                          <span>{en ? "Name" : "الاسم"}</span>
                          <strong>Layla</strong>
                        </div>
                        <div>
                          <span>{en ? "Tone" : "النبرة"}</span>
                          <strong>{en ? "Warm, precise" : "دافئة ودقيقة"}</strong>
                        </div>
                        <div>
                          <span>{en ? "Length" : "الطول"}</span>
                          <strong>{en ? "Concise" : "مختصر"}</strong>
                        </div>
                        <div>
                          <span>{en ? "Languages" : "اللغات"}</span>
                          <strong>{en ? "English, Arabic" : "الإنجليزية، العربية"}</strong>
                        </div>
                        <div>
                          <span>{en ? "Voice (ar-AE)" : "الصوت (ar-AE)"}</span>
                          <strong>Hala</strong>
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Procedures" : "الإجراءات"}</h4>
                        <span className="dashboard-badge">{en ? "natural language" : "لغة طبيعية"}</span>
                      </div>
                      <ol className="dashboard-procedures">
                        {procedures.map((item, i) => (
                          <li key={item}>
                            <span className="dashboard-proc-num">{i + 1}</span>
                            <p>{item}</p>
                            <span className="dashboard-toggle is-on" role="switch" aria-checked="true" aria-label={en ? "On" : "تشغيل"}>
                              <i />
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="dashboard-panel dashboard-testdrive">
                    <div className="dashboard-panel-head">
                      <h4>{en ? "Test drive" : "تجربة"}</h4>
                      <div className="dashboard-pill-group">
                        <span className="dashboard-soft-pill">Marsa Al Bandar</span>
                        <span className="dashboard-soft-pill">ar-AE</span>
                      </div>
                    </div>
                    <div className="dashboard-chat">
                      <div className="dashboard-bubble is-guest is-rtl">
                        <p>السلام عليكم، كم سعر الغرفة يوم الجمعة؟</p>
                      </div>
                      <div className="dashboard-bubble is-agent is-rtl">
                        <p>وعليكم السلام. الغرفة الديلوكس متاحة بـ 579 درهم لليلة بالإضافة إلى الرسوم. تحب أحجز لك؟</p>
                      </div>
                      <p className="dashboard-chat-meta">
                        source: &apos;Rate plans (AR)&apos; · tools: check_availability
                        <span className="dashboard-confidence">
                          <i />
                          confidence 96%
                        </span>
                      </p>
                      <pre className="dashboard-code">
                        {`check_availability() -> 4 rooms
quote_total() -> AED 1,984.35`}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="dashboard-inbox">
                  <div className="dashboard-inbox-list">
                    {inbox.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`dashboard-inbox-item${item.selected ? " is-selected" : ""}`}
                      >
                        <div className="dashboard-inbox-top">
                          <strong>{item.title}</strong>
                          {item.badge ? <span className="dashboard-needs-badge">{item.badge}</span> : null}
                        </div>
                        <p>{item.meta}</p>
                        <span className="dashboard-soft-pill">{item.pill}</span>
                      </button>
                    ))}
                  </div>
                  <div className="dashboard-inbox-thread">
                    <div className="dashboard-bubble is-guest">
                      <p>
                        {en
                          ? "Hi, do you have a sea-view room for Thursday for 3 nights? And what are the extra fees?"
                          : "مرحبًا، هل لديكم غرفة بإطلالة بحر ليوم الخميس لمدة 3 ليالٍ؟ وما الرسوم الإضافية؟"}
                      </p>
                    </div>
                    <div className="dashboard-bubble is-agent">
                      <p>
                        {en
                          ? "Deluxe Sea View is available, AED 1,737 for three nights, plus AED 20 tourism dirham per bedroom per night, the municipality fee and 5% VAT from the published rate card. Shall I hold it?"
                          : "غرفة ديلوكس بإطلالة بحر متاحة، 1,737 درهم لثلاث ليالٍ، بالإضافة إلى 20 درهم سياحة لكل غرفة لكل ليلة ورسوم البلدية و5% ضريبة من بطاقة الأسعار. أحجزها لك؟"}
                      </p>
                    </div>
                    <p className="dashboard-chat-meta">
                      source: &apos;Rate plans&apos; · &apos;Tourism Dirham, Dubai 5-star&apos;
                      <span className="dashboard-confidence">
                        <i />
                        confidence 96%
                      </span>
                    </p>
                    <div className="dashboard-bubble is-guest">
                      <p>{en ? "Yes please, and can I pay now?" : "نعم من فضلك، وهل يمكنني الدفع الآن؟"}</p>
                    </div>
                    <div className="dashboard-bubble is-agent">
                      <p>
                        {en
                          ? "Held under your name. Secure payment link sent. It opens with our provider, so no card details come through chat."
                          : "حُجزت باسمك. أُرسل رابط دفع آمن. يفتح لدى مزوّدنا، فلا تمر بيانات البطاقة عبر الدردشة."}
                      </p>
                    </div>
                    <p className="dashboard-chat-foot">
                      {en ? "reservation A-3182 created in OPERA Cloud" : "الحجز A-3182 أُنشئ في OPERA Cloud"}
                    </p>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <>
                  <div className="dashboard-panel dashboard-kb-panel">
                    <div className="dashboard-panel-head">
                      <h4>{en ? "Gaps & Issues" : "الفجوات والمشكلات"}</h4>
                      <span className="dashboard-badge">{en ? "from real conversations" : "من محادثات حقيقية"}</span>
                    </div>
                    <div className="dashboard-table-wrap is-flush">
                      <table className="dashboard-table is-kb">
                        <thead>
                          <tr>
                            {(en
                              ? ["Question / Issue", "Asked", "Type", ""]
                              : ["السؤال / المشكلة", "مرات السؤال", "النوع", ""]
                            ).map((head, i) => (
                              <th key={`${head}-${i}`}>{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {gaps.map((row) => (
                            <tr key={row.q}>
                              <td>
                                <strong>{row.q}</strong>
                              </td>
                              <td>{row.asked}</td>
                              <td>
                                <span className={`dashboard-type-pill is-${row.type}`}>
                                  {en ? row.type : row.type === "gap" ? "فجوة" : "قديم"}
                                </span>
                              </td>
                              <td>
                                <button type="button" className="dashboard-btn-primary is-sm">
                                  {en ? "Add answer" : "أضف إجابة"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="dashboard-panel dashboard-kb-panel">
                    <div className="dashboard-panel-head">
                      <h4>{en ? "Sources" : "المصادر"}</h4>
                      <span className="dashboard-muted-label">{en ? "9 documents" : "9 مستندات"}</span>
                    </div>
                    <div className="dashboard-table-wrap is-flush">
                      <table className="dashboard-table is-kb">
                        <thead>
                          <tr>
                            {(en
                              ? ["Source", "Items", "Property", "Language", "Status"]
                              : ["المصدر", "العناصر", "العقار", "اللغة", "الحالة"]
                            ).map((head) => (
                              <th key={head}>{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sources.map((row) => (
                            <tr key={row.source}>
                              <td>
                                <strong>{row.source}</strong>
                              </td>
                              <td>{row.items}</td>
                              <td>{row.property}</td>
                              <td className={row.langAccent ? "is-lang-ar" : undefined}>{row.language}</td>
                              <td>
                                <span className="dashboard-indexed">{row.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : null}

              {step === 4 ? (
                <>
                  <div className="dashboard-channel-grid">
                    {channelCards.map((ch) => (
                      <article key={ch.title} className="dashboard-channel-card">
                        <div className="dashboard-channel-top">
                          <h4>{ch.title}</h4>
                          {ch.live ? (
                            <span className="dashboard-live">● {en ? "LIVE" : "مباشر"}</span>
                          ) : (
                            <span className="dashboard-soft-pill">{en ? "Not connected" : "غير متصل"}</span>
                          )}
                        </div>
                        <p>{ch.detail}</p>
                        {ch.pill ? <span className="dashboard-soft-pill">{ch.pill}</span> : null}
                        {"connect" in ch && ch.connect ? (
                          <button type="button" className="dashboard-btn-outline is-sm dashboard-connect-btn">
                            {en ? "Connect" : "ربط"}
                          </button>
                        ) : null}
                      </article>
                    ))}
                  </div>

                  <div className="dashboard-panel dashboard-snippet">
                    <h4>{en ? "Web widget snippet" : "مقطع ودجت الويب"}</h4>
                    <pre className="dashboard-code">
                      {`<script src="https://cdn.hellotecho.example/widget.js" data-tenant="al-bandar" data-location="jbr" async></script>`}
                    </pre>
                    <p className="dashboard-snippet-note">
                      {en
                        ? "The data-location attribute pre-scopes a property's own page to that property."
                        : "سمة data-location تقيّد صفحة العقار مسبقًا بذلك العقار."}
                    </p>
                  </div>
                </>
              ) : null}

              {step === 5 ? (
                <>
                  <div className="dashboard-table-wrap">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          {(en
                            ? ["Property", "Code", "Front desk", "Number", "Emirate rules", "Status"]
                            : ["العقار", "الرمز", "الاستقبال", "الرقم", "قواعد الإمارة", "الحالة"]
                          ).map((head) => (
                            <th key={head}>{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((row) => (
                          <tr key={row.code}>
                            <td>
                              <strong>{row.name}</strong>
                              <span>
                                {row.keys}
                                {row.flagship ? <em>{en ? "flagship" : "رئيسي"}</em> : null}
                              </span>
                            </td>
                            <td>{row.code}</td>
                            <td>{row.desk}</td>
                            <td>{row.number}</td>
                            <td>{row.rules}</td>
                            <td>
                              <span className="dashboard-status">{en ? "Active" : "نشط"}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="dashboard-note">
                    {en
                      ? "A guest dialling the Saadiyat number is recognised as Saadiyat before the agent speaks. It answers with Saadiyat's hours, Saadiyat's rates and Abu Dhabi's fee structure, and transfers to Saadiyat's duty manager."
                      : "ضيف يتصل برقم سعديات يُعرف كسعديات قبل أن يتكلم الوكيل. يجيب بساعات سعديات وأسعارها وهيكل رسوم أبوظبي، ويحوّل إلى مدير المناوبة في سعديات."}
                  </div>
                </>
              ) : null}

              {step === 6 ? (
                <>
                  <div className="dashboard-voice-grid">
                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Provider & SIP Trunk" : "المزوّد وجذع SIP"}</h4>
                      </div>
                      <div className="dashboard-form-grid">
                        <label>
                          <span>{en ? "Provider" : "المزوّد"}</span>
                          <input readOnly value={en ? "e& (Etisalat), licensed" : "e& (اتصالات)، مرخّص"} />
                        </label>
                        <label>
                          <span>{en ? "Alternate" : "البديل"}</span>
                          <input readOnly value={en ? "du, licensed" : "du، مرخّص"} />
                        </label>
                        <label>
                          <span>{en ? "SIP host" : "مضيف SIP"}</span>
                          <input readOnly value="sip.customer.ae" />
                        </label>
                        <label>
                          <span>{en ? "Port" : "المنفذ"}</span>
                          <input readOnly value="5061" />
                        </label>
                        <label>
                          <span>{en ? "Transport" : "النقل"}</span>
                          <input readOnly value={en ? "TLS over dedicated fibre" : "TLS عبر ألياف مخصصة"} />
                        </label>
                        <label>
                          <span>PBX</span>
                          <input readOnly value={en ? "Asterisk (yours)" : "Asterisk (خاص بك)"} />
                        </label>
                      </div>
                    </div>

                    <div className="dashboard-panel">
                      <div className="dashboard-panel-head">
                        <h4>{en ? "Per-language voices" : "أصوات لكل لغة"}</h4>
                        <span className="dashboard-badge">{en ? "2 languages" : "لغتان"}</span>
                      </div>
                      <div className="dashboard-table-wrap is-flush">
                        <table className="dashboard-table is-voice">
                          <thead>
                            <tr>
                              {(en
                                ? ["Language", "Locale", "Voice", "Greeting"]
                                : ["اللغة", "المحليّة", "الصوت", "التحية"]
                              ).map((head) => (
                                <th key={head}>{head}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <strong>{en ? "English" : "الإنجليزية"}</strong>
                                <em className="dashboard-default-tag">{en ? "default" : "افتراضي"}</em>
                              </td>
                              <td>en-AE</td>
                              <td>Rachel</td>
                              <td>
                                &quot;{en ? "Good evening, Marsa Al Bandar, how may I help?" : "مساء الخير، مرسى البندر، كيف أقدر أساعدك؟"}&quot;
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{en ? "Arabic" : "العربية"}</strong>
                              </td>
                              <td>ar-AE</td>
                              <td>Hala</td>
                              <td dir="rtl">&quot;مساء الخير، مرسى البندر، كيف أقدر أساعدك؟&quot;</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="dashboard-voice-note">
                        {en
                          ? "The agent detects the caller's language and greets in it. Any other language falls back to the default."
                          : "يكتشف الوكيل لغة المتصل ويحيّيه بها. أي لغة أخرى تعود إلى الافتراضي."}
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-panel dashboard-dids">
                    <div className="dashboard-panel-head">
                      <h4>{en ? "Phone numbers (DIDs)" : "أرقام الهاتف (DIDs)"}</h4>
                      <button type="button" className="dashboard-btn-primary is-sm">
                        {en ? "+ Add number" : "+ إضافة رقم"}
                      </button>
                    </div>
                    <div className="dashboard-table-wrap is-flush">
                      <table className="dashboard-table is-voice">
                        <thead>
                          <tr>
                            {(en
                              ? ["Number", "Label", "Property", "Direction", "Carrier"]
                              : ["الرقم", "التسمية", "العقار", "الاتجاه", "المشغّل"]
                            ).map((head) => (
                              <th key={head}>{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {voiceDids.map((row) => (
                            <tr key={row.number}>
                              <td>
                                <strong>{row.number}</strong>
                              </td>
                              <td>{row.label}</td>
                              <td>
                                <span className="dashboard-soft-pill">{row.property}</span>
                              </td>
                              <td>{row.direction}</td>
                              <td>{row.carrier}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="dashboard-bottom">
          <p>
            {en
              ? "Each property carries its own numbers, hours, knowledge, tools and escalation path."
              : "كل عقار يحمل أرقامه وساعاته ومعرفته وأدواته ومسار التصعيد الخاص به."}
          </p>
          <div className="dashboard-bottom-actions">
            <Link href={routes.trial} className="btn-primary">
              {t.nav.trial}
            </Link>
            <Link href={routes.demo} className="faq-demo-btn">
              {t.nav.demo}
            </Link>
          </div>
          <Link href={routes.demo} className="dashboard-bottom-link">
            {t.dashboard.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
