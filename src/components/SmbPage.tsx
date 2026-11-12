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
  IconMenu,
  IconPhone,
  IconPlay,
  IconWhatsApp,
  LogoMark,
} from "@/components/Icons";
import { Pricing } from "@/components/Pricing";
import { useLocale } from "@/lib/locale";
import { brand, images, industryPages, routes } from "@/lib/site";

const accents = ["Emirati", "Saudi", "MSA (Fusha)", "Kuwaiti", "Qatari", "Omani", "Bahraini"] as const;
const voices = [
  { id: "noor", name: "Noor", gender: "FEMALE", letter: "N" },
  { id: "yousuf", name: "Yousuf", gender: "MALE", letter: "Y" },
  { id: "sultan", name: "Sultan", gender: "MALE", letter: "S" },
] as const;

const industryTags = [
  { en: "Salons", ar: "صالونات" },
  { en: "Spas", ar: "سبا" },
  { en: "E-commerce", ar: "التجارة الإلكترونية" },
  { en: "Gyms & Fitness Studios", ar: "الأندية والاستوديوهات" },
  { en: "Car Rental", ar: "تأجير السيارات" },
  { en: "HVAC & Home Services", ar: "التكييف والخدمات المنزلية" },
] as const;

type BizCard = {
  id: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  bulletsEn?: string[];
  bulletsAr?: string[];
  ctaEn: string;
  ctaAr: string;
  image: string;
  href: string;
};

const bizCards: BizCard[] = [
  {
    id: "salon",
    titleEn: "Beauty Salons",
    titleAr: "صالونات التجميل",
    bodyEn: "Bookings pile up in your DMs while your hands are full.",
    bodyAr: "الحجوزات تتراكم في رسائلك بينما يداك مشغولتان.",
    ctaEn: "See how to keep every chair booked →",
    ctaAr: "شاهد كيف تبقي كل كرسي محجوزًا ←",
    image: images.clinics,
    href: "#smb-gap",
  },
  {
    id: "spa",
    titleEn: "Spas & Wellness Centres",
    titleAr: "السبا ومراكز العافية",
    bodyEn: "The 10 pm couples booking goes to whoever answers first.",
    bodyAr: "حجز الزوجين الساعة 10 م يذهب لمن يرد أولًا.",
    ctaEn: "See how to book more treatments →",
    ctaAr: "شاهد كيف تحجز المزيد من الجلسات ←",
    image: images.hospitality,
    href: "#smb-gap",
  },
  {
    id: "ecommerce",
    titleEn: "E-commerce & Online Stores",
    titleAr: "التجارة الإلكترونية والمتاجر",
    bodyEn: "Where is my order, forty times a day.",
    bodyAr: "أين طلبي، أربعين مرة في اليوم.",
    bulletsEn: [
      "Order tracking and delivery changes answered instantly",
      "Cash-on-delivery orders confirmed before dispatch",
      "Stock and size questions turned into checkouts",
    ],
    bulletsAr: [
      "تتبع الطلب وتغييرات التوصيل تُجاب فورًا",
      "طلبات الدفع عند الاستلام تُؤكد قبل الشحن",
      "أسئلة المخزون والمقاس تتحول إلى إتمام شراء",
    ],
    ctaEn: "See how to close more orders →",
    ctaAr: "شاهد كيف تغلق المزيد من الطلبات ←",
    image: images.smb,
    href: "#smb-gap",
  },
  {
    id: "gym",
    titleEn: "Gyms & Fitness Studios",
    titleAr: "الأندية واستوديوهات اللياقة",
    bodyEn: "The lead from your Reel goes cold before the class ends.",
    bodyAr: "العميل المحتمل من الريل يبرد قبل انتهاء الحصة.",
    ctaEn: "See how to turn trials into members →",
    ctaAr: "شاهد كيف تحول التجارب إلى اشتراكات ←",
    image: images.hero,
    href: "#smb-gap",
  },
  {
    id: "car",
    titleEn: "Car Rental",
    titleAr: "تأجير السيارات",
    bodyEn: "Visitors message five companies and rent from the first to reply.",
    bodyAr: "الزوار يراسلون خمس شركات ويستأجرون ممن يرد أولًا.",
    bulletsEn: [
      "Quotes with mileage, insurance and deposit",
      "Licence and passport photos collected and checked",
      "Delivery times, extensions and payment links",
    ],
    bulletsAr: [
      "عروض مع الكيلومترات والتأمين والعربون",
      "صور الرخصة والجواز تُجمع وتُراجع",
      "أوقات التسليم والتمديد وروابط الدفع",
    ],
    ctaEn: "See how to win more rental bookings →",
    ctaAr: "شاهد كيف تكسب المزيد من حجوزات التأجير ←",
    image: images.dashboard,
    href: "#smb-gap",
  },
  {
    id: "hvac",
    titleEn: "HVAC & Home Services",
    titleAr: "التكييف والخدمات المنزلية",
    bodyEn: "In July, every missed call is a job for the next company on the map.",
    bodyAr: "في يوليو، كل مكالمة فائتة وظيفة للشركة التالية على الخريطة.",
    ctaEn: "See how to capture every service request →",
    ctaAr: "شاهد كيف تلتقط كل طلب خدمة ←",
    image: images.team,
    href: "#smb-gap",
  },
];

type GapIndustry = "salon" | "spa" | "ecommerce" | "gym" | "car" | "home";

type GapCard = {
  key: string;
  labelEn: string;
  labelAr: string;
  withTitleEn: string;
  withTitleAr: string;
  withBodyEn: string;
  withBodyAr: string;
  withFootEn: string;
  withFootAr: string;
  withoutTitleEn: string;
  withoutTitleAr: string;
  withoutBodyEn: string;
  withoutBodyAr: string;
  withoutFootEn: string;
  withoutFootAr: string;
};

