export type Locale = 'en' | 'ar'

export type Copy = {
  nav: { label: string; href: string }[]
  serving: string
  hero: {
    title: string
    subhead: string
    lead: string
    body: string
    tagline: string
    closing: string
    primary: string
    orEmail: string
    answersOn: string
    partnerEyebrow: string
    proof: { value: string; label: string }[]
  }
  channels: { name: string; note: string }[]
  channelStrip: { eyebrow: string; title: string; body: string; connectsTo: string }
  diagram: {
    eyebrow: string
    titleBefore: string
    titleAccent: string
    body: string
    cta: string
    features: string[]
    live: string
    p1: { title: string; sub: string; messaging: string; messagingMeta: string; voice: string; voiceMeta: string; web: string; webMeta: string; bookings: string; booked: string; appointments: string; scheduled: string; reminders: string; sent: string; footer: string }
    p2: { title: string; sub: string; bookings: string; bookingsNote: string; sentiment: string; sentimentNote: string; chats: string; chatsNote: string; history: string; historyNote: string; escalations: string; escalationsNote: string; reply: string; systems: string }
    p3: { title: string; sub: string; storage: string; storageNote: string; analytics: string; analyticsNote: string; reports: string; reportsNote: string; owner: string; manager: string; ops: string; marketing: string; footer: string }
  }
  platform: { eyebrow: string; title: string; body: string; seePlatform: string }
  industries: { eyebrow: string; title: string; body: string; pain: string; win: string; seeOp: string; items: { key: string; name: string; tagline: string; pain: string; win: string; uses: { title: string; body: string; result: string }[] }[] }
  capabilities: { title: string; body: string; note: string }[]
  results: { eyebrow: string; title: string; body: string; tags: string[]; stats: { value: string; label: string }[]; proofLines: string[] }
  pricing: { eyebrow: string; offerBadge?: string; title: string; body: string; recommended: string; talkSales: string; startTrial: string; customPrice: string; creditNotes: { value: string; label: string }[]; plans: { name: string; blurb: string; estimate: string; credits: string; features: string[]; currency: string; per: string }[] }
  resources: {
    eyebrow: string
    title: string
    body: string
    featuredTag: string
    featuredTitle: string
    featuredBody: string
    featuredCta: string
    featuredHref: string
    read: string
    items: { tag: string; title: string; body: string; href: string }[]
  }
  resourcePages: {
    back: string
    related: string
    tipLabel: string
    ctaDemo: string
    ctaWa: string
    pages: Record<
      'go-live' | 'credits' | 'industries' | 'walkthrough',
      {
        tag: string
        title: string
        lead: string
        sections: { title: string; body: string; points?: string[] }[]
        tip: string
      }
    >
  }
  faq: { eyebrow: string; title: string; body: string; items: { q: string; a: string }[] }
  demo: { eyebrow: string; title: string; body: string; bullets: string[]; cta: string; hint: string; email: string; phone: string; whatsapp: string }
  aiEmployee: {
    badge: string
    headlineLead: string
    headlineAccent: string
    body: string
    callTitle: string
    callBody: string
    callPlaceholder: string
    callAgree: string
    callMarketing: string
    callCta: string
    callHint: string
    callOr: string
    callBrowser: string
    waBadge: string
    waTitle: string
    waBody: string
    waScan: string
    waUserMsg: string
    waVoice: string
    waBotMsg: string
    waOn: string
    waCta: string
    handlesBadge: string
    handlesTitle: string
    handlesBody: string
    features: { title: string; body: string; image: string }[]
    stats: { label: string; value: string }[]
    statsNote: string
    multiBadge: string
    multiTitle: string
    multiBody: string
    multiPoints: string[]
    multiDemo: string
    multiWa: string
    multiImage: string
    peopleBadge: string
    peopleTitleLead: string
    peopleTitleAccent: string
    peopleBody: string
    peoplePoints: string[]
    peopleName: string
    peopleRole: string
    peoplePlace: string
    peopleQuote: string
    peopleDemo: string
    peopleWa: string
    peopleFoot: string
    langBadge: string
    langTitle: string
    langBody: string
    dialects: { ar: string; en: string }[]
    langMore: string
    langDemo: string
    langWa: string
    langHint: string
    langImage: string
    bookDemo: string
  }
  footer: { blurb: string; tags: string[]; sections: string; talkSales: string; answersWhere: string; backTop: string; rights: string }
  navUi: { bookDemo: string; logOut: string; signedIn: string; openMenu: string; closeMenu: string; chatWhatsApp: string }
  auth: {
    signupTab: string
    loginTab: string
    signupTitle: string
    signupBody: string
    signupSubmit: string
    loginTitle: string
    loginBody: string
    loginSubmit: string
    name: string
    email: string
    password: string
    namePh: string
    emailPh: string
    passwordPhLogin: string
    passwordPhSignup: string
    haveAccount: string
    newHere: string
    logInLink: string
    createLink: string
  }
  chat: {
    welcome: string
    suggestions: string[]
    title: string
    subtitle: string
    thinking: string
    placeholder: string
    send: string
    close: string
    fallback: string
    openChat: string
    closeChat: string
    live: string
  }
}

