"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { PromoBar } from "@/components/Header";
import {
  IconChat,
  IconCheck,
  IconChevron,
  IconInstagram,
  IconMail,
  IconMenu,
  IconPhone,
  IconPin,
  IconPlay,
  IconShieldCheck,
  IconSms,
  IconUtensils,
  IconWhatsApp,
  LogoMark,
} from "@/components/Icons";
import { Pricing } from "@/components/Pricing";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const accents = ["Emirati", "Saudi", "MSA (Fusha)", "Kuwaiti", "Qatari", "Omani"] as const;
const voices = [
  { id: "noor", name: "Noor", gender: "FEMALE", letter: "N" },
  { id: "yousuf", name: "Yousuf", gender: "MALE", letter: "Y" },
  { id: "sultan", name: "Sultan", gender: "MALE", letter: "S" },
] as const;

type BizMode = "restaurant" | "bakery";
type Line = { who: "guest" | "agent" | "system"; text: string };

type UseCase = {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  personEn: string;
  personAr: string;
  metaEn: string;
  metaAr: string;
  descEn: string;
  descAr: string;
  linesEn: Line[];
  linesAr: Line[];
};

const restaurantCases: UseCase[] = [
  {
    titleEn: "Reservations & Waitlist",
    titleAr: "الحجوزات وقائمة الانتظار",
    bodyEn: "Holds the right table in seconds, then confirms it before service starts.",
    bodyAr: "يحجز الطاولة المناسبة خلال ثوانٍ، ثم يؤكدها قبل بدء الخدمة.",
    personEn: "Sara — dining guest",
    personAr: "سارة — ضيفة مطعم",
    metaEn: "Sara · reservation · WhatsApp, 6:12pm",
    metaAr: "سارة · حجز · واتساب، 6:12 م",
    descEn: "Table holds against your floor plan. Outside preference logged before the guest arrives.",
    descAr: "حجز الطاولة وفق مخطط القاعة. تفضيل الجلسة الخارجية يُسجَّل قبل وصول الضيف.",
    linesEn: [
      { who: "guest", text: "table for 4 tonight around 9? outside if you have it" },
      {
        who: "agent",
        text: "I can hold outdoor table 12 for four at 9:00pm. Shall I confirm under your name?",
      },
      { who: "system", text: "Floor plan checked · outdoor table 12 held for 10 minutes" },
      { who: "guest", text: "yes, Sara Al Mazrouei" },
      {
        who: "agent",
        text: "Confirmed — Sara Al Mazrouei, outdoor for 4 at 9:00pm. I will send a reminder at 7:30pm.",
      },
      { who: "system", text: "Reservation written · host notified · reminder queued" },
    ],
    linesAr: [
      { who: "guest", text: "طاولة لـ 4 الليلة حوالي 9؟ برا إذا متوفر" },
      {
        who: "agent",
        text: "أقدر أحجز الطاولة الخارجية 12 لأربعة الساعة 9:00 م. هل أؤكد باسمك؟",
      },
      { who: "system", text: "تم فحص مخطط القاعة · الطاولة الخارجية 12 محجوزة 10 دقائق" },
      { who: "guest", text: "نعم، سارة المزروعي" },
      {
        who: "agent",
        text: "تم التأكيد — سارة المزروعي، خارجية لـ 4 الساعة 9:00 م. سأرسل تذكيرًا الساعة 7:30 م.",
      },
      { who: "system", text: "كُتب الحجز · أُبلِغ المضيف · التذكير في الانتظار" },
    ],
  },
  {
    titleEn: "Order Taking - Phone & WhatsApp",
    titleAr: "أخذ الطلبات — هاتف وواتساب",
    bodyEn: "Takes the full order on your own number and pushes it into the POS.",
    bodyAr: "يأخذ الطلب كاملًا على رقمك ويدفعه إلى نقطة البيع.",
    personEn: "Khalid — takeaway guest",
    personAr: "خالد — طلب سفري",
    metaEn: "Khalid · takeaway · Voice, 1:04pm",
    metaAr: "خالد · سفري · صوت، 1:04 م",
    descEn: "Full order taken on your line, modifiers checked, ticket pushed to POS.",
    descAr: "طلب كامل على خطك، مع التحقق من الإضافات ودفع التذكرة إلى نقطة البيع.",
    linesEn: [
      { who: "guest", text: "hi, one chicken shawarma wrap and a large mint lemonade for pickup" },
      {
        who: "agent",
        text: "Got it — chicken shawarma wrap and large mint lemonade. Any garlic sauce or chilli?",
      },
      { who: "guest", text: "extra garlic, no chilli. name Khalid" },
      {
        who: "agent",
        text: "Order for Khalid is in. Pickup in about 18 minutes at City Walk. Total AED 42.",
      },
      { who: "system", text: "POS ticket #1842 · pickup ETA 18 min · kitchen notified" },
    ],
    linesAr: [
      { who: "guest", text: "مرحبا، ساندويش شاورما دجاج وعصير ليمون بالنعناع كبير للاستلام" },
      {
        who: "agent",
        text: "تم — شاورما دجاج وعصير ليمون بالنعناع كبير. ثوم إضافي أو فلفل؟",
      },
      { who: "guest", text: "ثوم زيادة بدون فلفل. الاسم خالد" },
      {
        who: "agent",
        text: "طلب خالد جاهز في النظام. الاستلام خلال حوالي 18 دقيقة في سيتي ووك. الإجمالي 42 درهم.",
      },
      { who: "system", text: "تذكرة POS #1842 · الاستلام خلال 18 د · أُبلغت المطبخ" },
    ],
  },
  {
    titleEn: "Tonight's Availability & Walk-Ins",
    titleAr: "التوفر الليلة والضيوف بدون حجز",
    bodyEn: "Answers the question that decides whether they drive to you or somewhere else.",
    bodyAr: "يجيب عن السؤال الذي يحدد هل يأتون إليك أم يذهبون لمكان آخر.",
    personEn: "Omar — walk-in guest",
    personAr: "عمر — زائر بدون حجز",
    metaEn: "Omar · walk-in · WhatsApp, 8:41pm",
    metaAr: "عمر · بدون حجز · واتساب، 8:41 م",
    descEn: "Live waitlist checked against covers. Arrival ETA logged for the host.",
    descAr: "قائمة الانتظار الحية تُفحص مقابل المقاعد. يُسجَّل وقت الوصول المتوقع للمضيف.",
    linesEn: [
      { who: "guest", text: "are you busy right now? we are 2 people, no booking" },
      {
        who: "agent",
        text: "Right now the wait for two is about 20 minutes. If you start walking over I can put you on the list from this message, so the clock starts now instead of when you arrive.",
      },
      { who: "system", text: "Live waitlist checked • 20 minutes for a party of 2" },
      { who: "guest", text: "yes please add us, 15 min away" },
      {
        who: "agent",
        text: "You are on the list. I will message you the moment a table is ready and hold it for ten minutes. If the wait grows past 30 minutes I will tell you before you arrive, not after.",
      },
      { who: "system", text: "Added to waitlist • arrival ETA logged • host notified" },
    ],
    linesAr: [
      { who: "guest", text: "مشغولين الحين؟ نحن اثنين بدون حجز" },
      {
        who: "agent",
        text: "الآن الانتظار لاثنين حوالي 20 دقيقة. إذا بدأتم بالقدوم أقدر أضيفكم للقائمة من هذه الرسالة، فيبدأ العداد الآن بدل وصولكم.",
      },
      { who: "system", text: "تم فحص قائمة الانتظار • 20 دقيقة لشخصين" },
      { who: "guest", text: "نعم أضفونا، نصل خلال 15 دقيقة" },
      {
        who: "agent",
        text: "أنتم على القائمة. سأراسلكم فور جاهزية طاولة وأحتفظ بها عشر دقائق. إذا زاد الانتظار عن 30 دقيقة سأخبركم قبل الوصول لا بعده.",
      },
      { who: "system", text: "أُضيف للقائمة • سُجّل وقت الوصول • أُبلِغ المضيف" },
    ],
  },
  {
    titleEn: "Delivery, Pickup & Where Is My Order",
    titleAr: "التوصيل والاستلام وأين طلبي",
    bodyEn: "Moves the order onto your own channel and keeps status updates without a tablet check.",
    bodyAr: "ينقل الطلب إلى قناتك ويحدّث الحالة دون مراجعة الجهاز اللوحي.",
    personEn: "Omar — repeat delivery customer",
    personAr: "عمر — عميل توصيل متكرر",
    metaEn: "Omar · delivery · WhatsApp, 9:48pm",
    metaAr: "عمر · توصيل · واتساب، 9:48 م",
    descEn: "Order status without a human checking the tablet. Works with your delivery zones, your rider dispatch and your POS.",
    descAr: "حالة الطلب دون أن يراجع أحد الجهاز. يعمل مع مناطق التوصيل وإرسال السائق ونقطة البيع.",
    linesEn: [
      { who: "guest", text: "where is my order? I ordered 35 minutes ago" },
      {
        who: "agent",
        text: "Your order #2091 left with the rider 8 minutes ago. ETA to Al Quoz is about 12 minutes. I will ping you when he is 3 minutes away.",
      },
      { who: "system", text: "Rider GPS linked · status pushed to WhatsApp" },
      { who: "guest", text: "ok thanks" },
      { who: "agent", text: "Anytime. If anything changes I will message you first." },
    ],
    linesAr: [
      { who: "guest", text: "وين طلبي؟ طلبت قبل 35 دقيقة" },
      {
        who: "agent",
        text: "طلبك رقم 2091 خرج مع السائق قبل 8 دقائق. الوصول إلى القوز خلال حوالي 12 دقيقة. سأراسلك عندما يتبقى 3 دقائق.",
      },
      { who: "system", text: "تم ربط GPS السائق · الحالة على واتساب" },
      { who: "guest", text: "تمام شكرًا" },
      { who: "agent", text: "على الرحب. إذا تغيّر شيء سأراسلك أولًا." },
    ],
  },
  {
    titleEn: "Ramadan Iftar & Large Groups",
    titleAr: "إفطار رمضان والمجموعات الكبيرة",
    bodyEn: "Handles the highest-value bookings of the year without losing the thread overnight.",
    bodyAr: "يدير أغلى حجوزات السنة دون أن يضيع الخيط ليلًا.",
    personEn: "Layla — group organiser",
    personAr: "ليلى — منسقة مجموعة",
    metaEn: "Layla · iftar · Instagram, 11:20pm",
    metaAr: "ليلى · إفطار · إنستغرام، 11:20 م",
    descEn: "Party size, date and set-menu rules captured. Deposit link sent before the night fills.",
    descAr: "عدد الضيوف والتاريخ وقواعد القائمة تُلتقط. رابط العربون يُرسل قبل امتلاء الليلة.",
    linesEn: [
      { who: "guest", text: "need iftar for 18 on the 12th, private area if possible" },
      {
        who: "agent",
        text: "We can hold the private room for 18 on the 12th with the AED 165 set menu. Shall I send the deposit link to confirm?",
      },
      { who: "system", text: "Private room availability checked · deposit rule applied" },
      { who: "guest", text: "yes send it" },
      {
        who: "agent",
        text: "Deposit link sent. Once paid, the room is locked for your group and I will share the set-menu PDF.",
      },
    ],
    linesAr: [
      { who: "guest", text: "أبغى إفطار لـ 18 يوم 12، غرفة خاصة إن أمكن" },
      {
        who: "agent",
        text: "نقدر نحجز الغرفة الخاصة لـ 18 يوم 12 بقائمة ثابتة 165 درهم. أرسل رابط العربون للتأكيد؟",
      },
      { who: "system", text: "توفر الغرفة الخاصة مُفحص · قاعدة العربون مطبّقة" },
      { who: "guest", text: "نعم أرسله" },
      {
        who: "agent",
        text: "أُرسل رابط العربون. بعد الدفع تُقفَل الغرفة لمجموعتك وأشارك ملف القائمة الثابتة.",
      },
    ],
  },
];

