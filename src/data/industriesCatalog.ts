export type IndustryCategory =
  | 'all'
  | 'hospitality-travel'
  | 'healthcare'
  | 'commerce-auto'
  | 'enterprise-public'

export type IndustryCatalogItem = {
  slug: string
  href: string
  category: Exclude<IndustryCategory, 'all'>
  accent: string
  en: {
    title: string
    tagline: string
    summary: string
    useCases: string[]
    sampleChat: {
      guest: string
      agent: string
      system: string
    }
  }
  ar: {
    title: string
    tagline: string
    summary: string
    useCases: string[]
    sampleChat: {
      guest: string
      agent: string
      system: string
    }
  }
}

export const INDUSTRY_CATEGORIES: {
  id: IndustryCategory
  en: string
  ar: string
}[] = [
  { id: 'all', en: 'All Industries (15)', ar: 'جميع القطاعات (15)' },
  { id: 'healthcare', en: 'Healthcare', ar: 'الرعاية الصحية' },
  { id: 'hospitality-travel', en: 'Hotels, Dining & Travel', ar: 'الفنادق والمطاعم والسفر' },
  { id: 'commerce-auto', en: 'Real Estate, Auto & Retail', ar: 'العقارات والسيارات والتجزئة' },
  { id: 'enterprise-public', en: 'Finance, Legal, Gov & Ops', ar: 'المالية والقانون والحكومة والتشغيل' },
]