const en: Copy = {
  nav: [
    { label: 'Platform', href: '/#platform' },
    { label: 'AI Employee', href: '/ai-employee' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Industries', href: '/#industries' },
    { label: 'Results', href: '/#results' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Resources', href: '/#resources' },
    { label: 'FAQ', href: '/#faq' },
  ],
  serving: 'Built for hospitality, clinics, restaurants and growing businesses across the GCC',
  hero: {
    title: 'Be there. Be responsive. Be unforgettable.',
    subhead: 'One intelligent platform for every customer conversation.',
    lead: 'Connect WhatsApp, phone calls, social media, SMS and web chat in one AI-powered platform.',
    body: 'Respond instantly, capture more opportunities, automate bookings and deliver exceptional customer experiences — 24/7.',
    tagline: 'Your business. Your rules. Your AI.',
    closing:
      'Hello Techno connects your communication channels, business knowledge and existing systems into one intelligent solution.',
    primary: 'Book a free demo',
    orEmail: 'Or email',
    answersOn: 'Answers on',
    partnerEyebrow: 'Your Business Communication Partner',
    proof: [
      { value: '6', label: 'channels, one queue' },
      { value: 'EN + AR', label: 'native, your rules' },
      { value: '1s to 4s', label: 'average first response, day or night' },
      { value: '24/7', label: 'always on' },
    ],
  },
  channels: [
    { name: 'WhatsApp', note: 'In and out, on your number' },
    { name: 'Voice / Call', note: 'Answers before the third ring' },
    { name: 'Web chat', note: 'On every page of your site' },
    { name: 'SMS', note: 'Reminders and follow-ups' },
    { name: 'Instagram', note: 'DMs and comments captured' },
    { name: 'Gmail', note: 'Requests routed, not buried' },
  ],
  channelStrip: {
    eyebrow: 'Every channel. One queue.',
    title: 'Meet customers where they already are.',
    body: 'Six channels into one governed inbox — answered from your knowledge, booked into your systems.',
    connectsTo: 'Connects to',
  },
  diagram: {
    eyebrow: 'The platform in three moves',
    titleBefore: 'AI-Powered',
    titleAccent: 'Customer Communication',
    body: 'Be there. Be responsive. Be unforgettable.',
    cta: 'See this running on your own channels',
    features: ['More conversations', 'Faster responses', 'Smarter decisions', 'Happier customers'],
    live: 'Live',
    p1: {
      title: 'Unified Communication',
      sub: 'All your channels. One AI. Seamless conversations.',
      messaging: 'Messaging',
      messagingMeta: 'WhatsApp · IG · Gmail',
      voice: 'Voice / Call',
      voiceMeta: 'Your own numbers',
      web: 'Web chat & SMS',
      webMeta: 'Every page, every hour',
      bookings: 'Bookings',
      booked: 'Confirmed',
      appointments: 'Appointments',
      scheduled: 'Scheduled',
      reminders: 'Reminders',
      sent: 'Sent',
      footer: 'AI Employee • Understands • Replies • Takes action',
    },
    p2: {
      title: 'Fast, Connected Intelligence',
      sub: 'Real-time context. Smarter decisions. In seconds.',
      bookings: 'Bookings',
      bookingsNote: 'Held & confirmed',
      sentiment: 'Sentiment',
      sentimentNote: 'Happy · at risk',
      chats: 'Customer chats',
      chatsNote: 'One thread / guest',
      history: 'History',
      historyNote: 'Past visits',
      escalations: 'Escalations',
      escalationsNote: 'To your team',
      reply: 'sec avg reply',
      systems: 'Connected systems',
    },
    p3: {
      title: 'Saved, Analyzed, Delivered',
      sub: 'Turn conversations into insights and action.',
      storage: 'Secure storage',
      storageNote: 'All interactions',
      analytics: 'AI analytics',
      analyticsNote: 'Finds patterns',
      reports: 'Reports',
      reportsNote: 'Sent to team',
      owner: 'Owner · Performance',
      manager: 'Manager · Service',
      ops: 'Ops · Daily',
      marketing: 'Marketing · Growth',
      footer: 'Better insights. Happier guests.',
    },
  },
  platform: {
    eyebrow: 'What we build',
    title: 'The AI layer under every customer conversation.',
    body: 'An agent answers and stops. Hello Techno runs the layer underneath: intake across six channels, knowledge scoped per location and per language, real actions in your PMS or CRM through scoped credentials, escalation rules your team writes, and one-click takeover. Everything on the record, from day one.',
    seePlatform: 'See the platform',
  },
  industries: {
    eyebrow: 'Industries',
    title: 'Built around the way your business operates.',
    body: 'The platform stays consistent. Knowledge, workflows, procedures, integrations and language are tailored to each business — so every industry gets a solution aligned with how it actually runs.',
    pain: 'The pain',
    win: 'The win',
    seeOp: 'See it on your operation',
    items: [
      {
        key: 'hospitality',
        name: 'Hospitality',
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
        tagline: 'Dealerships · Service centres · Rental fleets',
        pain: 'Showroom enquiries land after closing and get picked up by whoever is free, service reminders go out late, and an empty bay costs money every day.',
        win: 'A full dealership and workshop front desk: test drives booked on every channel, service scheduled from real history, trade-in and finance quotes answered in the chat.',
        uses: [
          { title: 'Test drives & showroom visits', body: 'Captures the model of interest, checks demo availability and books the slot into the sales diary, with directions and a reminder.', result: 'Booked in under 5 seconds' },
          { title: 'Service booking & reminders', body: 'Reads service history, quotes the job from your price list, holds a workshop bay and offers pickup or valet.', result: 'Bay filled without a phone call' },
          { title: 'Trade-in & finance quotes', body: 'Collects vehicle details, mileage and finance preferences, returns an indicative valuation and a pre-approval link.', result: 'Quote while they are still chatting' },
        ],
      },
      {
        key: 'smb',
        name: 'Growing businesses',
        tagline: 'Salons · Gyms · Retail · Services',
        pain: 'The owner is the front desk. DMs wait until closing, calls ring out mid-service, and a quote that waits an hour is gone.',
        win: 'A front desk that never closes: bookings, orders, quotes and payment links handled in the chat, from your own prices and policies.',
        uses: [
          { title: 'Appointments & bookings', body: 'Checks the diary, holds the slot, confirms it and sends the reminder that keeps the chair full.', result: 'Replies in under 5 seconds' },
          { title: 'Orders & payment links', body: 'Stock checked, delivery quoted and a secure payment link sent while the customer is still in the chat.', result: 'Closed in under 2 minutes' },
          { title: 'Memberships & follow-ups', body: 'Expiring members chased, freezes handled, no-shows recovered and reviews requested on your schedule.', result: 'Every renewal chased on time' },
        ],
      },
    ],
  },
  capabilities: [
    { title: 'One inbox, six channels', body: 'WhatsApp, voice, web chat, Instagram, SMS and email land in a single threaded queue, so no lead falls between them.', note: 'Every conversation on the record' },
    { title: 'English and Arabic, natively', body: 'Language is detected on chat and on the phone. Knowledge, prices and hours are set per location and per language.', note: '40+ languages supported' },
    { title: 'First response under five seconds', body: 'At 2pm and at 2am, the first reply goes out on the channel the customer chose — not a voicemail prompt.', note: 'Zero missed inquiries' },
    { title: 'Real actions, not just replies', body: 'Checks live availability, holds the booking, takes the order, raises the request with a job number, sends the payment link.', note: 'Scoped connectors, no migration' },
    { title: 'One click to a human', body: 'Your team can step into any conversation with full context. Rules you write decide when that happens.', note: 'You keep final authority' },
    { title: 'Governed and auditable', body: 'Approved knowledge, approval rules and an auditable record of every action, aligned to ISO 27001 and ISO 42001 practice.', note: 'Nothing improvised, nothing hidden' },
  ],
  results: {
    eyebrow: 'Results',
    title: 'Revenue up. Costs down. Full control.',
    body: 'Every inquiry you miss is a booking, a viewing or a renewal lost to whoever answered first. The platform captures that revenue around the clock, without adding a seat to your payroll — and keeps every action on an auditable record.',
    tags: ['Scoped credentials', 'Auditable actions', 'Human in the loop'],
    stats: [
      { value: '6', label: 'revenue channels answered as one queue' },
      { value: '24/7', label: 'coverage without a night shift on payroll' },
      { value: '5s', label: 'average first response, day or night' },
      { value: '01', label: 'click to put a person in any conversation' },
    ],
    proofLines: ['Appointment booked', 'Reminder sent', 'Payment link issued', 'Follow-up completed'],
  },
  pricing: {
    eyebrow: 'Pricing',
    offerBadge: 'Limited-Time Offer · Up to 50% off monthly plans',
    title: 'Simple plans. Clear credits.',
    body: 'Hotels, clinics, restaurants, dealerships and growing businesses all run on the same plans and the same credit rate: one credit covers twenty messages, and a call minute costs two. Start with 50 free credits at zero setup cost.',
    recommended: 'Recommended',
    talkSales: 'Talk to sales',
    startTrial: 'Start a free trial',
    customPrice: 'Custom',
    creditNotes: [
      { value: '1 credit', label: 'about QAR 0.88' },
      { value: '20 messages', label: 'one credit, in or out' },
      { value: '1 call minute', label: 'two credits, from Growth up' },
      { value: '~10 messages', label: 'per confirmed booking or order' },
    ],
    plans: [
      {
        name: 'Starter',
        blurb: 'One location, every messaging channel answered.',
        estimate: '≈ 200+ bookings or orders a month',
        credits: '100 credits · 2,000 messages',
        currency: 'QAR',
        per: '/month',
        features: [
          'WhatsApp, Instagram, web chat, email and SMS',
          'Knowledge from your website, menu, FAQ and price list',
          'One number, one team inbox, one record',
          'Voice calls from Growth up',
        ],
      },
      {
        name: 'Growth',
        blurb: 'Follow-ups, promotions and phone enquiries for up to two locations.',
        estimate: '≈ 330+ bookings or orders a month',
        credits: '300 credits · 3,000 messages · 75 call minutes',
        currency: 'QAR',
        per: '/month',
        features: [
          'Everything in Starter, three times the credits',
          'Inbound calls and callbacks on your own number',
          'Two locations, each with their own hours and prices',
          'Reminders, reviews and recall follow-ups',
        ],
      },
      {
        name: 'Connected',
        blurb: 'Growth, plus a live connection to the systems you already run.',
        estimate: '≈ 840+ bookings or orders a month',
        credits: '750 credits · 7,500 messages · 187 call minutes',
        currency: 'QAR',
        per: '/month',
        features: [
          'Everything in Growth, more call minutes in the pool',
          'Up to three locations, callers routed to their own branch',
          'Live sync into one system: PMS, POS, diary or CRM',
          'Escalation rules written with your team',
        ],
      },
      {
        name: 'Enterprise',
        blurb: 'Multi-brand operators past three locations.',
        estimate: 'Pooled credits across every brand and branch',
        credits: 'Volume sized to your group',
        currency: 'Groups and franchises',
        per: '',
        features: [
          'Everything in Connected, for every brand and branch',
          'Head-office reporting by brand, branch and channel',
          'In-country hosting and data-residency options',
          'Named onboarding and support',
        ],
      },
    ],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Read before the demo.',
    body: 'Four short briefs — how the AI Employee works, how you go live, how credits bill, and where to start.',
    featuredTag: 'Playbook',
    featuredTitle: 'Meet the AI Order-Taking Employee',
    featuredBody:
      'WhatsApp, Instagram, phone and web — Arabic and English — without adding a night seat.',
    featuredCta: 'Open playbook',
    featuredHref: '/ai-employee',
    read: 'Open',
    items: [
      {
        tag: 'Checklist',
        title: 'Go-live in two to three weeks',
        body: 'Knowledge → rules → shadow mode → channel cutover.',
        href: '/resources/go-live',
      },
      {
        tag: 'Guide',
        title: 'Credits, messages and call minutes',
        body: 'One credit ≈ twenty messages; a call minute costs two.',
        href: '/resources/credits',
      },
      {
        tag: 'Brief',
        title: 'Industries we wire first',
        body: 'Hospitality, clinics, restaurants, dealerships across the GCC.',
        href: '/resources/industries',
      },
      {
        tag: 'Demo',
        title: 'Book a live walkthrough',
        body: 'Thirty minutes on your channels. Product, not slides.',
        href: '/resources/walkthrough',
      },
    ],
  },
  resourcePages: {
    back: 'All resources',
    related: 'More briefs',
    tipLabel: 'Tip',
    ctaDemo: 'Book a free demo',
    ctaWa: 'Chat on WhatsApp',
    pages: {
      'go-live': {
        tag: 'Checklist',
        title: 'Go-live in two to three weeks',
        lead: 'A calm cutover order that keeps staff confident — knowledge first, then rules, shadow mode, and channel by channel.',
        sections: [
          {
            title: 'Week 1 — Knowledge & rules',
            body: 'We index your menus, prices, hours, FAQs and escalation paths, then write the rules with your team.',
            points: [
              'Approved knowledge per location and language',
              'Hours, handoff rules and tone locked with operators',
              'Test conversations on WhatsApp and web chat',
            ],
          },
          {
            title: 'Week 2 — Shadow mode',
            body: 'The AI drafts; your staff sends. You see quality before customers feel the change.',
            points: [
              'Side-by-side review in one queue',
              'Edits feed back into knowledge the same day',
              'No live customer risk while you calibrate',
            ],
          },
          {
            title: 'Week 2–3 — Channel cutover',
            body: 'WhatsApp and Instagram first, then web chat, then voice once your numbers are wired.',
            points: [
              'One channel at a time, with a rollback path',
              'Night coverage without a new night seat',
              'Live dashboard for managers from day one',
            ],
          },
        ],
        tip: 'Most locations finish in 14–21 days when knowledge and a decision-maker are available in week one.',
      },
      credits: {
        tag: 'Guide',
        title: 'Credits, messages and call minutes',
        lead: 'Simple maths so you can size the plan before you sign — messages, calls and what a credit really buys.',
        sections: [
          {
            title: 'How credits work',
            body: 'Credits are the shared unit across chat and voice. Unused monthly credits do not roll forever — size for your peak week, not your quietest day.',
            points: [
              '1 credit ≈ 20 chat messages',
              '1 call minute = 2 credits (from Growth up)',
              '≈ QAR 0.88 per credit on published plans',
            ],
          },
          {
            title: 'Plan snapshots',
            body: 'Starter covers messaging; Growth adds voice minutes; Connected adds live system sync and more headroom.',
            points: [
              'Starter — 100 credits / month',
              'Growth — 300 credits + 75 call minutes',
              'Connected — 750 credits across up to 3 locations',
            ],
          },
          {
            title: 'Sizing tip',
            body: 'Count inbound WhatsApp + IG + web threads in a busy week, then add expected call minutes. We help you map that in the demo.',
            points: [
              '50 free credits to start, zero setup fee',
              'Overage is clear before you hit it',
              'Enterprise can custom-pool across brands',
            ],
          },
        ],
        tip: 'If you are unsure, book Growth for the first month — easier to step down than to run out mid-launch.',
      },
      industries: {
        tag: 'Brief',
        title: 'Industries we wire first',
        lead: 'Same platform. Different knowledge, procedures, connectors and language for how each operation actually runs.',
        sections: [
          {
            title: 'Hospitality',
            body: 'Resorts, hotel groups and hotel apartments — direct bookings, in-stay requests and post-stay recovery in Arabic and English.',
            points: ['Guest intake & booking', 'Housekeeping dispatch', 'Review recovery before it posts'],
          },
          {
            title: 'Aesthetics & dental',
            body: 'Clinics and medspas that lose overnight DMs and mid-procedure calls — intake, voice reception and no-show recall.',
            points: ['New-patient intake from IG', 'After-hours voice on your numbers', 'No-show recovery loops'],
          },
          {
            title: 'Restaurants, auto & growing SMBs',
            body: 'Cafés, dealerships, salons and retail — orders, test drives, quotes and bookings without adding night staff.',
            points: ['Orders & payment links', 'Test-drive and service booking', 'Quotes while they are still chatting'],
          },
        ],
        tip: 'Every industry build ships with local rules per branch — hours, prices and team — not a one-size script.',
      },
      walkthrough: {
        tag: 'Demo',
        title: 'Book a live walkthrough',
        lead: 'Thirty focused minutes on your channels and languages — product running live, not a slide deck.',
        sections: [
          {
            title: 'What we cover',
            body: 'We wire a sample of your channels in the session so you hear Arabic and English replies, see the inbox, and watch a booking or order land.',
            points: [
              'WhatsApp + one more channel of your choice',
              'Knowledge scoped to your location',
              'Human takeover and escalation rules',
            ],
          },
          {
            title: 'Who should join',
            body: 'An operator who knows hours and prices, plus whoever owns the inbox or front desk — decisions happen faster in the room.',
            points: ['Ops or GM', 'Front-desk / guest experience lead', 'Optional: IT for number and CRM access'],
          },
          {
            title: 'After the call',
            body: 'You leave with a go-live sketch, credit sizing and a clear next step — trial, pilot location, or enterprise scoping.',
            points: ['Written summary same day', 'Optional shadow-mode pilot', 'No hard sell — product first'],
          },
        ],
        tip: 'Prefer WhatsApp? Message +974 31637274 and we will schedule around your peak hours.',
      },
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers.',
    body: 'The questions we hear most from operators before they go live.',
    items: [
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
    ],
  },
  demo: {
    eyebrow: 'Book a demo',
    title: 'See it running on your operation.',
    body: 'Pick a time that suits you. A person from Hello Techno walks you through the platform live — on your properties, your channels and your languages — and answers the hard questions. No sales sequence, no obligation.',
    bullets: ['30 minutes, live product not slides', 'English or Arabic', 'Your own use case, your own numbers'],
    cta: 'Book a free demo',
    hint: 'Sign up or log in — then we set up your demo.',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
  },
  footer: {
    blurb:
      'Your Business Communication Partner. Unified, answered, connected and delivered — deployed for hospitality, clinics, restaurants, automobile dealerships and growing businesses across the GCC.',
    tags: ['English + Arabic', '6 channels', '24/7'],
    sections: 'Sections',
    talkSales: 'Talk to sales',
    answersWhere: 'We answer where they are',
    backTop: 'Back to top',
    rights: 'All rights reserved.',
  },
  navUi: {
    bookDemo: 'Book a free demo',
    logOut: 'Log out',
    signedIn: 'Signed in as',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    chatWhatsApp: 'Chat on WhatsApp',
  },
  auth: {
    signupTab: 'Sign up',
    loginTab: 'Log in',
    signupTitle: 'Create your account',
    signupBody: 'Sign up to book a free demo — takes under a minute.',
    signupSubmit: 'Sign up & continue',
    loginTitle: 'Welcome back',
    loginBody: 'Log in to book your free demo and manage your Hello Techno workspace.',
    loginSubmit: 'Log in & continue',
    name: 'Full name',
    email: 'Work email',
    password: 'Password',
    namePh: 'Layla Haddad',
    emailPh: 'you@company.com',
    passwordPhLogin: '••••••••',
    passwordPhSignup: 'At least 6 characters',
    haveAccount: 'Already have an account?',
    newHere: 'New here?',
    logInLink: 'Log in',
    createLink: 'Create an account',
  },
  chat: {
    welcome:
      'Hi — I\'m the Hello Techno AI assistant. Ask me about plans, channels, go-live time, or book a free demo. English or Arabic, both fine.',
    suggestions: ['What plans do you offer?', 'Which channels do you cover?', 'How do I book a demo?'],
    title: 'Hello Techno AI',
    subtitle: 'Answers from your site knowledge',
    thinking: 'Thinking…',
    placeholder: 'Ask about plans, channels, demo…',
    send: 'Send message',
    close: 'Close chat',
    fallback: 'I could not reach the AI just now. Email {email} or WhatsApp {phone} and a person will help.',
    openChat: 'Open AI chat',
    closeChat: 'Close AI chat',
    live: 'Live',
  },
  aiEmployee: {
    badge: 'AI Order-Taking Employee for Bakeries & Cafes',
    headlineLead: 'Never miss an order again.',
    headlineAccent: 'Your AI order-taking employee works the counter 24/7 and captures every order.',
    body: 'Your team is at the oven, the espresso machine and the till. Hello Techno answers every enquiry and captures every order on WhatsApp, Instagram, your phone line and web chat, in Arabic and English, so nothing is missed while your hands are full.',
    callTitle: 'Talk to the agent – live',
    callBody: 'Enter your number and we call you in seconds. Talk to it like a customer would, in Arabic or English.',
    callPlaceholder: '3123 4567',
    callAgree: 'I agree to receive a one-time demo call from Hello Techno and accept the Privacy Policy.',
    callMarketing: 'Optional: keep me posted about Hello Techno by phone, SMS, WhatsApp or email. You can opt out anytime.',
    callCta: 'Call me now',
    callHint: 'Rings in ~10s · one call only · EN / العربية',
    callOr: 'or',
    callBrowser: 'Talk in your browser',
    waBadge: 'WhatsApp',
    waTitle: 'Chat with us on WhatsApp',
    waBody: 'Scan the code or tap the button on your phone. Ask anything about the AI Employee, or book your in-person demo in one message.',
    waScan: 'Scan with your phone',
    waUserMsg: 'Hi, can I book an in-person demo for my bakery this week?',
    waVoice: 'Voice note',
    waBotMsg: 'Of course. Which day suits you, and which branch should we visit?',
    waOn: 'Hello Techno on WhatsApp',
    waCta: 'Chat on WhatsApp',
    handlesBadge: 'What the AI Employee handles',
    handlesTitle: 'AI Order Taker for Bakeries & Cafes',
    handlesBody:
      'Not a chatbot that collects a message for later. It takes the order, quotes the cake, confirms the delivery and asks for the review, on every channel your customers already use, from your own menu and rules.',
    features: [
      {
        title: 'Order Taking on Every Channel',
        body: 'Takes the full order from your menu, confirms it, sends the payment link and pushes it to your POS.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Every Customer, Remembered',
        body: 'Recalls each regular’s usual order, allergy notes, birthday month and language, so every chat feels personal.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Menu, Cakes & Pre-orders',
        body: 'Live menu and prices, plus cakes with the date held and the deposit taken before the bake starts.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Catering & Corporate Boxes',
        body: 'Big orders arrive half-detailed. It confirms quantity, date, branding and invoicing, then briefs your team.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Delivery & Pickup, Handled',
        body: 'Zones, fees and timings from your rules, pickup slots that respect the bake, and order status answered for you.',
        image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Reviews & Repeat Orders',
        body: 'After pickup it asks how it was, sends the review link to happy customers and flags the rest to you.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      },
    ],
    stats: [
      { label: 'Conversations resolved by AI', value: '94%' },
      { label: 'First reply in under', value: '5 seconds' },
      { label: 'Commission avoided per direct order', value: '25–35%' },
    ],
    statsNote:
      'The first two are platform benchmarks across live deployments, and your baseline is measured in week one. The commission range is what GCC operators report paying aggregators per order.',
    multiBadge: 'Multi-brand, multi-franchise, multi-location',
    multiTitle: 'One AI Order-Taking Employee for Every Branch and Franchise.',
    multiBody:
      'Every branch and every franchisee gets its own order-taking employee: trained on the brand’s rules, working with its own menu, prices, hours and stock. Three branches or forty stores, and no extra person per counter.',
    multiPoints: [
      'One number per brand, and the right branch answers',
      'Each branch sells its own bake, stock and prices, with local tax',
      'One approved brand voice across every franchisee',
      'A new branch goes live from the brand template, not from scratch',
      'Head office sees orders, misses and reviews for every location in one view',
    ],
    multiDemo: 'Book In-Person Demo for Your Brand',
    multiWa: 'Chat on WhatsApp',
    multiImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    peopleBadge: 'The people behind it',
    peopleTitleLead: 'The AI takes orders.',
    peopleTitleAccent: 'We are the people behind it.',
    peopleBody:
      'Most tools leave you alone with a dashboard. We are a team in Doha, one call away. We come to your bakery or cafe, switch the AI Employee on with you, and pick up the phone whenever you need us.',
    peoplePoints: [
      'Set up at your shop, in person, by the people who built it',
      'You call a person, not a ticket queue',
      'Menu changed? We adjust it with you, the same day',
      'Arabic and English, on the phone and in your shop',
    ],
    peopleName: 'Hello Techno Sales',
    peopleRole: 'Your contact at Hello Techno',
    peoplePlace: 'Doha, Qatar',
    peopleQuote:
      'Talk to us before you decide anything. In five minutes we will tell you whether an AI Employee fits your bakery. If it does, we come to you, set it up ourselves, and stay on the phone after.',
    peopleDemo: 'Book In-Person Demo',
    peopleWa: 'Chat on WhatsApp',
    peopleFoot: 'A person answers. If we are at another shop, we call you back the same day.',
    langBadge: 'Arabic and voice',
    langTitle: 'Arabic dialects and 40+ languages, on your own number',
    langBody:
      'The AI Employee reads the dialect from the first message and stays in it, in chat and on the phone. It even reads the name back before it goes on the cake.',
    dialects: [
      { ar: 'خليجي', en: 'Gulf' },
      { ar: 'شامي', en: 'Levantine' },
      { ar: 'مصري', en: 'Egyptian' },
      { ar: 'فصحى', en: 'Modern Standard' },
    ],
    langMore: '+ English, Hindi, Urdu, Tagalog and 40 more',
    langDemo: 'Book In-Person Demo',
    langWa: 'Chat on WhatsApp',
    langHint: 'Hear the Arabic voice live at the demo',
    langImage: 'https://images.pexels.com/photos/2761206/pexels-photo-2761206.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bookDemo: 'Book a Demo',
  },
}

const ar: Copy = {
  nav: [
    { label: 'المنصة', href: '/#platform' },
    { label: 'الموظف الذكي', href: '/ai-employee' },
    { label: 'كيف يعمل', href: '/#how-it-works' },
    { label: 'القطاعات', href: '/#industries' },
    { label: 'النتائج', href: '/#results' },
    { label: 'الأسعار', href: '/#pricing' },
    { label: 'الموارد', href: '/#resources' },
    { label: 'الأسئلة', href: '/#faq' },
  ],
  serving: 'مبني للضيافة والعيادات والمطاعم والشركات النامية في دول الخليج',
  hero: {
    title: 'كن حاضراً. كن سريعاً. كن لا يُنسى.',
    subhead: 'منصة ذكية واحدة لكل محادثة مع العملاء.',
    lead: 'اربط واتساب والمكالمات ووسائل التواصل والرسائل ودردشة الموقع في منصة واحدة بالذكاء الاصطناعي.',
    body: 'رد فوراً، التقط فرصاً أكثر، وأتمِت الحجوزات وقدّم تجربة استثنائية على مدار الساعة.',
    tagline: 'عملك. قواعدك. ذكاؤك الاصطناعي.',
    closing: 'Hello Techno تربط قنوات تواصلك ومعرفة عملك وأنظمتك الحالية في حل ذكي واحد.',
    primary: 'احجز عرضاً مجانياً',
    orEmail: 'أو راسلنا',
    answersOn: 'نجيب عبر',
    partnerEyebrow: 'شريك تواصل أعمالك',
    proof: [
      { value: '6', label: 'قنوات، طابور واحد' },
      { value: 'ع + إن', label: 'أصليتان، بقواعدك' },
      { value: '1–4 ث', label: 'متوسط أول رد، نهاراً أو ليلاً' },
      { value: '24/7', label: 'دائماً متاح' },
    ],
  },
  channels: [
    { name: 'واتساب', note: 'استقبال وإرسال على رقمك' },
    { name: 'المكالمات', note: 'يرد قبل الرنة الثالثة' },
    { name: 'دردشة الموقع', note: 'على كل صفحة من موقعك' },
    { name: 'الرسائل النصية', note: 'تذكيرات ومتابعات' },
    { name: 'إنستغرام', note: 'الرسائل والتعليقات تُلتقط' },
    { name: 'جيميل', note: 'الطلبات تُوجَّه ولا تُدفن' },
  ],
  channelStrip: {
    eyebrow: 'كل قناة. صندوق واحد.',
    title: 'التقِ بعملائك حيث هم.',
    body: 'ست قنوات في صندوق وارد محكوم واحد — يُجاب من معرفتك ويُحجز في أنظمتك.',
    connectsTo: 'يتصل بـ',
  },
  diagram: {
    eyebrow: 'المنصة في ثلاث خطوات',
    titleBefore: 'تواصل العملاء',
    titleAccent: 'بالذكاء الاصطناعي',
    body: 'كن حاضراً. كن سريعاً. كن لا يُنسى.',
    cta: 'شاهدها تعمل على قنواتك',
    features: ['محادثات أكثر', 'ردود أسرع', 'قرارات أذكى', 'عملاء أسعد'],
    live: 'مباشر',
    p1: {
      title: 'تواصل موحّد',
      sub: 'كل قنواتك. ذكاء واحد. محادثات سلسة.',
      messaging: 'الرسائل',
      messagingMeta: 'واتساب · إنستغرام · جيميل',
      voice: 'المكالمات',
      voiceMeta: 'أرقامك الخاصة',
      web: 'دردشة ورسائل',
      webMeta: 'كل صفحة، كل ساعة',
      bookings: 'الحجوزات',
      booked: 'مؤكدة',
      appointments: 'المواعيد',
      scheduled: 'مجدولة',
      reminders: 'التذكيرات',
      sent: 'أُرسلت',
      footer: 'موظف ذكي • يفهم • يرد • يتصرف',
    },
    p2: {
      title: 'ذكاء سريع ومتصل',
      sub: 'سياق فوري. قرارات أذكى. خلال ثوانٍ.',
      bookings: 'الحجوزات',
      bookingsNote: 'محجوزة ومؤكدة',
      sentiment: 'المشاعر',
      sentimentNote: 'سعيد · معرض للخطر',
      chats: 'محادثات العملاء',
      chatsNote: 'خيط واحد لكل ضيف',
      history: 'السجل',
      historyNote: 'زيارات سابقة',
      escalations: 'التصعيد',
      escalationsNote: 'إلى فريقك',
      reply: 'ثانية متوسط الرد',
      systems: 'أنظمة متصلة',
    },
    p3: {
      title: 'حفظ وتحليل وتسليم',
      sub: 'حوّل المحادثات إلى رؤى وإجراءات.',
      storage: 'تخزين آمن',
      storageNote: 'كل التفاعلات',
      analytics: 'تحليلات ذكية',
      analyticsNote: 'تكتشف الأنماط',
      reports: 'التقارير',
      reportsNote: 'تُرسل للفريق',
      owner: 'المالك · الأداء',
      manager: 'المدير · الخدمة',
      ops: 'العمليات · يومي',
      marketing: 'التسويق · النمو',
      footer: 'رؤى أفضل. ضيوف أسعد.',
    },
  },
  platform: {
    eyebrow: 'ما نبنيه',
    title: 'طبقة الذكاء تحت كل محادثة عميل.',
    body: 'الروبوت يرد ويتوقف. Hello Techno تشغّل الطبقة تحتها: استقبال عبر ست قنوات، معرفة لكل موقع ولغة، إجراءات حقيقية في نظامك، قواعد تصعيد تكتبها أنت، وتسليم بنقرة. كل شيء مسجّل من اليوم الأول.',
    seePlatform: 'شاهد المنصة',
  },
  industries: {
    eyebrow: 'القطاعات',
    title: 'مبنية حول طريقة عمل عملك.',
    body: 'المنصة ثابتة. أما المعرفة وسير العمل والإجراءات والتكاملات واللغة فتُخصَّص لكل عمل — فيحصل كل قطاع على حل يتوافق مع تشغيله الفعلي.',
    pain: 'التحدي',
    win: 'النتيجة',
    seeOp: 'شاهدها على تشغيلك',
    items: [
      {
        key: 'hospitality',
        name: 'الضيافة',
        tagline: 'منتجعات · مجموعات فنادق · شقق فندقية',
        pain: 'الحجوزات المباشرة تتسرب لمنصات الحجز، وطلبات التنظيف تزدحم على الاستقبال، وتتوقف تقييمات المراجعات.',
        win: 'منصة ضيف كاملة: استقبال، كونسيرج أثناء الإقامة، توزيع التنظيف، واستعادة بعد المغادرة — باللغتين.',
        uses: [
          { title: 'استقبال وحجز الضيوف', body: 'حجوزات مباشرة عبر الهاتف وواتساب والدردشة ومحرك الحجز بأسعارك المحلية الكاملة.', result: 'رد خلال أقل من 5 ثوانٍ' },
          { title: 'التنظيف وطلبات الضيوف', body: 'طلبات الغرفة تُوجَّه فوراً للفريق الصحيح مع رقم مهمة وحالة مباشرة.', result: 'توزيع خلال أقل من دقيقة' },
          { title: 'الملاحظات والاستعادة', body: 'يلتقط تجربة سيئة أثناء الإقامة قبل أن تصبح مراجعة، ويُشرك مديراً.', result: 'الوصول للضيف خلال 20 دقيقة' },
        ],
      },
      {
        key: 'clinics',
        name: 'التجميل وطب الأسنان',
        tagline: 'عيادات · منتجعات طبية · مجموعات أسنان',
        pain: 'أسئلة الأسعار على إنستغرام تبقى بلا رد ليلاً، والمكالمات تُفوَّت أثناء الإجراءات، والغياب يفرّغ الكرسي.',
        win: 'منصة تجربة مريض: استقبال وحجز، استقبال صوتي على أرقامك، استعادة الغياب والرعاية اللاحقة.',
        uses: [
          { title: 'استقبال المرضى الجدد', body: 'يحوّل رسالة سعر منتصف الليل إلى استشارة مؤكدة قبل أن يفتح المنافسون.', result: 'رد خلال أقل من 5 ثوانٍ' },
          { title: 'استقبال صوتي بعد الدوام', body: 'يرد على هاتفك بلغة المتصل وعلى أرقامك ويحجز في مفكرة العيادة.', result: 'يرد قبل الرنة الثالثة' },
          { title: 'استعادة الغياب والمتابعة', body: 'يتابع كل موعد فائت ويعمل قائمة الاستدعاء يومياً ويصعّد الإشارات السريرية للطاقم.', result: 'أول رسالة خلال 15 دقيقة' },
        ],
      },
      {
        key: 'restaurants',
        name: 'المطاعم والمقاهي',
        tagline: 'فروع فردية · مجموعات متعددة',
        pain: 'الهاتف يرن دون إجابة أثناء الخدمة، والطلبات تأتي عبر تطبيق يأخذ ربع الفاتورة.',
        win: 'الحجوزات والطلبات وأسئلة الخدمة تُدار على رقمك وبأسعارك وباللغتين.',
        uses: [
          { title: 'الحجوزات وقائمة الانتظار', body: 'يحجز الطاولة المناسبة ويؤكدها ويملأ الملغاة من قائمة الانتظار.', result: 'رد خلال أقل من 5 ثوانٍ' },
          { title: 'أخذ الطلبات', body: 'يأخذ الطلب كاملاً إلى نظام نقاط البيع ويتحقق من النافد ويضيف العرض.', result: 'يرد من الرنة الأولى' },
          { title: 'التوصيل والاستلام', body: 'تحقق المناطق ووقت الوصول وتتبع الطلب دون موظف على جهاز لوحي.', result: 'حالة بدون مكالمة' },
        ],
      },
      {
        key: 'automobile',
        name: 'السيارات',
        tagline: 'وكالات · مراكز خدمة · أساطيل تأجير',
        pain: 'استفسارات المعرض تصل بعد الإغلاق ويتلقفها من يكون متاحاً، وتذكيرات الخدمة تتأخر، والخانة الفارغة تكلف يومياً.',
        win: 'استقبال وكالة وورشة كامل: تجارب قيادة على كل قناة، خدمة من السجل الحقيقي، وعروض مقايضة وتمويل في المحادثة.',
        uses: [
          { title: 'تجارب القيادة وزيارات المعرض', body: 'يلتقط الطراز المطلوب ويتحقق من التوفر ويحجز في مفكرة المبيعات مع الاتجاهات وتذكير.', result: 'حجز خلال أقل من 5 ثوانٍ' },
          { title: 'حجز الخدمة والتذكيرات', body: 'يقرأ سجل الخدمة ويعرض السعر من قائمتك ويحجز خانة الورشة ويعرض الاستلام.', result: 'خانة ممتلئة دون مكالمة' },
          { title: 'عروض المقايضة والتمويل', body: 'يجمع تفاصيل المركبة والمسافة وتفضيلات التمويل ويعيد تقييماً أولياً ورابط موافقة مسبقة.', result: 'عرض أثناء المحادثة' },
        ],
      },
      {
        key: 'smb',
        name: 'الأعمال النامية',
        tagline: 'صالونات · نوادي · تجزئة · خدمات',
        pain: 'المالك هو الاستقبال. الرسائل تنتظر حتى الإغلاق، والمكالمات تُفوَّت أثناء الخدمة، والعرض الذي ينتظر ساعة يضيع.',
        win: 'استقبال لا يُغلق: حجوزات وطلبات وعروض وروابط دفع في المحادثة من أسعارك وسياساتك.',
        uses: [
          { title: 'المواعيد والحجوزات', body: 'يتحقق من المفكرة ويحجز الموعد ويؤكده ويرسل التذكير الذي يبقي الكرسي ممتلئاً.', result: 'رد خلال أقل من 5 ثوانٍ' },
          { title: 'الطلبات وروابط الدفع', body: 'تحقق المخزون وعرض التوصيل وإرسال رابط دفع آمن أثناء بقاء العميل في المحادثة.', result: 'إغلاق خلال أقل من دقيقتين' },
          { title: 'العضويات والمتابعات', body: 'متابعة الأعضاء المنتهية والتجميد واستعادة الغياب وطلب المراجعات حسب جدولك.', result: 'كل تجديد يُتابع في وقته' },
        ],
      },
    ],
  },
  capabilities: [
    { title: 'صندوق واحد، ست قنوات', body: 'واتساب والمكالمات والدردشة وإنستغرام والرسائل والبريد في طابور واحد مترابط حتى لا يضيع أي عميل.', note: 'كل محادثة مسجّلة' },
    { title: 'العربية والإنجليزية أصلاً', body: 'يُكتشف اللغة في الدردشة والهاتف. المعرفة والأسعار والساعات لكل موقع ولغة.', note: 'أكثر من 40 لغة' },
    { title: 'أول رد خلال أقل من خمس ثوانٍ', body: 'في الثانية ظهراً وفي الثانية ليلاً، أول رد يخرج على القناة التي اختارها العميل — لا بريد صوتي.', note: 'صفر استفسارات ضائعة' },
    { title: 'إجراءات حقيقية لا مجرد ردود', body: 'يتحقق من التوفر ويحجز ويأخذ الطلب ويرفع الطلب برقم مهمة ويرسل رابط الدفع.', note: 'موصلات محددة دون ترحيل' },
    { title: 'نقرة واحدة إلى إنسان', body: 'فريقك يدخل أي محادثة بكامل السياق. قواعدك تقرر متى يحدث ذلك.', note: 'السلطة النهائية لك' },
    { title: 'محكوم وقابل للتدقيق', body: 'معرفة معتمدة وقواعد موافقة وسجل قابل للتدقيق لكل إجراء، بما يتوافق مع ممارسات ISO 27001 و ISO 42001.', note: 'لا ارتجال ولا إخفاء' },
  ],
  results: {
    eyebrow: 'النتائج',
    title: 'إيراد أعلى. تكلفة أقل. سيطرة كاملة.',
    body: 'كل استفسار تفوته هو حجز أو معاينة أو تجديد يذهب لمن أجاب أولاً. المنصة تلتقط ذلك الإيراد على مدار الساعة دون إضافة راتب — وتحفظ كل إجراء في سجل قابل للتدقيق.',
    tags: ['صلاحيات محددة', 'إجراءات قابلة للتدقيق', 'إنسان في الحلقة'],
    stats: [
      { value: '6', label: 'قنوات إيراد تُجاب كطابور واحد' },
      { value: '24/7', label: 'تغطية دون وردية ليلية على الرواتب' },
      { value: '5s', label: 'متوسط أول رد، نهاراً أو ليلاً' },
      { value: '01', label: 'نقرة لوضع شخص في أي محادثة' },
    ],
    proofLines: ['تم حجز الموعد', 'أُرسل التذكير', 'أُصدر رابط الدفع', 'اكتملت المتابعة'],
  },
  pricing: {
    eyebrow: 'الأسعار',
    offerBadge: 'عرض لفترة محدودة · خصم حتى 50% على الباقات الشهرية',
    title: 'خطط بسيطة. أرصدة واضحة.',
    body: 'الفنادق والعيادات والمطاعم والوكالات والأعمال النامية تعمل على نفس الخطط ونفس معدل الرصيد: رصيد واحد يغطي عشرين رسالة، ودقيقة المكالمة تكلف اثنين. ابدأ بـ 50 رصيداً مجانياً بلا رسوم إعداد.',
    recommended: 'موصى به',
    talkSales: 'تحدث مع المبيعات',
    startTrial: 'ابدأ تجربة مجانية',
    customPrice: 'مخصص',
    creditNotes: [
      { value: 'رصيد واحد', label: 'حوالي 0.88 ر.ق' },
      { value: '20 رسالة', label: 'رصيد واحد، دخولاً أو خروجاً' },
      { value: 'دقيقة مكالمة', label: 'رصيدان، من نمو فصاعداً' },
      { value: '~10 رسائل', label: 'لكل حجز أو طلب مؤكد' },
    ],
    plans: [
      {
        name: 'البداية',
        blurb: 'موقع واحد، كل قنوات الرسائل مُجابة.',
        estimate: '≈ أكثر من 200 حجز أو طلب شهرياً',
        credits: '100 رصيد · 2,000 رسالة',
        currency: 'ر.ق',
        per: '/شهر',
        features: [
          'واتساب وإنستغرام والدردشة والبريد والرسائل',
          'معرفة من موقعك وقائمتك والأسئلة والأسعار',
          'رقم واحد، صندوق فريق واحد، سجل واحد',
          'المكالمات من خطة النمو فصاعداً',
        ],
      },
      {
        name: 'النمو',
        blurb: 'متابعات وعروض واستفسارات هاتفية لما يصل إلى موقعين.',
        estimate: '≈ أكثر من 330 حجز أو طلب شهرياً',
        credits: '300 رصيد · 3,000 رسالة · 75 دقيقة مكالمة',
        currency: 'ر.ق',
        per: '/شهر',
        features: [
          'كل ما في البداية بثلاثة أضعاف الأرصدة',
          'مكالمات واردة وإعادة اتصال على رقمك',
          'موقعان، لكل ساعات وأسعار خاصة',
          'تذكيرات ومراجعات ومتابعات استدعاء',
        ],
      },
      {
        name: 'المتصل',
        blurb: 'النمو، مع اتصال مباشر بالأنظمة التي تشغّلها.',
        estimate: '≈ أكثر من 840 حجز أو طلب شهرياً',
        credits: '750 رصيد · 7,500 رسالة · 187 دقيقة مكالمة',
        currency: 'ر.ق',
        per: '/شهر',
        features: [
          'كل ما في النمو مع دقائق مكالمة أكثر',
          'حتى ثلاثة مواقع، يُوجَّه المتصلون لفرعهم',
          'مزامنة مباشرة مع نظام واحد: PMS أو POS أو مفكرة أو CRM',
          'قواعد تصعيد تُكتب مع فريقك',
        ],
      },
      {
        name: 'المؤسسات',
        blurb: 'مشغّلو علامات متعددة بعد ثلاثة مواقع.',
        estimate: 'أرصدة مجمّعة عبر كل علامة وفرع',
        credits: 'حجم يناسب مجموعتك',
        currency: 'مجموعات وامتيازات',
        per: '',
        features: [
          'كل ما في المتصل لكل علامة وفرع',
          'تقارير المقر حسب العلامة والفرع والقناة',
          'خيارات استضافة وإقامة بيانات داخل الدولة',
          'تهيئة ودعم مسمّى',
        ],
      },
    ],
  },
  resources: {
    eyebrow: 'الموارد',
    title: 'اقرأ قبل العرض.',
    body: 'أربعة مختصرات — كيف يعمل الموظف الذكي، كيف تُطلق، كيف تُحتسب الأرصدة، ومن أين تبدأ.',
    featuredTag: 'دليل عملي',
    featuredTitle: 'تعرّف على موظف استقبال الطلبات الذكي',
    featuredBody: 'واتساب وإنستغرام والهاتف والموقع — عربي وإنجليزي — دون مقعد ليلي إضافي.',
    featuredCta: 'افتح الدليل',
    featuredHref: '/ai-employee',
    read: 'افتح',
    items: [
      {
        tag: 'قائمة تحقق',
        title: 'الإطلاق خلال أسبوعين إلى ثلاثة',
        body: 'المعرفة ← القواعد ← الوضع التجريبي ← قطع القنوات.',
        href: '/resources/go-live',
      },
      {
        tag: 'دليل',
        title: 'الأرصدة والرسائل ودقائق المكالمة',
        body: 'رصيد واحد ≈ عشرين رسالة؛ دقيقة المكالمة تكلف اثنين.',
        href: '/resources/credits',
      },
      {
        tag: 'موجز',
        title: 'القطاعات التي نبدأ بها',
        body: 'الضيافة والعيادات والمطاعم والوكالات عبر الخليج.',
        href: '/resources/industries',
      },
      {
        tag: 'عرض',
        title: 'احجز جولة مباشرة',
        body: 'ثلاثون دقيقة على قنواتك. منتج حي، لا شرائح.',
        href: '/resources/walkthrough',
      },
    ],
  },
  resourcePages: {
    back: 'كل الموارد',
    related: 'مختصرات أخرى',
    tipLabel: 'نصيحة',
    ctaDemo: 'احجز عرضاً مجانياً',
    ctaWa: 'محادثة واتساب',
    pages: {
      'go-live': {
        tag: 'قائمة تحقق',
        title: 'الإطلاق خلال أسبوعين إلى ثلاثة',
        lead: 'ترتيب هادئ للإطلاق يبقي الفريق واثقاً — المعرفة أولاً، ثم القواعد، والوضع التجريبي، ثم القناة تلو القناة.',
        sections: [
          {
            title: 'الأسبوع 1 — المعرفة والقواعد',
            body: 'نُفهرس القوائم والأسعار والساعات والأسئلة ومسارات التصعيد، ثم نكتب القواعد مع فريقك.',
            points: [
              'معرفة معتمدة لكل موقع ولغة',
              'الساعات وقواعد التسليم والنبرة مع المشغّلين',
              'محادثات تجريبية على واتساب ودردشة الموقع',
            ],
          },
          {
            title: 'الأسبوع 2 — الوضع التجريبي',
            body: 'الذكاء يصيغ؛ فريقك يرسل. ترى الجودة قبل أن يشعر العملاء بالتغيير.',
            points: [
              'مراجعة جنباً إلى جنب في صندوق واحد',
              'التعديلات تعود للمعرفة في اليوم نفسه',
              'بلا مخاطرة على العملاء أثناء الضبط',
            ],
          },
          {
            title: 'الأسبوع 2–3 — قطع القنوات',
            body: 'واتساب وإنستغرام أولاً، ثم الدردشة، ثم الصوت بعد توصيل أرقامك.',
            points: [
              'قناة واحدة في كل مرة مع مسار تراجع',
              'تغطية ليلية دون مقعد ليلي جديد',
              'لوحة حية للمديرين من اليوم الأول',
            ],
          },
        ],
        tip: 'معظم المواقع تنتهي خلال 14–21 يوماً عندما تكون المعرفة وصاحب القرار متاحين في الأسبوع الأول.',
      },
      credits: {
        tag: 'دليل',
        title: 'الأرصدة والرسائل ودقائق المكالمة',
        lead: 'حساب بسيط لتحدد الحجم قبل التوقيع — الرسائل والمكالمات وما يشتريه الرصيد فعلاً.',
        sections: [
          {
            title: 'كيف تعمل الأرصدة',
            body: 'الرصيد وحدة مشتركة للدردشة والصوت. حدّد الحجم لأسبوع الذروة لا لأهدأ يوم.',
            points: [
              'رصيد واحد ≈ 20 رسالة دردشة',
              'دقيقة مكالمة = رصيدان (من باقة النمو فصاعداً)',
              '≈ 0.88 ر.ق لكل رصيد في الباقات المنشورة',
            ],
          },
          {
            title: 'لمحة الباقات',
            body: 'المبتدئة للرسائل؛ النمو يضيف دقائق الصوت؛ المتصلة تضيف مزامنة حية ومساحة أكبر.',
            points: [
              'المبتدئة — 100 رصيد / شهر',
              'النمو — 300 رصيد + 75 دقيقة مكالمة',
              'المتصلة — 750 رصيداً حتى 3 مواقع',
            ],
          },
          {
            title: 'نصيحة التحجيم',
            body: 'احسب خيوط واتساب وإنستغرام والموقع في أسبوع مزدحم، ثم أضف دقائق المكالمات المتوقعة.',
            points: [
              '50 رصيداً مجانياً للبداية بلا رسوم إعداد',
              'التجاوز واضح قبل أن تصل إليه',
              'المؤسسات يمكنها تجميع الأرصدة عبر العلامات',
            ],
          },
        ],
        tip: 'إن كنت متردداً، ابدأ بالنمو في الشهر الأول — أسهل أن تخفض لاحقاً من أن ينفد الرصيد وسط الإطلاق.',
      },
      industries: {
        tag: 'موجز',
        title: 'القطاعات التي نبدأ بها',
        lead: 'المنصة واحدة. المعرفة والإجراءات والموصلات واللغة تختلف حسب تشغيل كل عمل.',
        sections: [
          {
            title: 'الضيافة',
            body: 'منتجعات ومجموعات فنادق وشقق فندقية — حجوزات مباشرة وطلبات أثناء الإقامة واسترداد بعد المغادرة بالعربية والإنجليزية.',
            points: ['استقبال الضيوف والحجز', 'توجيه التنظيف', 'استرداد التقييم قبل النشر'],
          },
          {
            title: 'التجميل وطب الأسنان',
            body: 'عيادات تفقد رسائل الليل ومكالمات أثناء الإجراءات — استقبال وصوت وتذكير بالمواعيد الفائتة.',
            points: ['استقبال مرضى جدد من إنستغرام', 'صوت خارج الدوام على أرقامك', 'حلقات استرداد عدم الحضور'],
          },
          {
            title: 'المطاعم والسيارات والأعمال النامية',
            body: 'مقاهٍ ووكالات وصالونات وتجزئة — طلبات وتجارب قيادة وعروض وحجوزات دون طاقم ليلي إضافي.',
            points: ['طلبات وروابط دفع', 'حجز تجربة قيادة وخدمة', 'عروض بينما المحادثة مفتوحة'],
          },
        ],
        tip: 'كل بناء قطاعي يصل بقواعد محلية لكل فرع — ساعات وأسعار وفريق — لا سكربت واحد للجميع.',
      },
      walkthrough: {
        tag: 'عرض',
        title: 'احجز جولة مباشرة',
        lead: 'ثلاثون دقيقة مركّزة على قنواتك ولغاتك — منتج يعمل حياً، لا شرائح.',
        sections: [
          {
            title: 'ماذا نغطي',
            body: 'نوصل عينة من قنواتك في الجلسة لتسمع ردوداً عربية وإنجليزية، وترى الصندوق، وتشهد حجزاً أو طلباً يصل.',
            points: [
              'واتساب + قناة أخرى من اختيارك',
              'معرفة لكل موقعك',
              'تسليم بشري وقواعد التصعيد',
            ],
          },
          {
            title: 'من يحضر',
            body: 'مشغّل يعرف الساعات والأسعار، ومن يملك الصندوق أو الاستقبال — القرارات أسرع في الغرفة.',
            points: ['التشغيل أو المدير العام', 'قائد الاستقبال / تجربة الضيف', 'اختياري: تقنية المعلومات للأرقام والـ CRM'],
          },
          {
            title: 'بعد المكالمة',
            body: 'تخرج بمخطط إطلاق وتحجيم أرصدة وخطوة تالية واضحة — تجربة أو موقع تجريبي أو نطاق مؤسسي.',
            points: ['ملخص مكتوب في اليوم نفسه', 'تجربة وضع ظلي اختيارية', 'بلا ضغط بيع — المنتج أولاً'],
          },
        ],
        tip: 'تفضل واتساب؟ راسل +974 31637274 وسنجدول حول ساعات الذروة لديك.',
      },
    },
  },
  faq: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'إجابات مباشرة.',
    body: 'الأسئلة التي نسمعها أكثر من المشغّلين قبل الإطلاق.',
    items: [
      {
        q: 'ماذا يفعل شريك تواصل الأعمال فعلياً؟',
        a: 'برنامج يدير محادثة العميل كاملة بدلاً من الرد على قناة واحدة. كل رسالة عبر واتساب والهاتف والدردشة والرسائل وإنستغرام والبريد تصل لطابور واحد، والإجابات من معرفتك المعتمدة، والإجراءات الحقيقية في نظامك، ويمكن لشخص أن يتولى متى قالت قواعدك ذلك.',
      },
      {
        q: 'ما الفرق عن روبوت الدردشة؟',
        a: 'الروبوت يرد ويتوقف. Hello Techno تشغّل الطبقة تحتها: استقبال عبر ست قنوات، معرفة لكل موقع ولغة، حجوزات وطلبات حقيقية عبر صلاحيات محددة، قواعد تصعيد تكتبها أنت، ووحدة تحكم بتسليم بنقرة. كل شيء مسجّل من اليوم الأول.',
      },
      {
        q: 'ما القنوات واللغات المدعومة؟',
        a: 'ست قنوات — واتساب ومكالمات على أرقامك والدردشة والرسائل وإنستغرام والبريد. العربية والإنجليزية أصليتان مع اكتشاف تلقائي للغة. المعرفة والقواعد لكل موقع، فيجيب كل فرع بساعاته وأسعاره وفريقه.',
      },
      {
        q: 'ماذا يفعل فعلاً في أنظمتنا؟',
        a: 'يتحقق من التوفر ويعرض الأسعار الكاملة مع الرسوم المحلية ويحجز ويؤكد ويحجز الاستشارات في مفكرتك ويأخذ الطلبات إلى نقاط البيع ويرفع طلبات الخدمة بأرقام مهام ويجدول التذكيرات ويتابع المواعيد الفائتة ويرسل روابط دفع آمنة. لا ترحيل ولا استبدال.',
      },
      {
        q: 'كم يستغرق الإطلاق؟',
        a: 'من أسبوعين إلى ثلاثة لكل موقع. الأسبوع الأول يفهرس معرفتك ويكتب القواعد مع فريقك، والثاني يعمل في وضع ظل حيث يصيغ الذكاء ويرسل طاقمك، ثم تُفعَّل القنوات واحدة تلو الأخرى — واتساب وإنستغرام أولاً، ثم الصوت بعد ربط رقمك.',
      },
      {
        q: 'كم التكلفة؟',
        a: 'خطط شهرية بسيطة تبدأ من 100 ر.ق، ورصيد واحد يغطي عشرين رسالة ودقيقة المكالمة تكلف اثنين. ابدأ بـ 50 رصيداً مجانياً بلا رسوم إعداد، وحدّد الخطة في العرض، وانتقل للأعلى فقط عند زيادة الحجم.',
      },
    ],
  },
  demo: {
    eyebrow: 'احجز عرضاً',
    title: 'شاهده يعمل على تشغيلك.',
    body: 'اختر وقتاً يناسبك. شخص من Hello Techno يعرض المنصة مباشرة — على ممتلكاتك وقنواتك ولغاتك — ويجيب عن الأسئلة الصعبة. بلا تسلسل مبيعات وبلا التزام.',
    bullets: ['30 دقيقة، منتج حي لا شرائح', 'العربية أو الإنجليزية', 'حالتك أنت، أرقامك أنت'],
    cta: 'احجز عرضاً مجانياً',
    hint: 'سجّل أو سجّل الدخول — ثم نُعدّ عرضك.',
    email: 'البريد',
    phone: 'الهاتف',
    whatsapp: 'واتساب',
  },
  footer: {
    blurb:
      'شريك تواصل أعمالك. موحّد ومُجاب ومتصل ومُسلَّم — منشور للضيافة والعيادات والمطاعم ووكالات السيارات والأعمال النامية في الخليج.',
    tags: ['العربية + الإنجليزية', '6 قنوات', '24/7'],
    sections: 'الأقسام',
    talkSales: 'تحدث مع المبيعات',
    answersWhere: 'نجيب حيث يكونون',
    backTop: 'العودة للأعلى',
    rights: 'جميع الحقوق محفوظة.',
  },
  navUi: {
    bookDemo: 'احجز عرضاً مجانياً',
    logOut: 'تسجيل الخروج',
    signedIn: 'مسجّل الدخول كـ',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    chatWhatsApp: 'محادثة واتساب',
  },
  auth: {
    signupTab: 'إنشاء حساب',
    loginTab: 'تسجيل الدخول',
    signupTitle: 'أنشئ حسابك',
    signupBody: 'سجّل لحجز عرض مجاني — أقل من دقيقة.',
    signupSubmit: 'سجّل وتابع',
    loginTitle: 'مرحباً بعودتك',
    loginBody: 'سجّل الدخول لحجز عرضك المجاني وإدارة مساحة Hello Techno.',
    loginSubmit: 'دخول وتابع',
    name: 'الاسم الكامل',
    email: 'بريد العمل',
    password: 'كلمة المرور',
    namePh: 'ليلى حداد',
    emailPh: 'you@company.com',
    passwordPhLogin: '••••••••',
    passwordPhSignup: '6 أحرف على الأقل',
    haveAccount: 'لديك حساب؟',
    newHere: 'جديد هنا؟',
    logInLink: 'تسجيل الدخول',
    createLink: 'إنشاء حساب',
  },
  chat: {
    welcome:
      'مرحباً — أنا مساعد Hello Techno الذكي. اسأل عن الخطط أو القنوات أو وقت الإطلاق أو احجز عرضاً مجانياً. العربية أو الإنجليزية، كلاهما مناسب.',
    suggestions: ['ما الخطط المتوفرة؟', 'ما القنوات التي تغطونها؟', 'كيف أحجز عرضاً؟'],
    title: 'Hello Techno AI',
    subtitle: 'إجابات من معرفة موقعك',
    thinking: 'يفكّر…',
    placeholder: 'اسأل عن الخطط أو القنوات أو العرض…',
    send: 'إرسال الرسالة',
    close: 'إغلاق المحادثة',
    fallback: 'تعذّر الوصول للمساعد الآن. راسل {email} أو واتساب {phone} وسيساعدك شخص.',
    openChat: 'فتح محادثة الذكاء',
    closeChat: 'إغلاق محادثة الذكاء',
    live: 'مباشر',
  },
  aiEmployee: {
    badge: 'موظف ذكي لاستقبال الطلبات — للمخابز والمقاهي',
    headlineLead: 'لا تفوّت طلباً مرة أخرى.',
    headlineAccent: 'موظف الطلبات الذكي يعمل على الكاونتر طوال اليوم ويلتقط كل طلب.',
    body: 'فريقك عند الفرن وآلة الإسبريسو والصندوق. Hello Techno تجيب على كل استفسار وتلتقط كل طلب عبر واتساب وإنستغرام وهاتفك ودردشة الموقع، بالعربية والإنجليزية، حتى لا يضيع شيء وأنت مشغول.',
    callTitle: 'تحدث مع الوكيل — مباشرة',
    callBody: 'أدخل رقمك ونتصل بك خلال ثوانٍ. تحدث معه كما يفعل العميل، بالعربية أو الإنجليزية.',
    callPlaceholder: '3123 4567',
    callAgree: 'أوافق على استلام مكالمة تجريبية لمرة واحدة من Hello Techno وأقبل سياسة الخصوصية.',
    callMarketing: 'اختياري: أبقوني على اطلاع عبر الهاتف أو الرسائل أو واتساب أو البريد. يمكنني إلغاء الاشتراك في أي وقت.',
    callCta: 'اتصل بي الآن',
    callHint: 'يرن خلال ~10ث · مكالمة واحدة · EN / العربية',
    callOr: 'أو',
    callBrowser: 'تحدث من المتصفح',
    waBadge: 'واتساب',
    waTitle: 'راسلنا على واتساب',
    waBody: 'امسح الرمز أو اضغط الزر من هاتفك. اسأل أي شيء عن الموظف الذكي، أو احجز عرضاً حضورياً برسالة واحدة.',
    waScan: 'امسح بهاتفك',
    waUserMsg: 'مرحباً، هل يمكنني حجز عرض حضوري لمخبزي هذا الأسبوع؟',
    waVoice: 'رسالة صوتية',
    waBotMsg: 'بالتأكيد. أي يوم يناسبك، وأي فرع نزور؟',
    waOn: 'Hello Techno على واتساب',
    waCta: 'محادثة واتساب',
    handlesBadge: 'ما يتولاه الموظف الذكي',
    handlesTitle: 'مستقبل الطلبات الذكي للمخابز والمقاهي',
    handlesBody:
      'ليس روبوتاً يجمع رسالة لوقت لاحق. يأخذ الطلب، يسعر الكيكة، يؤكد التوصيل ويطلب التقييم — على كل قناة يستخدمها عملاؤك، من قائمتك وقواعدك.',
    features: [
      {
        title: 'استقبال الطلبات على كل قناة',
        body: 'يأخذ الطلب الكامل من قائمتك، يؤكده، يرسل رابط الدفع ويدفعه إلى نظام نقاط البيع.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'كل عميل، يُذكر',
        body: 'يتذكر طلب الزبون المعتاد والحساسية وشهر الميلاد واللغة، فكل محادثة تبدو شخصية.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'القائمة والكيك والطلبات المسبقة',
        body: 'قائمة وأسعار مباشرة، مع كيك يُحجز تاريخه ويُؤخذ العربون قبل بدء الخبز.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'الضيافة وصناديق الشركات',
        body: 'الطلبات الكبيرة تأتي ناقصة التفاصيل. يؤكد الكمية والتاريخ والهوية والفاتورة ثم يبلّغ فريقك.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'التوصيل والاستلام، مُداران',
        body: 'مناطق ورسوم وأوقات من قواعدك، مواعيد استلام تحترم الخبز، وحالة الطلب تُجاب عنك.',
        image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'التقييمات والطلبات المتكررة',
        body: 'بعد الاستلام يسأل عن التجربة، يرسل رابط التقييم للراضين ويبلّغك بالباقي.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      },
    ],
    stats: [
      { label: 'محادثات يحلها الذكاء', value: '94%' },
      { label: 'أول رد خلال أقل من', value: '5 ثوانٍ' },
      { label: 'عمولة تُتجنب لكل طلب مباشر', value: '25–35%' },
    ],
    statsNote:
      'الرقمان الأولان معياران عبر نشرات حية، ويُقاس خطك الأساسي في الأسبوع الأول. نطاق العمولة ما يبلغه مشغّلو الخليج لدفع المنصات لكل طلب.',
    multiBadge: 'متعدد العلامات والامتيازات والفروع',
    multiTitle: 'موظف طلبات ذكي واحد لكل فرع وامتياز.',
    multiBody:
      'كل فرع وكل صاحب امتياز يحصل على موظف طلبات خاص: مدرّب على قواعد العلامة، يعمل بقائمته وأسعاره وساعاته ومخزونه. ثلاثة فروع أو أربعون متجراً — دون شخص إضافي لكل كاونتر.',
    multiPoints: [
      'رقم واحد لكل علامة، والفرع الصحيح يجيب',
      'كل فرع يبيع خبزه ومخزونه وأسعاره مع الضريبة المحلية',
      'صوت علامة معتمد واحد عبر كل امتياز',
      'فرع جديد ينطلق من قالب العلامة لا من الصفر',
      'المقر يرى الطلبات والفاقد والتقييمات لكل موقع في عرض واحد',
    ],
    multiDemo: 'احجز عرضاً حضورياً لعلامتك',
    multiWa: 'محادثة واتساب',
    multiImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    peopleBadge: 'الفريق خلفه',
    peopleTitleLead: 'الذكاء يأخذ الطلبات.',
    peopleTitleAccent: 'ونحن الفريق خلفه.',
    peopleBody:
      'معظم الأدوات تتركك وحيداً مع لوحة تحكم. نحن فريق في الدوحة، على مكالمة واحدة. نأتي إلى مخبزك أو مقهاك، نشغّل الموظف الذكي معك، ونرد على الهاتف متى احتجتنا.',
    peoplePoints: [
      'إعداد في متجرك، حضورياً، من الفريق الذي بناه',
      'تتصل بشخص، لا بطابور تذاكر',
      'تغيّرت القائمة؟ نعدّلها معك في نفس اليوم',
      'العربية والإنجليزية، على الهاتف وفي متجرك',
    ],
    peopleName: 'مبيعات Hello Techno',
    peopleRole: 'جهة اتصالك في Hello Techno',
    peoplePlace: 'الدوحة، قطر',
    peopleQuote:
      'تحدث معنا قبل أي قرار. في خمس دقائق نقول لك إن كان الموظف الذكي يناسب مخبزك. إن ناسب، نأتي إليك، نجهّزه بأنفسنا، ونبقى على الهاتف بعد ذلك.',
    peopleDemo: 'احجز عرضاً حضورياً',
    peopleWa: 'محادثة واتساب',
    peopleFoot: 'شخص يرد. إن كنّا في متجر آخر، نعاود الاتصال في نفس اليوم.',
    langBadge: 'العربية والصوت',
    langTitle: 'لهجات عربية وأكثر من 40 لغة، على رقمك',
    langBody:
      'يقرأ الموظف الذكي اللهجة من أول رسالة ويبقى عليها، في الدردشة وعلى الهاتف. حتى يقرأ الاسم قبل أن يُكتب على الكيكة.',
    dialects: [
      { ar: 'خليجي', en: 'Gulf' },
      { ar: 'شامي', en: 'Levantine' },
      { ar: 'مصري', en: 'Egyptian' },
      { ar: 'فصحى', en: 'Modern Standard' },
    ],
    langMore: '+ الإنجليزية والهندية والأوردو والتغالوغ و40 غيرها',
    langDemo: 'احجز عرضاً حضورياً',
    langWa: 'محادثة واتساب',
    langHint: 'اسمع الصوت العربي مباشرة في العرض',
    langImage: 'https://images.pexels.com/photos/2761206/pexels-photo-2761206.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bookDemo: 'احجز عرضاً',
  },
}

export function getCopy(locale: Locale): Copy {
  return locale === 'ar' ? ar : en
}