const gapFilters: { id: GapIndustry; en: string; ar: string }[] = [
  { id: "salon", en: "Salon", ar: "صالون" },
  { id: "spa", en: "Spa", ar: "سبا" },
  { id: "ecommerce", en: "E-commerce", ar: "متجر" },
  { id: "gym", en: "Gym", ar: "نادي" },
  { id: "car", en: "Car rental", ar: "تأجير" },
  { id: "home", en: "Home services", ar: "خدمات منزلية" },
];

const gapByIndustry: Record<GapIndustry, GapCard[]> = {
  salon: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "An answer in seconds, in her language",
      withTitleAr: "رد خلال ثوانٍ، بلغتها",
      withBodyEn: "Prices, durations and real slots from your menu and calendar, in Gulf Arabic or English, at any hour.",
      withBodyAr: "الأسعار والمدد والمواعيد الحقيقية من قائمتك وتقويمك، بالعربية الخليجية أو الإنجليزية، في أي ساعة.",
      withFootEn: "First reply in under 5 seconds",
      withFootAr: "أول رد خلال أقل من 5 ثوانٍ",
      withoutTitleEn: "DMs wait until someone is free",
      withoutTitleAr: "الرسائل تنتظر حتى يتفرغ أحد",
      withoutBodyEn: "Prices and slots are guessed from memory. Arabic and English mix, and late-night chats sit unread.",
      withoutBodyAr: "الأسعار والمواعيد تُخمَّن من الذاكرة. العربية والإنجليزية تختلطان، ومحادثات الليل تبقى بلا رد.",
      withoutFootEn: "First reply often hours later",
      withoutFootAr: "أول رد غالبًا بعد ساعات",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "Every late enquiry gets a held slot",
      withTitleAr: "كل استفسار متأخر يحصل على موعد محجوز",
      withBodyEn: "It collects the date, group size and services, quotes your packages and holds a provisional slot for you to confirm in the morning.",
      withBodyAr: "يجمع التاريخ وحجم المجموعة والخدمات، ويعرض باقاتك ويحجز موعدًا مؤقتًا لتأكيده صباحًا.",
      withFootEn: "Group enquiries captured overnight",
      withFootAr: "استفسارات المجموعات تُلتقط ليلًا",
      withoutTitleEn: "Overnight chats go cold by open",
      withoutTitleAr: "محادثات الليل تبرد قبل الافتتاح",
      withoutBodyEn: "Group bookings and bridal parties message after hours and book elsewhere before you see the thread.",
      withoutBodyAr: "حجوزات المجموعات والعرائس تصل بعد الدوام وتُحجز في مكان آخر قبل أن ترى الرسالة.",
      withoutFootEn: "Lost bookings before you open",
      withoutFootAr: "حجوزات ضائعة قبل أن تفتح",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "One inbox, repeat questions handled",
      withTitleAr: "صندوق واحد، والأسئلة المتكررة تُعالَج",
      withBodyEn: "Routine questions and bookings are done; only consultations and complaints reach your team, with the conversation attached.",
      withBodyAr: "الأسئلة الروتينية والحجوزات تُنجز؛ الاستشارات والشكاوى فقط تصل لفريقك مع المحادثة مرفقة.",
      withFootEn: "Your team handles only what needs them",
      withFootAr: "فريقك يتعامل فقط مع ما يحتاجه",
      withoutTitleEn: "Owner answers every repeat question",
      withoutTitleAr: "المالك يجيب كل سؤال متكرر",
      withoutBodyEn: "Price lists, opening hours and parking directions eat the day while real clients wait for a chair.",
      withoutBodyAr: "قوائم الأسعار وساعات العمل ومواقف السيارات تلتهم اليوم بينما العملاء الحقيقيون ينتظرون كرسيًا.",
      withoutFootEn: "Team buried in routine chats",
      withoutFootAr: "الفريق غارق في المحادثات الروتينية",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Reminders, deposits and a refilled diary",
      withTitleAr: "تذكيرات وعربون ومفكرة ممتلئة",
      withBodyEn: "Reminders the day before and on the day, deposit links for long services, and freed slots offered to the next client.",
      withBodyAr: "تذكيرات قبل الموعد وفي يومه، وروابط عربون للخدمات الطويلة، والمواعيد المحررة تُعرض للعميل التالي.",
      withFootEn: "Fewer empty chairs",
      withFootAr: "كراسي فارغة أقل",
      withoutTitleEn: "No-shows leave chairs empty",
      withoutTitleAr: "الغياب يترك الكراسي فارغة",
      withoutBodyEn: "Long services book without deposits. Cancellations are not filled, and the diary thins out midweek.",
      withoutBodyAr: "الخدمات الطويلة تُحجز بلا عربون. الإلغاءات لا تُملأ، والمفكرة تضعف منتصف الأسبوع.",
      withoutFootEn: "Diary stays thin",
      withoutFootAr: "المفكرة تبقى ضعيفة",
    },
  ],
  spa: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "Treatment menus answered in seconds",
      withTitleAr: "قوائم العلاجات تُجاب خلال ثوانٍ",
      withBodyEn: "Durations, couples packages and therapist gender preferences answered in Gulf Arabic or English, day or night.",
      withBodyAr: "المدد وباقات الزوجين وتفضيل المعالج تُجاب بالعربية الخليجية أو الإنجليزية، ليلًا أو نهارًا.",
      withFootEn: "Couples slots held instantly",
      withFootAr: "مواعيد الزوجين تُحجز فورًا",
      withoutTitleEn: "Late spa chats sit unread",
      withoutTitleAr: "محادثات السبا المتأخرة بلا رد",
      withoutBodyEn: "After-hours couples requests wait until reception opens, and the booking is already gone.",
      withoutBodyAr: "طلبات الزوجين بعد الدوام تنتظر حتى يفتح الاستقبال، والحجز يكون قد ذهب.",
      withoutFootEn: "Peak slots lost overnight",
      withoutFootAr: "أفضل المواعيد تُفقد ليلًا",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "Every late booking gets a hold",
      withTitleAr: "كل حجز متأخر يحصل على حجز مؤقت",
      withBodyEn: "It captures treatment, duration and party size, then holds a provisional slot for morning confirm.",
      withBodyAr: "يلتقط العلاج والمدة وحجم المجموعة، ثم يحجز موعدًا مؤقتًا للتأكيد صباحًا.",
      withFootEn: "10 pm enquiries become bookings",
      withFootAr: "استفسارات 10 م تتحول لحجوزات",
      withoutTitleEn: "Night enquiries evaporate",
      withoutTitleAr: "استفسارات الليل تتبخر",
      withoutBodyEn: "The 10 pm couples booking goes to whoever answers first — usually a competitor.",
      withoutBodyAr: "حجز الزوجين الساعة 10 م يذهب لمن يرد أولًا — عادة منافس.",
      withoutFootEn: "Revenue walks next door",
      withoutFootAr: "الإيراد يمشي للجيران",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "Therapists stay with guests",
      withTitleAr: "المعالجون يبقون مع الضيوف",
      withBodyEn: "Routine questions are handled; only special requests and VIP notes reach your floor team.",
      withBodyAr: "الأسئلة الروتينية تُعالَج؛ الطلبات الخاصة وملاحظات كبار الشخصيات فقط تصل لفريقك.",
      withFootEn: "Floor stays focused on guests",
      withFootAr: "الطابق يبقى مركزًا على الضيوف",
      withoutTitleEn: "Reception juggles every chat",
      withoutTitleAr: "الاستقبال يتنقل بين كل محادثة",
      withoutBodyEn: "Staff leave the floor to answer the same package questions all evening.",
      withoutBodyAr: "الموظفون يتركون الطابق للإجابة عن أسئلة الباقات نفسها طوال المساء.",
      withoutFootEn: "Service quality dips",
      withoutFootAr: "جودة الخدمة تتراجع",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Deposits and refill from the waitlist",
      withTitleAr: "عربون وإعادة ملء من قائمة الانتظار",
      withBodyEn: "Deposit links for long treatments, day-of reminders, and freed slots offered to the next guest.",
      withBodyAr: "روابط عربون للعلاجات الطويلة، وتذكيرات يوم الموعد، والمواعيد المحررة تُعرض للضيف التالي.",
      withFootEn: "Rooms stay booked",
      withFootAr: "الغرف تبقى محجوزة",
      withoutTitleEn: "Empty rooms after no-shows",
      withoutTitleAr: "غرف فارغة بعد الغياب",
      withoutBodyEn: "Cancellations are not backfilled and long treatments book without deposit protection.",
      withoutBodyAr: "الإلغاءات لا تُملأ والعلاجات الطويلة تُحجز بلا حماية عربون.",
      withoutFootEn: "Utilisation drops midweek",
      withoutFootAr: "الاستغلال ينخفض منتصف الأسبوع",
    },
  ],
  ecommerce: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "Where is my order, answered instantly",
      withTitleAr: "أين طلبي يُجاب فورًا",
      withBodyEn: "Tracking, delivery changes and size questions answered from your catalogue and courier feeds, in Arabic or English.",
      withBodyAr: "التتبع وتغييرات التوصيل وأسئلة المقاس تُجاب من كتالوجك وبيانات الشحن، بالعربية أو الإنجليزية.",
      withFootEn: "Support that closes, not tickets",
      withFootAr: "دعم يُغلق الطلب لا التذاكر",
      withoutTitleEn: "Same WISMO thread forty times",
      withoutTitleAr: "نفس سؤال أين طلبي أربعين مرة",
      withoutBodyEn: "Owners and junior staff paste tracking links by hand while new buyers wait.",
      withoutBodyAr: "الملاك والموظفون يلصقون روابط التتبع يدويًا بينما المشترون الجدد ينتظرون.",
      withoutFootEn: "Inbox never clears",
      withoutFootAr: "الصندوق لا يفرغ أبدًا",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "COD and stock questions become checkouts",
      withTitleAr: "أسئلة الدفع عند الاستلام والمخزون تصبح مشتريات",
      withBodyEn: "Cash-on-delivery is confirmed before dispatch; size and stock questions turn into paid carts.",
      withBodyAr: "الدفع عند الاستلام يُؤكد قبل الشحن؛ أسئلة المقاس والمخزون تتحول إلى سلال مدفوعة.",
      withFootEn: "More carts completed overnight",
      withFootAr: "المزيد من السلال تُكمل ليلًا",
      withoutTitleEn: "COD orders ship unconfirmed",
      withoutTitleAr: "طلبات الدفع عند الاستلام تُشحن بلا تأكيد",
      withoutBodyEn: "Unconfirmed COD burns courier fees. Size doubts abandon the cart after hours.",
      withoutBodyAr: "الدفع عند الاستلام غير المؤكد يحرق رسوم الشحن. شكوك المقاس تترك السلة بعد الدوام.",
      withoutFootEn: "Returns and empty carts rise",
      withoutFootAr: "المرتجعات والسلال الفارغة ترتفع",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "One channel stack, less copy-paste",
      withTitleAr: "قناة واحدة أقل نسخًا ولصقًا",
      withBodyEn: "WhatsApp, Instagram and chat share one agent; only refunds and disputes reach your team with context.",
      withBodyAr: "واتساب وإنستغرام والدردشة على وكيل واحد؛ الاسترداد والنزاعات فقط تصل لفريقك مع السياق.",
      withFootEn: "Ops handles exceptions only",
      withFootAr: "التشغيل يتعامل مع الاستثناءات فقط",
      withoutTitleEn: "Three apps, one overloaded owner",
      withoutTitleAr: "ثلاثة تطبيقات ومالك مثقل",
      withoutBodyEn: "The same FAQ is typed into Instagram, WhatsApp and email every evening.",
      withoutBodyAr: "نفس الأسئلة تُكتب في إنستغرام وواتساب والبريد كل مساء.",
      withoutFootEn: "Hours lost to repeat replies",
      withoutFootAr: "ساعات تُفقد في الردود المتكررة",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Upsells and payment links in the thread",
      withTitleAr: "البيع الإضافي وروابط الدفع في المحادثة",
      withBodyEn: "Payment links, size alternatives and bundle offers sent while the shopper is still in chat.",
      withBodyAr: "روابط الدفع وبدائل المقاس وعروض الباقات تُرسل والعميل ما زال في المحادثة.",
      withFootEn: "Higher conversion per chat",
      withFootAr: "تحويل أعلى لكل محادثة",
      withoutTitleEn: "Interested buyers leave quietly",
      withoutTitleAr: "المهتمون يغادرون بهدوء",
      withoutBodyEn: "No payment link in chat means the buyer opens three other stores before you reply.",
      withoutBodyAr: "بلا رابط دفع في المحادثة يفتح المشتري ثلاثة متاجر أخرى قبل ردك.",
      withoutFootEn: "Abandoned interest overnight",
      withoutFootAr: "اهتمام يُهجر ليلًا",
    },
  ],
  gym: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "Class and trial questions answered live",
      withTitleAr: "أسئلة الحصص والتجارب تُجاب مباشرة",
      withBodyEn: "Timetable, trial pricing and trainer gender answered in Arabic or English the moment the Reel lands.",
      withBodyAr: "الجدول وسعر التجربة وجنس المدرب يُجاب بالعربية أو الإنجليزية فور وصول الريل.",
      withFootEn: "Leads answered before class ends",
      withFootAr: "العملاء يُجابون قبل انتهاء الحصة",
      withoutTitleEn: "Reel leads go cold mid-class",
      withoutTitleAr: "عملاء الريل يبردون أثناء الحصة",
      withoutBodyEn: "Reception is on the floor. The Instagram lead waits, then books a competitor trial.",
      withoutBodyAr: "الاستقبال في الصالة. عميل إنستغرام ينتظر ثم يحجز تجربة عند منافس.",
      withoutFootEn: "Paid ads warm nobody",
      withoutFootAr: "الإعلانات المدفوعة لا تدفئ أحدًا",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "Trials booked and held overnight",
      withTitleAr: "التجارب تُحجز وتُحفظ ليلًا",
      withBodyEn: "It captures preferred class, time and goals, then holds a trial slot for morning confirm.",
      withBodyAr: "يلتقط الحصة المفضلة والوقت والأهداف، ثم يحجز تجربة مؤقتة للتأكيد صباحًا.",
      withFootEn: "More trials into members",
      withFootAr: "المزيد من التجارب تصبح اشتراكات",
      withoutTitleEn: "Trial interest evaporates",
      withoutTitleAr: "اهتمام التجربة يتبخر",
      withoutBodyEn: "Late DMs about membership and PT packages sit until tomorrow and never convert.",
      withoutBodyAr: "رسائل العضوية وباقات التدريب الشخصي تبقى لليوم التالي ولا تتحول.",
      withoutFootEn: "Ad spend without follow-through",
      withoutFootAr: "إنفاق إعلاني بلا متابعة",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "Front desk stays on the floor",
      withTitleAr: "الاستقبال يبقى في الصالة",
      withBodyEn: "Timetable and pricing FAQs are handled; only PT consults and complaints reach staff with context.",
      withBodyAr: "أسئلة الجدول والأسعار تُعالَج؛ استشارات التدريب والشكاوى فقط تصل للموظفين مع السياق.",
      withFootEn: "Staff time back on members",
      withFootAr: "وقت الموظفين يعود للأعضاء",
      withoutTitleEn: "Staff glued to the phone",
      withoutTitleAr: "الموظفون ملتصقون بالهاتف",
      withoutBodyEn: "Every membership FAQ pulls a trainer or receptionist off the floor.",
      withoutBodyAr: "كل سؤال عضوية يسحب مدربًا أو موظف استقبال من الصالة.",
      withoutFootEn: "Member experience suffers",
      withoutFootAr: "تجربة الأعضاء تتضرر",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Reminders and renewal nudges",
      withTitleAr: "تذكيرات وتنبيهات التجديد",
      withBodyEn: "Trial reminders, freeze requests handled by rules, and renewals nudged before expiry.",
      withBodyAr: "تذكيرات التجربة وطلبات التجميد حسب القواعد، والتجديد يُنبَّه قبل الانتهاء.",
      withFootEn: "Higher trial-to-member rate",
      withFootAr: "معدل أعلى من التجربة للاشتراك",
      withoutTitleEn: "Trials no-show, renewals slip",
      withoutTitleAr: "التجارب تغيب والتجديد يتأخر",
      withoutBodyEn: "No day-of reminders and renewals wait until the member has already left.",
      withoutBodyAr: "بلا تذكيرات يوم الموعد، والتجديد ينتظر حتى يغادر العضو.",
      withoutFootEn: "Churn climbs quietly",
      withoutFootAr: "التسرب يرتفع بهدوء",
    },
  ],
  car: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "Quotes in seconds, not hours",
      withTitleAr: "عروض خلال ثوانٍ لا ساعات",
      withBodyEn: "Mileage, insurance and deposit quotes in Arabic or English the moment a visitor messages.",
      withBodyAr: "عروض الكيلومترات والتأمين والعربون بالعربية أو الإنجليزية فور رسالة الزائر.",
      withFootEn: "First quote wins the rental",
      withFootAr: "أول عرض يفوز بالتأجير",
      withoutTitleEn: "Visitors message five companies",
      withoutTitleAr: "الزوار يراسلون خمس شركات",
      withoutBodyEn: "They rent from the first to reply. Your quote arrives after the keys are already out.",
      withoutBodyAr: "يستأجرون ممن يرد أولًا. عرضك يصل بعد أن تكون المفاتيح قد خرجت.",
      withoutFootEn: "Lost to the fastest inbox",
      withoutFootAr: "خسارة لأسرع صندوق وارد",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "Docs collected before pickup",
      withTitleAr: "المستندات تُجمع قبل الاستلام",
      withBodyEn: "Licence and passport photos collected and checked; delivery time held with a payment link.",
      withBodyAr: "صور الرخصة والجواز تُجمع وتُراجع؛ موعد التسليم يُحجز مع رابط دفع.",
      withFootEn: "Ready-to-drive bookings overnight",
      withFootAr: "حجوزات جاهزة للقيادة ليلًا",
      withoutTitleEn: "Incomplete chats die at dawn",
      withoutTitleAr: "المحادثات الناقصة تموت عند الفجر",
      withoutBodyEn: "Documents are chased by hand the next day while the visitor already booked elsewhere.",
      withoutBodyAr: "المستندات تُطارد يدويًا في اليوم التالي بينما الزائر حجز في مكان آخر.",
      withoutFootEn: "Airport leads go cold",
      withoutFootAr: "عملاء المطار يبردون",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "Extensions and delivery handled",
      withTitleAr: "التمديد والتوصيل يُداران",
      withBodyEn: "Extension requests, delivery windows and payment links run by rules; exceptions reach your desk with the thread.",
      withBodyAr: "طلبات التمديد ونوافذ التوصيل وروابط الدفع تعمل بالقواعد؛ الاستثناءات تصل لمكتبك مع المحادثة.",
      withFootEn: "Desk handles exceptions only",
      withFootAr: "المكتب يتعامل مع الاستثناءات فقط",
      withoutTitleEn: "Every extension is a long chat",
      withoutTitleAr: "كل تمديد محادثة طويلة",
      withoutBodyEn: "Staff retype mileage rules and insurance options into WhatsApp all day.",
      withoutBodyAr: "الموظفون يعيدون كتابة قواعد الكيلومترات وخيارات التأمين في واتساب طوال اليوم.",
      withoutFootEn: "Desk buried in routine WhatsApps",
      withoutFootAr: "المكتب غارق في واتساب الروتيني",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Deposits locked, fleet utilised",
      withTitleAr: "عربون مؤمَّن وأسطول مستغل",
      withBodyEn: "Payment links before delivery, upsell insurance, and freed cars offered to the next enquiry.",
      withBodyAr: "روابط دفع قبل التسليم، وبيع تأمين إضافي، والسيارات المحررة تُعرض للاستفسار التالي.",
      withFootEn: "Higher utilisation per car",
      withFootAr: "استغلال أعلى لكل سيارة",
      withoutTitleEn: "Cars sit while chats wait",
      withoutTitleAr: "السيارات تنتظر والمحادثات تنتظر",
      withoutBodyEn: "No deposit link means soft bookings that cancel when a cheaper quote appears.",
      withoutBodyAr: "بلا رابط عربون الحجوزات ضعيفة وتُلغى عند ظهور عرض أرخص.",
      withoutFootEn: "Soft holds, hard losses",
      withoutFootAr: "حجوزات ضعيفة وخسائر صلبة",
    },
  ],
  home: [
    {
      key: "cx",
      labelEn: "CUSTOMER EXPERIENCE",
      labelAr: "تجربة العميل",
      withTitleEn: "Emergency AC calls answered now",
      withTitleAr: "مكالمات التكييف الطارئة تُجاب الآن",
      withBodyEn: "Fault type, building and preferred window captured in Arabic or English within seconds.",
      withBodyAr: "نوع العطل والمبنى والوقت المفضل يُلتقط بالعربية أو الإنجليزية خلال ثوانٍ.",
      withFootEn: "First reply wins the job",
      withFootAr: "أول رد يفوز بالوظيفة",
      withoutTitleEn: "July calls ring out",
      withoutTitleAr: "مكالمات يوليو لا تُرد",
      withoutBodyEn: "In peak heat every missed call is a job for the next company on the map.",
      withoutBodyAr: "في ذروة الحر كل مكالمة فائتة وظيفة للشركة التالية على الخريطة.",
      withoutFootEn: "Jobs lost while on a roof",
      withoutFootAr: "وظائف تُفقد وأنت على السطح",
    },
    {
      key: "missed",
      labelEn: "MISSED OPPORTUNITIES",
      labelAr: "الفرص الضائعة",
      withTitleEn: "Every after-hours request logged",
      withTitleAr: "كل طلب بعد الدوام يُسجَّل",
      withBodyEn: "It books a provisional slot, sends a confirmation SMS and holds the lead until a tech confirms.",
      withBodyAr: "يحجز موعدًا مؤقتًا ويرسل رسالة تأكيد ويحتفظ بالعميل حتى يؤكد الفني.",
      withFootEn: "Night leads become morning jobs",
      withFootAr: "عملاء الليل يصبحون وظائف الصباح",
      withoutTitleEn: "Voicemail nobody returns",
      withoutTitleAr: "بريد صوتي لا يُعاد",
      withoutBodyEn: "After-hours AC failures go to whoever picks up — rarely you.",
      withoutBodyAr: "أعطال التكييف بعد الدوام تذهب لمن يلتقط — نادرًا أنت.",
      withoutFootEn: "Map competitors win by default",
      withoutFootAr: "منافسو الخريطة يفوزون افتراضيًا",
    },
    {
      key: "ops",
      labelEn: "OPERATIONS",
      labelAr: "التشغيل",
      withTitleEn: "Techs stay on the job",
      withTitleAr: "الفنيون يبقون في المهمة",
      withBodyEn: "Address, fault and access notes are collected before dispatch; only exceptions reach the coordinator.",
      withBodyAr: "العنوان والعطل وملاحظات الدخول تُجمع قبل الإرسال؛ الاستثناءات فقط تصل للمنسق.",
      withFootEn: "Dispatch with full context",
      withFootAr: "إرسال بسياق كامل",
      withoutTitleEn: "Coordinator answers every chat",
      withoutTitleAr: "المنسق يجيب كل محادثة",
      withoutBodyEn: "Same address and warranty questions are retyped while techs wait for the next job.",
      withoutBodyAr: "نفس أسئلة العنوان والضمان تُعاد كتابتها بينما الفنيون ينتظرون المهمة التالية.",
      withoutFootEn: "Dispatch slows every peak day",
      withoutFootAr: "الإرسال يتباطأ في كل يوم ذروة",
    },
    {
      key: "revenue",
      labelEn: "REVENUE",
      labelAr: "الإيرادات",
      withTitleEn: "Quotes and payment links same day",
      withTitleAr: "عروض وروابط دفع في نفس اليوم",
      withBodyEn: "Service quotes, AMC renewals and payment links sent while the customer is still messaging.",
      withBodyAr: "عروض الخدمة وتجديد العقود وروابط الدفع تُرسل والعميل ما زال يراسل.",
      withFootEn: "More jobs closed same day",
      withFootAr: "المزيد من الوظائف تُغلق في نفس اليوم",
      withoutTitleEn: "Quotes wait until tomorrow",
      withoutTitleAr: "العروض تنتظر الغد",
      withoutBodyEn: "By the time you send a quote, another HVAC company is already on site.",
      withoutBodyAr: "حين ترسل العرض تكون شركة تكييف أخرى في الموقع.",
      withoutFootEn: "Same-day revenue slips away",
      withoutFootAr: "إيراد نفس اليوم يتسرب",
    },
  ],
};

