"use client";

import Image from "../next-image";
import Link from "../next-link";
import { useEffect, useState } from "react";
import { CallSimActions } from "./CallSimActions";
import { Cta } from "./Cta";
import { Faq } from "./Faq";
import {
  IconChat,
  IconCheck,
  IconPhone,
  IconMail,
  IconPlay,
  IconSms,
  IconWhatsApp,
  IconInstagram,
} from "./Icons";
import { Pricing } from "./Pricing";
import { TourVideoModal } from "./TourVideoModal";
import { useLocale } from "../lib/locale";
import { useVoiceSim } from "../lib/useVoiceSim";
import { brand, images, routes } from "../lib/site";

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
    enLines: [
      { who: "guest", text: "Hi, do you have a sea-view suite available for 2 nights starting Friday?" },
      { who: "agent", text: "Yes! Our Deluxe Sea-View Suite is available Fri–Sun at QAR 1,450/night including breakfast. Shall I hold it for you?" },
      { who: "guest", text: "Yes please, for 2 adults under Tariq Al-Mansoor." },
      { who: "agent", text: "Reserved! Confirmation #MB-4821 sent to your WhatsApp with a secure payment link." },
    ],
    arLines: [
      { who: "guest", text: "مرحباً، هل يتوفر جناح مطل على البحر لليلتين ابتداءً من الجمعة؟" },
      { who: "agent", text: "نعم! جناح ديلوكس مطل على البحر متاح من الجمعة للأحد بسعر 1,450 ر.ق/ليلة شامل الإفطار. هل أحجزه لك؟" },
      { who: "guest", text: "نعم من فضلك، لشخصين باسم طارق المنصور." },
      { who: "agent", text: "تم الحجز! أُرسل التأكيد #MB-4821 عبر واتساب مع رابط الدفع الآمن." },
    ],
    systemEn: "Reservation #MB-4821 synced in Opera PMS · payment link sent",
    systemAr: "تمت مزامنة الحجز #MB-4821 في Opera PMS · وإرسال رابط الدفع",
  },
  {
    title: "Pre-Arrival & Concierge",
    body: "Transfers, early check-in, spa and dining",
    enLines: [
      { who: "guest", text: "We land at 10:30 AM tomorrow. Can we arrange airport pickup and early check-in?" },
      { who: "agent", text: "Chauffeur pickup is confirmed for 10:30 AM (Flight QR 104), and we’ve flagged 12:00 PM early check-in for Suite 804." },
      { who: "guest", text: "Amazing, can you also book dinner for 2 at 8 PM?" },
      { who: "agent", text: "Done — terrace table for 2 at 8:00 PM at Al Bandar Grill is confirmed." },
    ],
    arLines: [
      { who: "guest", text: "تصل رحلتنا الساعة 10:30 صباحاً غداً. هل يمكن ترتيب توصيل المطار وتسجيل دخول مبكر؟" },
      { who: "agent", text: "تم تأكيد السائق الساعة 10:30 صباحاً، وتجهيز تسجيل الدخول المبكر الساعة 12:00 ظهراً للجناح 804." },
      { who: "guest", text: "ممتاز، هل يمكن حجز عشاء لشخصين الساعة 8 مساءً؟" },
      { who: "agent", text: "تم — حجزنا لكم طاولة على التراس لشخصين الساعة 8:00 مساءً." },
    ],
    systemEn: "Chauffeur dispatch & dining reservation logged in concierge queue",
    systemAr: "تم تسجيل توصيل المطار وحجز العشاء في قائمة الكونسيرج",
  },
  {
    title: "In-Stay & Housekeeping",
    body: "Requests routed and dispatched in seconds",
    enLines: [
      { who: "guest", text: "Could we get two extra pillows and fresh towels in Room 512?" },
      { who: "agent", text: "Of course! I’ve sent your request straight to Housekeeping — expected in ~10 minutes." },
      { who: "guest", text: "Thank you!" },
    ],
    arLines: [
      { who: "guest", text: "هل يمكن إرسال وسادتين إضافيتين ومناشف نظيفة للغرفة 512؟" },
      { who: "agent", text: "بالتأكيد! تم إرسال الطلب مباشرة لفريق التدبير المنزلي — سيصل خلال 10 دقائق." },
      { who: "guest", text: "شكراً جزيلاً!" },
    ],
    systemEn: "Housekeeping ticket #HK-914 dispatched to Floor 5 attendant",
    systemAr: "تم توجيه تذكرة التدبير #HK-914 لمشرف الطابق الخامس",
  },
  {
    title: "Service Recovery",
    body: "Caught during the stay, not in the review",
    enLines: [
      { who: "guest", text: "The AC in Room 309 is making a loud noise and it’s quite warm." },
      { who: "agent", text: "I’m very sorry about that. I’ve alerted Engineering immediately and looped in our Duty Manager to offer a suite move right away." },
      { who: "guest", text: "Appreciate the fast response." },
    ],
    arLines: [
      { who: "guest", text: "المكيف في الغرفة 309 يصدر صوتاً عالياً والغرفة دافئة." },
      { who: "agent", text: "نعتذر بشدة. تم إبلاغ الصيانة فوراً وتصعيد الأمر لمدير المناوبة لترتيب نقل فوري لجناح بديل." },
      { who: "guest", text: "أقدّر سرعة الاستجابة." },
    ],
    systemEn: "Priority escalation #ESC-204 assigned to Duty Manager (SLA < 5m)",
    systemAr: "تم تصعيد الأولوية #ESC-204 لمدير المناوبة (الاستجابة < 5 دقائق)",
  },
  {
    title: "Meetings & Events",
    body: "Qualifies the inquiry, sends the proposal",
    enLines: [
      { who: "guest", text: "Looking for a ballroom for 120 guests on Nov 18 with AV and lunch." },
      { who: "agent", text: "Al Dana Ballroom is open on Nov 18. For 120 guests with AV and buffet lunch, packages start at QAR 280/guest. Shall I send the proposal PDF?" },
      { who: "guest", text: "Yes, send it to events@gulfcorp.qa" },
      { who: "agent", text: "Sent! Our Events Director is copied and ready for a site walkthrough anytime." },
    ],
    arLines: [
      { who: "guest", text: "نبحث عن قاعة لـ 120 ضيفاً يوم 18 نوفمبر مع تجهيزات الصوت والغداء." },
      { who: "agent", text: "قاعة الدانة متاحة يوم 18 نوفمبر. لـ 120 ضيفاً تبدأ الباقة من 280 ر.ق/ضيف. هل أرسل العرض التفصيلي؟" },
      { who: "guest", text: "نعم، أرسله إلى events@gulfcorp.qa" },
      { who: "agent", text: "تم الإرسال! مديرة الفعاليات على تواصل معكم لترتيب جولة القاعة." },
    ],
    systemEn: "Event lead qualified & proposal emailed · CRM deal created",
    systemAr: "تم تأهيل طلب الفعالية وإرسال العرض · وإنشاء فرصة في CRM",
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

export function HospitalityPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [accent, setAccent] = useState<(typeof accents)[number]>("Emirati");
  const sim = useVoiceSim();
  const [voice, setVoice] = useState("noor");
  const [caseIndex, setCaseIndex] = useState(1);
  const [guestLang, setGuestLang] = useState<"en" | "ar">("en");
  const [channel, setChannel] = useState("WhatsApp");
  const [tourOpen, setTourOpen] = useState(false);
  const [dashTab, setDashTab] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const activeCase = useCases[caseIndex] ?? useCases[0];
  const activeLines = guestLang === "ar" ? activeCase.arLines : activeCase.enLines;
  const [visibleCount, setVisibleCount] = useState<number>(activeLines.length);

  useEffect(() => {
    setVisibleCount(1);
    const timers: number[] = [];
    for (let i = 2; i <= activeLines.length + 1; i += 1) {
      timers.push(window.setTimeout(() => setVisibleCount(i), (i - 1) * 650));
    }
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [caseIndex, channel, guestLang, replayKey, activeLines.length]);

  const dashViews = [
    {
      title: en ? "Overview" : "نظرة عامة",
      sub: en ? "Last 7 days · outcome-first · All properties" : "آخر 7 أيام · كل العقارات",
      badge: en ? "7 days" : "7 أيام",
      stats: [
        { label: en ? "Resolved by AI" : "حلّها الذكاء الاصطناعي", val: "92%", sub: "1,181 / 1,284" },
        { label: en ? "Reservations taken" : "حجوزات مأخوذة", val: "318", sub: "+9%" },
        { label: en ? "Escalations" : "تصعيدات", val: "104", sub: "CSAT 4.6" },
      ],
      leftTitle: en ? "By property" : "حسب العقار",
      leftCount: "3",
      leftRows: [
        ["Marsa Al Bandar - JBR", "796", "94%", "198", "61"],
        ["Al Bandar Saadiyat", "336", "91%", "84", "28"],
        ["Al Qasr Sharjah", "152", "88%", "36", "15"],
      ],
      rightTitle: en ? "Top topics" : "أبرز المواضيع",
      rightTag: en ? "auto" : "تلقائي",
      rightRows: [
        [en ? "Rates & availability" : "الأسعار والتوفر", "29%"],
        [en ? "Airport transfers" : "نقل المطار", "17%"],
        [en ? "Housekeeping requests" : "طلبات التدبير", "12%"],
        [en ? "Groups & events" : "مجموعات وفعاليات", "8%"],
      ],
    },
    {
      title: en ? "Agent" : "الوكيل الذكي",
      sub: en ? "Noor · Bilingual Concierge & Reservations" : "نور · كونسيرج وحجوزات ثنائي اللغة",
      badge: en ? "Active" : "نشط",
      stats: [
        { label: en ? "First reply" : "أول رد", val: "1.8s", sub: en ? "median" : "متوسط" },
        { label: en ? "Approval rules" : "قواعد الموافقة", val: "14", sub: en ? "enforced" : "مفعّلة" },
        { label: en ? "Hallucination rate" : "نسبة الخطأ", val: "0%", sub: en ? "grounded" : "موثق" },
      ],
      leftTitle: en ? "Active skills" : "المهارات المفعلة",
      leftCount: "4",
      leftRows: [
        [en ? "Direct Room Booking" : "حجز الغرف المباشر", "Opera", "96%", "198", "0"],
        [en ? "Airport Chauffeur" : "توصيل المطار", "Fleet", "94%", "84", "2"],
        [en ? "Housekeeping Dispatch" : "توجيه التدبير", "HotSOS", "98%", "112", "1"],
      ],
      rightTitle: en ? "Guardrails" : "ضوابط الأمان",
      rightTag: en ? "locked" : "مؤمن",
      rightRows: [
        [en ? "Refunds > QAR 500 -> human" : "الاسترداد > 500 ر.ق -> بشري", "100%"],
        [en ? "VIP guest -> Duty Manager" : "كبار الشخصيات -> مدير المناوبة", "100%"],
        [en ? "Approved rate card only" : "الالتزام بقائمة الأسعار المعتمدة", "100%"],
      ],
    },
    {
      title: en ? "Conversations" : "المحادثات",
      sub: en ? "Live unified inbox · 6 channels" : "صندوق وارد موحد · 6 قنوات",
      badge: en ? "Live" : "مباشر",
      stats: [
        { label: en ? "Active threads" : "محادثات نشطة", val: "24", sub: en ? "now" : "الآن" },
        { label: en ? "Handled by AI" : "بواسطة الذكاء", val: "22", sub: "91.7%" },
        { label: en ? "Human takeover" : "استلام بشري", val: "2", sub: en ? "1-click" : "نقرة واحدة" },
      ],
      leftTitle: en ? "Recent guests" : "أحدث الضيوف",
      leftCount: "3",
      leftRows: [
        ["Tariq Al-Mansoor · WhatsApp", "Suite", "98%", "Confirmed", "AI"],
        ["Elena Rostova · Web chat", "Spa", "95%", "Booked", "AI"],
        ["Khalid Al-Thani · Voice", "Event", "100%", "Escalated", "Yousef"],
      ],
      rightTitle: en ? "By language" : "حسب اللغة",
      rightTag: "24h",
      rightRows: [
        [en ? "Arabic (Gulf / MSA)" : "العربية (خليجي / فصحى)", "58%"],
        [en ? "English" : "الإنجليزية", "39%"],
        [en ? "Other languages" : "لغات أخرى", "3%"],
      ],
    },
    {
      title: en ? "Knowledge base" : "قاعدة المعرفة",
      sub: en ? "Synced per property & per language" : "متزامنة لكل عقار وكل لغة",
      badge: en ? "Synced" : "متزامن",
      stats: [
        { label: en ? "Approved docs" : "مستندات معتمدة", val: "48", sub: "EN + AR" },
        { label: en ? "Last indexed" : "آخر فهرسة", val: "12m", sub: en ? "ago" : "مضت" },
        { label: en ? "Coverage" : "التغطية", val: "99%", sub: "verified" },
      ],
      leftTitle: en ? "Indexed sources" : "المصادر المفهرسة",
      leftCount: "3",
      leftRows: [
        [en ? "2026 Rate Card & Packages" : "قائمة أسعار 2026", "PDF", "100%", "EN/AR", "OK"],
        [en ? "Dining & Spa Menus" : "قوائم المطاعم والسبا", "CMS", "100%", "EN/AR", "OK"],
        [en ? "Check-in & Pet Policies" : "سياسات الوصول والإقامة", "Doc", "98%", "EN/AR", "OK"],
      ],
      rightTitle: en ? "Freshness" : "الحداثة",
      rightTag: "auto",
      rightRows: [
        [en ? "Room rates & promos" : "أسعار الغرف والعروض", "100%"],
        [en ? "Outlet opening hours" : "ساعات عمل المطاعم", "100%"],
        [en ? "Airport transfer fees" : "رسوم توصيل المطار", "100%"],
      ],
    },
    {
      title: en ? "Channels" : "القنوات",
      sub: en ? "WhatsApp, Voice, Web, Instagram, SMS, Email" : "واتساب، صوت، ويب، إنستغرام، رسائل، بريد",
      badge: "6 / 6",
      stats: [
        { label: en ? "WhatsApp share" : "حصة واتساب", val: "54%", sub: "693 msgs" },
        { label: en ? "Voice calls" : "مكالمات صوتية", val: "24%", sub: "< 3 rings" },
        { label: en ? "Web + IG + Email" : "ويب + إنستغرام + بريد", val: "22%", sub: "0 missed" },
      ],
      leftTitle: en ? "Channel health" : "حالة القنوات",
      leftCount: "3",
      leftRows: [
        ["WhatsApp Business (+974)", "693", "95%", "184", "21"],
        ["Inbound Voice (+974)", "308", "89%", "76", "34"],
        ["Web & Instagram DM", "283", "93%", "58", "18"],
      ],
      rightTitle: en ? "Response SLA" : "سرعة الرد",
      rightTag: "live",
      rightRows: [
        ["WhatsApp", "98%"],
        ["Voice (< 3 rings)", "96%"],
        ["Instagram DM", "94%"],
      ],
    },
    {
      title: en ? "Properties" : "العقارات",
      sub: en ? "Multi-property routing with local rules" : "توجيه متعدد العقارات بقواعد محلية",
      badge: "3",
      stats: [
        { label: en ? "Total keys" : "إجمالي الغرف", val: "478", sub: "3 hotels" },
        { label: en ? "PMS connections" : "ربط PMS", val: "3/3", sub: "Opera" },
        { label: en ? "Direct booking lift" : "زيادة الحجز المباشر", val: "+34%", sub: "MoM" },
      ],
      leftTitle: en ? "Property breakdown" : "تفاصيل العقارات",
      leftCount: "3",
      leftRows: [
        ["Marsa Al Bandar - JBR", "220 keys", "94%", "198", "61"],
        ["Al Bandar Saadiyat", "168 keys", "91%", "84", "28"],
        ["Al Qasr Sharjah", "90 keys", "88%", "36", "15"],
      ],
      rightTitle: en ? "Occupancy impact" : "تأثير الإشغال",
      rightTag: "30d",
      rightRows: [
        ["Direct web & WA", "68%"],
        ["OTA deflection", "24%"],
        ["Repeat guests", "8%"],
      ],
    },
    {
      title: en ? "Voice" : "الصوت",
      sub: en ? "Arabic & English voice reception on your numbers" : "استقبال صوتي عربي وإنجليزي على أرقامك",
      badge: en ? "On" : "مفعل",
      stats: [
        { label: en ? "Calls answered" : "مكالمات مجابة", val: "308", sub: "100%" },
        { label: en ? "Avg pickup" : "سرعة الرد", val: "1.4s", sub: "2nd ring" },
        { label: en ? "Call bookings" : "حجوزات هاتفية", val: "76", sub: "+14%" },
      ],
      leftTitle: en ? "Voice agents" : "الوكلاء الصوتيون",
      leftCount: "3",
      leftRows: [
        ["Noor · Qatari / MSA", "164 calls", "93%", "44", "9"],
        ["Yousuf · Emirati / EN", "98 calls", "90%", "22", "6"],
        ["Sultan · Saudi / EN", "46 calls", "88%", "10", "4"],
      ],
      rightTitle: en ? "Call outcomes" : "نتائج المكالمات",
      rightTag: "7d",
      rightRows: [
        [en ? "Booked directly" : "حجز مباشر", "46%"],
        [en ? "Concierge answered" : "إجابة كونسيرج", "39%"],
        [en ? "Warm transfer" : "تحويل لفريقك", "15%"],
      ],
    },
  ];
  const currentDash = dashViews[dashTab] ?? dashViews[0];
  const hospTab = t.industries.tabs.find((item) => item.id === "hospitality") ?? t.industries.tabs[0];

  return (
    <>
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
                  <span className="hp-dial">QA +974</span>
                  <input
                    type="tel"
                    value={sim.phone}
                    onChange={(e) => sim.setPhone(e.target.value)}
                    placeholder="3163 7274"
                    aria-label={en ? "Phone" : "الهاتف"}
                  />
                </div>
                <label className="hp-check">
                  <input
                    type="checkbox"
                    checked={sim.agreed}
                    onChange={(e) => sim.setAgreed(e.target.checked)}
                  />
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

                <CallSimActions
                  en={en}
                  status={sim.status}
                  errorMsg={sim.errorMsg}
                  voiceName={voices.find((v) => v.id === voice)?.name ?? "Noor"}
                  accent={accent}
                  phone={sim.phone}
                  onCall={() =>
                    sim.triggerCall({
                      locale,
                      accent,
                      voice,
                      greetingEn: "Hello! Welcome to Hello Techno Hospitality Concierge. How can I assist with your stay or reservation today?",
                      greetingAr: "مرحباً بكم في خدمة الضيافة من هيلو تكنو. كيف يمكنني مساعدتكم في الحجز أو الإقامة اليوم؟",
                    })
                  }
                  onStop={sim.stopCall}
                  onBrowserTalk={sim.openWidget}
                  browserLabel={en ? "Talk in your browser" : "تحدث في المتصفح"}
                />
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
                  <button type="button" className="btn-primary w-full" onClick={sim.openWidget}>
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
                ? "Arabic native · runs on your own +974 numbers · your team approves every rule"
                : "عربي أصيل · يعمل على أرقام +974 الخاصة بك · فريقك يعتمد كل قاعدة"}
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
                <button type="button" className="hp-tour-btn" onClick={() => setTourOpen(true)}>
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
                <button type="button" className="hp-play" aria-label={en ? "Play" : "تشغيل"} onClick={() => setTourOpen(true)}>
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
                    {channel} · {guestLang === "en" ? "English" : "العربية"} · {activeCase.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplayKey((k) => k + 1)}
                    className="hp-scripted cursor-pointer transition-opacity hover:opacity-80"
                  >
                    ↻ {en ? "Replay" : "إعادة"}
                  </button>
                </div>
                <div className="hp-transcript-bg">
                  <Image src={images.hospitality} alt="" fill className="object-cover opacity-30" sizes="800px" />
                </div>
                <div className="hp-bubbles" dir={guestLang === "ar" ? "rtl" : "ltr"}>
                  {activeLines.slice(0, visibleCount).map((line, i) => (
                    <div key={`${caseIndex}-${replayKey}-${i}`} className={`hp-bubble is-${line.who}`}>
                      <p>{line.text}</p>
                    </div>
                  ))}
                  {visibleCount <= activeLines.length ? (
                    <div className="hp-bubble is-agent">
                      <p className="opacity-70">{guestLang === "ar" ? "جارٍ الكتابة…" : "Typing…"}</p>
                    </div>
                  ) : (
                    <p className="hp-system">
                      ✦ {guestLang === "ar" ? activeCase.systemAr : activeCase.systemEn}
                    </p>
                  )}
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
                  <p className="is-before-label">{en ? "Before Hello Techno" : "قبل Hello Techno"}</p>
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
                  <button key={tab} type="button" className={dashTab === i ? "is-active" : ""} onClick={() => setDashTab(i)}>
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
                <p>app.hellotechno.ai / al-bandar-collection</p>
                <em>{en ? "Sample data" : "بيانات عينة"}</em>
              </div>
              <div className="hp-dash-body">
                <aside className="hp-dash-side">
                  <p className="hp-dash-side-brand">{brand.short}</p>
                  {["Overview", "Agent", "Conversations", "Knowledge base", "Channels", "Properties", "Voice"].map(
                    (item, i) => (
                      <span
                        key={item}
                        className={dashTab === i ? "is-active cursor-pointer" : "cursor-pointer"}
                        onClick={() => setDashTab(i)}
                      >
                        {item}
                      </span>
                    ),
                  )}
                  <p className="hp-dash-side-meta">{en ? "3 properties · 478 keys" : "3 عقارات · 478 مفتاحًا"}</p>
                </aside>
                <div className="hp-dash-main">
                  <div className="hp-dash-main-head">
                    <div>
                      <h3>{currentDash.title}</h3>
                      <p>{currentDash.sub}</p>
                    </div>
                    <span>{currentDash.badge}</span>
                  </div>
                  <div className="hp-dash-stats">
                    {currentDash.stats.map((st) => (
                      <article key={st.label}>
                        <p>{st.label}</p>
                        <strong>{st.val}</strong>
                        <small>{st.sub}</small>
                      </article>
                    ))}
                  </div>
                  <div className="hp-dash-tables">
                    <div>
                      <div className="hp-dash-table-head">
                        <h4>{currentDash.leftTitle}</h4>
                        <span>{currentDash.leftCount}</span>
                      </div>
                      {currentDash.leftRows.map((row) => (
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
                        <h4>{currentDash.rightTitle}</h4>
                        <span>{currentDash.rightTag}</span>
                      </div>
                      {currentDash.rightRows.map(([topic, vol]) => (
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
                  ? "Dubai’s consumer protection rules and Saudi mandates make bilingual service non-negotiable. Hello Techno is Arabic-first: Gulf, Levantine, Egyptian and MSA, on voice and chat, with the same booking and escalation rules."
                  : "قواعد حماية المستهلك في دبي ومتطلبات السعودية تجعل الخدمة باللغتين غير قابلة للتفاوض. Hello Techno عربية أولًا: خليجي وشامي ومصري وفصحى، على الصوت والدردشة، بنفس قواعد الحجز والتصعيد."}
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

      <TourVideoModal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        title={en ? "Hello Techno · Hospitality Tour" : "Hello Techno · جولة الضيافة"}
      />
    </>
  );
}
