export const brand = {
  name: "Hello Techo Solutions",
  short: "Hello Techo",
  tagline: "Built to operate, not just reply",
  email: "hello@hellotecho.example",
  /** Opens WhatsApp chat (Talk to us). */
  whatsapp: "https://wa.me/17195124485",
  cities: {
    dubai: "Dubai, UAE",
    bahrain: "Manama, Bahrain",
  },
};

export const routes = {
  home: "/",
  pricing: "/pricing",
  useCases: "/#home-demo",
  useCasesPage: "/#home-demo",
  industries: "/industries",
  hospitality: "/industries/hospitality",
  aesthetics: "/industries/aesthetics-dental",
  dining: "/industries/restaurants-cafes-bakeries",
  smb: "/industries/smb",
  employee: "/ai-employee",
  faq: "/#faq",
  team: "/team",
  blog: "/blog",
  news: "/news",
  demo: "/#book-meeting",
  trial: "/trial",
  login: "/login",
  talk: brand.whatsapp,
  contact: brand.whatsapp,
  partnerships: "/partnerships",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** Site media hosted under /public/assets (original product photography and badges). */
export const images = {
  hero: "/assets/media/hero-poster.webp",
  dashboard: "/assets/media/dubai-skyline.webp",
  hospitality: "/assets/media/lobby-lounge-full.webp",
  clinics: "/assets/media/ad-reception-full.webp",
  dining: "/assets/media/restaurant-service.webp",
  bakery: "/assets/media/rcb-counter.webp",
  smb: "/assets/media/d2c-hero.webp",
  team: "/assets/media/checkin-moment.webp",
  founder: "/assets/media/founder-anjum.png",
  blog: "/assets/media/realestate-gallery.webp",
  news: "/assets/media/dubai-skyline.webp",
  useCases: "/assets/media/lobby-lounge.webp",
  pricing: "/assets/media/rcb-industry.webp",
  employee: "/assets/media/bk-noor.webp",
  iso9001: "/assets/logos/badge-iso9001.webp",
  iso27001: "/assets/logos/badge-iso27001.webp",
  iso42001: "/assets/logos/badge-iso42001.webp",
  partnerMicrosoft: "/assets/logos/partner-microsoft.svg",
  partnerAws: "/assets/logos/partner-aws.svg",
  partnerGcp: "/assets/logos/partner-gcloud.svg",
  partnerAnthropic: "/assets/logos/partner-anthropic.svg",
  partnerAtlassian: "/assets/logos/partner-atlassian.svg",
};

export const media = {
  heroVideo: "/videos/hero.mp4",
  heroPoster: "/assets/media/hero-poster.webp",
};

export const industryPages = [
  {
    slug: "hospitality",
    href: routes.hospitality,
    image: images.hospitality,
    en: {
      title: "Hospitality",
      focus: "Hotels · Resorts · Multi-property groups",
      summary:
        "Guest intake, in-stay requests, concierge booking, and recovery — one operations layer across every channel.",
    },
    ar: {
      title: "الضيافة",
      focus: "فنادق · منتجعات · مجموعات متعددة المواقع",
      summary:
        "استقبال الضيوف وطلبات الإقامة والكونسيرج والاستعادة — طبقة تشغيل واحدة عبر كل القنوات.",
    },
  },
  {
    slug: "aesthetics-dental",
    href: routes.aesthetics,
    image: images.clinics,
    en: {
      title: "Aesthetics & Dental",
      focus: "Clinics · Medspas · Dental groups",
      summary:
        "Midnight inquiries answered, consults booked into your diary, no-shows recovered, recalls worked daily.",
    },
    ar: {
      title: "التجميل وطب الأسنان",
      focus: "عيادات · منتجعات طبية · مجموعات أسنان",
      summary:
        "استفسارات منتصف الليل تُجاب، والاستشارات تُحجز في مفكرتك، والغياب يُستعاد يوميًا.",
    },
  },
  {
    slug: "restaurants-cafes-bakeries",
    href: routes.dining,
    image: images.dining,
    en: {
      title: "Restaurants, Cafes & Bakeries",
      focus: "Dining · Cafes · Multi-branch bakeries",
      summary:
        "Tables, orders, and custom quotes on your number — per-branch menus, prices, and stock.",
    },
    ar: {
      title: "المطاعم والمقاهي والمخابز",
      focus: "مطاعم · مقاهي · مخابز متعددة الفروع",
      summary:
        "طاولات وطلبات وعروض مخصصة على رقمك — قائمة وأسعار ومخزون لكل فرع.",
    },
  },
  {
    slug: "smb",
    href: routes.smb,
    image: images.smb,
    en: {
      title: "Small Medium Businesses",
      focus: "Salons · Spas · Gyms · Stores",
      summary:
        "A front desk that never closes: bookings, quotes, and payment links handled in chat.",
    },
    ar: {
      title: "المنشآت الصغيرة والمتوسطة",
      focus: "صالونات · سبا · أندية · متاجر",
      summary:
        "استقبال لا يُغلق: حجوزات وعروض وروابط دفع في الدردشة.",
    },
  },
] as const;
