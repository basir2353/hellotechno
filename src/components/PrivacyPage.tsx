"use client";

import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

const registeredAddress =
  "Office 07, Arabian Calm Business Center, R308 Building, Khalid Bin Al Waleed Road, Bur Dubai, Dubai, United Arab Emirates";

export function PrivacyPage() {
  const { locale } = useLocale();
  const en = locale === "en";

  return (
    <SiteShell>
      <section className="legal-page bg-white">
        <div className="legal-page-inner">
          <span className="legal-badge">
            <span className="legal-badge-dot" aria-hidden />
            {en ? "Legal" : "قانوني"}
          </span>

          <h1 className="legal-title">{en ? "Privacy Policy" : "سياسة الخصوصية"}</h1>
          <p className="legal-updated">
            {en ? "Last updated: 21 July 2026" : "آخر تحديث: 21 يوليو 2026"}
          </p>

          <div className="legal-prose">
            <p>
              {en ? (
                <>
                  This Privacy Policy explains how <strong>{brand.short}</strong> (&quot;{brand.short}&quot;,
                  &quot;we&quot;, &quot;us&quot;), operated by <strong>{brand.name}</strong>, registered at{" "}
                  {registeredAddress}, collects, uses, discloses, and protects personal data in connection
                  with our website and our conversational-AI service (the &quot;Service&quot;). Please read
                  it together with our <Link href={routes.terms}>Terms &amp; Conditions</Link>.
                </>
              ) : (
                <>
                  توضّح سياسة الخصوصية هذه كيف تجمع <strong>{brand.short}</strong> (&quot;{brand.short}&quot;،
                  &quot;نحن&quot;)، التي تشغّلها <strong>{brand.name}</strong> والمسجّلة في {registeredAddress}،
                  البيانات الشخصية وتستخدمها وتفصح عنها وتحميها فيما يتعلق بموقعنا وخدمة المحادثة بالذكاء
                  الاصطناعي (&quot;الخدمة&quot;). يُرجى قراءتها مع{" "}
                  <Link href={routes.terms}>الشروط والأحكام</Link>.
                </>
              )}
            </p>

            <p>
              {en ? (
                <>
                  <strong>Two roles.</strong> For our website, marketing, and account/billing data we act as
                  a <strong>data controller</strong>. When our business customers use the Service to handle
                  their own customers&apos; conversations, we act as a <strong>data processor</strong> acting
                  on the customer&apos;s documented instructions; that customer is the controller and its own
                  privacy notice applies to those end-users. Where local law uses different terms (e.g.,
                  &quot;business/service provider&quot;), equivalent roles apply.
                </>
              ) : (
                <>
                  <strong>دوران.</strong> لبيانات موقعنا والتسويق والحساب/الفوترة نعمل بصفة{" "}
                  <strong>متحكم بالبيانات</strong>. عندما يستخدم عملاؤنا التجاريون الخدمة للتعامل مع محادثات
                  عملائهم، نعمل بصفة <strong>معالج بيانات</strong> وفق تعليماتهم الموثّقة؛ ويكون ذلك العميل هو
                  المتحكم، وتسري إشعار خصوصيته على أولئك المستخدمين النهائيين. وحيث تستخدم القوانين المحلية
                  مصطلحات مختلفة (مثل «نشاط/مقدّم خدمة»)، تسري الأدوار المكافئة.
                </>
              )}
            </p>

            <h2 className="legal-h2">{en ? "1. Information we collect" : "1. المعلومات التي نجمعها"}</h2>

            <h3 className="legal-h3">{en ? "From website visitors" : "من زوّار الموقع"}</h3>
            <ul className="legal-list">
              <li>
                {en ? (
                  <>
                    <strong>Contact details you submit:</strong> name, work email, phone/WhatsApp, business
                    name, industry, number of locations, country/city, channels of interest, and any message
                    (e.g., via the contact forms).
                  </>
                ) : (
                  <>
                    <strong>بيانات التواصل التي ترسلها:</strong> الاسم، البريد المهني، الهاتف/واتساب، اسم
                    النشاط، القطاع، عدد المواقع، الدولة/المدينة، القنوات محل الاهتمام، وأي رسالة (مثل نماذج
                    التواصل).
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Usage &amp; device data:</strong> IP address, browser/device type, pages viewed,
                    referrer, and similar analytics collected via cookies and comparable technologies.
                  </>
                ) : (
                  <>
                    <strong>بيانات الاستخدام والجهاز:</strong> عنوان IP، نوع المتصفح/الجهاز، الصفحات المعروضة،
                    المُحيل، وتحليلات مماثلة عبر ملفات تعريف الارتباط والتقنيات المشابهة.
                  </>
                )}
              </li>
            </ul>

            <h3 className="legal-h3">
              {en ? "From business customers (account)" : "من العملاء التجاريين (الحساب)"}
            </h3>
            <ul className="legal-list">
              <li>
                {en
                  ? "Account and user details (names, business emails, roles), configuration, and billing/tax information."
                  : "تفاصيل الحساب والمستخدمين (الأسماء، البريد المهني، الأدوار)، الإعدادات، ومعلومات الفوترة/الضرائب."}
              </li>
            </ul>

            <h3 className="legal-h3">
              {en
                ? "Through the Service (processed on behalf of our customers)"
                : "عبر الخدمة (تُعالَج نيابة عن عملائنا)"}
            </h3>
            <ul className="legal-list">
              <li>
                {en ? (
                  <>
                    <strong>Conversation content:</strong> messages, chat/web/WhatsApp/SMS/social text, and,
                    for voice, call audio and/or transcripts exchanged between end-users and the AI agent.
                  </>
                ) : (
                  <>
                    <strong>محتوى المحادثة:</strong> الرسائل ونصوص الدردشة/الويب/واتساب/الرسائل النصية/وسائل
                    التواصل، وللصوت تسجيل المكالمة و/أو النصوص بين المستخدمين النهائيين ووكيل الذكاء الاصطناعي.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>End-user contact identifiers:</strong> phone number, messaging handle, name, and
                    any details a person provides during a conversation.
                  </>
                ) : (
                  <>
                    <strong>معرّفات تواصل المستخدم النهائي:</strong> رقم الهاتف، معرّف المراسلة، الاسم، وأي
                    تفاصيل يقدّمها الشخص أثناء المحادثة.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Operational metadata:</strong> timestamps, channel, language detected,
                    branch/location, intent, confidence, tools invoked, and outcomes (e.g., booking, order,
                    escalation).
                  </>
                ) : (
                  <>
                    <strong>بيانات تشغيلية:</strong> الطوابع الزمنية، القناة، اللغة المكتشفة، الفرع/الموقع،
                    النية، الثقة، الأدوات المستدعاة، والنتائج (مثل حجز أو طلب أو تصعيد).
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Integration data:</strong> information exchanged with tools the customer connects
                    (e.g., calendars, CRM, payments) to complete requested actions.
                  </>
                ) : (
                  <>
                    <strong>بيانات التكامل:</strong> معلومات تُتبادل مع الأدوات التي يربطها العميل (مثل
                    التقويمات وإدارة العلاقات والمدفوعات) لإتمام الإجراءات المطلوبة.
                  </>
                )}
              </li>
            </ul>

            <h2 className="legal-h2">{en ? "2. How we use information" : "2. كيف نستخدم المعلومات"}</h2>
            <ul className="legal-list">
              <li>
                {en
                  ? "To provide, operate, secure, and support the Service and website."
                  : "لتوفير الخدمة والموقع وتشغيلهما وتأمينهما ودعمهما."}
              </li>
              <li>
                {en
                  ? "To run the AI agent: understand requests, retrieve the customer's approved knowledge, generate replies, and (with the customer's configuration and approvals) take actions such as booking or order-taking."
                  : "لتشغيل وكيل الذكاء الاصطناعي: فهم الطلبات، واسترجاع معرفة العميل المعتمدة، وتوليد الردود، واتخاذ إجراءات مثل الحجز أو استلام الطلبات (وفق إعدادات العميل وموافقاته)."}
              </li>
              <li>
                {en
                  ? "To respond to inquiries and communicate about early access, service, and updates."
                  : "للرد على الاستفسارات والتواصل بشأن الوصول المبكر والخدمة والتحديثات."}
              </li>
              <li>
                {en
                  ? "To maintain security, prevent abuse/fraud, and enforce our Terms."
                  : "للحفاظ على الأمن ومنع إساءة الاستخدام/الاحتيال وإنفاذ شروطنا."}
              </li>
              <li>
                {en
                  ? "To improve reliability and quality (using aggregated or de-identified data where feasible)."
                  : "لتحسين الموثوقية والجودة (باستخدام بيانات مجمّعة أو مجهولة الهوية حيثما أمكن)."}
              </li>
            </ul>
            <p>
              {en ? (
                <>
                  <strong>Legal bases</strong> (where required, e.g., under GDPR/UK GDPR): performance of a
                  contract, our legitimate interests (operating and improving the Service, security), consent
                  (e.g., certain cookies/marketing), and compliance with law. For processing on behalf of
                  customers, the customer is responsible for the lawful basis toward its end-users.
                </>
              ) : (
                <>
                  <strong>الأسس القانونية</strong> (حيث يُطلب ذلك، مثل اللائحة العامة لحماية البيانات /
                  المملكة المتحدة): تنفيذ عقد، ومصالحنا المشروعة (تشغيل الخدمة وتحسينها والأمن)، والموافقة
                  (مثل بعض ملفات تعريف الارتباط/التسويق)، والامتثال للقانون. لمعالجة البيانات نيابة عن
                  العملاء، يتحمل العميل مسؤولية الأساس القانوني تجاه مستخدميه النهائيين.
                </>
              )}
            </p>

            <h2 className="legal-h2">
              {en ? "3. AI & automated processing" : "3. الذكاء الاصطناعي والمعالجة الآلية"}
            </h2>
            <p>
              {en ? (
                <>
                  Conversations are handled by an <strong>automated AI agent</strong>. Responses are
                  generated by AI and may occasionally be inaccurate or incomplete; sensitive actions can be
                  configured to require human approval, and conversations can be handed to a human at any
                  time.
                </>
              ) : (
                <>
                  تُعالَج المحادثات بواسطة <strong>وكيل ذكاء اصطناعي آلي</strong>. تُولَّد الردود بالذكاء
                  الاصطناعي وقد تكون أحيانًا غير دقيقة أو غير مكتملة؛ ويمكن ضبط الإجراءات الحساسة لتتطلب
                  موافقة بشرية، ويمكن تسليم المحادثة لإنسان في أي وقت.
                </>
              )}
            </p>
            <p>
              {en ? (
                <>
                  We use large-language-model and speech providers to power the Service (see §5).{" "}
                  <strong>
                    We do not sell personal data, and we do not use customer conversation content to train
                    third-party foundation models except where explicitly permitted by the customer.
                  </strong>
                </>
              ) : (
                <>
                  نستخدم مزوّدي نماذج اللغة الكبيرة والكلام لتشغيل الخدمة (انظر §5).{" "}
                  <strong>
                    لا نبيع البيانات الشخصية، ولا نستخدم محتوى محادثات العملاء لتدريب نماذج الأساس لدى أطراف
                    ثالثة إلا حيث يأذن العميل بذلك صراحة.
                  </strong>
                </>
              )}
            </p>
            <p>
              {en
                ? "The AI does not make legally or similarly significant decisions about individuals without human involvement where such involvement is required by applicable law. End-users may request human review via the business they contacted."
                : "لا يتخذ الذكاء الاصطناعي قرارات قانونية أو ذات أثر مماثل بشأن الأفراد دون تدخل بشري حيث يقتضي القانون المعمول به ذلك. يمكن للمستخدمين النهائيين طلب مراجعة بشرية عبر النشاط الذي تواصلوا معه."}
            </p>

            <h2 className="legal-h2">
              {en ? "4. Call/message recording & consent" : "4. تسجيل المكالمات/الرسائل والموافقة"}
            </h2>
            <p>
              {en ? (
                <>
                  The Service may create transcripts and, for voice channels, recordings of conversations, on
                  behalf of the business customer. <strong>Our customers are responsible</strong> for
                  providing all required notices to, and obtaining any required consent from, their end-users
                  (for example, call-recording and messaging-consent requirements, which vary by country and
                  channel). {brand.short} provides configuration to support disclosures but does not control
                  the end-user relationship.
                </>
              ) : (
                <>
                  قد تنشئ الخدمة نصوصًا، وللقنوات الصوتية تسجيلات للمحادثات، نيابة عن العميل التجاري.{" "}
                  <strong>يتحمّل عملاؤنا المسؤولية</strong> عن تقديم جميع الإشعارات المطلوبة والحصول على أي
                  موافقة مطلوبة من مستخدميهم النهائيين (مثل متطلبات تسجيل المكالمات وموافقة المراسلة، التي
                  تختلف حسب الدولة والقناة). توفّر {brand.short} إعدادات لدعم الإفصاحات لكنها لا تتحكم في علاقة
                  المستخدم النهائي.
                </>
              )}
            </p>

            <h2 className="legal-h2">
              {en ? "5. Sharing & sub-processors" : "5. المشاركة والمعالجون الفرعيون"}
            </h2>
            <p>
              {en
                ? "We share personal data only as needed to run the Service and website, with categories of providers such as:"
                : "نشارك البيانات الشخصية فقط بالقدر اللازم لتشغيل الخدمة والموقع، مع فئات من المزوّدين مثل:"}
            </p>
            <ul className="legal-list">
              <li>
                {en ? (
                  <>
                    <strong>Cloud hosting &amp; infrastructure:</strong> to host the platform and data.
                  </>
                ) : (
                  <>
                    <strong>الاستضافة السحابية والبنية التحتية:</strong> لاستضافة المنصة والبيانات.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Messaging &amp; telephony providers:</strong> e.g., WhatsApp/Meta, SMS and
                    voice/telephony carriers, to deliver messages and calls.
                  </>
                ) : (
                  <>
                    <strong>مزوّدو المراسلة والهاتف:</strong> مثل واتساب/ميتا ورسائل SMS وشركات الصوت/الهاتف،
                    لتسليم الرسائل والمكالمات.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>AI model &amp; speech providers:</strong> to generate responses and
                    transcribe/synthesize speech.
                  </>
                ) : (
                  <>
                    <strong>مزوّدو نماذج الذكاء الاصطناعي والكلام:</strong> لتوليد الردود ونسخ/توليف الكلام.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Analytics, email, and payment providers:</strong> for the website, communications,
                    and billing.
                  </>
                ) : (
                  <>
                    <strong>مزوّدو التحليلات والبريد والمدفوعات:</strong> للموقع والتواصل والفوترة.
                  </>
                )}
              </li>
            </ul>
            <p>
              {en ? (
                <>
                  We require sub-processors to protect data under written agreements. A current list of
                  sub-processors is available on request at{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>. We may also disclose data to comply
                  with law, enforce agreements, or in a corporate transaction (merger, acquisition, or asset
                  sale), subject to appropriate safeguards.
                </>
              ) : (
                <>
                  نُلزم المعالجين الفرعيين بحماية البيانات بموجب اتفاقيات مكتوبة. تتوفر قائمة حالية بالمعالجين
                  الفرعيين عند الطلب عبر{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>. قد نفصح أيضًا عن البيانات للامتثال
                  للقانون أو إنفاذ الاتفاقيات أو في صفقة شركاتية (اندماج أو استحواذ أو بيع أصول)، مع ضمانات
                  مناسبة.
                </>
              )}
            </p>

            <h2 className="legal-h2">{en ? "6. International transfers" : "6. النقل الدولي"}</h2>
            <p>
              {en ? (
                <>
                  We and our providers may process data in countries other than yours, including outside the
                  GCC/EEA. Where required, we use appropriate safeguards (such as Standard Contractual Clauses
                  or equivalent mechanisms). Customers can discuss data-residency options at{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                </>
              ) : (
                <>
                  قد نعالج نحن ومزوّدونا البيانات في دول غير دولتك، بما في ذلك خارج مجلس التعاون الخليجي /
                  المنطقة الاقتصادية الأوروبية. حيث يُطلب ذلك، نستخدم ضمانات مناسبة (مثل البنود التعاقدية
                  القياسية أو آليات مكافئة). يمكن للعملاء مناقشة خيارات توطين البيانات عبر{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                </>
              )}
            </p>

            <h2 className="legal-h2">{en ? "7. Data retention" : "7. الاحتفاظ بالبيانات"}</h2>
            <p>
              {en
                ? "We keep personal data only as long as needed for the purposes above, then delete or anonymize it. For data processed on behalf of customers, retention follows the customer's instructions and our agreement; on termination, customer data is deleted or returned within a commercially reasonable period, subject to legal retention requirements. Website inquiries are kept for up to 24 months unless you ask us to delete them sooner."
                : "نحتفظ بالبيانات الشخصية فقط طالما يلزم للأغراض أعلاه، ثم نحذفها أو نجعلها مجهولة الهوية. لبيانات تُعالَج نيابة عن العملاء، يتبع الاحتفاظ تعليمات العميل واتفاقيتنا؛ وعند الإنهاء تُحذف بيانات العميل أو تُعاد خلال فترة معقولة تجاريًا، مع مراعاة متطلبات الاحتفاظ القانونية. تُحفظ استفسارات الموقع حتى 24 شهرًا ما لم تطلب حذفها أبكر."}
            </p>

            <h2 className="legal-h2">{en ? "8. Security" : "8. الأمن"}</h2>
            <p>
              {en
                ? "We apply administrative, technical, and organizational measures appropriate to the risk, including encryption in transit, access controls, credential/secret vaulting, and logging of agent actions. No method of transmission or storage is 100% secure. Formal certifications (e.g., SOC 2, ISO 27001) are on our roadmap and are not represented as currently held."
                : "نطبّق تدابير إدارية وتقنية وتنظيمية مناسبة للمخاطر، بما في ذلك التشفير أثناء النقل وضوابط الوصول وخزن بيانات الاعتماد/الأسرار وتسجيل إجراءات الوكيل. لا توجد طريقة نقل أو تخزين آمنة بنسبة 100%. الشهادات الرسمية (مثل SOC 2 وISO 27001) على خارطة طريقنا ولا تُعرض كشهادات مملوكة حاليًا."}
            </p>

            <h2 className="legal-h2">{en ? "9. Your rights" : "9. حقوقك"}</h2>
            <p>
              {en ? (
                <>
                  Subject to applicable law, you may have rights to access, correct, delete, restrict, or
                  object to processing of your personal data, to data portability, and to withdraw consent. To
                  exercise rights regarding data <strong>we control</strong> (website/account), contact{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>. If your data was processed by the AI
                  agent of a business you contacted, that business is the controller; please contact them, and
                  we will assist them as processor. You may also have the right to complain to your local
                  data-protection authority.
                </>
              ) : (
                <>
                  وفق القانون المعمول به، قد تتمتع بحقوق الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو
                  تقييد معالجتها أو الاعتراض عليها، وقابلية نقل البيانات، وسحب الموافقة. لممارسة الحقوق بشأن
                  البيانات التي <strong>نتحكم بها</strong> (الموقع/الحساب)، تواصل عبر{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>. إذا عالج وكيل الذكاء الاصطناعي لنشاط
                  تواصلت معه بياناتك، فذلك النشاط هو المتحكم؛ يُرجى التواصل معه، وسنساعده بصفتنا معالجًا. قد
                  يكون لك أيضًا حق الشكوى لدى سلطة حماية البيانات المحلية.
                </>
              )}
            </p>

            <h2 className="legal-h2">{en ? "10. Cookies" : "10. ملفات تعريف الارتباط"}</h2>
            <p>
              {en
                ? "Our website uses strictly necessary cookies and, with consent where required, analytics cookies to understand usage. You can control cookies through your browser settings; disabling some cookies may affect functionality."
                : "يستخدم موقعنا ملفات تعريف ارتباط ضرورية حصرًا، ومع الموافقة حيث يلزم، ملفات تحليلات لفهم الاستخدام. يمكنك التحكم فيها عبر إعدادات المتصفح؛ وقد يؤثر تعطيل بعضها على الوظائف."}
            </p>

            <h2 className="legal-h2">{en ? "11. Children" : "11. الأطفال"}</h2>
            <p>
              {en
                ? "The Service and website are intended for businesses and adults. They are not directed to children, and we do not knowingly collect personal data from anyone under 18. If you believe a child has provided data, contact us and we will delete it."
                : "الخدمة والموقع مخصصان للأعمال والبالغين. ليسا موجّهين للأطفال، ولا نجمع عن علم بيانات شخصية ممن دون 18. إذا كنت تعتقد أن طفلًا قدّم بيانات، تواصل معنا وسنحذفها."}
            </p>

            <h2 className="legal-h2">
              {en ? "12. Changes to this policy" : "12. تغييرات هذه السياسة"}
            </h2>
            <p>
              {en
                ? 'We may update this policy from time to time. Material changes will be posted here with a revised "Last updated" date and, where appropriate, additional notice.'
                : "قد نحدّث هذه السياسة من وقت لآخر. تُنشر التغييرات الجوهرية هنا مع تاريخ «آخر تحديث» منقّح، ومع إشعار إضافي حيث يناسب."}
            </p>

            <h2 className="legal-h2">{en ? "13. Contact us" : "13. تواصل معنا"}</h2>
            <p>
              {en ? (
                <>
                  Questions or requests: <a href={`mailto:${brand.email}`}>{brand.email}</a>. {brand.name},{" "}
                  {registeredAddress}.
                </>
              ) : (
                <>
                  للأسئلة أو الطلبات: <a href={`mailto:${brand.email}`}>{brand.email}</a>. {brand.name}،{" "}
                  {registeredAddress}.
                </>
              )}
            </p>
            <p className="legal-footnote">
              {en ? "The English version governs." : "النسخة الإنجليزية هي المعتمدة."}
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