export const ALL_INDUSTRIES: IndustryCatalogItem[] = [
  {
    slug: 'healthcare',
    href: '/industries/aesthetics-dental',
    category: 'healthcare',
    accent: '#6F4BF2',
    en: {
      title: 'Healthcare',
      tagline: 'Hospitals · Clinics · Medspas · Dental groups',
      summary: 'AI reception, appointment booking, patient follow-ups, and lab/medicine reminders in English and Arabic.',
      useCases: [
        'AI Receptionist',
        'Appointment booking',
        'Doctor availability',
        'Insurance inquiries',
        'Patient follow-up',
        'Lab result notifications',
        'Medicine reminders',
        'Ambulance inquiries',
        'Vaccination reminders',
      ],
      sampleChat: {
        guest: 'Hi, is Dr. Fatima available tomorrow afternoon, and do you accept QLM insurance?',
        agent: 'Yes, Dr. Fatima has slots at 3:30 PM and 4:15 PM tomorrow, and QLM is covered. Would you like me to book 3:30 PM?',
        system: 'Appointment booked in clinic diary · Insurance pre-check logged',
      },
    },
    ar: {
      title: 'الرعاية الصحية',
      tagline: 'مستشفيات · عيادات · مراكز تجميل وأسنان',
      summary: 'استقبال ذكي وحجز مواعيد ومتابعة المرضى وتنبيهات المختبر والأدوية بالعربية والإنجليزية.',
      useCases: [
        'موظف استقبال بالذكاء الاصطناعي',
        'حجز المواعيد',
        'توافر الأطباء',
        'استفسارات التأمين',
        'متابعة المرضى',
        'إشعارات نتائج المختبر',
        'تذكير الأدوية',
        'استفسارات الإسعاف',
        'تذكير التطعيمات',
      ],
      sampleChat: {
        guest: 'مرحباً، هل الدكتورة فاطمة متاحة غداً عصراً، وهل تقبلون تأمين QLM؟',
        agent: 'نعم، تتوفر مواعيد مع د. فاطمة الساعة 3:30 و4:15 عصراً غداً، وتأمين QLM مشمول. هل أحجز لك الساعة 3:30؟',
        system: 'تم تأكيد الموعد في مفكرة العيادة · وتسجيل التحقق من التأمين',
      },
    },
  },
  {
    slug: 'restaurants',
    href: '/industries/restaurants',
    category: 'hospitality-travel',
    accent: '#E1306C',
    en: {
      title: 'Restaurants & Cafes',
      tagline: 'Restaurants · Cafes · Bakeries · Multi-branch groups',
      summary: 'Table reservations, direct delivery orders, menu Q&A, promotions, feedback, and catering on your own number.',
      useCases: [
        'Table reservations',
        'Home delivery orders',
        'Menu information',
        'Promotions',
        'Customer feedback',
        'Catering bookings',
      ],
      sampleChat: {
        guest: 'Can I book a table for 4 tonight at 8 PM and check if you have gluten-free pasta?',
        agent: 'Table for 4 at 8:00 PM is confirmed! Yes, we offer gluten-free penne and fusilli on our dinner menu.',
        system: 'Reservation #TB-302 confirmed · POS synced',
      },
    },
    ar: {
      title: 'المطاعم والمقاهي',
      tagline: 'مطاعم · مقاهي · مخابز · مجموعات فروع',
      summary: 'حجز الطاولات وطلبات التوصيل المباشرة ومعلومات القائمة والعروض وتقييمات العملاء والتموين.',
      useCases: [
        'حجز الطاولات',
        'طلبات التوصيل المنزلي',
        'معلومات القائمة',
        'العروض الترويجية',
        'تقييمات العملاء',
        'حجوزات التموين والضيافة',
      ],
      sampleChat: {
        guest: 'هل يمكن حجز طاولة لـ 4 أشخاص الليلة الساعة 8 مساءً؟ وهل لديكم باستا خالية من الغلوتين؟',
        agent: 'تم تأكيد طاولة لـ 4 أشخاص الساعة 8:00 مساءً! نعم، تتوفر باستا خالية من الغلوتين في قائمة العشاء.',
        system: 'تم تأكيد الحجز #TB-302 · ومزامنة نقطة البيع',
      },
    },
  },
  {
    slug: 'hotels',
    href: '/industries/hospitality',
    category: 'hospitality-travel',
    accent: '#1A63D8',
    en: {
      title: 'Hotels',
      tagline: 'Hotels · Resorts · Hotel apartments',
      summary: 'Direct room reservations, live availability, concierge services, airport pickup, and in-stay room service.',
      useCases: [
        'Room reservations',
        'Check availability',
        'Concierge services',
        'Airport pickup booking',
        'Room service requests',
        'Guest inquiries',
      ],
      sampleChat: {
        guest: 'Do you have a sea-view suite this Friday and can you arrange airport pickup?',
        agent: 'Yes! Deluxe Sea-View Suite is available at QAR 1,450/night, and chauffeur airport pickup is included on request.',
        system: 'Suite held in Opera PMS · Chauffeur request logged',
      },
    },
    ar: {
      title: 'الفنادق',
      tagline: 'فنادق · منتجعات · شقق فندقية',
      summary: 'حجوزات الغرف المباشرة والتحقق من التوفر وخدمات الكونسيرج وتوصيل المطار وخدمة الغرف.',
      useCases: [
        'حجوزات الغرف',
        'التحقق من التوفر',
        'خدمات الكونسيرج',
        'حجز توصيل المطار',
        'طلبات خدمة الغرف',
        'استفسارات الضيوف',
      ],
      sampleChat: {
        guest: 'هل يتوفر جناح مطل على البحر يوم الجمعة وهل يمكن ترتيب توصيل من المطار؟',
        agent: 'نعم! الجناح متاح بسعر 1,450 ر.ق/ليلة مع خدمة السائق من المطار عند الطلب.',
        system: 'تم حجز الجناح في Opera PMS · وتسجيل طلب السائق',
      },
    },
  },
  {
    slug: 'real-estate',
    href: '/industries/real-estate',
    category: 'commerce-auto',
    accent: '#4F46E5',
    en: {
      title: 'Real Estate',
      tagline: 'Brokerages · Developers · Property management',
      summary: 'Instant property inquiries, scheduled viewings, buyer/tenant qualification, and investment consultations.',
      useCases: [
        'Property inquiries',
        'Schedule property visits',
        'Lead qualification',
        'Rental inquiries',
        'Investment consultations',
      ],
      sampleChat: {
        guest: 'Is the 2BR apartment in Lusail Marina still available for rent, and can I visit Thursday?',
        agent: 'Yes, it’s available at QAR 9,500/month. I’ve reserved a viewing slot for Thursday at 4:00 PM with our senior advisor.',
        system: 'Lead qualified & viewing booked in CRM · Agent notified',
      },
    },
    ar: {
      title: 'العقارات',
      tagline: 'وساطة عقارية · مطورون · إدارة أملاك',
      summary: 'الرد الفوري على استفسارات العقارات، جدولة المعاينات، تأهيل العملاء، واستشارات الاستثمار.',
      useCases: [
        'استفسارات العقارات',
        'جدولة زيارات العقار',
        'تأهيل العملاء المحتملين',
        'استفسارات الإيجار',
        'استشارات الاستثمار',
      ],
      sampleChat: {
        guest: 'هل شقة غرفتين في مرسى لوسيل متاحة للإيجار، وهل يمكن معاينتها يوم الخميس؟',
        agent: 'نعم، متاحة بسعر 9,500 ر.ق/شهر. حجزت لك موعد معاينة يوم الخميس الساعة 4:00 عصراً مع مستشارنا.',
        system: 'تم تأهيل العميل وحجز المعاينة في CRM · وإشعار المستشار',
      },
    },
  },
  {
    slug: 'automobile',
    href: '/industries/automobile',
    category: 'commerce-auto',
    accent: '#DC2626',
    en: {
      title: 'Automobile',
      tagline: 'Dealerships · Service centres · Fleet operators',
      summary: 'Test drive scheduling, workshop service bookings, spare parts checks, vehicle inquiries, and insurance help.',
      useCases: [
        'Service booking',
        'Test drive scheduling',
        'Insurance assistance',
        'Vehicle inquiries',
        'Spare parts availability',
      ],
      sampleChat: {
        guest: 'Can I book a 40,000 km service for my SUV tomorrow morning and check brake pad availability?',
        agent: 'Brake pads are in stock. I’ve booked your 40,000 km service bay for tomorrow at 9:00 AM with a courtesy check.',
        system: 'Workshop bay #4 reserved · Parts hold confirmed',
      },
    },
    ar: {
      title: 'السيارات',
      tagline: 'وكالات · مراكز صيانة · أساطيل',
      summary: 'حجز الصيانة وجدولة تجارب القيادة والتحقق من قطع الغيار واستفسارات المركبات والتأمين.',
      useCases: [
        'حجز الصيانة',
        'جدولة تجربة القيادة',
        'المساعدة في التأمين',
        'استفسارات المركبات',
        'توفر قطع الغيار',
      ],
      sampleChat: {
        guest: 'هل يمكن حجز صيانة 40,000 كم لسيارتي غداً صباحاً والتأكد من توفر الفحمات؟',
        agent: 'القطع متوفرة في المخزون. تم حجز موعد الصيانة غداً الساعة 9:00 صباحاً.',
        system: 'تم حجز مسار الورشة #4 · وتأكيد حجز القطع',
      },
    },
  },
  {
    slug: 'education',
    href: '/industries/education',
    category: 'enterprise-public',
    accent: '#0E9A9E',
    en: {
      title: 'Education',
      tagline: 'Schools · Universities · Training institutes',
      summary: '24/7 student admissions, course details, fee inquiries, parent support, and campus event registrations.',
      useCases: [
        'Student admissions',
        'Course information',
        'Fee inquiries',
        'Parent support',
        'Event registrations',
      ],
      sampleChat: {
        guest: 'What are the admission dates and annual tuition for Grade 5?',
        agent: 'Fall admissions close June 30. Grade 5 tuition is QAR 32,000/year — would you like to book a campus tour?',
        system: 'Admissions inquiry logged · Brochure & fee schedule sent',
      },
    },
    ar: {
      title: 'التعليم',
      tagline: 'مدارس · جامعات · معاهد تدريب',
      summary: 'قبول الطلاب على مدار الساعة، معلومات البرامج، الرسوم الدراسية، دعم أولياء الأمور، وتسجيل الفعاليات.',
      useCases: [
        'قبول الطلاب',
        'معلومات الدورات والبرامج',
        'استفسارات الرسوم',
        'دعم أولياء الأمور',
        'تسجيل الفعاليات',
      ],
      sampleChat: {
        guest: 'ما هي مواعيد التسجيل والرسوم السنوية للصف الخامس؟',
        agent: 'التسجيل مفتوح حتى 30 يونيو، والرسوم السنوية 32,000 ر.ق. هل تود حجز جولة في المدرسة؟',
        system: 'تم تسجيل طلب القبول · وإرسال دليل الرسوم',
      },
    },
  },
  {
    slug: 'retail-stores',
    href: '/industries/small-business',
    category: 'commerce-auto',
    accent: '#F59E0B',
    en: {
      title: 'Retail Stores',
      tagline: 'Retail · Salons · Gyms · Online stores',
      summary: 'Live product availability, order status tracking, store timings, return policies, and promotional offers.',
      useCases: [
        'Product availability',
        'Order status',
        'Store timings',
        'Return policy',
        'Promotions',
      ],
      sampleChat: {
        guest: 'Is the wireless espresso grinder in stock at your Mall branch, and what is your return policy?',
        agent: 'Yes, 4 units are in stock at our Mall branch (open until 11 PM), with a 14-day easy exchange policy.',
        system: 'Inventory checked · Click-and-collect hold created',
      },
    },
    ar: {
      title: 'متاجر التجزئة',
      tagline: 'متاجر · صالونات · نوادٍ · تجارة إلكترونية',
      summary: 'التحقق من توفر المنتجات، تتبع الطلبات، ساعات العمل، سياسة الاسترجاع، والعروض الترويجية.',
      useCases: [
        'توفر المنتجات',
        'حالة الطلب',
        'ساعات عمل المتجر',
        'سياسة الاسترجاع',
        'العروض الترويجية',
      ],
      sampleChat: {
        guest: 'هل مطحنة القهوة اللاسلكية متوفرة في فرع المول؟ وما سياسة الاسترجاع؟',
        agent: 'نعم، تتوفر 4 قطع في فرع المول (مفتوح حتى 11 مساءً) مع إمكانية الاستبدال خلال 14 يوماً.',
        system: 'تم فحص المخزون · وإنشاء حجز استلام من الفرع',
      },
    },
  },
  {
    slug: 'banking-finance',
    href: '/industries/banking-finance',
    category: 'enterprise-public',
    accent: '#1A63D8',
    en: {
      title: 'Banking & Financial Services',
      tagline: 'Banks · FinTech · Lending & wealth',
      summary: 'Customer verification flows, loan and credit card inquiries, branch locator, and advisor scheduling.',
      useCases: [
        'Customer verification',
        'Loan inquiries',
        'Credit card assistance',
        'Branch locator',
        'Appointment scheduling',
      ],
      sampleChat: {
        guest: 'What documents are needed for a personal finance application and where is the nearest branch open now?',
        agent: 'You’ll need your QID, salary certificate, and 3-month statement. Our West Bay branch is open until 2:30 PM — shall I book a slot?',
        system: 'Verified inquiry logged · Branch appointment link sent',
      },
    },
    ar: {
      title: 'البنوك والخدمات المالية',
      tagline: 'بنوك · تقنية مالية · تمويل واستثمار',
      summary: 'التحقق من العملاء، استفسارات القروض والبطاقات الائتمانية، مواقع الفروع، وجدولة المواعيد.',
      useCases: [
        'التحقق من العميل',
        'استفسارات التمويل والقروض',
        'مساعدة البطاقات الائتمانية',
        'تحديد مواقع الفروع',
        'جدولة المواعيد',
      ],
      sampleChat: {
        guest: 'ما المستندات المطلوبة لطلب تمويل شخصي؟ وأين أقرب فرع مفتوح الآن؟',
        agent: 'تحتاج الهوية وشهادة الراتب وكشف حساب 3 أشهر. فرع الخليج الغربي مفتوح حتى 2:30 ظهراً — هل أحجز لك موعداً؟',
        system: 'تم تسجيل الاستفسار الموثق · وإرسال رابط حجز الفرع',
      },
    },
  },
  {
    slug: 'insurance',
    href: '/industries/insurance',
    category: 'enterprise-public',
    accent: '#0E9A9E',
    en: {
      title: 'Insurance',
      tagline: 'Motor · Health · Commercial & life insurers',
      summary: 'Instant claim status updates, policy renewals, premium reminders, customer support, and lead qualification.',
      useCases: [
        'Claim status',
        'Policy renewal',
        'Premium reminders',
        'Customer support',
        'Lead qualification',
      ],
      sampleChat: {
        guest: 'Can I check the status of motor claim #CLM-8821 and renew my comprehensive policy?',
        agent: 'Claim #CLM-8821 is approved for repair at the authorized workshop. Your renewal quote is QAR 2,850 — want the payment link?',
        system: 'Claim status fetched · Renewal payment link generated',
      },
    },
    ar: {
      title: 'التأمين',
      tagline: 'تأمين السيارات · الصحي · التجاري',
      summary: 'حالة المطالبات الفورية، تجديد الوثائق، تذكيرات الأقساط، دعم العملاء، وتأهيل الطلبات الجديدة.',
      useCases: [
        'حالة المطالبة',
        'تجديد الوثيقة',
        'تذكير الأقساط',
        'دعم العملاء',
        'تأهيل العملاء الجدد',
      ],
      sampleChat: {
        guest: 'أود معرفة حالة مطالبة السيارة #CLM-8821 وتجديد وثيقة التأمين الشامل.',
        agent: 'المطالبة #CLM-8821 معتمدة للإصلاح في الورشة المعتمدة. عرض التجديد 2,850 ر.ق — هل أرسل رابط الدفع؟',
        system: 'تم جلب حالة المطالبة · وإنشاء رابط دفع التجديد',
      },
    },
  },
  {
    slug: 'government-services',
    href: '/industries/government-services',
    category: 'enterprise-public',
    accent: '#4F46E5',
    en: {
      title: 'Government Services',
      tagline: 'Municipalities · Public portals · Service centers',
      summary: 'Bilingual citizen inquiries, service appointment booking, document checklists, status updates, and complaint logging.',
      useCases: [
        'Citizen inquiries',
        'Appointment booking',
        'Document requirements',
        'Status updates',
        'Complaint registration',
      ],
      sampleChat: {
        guest: 'What documents are required to renew a commercial license, and can I book a counter slot?',
        agent: 'You need your CR copy, lease agreement, and municipal approval. Next available slot is tomorrow at 10:15 AM — shall I confirm?',
        system: 'Ticket #GOV-419 logged · Appointment slot held',
      },
    },
    ar: {
      title: 'الخدمات الحكومية',
      tagline: 'بلديات · مراكز خدمة · بوابات عامة',
      summary: 'استفسارات المراجعين بالعربية والإنجليزية، حجز المواعيد، متطلبات المستندات، متابعة الطلبات، وتسجيل البلاغات.',
      useCases: [
        'استفسارات المراجعين',
        'حجز المواعيد',
        'متطلبات المستندات',
        'تحديثات حالة الطلب',
        'تسجيل الشكاوى والبلاغات',
      ],
      sampleChat: {
        guest: 'ما المستندات المطلوبة لتجديد الرخصة التجارية؟ وهل يمكن حجز موعد؟',
        agent: 'تحتاج صورة السجل التجاري وعقد الإيجار والموافقة البلدية. أقرب موعد غداً الساعة 10:15 صباحاً — هل أؤكده؟',
        system: 'تم تسجيل التذكرة #GOV-419 · وحجز الموعد',
      },
    },
  },
  {
    slug: 'travel-tourism',
    href: '/industries/travel-tourism',
    category: 'hospitality-travel',
    accent: '#0E9A9E',
    en: {
      title: 'Travel & Tourism',
      tagline: 'Travel agencies · Tour operators · DMCs',
      summary: 'Tour bookings, hotel reservations, visa guidance, flight inquiries, and curated package recommendations.',
      useCases: [
        'Tour bookings',
        'Hotel reservations',
        'Visa information',
        'Flight inquiries',
        'Package recommendations',
      ],
      sampleChat: {
        guest: 'Looking for a 4-night family package to Istanbul next month including flights and hotel.',
        agent: 'Our 4-night Istanbul package starts at QAR 3,490/person with 5-star Bosphorus hotel & return flights. Shall I send the itinerary?',
        system: 'Package quote generated · Travel consultant assigned',
      },
    },
    ar: {
      title: 'السفر والسياحة',
      tagline: 'وكالات السفر · منظمو الرحلات · السياحة',
      summary: 'حجز الجولات السياحية، حجوزات الفنادق، معلومات التأشيرات، استفسارات الطيران، وتوصيات الباقات.',
      useCases: [
        'حجز الجولات السياحية',
        'حجوزات الفنادق',
        'معلومات التأشيرات',
        'استفسارات الطيران',
        'توصيات الباقات السياحية',
      ],
      sampleChat: {
        guest: 'أبحث عن باقة عائلية 4 ليالٍ إلى إسطنبول الشهر القادم شاملة الطيران والفندق.',
        agent: 'باقة إسطنبول 4 ليالٍ تبدأ من 3,490 ر.ق/شخص بفندق 5 نجوم وطيران ذهاب وعودة. هل أرسل البرنامج؟',
        system: 'تم إنشاء عرض الباقة · وتعيين مستشار السفر',
      },
    },
  },
  {
    slug: 'logistics-delivery',
    href: '/industries/logistics-delivery',
    category: 'enterprise-public',
    accent: '#1A63D8',
    en: {
      title: 'Logistics & Delivery',
      tagline: 'Couriers · Last-mile · Freight & warehousing',
      summary: 'Real-time shipment tracking, pickup scheduling, delivery ETA updates, and automated customer support.',
      useCases: [
        'Shipment tracking',
        'Pickup scheduling',
        'Delivery updates',
        'Customer support',
      ],
      sampleChat: {
        guest: 'Where is my shipment #AWB-77492? Can we change delivery to after 6 PM?',
        agent: 'Shipment #AWB-77492 is out for delivery in Doha. I’ve updated your delivery window to 6:00–9:00 PM today.',
        system: 'Dispatch window updated in courier system · Driver notified',
      },
    },
    ar: {
      title: 'اللوجستيات والتوصيل',
      tagline: 'شركات الشحن · التوصيل السريع · المستودعات',
      summary: 'تتبع الشحنات لحظياً، جدولة الاستلام، تحديثات التوصيل، وخدمة العملاء التلقائية.',
      useCases: [
        'تتبع الشحنات',
        'جدولة الاستلام',
        'تحديثات التوصيل',
        'دعم العملاء',
      ],
      sampleChat: {
        guest: 'أين وصلت شحنتي #AWB-77492؟ وهل يمكن تأجيل التسليم لبعد الساعة 6 مساءً؟',
        agent: 'الشحنة #AWB-77492 في طريقها للتسليم بالدوحة. تم تحديث وقت التسليم إلى 6:00–9:00 مساءً اليوم.',
        system: 'تم تحديث نافذة التسليم · وإشعار السائق',
      },
    },
  },
  {
    slug: 'construction',
    href: '/industries/construction',
    category: 'enterprise-public',
    accent: '#F59E0B',
    en: {
      title: 'Construction',
      tagline: 'Contractors · Engineering · Suppliers',
      summary: 'Project inquiries, contractor support, material requisition routing, and vendor coordination.',
      useCases: [
        'Project inquiries',
        'Contractor support',
        'Material requests',
        'Vendor coordination',
      ],
      sampleChat: {
        guest: 'Need 40 tons of rebar delivered to Lusail Site B by Thursday 7 AM.',
        agent: 'Requisition logged for Lusail Site B (40t rebar, Thu 7 AM). Our procurement lead will confirm dispatch within 15 minutes.',
        system: 'Material request #MR-512 routed to Procurement & Site Lead',
      },
    },
    ar: {
      title: 'المقاولات والإنشاءات',
      tagline: 'شركات المقاولات · الهندسة · الموردون',
      summary: 'استفسارات المشاريع، دعم المقاولين، توجيه طلبات المواد، والتنسيق مع الموردين.',
      useCases: [
        'استفسارات المشاريع',
        'دعم المقاولين',
        'طلبات المواد',
        'تنسيق الموردين',
      ],
      sampleChat: {
        guest: 'نحتاج توريد 40 طن حديد تسليح لموقع لوسيل B يوم الخميس الساعة 7 صباحاً.',
        agent: 'تم تسجيل الطلب لموقع لوسيل B. سيؤكد مسؤول المشتريات جدول التوريد خلال 15 دقيقة.',
        system: 'تم توجيه طلب المواد #MR-512 للمشتريات ومدير الموقع',
      },
    },
  },
  {
    slug: 'hr-recruitment',
    href: '/industries/hr-recruitment',
    category: 'enterprise-public',
    accent: '#6F4BF2',
    en: {
      title: 'HR & Recruitment',
      tagline: 'Talent teams · Staffing agencies · Internal HR',
      summary: 'Automated candidate screening, interview scheduling, employee helpdesk, and instant HR policy FAQs.',
      useCases: [
        'Candidate screening',
        'Interview scheduling',
        'Employee helpdesk',
        'HR FAQs',
      ],
      sampleChat: {
        guest: 'Hi, I applied for the Operations Coordinator role — when can I schedule my interview?',
        agent: 'Thanks for applying! Your profile passed initial screening. Pick Tuesday 11:00 AM or Wednesday 2:00 PM for your video interview.',
        system: 'Candidate screened · Calendar invite link sent',
      },
    },
    ar: {
      title: 'الموارد البشرية والتوظيف',
      tagline: 'فرق التوظيف · الوكالات · خدمة الموظفين',
      summary: 'فرز المرشحين تلقائياً، جدولة المقابلات، مكتب مساعدة الموظفين، والرد الفوري على سياسات الموارد البشرية.',
      useCases: [
        'فرز المرشحين',
        'جدولة المقابلات',
        'مكتب مساعدة الموظفين',
        'الأسئلة الشائعة للموارد البشرية',
      ],
      sampleChat: {
        guest: 'مرحباً، تقدمت لوظيفة منسق عمليات — متى يمكنني جدولة المقابلة؟',
        agent: 'شكراً لتقديمك! تم قبول ملفك مبدئياً. يمكنك اختيار الثلاثاء 11:00 صباحاً أو الأربعاء 2:00 ظهراً للمقابلة.',
        system: 'تم فرز المرشح · وإرسال رابط جدولة المقابلة',
      },
    },
  },
  {
    slug: 'legal-firms',
    href: '/industries/legal-firms',
    category: 'enterprise-public',
    accent: '#1A63D8',
    en: {
      title: 'Legal Firms',
      tagline: 'Law firms · Corporate counsel · Notary desks',
      summary: 'Confidential client intake, consultation booking, case status updates, and document requirement checklists.',
      useCases: [
        'Client intake',
        'Consultation booking',
        'Case updates',
        'Document requirements',
      ],
      sampleChat: {
        guest: 'I need a corporate contract review consultation this week — what should I bring?',
        agent: 'I’ve reserved a 30-min consultation with our corporate partner for Wednesday at 1:00 PM. Please bring your draft agreement & CR.',
        system: 'Confidential intake #LG-208 logged · Conflict check queued',
      },
    },
    ar: {
      title: 'مكاتب المحاماة والاستشارات القانونية',
      tagline: 'شركات المحاماة · المستشارون · التوثيق',
      summary: 'استقبال العملاء بسرية، حجز الاستشارات، متابعة القضايا، وقوائم المستندات المطلوبة.',
      useCases: [
        'استقبال العملاء',
        'حجز الاستشارات',
        'تحديثات القضايا',
        'متطلبات المستندات',
      ],
      sampleChat: {
        guest: 'أحتاج استشارة لمراجعة عقد تجاري هذا الأسبوع — ما المستندات المطلوبة؟',
        agent: 'تم حجز استشارة 30 دقيقة يوم الأربعاء الساعة 1:00 ظهراً. يرجى إحضار مسودة العقد والسجل التجاري.',
        system: 'تم تسجيل الطلب السري #LG-208 · وجدولة المراجعة',
      },
    },
  },
]
