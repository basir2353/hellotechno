import type { IndustryId, Locale } from "@/lib/i18n";
import { images, routes } from "@/lib/site";

type Copy = { en: string; ar: string };

export const scenarioMeta: Record<
  IndustryId,
  { systems: string; role: Copy }
> = {
  hospitality: {
    systems: "OPERA Cloud · SiteMinder",
    role: { en: "Reservations & Guest Care", ar: "الحجوزات ورعاية الضيوف" },
  },
  clinics: {
    systems: "Clinic diary · WhatsApp Business",
    role: { en: "Patient Care", ar: "رعاية المرضى" },
  },
  dining: {
    systems: "SevenRooms · Foodics",
    role: { en: "Reservations & Orders", ar: "الحجوزات والطلبات" },
  },
  bakeries: {
    systems: "Foodics · deposit links",
    role: { en: "Orders & Custom Quotes", ar: "الطلبات والعروض المخصصة" },
  },
  smb: {
    systems: "Diary · payment links",
    role: { en: "Front Desk", ar: "الاستقبال" },
  },
};

export type ScenarioLine = {
  who: "guest" | "agent";
  text: Copy;
};

export type ScenarioScript = {
  path: Copy;
  system: Copy;
  lines: ScenarioLine[];
};

/** Per industry × use-case chat scripts for the home “See it live” simulation. */
export const scenarioScripts: Record<IndustryId, ScenarioScript[]> = {
  hospitality: [
    {
      path: { en: "WhatsApp · English · Marsa Al Bandar", ar: "واتساب · العربية · مرسي البندر" },
      system: {
        en: "Late checkout confirmed and charged to the room in OPERA Cloud",
        ar: "أُكدت المغادرة المتأخرة وحُمّلت على الغرفة في OPERA Cloud",
      },
      lines: [
        { who: "guest", text: { en: "Can I check out at 2 pm tomorrow?", ar: "هل يمكنني المغادرة غدًا الساعة 2؟" } },
        {
          who: "agent",
          text: {
            en: "Yes — late checkout until 2 pm is AED 120, charged to the room. Shall I confirm?",
            ar: "نعم — المغادرة المتأخرة حتى 2 بمبلغ 120 درهمًا على الغرفة. نؤكد؟",
          },
        },
        { who: "guest", text: { en: "Confirm, and add a spa slot if free.", ar: "أكدوا وأضيفوا سبا إن توفر." } },
        {
          who: "agent",
          text: {
            en: "Confirmed. Checkout moved, and the 4 pm hammam is held. Anything else?",
            ar: "تم. نُقلت المغادرة وحُجز الحمام الساعة 4. شيء آخر؟",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Marsa Al Bandar", ar: "واتساب · العربية · مرسي البندر" },
      system: {
        en: "Housekeeping job #4821 opened in HotSOS",
        ar: "فُتحت مهمة التدبير المنزلي رقم 4821 في HotSOS",
      },
      lines: [
        { who: "guest", text: { en: "We need extra towels and the AC is too cold.", ar: "نحتاج مناشف إضافية والمكيف بارد جدًا." } },
        {
          who: "agent",
          text: {
            en: "On it — towels and a tech check for the AC, room 1204. Expect them within 12 minutes.",
            ar: "تم — مناشف وفحص للمكيف، غرفة 1204. خلال 12 دقيقة تقريبًا.",
          },
        },
        { who: "guest", text: { en: "Also soft pillows if you have them.", ar: "وأيضًا وسائد ناعمة إن وجدت." } },
        {
          who: "agent",
          text: {
            en: "Added soft pillows to the same job. You’ll get a WhatsApp when housekeeping closes it.",
            ar: "أُضيفت الوسائد الناعمة لنفس المهمة. سيصلك واتساب عند الإغلاق.",
          },
        },
      ],
    },
    {
      path: { en: "Web chat · English · Marsa Al Bandar", ar: "دردشة الويب · العربية · مرسي البندر" },
      system: {
        en: "Spa slot held and charged to the room folio",
        ar: "حُجز موعد السبا وحُمّل على فاتورة الغرفة",
      },
      lines: [
        { who: "guest", text: { en: "Any hammam slots this evening for two?", ar: "هل يتوفر حمام لشخصين هذا المساء؟" } },
        {
          who: "agent",
          text: {
            en: "7:30 pm is open for two, AED 380 total, charged to the room. Hold it?",
            ar: "7:30 متاح لاثنين، 380 درهمًا الإجمالي على الغرفة. أحجز؟",
          },
        },
        { who: "guest", text: { en: "Yes, under Al Mansouri.", ar: "نعم، باسم المنصوري." } },
        {
          who: "agent",
          text: {
            en: "Held for Al Mansouri at 7:30. Confirmation is in this chat.",
            ar: "حُجز للمنصوري الساعة 7:30. التأكيد في هذه المحادثة.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Marsa Al Bandar", ar: "واتساب · العربية · مرسي البندر" },
      system: {
        en: "Recovery case opened and duty manager alerted",
        ar: "فُتحت حالة استعادة ونُبّه مدير المناوبة",
      },
      lines: [
        { who: "guest", text: { en: "The room wasn’t ready and we waited 40 minutes.", ar: "الغرفة لم تكن جاهزة وانتظرنا 40 دقيقة." } },
        {
          who: "agent",
          text: {
            en: "I’m sorry — I’ve flagged this to the duty manager now. Can I offer a late checkout and a dining credit?",
            ar: "آسفون — نبّهنا مدير المناوبة الآن. هل نقدم مغادرة متأخرة ورصيد مطعم؟",
          },
        },
        { who: "guest", text: { en: "Late checkout yes, and something for the kids.", ar: "المغادرة المتأخرة نعم، وشيء للأطفال." } },
        {
          who: "agent",
          text: {
            en: "Late checkout confirmed, plus kids’ ice cream at the lobby café on us. Manager will follow up in person.",
            ar: "أُكدت المغادرة المتأخرة، مع آيس كريم للأطفال في مقهى اللوبي على حسابنا. سيتابع المدير شخصيًا.",
          },
        },
      ],
    },
  ],
  clinics: [
    {
      path: { en: "Instagram DM · English · Aya Aesthetics", ar: "إنستغرام · العربية · آية للتجميل" },
      system: {
        en: "Consult held in the clinic diary for Saturday 11:30",
        ar: "حُجزت الاستشارة في يومية العيادة للسبت 11:30",
      },
      lines: [
        { who: "guest", text: { en: "How much is a whitening consult?", ar: "كم سعر استشارة التبييض؟" } },
        {
          who: "agent",
          text: {
            en: "Consults are AED 150, credited if you book treatment within 14 days. Saturday 11:30 is open — hold it?",
            ar: "الاستشارة 150 درهمًا وتُخصم خلال 14 يومًا. السبت 11:30 متاح — أحجز؟",
          },
        },
        { who: "guest", text: { en: "Yes, Saturday works.", ar: "نعم، السبت مناسب." } },
        {
          who: "agent",
          text: {
            en: "Booked. Confirmation and prep notes are on WhatsApp.",
            ar: "تم الحجز. التأكيد وملاحظات التحضير على واتساب.",
          },
        },
      ],
    },
    {
      path: { en: "Voice · English · Aya Aesthetics", ar: "صوت · العربية · آية للتجميل" },
      system: {
        en: "Callback logged; Saturday slot offered from the live diary",
        ar: "سُجّل اتصال عائد وعُرض موعد السبت من اليومية الحية",
      },
      lines: [
        { who: "guest", text: { en: "Do you have anything this Saturday morning?", ar: "هل لديكم موعد صباح السبت؟" } },
        {
          who: "agent",
          text: {
            en: "Yes — 10:00 with Dr. Hana for a new-patient consult. Shall I hold it on your mobile?",
            ar: "نعم — 10:00 مع د. هناء لاستشارة مريض جديد. أحجزه على جوالك؟",
          },
        },
        { who: "guest", text: { en: "Hold it please.", ar: "احجزوه من فضلكم." } },
        {
          who: "agent",
          text: {
            en: "Held. You’ll get SMS and WhatsApp with the clinic pin and prep notes.",
            ar: "تم الحجز. سيصلك SMS وواتساب بموقع العيادة وملاحظات التحضير.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Aya Aesthetics", ar: "واتساب · العربية · آية للتجميل" },
      system: {
        en: "No-show recovery thread opened; same-week slot offered",
        ar: "فُتحت متابعة الاستعادة وعُرض موعد في نفس الأسبوع",
      },
      lines: [
        { who: "guest", text: { en: "Sorry I missed yesterday’s appointment.", ar: "آسفة فاتني موعد الأمس." } },
        {
          who: "agent",
          text: {
            en: "No problem — Thursday 4:15 is free with the same clinician. Want me to move you there?",
            ar: "لا بأس — الخميس 4:15 متاح مع نفس الطبيبة. أنقلك إليه؟",
          },
        },
        { who: "guest", text: { en: "Yes, move it.", ar: "نعم، انقلوه." } },
        {
          who: "agent",
          text: {
            en: "Moved. Reminder goes out the evening before. See you Thursday.",
            ar: "تم النقل. التذكير مساء اليوم السابق. نراكِ الخميس.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Aya Aesthetics", ar: "واتساب · العربية · آية للتجميل" },
      system: {
        en: "Day-3 aftercare check sent; clinical keywords routed to staff",
        ar: "أُرسلت متابعة اليوم 3؛ والكلمات السريرية وُجّهت للفريق",
      },
      lines: [
        { who: "guest", text: { en: "Is mild swelling normal after fillers?", ar: "هل التورم الخفيف طبيعي بعد الفيلر؟" } },
        {
          who: "agent",
          text: {
            en: "Mild swelling in the first 48 hours is common per your aftercare sheet. Any pain, fever or vision changes?",
            ar: "التورم الخفيف خلال 48 ساعة شائع وفق ورقة المتابعة. أي ألم أو حمى أو تغيّر في الرؤية؟",
          },
        },
        { who: "guest", text: { en: "Just swelling, no pain.", ar: "تورم فقط بلا ألم." } },
        {
          who: "agent",
          text: {
            en: "Noted. Keep icing as advised. I’ve flagged your thread so the nurse can review if anything changes.",
            ar: "تم. استمري بالثلج كما نُصح. نبّهنا الممرضة لمراجعة المحادثة إن تغيّر شيء.",
          },
        },
      ],
    },
  ],
  dining: [
    {
      path: { en: "WhatsApp · English · Qahwa & Crumb", ar: "واتساب · العربية · قهوة وكرمب" },
      system: {
        en: "Table for 6 held at 8:15 on the terrace in SevenRooms",
        ar: "حُجزت طاولة لستة الساعة 8:15 على التراس في SevenRooms",
      },
      lines: [
        { who: "guest", text: { en: "Table for 6 tonight around 8?", ar: "طاولة لستة الليلة حوالي 8؟" } },
        {
          who: "agent",
          text: {
            en: "I can hold the terrace at 8:15 for six. Deposit AED 100/guest. Confirm?",
            ar: "يمكن حجز التراس 8:15 لستة. عربون 100 درهم للشخص. نؤكد؟",
          },
        },
        { who: "guest", text: { en: "Confirm, one vegetarian.", ar: "أكدوا مع نباتي واحد." } },
        {
          who: "agent",
          text: {
            en: "Done — table held, deposit link sent, kitchen noted.",
            ar: "تم — الطاولة محجوزة ورابط العربون أُرسل والمطبخ أُعلم.",
          },
        },
      ],
    },
    {
      path: { en: "Voice · English · Qahwa & Crumb", ar: "صوت · العربية · قهوة وكرمب" },
      system: {
        en: "Order written into Foodics; ETA 35 minutes",
        ar: "كُتب الطلب في Foodics؛ الوصول خلال 35 دقيقة",
      },
      lines: [
        { who: "guest", text: { en: "Two margheritas and a Caesar, delivery to JLT.", ar: "مارغريتا اثنتان وسيزر، توصيل لـ JLT." } },
        {
          who: "agent",
          text: {
            en: "Got it — 2 margheritas, 1 Caesar. Delivery zone OK, AED 12 fee, about 35 minutes. Confirm?",
            ar: "تم — مارغريتا×2 وسيزر. المنطقة متاحة، رسوم 12 درهمًا، حوالي 35 دقيقة. نؤكد؟",
          },
        },
        { who: "guest", text: { en: "Confirm, extra chili oil.", ar: "أكدوا مع زيت فلفل إضافي." } },
        {
          who: "agent",
          text: {
            en: "Confirmed in the POS with chili oil. Tracking link is on WhatsApp.",
            ar: "أُكد في نقطة البيع مع زيت الفلفل. رابط التتبع على واتساب.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Qahwa & Crumb", ar: "واتساب · العربية · قهوة وكرمب" },
      system: {
        en: "Live ETA pushed from the courier partner",
        ar: "أُرسل الوقت الحي من شريك التوصيل",
      },
      lines: [
        { who: "guest", text: { en: "Where is my order #1842?", ar: "أين طلبي رقم 1842؟" } },
        {
          who: "agent",
          text: {
            en: "Rider is 8 minutes out — pin is updated in this chat. Anything missing when it arrives, tell me here.",
            ar: "المندوب بعد 8 دقائق — الموقع محدّث هنا. إن نقص شيء عند الوصول أخبرني هنا.",
          },
        },
        { who: "guest", text: { en: "Thanks, waiting downstairs.", ar: "شكرًا، أنتظر بالأسفل." } },
        {
          who: "agent",
          text: {
            en: "Noted — I’ve told the rider you’re at the lobby.",
            ar: "تم — أخبرنا المندوب أنك في اللوبي.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Qahwa & Crumb", ar: "واتساب · العربية · قهوة وكرمب" },
      system: {
        en: "Iftar set for 18 quoted; deposit link sent",
        ar: "عُرض إفطار لـ 18؛ وأُرسل رابط العربون",
      },
      lines: [
        { who: "guest", text: { en: "Iftar for 18 next Thursday?", ar: "إفطار لـ 18 الخميس القادم؟" } },
        {
          who: "agent",
          text: {
            en: "We can do the terrace iftar set at AED 165/guest, 6:45 seating. 30% deposit holds it. Share a menu?",
            ar: "يمكن إفطار التراس بـ 165 درهمًا للشخص، جلوس 6:45. عربون 30% يحجز. أرسل القائمة؟",
          },
        },
        { who: "guest", text: { en: "Yes, and two kids’ portions.", ar: "نعم، مع وجبتين للأطفال." } },
        {
          who: "agent",
          text: {
            en: "Quoted with two kids’ plates. Deposit link is in this chat — once paid, the date is locked.",
            ar: "عُرض مع وجبتين للأطفال. رابط العربون هنا — بعد الدفع يُقفل الموعد.",
          },
        },
      ],
    },
  ],
  bakeries: [
    {
      path: { en: "Instagram · English · Crumb Oven", ar: "إنستغرام · العربية · فرن الكرمب" },
      system: {
        en: "Cake date held; 40% deposit link sent",
        ar: "حُجز تاريخ الكعكة؛ وأُرسل رابط عربون 40%",
      },
      lines: [
        { who: "guest", text: { en: "Two-tier birthday cake for Friday, 20 servings?", ar: "كعكة طابقين ليوم الجمعة لـ 20؟" } },
        {
          who: "agent",
          text: {
            en: "Friday is open. Vanilla sponge with berry filling is AED 320. 40% deposit locks the date.",
            ar: "الجمعة متاح. فانيليا بحشوة التوت 320 درهمًا. عربون 40% يحجز التاريخ.",
          },
        },
        { who: "guest", text: { en: "Write 'Happy 30th Amira' on top.", ar: "اكتبوا Happy 30th Amira." } },
        {
          who: "agent",
          text: {
            en: "Noted. Deposit link is in this chat — once paid, the date is held.",
            ar: "تم. رابط العربون هنا — بعد الدفع يُحجز الموعد.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Crumb Oven", ar: "واتساب · العربية · فرن الكرمب" },
      system: {
        en: "Eid pre-order queued against Friday capacity",
        ar: "طُلب مسبق للعيد ضمن طاقة الجمعة",
      },
      lines: [
        { who: "guest", text: { en: "Can I pre-order maamoul for Eid Friday?", ar: "هل أحجز معمول لجمعة العيد؟" } },
        {
          who: "agent",
          text: {
            en: "Friday cut-off is Wednesday 6 pm. 2kg box is AED 95. Want JLT or Marina pickup?",
            ar: "آخر موعد الأربعاء 6 مساءً. علبة 2 كغ بـ 95 درهمًا. استلام JLT أم المارينا؟",
          },
        },
        { who: "guest", text: { en: "Marina, please.", ar: "المارينا من فضلكم." } },
        {
          who: "agent",
          text: {
            en: "Reserved against Marina capacity. Payment link locks your box.",
            ar: "حُجز ضمن طاقة المارينا. رابط الدفع يقفل العلبة.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Crumb Oven", ar: "واتساب · العربية · فرن الكرمب" },
      system: {
        en: "Live stock checked; next bake offered at City Walk",
        ar: "فُحص المخزون الحي؛ وعُرض الخبز التالي في سيتي ووك",
      },
      lines: [
        { who: "guest", text: { en: "Any pistachio croissants left at JLT?", ar: "هل بقي كرواسون فستق في JLT؟" } },
        {
          who: "agent",
          text: {
            en: "JLT is sold out. City Walk has 6, or the next JLT bake is 3:30. Hold two at City Walk?",
            ar: "JLT نفد. سيتي ووك فيه 6، أو خبز JLT التالي 3:30. أحجز اثنين في سيتي ووك؟",
          },
        },
        { who: "guest", text: { en: "Hold two at City Walk.", ar: "احجزوا اثنين في سيتي ووك." } },
        {
          who: "agent",
          text: {
            en: "Held for 45 minutes under your number. Show this chat at the counter.",
            ar: "محجوز 45 دقيقة على رقمك. أظهر هذه المحادثة عند الكاونتر.",
          },
        },
      ],
    },
    {
      path: { en: "Email · English · Crumb Oven", ar: "بريد · العربية · فرن الكرمب" },
      system: {
        en: "Corporate brief captured; VAT quote drafted",
        ar: "التُقط ملخص الشركة؛ وأُعد عرض ضريبة",
      },
      lines: [
        { who: "guest", text: { en: "Need 80 boxed lunches Thursday, branded stickers.", ar: "نحتاج 80 غداء معلب الخميس مع ملصقات." } },
        {
          who: "agent",
          text: {
            en: "Thursday works if confirmed by Tuesday. AED 28/box incl. sticker. Split delivery to two towers?",
            ar: "الخميس ممكن إن أُكد الثلاثاء. 28 درهمًا للعلبة مع الملصق. توصيل لبرجين؟",
          },
        },
        { who: "guest", text: { en: "Yes, DIFC and Business Bay.", ar: "نعم، DIFC وBusiness Bay." } },
        {
          who: "agent",
          text: {
            en: "Brief complete with split drops. VAT quote and deposit link are attached in this thread.",
            ar: "اكتمل الملخص مع التوصيلين. عرض الضريبة ورابط العربون في هذه المحادثة.",
          },
        },
      ],
    },
  ],
  smb: [
    {
      path: { en: "WhatsApp · English · Atelier Salon", ar: "واتساب · العربية · صالون الأتيليه" },
      system: {
        en: "Saturday 2:30 balayage held with Sara",
        ar: "حُجز بالياج السبت 2:30 مع سارة",
      },
      lines: [
        { who: "guest", text: { en: "Any balayage slots Saturday afternoon?", ar: "هل يوجد بالياج بعد ظهر السبت؟" } },
        {
          who: "agent",
          text: {
            en: "2:30 with Sara, 3 hours, AED 480. Reminder the day before?",
            ar: "2:30 مع سارة، 3 ساعات، 480 درهمًا. تذكير قبلها بيوم؟",
          },
        },
        { who: "guest", text: { en: "Book it please.", ar: "احجزوه من فضلكم." } },
        {
          who: "agent",
          text: {
            en: "Booked. Payment link is here if you want to secure it now.",
            ar: "تم. رابط الدفع هنا لتأمين الحجز الآن.",
          },
        },
      ],
    },
    {
      path: { en: "Instagram · English · Atelier Salon", ar: "إنستغرام · العربية · صالون الأتيليه" },
      system: {
        en: "Order closed; payment link sent in-thread",
        ar: "أُغلق الطلب؛ وأُرسل رابط الدفع في المحادثة",
      },
      lines: [
        { who: "guest", text: { en: "Is the olive hair oil in stock for Riyadh delivery?", ar: "هل زيت الزيتون متوفر للتوصيل للرياض؟" } },
        {
          who: "agent",
          text: {
            en: "Yes — 2 left. AED 145 + AED 25 delivery to Riyadh, 2–3 days. Want the payment link?",
            ar: "نعم — بقي اثنان. 145 درهمًا + 25 توصيل للرياض خلال 2–3 أيام. أرسل رابط الدفع؟",
          },
        },
        { who: "guest", text: { en: "Send it.", ar: "أرسلوه." } },
        {
          who: "agent",
          text: {
            en: "Link sent. Once paid, you’ll get tracking on WhatsApp.",
            ar: "أُرسل الرابط. بعد الدفع يصلك التتبع على واتساب.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Gulf Drive Rentals", ar: "واتساب · العربية · خليج درايف" },
      system: {
        en: "Weekend SUV quote issued; deposit holds the car",
        ar: "عُرض سعر SUV للويكند؛ العربون يحجز السيارة",
      },
      lines: [
        { who: "guest", text: { en: "SUV for Friday–Sunday, Dubai Marina pickup?", ar: "SUV من الجمعة للأحد، استلام المارينا؟" } },
        {
          who: "agent",
          text: {
            en: "X-Trail is free that weekend, AED 420/day incl. basic insurance. Marina pickup 10 am. Hold with 20% deposit?",
            ar: "X-Trail متاح، 420 درهمًا/يوم مع التأمين الأساسي. استلام المارينا 10 ص. نحجز بعربون 20%؟",
          },
        },
        { who: "guest", text: { en: "Yes, hold it.", ar: "نعم، احجزوها." } },
        {
          who: "agent",
          text: {
            en: "Held. Deposit link and license checklist are in this chat.",
            ar: "محجوزة. رابط العربون وقائمة الرخصة في هذه المحادثة.",
          },
        },
      ],
    },
    {
      path: { en: "WhatsApp · English · Pulse Gym", ar: "واتساب · العربية · بولس جيم" },
      system: {
        en: "Membership freeze applied for travel dates",
        ar: "طُبّق تجميد العضوية لتواريخ السفر",
      },
      lines: [
        { who: "guest", text: { en: "Can I freeze my membership for two weeks while I travel?", ar: "هل أجمّد عضويتي لأسبوعين أثناء السفر؟" } },
        {
          who: "agent",
          text: {
            en: "Yes — one freeze up to 14 days per year on your plan. Share your travel dates?",
            ar: "نعم — تجميد واحد حتى 14 يومًا سنويًا على خطتك. ما تواريخ السفر؟",
          },
        },
        { who: "guest", text: { en: "12–25 April.", ar: "12–25 أبريل." } },
        {
          who: "agent",
          text: {
            en: "Freeze set 12–25 April. Billing pauses and your access resumes on the 26th automatically.",
            ar: "التجميد من 12–25 أبريل. تتوقف الفوترة ويعود الدخول تلقائيًا يوم 26.",
          },
        },
      ],
    },
  ],
};

export const playbookMeta: Record<IndustryId, { systems: string; sla: Copy }[]> = {
  hospitality: [
    { systems: "OPERA Cloud · Mews · SiteMinder", sla: { en: "Replies in under 5 seconds", ar: "يرد خلال أقل من 5 ثوانٍ" } },
    { systems: "HotSOS · Alice · PMS", sla: { en: "Requests dispatched in under a minute", ar: "تُرسل الطلبات خلال أقل من دقيقة" } },
    { systems: "SevenRooms · spa calendar", sla: { en: "Booked in chat, charged to the room", ar: "يُحجز في الدردشة ويُحمّل على الغرفة" } },
    { systems: "PMS notes · review alerts", sla: { en: "Guest reached within 20 minutes", ar: "يُتواصل مع الضيف خلال 20 دقيقة" } },
  ],
  clinics: [
    { systems: "Clinic PMS · Google Calendar", sla: { en: "Replies in under 5 seconds", ar: "يرد خلال أقل من 5 ثوانٍ" } },
    { systems: "Your phone line · PMS diary", sla: { en: "Answers before the third ring", ar: "يرد قبل الرنة الثالثة" } },
    { systems: "PMS diary · WhatsApp Business", sla: { en: "First recovery message in 15 minutes", ar: "أول رسالة استعادة خلال 15 دقيقة" } },
    { systems: "PMS recall list · treatment records", sla: { en: "Checks in on day 1, 3 and 7", ar: "متابعة في اليوم 1 و3 و7" } },
  ],
  dining: [
    { systems: "SevenRooms · Foodics · Instagram DM", sla: { en: "Replies in under 5 seconds", ar: "يرد خلال أقل من 5 ثوانٍ" } },
    { systems: "Foodics · Square · Toast", sla: { en: "Answers on the first ring", ar: "يرد من أول رنة" } },
    { systems: "Delivery zones · pickup queue", sla: { en: "Status without a phone call", ar: "الحالة بلا مكالمة" } },
    { systems: "SevenRooms · deposit links", sla: { en: "Group quote in minutes", ar: "عرض المجموعة خلال دقائق" } },
  ],
  bakeries: [
    { systems: "Instagram DM · deposit links", sla: { en: "Quote in minutes, not tomorrow", ar: "عرض خلال دقائق لا غدًا" } },
    { systems: "Foodics · branch capacity", sla: { en: "Capacity respected, not overpromised", ar: "تُحترم الطاقة بلا مبالغة" } },
    { systems: "Foodics · Square", sla: { en: "Never sells what has sold out", ar: "لا يبيع ما نفد" } },
    { systems: "Invoicing · email", sla: { en: "A complete brief, every time", ar: "ملخص كامل في كل مرة" } },
  ],
  smb: [
    { systems: "Fresha · Booksy · Google Calendar", sla: { en: "Replies in under 5 seconds", ar: "يرد خلال أقل من 5 ثوانٍ" } },
    { systems: "Shopify · Salla · Zid", sla: { en: "Order closed in under 2 minutes", ar: "يُغلق الطلب خلال أقل من دقيقتين" } },
    { systems: "WhatsApp Business · your price list", sla: { en: "Quote in minutes, not tomorrow", ar: "عرض خلال دقائق لا غدًا" } },
    { systems: "Glofox · Mindbody · your CRM", sla: { en: "Every renewal chased on time", ar: "كل تجديد يُتابع في وقته" } },
  ],
};

export const playbookLive: Record<
  IndustryId,
  { href: string; title: Copy; body: Copy; explore: Copy }
> = {
  hospitality: {
    href: routes.hospitality,
    title: { en: "Try the hospitality agent live", ar: "جرّب وكيل الضيافة مباشرة" },
    body: {
      en: "Ask for a late checkout, a table or a spa slot and see it answer in Arabic or English, then watch the request land with the right team.",
      ar: "اطلب مغادرة متأخرة أو طاولة أو موعد سبا وشاهد الرد بالعربية أو الإنجليزية، ثم وصول الطلب للفريق المناسب.",
    },
    explore: { en: "Explore the hospitality platform", ar: "استكشف منصة الضيافة" },
  },
  clinics: {
    href: routes.aesthetics,
    title: { en: "Try the clinic agent live", ar: "جرّب وكيل العيادة مباشرة" },
    body: {
      en: "Ask for a consult price, a Saturday slot or aftercare advice and see how it books, reassures and escalates clinical questions to your team.",
      ar: "اسأل عن سعر استشارة أو موعد سبت أو متابعة وشاهد كيف يحجز ويطمئن ويُصعّد الأسئلة السريرية لفريقك.",
    },
    explore: { en: "Explore the aesthetics and dental platform", ar: "استكشف منصة التجميل وطب الأسنان" },
  },
  dining: {
    href: routes.dining,
    title: { en: "Try the restaurant agent live", ar: "جرّب وكيل المطعم مباشرة" },
    body: {
      en: "Book a table for six, order a delivery or ask what is sold out tonight. It handles the conversation in Arabic or English, on your number and at your prices.",
      ar: "احجز طاولة لستة أو اطلب توصيلًا أو اسأل ماذا نفد الليلة. يدير المحادثة بالعربية أو الإنجليزية على رقمك وبأسعارك.",
    },
    explore: { en: "Explore the restaurants, cafes and bakeries platform", ar: "استكشف منصة المطاعم والمقاهي والمخابز" },
  },
  bakeries: {
    href: routes.dining,
    title: { en: "Try the bakery agent live", ar: "جرّب وكيل المخبز مباشرة" },
    body: {
      en: "Quote a two-tier birthday cake, check what is left at a branch or place a holiday pre-order. It prices, holds the date and sends the deposit link in the same conversation.",
      ar: "اطلب عرض كعكة طابقين أو تحقق من مخزون فرع أو احجز طلب موسم. يسعّر ويحجز التاريخ ويرسل رابط العربون في نفس المحادثة.",
    },
    explore: { en: "Explore the restaurants, cafes and bakeries platform", ar: "استكشف منصة المطاعم والمقاهي والمخابز" },
  },
  smb: {
    href: routes.smb,
    title: { en: "Try the small-business agent live", ar: "جرّب وكيل المنشآت مباشرة" },
    body: {
      en: "Book a Saturday appointment, ask whether a product is in stock, or pause a membership. It answers in Arabic or English and sends the payment link in the chat.",
      ar: "احجز موعد سبت أو اسأل عن توفر منتج أو أوقف عضوية. يرد بالعربية أو الإنجليزية ويرسل رابط الدفع في الدردشة.",
    },
    explore: { en: "Explore the small-business platform", ar: "استكشف منصة المنشآت الصغيرة والمتوسطة" },
  },
};

export const playbookImages: Record<IndustryId, string> = {
  hospitality: images.hospitality,
  clinics: images.clinics,
  dining: images.dining,
  bakeries: images.bakery,
  smb: images.smb,
};

export type Article = {
  slug: string;
  date: string;
  readMins: number;
  tag: Copy;
  title: Copy;
  excerpt: Copy;
  body: Copy[];
  /** News page timeline */
  day?: string;
  monthLabel?: string;
  fullDate?: string;
  year?: string;
  coverLabel?: Copy;
};

export const blogPosts: Article[] = [
  {
    slug: "agentic-ai-customer-service-gcc",
    date: "3 Nov 2026",
    readMins: 7,
    tag: { en: "Agentic AI", ar: "الذكاء الوكيلي" },
    title: {
      en: "Agentic AI Customer Service in the GCC: From Chatbots to AI Agents That Finish the Job",
      ar: "خدمة العملاء بالذكاء الوكيلي في الخليج: من روبوتات الدردشة إلى وكلاء ينهون المهمة",
    },
    excerpt: {
      en: "Why UAE and Saudi operators are moving past FAQ bots to agents that book, confirm and hand over — and what Gartner and Deloitte already flag for 2026.",
      ar: "لماذا ينتقل مشغّلو الإمارات والسعودية من روبوتات الأسئلة الشائعة إلى وكلاء يحجزون ويؤكدون ويسلّمون — وما يشير إليه غارتنر وديلويت لعام 2026.",
    },
    body: [
      {
        en: "Chatbots answer. Agentic systems finish the job: they check availability, write into your PMS or POS, send the confirmation, and only escalate when a person must decide.",
        ar: "روبوتات الدردشة ترد. الأنظمة الوكيلية تنهي المهمة: تتحقق من التوفر، وتكتب في نظامك، وترسل التأكيد، ولا تصعّد إلا عندما يجب أن يقرر شخص.",
      },
      {
        en: "Hello Techo runs that loop in Arabic and English for hotels, clinics, restaurants and multi-branch groups across the GCC — with your rates, your rules and your brand voice.",
        ar: "تشغّل Hello Techo هذه الحلقة بالعربية والإنجليزية للفنادق والعيادات والمطاعم والمجموعات متعددة الفروع في الخليج — بأسعارك وقواعدك وصوت علامتك.",
      },
    ],
  },
  {
    slug: "whatsapp-ai-agents-gcc-2026",
    date: "3 Nov 2026",
    readMins: 7,
    tag: { en: "WhatsApp AI", ar: "واتساب AI" },
    title: {
      en: "WhatsApp AI Agents for Customer Service in the GCC: The 2026 Guide for UAE and Saudi Businesses",
      ar: "وكلاء واتساب للذكاء الاصطناعي لخدمة العملاء في الخليج: دليل 2026 للإمارات والسعودية",
    },
    excerpt: {
      en: "How to run bookings, orders and recovery on your own WhatsApp number — without marketplace commissions or overnight leakage.",
      ar: "كيف تشغّل الحجوزات والطلبات والاستعادة على رقم واتسابك — بدون عمولات التطبيقات أو تسرب ليلي.",
    },
    body: [
      {
        en: "WhatsApp is where GCC customers already ask. The gap is not another chatbot layer — it is an agent that can hold a room, take a deposit and write the order into the system you already run.",
        ar: "واتساب هو حيث يسأل عملاء الخليج أصلًا. الفجوة ليست طبقة روبوت أخرى — بل وكيل يحجز غرفة ويأخذ عربونًا ويكتب الطلب في نظامك.",
      },
      {
        en: "Hello Techo answers on your number, respects sold-out and rate rules, and hands the thread to your team in one click when needed.",
        ar: "ترد Hello Techo على رقمك، وتحترم نفاد المخزون وقواعد الأسعار، وتسلّم المحادثة لفريقك بنقرة عندما يلزم.",
      },
    ],
  },
  {
    slug: "ai-customer-experience-hotels-clinics",
    date: "28 Oct 2026",
    readMins: 6,
    tag: { en: "AI customer experience", ar: "تجربة العملاء بالذكاء الاصطناعي" },
    title: {
      en: "AI Customer Experience for Hotels, Clinics and Restaurants: What Operators Should Measure",
      ar: "تجربة العملاء بالذكاء الاصطناعي للفنادق والعيادات والمطاعم: ما يجب أن يقيسه المشغّلون",
    },
    excerpt: {
      en: "Response time, completed bookings and human handovers — the three metrics that show whether AI is operating, not just replying.",
      ar: "زمن الرد والحجوزات المكتملة وتسليم البشر — ثلاثة مقاييس تبيّن إن كان الذكاء الاصطناعي يشغّل أم يرد فقط.",
    },
    body: [
      {
        en: "If your AI only replies, you still lose the overnight booking and the missed consult. Measure completion: booked, confirmed, recovered.",
        ar: "إذا كان ذكاؤك الاصطناعي يرد فقط، فستخسر الحجز الليلي والاستشارة الفائتة. قِس الإكمال: محجوز، مؤكد، مستعاد.",
      },
      {
        en: "Hello Techo surfaces those outcomes in one dashboard across WhatsApp, voice, web chat and Instagram.",
        ar: "تعرض Hello Techo هذه النتائج في لوحة واحدة عبر واتساب والصوت والدردشة وإنستغرام.",
      },
    ],
  },
  {
    slug: "overnight-booking-leakage",
    date: "12 Oct 2026",
    readMins: 5,
    tag: { en: "AI customer experience", ar: "تجربة العملاء بالذكاء الاصطناعي" },
    title: {
      en: "How overnight booking leakage happens — and how to stop it",
      ar: "كيف تتسرب الحجوزات ليلًا — وكيف توقفها",
    },
    excerpt: {
      en: "Practical steps to close the overnight booking gap without adding night staff.",
      ar: "خطوات عملية لإغلاق تسرب الحجوزات بعد منتصف الليل دون إضافة طاقم ليلي.",
    },
    body: [
      {
        en: "Most direct bookings that disappear overnight are not a website problem. The guest messages on WhatsApp or calls the front desk, nobody answers, and the OTA that is still awake takes the stay.",
        ar: "أغلب الحجوزات المباشرة التي تختفي ليلًا ليست مشكلة موقع. الضيف يراسل واتساب أو يتصل بالاستقبال، لا أحد يرد، ومنصة الحجز التي لا تنام تأخذ الإقامة.",
      },
      {
        en: "Hello Techo closes that gap by answering from your approved rates, holding the room in the system you already run, and handing the thread to the team when a rule says a person should decide.",
        ar: "تغلق Hello Techo هذه الفجوة بالرد من أسعارك المعتمدة، وحجز الغرفة في نظامك، وتسليم المحادثة للفريق عندما تقول القاعدة إن القرار لشخص.",
      },
    ],
  },
];

export const newsPosts: Article[] = [
  {
    slug: "bahrain-ai-partnership",
    date: "6 Nov 2026",
    fullDate: "6 November 2026",
    day: "6",
    monthLabel: "Nov 2026",
    year: "2026",
    readMins: 3,
    tag: { en: "Announcement", ar: "إعلان" },
    coverLabel: { en: "Partnership", ar: "شراكة" },
    title: {
      en: "Hello Techo Partners with Bahrains Ai for Technology in Bahrain",
      ar: "شراكة Hello Techo مع Bahrains Ai للتقنية في البحرين",
    },
    excerpt: {
      en: "The partnership brings Hello Techo’s AI customer experience platform to more Bahrain operators — with local go-to-market support and shared delivery for hotels, clinics and dining groups.",
      ar: "تجلب الشراكة منصة تجربة العملاء لـ Hello Techo لمزيد من مشغّلي البحرين — بدعم محلي وتسليم مشترك للفنادق والعيادات ومجموعات المطاعم.",
    },
    body: [
      {
        en: "Hello Techo and Bahrains Ai for Technology are partnering so Bahrain operators can deploy bilingual WhatsApp, voice and web agents with local support and shared delivery.",
        ar: "تتشارك Hello Techo وBahrains Ai for Technology ليتمكن مشغّلو البحرين من نشر وكلاء واتساب وصوت وويب ثنائيي اللغة بدعم محلي وتسليم مشترك.",
      },
      {
        en: "Hotels, clinics and restaurants keep their own rates, systems and brand voice — Hello Techo answers, books and hands over when a person must decide.",
        ar: "تحتفظ الفنادق والعيادات والمطاعم بأسعارها وأنظمتها وصوت علامتها — ترد Hello Techo وتحجز وتسلّم عندما يجب أن يقرر شخص.",
      },
    ],
  },
  {
    slug: "nvidia-inception",
    date: "21 Oct 2026",
    fullDate: "21 October 2026",
    day: "21",
    monthLabel: "Oct 2026",
    year: "2026",
    readMins: 2,
    tag: { en: "Announcement", ar: "إعلان" },
    coverLabel: { en: "Program", ar: "برنامج" },
    title: {
      en: "Hello Techo Selected for the NVIDIA Inception Program",
      ar: "اختيار Hello Techo لبرنامج NVIDIA Inception",
    },
    excerpt: {
      en: "NVIDIA Inception gives Hello Techo access to technical resources and go-to-market support as we scale AI agents for GCC operators.",
      ar: "يمنح NVIDIA Inception لـ Hello Techo موارد تقنية ودعمًا للانطلاق بينما نوسّع وكلاء الذكاء الاصطناعي لمشغّلي الخليج.",
    },
    body: [
      {
        en: "Selection into NVIDIA Inception supports the engineering and scale of Hello Techo’s AI customer experience platform across WhatsApp, voice, web chat and Instagram.",
        ar: "يدعم الانضمام إلى NVIDIA Inception هندسة وتوسّع منصة تجربة العملاء عبر واتساب والصوت والدردشة وإنستغرام.",
      },
    ],
  },
  {
    slug: "microsoft-for-startups",
    date: "8 Oct 2026",
    fullDate: "8 October 2026",
    day: "8",
    monthLabel: "Oct 2026",
    year: "2026",
    readMins: 3,
    tag: { en: "Announcement", ar: "إعلان" },
    coverLabel: { en: "Partnership", ar: "شراكة" },
    title: {
      en: "Hello Techo Accepted into Microsoft for Startups with USD 100K in Azure Credits",
      ar: "قبول Hello Techo في Microsoft for Startups مع 100 ألف دولار أرصدة Azure",
    },
    excerpt: {
      en: "Azure credits and Microsoft for Startups support help Hello Techo run bilingual agents securely for hotels, clinics and restaurants in the GCC.",
      ar: "تدعم أرصدة Azure وMicrosoft for Startups تشغيل وكلاء ثنائيي اللغة بأمان للفنادق والعيادات والمطاعم في الخليج.",
    },
    body: [
      {
        en: "Microsoft for Startups acceptance includes USD 100K in Azure credits to harden and scale Hello Techo’s governed AI customer experience stack.",
        ar: "يشمل قبول Microsoft for Startups 100 ألف دولار أرصدة Azure لتعزيز وتوسيع منصة تجربة العملاء المحكومة.",
      },
    ],
  },
];

export function pick(copy: Copy, locale: Locale) {
  return locale === "ar" ? copy.ar : copy.en;
}
