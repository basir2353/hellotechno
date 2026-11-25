import {
  Activity,
  Brain,
  Calendar,
  Car,
  Globe,
  Headphones,
  MessageCircle,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

import type { ChannelKey } from './components/Social'

export const SITE = {
  name: 'Hello Techno',
  brand: 'Hello Techno Solutions',
  email: 'sales@hellotechnosolutions.com',
  phone: '+974 31637274',
  phoneHref: 'tel:+97431637274',
  whatsapp: 'https://wa.me/97431637274',
  location: 'Doha, Qatar',
  serving: 'Built for hospitality, clinics, restaurants and growing businesses across the GCC',
  /** HeyServo public widget key (`pk_live_...`) for the live chat & voice launcher. */
  heyservoPublicKey: 'pk_live_JQiXd7-d-S5K2oAddt3We7D_5BTPIGDz',
} as const

export const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const

export const HERO = {
  eyebrow: SITE.serving,
  title: 'Be there. Be responsive. Be unforgettable.',
  lead: 'Unify every customer interaction across voice calls, WhatsApp, social media, and web chat into one intelligent AI-powered platform. Deliver instant, personalised responses, capture every opportunity, convert leads into loyal customers, and turn customer conversations into meaningful insights that drive business growth.',
  body: 'Hello Techno deploys a governed AI layer across WhatsApp, phone, web chat, social, SMS and email — answering in English and Arabic from your approved knowledge, booking into the systems you already run, and handing any conversation to your team in one click.',
  primary: 'Book a free demo',
  secondary: 'Talk to us',
  proof: [
    { value: '6', label: 'channels, one queue' },
    { value: 'EN + AR', label: 'native, your rules' },
    { value: '1s to 4s', label: '1s to 4s average first response, day or night' },
    { value: '24/7', label: 'always on' },
  ],
} as const

export type Channel = { name: string; kind: ChannelKey; note: string }

export const CHANNELS: Channel[] = [
  { name: 'WhatsApp', kind: 'whatsapp', note: 'In and out, on your number' },
  { name: 'Voice / Call', kind: 'voice', note: 'Answers before the third ring' },
  { name: 'Web chat', kind: 'web', note: 'On every page of your site' },
  { name: 'SMS', kind: 'sms', note: 'Reminders and follow-ups' },
  { name: 'Instagram', kind: 'instagram', note: 'DMs and comments captured' },
  { name: 'Gmail', kind: 'email', note: 'Requests routed, not buried' },
]

export const INTEGRATIONS = [
  'OPERA Cloud',
  'Mews',
  'SiteMinder',
  'HotSOS',
  'Symphony POS',
  'Foodics',
  'Shopify',
  'Keyloop',
  'CDK Global',
  'Autoline',
  'Google Calendar',
  'Zoho CRM',
  'Microsoft 365',
] as const

export const CAPABILITIES = [
  {
    icon: MessageCircle,
    accent: '#25D366',
    title: 'One inbox, six channels',
    body: 'WhatsApp, voice, web chat, Instagram, SMS and email land in a single threaded queue, so no lead falls between them.',
    note: 'Every conversation on the record',
  },
  {
    icon: Globe,
    accent: '#6F4BF2',
    title: 'English and Arabic, natively',
    body: 'Language is detected on chat and on the phone. Knowledge, prices and hours are set per location and per language.',
    note: '40+ languages supported',
  },
  {
    icon: Zap,
    accent: '#F59E0B',
    title: 'First response under five seconds',
    body: 'At 2pm and at 2am, the first reply goes out on the channel the customer chose — not a voicemail prompt.',
    note: 'Zero missed inquiries',
  },
  {
    icon: Calendar,
    accent: '#1A63D8',
    title: 'Real actions, not just replies',
    body: 'Checks live availability, holds the booking, takes the order, raises the request with a job number, sends the payment link.',
    note: 'Scoped connectors, no migration',
  },
  {
    icon: Headphones,
    accent: '#E1306C',
    title: 'One click to a human',
    body: 'Your team can step into any conversation with full context. Rules you write decide when that happens.',
    note: 'You keep final authority',
  },
  {
    icon: Shield,
    accent: '#0E9A9E',
    title: 'Governed and auditable',
    body: 'Approved knowledge, approval rules and an auditable record of every action, aligned to ISO 27001 and ISO 42001 practice.',
    note: 'Nothing improvised, nothing hidden',
  },
] as const

export type Industry = {
  key: string
  name: string
  icon: typeof Brain
  accent: string
  tint: string
  tagline: string
  pain: string
  win: string
  uses: { title: string; body: string; result: string }[]
}

export const INDUSTRIES: Industry[] = [
  {
    key: 'hospitality',
    name: 'Hospitality',
    icon: Calendar,
    accent: '#1A63D8',
    tint: '#E7F0FF',
    tagline: 'Resorts · Hotel groups · Hotel apartments',
    pain: 'Direct bookings leak to the OTAs, housekeeping requests clog the front desk, and review scores stall.',
    win: 'A full guest platform: intake, in-stay concierge, housekeeping dispatch and post-stay recovery, in both languages.',
    uses: [
      { title: 'Guest intake & booking', body: 'Direct bookings across phone, WhatsApp, web chat and your booking engine, quoting full local rates.', result: 'Replies in under 5 seconds' },
      { title: 'Housekeeping & guest requests', body: 'In-room requests routed to the right team instantly, with job numbers and a live status.', result: 'Dispatched in under a minute' },
      { title: 'Feedback & recovery', body: 'Catches a bad experience mid-stay, before it becomes the review, and loops in a manager.', result: 'Guest reached within 20 minutes' },
    ],
  },
  {
    key: 'clinics',
    name: 'Aesthetics & dental',
    icon: Activity,
    accent: '#6F4BF2',
    tint: '#EFEAFF',
    tagline: 'Clinics · Medspas · Dental groups',
    pain: 'Instagram price questions sit unread overnight, calls ring out mid-procedure, and no-shows empty the chair.',
    win: 'A patient experience platform: intake and booking, voice reception on your own numbers, no-show recovery and aftercare.',
    uses: [
      { title: 'New-patient intake', body: 'Turns a midnight price DM into a confirmed consult, before competitors open.', result: 'Replies in under 5 seconds' },
      { title: 'Voice reception, after hours', body: 'Answers your phones in the caller’s language, on your own numbers, and books into the clinic diary.', result: 'Answers before the third ring' },
      { title: 'No-show recovery & recall', body: 'Chases every missed appointment and works the recall list daily, escalating clinical signals to staff.', result: 'First message in 15 minutes' },
    ],
  },
  {
    key: 'restaurants',
    name: 'Restaurants & cafés',
    icon: Users,
    accent: '#E1306C',
    tint: '#FDECF3',
    tagline: 'Single outlets · Multi-branch groups',
    pain: 'The phone rings out through service, and the orders that land arrive through an app taking a quarter of the bill.',
    win: 'Covers, orders and service questions handled on your own number, at your prices, in both languages.',
    uses: [
      { title: 'Reservations & waitlist', body: 'Holds the right table, confirms it, and refills a cancelled one from the waitlist.', result: 'Replies in under 5 seconds' },
      { title: 'Order taking', body: 'Takes the full order into your POS, checks the sold-out list and adds the upsell.', result: 'Answers on the first ring' },
      { title: 'Delivery & pickup', body: 'Zone checks, live ETAs and the where-is-my-order chase, without a human on a tablet.', result: 'Status without a phone call' },
    ],
  },
  {
    key: 'automobile',
    name: 'Automobile',
    icon: Car,
    accent: '#DC2626',
    tint: '#FEECEC',
    tagline: 'Dealerships · Service centres · Rental fleets',
    pain: 'Showroom enquiries land after closing and get picked up by whoever is free, service reminders go out late, and an empty bay costs money every day.',
    win: 'A full dealership and workshop front desk: test drives booked on every channel, service scheduled from real history, trade-in and finance quotes answered in the chat.',
    uses: [
      {
        title: 'Test drives & showroom visits',
        body: 'Captures the model of interest, checks demo availability and books the slot into the sales diary, with directions and a reminder.',
        result: 'Booked in under 5 seconds',
      },
      {
        title: 'Service booking & reminders',
        body: 'Reads service history, quotes the job from your price list, holds a workshop bay and offers pickup or valet.',
        result: 'Bay filled without a phone call',
      },
      {
        title: 'Trade-in & finance quotes',
        body: 'Collects vehicle details, mileage and finance preferences, returns an indicative valuation and a pre-approval link.',
        result: 'Quote while they are still chatting',
      },
    ],
  },
  {
    key: 'smb',
    name: 'Growing businesses',
    icon: TrendingUp,
    accent: '#0E9A9E',
    tint: '#E1F7F6',
    tagline: 'Salons · Gyms · Retail · Services',
    pain: 'The owner is the front desk. DMs wait until closing, calls ring out mid-service, and a quote that waits an hour is gone.',
    win: 'A front desk that never closes: bookings, orders, quotes and payment links handled in the chat, from your own prices and policies.',
    uses: [
      { title: 'Appointments & bookings', body: 'Checks the diary, holds the slot, confirms it and sends the reminder that keeps the chair full.', result: 'Replies in under 5 seconds' },
      { title: 'Orders & payment links', body: 'Stock checked, delivery quoted and a secure payment link sent while the customer is still in the chat.', result: 'Closed in under 2 minutes' },
      { title: 'Memberships & follow-ups', body: 'Expiring members chased, freezes handled, no-shows recovered and reviews requested on your schedule.', result: 'Every renewal chased on time' },
    ],
  },
]

export const RESULTS = {
  title: 'Revenue up. Costs down. Full control.',
  body: 'Every inquiry you miss is a booking, a viewing or a renewal lost to whoever answered first. The platform captures that revenue around the clock, without adding a seat to your payroll — and keeps every action on an auditable record.',
  stats: [
    { value: '6', label: 'revenue channels answered as one queue' },
    { value: '24/7', label: 'coverage without a night shift on payroll' },
    { value: '5s', label: 'average first response, day or night' },
    { value: '01', label: 'click to put a person in any conversation' },
  ],
  proofLines: ['Appointment booked', 'Reminder sent', 'Payment link issued', 'Follow-up completed'],
} as const

export const PLANS = [
  {
    name: 'Starter',
    accent: '#1A63D8',
    originalPrice: '200',
    price: '100',
    per: '/month',
    currency: 'QAR',
    blurb: 'One location, every messaging channel answered.',
    estimate: '≈ 200+ bookings or orders a month',
    credits: '100 credits · 2,000 messages',
    features: [
      'WhatsApp, Instagram, web chat, email and SMS',
      'Knowledge from your website, menu, FAQ and price list',
      'One number, one team inbox, one record',
      'Voice calls from Growth up',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    accent: '#6F4BF2',
    originalPrice: '500',
    price: '250',
    per: '/month',
    currency: 'QAR',
    blurb: 'Follow-ups, promotions and phone enquiries for up to two locations.',
    estimate: '≈ 330+ bookings or orders a month',
    credits: '300 credits · 3,000 messages · 75 call minutes',
    features: [
      'Everything in Starter, three times the credits',
      'Inbound calls and callbacks on your own number',
      'Two locations, each with their own hours and prices',
      'Reminders, reviews and recall follow-ups',
    ],
    featured: true,
  },
  {
    name: 'Connected',
    accent: '#0E9A9E',
    originalPrice: '1200',
    price: '599',
    per: '/month',
    currency: 'QAR',
    blurb: 'Growth, plus a live connection to the systems you already run.',
    estimate: '≈ 840+ bookings or orders a month',
    credits: '750 credits · 7,500 messages · 187 call minutes',
    features: [
      'Everything in Growth, more call minutes in the pool',
      'Up to three locations, callers routed to their own branch',
      'Live sync into one system: PMS, POS, diary or CRM',
      'Escalation rules written with your team',
    ],
    featured: false,
  },
  {
    name: 'Enterprise',
    accent: '#F59E0B',
    price: 'Custom',
    per: '',
    currency: 'Groups and franchises',
    blurb: 'Multi-brand operators past three locations.',
    estimate: 'Pooled credits across every brand and branch',
    credits: 'Volume sized to your group',
    features: [
      'Everything in Connected, for every brand and branch',
      'Head-office reporting by brand, branch and channel',
      'In-country hosting and data-residency options',
      'Named onboarding and support',
    ],
    featured: false,
  },
] as const

export const CREDIT_NOTES = [
  { value: '1 credit', label: 'about QAR 0.88' },
  { value: '20 messages', label: 'one credit, in or out' },
  { value: '1 call minute', label: 'two credits, from Growth up' },
  { value: '~10 messages', label: 'per confirmed booking or order' },
]

export const FAQ = [
  {
    q: 'What does a business communication partner actually do?',
    a: 'Software that runs the whole customer conversation rather than answering on one channel. Every message across WhatsApp, phone, web chat, SMS, Instagram and email lands in one queue, answers come from your approved knowledge, real actions happen in your PMS or CRM, and a person can take over whenever your rules say so.',
  },
  {
    q: 'How is this different from a chatbot?',
    a: 'A chatbot replies and stops. Hello Techno runs the layer underneath: intake across six channels, knowledge scoped per location and per language, real bookings and orders through scoped credentials, escalation rules you write, and a console with one-click human takeover. Everything is on the record from day one.',
  },
  {
    q: 'Which channels and languages do you support?',
    a: 'Six channels — WhatsApp, voice calls on your own numbers, web chat, SMS, Instagram and email. English and Arabic are native, with automatic language detection on chat and voice. Knowledge and rules are set per location, so every branch answers with its own hours, prices and team.',
  },
  {
    q: 'What can it actually do in our systems?',
    a: 'It checks live availability, quotes full rates including local fees, holds and confirms bookings, books consults into your diary, takes orders into your POS, raises service requests with job numbers, schedules reminders, chases missed appointments and sends secure payment links. Nothing is migrated and nothing is replaced.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Two to three weeks per location. Week one indexes your knowledge and writes the rules with your team, week two runs in shadow mode where the AI drafts and your staff sends, then channels cut over one by one — WhatsApp and Instagram first, voice once your number is wired.',
  },
  {
    q: 'What does it cost?',
    a: 'Simple monthly plans starting at QAR 100, with one credit covering twenty messages and a call minute costing two. Start with 50 free credits at zero setup cost, size the plan on a demo, and move up only when the volume is there.',
  },
]

export const DEMO = {
  title: 'See it running on your operation.',
  body: 'Pick a time that suits you. A person from Hello Techno walks you through the platform live — on your properties, your channels and your languages — and answers the hard questions. No sales sequence, no obligation.',
  bullets: ['30 minutes, live product not slides', 'English or Arabic', 'Your own use case, your own numbers'],
}