const bakeryCases: UseCase[] = [
  {
    titleEn: "Custom Cake Quotes",
    titleAr: "عروض الكيك المخصص",
    bodyEn: "Prices from servings, flavour and finish, then holds the date with a deposit.",
    bodyAr: "يسعّر حسب الحصص والنكهة والتشطيب، ثم يحجز التاريخ بعربون.",
    personEn: "Maya — custom cake",
    personAr: "مايا — كيك مخصص",
    metaEn: "Maya · cake quote · WhatsApp, 4:05pm",
    metaAr: "مايا · عرض كيك · واتساب، 4:05 م",
    descEn: "Servings, dietary needs and lead time enforced before the date is held.",
    descAr: "الحصص والاحتياجات الغذائية ومدة التحضير تُفرض قبل حجز التاريخ.",
    linesEn: [
      { who: "guest", text: "Hi, I want to place an order for a custom cake." },
      { who: "agent", text: "Happy to help. Which branch, and any dietary needs?" },
      { who: "guest", text: "City Walk, gluten free if you can, for 20 people Saturday" },
      {
        who: "agent",
        text: "City Walk can do a gluten-free sponge for 20 with 48h lead time. Quote is AED 420. Shall I hold Saturday and send the deposit link?",
      },
      { who: "system", text: "Lead time checked · quote logged · date held pending deposit" },
    ],
    linesAr: [
      { who: "guest", text: "مرحبا، أبغى أطلب كيك مخصص." },
      { who: "agent", text: "بكل سرور. أي فرع؟ وهل هناك احتياجات غذائية؟" },
      { who: "guest", text: "سيتي ووك، خالٍ من الغلوتين إن أمكن، لـ 20 شخص السبت" },
      {
        who: "agent",
        text: "سيتي ووك يقدر يعمل إسفنج خالٍ من الغلوتين لـ 20 بمهلة 48 ساعة. العرض 420 درهم. أحجز السبت وأرسل رابط العربون؟",
      },
      { who: "system", text: "مهلة التحضير مُفحصة · العرض مسجّل · التاريخ محجوز بانتظار العربون" },
    ],
  },
  {
    titleEn: "Lead Times & Deposits",
    titleAr: "مدة التحضير والعربون",
    bodyEn: "Enforces your minimum lead time and never promises a slot you cannot bake.",
    bodyAr: "يفرض الحد الأدنى لمدة التحضير ولا يعد بموعد لا يمكن خبزه.",
    personEn: "Hassan — catering order",
    personAr: "حسن — طلب تموين",
    metaEn: "Hassan · catering · Web chat, 10:18am",
    metaAr: "حسن · تموين · دردشة ويب، 10:18 ص",
    descEn: "Your rules decide what can be promised for tomorrow versus next week.",
    descAr: "قواعدك تقرر ما يمكن وعده للغد مقابل الأسبوع القادم.",
    linesEn: [
      { who: "guest", text: "can I get 40 croissants tomorrow morning for the office?" },
      {
        who: "agent",
        text: "For 40 croissants we need 24 hours notice. Earliest pickup is Thursday 8:00am at Business Bay. Shall I lock that?",
      },
      { who: "system", text: "Lead-time rule applied · capacity checked" },
      { who: "guest", text: "yes Thursday works" },
      {
        who: "agent",
        text: "Held for Thursday 8:00am. Deposit AED 80 to confirm — link on the way.",
      },
    ],
    linesAr: [
      { who: "guest", text: "أقدر آخذ 40 كرواسون بكرة الصباح للمكتب؟" },
      {
        who: "agent",
        text: "لـ 40 كرواسون نحتاج إشعارًا قبل 24 ساعة. أقرب استلام الخميس 8:00 ص في الخليج التجاري. أقفله؟",
      },
      { who: "system", text: "قاعدة المهلة مطبّقة · السعة مُفحصة" },
      { who: "guest", text: "نعم الخميس مناسب" },
      {
        who: "agent",
        text: "محجوز للخميس 8:00 ص. عربون 80 درهم للتأكيد — الرابط في الطريق.",
      },
    ],
  },
  {
    titleEn: "What's in the Case",
    titleAr: "ما المتوفر في الواجهة",
    bodyEn: "Answers stock questions from that branch's case, not a stale website menu.",
    bodyAr: "يجيب عن المخزون من واجهة ذلك الفرع لا من قائمة موقع قديمة.",
    personEn: "Noora — walk-up",
    personAr: "نورة — زائرة",
    metaEn: "Noora · stock · Instagram, 5:40pm",
    metaAr: "نورة · مخزون · إنستغرام، 5:40 م",
    descEn: "Live case counts per branch. Out-of-stock items never offered.",
    descAr: "أعداد الواجهة الحية لكل فرع. لا يُعرض ما نفد.",
    linesEn: [
      { who: "guest", text: "do you still have pistachio tarts at JLT?" },
      {
        who: "agent",
        text: "JLT has 6 pistachio tarts left this evening. Want me to hold two for pickup in 20 minutes?",
      },
      { who: "system", text: "Branch case stock read · hold available 20 min" },
      { who: "guest", text: "yes please hold two" },
      { who: "agent", text: "Two pistachio tarts held under Noora until 6:00pm. See you soon." },
    ],
    linesAr: [
      { who: "guest", text: "باقٍ عندكم تارت فستق في جي إل تي؟" },
      {
        who: "agent",
        text: "جي إل تي عنده 6 تارت فستق هذا المساء. أحجز اثنين للاستلام خلال 20 دقيقة؟",
      },
      { who: "system", text: "قراءة مخزون الواجهة · الحجز متاح 20 د" },
      { who: "guest", text: "نعم احجزي اثنين" },
      { who: "agent", text: "اثنان محجوزان باسم نورة حتى 6:00 م. نراك قريبًا." },
    ],
  },
  {
    titleEn: "Catering & Large Orders",
    titleAr: "التموين والطلبات الكبيرة",
    bodyEn: "Captures headcount, delivery window and payment before the kitchen commits.",
    bodyAr: "يلتقط العدد ونافذة التوصيل والدفع قبل التزام المطبخ.",
    personEn: "Rami — office catering",
    personAr: "رامي — تموين مكتبي",
    metaEn: "Rami · catering · WhatsApp, 2:22pm",
    metaAr: "رامي · تموين · واتساب، 2:22 م",
    descEn: "Large-order rules, delivery zones and invoice links in one thread.",
    descAr: "قواعد الطلبات الكبيرة ومناطق التوصيل وروابط الفاتورة في خيط واحد.",
    linesEn: [
      { who: "guest", text: "need breakfast boxes for 30 delivered to DIFC Wednesday 8am" },
      {
        who: "agent",
        text: "We can do 30 breakfast boxes to DIFC Wednesday 8:00am. Package is AED 28 each. Shall I send the invoice and confirm delivery?",
      },
      { who: "system", text: "Delivery zone OK · kitchen capacity reserved" },
      { who: "guest", text: "send invoice" },
      { who: "agent", text: "Invoice sent. Once paid, production is locked and the rider slot is booked." },
    ],
    linesAr: [
      { who: "guest", text: "أبغى علب إفطار لـ 30 توصيل لدي إف سي الأربعاء 8 ص" },
      {
        who: "agent",
        text: "نقدر نوصل 30 علبة إفطار لدي إف سي الأربعاء 8:00 ص. الباقة 28 درهم للواحدة. أرسل الفاتورة وأؤكد التوصيل؟",
      },
      { who: "system", text: "منطقة التوصيل مناسبة · سعة المطبخ محجوزة" },
      { who: "guest", text: "أرسل الفاتورة" },
      { who: "agent", text: "أُرسلت الفاتورة. بعد الدفع يُقفل الإنتاج ويُحجز موعد السائق." },
    ],
  },
];

