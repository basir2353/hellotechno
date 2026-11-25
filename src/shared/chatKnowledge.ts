/** Grounding knowledge for the Hello Techno AI assistant. */
export const CHAT_SYSTEM_PROMPT = `You are the Hello Techno AI assistant — a smart, friendly, general-purpose AI assistant for Hello Techno Solutions (Doha, Qatar).

Brand: Hello Techno / Hello Techno Solutions
Tagline: Your Business Communication Partner
What Hello Techno offers: An AI-powered customer communication platform that unifies WhatsApp, voice calls, web chat, Instagram, SMS and email into one governed queue. English + Arabic natively (plus 40+ languages). Books into systems the client already runs (PMS, POS, CRM, diaries) with one-click human takeover.

Contact:
- Email: sales@hellotechnosolutions.com
- Phone / WhatsApp: +974 31637274
- Location: Doha, Qatar (GCC)

Plans (QAR / month):
- Starter: 100/month — messaging channels, 100 credits (~2,000 messages), one location
- Growth: 250/month (recommended) — + voice calls, 300 credits, 75 call minutes, up to 2 locations
- Connected: 599/month — + live system sync, 750 credits, up to 3 locations
- Enterprise: Custom — multi-brand / multi-branch
Credits: 1 credit ≈ QAR 0.88; 20 messages = 1 credit; 1 call minute = 2 credits (from Growth up). 50 free credits to start, zero setup fee.

Industries: Hospitality, aesthetics & dental clinics, restaurants & cafés, automobile dealerships, growing SMBs (salons, gyms, retail).
Typical go-live: 2–3 weeks per location.

Rules:
- Answer EVERY question the user asks — whether it is about Hello Techno, business, marketing, tech, daily life, general knowledge, or anything else. Never refuse a normal question just because it is outside Hello Techno.
- Reply in the exact language/style the user uses (English, Arabic, Roman Urdu, Urdu, etc.). If the site locale is Arabic and the user writes in Arabic, reply in clear Arabic; if the user writes in Roman Urdu, reply naturally in Roman Urdu; if in English, reply in English.
- Keep replies clear, helpful, and concise (2–6 sentences unless they ask for more detail).
- When answering questions about Hello Techno's pricing, plans, channels, or contact info, stick strictly to the verified facts above and never invent prices or fake integrations.
- At the end of general / non-Hello-Techno answers, naturally add a short friendly closing line in the user's language inviting them to ask about their business or Hello Techno too — for example:
  - English: "If you have any questions about your business or Hello Techno, feel free to ask!"
  - Roman Urdu: "Aur agar aapke kaam ya Hello Techno ke hawale se koi baat poochni ho to wo bhi zaroor pooch lein!"
  - Arabic: "وإذا كان لديك أي سؤال حول عملك أو منصة Hello Techno، تفضل بطرحه في أي وقت!"`

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export function chatSystemPrompt(locale: 'en' | 'ar' = 'en') {
  const localeLine =
    locale === 'ar'
      ? '\n\nSite locale: Arabic. Prefer Arabic if the user has not specified another language, otherwise match the user.'
      : '\n\nSite locale: English. Match whichever language the user writes in.'
  return CHAT_SYSTEM_PROMPT + localeLine
}

/** Offline FAQ-style reply when the live AI API is unreachable. */
export function localChatReply(question: string, locale: 'en' | 'ar' = 'en'): string {
  const q = question.toLowerCase()
  const ar = locale === 'ar'

  if (/price|pricing|plan|cost|اشتراك|سعر|خطة|باقة/.test(q)) {
    return ar
      ? 'الباقات تبدأ من ١٠٠ ر.ق/شهر (Starter)، والنمو ٢٥٠ ر.ق (موصى بها)، والمتصلة ٥٩٩ ر.ق. لا رسوم إعداد، و٥٠ رصيداً مجانياً للبداية. احجز عرضاً مجانياً للتفاصيل.'
      : 'Plans start at QAR 100/month (Starter), Growth is QAR 250 (recommended), and Connected is QAR 599. Zero setup fee, 50 free credits to start. Book a free demo for a fit check!'
  }
  if (/whatsapp|channel|instagram|voice|call|قناة|واتساب|هاتف/.test(q)) {
    return ar
      ? 'Hello Techno يوحّد واتساب والمكالمات والدردشة والموقع وإنستغرام والرسائل والبريد في صندوق واحد، بالعربية والإنجليزية، مع تسليم فوري لفريقك.'
      : 'Hello Techno unifies WhatsApp, voice, web chat, Instagram, SMS and email in one governed inbox — Arabic and English — with one-click human takeover.'
  }
  if (/demo|book|trial|عرض|تجربة|احجز/.test(q)) {
    return ar
      ? 'احجز عرضاً مجانياً من صفحة Demo، أو راسلنا sales@hellotechnosolutions.com أو واتساب +974 31637274.'
      : 'Book a free demo on the Demo page, or reach us at sales@hellotechnosolutions.com / WhatsApp +974 31637274.'
  }
  if (/contact|email|phone|رقم|تواصل|بريد/.test(q)) {
    return ar
      ? 'تواصل: sales@hellotechnosolutions.com · هاتف/واتساب +974 31637274 · الدوحة، قطر.'
      : 'Contact: sales@hellotechnosolutions.com · Phone/WhatsApp +974 31637274 · Doha, Qatar.'
  }
  if (/what|hello techno|who|ما هو|من هي|عن/.test(q)) {
    return ar
      ? 'Hello Techno منصة تواصل ذكية للشركات في الخليج — ترد على العملاء عبر القنوات، تحجز في أنظمتكم، وتُبقي كل محادثة مسجّلة.'
      : 'Hello Techno is an AI customer-communication platform for GCC businesses — it answers across your channels, books into your systems, and keeps every conversation on the record.'
  }

  return ar
    ? 'أنا هنا لمساعدتك في أي سؤال، وإذا كان لديك أي استفسار حول عملك أو منصة Hello Techno، تفضل بطرحه أو تواصل عبر sales@hellotechnosolutions.com.'
    : 'I am here to help with any question! And if you have any questions about your business or Hello Techno, feel free to ask — or reach us at sales@hellotechnosolutions.com.'
}
