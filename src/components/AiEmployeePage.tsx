"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { PromoBar } from "@/components/Header";
import {
  IconChat,
  IconCheck,
  IconChevron,
  IconInstagram,
  IconMenu,
  IconPhone,
  IconPin,
  IconPlay,
  IconWhatsApp,
  LogoMark,
} from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

function buildNovemberDays() {
  const firstDow = 6;
  const daysInMonth = 30;
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const trialAvailableDays = new Set([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);

function NoorHeader() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const links = [
    ["#noor-try", en ? "Try Noor" : "جرّب نور"],
    ["#noor-handles", en ? "What she handles" : "ما تتعامل معه"],
    ["#noor-compared", en ? "Compared" : "المقارنة"],
    ["#noor-team", en ? "Team" : "الفريق"],
    ["#noor-pricing", en ? "Pricing" : "الأسعار"],
    ["#noor-faq", en ? "FAQ" : "الأسئلة"],
  ] as const;

  return (
    <header className="border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="shell noor-header-row">
        <Link href={routes.home} className="hp-brand">
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="hp-brand-text">
            <span className="hp-brand-name">{brand.short}</span>
            <span className="hp-brand-tag">{t.tagline}</span>
          </span>
        </Link>

        <nav className="noor-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hp-nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="noor-actions">
          <div className="lang-switch flex h-9 items-center rounded-full border border-[var(--border)] bg-[var(--page-soft)] p-0.5">
            <button
              type="button"
              className={`h-8 rounded-full px-2 text-[12px] font-medium ${
                locale === "en" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-ar h-8 rounded-full px-2 text-[12px] font-medium ${
                locale === "ar" ? "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "text-[var(--soft)]"
              }`}
              onClick={() => setLocale("ar")}
            >
              العربية
            </button>
          </div>
          <a href={routes.talk} target="_blank" rel="noopener noreferrer" className="noor-chip">
            <IconWhatsApp className="h-4 w-4 text-[#25d366]" />
            {en ? "Talk to us" : "تواصل"}
          </a>
          <a href="tel:+17195124485" className="noor-chip">
            <IconPhone className="h-4 w-4" />
            {en ? "Call us" : "اتصل"}
          </a>
          <a href="#noor-trial" className="btn-primary noor-cta">
            {en ? "Book free trial" : "احجز تجربة مجانية"}
          </a>
          <Link href={routes.login} className="noor-login noor-cta">
            {t.nav.login}
          </Link>
          <button type="button" className="hp-menu-btn noor-menu" aria-label={t.nav.menu} onClick={() => setMenuOpen((v) => !v)}>
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-white noor-mobile">
          <div className="shell flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-3">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]">
                {label}
              </a>
            ))}
            <a href="#noor-trial" onClick={() => setMenuOpen(false)} className="btn-primary mt-2">
              {en ? "Book free trial" : "احجز تجربة مجانية"}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function AiEmployeePage() {
  const { locale } = useLocale();
  const en = locale === "en";
  const [calls, setCalls] = useState(20);
  const [avgOrder, setAvgOrder] = useState(100);
  const [faqOpen, setFaqOpen] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(12);
  const calendarCells = useMemo(() => buildNovemberDays(), []);
  const weekdays = en
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["إث", "ثل", "أر", "خم", "جم", "سب", "أح"];

  const stake = useMemo(() => Math.round(calls * 30 * 0.25 * avgOrder), [calls, avgOrder]);
  const keepOrders = useMemo(() => Math.max(1, Math.ceil(500 / avgOrder)), [avgOrder]);

  const faqItems = en
    ? [
        [
          "Will she say something wrong to a customer?",
          "She only uses your menu, your prices and the wording you approve. She never invents a price, a lead time or an allergen answer. Anything medical, angry or unusual goes to a named person on your team with the whole chat, and she tells the customer who will reply.",
        ],
        [
          "Does she take the order, or just a message?",
          "She takes the whole order when it is inside your menu and rules — into your POS when connected, or as a complete ticket to your team. Complex or off-list requests are briefed or handed over with the chat attached.",
        ],
        [
          "Does she speak Gulf Arabic?",
          "Yes. Gulf Arabic and English by default, with Khaleeji phrasing — not textbook Arabic. Hindi, Urdu, Tagalog and 40 more languages are available when you need them.",
        ],
        [
          "Does it work with my POS and Talabat?",
          "She can work with Foodics, Qlub, Ordable, Odoo, Square, Toast and others. Nothing is moved or replaced. No connector yet? She passes your team a complete ticket, and we tell you honestly at the visit. Delivery apps stay as they are.",
        ],
        [
          "What does it cost?",
          "From AED 500 a month for Noor on WhatsApp, 24/7. Phone, Instagram and web chat come on the plans above. We confirm your plan at the visit. 14 days free to start — no setup fee, no contract.",
        ],
        [
          "Who do I call if something goes wrong?",
          "You call a person at Hello Techo — based in Burjuman, Dubai — not a ticket queue. If we are at another shop, we call you back the same day.",
        ],
        [
          "Is the sample call recorded?",
          "Yes. She tells you the call is recorded. It is a one-time demo so you can hear how she takes an order. Hang up any time — no salesperson on the line.",
        ],
      ]
    : [
        [
          "هل تقول شيئًا خاطئًا للعميل؟",
          "تستخدم قائمتك وأسعارك والصياغة التي تعتمدها فقط. لا تخترع سعرًا أو مهلة أو إجابة حساسية. أي أمر طبي أو غاضب أو غير معتاد يُمرَّر لشخص مسمّى في فريقك مع المحادثة كاملة، وتخبر العميل من سيرد.",
        ],
        [
          "هل تأخذ الطلب أم رسالة فقط؟",
          "تأخذ الطلب كاملًا إن كان داخل قائمتك وقواعدك — إلى نقطة البيع إن وُجدت، أو كتذكرة كاملة لفريقك. الطلبات المعقدة أو خارج القائمة تُلخَّص أو تُسلَّم مع المحادثة.",
        ],
        [
          "هل تتحدث بالخليجي؟",
          "نعم. خليجي وإنجليزي افتراضيًا بصياغة خليجية لا عربية كتابية. وهندي وأردو وتاغالوغ و40 لغة أخرى عند الحاجة.",
        ],
        [
          "هل تعمل مع نقطة بيعي وطلبات؟",
          "يمكنها العمل مع Foodics وQlub وOrdable وOdoo وSquare وToast وغيرها. لا شيء يُنقل أو يُستبدل. بلا موصل؟ تمرر تذكرة كاملة، ونخبرك بصراحة عند الزيارة. تطبيقات التوصيل تبقى كما هي.",
        ],
        [
          "كم التكلفة؟",
          "من 500 درهم شهريًا لنور على واتساب، 24/7. الهاتف وإنستغرام ودردشة الويب على الخطط الأعلى. نؤكد خطتك عند الزيارة. 14 يومًا مجانًا للبدء — بلا رسوم إعداد، بلا عقد.",
        ],
        [
          "بمن أتصل إن حدث خطأ؟",
          "تتصل بشخص في Hello Techo — مقرنا برجمان، دبي — لا بطابور تذاكر. إن كنا في متجر آخر نعاود الاتصال في نفس اليوم.",
        ],
        [
          "هل المكالمة التجريبية مسجّلة؟",
          "نعم. تخبرك أن المكالمة مسجّلة. تجربة لمرة واحدة لتسمع كيف تأخذ طلبًا. أغلق في أي وقت — بلا مندوب على الخط.",
        ],
      ];

  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <NoorHeader />
      </div>

      <main>
        {/* Hero */}
        <section id="noor-try" className="noor-hero">
          <div className="shell noor-hero-grid">
            <div className="noor-panel">
              <div className="noor-panel-head">
                <div className="noor-avatar">
                  <Image src={images.employee} alt="Noor" fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <strong>Noor</strong>
                  <p>{en ? "AI order-taking employee · Gulf Arabic and English" : "موظفة طلبات بالذكاء الاصطناعي · خليجي وإنجليزي"}</p>
                </div>
                <span className="noor-live">{en ? "Live" : "مباشر"}</span>
              </div>

              <div className="noor-hear">
                <p className="noor-kicker">{en ? "Hear her first" : "اسمعها أولًا"}</p>
                <button type="button" className="noor-play">
                  <IconPlay className="h-4 w-4" />
                  <span>
                    <strong>{en ? "A custom cake order" : "طلب كعكة مخصصة"}</strong>
                    <small>{en ? "Recorded call · Spoken in English · 2:16" : "مكالمة مسجلة · بالإنجليزية · 2:16"}</small>
                  </span>
                </button>
              </div>

              <div className="noor-callbox">
                <p className="noor-kicker is-light">{en ? "Now let her call you" : "دعها تتصل بك الآن"}</p>
                <div className="hp-phone-row">
                  <span className="hp-dial">+971</span>
                  <input type="tel" placeholder="50 123 4567" aria-label={en ? "Phone" : "الهاتف"} />
                </div>
                <label className="hp-check is-light">
                  <input type="checkbox" defaultChecked />
                  <span>
                    {en ? (
                      <>
                        I agree to receive a one-time demo call and accept the{" "}
                        <Link href={routes.privacy}>Privacy Policy</Link>.
                      </>
                    ) : (
                      <>
                        أوافق على مكالمة تجريبية لمرة واحدة و{" "}
                        <Link href={routes.privacy}>سياسة الخصوصية</Link>.
                      </>
                    )}
                  </span>
                </label>
                <label className="hp-check is-light">
                  <input type="checkbox" />
                  <span>
                    {en
                      ? "Optional: keep me posted by phone, SMS, WhatsApp or email. You can opt out anytime."
                      : "اختياري: أبقني على اطلاع عبر الهاتف أو الرسائل أو واتساب أو البريد. يمكنني الإلغاء في أي وقت."}
                  </span>
                </label>
                <button type="button" className="noor-call-btn">
                  <IconPhone className="h-4 w-4" />
                  {en ? "Call me now →" : "اتصل بي الآن ←"}
                </button>
                <p className="noor-or">
                  {en ? "or" : "أو"}{" "}
                  <button type="button">{en ? "Talk in your browser" : "تحدث في المتصفح"}</button>
                </p>
                <p className="noor-note">
                  {en
                    ? "Your phone rings within a minute. About five minutes: she asks what you would like to order, you tell her, she confirms it back. She tells you the call is recorded. No salesperson, hang up any time."
                    : "يرن هاتفك خلال دقيقة. نحو خمس دقائق: تسأل ماذا تريد، تؤكد الطلب، وتخبرك أن المكالمة مسجّلة. بلا مندوب، أغلق في أي وقت."}
                </p>
              </div>

              <div className="noor-after">
                <p>
                  <strong>3 · {en ? "After" : "بعد"}</strong>
                  {" — "}
                  {en
                    ? "Liked it? A person from our team comes to your shop and switches Noor on. 14 days free, no setup fee, no contract."
                    : "أعجبك؟ يأتي شخص من فريقنا إلى متجرك ويشغّل نور. 14 يومًا مجانًا، بلا رسوم إعداد، بلا عقد."}
                </p>
                <div className="noor-after-links">
                  <a href={routes.talk} target="_blank" rel="noopener noreferrer">
                    {en ? "Prefer to talk? Call our team" : "تفضل الحديث؟ اتصل بفريقنا"}
                  </a>
                  <a href={routes.talk} target="_blank" rel="noopener noreferrer">
                    {en ? "Prefer WhatsApp? Message our team" : "تفضل واتساب؟ راسل فريقنا"}
                  </a>
                </div>
              </div>
            </div>

            <div className="noor-copy">
              <p className="noor-eyebrow">
                <span />
                {en ? "For bakeries and cafes in Dubai" : "للمخابز والمقاهي في دبي"}
              </p>
              <h1>
                {en ? (
                  <>
                    Never miss an order.{" "}
                    <span>Noor takes it, or passes it to your team.</span>
                  </>
                ) : (
                  <>
                    لا يفوتك طلب.{" "}
                    <span>نور تأخذه، أو تمرره لفريقك.</span>
                  </>
                )}
              </h1>
              <p className="noor-lead">
                {en
                  ? "An AI employee who answers your direct calls and messages in Gulf Arabic and English, takes the order into your POS, and passes anything complex to your team."
                  : "موظفة بالذكاء الاصطناعي ترد على مكالماتك ورسائلك المباشرة بالخليجي والإنجليزية، وتدخل الطلب في نقطة البيع، وتمرر المعقد لفريقك."}
              </p>
              <div className="noor-channels">
                {(
                  en
                    ? [
                        ["Phone", IconPhone],
                        ["WhatsApp", IconWhatsApp],
                        ["Instagram", IconInstagram],
                        ["Web chat", IconChat],
                      ]
                    : [
                        ["الهاتف", IconPhone],
                        ["واتساب", IconWhatsApp],
                        ["إنستغرام", IconInstagram],
                        ["دردشة", IconChat],
                      ]
                ).map(([label, Icon]) => {
                  const ChannelIcon = Icon as typeof IconPhone;
                  return (
                    <span key={label as string}>
                      <ChannelIcon className="h-3.5 w-3.5" />
                      {label as string}
                    </span>
                  );
                })}
              </div>
              <p className="noor-place">
                <IconPin className="h-4 w-4" />
                {en ? (
                  <>
                    Real people in Burjuman, Dubai. <em>One call away, and we come to your shop.</em>
                  </>
                ) : (
                  <>
                    أشخاص حقيقيون في برجمان، دبي. <em>مكالمة واحدة، ونأتي إلى متجرك.</em>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="shell noor-trust">
            <div className="noor-trust-row">
              {(en
                ? [
                    ["From AED 500 a month", "fixed"],
                    ["14 days free, no contract", "trial"],
                    ["Live in 7 days", "speed"],
                    ["Set up at your shop, in person", "visit"],
                  ]
                : [
                    ["من 500 درهم شهريًا", "fixed"],
                    ["14 يومًا مجانًا بلا عقد", "trial"],
                    ["تعمل خلال 7 أيام", "speed"],
                    ["إعداد في متجرك شخصيًا", "visit"],
                  ]
              ).map(([label]) => (
                <p key={label}>
                  <IconCheck className="h-4 w-4 text-[var(--primary)]" />
                  {label}
                </p>
              ))}
            </div>
            <div className="noor-partners">
              <span>{en ? "Selected for" : "مختارة لـ"}</span>
              {[images.partnerMicrosoft, images.partnerAws, images.partnerGcp, images.partnerAnthropic, images.partnerAtlassian].map((src) => (
                <Image key={src} src={src} alt="" width={64} height={16} className="noor-partner-logo object-contain" />
              ))}
            </div>
          </div>
        </section>

        {/* Quote + stats */}
        <section className="noor-social">
          <div className="shell">
            <blockquote className="noor-quote">
              <p>
                {en
                  ? "“Noor freed me up to manage, and she replies to clients on WhatsApp and the phone.”"
                  : "«نور حررتني للإدارة، وترد على العملاء على واتساب والهاتف.»"}
              </p>
              <footer>
                <strong>Waseem</strong>
                {" — "}
                {en ? "Owner, Bakery Bites Cafe · Al Karama, Dubai" : "المالك، Bakery Bites Cafe · الكرامة، دبي"}
              </footer>
            </blockquote>
            <div className="noor-stats">
              {(en
                ? [
                    ["94%", "of calls and messages finished without your staff"],
                    ["Under 5s", "to the first reply, any channel, any hour"],
                    ["24/7", "on duty, so the 23:00 cake enquiry and the Friday rush both get answered"],
                  ]
                : [
                    ["94%", "من المكالمات والرسائل تُنجز بلا طاقمك"],
                    ["أقل من 5 ث", "لأول رد، أي قناة، أي ساعة"],
                    ["24/7", "في الخدمة: طلب الكعكة في 23:00 وزحمة الجمعة كلاهما يُجاب"],
                  ]
              ).map(([value, body]) => (
                <article key={value}>
                  <IconCheck className="h-5 w-5 text-[var(--primary)]" />
                  <strong>{value}</strong>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <p className="noor-stats-note">
              {en
                ? "The first two are measured across bakeries and cafes already using Hello Techo; your own baseline is measured in week one."
                : "الأول والثاني مقيسان عبر مخابز ومقاهٍ تستخدم Hello Techo؛ خطك الأساسي يُقاس في الأسبوع الأول."}
            </p>
          </div>
        </section>

        {/* What she handles */}
        <section id="noor-handles" className="noor-handles">
          <div className="shell">
            <div className="noor-handles-head">
              <div>
                <p className="noor-eyebrow">
                  <span />
                  {en ? "What she handles" : "ما تتعامل معه"}
                </p>
                <h2>
                  {en ? (
                    <>
                      She knows what to take, <span>and what to pass to your team.</span>
                    </>
                  ) : (
                    <>
                      تعرف ماذا تأخذ، <span>وماذا تمرر لفريقك.</span>
                    </>
                  )}
                </h2>
                <p className="noor-lead">
                  {en
                    ? "Every call or message is checked against your menu, prices and rules — then finished, briefed or handed over."
                    : "كل مكالمة أو رسالة تُفحص على قائمتك وأسعارك وقواعدك — ثم تُنجز أو تُلخَّص أو تُسلَّم."}
                </p>
              </div>
              <span className="noor-example">{en ? "Example" : "مثال"}</span>
            </div>

            <div className="noor-flow">
              <div className="noor-flow-in">
                <IconPhone className="h-3.5 w-3.5" />
                <IconWhatsApp className="h-3.5 w-3.5" />
                <IconChat className="h-3.5 w-3.5" />
                <IconInstagram className="h-3.5 w-3.5" />
                {en ? "A call or message comes in" : "تصل مكالمة أو رسالة"}
              </div>
              <div className="noor-flow-bar">
                <span>{en ? "Noor checks it against" : "نور تفحصه مقابل"}</span>
                <em>{en ? "Your menu and prices" : "قائمتك وأسعارك"}</em>
                <em>{en ? "Your rules" : "قواعدك"}</em>
                <em>{en ? "This customer" : "هذا العميل"}</em>
              </div>
              <div className="noor-lanes">
                {(en
                  ? [
                      {
                        title: "Noor handles it",
                        sub: "Inside your menu, prices and rules",
                        logs: [
                          ["07:45", "Rania’s usual for 08:30.", "Sent to the POS."],
                          ["11:28", "Chocolate cake for 12, Friday.", "Photos sent, booked 16:00, payment link sent."],
                        ],
                        tags: ["Pickup and delivery", "Cakes by servings", "Order status"],
                        foot: "Order lands in your POS.",
                        tone: "ok",
                      },
                      {
                        title: "Noor briefs, you decide",
                        sub: "Needs a price only you can set",
                        logs: [
                          ["23:47", "Two-tier cake for 20, Saturday, after closing.", "Date held, deposit link sent, brief to the decorator by 10:00."],
                        ],
                        tags: ["Custom cake designs", "Catering orders", "Off the price list"],
                        foot: "Full brief to your decorator.",
                        tone: "brief",
                      },
                      {
                        title: "Straight to your team",
                        sub: "Needs a human conversation",
                        logs: [
                          ["12:30", "“Does the carrot cake have nuts? My son is allergic.”", "Passed to the shift lead, whole chat attached."],
                        ],
                        tags: ["Allergy with a condition", "Complaints", "Can I speak to someone?"],
                        foot: "Named person, whole chat.",
                        tone: "team",
                      },
                    ]
                  : [
                      {
                        title: "نور تتعامل معه",
                        sub: "داخل قائمتك وأسعارك وقواعدك",
                        logs: [
                          ["07:45", "طلب رانيا المعتاد لـ 08:30.", "أُرسل إلى نقطة البيع."],
                          ["11:28", "كعكة شوكولاتة لـ 12، الجمعة.", "صور أُرسلت، حجز 16:00، رابط دفع أُرسل."],
                        ],
                        tags: ["استلام وتوصيل", "كعك حسب الحصص", "حالة الطلب"],
                        foot: "الطلب يصل إلى نقطة البيع.",
                        tone: "ok",
                      },
                      {
                        title: "نور تلخّص، أنت تقرر",
                        sub: "يحتاج سعرًا أنت وحدك تضعه",
                        logs: [
                          ["23:47", "كعكة بطابقين لـ 20، السبت، بعد الإغلاق.", "تاريخ محجوز، رابط عربون، ملخص للمزيّن قبل 10:00."],
                        ],
                        tags: ["تصاميم كعك", "تموين", "خارج قائمة الأسعار"],
                        foot: "ملخص كامل للمزيّن.",
                        tone: "brief",
                      },
                      {
                        title: "مباشرة لفريقك",
                        sub: "يحتاج محادثة بشرية",
                        logs: [
                          ["12:30", "«هل كعكة الجزر فيها مكسرات؟ ابني لديه حساسية.»", "مُرّرت لمسؤول الوردية مع المحادثة كاملة."],
                        ],
                        tags: ["حساسية بشرط", "شكاوى", "أريد شخصًا"],
                        foot: "شخص مسمّى، المحادثة كاملة.",
                        tone: "team",
                      },
                    ]
                ).map((lane) => (
                  <article key={lane.title} className={`is-${lane.tone}`}>
                    <div className="noor-lane-icon" aria-hidden>
                      <IconCheck className="h-4 w-4" />
                    </div>
                    <h3>{lane.title}</h3>
                    <p>{lane.sub}</p>
                    <ul className="noor-logs">
                      {lane.logs.map(([time, lead, action]) => (
                        <li key={`${time}-${lead}`}>
                          <time>{time}</time>
                          <span>
                            {lead} <strong>{action}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="noor-tags">
                      {lane.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <p className={`noor-lane-foot is-${lane.tone}`}>{lane.foot}</p>
                  </article>
                ))}
              </div>
            </div>

            <p className="noor-lanes-note">
              {en
                ? "You draw the lines between the lanes. Your dashboard shows every conversation she had."
                : "أنت ترسم الحدود بين المسارات. لوحة التحكم تعرض كل محادثة أجرتها."}
            </p>

            <div className="noor-caps">
              {(en
                ? [
                    ["Gulf Arabic and English", "Plus Hindi, Urdu, Tagalog and 40 more. Khaleeji phrasing, not textbook Arabic."],
                    ["Knows every customer", "Name, usual order, allergy note, birthday month."],
                    ["Suggests and shows", "Sends photos of your cakes, adds the extra that fits."],
                    ["On duty 24/7", "Every peak-hour call at once, and the 23:00 enquiry too."],
                  ]
                : [
                    ["خليجي وإنجليزي", "ومع هندي وأردو وتاغالوغ و40 أخرى. صياغة خليجية لا عربية كتابية."],
                    ["تعرف كل عميل", "الاسم والطلب المعتاد وملاحظة الحساسية وشهر الميلاد."],
                    ["تقترح وتعرض", "ترسل صور كعكك وتضيف ما يناسب."],
                    ["في الخدمة 24/7", "كل مكالمات الذروة معًا، واستفسار الساعة 23:00 أيضًا."],
                  ]
              ).map(([title, body]) => (
                <article key={title}>
                  <IconCheck className="h-5 w-5 text-[var(--primary)]" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>

            <div className="noor-pos">
              <p>{en ? "Can work with your POS" : "يمكنها العمل مع نقطة بيعك"}</p>
              <div className="noor-pos-tags">
                {["Foodics", "Qlub", "Ordable", "Odoo", "Square", "Toast"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <small>
                {en
                  ? "Nothing is moved or replaced. No connector yet? Noor passes your team a complete ticket, and we tell you honestly at the visit."
                  : "لا شيء يُنقل أو يُستبدل. بلا موصل بعد؟ تمرر نور لفريقك تذكرة كاملة، ونخبرك بصراحة عند الزيارة."}
              </small>
            </div>
          </div>
        </section>

        {/* Your numbers */}
        <section id="noor-numbers" className="noor-numbers">
          <div className="shell noor-numbers-grid">
            <div>
              <p className="noor-eyebrow">
                <span />
                {en ? "Your numbers" : "أرقامك"}
              </p>
              <h2>
                {en ? (
                  <>
                    The calls nobody could pick up, <span>and what they are worth.</span>
                  </>
                ) : (
                  <>
                    المكالمات التي لم يُجب عليها أحد، <span>وما قيمتها.</span>
                  </>
                )}
              </h2>
              <p className="noor-lead">
                {en
                  ? "Move the two sliders to your shop. Noor answers every direct call and message, through the counter rush and after closing."
                  : "حرّك المؤشرين حسب متجرك. نور تجيب كل مكالمة ورسالة مباشرة، أثناء الزحمة وبعد الإغلاق."}
              </p>
              <div className="noor-sliders">
                <label>
                  <span>
                    {en ? "Calls and messages a day" : "مكالمات ورسائل يوميًا"}
                    <strong>
                      {calls} {en ? "a day" : "يوميًا"}
                    </strong>
                  </span>
                  <input type="range" min={5} max={80} value={calls} onChange={(e) => setCalls(Number(e.target.value))} />
                </label>
                <label>
                  <span>
                    {en ? "Average order" : "متوسط الطلب"}
                    <strong>AED {avgOrder}</strong>
                  </span>
                  <input type="range" min={40} max={300} step={10} value={avgOrder} onChange={(e) => setAvgOrder(Number(e.target.value))} />
                </label>
              </div>
            </div>
            <aside className="noor-result">
              <p>{en ? "Orders at stake every month" : "طلبات على المحك كل شهر"}</p>
              <strong>AED {stake.toLocaleString()}</strong>
              <small>
                {en
                  ? `${calls * 30} calls and messages a month go unanswered if one in four is missed, each a possible order at your average.`
                  : `${calls * 30} مكالمة ورسالة شهريًا بلا رد إن فات ربعها، كل واحدة طلب محتمل بمتوسطك.`}
              </small>
              <p className="mt">{en ? "Noor, every month" : "نور، كل شهر"}</p>
              <strong>From AED 500</strong>
              <small>
                {en
                  ? "On WhatsApp, 24/7, in Gulf Arabic and English. Phone plans above."
                  : "على واتساب، 24/7، بالخليجي والإنجليزية. خطط الهاتف أعلاه."}
              </small>
              <div className="noor-payback">
                <IconCheck className="h-4 w-4" />
                {en ? (
                  <>
                    Keep <b>{keepOrders} orders</b> of those a month and Noor has paid for herself.
                  </>
                ) : (
                  <>
                    احتفظ بـ <b>{keepOrders} طلبات</b> منها شهريًا وقد دفعت نور عن نفسها.
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* Compared */}
        <section id="noor-compared" className="noor-compared">
          <div className="shell">
            <p className="noor-eyebrow">
              <span />
              {en ? "Compared" : "المقارنة"}
            </p>
            <h2>
              {en ? (
                <>
                  Another person on the phone, <span>or Noor.</span>
                </>
              ) : (
                <>
                  شخص آخر على الهاتف، <span>أو نور.</span>
                </>
              )}
            </h2>
            <p className="noor-lead">
              {en
                ? "In US data, 25 to 40% of restaurant calls at peak hours go unanswered. One person answers one call at a time."
                : "في بيانات أمريكية، 25 إلى 40% من مكالمات المطاعم في الذروة بلا رد. شخص واحد يجيب مكالمة واحدة في كل مرة."}
            </p>
            <div className="noor-table">
              <div className="noor-table-head">
                <span />
                <span className="is-noor">Noor</span>
                <span>{en ? "Phone person" : "موظف الهاتف"}</span>
              </div>
              {(en
                ? [
                    ["Takes the whole order, into your POS", "check", "Writes it down"],
                    ["Gulf Arabic and English", "check", "Depends on the hire"],
                    ["Phone, WhatsApp and Instagram at once", "check", "One at a time"],
                    ["Answers at 23:47 and through the Friday rush", "check", "x"],
                    ["Remembers every regular’s usual", "check", "The ones they remember"],
                    ["Passes the complex ones to your team, chat attached", "check", "Comes to find you"],
                    ["What it costs", "A fixed monthly fee, 24/7", "A salary, one shift"],
                  ]
                : [
                    ["تأخذ الطلب كاملًا إلى نقطة البيع", "check", "تكتبه يدويًا"],
                    ["خليجي وإنجليزي", "check", "حسب التوظيف"],
                    ["هاتف وواتساب وإنستغرام معًا", "check", "واحد في كل مرة"],
                    ["ترد في 23:47 وأثناء زحمة الجمعة", "check", "x"],
                    ["تتذكر طلب كل زبون معتاد", "check", "من تتذكرهم"],
                    ["تمرر المعقد لفريقك بالمحادثة", "check", "تبحث عنك"],
                    ["التكلفة", "رسوم شهرية ثابتة، 24/7", "راتب، وردية واحدة"],
                  ]
              ).map(([feat, noor, human]) => (
                <div key={feat as string} className="noor-table-row">
                  <span>{feat as string}</span>
                  <span className="is-noor">
                    {noor === "check" ? <IconCheck className="h-4 w-4 text-[var(--primary)]" /> : (noor as string)}
                  </span>
                  <span>{human === "x" ? "×" : (human as string)}</span>
                </div>
              ))}
            </div>
            <p className="noor-stats-note">
              {en
                ? "The starting price covers WhatsApp. Phone answering is on the plan above, confirmed at the visit."
                : "السعر الابتدائي يغطي واتساب. الرد الهاتفي على الخطة الأعلى، يُؤكد عند الزيارة."}
            </p>
          </div>
        </section>

        {/* Team */}
        <section id="noor-team" className="noor-people">
          <div className="shell noor-people-grid">
            <div>
              <p className="noor-eyebrow">
                <span />
                {en ? "The people behind Noor" : "الأشخاص خلف نور"}
              </p>
              <h2>
                {en ? (
                  <>
                    Noor is the AI. <span>We are the people behind her.</span>
                  </>
                ) : (
                  <>
                    نور هي الذكاء الاصطناعي. <span>نحن الأشخاص خلفها.</span>
                  </>
                )}
              </h2>
              <p className="noor-lead">
                {en
                  ? "Based in Burjuman, Dubai. We set Noor up at your shop ourselves — and you call a person, not a ticket queue."
                  : "مقرنا برجمان، دبي. نضبط نور في متجرك بأنفسنا — وتتصل بشخص لا بطابور تذاكر."}
              </p>
              <div className="noor-people-points">
                {(en
                  ? [
                      "Set up at your shop, in person, anywhere in Dubai.",
                      "You call a person, not a ticket queue.",
                      "Menu changed? We adjust Noor with you.",
                      "Arabic and English, on the phone and in your shop.",
                    ]
                  : [
                      "إعداد في متجرك شخصيًا، في أي مكان بدبي.",
                      "تتصل بشخص لا بطابور تذاكر.",
                      "تغيرت القائمة؟ نضبط نور معك.",
                      "عربي وإنجليزي، على الهاتف وفي متجرك.",
                    ]
                ).map((line) => (
                  <p key={line}>
                    <IconCheck className="h-4 w-4 text-[var(--primary)]" />
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <aside className="noor-contact-card">
              <div className="noor-contact-head">
                <div className="noor-avatar is-lg">
                  <Image src={images.founder} alt="Muhammad Majid" fill className="object-cover" sizes="72px" />
                </div>
                <div>
                  <strong>Muhammad Majid</strong>
                  <p>{en ? "Your contact at Hello Techo" : "جهة اتصالك في Hello Techo"}</p>
                  <small>
                    <IconPin className="h-3.5 w-3.5" /> Burjuman, Dubai
                  </small>
                </div>
              </div>
              <p className="noor-contact-quote">
                {en
                  ? "Call us before you decide anything. We will tell you in five minutes whether Noor fits your shop, and if she does, we come to you and set her up ourselves."
                  : "اتصل بنا قبل أي قرار. نخبرك خلال خمس دقائق إن كانت نور تناسب متجرك، وإن ناسبت نأتي ونضبطها بأنفسنا."}
              </p>
              <div className="noor-contact-actions">
                <a href={routes.talk} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <IconPhone className="h-4 w-4" />
                  {en ? "Call us" : "اتصل بنا"}
                </a>
                <a href={routes.talk} target="_blank" rel="noopener noreferrer" className="noor-wa">
                  <IconWhatsApp className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <p className="noor-muted">
                {en
                  ? "A person answers. If we are at another shop, we call you back the same day."
                  : "يرد شخص. إن كنا في متجر آخر، نعاود الاتصال في نفس اليوم."}
              </p>
            </aside>
          </div>
        </section>

        {/* Pricing */}
        <section id="noor-pricing" className="noor-price" style={{ backgroundImage: `url(${images.bakery})` }}>
          <div className="noor-price-veil" />
          <div className="shell noor-price-grid">
            <div className="noor-price-copy">
              <p className="noor-eyebrow is-dark">
                <span />
                {en ? "Pricing" : "الأسعار"}
              </p>
              <h2>
                {en ? (
                  <>
                    Less than a coffee a day, <span>for an employee who never clocks off.</span>
                  </>
                ) : (
                  <>
                    أقل من قهوة في اليوم، <span>لموظفة لا تغادر الوردية.</span>
                  </>
                )}
              </h2>
              <p>
                {en
                  ? "AED 500 a month for Noor on WhatsApp, 24/7, in Gulf Arabic and English. Phone, Instagram and web chat come on the plans above, and the price scales with the conversations she handles and the branches she works. We confirm your plan at the visit."
                  : "500 درهم شهريًا لنور على واتساب، 24/7، بالخليجي والإنجليزية. الهاتف وإنستغرام ودردشة الويب على الخطط الأعلى، والسعر يتدرج مع المحادثات والفروع. نؤكد خطتك عند الزيارة."}
              </p>
            </div>

            <aside className="noor-price-card">
              <p className="noor-price-day">
                {en ? "From" : "من"} <strong>AED 16.6</strong> {en ? "a day" : "يوميًا"}
              </p>
              <div className="noor-price-pills">
                <span>24/7</span>
                <span>
                  <IconWhatsApp className="h-3.5 w-3.5" /> WhatsApp
                </span>
                <span>{en ? "Gulf Arabic and English" : "خليجي وإنجليزي"}</span>
                <span>{en ? "No setup fee" : "بلا رسوم إعداد"}</span>
              </div>
              <span className="noor-price-soft">{en ? "No contract, cancel any month" : "بلا عقد، ألغِ أي شهر"}</span>
              <hr />
              <p className="noor-price-trial">
                <IconCheck className="h-4 w-4" />
                <span>
                  {en ? (
                    <>
                      100 real customer conversations on your own number, 90 chats and 10 calls, whichever comes first. A
                      person switches her on at your shop; nothing is charged during the trial.{" "}
                      <b>14 days free to start.</b>
                    </>
                  ) : (
                    <>
                      100 محادثة عملاء حقيقية على أرقامك، 90 دردشة و10 مكالمات، أيهما يأتي أولًا. شخص يشغّلها في متجرك؛
                      لا يُحسب شيء أثناء التجربة. <b>14 يومًا مجانًا للبدء.</b>
                    </>
                  )}
                </span>
              </p>
              <a href="#noor-trial" className="btn-primary noor-price-btn">
                {en ? "Book free trial" : "احجز تجربة مجانية"}
              </a>
              <a href="#noor-try" className="noor-price-link">
                {en ? "Not sure yet? Let Noor call you first →" : "لست متأكدًا؟ دع نور تتصل بك أولًا ←"}
              </a>
            </aside>
          </div>
        </section>

        {/* FAQ */}
        <section id="noor-faq" className="noor-faq">
          <div className="shell noor-faq-grid">
            <div>
              <p className="noor-faq-badge">{en ? "Questions owners ask" : "أسئلة المالكين"}</p>
              <h2>
                {en ? (
                  <>
                    Seven things to know <span>before she calls.</span>
                  </>
                ) : (
                  <>
                    سبعة أمور تعرفها <span>قبل أن تتصل.</span>
                  </>
                )}
              </h2>
            </div>
            <div className="noor-accordion">
              {faqItems.map(([q, a], index) => {
                const isOpen = faqOpen === index;
                return (
                  <div key={q} className={`noor-acc-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="noor-acc-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setFaqOpen(isOpen ? -1 : index)}
                    >
                      <span>{q}</span>
                      <IconChevron className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen ? <p className="noor-acc-body">{a}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Free trial */}
        <section id="noor-trial" className="noor-trial">
          <div className="shell noor-trial-grid">
            <div>
              <p className="noor-eyebrow">
                <span />
                {en ? "Free trial" : "تجربة مجانية"}
              </p>
              <h2>
                {en ? (
                  <>
                    14 days free, <span>on your own numbers.</span>
                  </>
                ) : (
                  <>
                    14 يومًا مجانًا، <span>على أرقامك.</span>
                  </>
                )}
              </h2>
              <p className="noor-lead">
                {en
                  ? "Nothing to install, nothing to learn. Four steps, with a person at each one."
                  : "لا شيء للتثبيت ولا للتعلّم. أربع خطوات، وشخص في كل واحدة."}
              </p>

              <ol className="noor-steps">
                {(en
                  ? [
                      [
                        "1",
                        "Today · 5 minutes",
                        "Noor calls you",
                        "You place a sample order. She confirms it back, the way she would with your customers.",
                      ],
                      [
                        "2",
                        "This week · 30 minutes",
                        "A person comes to your shop",
                        "From Burjuman to your counter, anywhere in Dubai. Menu, rules and payment details set up together. If it is not a fit, we say so before we leave.",
                      ],
                      [
                        "3",
                        "Within 7 days · 14 days free",
                        "Noor goes live on your numbers",
                        "100 real customer conversations, 90 chats and 10 calls, or 14 days, whichever comes first. Nothing is charged. On day 12 you get a one-page report: orders taken, after-hours conversations, handovers to your team.",
                      ],
                      [
                        "4",
                        "Day 14",
                        "You decide",
                        "Keep her, or we switch her off. No setup fee, no contract, cancel any month.",
                      ],
                    ]
                  : [
                      [
                        "1",
                        "اليوم · 5 دقائق",
                        "نور تتصل بك",
                        "تضع طلبًا تجريبيًا. تؤكده كما تفعل مع عملائك.",
                      ],
                      [
                        "2",
                        "هذا الأسبوع · 30 دقيقة",
                        "شخص يأتي إلى متجرك",
                        "من برجمان إلى كاونترك، في أي مكان بدبي. القائمة والقواعد والدفع معًا. إن لم تناسب نقول ذلك قبل المغادرة.",
                      ],
                      [
                        "3",
                        "خلال 7 أيام · 14 يومًا مجانًا",
                        "نور تعمل على أرقامك",
                        "100 محادثة عملاء، 90 دردشة و10 مكالمات، أو 14 يومًا أيهما أولًا. بلا رسوم. في اليوم 12 تقرير صفحة واحدة.",
                      ],
                      [
                        "4",
                        "اليوم 14",
                        "أنت تقرر",
                        "تُبقيها أو نوقفها. بلا رسوم إعداد، بلا عقد، ألغِ أي شهر.",
                      ],
                    ]
                ).map(([n, when, title, body], i) => (
                  <li key={title} className={i === 0 ? "is-active" : undefined}>
                    <span className="noor-step-n">{n}</span>
                    <div>
                      <small>{when}</small>
                      <strong>{title}</strong>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="noor-trial-links">
                <a href="tel:+17195124485">
                  {en ? "Prefer to talk? Call our team" : "تفضل الحديث؟ اتصل بفريقنا"} <IconPhone className="h-3.5 w-3.5" />
                </a>
                <a href={routes.talk} target="_blank" rel="noopener noreferrer">
                  {en ? "Prefer WhatsApp? Message our team" : "تفضل واتساب؟ راسل فريقنا"}{" "}
                  <IconWhatsApp className="h-3.5 w-3.5 text-[#25d366]" />
                </a>
                <a href="#noor-try">{en ? "Not sure yet? Let Noor call you →" : "لست متأكدًا؟ دع نور تتصل بك ←"}</a>
              </div>
            </div>

            <aside className="noor-book">
              <h3>{en ? "Pick a time for us to visit your shop" : "اختر وقتًا لزيارتنا متجرك"}</h3>
              <p>{en ? "30 minutes at your shop. Your 14 days start the day Noor goes live." : "30 دقيقة في متجرك. تبدأ أيامك الـ14 يوم تشغيل نور."}</p>
              <p className="noor-book-mail">
                {en ? "Calendar not loading? Email" : "التقويم لا يعمل؟ راسل"}{" "}
                <a href={`mailto:majid@${brand.email.split("@")[1] || "hellotecho.example"}`}>
                  majid@{brand.email.split("@")[1] || "hellotecho.example"}
                </a>{" "}
                {en ? "and we will send you times." : "وسنرسل لك المواعيد."}
              </p>
              <p className="noor-book-place">
                <IconPin className="h-4 w-4" />
                {en ? (
                  <>
                    One call away from your shop. <em>Based in Burjuman, Dubai.</em>
                  </>
                ) : (
                  <>
                    مكالمة واحدة من متجرك. <em>مقرنا برجمان، دبي.</em>
                  </>
                )}
              </p>

              <div className="noor-cal">
                <p className="noor-cal-title">{en ? "Select a Day" : "اختر يومًا"}</p>
                <div className="noor-cal-nav">
                  <span>{en ? "November 2026" : "نوفمبر 2026"}</span>
                  <span aria-hidden>‹ ›</span>
                </div>
                <div className="noor-cal-week">
                  {weekdays.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="noor-cal-grid">
                  {calendarCells.map((day, idx) => {
                    if (day == null) return <span key={`e-${idx}`} />;
                    const available = trialAvailableDays.has(day);
                    const selected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={!available}
                        className={`${available ? "is-avail" : ""} ${selected ? "is-selected" : ""}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="noor-cal-tz">
                  <strong>{en ? "Time zone" : "المنطقة الزمنية"}</strong>
                  <button type="button">
                    {en ? "Pakistan, Maldives Time" : "توقيت باكستان / المالديف"}
                    <IconChevron className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <a href="#noor-trial" className="noor-float-trial">
        <span />
        {en ? "Book your free trial" : "احجز تجربتك المجانية"}
      </a>

      <Footer />
    </>
  );
}