const platformCards = [
  {
    titleEn: "Always-On Counter",
    titleAr: "كاونتر على مدار الساعة",
    bodyEn: "Every call and message answered in seconds, through the night and across every branch.",
    bodyAr: "كل مكالمة ورسالة تُجاب خلال ثوانٍ، ليلًا وعبر كل الفروع.",
    image: images.dining,
  },
  {
    titleEn: "Reservations & Waitlist",
    titleAr: "الحجوزات وقائمة الانتظار",
    bodyEn: "Books into your floor plan, confirms the night before, and holds walk-ins against live covers.",
    bodyAr: "يحجز في مخطط القاعة، يؤكد ليلة قبل، ويضيف الزوار مقابل المقاعد الحية.",
    image: images.bakery,
  },
  {
    titleEn: "Order Taking & Upsell",
    titleAr: "أخذ الطلبات والبيع الإضافي",
    bodyEn: "Full orders taken on your own number and pushed to your POS, with upsells inside your rules.",
    bodyAr: "طلبات كاملة على رقمك تُدفع إلى نقطة البيع، مع بيع إضافي ضمن قواعدك.",
    image: images.pricing,
  },
  {
    titleEn: "Cake & Catering Desk",
    titleAr: "مكتب الكيك والتموين",
    bodyEn: "Prices a custom order from servings, enforces your lead time, holds the date and sends the deposit link.",
    bodyAr: "يسعّر الطلب المخصص حسب الحصص، يفرض مهلة التحضير، يحجز التاريخ ويرسل رابط العربون.",
    image: images.bakery,
  },
  {
    titleEn: "Allergens & Halal, Answered Right",
    titleAr: "الحساسية والحلال، بإجابة صحيحة",
    bodyEn: "Your approved wording every time, and anything medical handed to a named person.",
    bodyAr: "صياغتك المعتمدة في كل مرة، وأي أمر طبي يُسلَّم لشخص مسمّى.",
    image: images.employee,
  },
  {
    titleEn: "Branch & Brand Control",
    titleAr: "تحكم الفرع والعلامة",
    bodyEn: "Every branch on its own menu, prices and stock. One approved brand voice, and a record of every reply.",
    bodyAr: "كل فرع بقائمته وأسعاره ومخزونه. صوت علامة واحدة معتمد، وسجل لكل رد.",
    image: images.team,
  },
] as const;

