import { useState } from 'react'

import { useLocale } from '../lib/locale'
import { brand } from '../lib/site'

type DashStat = { label: string; val: string; sub: string }
type DashView = {
  title: string
  sub: string
  badge: string
  stats: DashStat[]
  leftTitle: string
  leftCount: string
  leftRows: string[][]
  rightTitle: string
  rightTag: string
  rightRows: [string, string][]
}

export function IndustryDashboard({
  kind,
}: {
  kind: 'aesthetics' | 'restaurants' | 'smb'
}) {
  const { locale } = useLocale()
  const en = locale === 'en'
  const [dashTab, setDashTab] = useState(0)

  const domainSlug =
    kind === 'aesthetics'
      ? 'app.hellotechno.ai / pearl-aesthetics-group'
      : kind === 'restaurants'
        ? 'app.hellotechno.ai / saffron-table-group'
        : 'app.hellotechno.ai / velvet-studio-qatar'

  const sideMeta =
    kind === 'aesthetics'
      ? en
        ? '3 clinics · 18 practitioners'
        : '3 عيادات · 18 طبيبًا'
      : kind === 'restaurants'
        ? en
          ? '4 branches · dine-in & delivery'
          : '4 فروع · صالة وتوصيل'
        : en
          ? '2 locations · services & orders'
          : 'موقعان · خدمات وطلبات'

  const entityCol =
    kind === 'aesthetics'
      ? en
        ? 'By clinic'
        : 'حسب العيادة'
      : kind === 'restaurants'
        ? en
          ? 'By branch'
          : 'حسب الفرع'
        : en
          ? 'By location'
          : 'حسب الموقع'

  const sampleRows =
    kind === 'aesthetics'
      ? [
          ['Pearl Aesthetics · West Bay', '640', '94%', '162', '38'],
          ['Pearl Dental · The Pearl', '412', '91%', '108', '24'],
          ['Medspa · Lusail', '238', '89%', '64', '18'],
        ]
      : kind === 'restaurants'
        ? [
            ['Saffron Table · Souq Waqif', '910', '95%', '284', '42'],
            ['Saffron Bakery · Msheireb', '520', '92%', '176', '21'],
            ['Saffron Cafe · Lusail', '340', '90%', '112', '15'],
          ]
        : [
            ['Velvet Salon · Al Sadd', '480', '93%', '148', '22'],
            ['Velvet Studio · The Pearl', '315', '91%', '96', '14'],
            ['Online Store · Qatar', '290', '94%', '118', '11'],
          ]

  const topics =
    kind === 'aesthetics'
      ? ([
          [en ? 'Consult bookings' : 'حجز الاستشارات', '34%'],
          [en ? 'Treatment pricing' : 'أسعار العلاجات', '26%'],
          [en ? 'No-show recovery' : 'استعادة المواعيد الفائتة', '18%'],
          [en ? 'Post-care questions' : 'استفسارات ما بعد الإجراء', '12%'],
        ] as [string, string][])
      : kind === 'restaurants'
        ? ([
            [en ? 'Table reservations' : 'حجز الطاولات', '32%'],
            [en ? 'Direct food orders' : 'طلبات الطعام المباشرة', '29%'],
            [en ? 'Custom cake quotes' : 'تسعير الكيك المخصص', '19%'],
            [en ? 'Delivery ETAs' : 'متابعة التوصيل', '11%'],
          ] as [string, string][])
        : ([
            [en ? 'Appointments & slots' : 'المواعيد والحجوزات', '36%'],
            [en ? 'Price & package quotes' : 'عروض الأسعار والباقات', '27%'],
            [en ? 'Payment links' : 'روابط الدفع', '21%'],
            [en ? 'Membership renewals' : 'تجديد الاشتراكات', '16%'],
          ] as [string, string][])

  const views: DashView[] = [
    {
      title: en ? 'Overview' : 'نظرة عامة',
      sub: en ? 'Last 7 days · outcome-first · All locations' : 'آخر 7 أيام · كل المواقع',
      badge: en ? '7 days' : '7 أيام',
      stats: [
        { label: en ? 'Resolved by AI' : 'حلّها الذكاء الاصطناعي', val: '93%', sub: '1,085 / 1,167' },
        { label: en ? 'Bookings & orders' : 'حجوزات وطلبات', val: '334', sub: '+18%' },
        { label: en ? 'Escalations' : 'تصعيدات', val: '82', sub: 'CSAT 4.8' },
      ],
      leftTitle: entityCol,
      leftCount: '3',
      leftRows: sampleRows,
      rightTitle: en ? 'Top topics' : 'أبرز المواضيع',
      rightTag: en ? 'auto' : 'تلقائي',
      rightRows: topics,
    },
    {
      title: en ? 'Agent' : 'الوكيل الذكي',
      sub: en ? 'Bilingual AI Receptionist · 24/7' : 'موظفة استقبال ذكية ثنائية اللغة · 24/7',
      badge: en ? 'Active' : 'نشط',
      stats: [
        { label: en ? 'First reply' : 'أول رد', val: '1.6s', sub: en ? 'median' : 'متوسط' },
        { label: en ? 'Approval rules' : 'قواعد الموافقة', val: '12', sub: en ? 'enforced' : 'مفعّلة' },
        { label: en ? 'Accuracy' : 'الدقة', val: '99.4%', sub: en ? 'verified' : 'موثقة' },
      ],
      leftTitle: en ? 'Active workflows' : 'المهام المفعلة',
      leftCount: '3',
      leftRows: [
        [en ? 'Instant Booking & Diary Sync' : 'الحجز الفوري ومزامنة المواعيد', 'Live', '96%', '184', '0'],
        [en ? 'Automated Follow-up & Recall' : 'المتابعة التلقائية والاسترجاع', 'Auto', '93%', '92', '2'],
        [en ? 'Secure Payment Links' : 'روابط الدفع الآمنة', 'Pay', '98%', '58', '1'],
      ],
      rightTitle: en ? 'Guardrails' : 'ضوابط الأمان',
      rightTag: en ? 'locked' : 'مؤمن',
      rightRows: [
        [en ? 'Approved price list only' : 'الالتزام بالأسعار المعتمدة', '100%'],
        [en ? 'Sensitive requests -> staff' : 'الطلبات الحساسة -> الفريق', '100%'],
        [en ? 'Full audit trail logged' : 'تسجيل سجل التدقيق الكامل', '100%'],
      ],
    },
    {
      title: en ? 'Conversations' : 'المحادثات',
      sub: en ? 'Unified inbox · WhatsApp, Voice, IG, Web' : 'صندوق موحد · واتساب، صوت، إنستغرام، ويب',
      badge: en ? 'Live' : 'مباشر',
      stats: [
        { label: en ? 'Active threads' : 'محادثات نشطة', val: '19', sub: en ? 'now' : 'الآن' },
        { label: en ? 'Handled by AI' : 'بواسطة الذكاء', val: '18', sub: '94.7%' },
        { label: en ? 'Human takeover' : 'استلام بشري', val: '1', sub: en ? '1-click' : 'نقرة واحدة' },
      ],
      leftTitle: en ? 'Recent activity' : 'أحدث المحادثات',
      leftCount: '3',
      leftRows: [
        ['Mariam K. · WhatsApp', 'Booked', '98%', 'Confirmed', 'AI'],
        ['Omar S. · Instagram DM', 'Quoted', '95%', 'Paid', 'AI'],
        ['Nadia H. · Inbound Voice', 'Slot', '100%', 'Booked', 'AI'],
      ],
      rightTitle: en ? 'By language' : 'حسب اللغة',
      rightTag: '24h',
      rightRows: [
        [en ? 'Arabic (Gulf / MSA)' : 'العربية (خليجي / فصحى)', '61%'],
        [en ? 'English' : 'الإنجليزية', '37%'],
        [en ? 'Other' : 'أخرى', '2%'],
      ],
    },
    {
      title: en ? 'Knowledge base' : 'قاعدة المعرفة',
      sub: en ? 'Synced menus, price lists & policies' : 'قوائم وأسعار وسياسات متزامنة',
      badge: en ? 'Synced' : 'متزامن',
      stats: [
        { label: en ? 'Approved docs' : 'مستندات معتمدة', val: '36', sub: 'EN + AR' },
        { label: en ? 'Last indexed' : 'آخر تحديث', val: '8m', sub: en ? 'ago' : 'مضت' },
        { label: en ? 'Coverage' : 'التغطية', val: '99%', sub: 'verified' },
      ],
      leftTitle: en ? 'Indexed sources' : 'المصادر المفهرسة',
      leftCount: '3',
      leftRows: [
        [en ? 'Services & Price List' : 'قائمة الخدمات والأسعار', 'PDF', '100%', 'EN/AR', 'OK'],
        [en ? 'Branch Hours & Locations' : 'ساعات العمل والفروع', 'CMS', '100%', 'EN/AR', 'OK'],
        [en ? 'Booking & Refund Rules' : 'قواعد الحجز والإلغاء', 'Doc', '98%', 'EN/AR', 'OK'],
      ],
      rightTitle: en ? 'Freshness' : 'الحداثة',
      rightTag: 'auto',
      rightRows: [
        [en ? 'Promotions & offers' : 'العروض والخصومات', '100%'],
        [en ? 'Staff & room availability' : 'توافر الفريق والغرف', '100%'],
        [en ? 'FAQ & policies' : 'الأسئلة والسياسات', '100%'],
      ],
    },
    {
      title: en ? 'Channels' : 'القنوات',
      sub: en ? 'Every channel answered in seconds' : 'كل قناة مجابة خلال ثوانٍ',
      badge: '6 / 6',
      stats: [
        { label: 'WhatsApp', val: '52%', sub: '607 msgs' },
        { label: en ? 'Voice calls' : 'مكالمات صوتية', val: '26%', sub: '< 3 rings' },
        { label: 'Instagram + Web', val: '22%', sub: '0 missed' },
      ],
      leftTitle: en ? 'Channel health' : 'حالة القنوات',
      leftCount: '3',
      leftRows: [
        ['WhatsApp Business (+974)', '607', '95%', '178', '18'],
        ['Inbound Voice (+974)', '304', '91%', '86', '24'],
        ['Instagram DM & Web Chat', '256', '94%', '70', '12'],
      ],
      rightTitle: en ? 'Response SLA' : 'سرعة الرد',
      rightTag: 'live',
      rightRows: [
        ['WhatsApp', '98%'],
        ['Voice (< 3 rings)', '96%'],
        ['Instagram DM', '95%'],
      ],
    },
    {
      title: en ? 'Locations' : 'الفروع',
      sub: en ? 'Per-branch rules, hours and pricing' : 'قواعد وساعات وأسعار لكل فرع',
      badge: '3',
      stats: [
        { label: en ? 'Active branches' : 'الفروع النشطة', val: '3', sub: '100%' },
        { label: en ? 'System sync' : 'مزامنة الأنظمة', val: 'Live', sub: 'API' },
        { label: en ? 'Revenue lift' : 'زيادة الإيرادات', val: '+31%', sub: 'MoM' },
      ],
      leftTitle: entityCol,
      leftCount: '3',
      leftRows: sampleRows,
      rightTitle: en ? 'Channel mix' : 'توزيع القنوات',
      rightTag: '30d',
      rightRows: [
        ['WhatsApp & Voice', '78%'],
        ['Instagram DM', '14%'],
        ['Web Chat', '8%'],
      ],
    },
    {
      title: en ? 'Voice' : 'الصوت',
      sub: en ? 'Arabic & English calls on your own numbers' : 'مكالمات عربية وإنجليزية على أرقامك',
      badge: en ? 'On' : 'مفعل',
      stats: [
        { label: en ? 'Calls answered' : 'مكالمات مجابة', val: '304', sub: '100%' },
        { label: en ? 'Avg pickup' : 'سرعة الرد', val: '1.5s', sub: '2nd ring' },
        { label: en ? 'Call bookings' : 'حجوزات هاتفية', val: '86', sub: '+16%' },
      ],
      leftTitle: en ? 'Voice profiles' : 'ملفات الصوت',
      leftCount: '3',
      leftRows: [
        ['Noor · Qatari / MSA', '162 calls', '94%', '48', '7'],
        ['Yousuf · Emirati / EN', '96 calls', '91%', '26', '5'],
        ['Sultan · Saudi / EN', '46 calls', '89%', '12', '3'],
      ],
      rightTitle: en ? 'Call outcomes' : 'نتائج المكالمات',
      rightTag: '7d',
      rightRows: [
        [en ? 'Booked directly' : 'حجز مباشر', '48%'],
        [en ? 'Answered & quoted' : 'إجابة وتسعير', '38%'],
        [en ? 'Warm transfer' : 'تحويل للفريق', '14%'],
      ],
    },
  ]

  const tabs = ['Overview', 'Agent', 'Conversations', 'Knowledge base', 'Channels', 'Locations', 'Voice']
  const current = views[dashTab] ?? views[0]

  return (
    <section className="hp-dash">
      <div className="shell">
        <div className="hp-dash-head">
          <span className="hp-badge is-on-dark">
            <span aria-hidden />
            {en ? 'Inside the product' : 'داخل المنتج'}
          </span>
          <h2>{en ? 'The dashboard your team actually runs' : 'لوحة التحكم التي يشغّلها فريقك فعليًا'}</h2>
          <p>
            {en
              ? 'Step through every view your team uses daily — live conversations, AI rules, channels, and branch performance.'
              : 'تصفح كل شاشة يستخدمها فريقك يوميًا — المحادثات المباشرة، قواعد الذكاء، القنوات، وأداء الفروع.'}
          </p>
        </div>

        <div className="hp-dash-tabs" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={dashTab === i ? 'is-active' : ''}
              onClick={() => setDashTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="hp-dash-frame">
          <div className="hp-dash-chrome">
            <span />
            <span />
            <span />
            <p>{domainSlug}</p>
            <em>{en ? 'Sample data' : 'بيانات عينة'}</em>
          </div>
          <div className="hp-dash-body">
            <aside className="hp-dash-side">
              <p className="hp-dash-side-brand">{brand.short}</p>
              {tabs.map((item, i) => (
                <span
                  key={item}
                  className={dashTab === i ? 'is-active cursor-pointer' : 'cursor-pointer'}
                  onClick={() => setDashTab(i)}
                >
                  {item}
                </span>
              ))}
              <p className="hp-dash-side-meta">{sideMeta}</p>
            </aside>
            <div className="hp-dash-main">
              <div className="hp-dash-main-head">
                <div>
                  <h3>{current.title}</h3>
                  <p>{current.sub}</p>
                </div>
                <span>{current.badge}</span>
              </div>
              <div className="hp-dash-stats">
                {current.stats.map((st) => (
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
                    <h4>{current.leftTitle}</h4>
                    <span>{current.leftCount}</span>
                  </div>
                  {current.leftRows.map((row) => (
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
                    <h4>{current.rightTitle}</h4>
                    <span>{current.rightTag}</span>
                  </div>
                  {current.rightRows.map(([topic, vol]) => (
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
      </div>
    </section>
  )
}