function SmbDropdown({ label, children }: { label: string; children: ReactNode }) {
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

function GiftMark() {
  return (
    <svg viewBox="0 0 24 24" className="smb-gift-icon" aria-hidden>
      <path
        d="M4 11h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5V11H3V8.5Z"
        fill="currentColor"
      />
      <path d="M12 7v15M3 11h18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 7c-1.8-2.6-4.5-2.8-5.5-1.5S6.2 8.8 9 9c1.2.1 2.2-.4 3-2Zm0 0c1.8-2.6 4.5-2.8 5.5-1.5S17.8 8.8 15 9c-1.2.1-2.2-.4-3-2Z"
        fill="currentColor"
      />
    </svg>
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

function SmbHeader() {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const links = [
    ["#smb-how", en ? "How it works" : "كيف يعمل"],
    ["#smb-live", en ? "See it live" : "شاهده مباشرة"],
    ["#smb-pricing", en ? "Pricing" : "الأسعار"],
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
          <SmbDropdown label={t.nav.industries}>
            {industryPages.map((page) => (
              <Link
                key={page.slug}
                href={page.href}
                className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]"
              >
                <span className="block text-sm font-semibold text-[var(--ink)]">
                  {en ? page.en.title : page.ar.title}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--soft)]">
                  {en ? page.en.focus : page.ar.focus}
                </span>
              </Link>
            ))}
          </SmbDropdown>
          <SmbDropdown label={en ? "AI Employee" : "موظف AI"}>
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
          </SmbDropdown>
          <a href={routes.talk} target="_blank" rel="noreferrer" className="hp-nav-link">
            {en ? "Contact" : "تواصل"}
          </a>
          <SmbDropdown label={t.nav.resources}>
            <Link href={routes.blog} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.blog}</span>
            </Link>
            <Link href={routes.news} className="block rounded-xl px-3.5 py-3 hover:bg-[var(--page-soft)]">
              <span className="block text-sm font-semibold text-[var(--ink)]">{t.nav.news}</span>
            </Link>
          </SmbDropdown>
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
            {industryPages.map((page) => (
              <Link
                key={page.slug}
                href={page.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
              >
                {en ? page.en.title : page.ar.title}
              </Link>
            ))}
            <Link
              href={routes.employee}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
              {en ? "AI Employee" : "موظف AI"}
            </Link>
            <a
              href={routes.talk}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)]"
            >
              {en ? "Contact" : "تواصل"}
            </a>
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