const channelPills = ["Instagram", "WhatsApp", "Voice", "Web chat"] as const;

const posSystems = ["Foodics", "Marn", "Odoo", "Square", "Toast"] as const;

function RcbDropdown({ label, children }: { label: string; children: ReactNode }) {
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

function RestaurantsHeader() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const links = [
    ["#rcb-preview", en ? "Live preview" : "معاينة مباشرة"],
    ["#rcb-platform", en ? "Platform" : "المنصة"],
    ["#rcb-pricing", en ? "Pricing" : "الأسعار"],
    ["#rcb-multisite", en ? "Multi-site" : "متعدد المواقع"],
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
          <RcbDropdown label={en ? "AI Employee" : "موظف AI"}>
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
          </RcbDropdown>
          <Link href={routes.team} className="hp-nav-link">
            {t.nav.team}
          </Link>
          <RcbDropdown label={t.nav.resources}>
            <Link href={routes.blog} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.blog}</span>
            </Link>
            <Link href={routes.news} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.news}</span>
            </Link>
          </RcbDropdown>
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
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
              >
                {label}
              </a>
            ))}
            <Link
              href={routes.employee}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
              {en ? "AI Employee" : "موظف AI"}
            </Link>
            <Link
              href={routes.team}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
              {t.nav.team}
            </Link>
            <Link
              href={routes.blog}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
              {t.nav.blog}
            </Link>
            <Link
              href={routes.news}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
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

function QrMark() {
  return (
    <svg viewBox="0 0 100 100" className="rcb-qr-svg" aria-hidden>
      <rect width="100" height="100" fill="#fff" />
      <rect x="8" y="8" width="28" height="28" fill="#111" />
      <rect x="14" y="14" width="16" height="16" fill="#fff" />
      <rect x="18" y="18" width="8" height="8" fill="#111" />
      <rect x="64" y="8" width="28" height="28" fill="#111" />
      <rect x="70" y="14" width="16" height="16" fill="#fff" />
      <rect x="74" y="18" width="8" height="8" fill="#111" />
      <rect x="8" y="64" width="28" height="28" fill="#111" />
      <rect x="14" y="70" width="16" height="16" fill="#fff" />
      <rect x="18" y="74" width="8" height="8" fill="#111" />
      <rect x="44" y="12" width="6" height="6" fill="#111" />
      <rect x="54" y="20" width="6" height="6" fill="#111" />
      <rect x="44" y="28" width="6" height="6" fill="#111" />
      <rect x="52" y="40" width="8" height="8" fill="#111" />
      <rect x="64" y="48" width="6" height="6" fill="#111" />
      <rect x="76" y="52" width="8" height="8" fill="#111" />
      <rect x="44" y="56" width="6" height="6" fill="#111" />
      <rect x="56" y="64" width="8" height="8" fill="#111" />
      <rect x="68" y="72" width="6" height="6" fill="#111" />
      <rect x="80" y="80" width="10" height="10" fill="#111" />
      <rect x="44" y="80" width="6" height="6" fill="#111" />
      <rect x="56" y="88" width="6" height="6" fill="#111" />
    </svg>
  );
}

export function RestaurantsPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [accent, setAccent] = useState<(typeof accents)[number]>("Emirati");
  const [voice, setVoice] = useState("noor");
  const [bizMode, setBizMode] = useState<BizMode>("restaurant");
  const [caseIndex, setCaseIndex] = useState(0);
  const [channel, setChannel] = useState<(typeof channelPills)[number]>("WhatsApp");
  const [guestLang, setGuestLang] = useState<"en" | "ar">("en");
  const [replayKey, setReplayKey] = useState(0);

  const cases = bizMode === "restaurant" ? restaurantCases : bakeryCases;
  const activeCase = cases[Math.min(caseIndex, cases.length - 1)] ?? cases[0];
  const lines = useMemo(
    () => (guestLang === "en" ? activeCase.linesEn : activeCase.linesAr),
    [activeCase, guestLang],
  );

  useEffect(() => {
    setCaseIndex(0);
  }, [bizMode]);

  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <RestaurantsHeader />
      </div>

      <main>
        {/* A. Hero */}
        <section className="hp-hero">
          <div className="shell text-center">
            <span className="hp-badge">
              <span aria-hidden />
              {en
                ? "Built for restaurants, cafes and bakeries across the GCC"
                : "مبني للمطاعم والمقاهي والمخابز عبر الخليج"}
            </span>
            <h1 className="hp-hero-title">
              {en ? (
                <>
                  AI Customer Experience Platform
                  <br />
                  <span>for restaurants, cafes and bakeries.</span>
                </>
              ) : (
                <>
                  منصة تجربة العملاء بالذكاء الاصطناعي
                  <br />
                  <span>للمطاعم والمقاهي والمخابز.</span>
                </>
              )}
            </h1>
            <p className="hp-hero-body">
              {en
                ? "One agent answers every customer on WhatsApp, Instagram, your phone line and web chat, in Arabic and English, at every branch. It books the table, takes the order into your POS, quotes the custom cake and holds the date, then hands anything sensitive to your team with the whole thread already on screen."
                : "وكيل واحد يرد على كل عميل عبر واتساب وإنستغرام وخط هاتفك والدردشة، بالعربية والإنجليزية، في كل فرع. يحجز الطاولة، ويدخل الطلب إلى نقطة البيع، ويعرض سعر الكيك المخصص ويحجز التاريخ، ثم يسلّم أي أمر حسّاس لفريقك مع الخيط كاملًا على الشاشة."}
            </p>
          </div>
        </section>

        {/* B. Talk + WhatsApp */}
        <section id="rcb-preview" className="hp-agent">
          <div className="shell">
            <div className="hp-mid-promo">{t.promo}</div>

            <div className="hp-agent-grid">
              <div className="hp-agent-form">
                <h2>{en ? "Talk to the agent — live" : "تحدث مع الوكيل — مباشرة"}</h2>
                <p>
                  {en
                    ? "Enter your number and it calls you in seconds. Talk to it like a customer would, in Arabic or English."
                    : "أدخل رقمك فيتصل بك خلال ثوانٍ. تحدّث معه كما يفعل العميل، بالعربية أو الإنجليزية."}
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
                        I agree to receive a one-time demo call from {brand.short} and accept the{" "}
                        <Link href={routes.privacy}>Privacy Policy</Link>.
                      </>
                    ) : (
                      <>
                        أوافق على استلام مكالمة عرض لمرة واحدة من {brand.short} وعلى{" "}
                        <Link href={routes.privacy}>سياسة الخصوصية</Link>.
                      </>
                    )}
                  </span>
                </label>
                <label className="hp-check">
                  <input type="checkbox" />
                  <span>
                    {en
                      ? `Optional: keep me posted about ${brand.short} by phone, SMS, WhatsApp or email. You can opt out anytime.`
                      : `اختياري: أبقني على اطلاع بـ ${brand.short} عبر الهاتف أو الرسائل أو واتساب أو البريد. يمكنك الإلغاء في أي وقت.`}
                  </span>
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
                  <div className="rcb-or-sep">
                    <span />
                    <button type="button" className="ad-browser-link">
                      {en ? "or Talk in your browser" : "أو تحدث في المتصفح"}
                    </button>
                    <span />
                  </div>
                </div>
              </div>

              <div className="rcb-wa-card">
                <span className="rcb-wa-badge">
                  <IconWhatsApp className="h-3.5 w-3.5" />
                  WHATSAPP
                </span>
                <h2>{en ? "Message us on WhatsApp" : "راسلنا على واتساب"}</h2>
                <p>
                  {en
                    ? "Scan the code, or tap the button on your phone. Type a message, or send a voice note."
                    : "امسح الرمز، أو اضغط الزر على هاتفك. اكتب رسالة أو أرسل ملاحظة صوتية."}
                </p>
                <div className="rcb-wa-body">
                  <div className="rcb-qr-block">
                    <div className="rcb-qr" aria-hidden>
                      <QrMark />
                    </div>
                    <p>{en ? "Scan with your phone" : "امسح بهاتفك"}</p>
                  </div>
                  <div className="rcb-wa-chat">
                    <div className="rcb-wa-bubble is-guest">
                      {en ? "Hi, I want to place an order for a custom cake." : "مرحبا، أبغى أطلب كيك مخصص."}
                    </div>
                    <div className="rcb-wa-bubble is-voice">
                      <span className="rcb-voice-play" aria-hidden>
                        ▶
                      </span>
                      <span className="rcb-voice-wave" aria-hidden />
                      <em>0:12</em>
                    </div>
                    <div className="rcb-wa-bubble is-agent">
                      {en
                        ? "Happy to help. Which branch, and any dietary needs?"
                        : "بكل سرور. أي فرع؟ وهل هناك احتياجات غذائية؟"}
                    </div>
                  </div>
                </div>
                <p className="rcb-wa-number">
                  {en
                    ? `${brand.short} test number · +1 719 512 4485`
                    : `رقم تجريبي ${brand.short} · +1 719 512 4485`}
                </p>
                <a href={routes.talk} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  <IconWhatsApp className="h-4 w-4" />
                  {en ? "Open WhatsApp" : "افتح واتساب"}
                </a>
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
                ? "Gulf Arabic native · runs on your own numbers · writes into the POS and booking system you already have"
                : "عربي خليجي أصيل · يعمل على أرقامك · يكتب في نقطة البيع ونظام الحجز لديك"}
            </p>
          </div>
        </section>

        {/* C. Film band */}
        <section className="rcb-film">
          <div className="rcb-film-media">
            <Image src={images.bakery} alt="" fill className="object-cover" sizes="100vw" />
            <div className="rcb-film-shade" />
            <div className="shell rcb-film-inner">
              <div className="rcb-film-copy">
                <p className="rcb-film-eyebrow">
                  {en ? "RESTAURANTS • CAFES • BAKERIES" : "مطاعم • مقاهي • مخابز"}
                </p>
                <h2>
                  {en
                    ? "Take Every Order in Seconds. Dine-in, Takeaway and Delivery."
                    : "خذ كل طلب خلال ثوانٍ. جلوس وسفري وتوصيل."}
                </h2>
                <p>
                  {en
                    ? "Watch the AI agent handle a restaurant, a cafe and a bakery, in Arabic and English, on the channels your customers use."
                    : "شاهد وكيل الذكاء الاصطناعي يدير مطعمًا ومقهى ومخبزًا، بالعربية والإنجليزية، على قنوات عملائك."}
                </p>
                <button type="button" className="rcb-film-cta">
                  <IconPlay className="h-4 w-4" />
                  {en ? "Watch the film • 50 seconds" : "شاهد الفيلم • 50 ثانية"}
                </button>
              </div>
              <button type="button" className="rcb-film-play" aria-label={en ? "Play film" : "تشغيل الفيلم"}>
                <IconPlay className="h-8 w-8" />
              </button>
            </div>
          </div>
        </section>

        {/* D. Live preview */}
        <section className="hp-usecases">
          <div className="shell">
            <p className="selected-eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              {en ? "Live preview" : "معاينة مباشرة"}
            </p>
            <h2 className="hp-section-title text-center">
              {en ? "Pick your side of the business. Watch it work." : "اختر جانب عملك. شاهده يعمل."}
            </h2>
            <p className="hp-section-body mx-auto text-center">
              {en
                ? "A restaurant inbox is covers, orders and service. A bakery inbox is quotes, lead times and what is in the case right now. Switch between them and see the real conversation shapes."
                : "صندوق المطعم هو المقاعد والطلبات والخدمة. صندوق المخبز هو العروض ومدة التحضير وما في الواجهة الآن. بدّل بينهما وشاهد أشكال المحادثات الحقيقية."}
            </p>

            <div className="rcb-biz-toggle" role="tablist" aria-label={en ? "Business type" : "نوع العمل"}>
              <button
                type="button"
                role="tab"
                aria-selected={bizMode === "restaurant"}
                className={bizMode === "restaurant" ? "is-active" : ""}
                onClick={() => setBizMode("restaurant")}
              >
                <IconUtensils className="h-4 w-4" />
                {en ? "Restaurant / Cafe" : "مطعم / مقهى"}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={bizMode === "bakery"}
                className={bizMode === "bakery" ? "is-active" : ""}
                onClick={() => setBizMode("bakery")}
              >
                <IconChat className="h-4 w-4" />
                {en ? "Bakery" : "مخبز"}
              </button>
            </div>
            <p className="rcb-biz-caption">
              {en
                ? "Both sets run on the same platform. Only the knowledge, the rules and the tools change."
                : "كلا المجموعتين تعملان على المنصة نفسها. المعرفة والقواعد والأدوات فقط تتغير."}
            </p>

            <div className="hp-usecase-layout">
              <aside className="hp-usecase-side">
                <p className="hp-side-label">{en ? "Use case" : "حالة الاستخدام"}</p>
                <div className="hp-case-list">
                  {cases.map((item, index) => (
                    <button
                      key={item.titleEn}
                      type="button"
                      className={`hp-case ${caseIndex === index ? "is-active" : ""}`}
                      onClick={() => setCaseIndex(index)}
                    >
                      <span className="hp-case-title">{en ? item.titleEn : item.titleAr}</span>
                      <span className="hp-case-body">{en ? item.bodyEn : item.bodyAr}</span>
                    </button>
                  ))}
                </div>

                <p className="hp-side-label mt-5">{en ? "Channel" : "القناة"}</p>
                <div className="hp-channels">
                  {channelPills.map((label) => (
                    <button
                      key={label}
                      type="button"
                      className={channel === label ? "is-active" : ""}
                      onClick={() => setChannel(label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <p className="hp-side-label mt-5">{en ? "Customer language" : "لغة العميل"}</p>
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
                  <span>O</span>
                  <div>
                    <p>{en ? "In the conversation" : "في المحادثة"}</p>
                    <strong>{en ? activeCase.personEn : activeCase.personAr}</strong>
                    <small>{en ? activeCase.metaEn : activeCase.metaAr}</small>
                    <p className="rcb-duty-desc">{en ? activeCase.descEn : activeCase.descAr}</p>
                  </div>
                </div>

                <button type="button" className="rcb-replay" onClick={() => setReplayKey((k) => k + 1)}>
                  {en ? "Replay scenario" : "إعادة السيناريو"}
                </button>
              </aside>

              <div className="hp-transcript">
                <div className="hp-transcript-bar">
                  <span className="hp-live">{en ? "Live transcript" : "نص مباشر"}</span>
                  <span className="hp-path">
                    {channel} · {guestLang === "en" ? "English" : "العربية"} ·{" "}
                    {bizMode === "restaurant" ? "Qahwa & Crumb · City Walk" : "Crumb Oven · JLT"}
                  </span>
                  <span className="hp-scripted">{en ? "Scripted simulation" : "محاكاة مكتوبة"}</span>
                </div>
                <div className="hp-transcript-bg">
                  <Image
                    src={bizMode === "restaurant" ? images.dining : images.bakery}
                    alt=""
                    fill
                    className="object-cover opacity-35"
                    sizes="800px"
                  />
                </div>
                <div className="hp-bubbles" key={`${bizMode}-${caseIndex}-${guestLang}-${replayKey}`}>
                  {lines.map((line, i) =>
                    line.who === "system" ? (
                      <p key={`${i}-${line.text}`} className="hp-system">
                        ✦ {line.text}
                      </p>
                    ) : (
                      <div key={`${i}-${line.text}`} className={`hp-bubble is-${line.who}`}>
                        <p>{line.text}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="rcb-channel-strip">
              <div className="rcb-channel-icons">
                <span>
                  <IconWhatsApp className="h-5 w-5 rcb-ic-wa" />
                  WhatsApp
                </span>
                <span>
                  <IconPhone className="h-5 w-5 rcb-ic-voice" />
                  Voice
                </span>
                <span>
                  <IconChat className="h-5 w-5 rcb-ic-chat" />
                  Web chat
                </span>
                <span>
                  <IconSms className="h-5 w-5 rcb-ic-sms" />
                  SMS
                </span>
                <span>
                  <IconInstagram className="h-5 w-5 rcb-ic-ig" />
                  Instagram
                </span>
                <span>
                  <IconMail className="h-5 w-5 rcb-ic-mail" />
                  Email
                </span>
              </div>
              <p>
                {en
                  ? "Every reply comes from that branch's own menu, prices and policies. Allergies, complaints and anything above your value threshold go straight to your team."
                  : "كل رد يأتي من قائمة ذلك الفرع وأسعاره وسياساته. الحساسية والشكاوى وأي شيء فوق حد القيمة يذهب مباشرة لفريقك."}
              </p>
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
                  ? "On the call we run this on your own menu, in your own dialect."
                  : "في المكالمة نشغّل هذا على قائمتك وبلهجتك."}
              </p>
            </div>
          </div>
        </section>

        {/* E. Platform */}
        <section id="rcb-platform" className="hp-platform">
          <div className="shell">
            <div className="rcb-platform-head">
              <div>
                <span className="hp-badge">
                  <span aria-hidden />
                  {en ? "The platform" : "المنصة"}
                </span>
                <h2>
                  {en
                    ? "The AI customer experience platform for restaurants, cafes and bakeries"
                    : "منصة تجربة العملاء بالذكاء الاصطناعي للمطاعم والمقاهي والمخابز"}
                </h2>
              </div>
              <p>
                {en
                  ? "Not a chatbot bolted to your website. One agent across every channel your customers already use, with the tools to book the table, push the order to your POS and hold the cake slot."
                  : "ليست روبوت دردشة ملصقًا بموقعك. وكيل واحد عبر كل قناة يستخدمها عملاؤك، مع أدوات حجز الطاولة ودفع الطلب إلى نقطة البيع وحجز موعد الكيك."}
              </p>
            </div>

            <div className="hp-feature-grid">
              {platformCards.map((card) => (
                <article key={card.titleEn} className="hp-feature-card">
                  <Image src={card.image} alt="" fill className="object-cover" sizes="400px" />
                  <div className="hp-feature-overlay" />
                  <div className="hp-feature-content">
                    <span className="hp-feature-icon">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <h3>{en ? card.titleEn : card.titleAr}</h3>
                    <p>{en ? card.bodyEn : card.bodyAr}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rcb-stats">
              {[
                {
                  labelEn: "Conversations resolved by AI",
                  labelAr: "محادثات حلّها الذكاء الاصطناعي",
                  value: "94%",
                },
                {
                  labelEn: "First reply in under",
                  labelAr: "أول رد خلال أقل من",
                  value: en ? "5 seconds" : "5 ثوانٍ",
                },
                {
                  labelEn: "Commission avoided per direct order",
                  labelAr: "عمولة تُتجنَّب لكل طلب مباشر",
                  value: "25-35%",
                },
              ].map((item) => (
                <div key={item.labelEn} className="rcb-stat">
                  <p>{en ? item.labelEn : item.labelAr}</p>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <p className="rcb-stats-note">
              {en
                ? "The first two are platform benchmarks across live deployments, and your baseline is measured in week one. The commission range is what UAE operators report paying aggregators per order."
                : "الأولان معياران للمنصة عبر نشرات حية، ويُقاس خطك الأساسي في الأسبوع الأول. نطاق العمولة ما يبلغ عنه مشغّلو الإمارات للمنصات لكل طلب."}
            </p>
            <div className="hp-hero-ctas">
              <Link href={routes.trial} className="btn-primary">
                {t.nav.trial}
              </Link>
              <Link href={routes.demo} className="btn-secondary">
                {t.nav.demo}
              </Link>
            </div>
            <p className="hp-hero-meta">{t.promo}</p>
          </div>
        </section>

        {/* F. Every channel */}
        <section className="rcb-channels">
          <div className="shell rcb-channels-grid">
            <div>
              <span className="hp-badge">
                <span aria-hidden />
                {en ? "Every channel covered" : "كل القنوات مغطاة"}
              </span>
              <h2 className="hp-section-title">
                {en ? "Every order captured, no revenue lost." : "كل طلب يُلتقط، بلا إيراد ضائع."}
              </h2>
              <p className="hp-section-body">
                {en
                  ? "Customers reach you wherever they already are. One agent covers all of it, in one thread, so the enquiry that used to sit unread until morning becomes revenue tonight."
                  : "يصل إليك العملاء حيث هم أصلًا. وكيل واحد يغطي الكل في خيط واحد، فيصبح الاستفسار الذي كان يبقى بلا قراءة حتى الصباح إيرادًا الليلة."}
              </p>
              <ul className="rcb-check-list">
                {(en
                  ? [
                      "WhatsApp, Instagram, phone, web chat, SMS and email, answered as one conversation",
                      "Nothing waits for opening hours, and nothing is answered twice",
                      "Every booking and order lands in the systems you already run",
                      "Repeat customers come back on your channel, not on a 28% commission",
                    ]
                  : [
                      "واتساب وإنستغرام والهاتف والدردشة والرسائل والبريد، تُجاب كمحادثة واحدة",
                      "لا شيء ينتظر ساعات العمل، ولا شيء يُجاب مرتين",
                      "كل حجز وطلب يصل إلى الأنظمة التي تشغّلها أصلًا",
                      "العملاء المتكررون يعودون على قناتك لا على عمولة 28%",
                    ]
                ).map((item) => (
                  <li key={item}>
                    <IconCheck className="h-4 w-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="hp-hero-ctas rcb-ctas-start">
                <Link href={routes.trial} className="btn-primary">
                  {t.nav.trial}
                </Link>
                <Link href={routes.demo} className="btn-secondary">
                  {t.nav.demo}
                </Link>
              </div>
            </div>

            <div className="rcb-channels-media">
              <Image
                src={images.dining}
                alt={en ? "Chef in a restaurant kitchen" : "شيف في مطبخ مطعم"}
                fill
                className="object-cover"
                sizes="560px"
              />
              <div className="rcb-revenue-card">
                <p>{en ? "Revenue up by 40%" : "الإيراد ارتفع 40%"}</p>
                <svg viewBox="0 0 160 56" className="rcb-revenue-chart" aria-hidden>
                  <path
                    d="M4 48 C28 46, 40 40, 58 32 C78 22, 96 18, 118 10 C132 5, 146 4, 156 2"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="58" cy="32" r="3.5" fill="#4ade80" />
                  <circle cx="118" cy="10" r="3.5" fill="#4ade80" />
                  <circle cx="156" cy="2" r="3.5" fill="#4ade80" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* G. Multi-site */}
        <section id="rcb-multisite" className="rcb-multisite">
          <div className="shell">
            <div className="rcb-multisite-grid">
              <div>
                <span className="hp-badge">
                  <span aria-hidden />
                  {en ? "Multi-site and franchise" : "متعدد المواقع والامتياز"}
                </span>
                <h2 className="hp-section-title">
                  {en ? "One Brand, Multi-Site Multi-Franchise" : "علامة واحدة، مواقع وامتيازات متعددة"}
                </h2>
                <p className="hp-section-body">
                  {en
                    ? "Every branch and every franchise answers its customers the same way, from the same rules, without adding a person per location."
                    : "كل فرع وكل امتياز يرد على عملائه بنفس الطريقة، من نفس القواعد، دون إضافة شخص لكل موقع."}
                </p>
                <ul className="rcb-check-list">
                  {(en
                    ? [
                        "One number, the right branch answers",
                        "Local menu, local prices, local VAT",
                        "One approved brand voice, everywhere",
                        "A new location live from a template",
                        "Head office sees every branch in one view",
                      ]
                    : [
                        "رقم واحد، والفرع الصحيح يرد",
                        "قائمة محلية وأسعار محلية وضريبة محلية",
                        "صوت علامة معتمد واحد في كل مكان",
                        "موقع جديد يعمل من قالب",
                        "المكتب الرئيسي يرى كل فرع في نظرة واحدة",
                      ]
                  ).map((item) => (
                    <li key={item}>
                      <IconCheck className="h-4 w-4" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="hp-hero-ctas rcb-ctas-start">
                  <Link href={routes.trial} className="btn-primary">
                    {t.nav.trial}
                  </Link>
                  <Link href={routes.demo} className="btn-secondary">
                    {t.nav.demo}
                  </Link>
                </div>
                <p className="rcb-section-note">
                  {en
                    ? "Bring your branch list. We will show routing and the roll-up report on the call."
                    : "أحضر قائمة فروعك. سنعرض التوجيه وتقرير التجميع في المكالمة."}
                </p>
              </div>

              <div className="rcb-collage" aria-hidden>
                <div className="rcb-collage-cell">
                  <Image src={images.team} alt="" fill className="object-cover" sizes="280px" />
                </div>
                <div className="rcb-collage-cell">
                  <Image src={images.bakery} alt="" fill className="object-cover" sizes="280px" />
                </div>
                <div className="rcb-collage-cell">
                  <Image src={images.employee} alt="" fill className="object-cover" sizes="280px" />
                </div>
                <div className="rcb-collage-cell">
                  <Image src={images.dining} alt="" fill className="object-cover" sizes="280px" />
                </div>
              </div>
            </div>

            <div className="rcb-dark-cards">
              <article className="rcb-dark-card">
                <Image src={images.bakery} alt="" fill className="object-cover" sizes="480px" />
                <div className="rcb-dark-shade" />
                <div className="rcb-dark-content">
                  <span className="rcb-dark-icon">
                    <IconPin className="h-4 w-4" />
                  </span>
                  <h3>{en ? "Branch" : "الفرع"}</h3>
                  <p>
                    {en
                      ? "A customer on the Riyadh number gets Riyadh's menu in riyals, Riyadh's hours and Riyadh's duty manager. Live stock means a sold-out item is never sold twice."
                      : "عميل على رقم الرياض يحصل على قائمة الرياض بالريال وساعات الرياض ومدير المناوبة في الرياض. المخزون الحي يعني أن الصنف النافد لا يُباع مرتين."}
                  </p>
                </div>
              </article>
              <article className="rcb-dark-card">
                <Image src={images.pricing} alt="" fill className="object-cover" sizes="480px" />
                <div className="rcb-dark-shade" />
                <div className="rcb-dark-content">
                  <span className="rcb-dark-icon">
                    <IconShieldCheck className="h-4 w-4" />
                  </span>
                  <h3>{en ? "Franchise" : "الامتياز"}</h3>
                  <p>
                    {en
                      ? "Approved wording and locked price lists sit at group level. Franchisees add local knowledge, never rewrite a brand promise, and every override is logged."
                      : "الصياغة المعتمدة وقوائم الأسعار المقفلة على مستوى المجموعة. أصحاب الامتياز يضيفون المعرفة المحلية دون إعادة كتابة وعد العلامة، وكل تجاوز يُسجَّل."}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* H. Arabic and voice */}
        <section id="rcb-voice" className="hp-arabic">
          <div className="shell hp-arabic-grid">
            <div>
              <span className="hp-badge">
                <span aria-hidden />
                {en ? "Arabic and voice" : "العربية والصوت"}
              </span>
              <h2 className="hp-section-title">
                {en
                  ? "Arabic dialects and 40+ languages, on your own number"
                  : "لهجات عربية وأكثر من 40 لغة، على رقمك"}
              </h2>
              <p className="hp-section-body">
                {en
                  ? "It reads the dialect from the first message and stays in it, in chat and on the phone. It even reads a name back before it goes on a cake."
                  : "يقرأ اللهجة من أول رسالة ويبقى عليها، في الدردشة وعلى الهاتف. حتى يقرأ الاسم قبل أن يُكتب على الكيك."}
              </p>
              <div className="hp-dialects">
                {(en
                  ? ["Gulf · خليجي", "Levantine · شامي", "Egyptian · مصري", "Modern Standard · فصحى"]
                  : ["خليجي · Gulf", "شامي · Levantine", "مصري · Egyptian", "فصحى · Modern Standard"]
                ).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="rcb-extra-lang">
                {en
                  ? "+ English, Hindi, Urdu, Tagalog and 40 more"
                  : "+ الإنجليزية والهندية والأوردو والتغالوغ و40 أخرى"}
              </p>
              <div className="hp-hero-ctas rcb-ctas-start">
                <Link href={routes.trial} className="btn-primary">
                  {t.nav.trial}
                </Link>
                <Link href={routes.demo} className="btn-secondary">
                  {t.nav.demo}
                </Link>
              </div>
              <p className="rcb-section-note">
                {en ? "Hear the Arabic voice live on the call." : "اسمع الصوت العربي مباشرة في المكالمة."}
              </p>
            </div>

            <div className="rcb-voice-media">
              <Image
                src={images.bakery}
                alt={en ? "Customer in a cafe" : "عميلة في مقهى"}
                fill
                className="object-cover"
                sizes="560px"
              />
              <div className="rcb-voice-overlay">
                <p className="rcb-voice-label">{en ? "VOICE CALL — ARABIC" : "مكالمة صوتية — عربي"}</p>
                <div className="rcb-voice-bubble is-guest" dir="rtl">
                  أبي أحجز كيك عيد ميلاد ليوم الجمعة، الاسم نور
                </div>
                <div className="rcb-voice-bubble is-agent" dir="rtl">
                  تم. أكتب الاسم نور على الكيك، صح؟
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* I. Integrations */}
        <section id="rcb-integrations" className="rcb-integrations">
          <div className="shell">
            <div className="rcb-integ-head">
              <span className="hp-badge">
                <span aria-hidden />
                {en ? "Integrations" : "التكاملات"}
              </span>
              <h2 className="hp-section-title">
                {en
                  ? "Integrations available with the point-of-sale systems you already run"
                  : "تكاملات متاحة مع أنظمة نقاط البيع التي تشغّلها أصلًا"}
              </h2>
              <p className="hp-section-body">
                {en
                  ? `${brand.short} sits above the stack you already run and writes into it. Nothing is migrated, nothing is replaced.`
                  : `${brand.short} يعمل فوق المنظومة التي تشغّلها ويكتب فيها. لا ترحيل ولا استبدال.`}
              </p>
            </div>

            <div className="rcb-integ-hero">
              <Image
                src={images.pricing}
                alt={en ? "Point-of-sale and order stack" : "نقطة البيع ومنظومة الطلبات"}
                fill
                className="object-cover"
                sizes="1100px"
              />
              <div className="rcb-integ-hero-shade" />
              <div className="rcb-integ-hero-copy">
                <p>{en ? "POS · kitchen · bookings" : "نقطة البيع · المطبخ · الحجوزات"}</p>
                <strong>{brand.short}</strong>
              </div>
            </div>

            <p className="rcb-pos-label">{en ? "Point-of-sale systems" : "أنظمة نقاط البيع"}</p>
            <div className="rcb-pos-pills">
              {posSystems.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>

            <div className="rcb-integ-features">
              {[
                {
                  titleEn: "Orders land in your POS",
                  titleAr: "الطلبات تصل إلى نقطة البيع",
                  bodyEn: "Priced from the live menu, printed in the kitchen.",
                  bodyAr: "مسعّرة من القائمة الحية، مطبوعة في المطبخ.",
                },
                {
                  titleEn: "Bookings hit your diary",
                  titleAr: "الحجوزات تدخل مفكرتك",
                  bodyEn: "Tables, cake slots and catering dates, written in.",
                  bodyAr: "طاولات ومواعيد كيك وتموين، مكتوبة في النظام.",
                },
                {
                  titleEn: "No connector yet? Still covered",
                  titleAr: "لا يوجد موصل بعد؟ ما زلت مغطى",
                  bodyEn: "The agent hands your team a complete ticket with every detail ready to enter.",
                  bodyAr: "يسلّم الوكيل فريقك تذكرة كاملة بكل التفاصيل جاهزة للإدخال.",
                },
              ].map((item) => (
                <article key={item.titleEn} className="rcb-integ-feature">
                  <span className="rcb-integ-feature-icon">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <h3>{en ? item.titleEn : item.titleAr}</h3>
                  <p>{en ? item.bodyEn : item.bodyAr}</p>
                </article>
              ))}
            </div>

            <div className="rcb-trust-grid">
              <article className="rcb-trust-card">
                <h3>{en ? "It does not replace your team" : "لا يستبدل فريقك"}</h3>
                <p>
                  {en
                    ? "It handles the volume that never needed a person. Anything medical, angry, high value or unusual goes to a named member of staff with the full thread, and your dashboard publishes the containment and handover rates."
                    : "يتعامل مع الحجم الذي لا يحتاج شخصًا. أي أمر طبي أو غاضب أو عالي القيمة أو غير معتاد يذهب لعضو فريق مسمّى مع الخيط كاملًا، ولوحتك تنشر معدلات الاحتواء والتسليم."}
                </p>
              </article>
              <article className="rcb-trust-card">
                <h3>{en ? "Your customer data stays yours" : "بيانات عملائك تبقى لك"}</h3>
                <p>
                  {en
                    ? "Conversations, numbers and order history belong to you and are exportable, which is the opposite of an aggregator. In-region hosting and PDPL alignment are on the table for Saudi operators."
                    : "المحادثات والأرقام وسجل الطلبات ملكك وقابلة للتصدير، وهو عكس المجمّع. الاستضافة داخل المنطقة ومواءمة نظام حماية البيانات الشخصية مطروحة لمشغّلي السعودية."}
                </p>
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
            <p className="hp-hero-meta">
              {en
                ? "Tell us your POS on the call and we will show the connector, or say honestly that there is not one yet."
                : "أخبرنا بنقطة البيع في المكالمة وسنعرض الموصل، أو نقول بصراحة إن لم يوجد بعد."}
            </p>
          </div>
        </section>

        {/* J. Bottom modules */}
        <div id="rcb-pricing">
          <Pricing />
        </div>
        <Cta />
        <Faq />
      </main>

      <Footer />

      <Link href={routes.trial} className="float-trial rcb-float-trial">
        <span className="float-trial-dot" aria-hidden />
        {t.nav.trial}
      </Link>
    </>
  );
}