export function SmbPage() {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const [accent, setAccent] = useState<(typeof accents)[number]>("Emirati");
  const [voice, setVoice] = useState("noor");
  const [gapIndustry, setGapIndustry] = useState<GapIndustry>("salon");
  const [withPlatform, setWithPlatform] = useState(true);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const gapCards = gapByIndustry[gapIndustry];

  useEffect(() => {
    setFlipped({});
  }, [gapIndustry, withPlatform]);

  const showWith = (key: string) => {
    const isFlipped = Boolean(flipped[key]);
    return isFlipped ? !withPlatform : withPlatform;
  };

  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <SmbHeader />
      </div>

      <main>
        {/* 1. Hero */}
        <section className="smb-hero">
          <div className="smb-hero-rings" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="shell smb-hero-grid">
            <div className="smb-hero-copy">
              <span className="smb-badge">
                <span aria-hidden />
                {en
                  ? "AI Customer Experience Platform for Small Medium Businesses"
                  : "منصة تجربة العملاء بالذكاء الاصطناعي للمنشآت الصغيرة والمتوسطة"}
              </span>
              <h1 className="smb-hero-title">
                {en ? (
                  <>
                    Every missed reply is a revenue loss{" "}
                    <span>to the business that fails to answer first.</span>
                  </>
                ) : (
                  <>
                    كل رد فائت خسارة إيراد{" "}
                    <span>للمنشأة التي تفشل في الرد أولًا.</span>
                  </>
                )}
              </h1>
              <p className="smb-hero-body">
                {en
                  ? "The AI customer experience platform for small medium businesses in the GCC. It answers WhatsApp, Instagram, chat and calls in Arabic and English, books and sells, and hands anything sensitive to you."
                  : "منصة تجربة العملاء بالذكاء الاصطناعي للمنشآت الصغيرة والمتوسطة في الخليج. ترد على واتساب وإنستغرام والدردشة والمكالمات بالعربية والإنجليزية، وتحجز وتبيع، وتسلّم أي أمر حسّاس إليك."}
              </p>
              <div className="smb-tags">
                {industryTags.map((tag) => (
                  <span key={tag.en} className="smb-tag">
                    {en ? tag.en : tag.ar}
                  </span>
                ))}
              </div>
              <div className="smb-promo-pill">
                <span className="smb-promo-live" aria-hidden />
                <span className="smb-promo-gift" aria-hidden>
                  <GiftMark />
                </span>
                <span>{t.promo}</span>
              </div>
              <div className="smb-hero-ctas">
                <Link href={routes.trial} className="btn-primary">
                  {t.nav.trial}
                </Link>
                <Link href={routes.demo} className="btn-secondary">
                  {t.nav.demo}
                </Link>
              </div>
              <p className="smb-hero-caption">
                {en
                  ? "Plans from AED / SAR / QAR 90 a month · WhatsApp, Social Media, Voice Call, Web Chat, Email & SMS · Arabic and English"
                  : "خطط من 90 درهم / ريال / ريال قطري شهريًا · واتساب ووسائل التواصل والمكالمات والدردشة والبريد والرسائل · العربية والإنجليزية"}
              </p>
            </div>

            <div className="smb-film-card">
              <Image src={images.smb} alt="" fill className="object-cover smb-film-bg" sizes="640px" />
              <div className="smb-film-shade" />
              <div className="smb-film-toast" role="status">
                <IconCheck className="h-3.5 w-3.5" />
                {en ? "Car delivered - Falcon Rent a Car" : "تم تسليم السيارة — فالكون لتأجير السيارات"}
              </div>
              <div className="smb-film-copy">
                <p className="smb-film-eyebrow">
                  {en
                    ? "SALONS • SPAS • GYMS • ONLINE STORES • HOME SERVICES"
                    : "صالونات • سبا • أندية • متاجر • خدمات منزلية"}
                </p>
                <h2>
                  {en
                    ? "Your Next Customer Is Messaging You Right Now."
                    : "عميلك التالي يراسلك الآن."}
                </h2>
                <p>
                  {en
                    ? "Watch the AI agent answer, book and sell for a salon, a gym and an online store, in Arabic and English, in seconds."
                    : "شاهد وكيل الذكاء الاصطناعي يرد ويحجز ويبيع لصالون ونادٍ ومتجر، بالعربية والإنجليزية، خلال ثوانٍ."}
                </p>
                <button type="button" className="smb-film-cta">
                  <IconPlay className="h-4 w-4" />
                  {en ? "Watch the film - 75 seconds" : "شاهد الفيلم - 75 ثانية"}
                </button>
              </div>
              <button type="button" className="smb-film-play" aria-label={en ? "Play film" : "تشغيل الفيلم"}>
                <IconPlay className="h-7 w-7" />
              </button>
              <span className="smb-film-247">
                <span aria-hidden />
                24/7
              </span>
            </div>
          </div>
        </section>

        {/* 2. Talk + WhatsApp */}
        <section id="smb-live" className="hp-agent smb-live">
          <div className="shell">
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
                    ? "Scan the code, or tap the button on your phone. Tell the agent your business type, then message it like your customers would."
                    : "امسح الرمز، أو اضغط الزر على هاتفك. أخبر الوكيل بنوع عملك، ثم راسله كما يفعل عملاؤك."}
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
                      {en ? "Hi, I run a salon in Dubai." : "مرحبا، أدير صالونًا في دبي."}
                    </div>
                    <div className="rcb-wa-bubble is-voice">
                      <span className="rcb-voice-play" aria-hidden>
                        ▶
                      </span>
                      <span className="rcb-voice-wave" aria-hidden />
                      <em>0:09</em>
                      <span className="smb-voice-label">{en ? "Voice note" : "ملاحظة صوتية"}</span>
                    </div>
                    <div className="rcb-wa-bubble is-agent">
                      {en
                        ? "Great, I'll be your salon's front desk. How can I help?"
                        : "رائع، سأكون استقبال صالونك. كيف أقدر أساعد؟"}
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
          </div>
        </section>

        {/* 3. Built for your business */}
        <section id="smb-how" className="smb-how">
          <div className="shell">
            <span className="smb-badge smb-badge-soft">
              <span aria-hidden />
              {en ? "Built for your business" : "مبني لعملك"}
            </span>
            <h2 className="smb-section-title">
              {en
                ? "Built for small medium businesses: six industries, one agent that already knows the questions."
                : "مبني للمنشآت الصغيرة والمتوسطة: ستة قطاعات، وكيل واحد يعرف الأسئلة مسبقًا."}
            </h2>
            <p className="smb-section-body">
              {en
                ? "Pick yours. The rest of the page adapts to show the problems it solves for you and how it handles them."
                : "اختر قطاعك. بقية الصفحة تتكيّف لتُظهر المشكلات التي يحلها وكيف يتعامل معها."}
            </p>
            <div className="smb-biz-grid">
              {bizCards.map((card) => (
                <article key={card.id} className="smb-biz-card">
                  <Image src={card.image} alt="" fill className="object-cover" sizes="420px" />
                  <div className="smb-biz-shade" />
                  <div className="smb-biz-content">
                    <h3>{en ? card.titleEn : card.titleAr}</h3>
                    <p>{en ? card.bodyEn : card.bodyAr}</p>
                    {card.bulletsEn ? (
                      <ul>
                        {(en ? card.bulletsEn : card.bulletsAr ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    <a href={card.href} className="smb-biz-cta">
                      {en ? card.ctaEn : card.ctaAr}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cost of a late reply */}
        <section className="smb-cost">
          <div className="shell smb-cost-grid">
            <div className="smb-cost-copy">
              <p className="selected-eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                {en ? "The cost of a late reply" : "تكلفة الرد المتأخر"}
              </p>
              <h2 className="smb-section-title">
                {en
                  ? "A slow reply is not a small problem. It is revenue walking to a competitor."
                  : "الرد البطيء ليس مشكلة صغيرة. إنه إيراد يمشي إلى منافس."}
              </h2>
              <p className="smb-section-body">
                {en
                  ? "Customers expect an answer in minutes, on the channel they chose, in their own language. When the owner is also the front desk, that gap shows up in four places: the customer's experience, the enquiries that never become bookings, the hours your team loses, and the month's takings."
                  : "يتوقع العملاء ردًا خلال دقائق، على القناة التي اختاروها، وبلغتهم. عندما يكون المالك هو الاستقبال أيضًا، تظهر الفجوة في أربعة أماكن: تجربة العميل، والاستفسارات التي لا تصبح حجوزات، والساعات التي يخسرها فريقك، وإيرادات الشهر."}
              </p>
            </div>

            <div className="smb-cost-card">
              <div className="smb-cost-top">
                <span className="is-new">
                  <span aria-hidden />
                  {en ? "NEW ENQUIRIES" : "استفسارات جديدة"}
                </span>
                <span className="is-lost">
                  <span aria-hidden />
                  {en ? "LOST TO A COMPETITOR" : "ضاعت لمنافس"}
                </span>
              </div>
              <div className="smb-cost-stage">
                <span className="smb-cost-bubble is-a">{en ? "Price for a facial?" : "سعر الوجه؟"}</span>
                <span className="smb-cost-bubble is-b">{en ? "Is Friday 7 pm free?" : "الجمعة 7 م متاح؟"}</span>
                <span className="smb-cost-bubble is-c">{en ? "Do you deliver to..." : "هل توصلون إلى..."}</span>
                <span className="smb-cost-bubble is-d">{en ? "AC stopped, can y..." : "التكييف توقف، هل..."}</span>
                <span className="smb-cost-time">23:50</span>
                <div className="smb-cost-glass">
                  <span className="smb-cost-shop" aria-hidden>
                    ⌂
                  </span>
                  <p>
                    {en
                      ? "Your front desk. Closed. Nobody is answering."
                      : "استقبالك. مغلق. لا أحد يرد."}
                  </p>
                </div>
                <div className="smb-cost-late">
                  <span />
                  <em>{en ? "15 minutes late" : "متأخر 15 دقيقة"}</em>
                </div>
              </div>
              <div className="smb-cost-stats">
                <div>
                  <strong className="is-wait">2</strong>
                  <span>{en ? "waiting for a reply" : "بانتظار رد"}</span>
                </div>
                <div>
                  <strong className="is-gone">8</strong>
                  <span>{en ? "lost tonight" : "ضاعت الليلة"}</span>
                </div>
              </div>
              <p className="smb-cost-caption">
                {en
                  ? "Illustration. Every enquiry that waits past the moment of interest is a risk a business can take."
                  : "توضيح. كل استفسار ينتظر بعد لحظة الاهتمام مخاطرة يمكن للمنشأة تحمّلها."}
              </p>
            </div>
          </div>
        </section>

        {/* 5. Gap comparison */}
        <section id="smb-gap" className="smb-gap">
          <div className="shell">
            <div className="smb-gap-panel">
              <h2 className="smb-gap-title">
                {en
                  ? `Where the gap shows up for your business, and how ${brand.short} closes it`
                  : `أين تظهر الفجوة في عملك، وكيف يغلقها ${brand.short}`}
              </h2>

              <div className="smb-gap-controls">
                <div className="smb-gap-filters" role="tablist" aria-label={en ? "Industry" : "القطاع"}>
                  {gapFilters.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={gapIndustry === item.id}
                      className={gapIndustry === item.id ? "is-active" : ""}
                      onClick={() => setGapIndustry(item.id)}
                    >
                      {en ? item.en : item.ar}
                    </button>
                  ))}
                </div>
                <div className="smb-gap-toggle" role="group" aria-label={en ? "Comparison mode" : "وضع المقارنة"}>
                  <button
                    type="button"
                    className={!withPlatform ? "is-active" : ""}
                    onClick={() => setWithPlatform(false)}
                  >
                    {en ? `Without ${brand.short}` : `بدون ${brand.short}`}
                  </button>
                  <button
                    type="button"
                    className={withPlatform ? "is-active" : ""}
                    onClick={() => setWithPlatform(true)}
                  >
                    {en ? `With ${brand.short}` : `مع ${brand.short}`}
                  </button>
                </div>
              </div>

              <div className="smb-gap-grid">
                {gapCards.map((card) => {
                  const active = showWith(card.key);
                  return (
                    <button
                      key={card.key}
                      type="button"
                      className={`smb-gap-card ${active ? "is-with" : "is-without"}`}
                      onClick={() => setFlipped((prev) => ({ ...prev, [card.key]: !prev[card.key] }))}
                    >
                      <span className="smb-gap-label">
                        <span className="smb-gap-icon" aria-hidden>
                          {card.key === "cx" ? "♡" : card.key === "missed" ? "◎" : card.key === "ops" ? "⚙" : "↗"}
                        </span>
                        {en ? card.labelEn : card.labelAr}
                      </span>
                      <strong>{active ? (en ? card.withTitleEn : card.withTitleAr) : en ? card.withoutTitleEn : card.withoutTitleAr}</strong>
                      <p>{active ? (en ? card.withBodyEn : card.withBodyAr) : en ? card.withoutBodyEn : card.withoutBodyAr}</p>
                      <span className="smb-gap-foot">
                        {active ? (en ? card.withFootEn : card.withFootAr) : en ? card.withoutFootEn : card.withoutFootAr}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="smb-gap-hint">
                {en
                  ? "Tap a card to flip it, or switch every card at once above."
                  : "اضغط البطاقة لقلبها، أو بدّل كل البطاقات دفعة واحدة أعلاه."}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Bottom modules */}
        <div id="smb-pricing">
          <Pricing />
        </div>
        <Cta />
        <Faq />
      </main>

      <Footer />

      <div className="smb-float-stack" aria-hidden={false}>
        <a href={routes.talk} target="_blank" rel="noreferrer" className="smb-float-icon is-wa" aria-label="WhatsApp">
          <IconWhatsApp className="h-5 w-5" />
        </a>
        <a href={routes.talk} target="_blank" rel="noreferrer" className="smb-float-icon is-chat" aria-label={en ? "Chat" : "دردشة"}>
          <IconChat className="h-5 w-5" />
        </a>
        <a href={routes.talk} target="_blank" rel="noreferrer" className="smb-float-icon is-phone" aria-label={en ? "Call" : "اتصال"}>
          <IconPhone className="h-5 w-5" />
        </a>
        <Link href={routes.trial} className="float-trial smb-float-trial">
          <span className="float-trial-dot" aria-hidden />
          {t.nav.trial}
        </Link>
      </div>
    </>
  );
}
