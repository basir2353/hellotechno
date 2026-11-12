"use client";

import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

const registeredAddress =
  "Office 07, Arabian Calm Business Center, R308 Building, Khalid Bin Al Waleed Road, Bur Dubai, Dubai, United Arab Emirates";

export function TermsPage() {
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

          <h1 className="legal-title">{en ? "Terms & Conditions" : "الشروط والأحكام"}</h1>
          <p className="legal-updated">
            {en ? "Last updated: 21 July 2026" : "آخر تحديث: 21 يوليو 2026"}
          </p>

          <div className="legal-prose">
            <p>
              {en ? (
                <>
                  These Terms &amp; Conditions (&quot;Terms&quot;) govern access to and use of the website and the{" "}
                  {brand.short} conversational-AI service (the &quot;Service&quot;), provided by{" "}
                  <strong>{brand.name}</strong> (&quot;{brand.short}&quot;, &quot;we&quot;, &quot;us&quot;). By accessing the website or
                  using the Service, you (&quot;you&quot;, &quot;Customer&quot;) agree to these Terms and to our{" "}
                  <Link href={routes.privacy}>Privacy Policy</Link>. If you use the Service on behalf of an
                  organization, you represent that you are authorized to bind it.
                </>
              ) : (
                <>
                  تحكم هذه الشروط والأحكام (&quot;الشروط&quot;) الوصول إلى الموقع وخدمة {brand.short} للمحادثة بالذكاء
                  الاصطناعي (&quot;الخدمة&quot;)، التي تقدّمها <strong>{brand.name}</strong> (&quot;{brand.short}&quot;،
                  &quot;نحن&quot;). باستخدام الموقع أو الخدمة، توافق أنت (&quot;أنت&quot;، &quot;العميل&quot;) على هذه الشروط وعلى{" "}
                  <Link href={routes.privacy}>سياسة الخصوصية</Link>. وإذا استخدمت الخدمة نيابة عن جهة، فإنك
                  تقر بأنك مخوّل بإلزامها.
                </>
              )}
            </p>

            <p>
              {en ? (
                <strong>
                  Please read §7 (AI disclaimer), §12 (Disclaimer), §13 (Limitation of liability), and §14
                  (Indemnification) carefully; they limit our liability and allocate risk.
                </strong>
              ) : (
                <strong>
                  يُرجى قراءة §7 (إخلاء مسؤولية الذكاء الاصطناعي)، و§12 (إخلاء المسؤولية)، و§13 (تحديد
                  المسؤولية)، و§14 (التعويض) بعناية؛ فهي تحدّ من مسؤوليتنا وتوزّع المخاطر.
                </strong>
              )}
            </p>

            <h2 className="legal-h2">{en ? "1. The Service" : "1. الخدمة"}</h2>
            <p>
              {en
                ? `${brand.short} provides an AI "front desk" that answers customer messages and calls across channels (such as web chat, WhatsApp, SMS, voice, and social), and, where configured, takes actions such as booking appointments, taking orders, logging requests, and handing over to a human. Features, channels, and integrations depend on your plan and may change, be added, or be discontinued. Some features are provided as previews or "beta" and may be modified or withdrawn.`
                : `توفّر ${brand.short} «مكتب استقبال» بالذكاء الاصطناعي يرد على رسائل ومكالمات العملاء عبر القنوات (مثل دردشة الويب وواتساب والرسائل والصوت ووسائل التواصل)، وحيث يُضبط ذلك، يتخذ إجراءات مثل حجز المواعيد واستلام الطلبات وتسجيل الطلبات والتسليم لإنسان. تعتمد الميزات والقنوات والتكاملات على خطتك وقد تتغير أو تُضاف أو تُوقف. بعض الميزات تُقدَّم كمعاينة أو «تجريبية» وقد تُعدَّل أو تُسحب.`}
            </p>

            <h2 className="legal-h2">{en ? "2. Eligibility & accounts" : "2. الأهلية والحسابات"}</h2>
            <p>
              {en
                ? "The Service is for business use by users aged 18+. You must provide accurate information, keep credentials secure, and are responsible for all activity under your account. We may refuse, suspend, or terminate accounts that violate these Terms or applicable law."
                : "الخدمة للاستخدام التجاري من مستخدمين تبلغ أعمارهم 18 فأكثر. يجب تقديم معلومات دقيقة وحفظ بيانات الاعتماد بأمان، وأنت مسؤول عن كل نشاط تحت حسابك. قد نرفض أو نعلّق أو ننهي حسابات تخالف هذه الشروط أو القانون المعمول به."}
            </p>

            <h2 className="legal-h2">
              {en ? "3. Customer responsibilities" : "3. مسؤوليات العميل"}
            </h2>
            <ul className="legal-list">
              <li>
                {en ? (
                  <>
                    <strong>Content &amp; knowledge.</strong> You are responsible for the accuracy and legality
                    of the information, menus, prices, policies, and instructions you provide to the agent, and
                    for reviewing its configuration before going live.
                  </>
                ) : (
                  <>
                    <strong>المحتوى والمعرفة.</strong> أنت مسؤول عن دقة وقانونية المعلومات والقوائم والأسعار
                    والسياسات والتعليمات التي تقدّمها للوكيل، وعن مراجعة إعداده قبل الإطلاق.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Consents &amp; notices.</strong> You are solely responsible for obtaining all
                    consents and providing all disclosures required to message, call, record, and process the
                    personal data of your end-users, including messaging/marketing consent, call-recording
                    notices, and do-not-contact rules, which vary by country and channel.
                  </>
                ) : (
                  <>
                    <strong>الموافقات والإشعارات.</strong> أنت وحدك مسؤول عن الحصول على جميع الموافقات وتقديم
                    جميع الإفصاحات اللازمة لمراسلة أو الاتصال أو التسجيل أو معالجة البيانات الشخصية لمستخدميك
                    النهائيين، بما في ذلك موافقة المراسلة/التسويق وإشعارات تسجيل المكالمات وقواعد عدم التواصل،
                    التي تختلف حسب الدولة والقناة.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Channel &amp; legal compliance.</strong> You must comply with the policies of each
                    channel/provider (e.g., WhatsApp Business Messaging Policy, Meta, telephony/SMS regulations
                    such as A2P/10DLC, TCPA, and local telemarketing/DND laws) and with all laws applicable to
                    your use.
                  </>
                ) : (
                  <>
                    <strong>الامتثال للقنوات والقانون.</strong> يجب الالتزام بسياسات كل قناة/مزوّد (مثل سياسة
                    واتساب للأعمال وميتا ولوائح الهاتف/الرسائل مثل A2P/10DLC وTCPA وقوانين التسويق الهاتفي/عدم
                    الإزعاج المحلية) وبجميع القوانين السارية على استخدامك.
                  </>
                )}
              </li>
              <li>
                {en ? (
                  <>
                    <strong>Human oversight.</strong> You are responsible for configuring appropriate human
                    approval and oversight for sensitive or high-impact actions (e.g., payments, refunds,
                    cancellations, health, legal, or financial matters).
                  </>
                ) : (
                  <>
                    <strong>الإشراف البشري.</strong> أنت مسؤول عن ضبط موافقة بشرية وإشراف مناسب للإجراءات
                    الحساسة أو عالية الأثر (مثل المدفوعات والاستردادات والإلغاءات والصحة أو الشؤون القانونية أو
                    المالية).
                  </>
                )}
              </li>
            </ul>

            <h2 className="legal-h2">{en ? "4. Acceptable use" : "4. الاستخدام المقبول"}</h2>
            <p>{en ? "You must not, and must not permit anyone to:" : "يجب ألا تقوم، وألا تسمح لأي أحد بأن:"}</p>
            <ul className="legal-list">
              <li>
                {en
                  ? "use the Service for unlawful, deceptive, harassing, or harmful purposes, or to send spam/unsolicited messages in violation of law;"
                  : "يستخدم الخدمة لأغراض غير قانونية أو مضللة أو مضايقة أو ضارة، أو لإرسال رسائل مزعجة/غير مرغوبة بالمخالفة للقانون؛"}
              </li>
              <li>
                {en
                  ? "process special-category or highly sensitive data except as permitted and lawfully consented;"
                  : "يعالج بيانات من فئة خاصة أو شديدة الحساسية إلا حيث يُسمح بذلك وبموافقة قانونية؛"}
              </li>
              <li>
                {en
                  ? "deploy the agent for high-risk decision-making (medical, legal, financial, employment, credit, or safety decisions) without qualified human review;"
                  : "ينشر الوكيل لاتخاذ قرارات عالية المخاطر (طبية أو قانونية أو مالية أو توظيف أو ائتمان أو سلامة) دون مراجعة بشرية مؤهلة؛"}
              </li>
              <li>
                {en
                  ? "infringe intellectual-property or privacy rights, or misrepresent the AI as a licensed professional;"
                  : "ينتهك حقوق الملكية الفكرية أو الخصوصية، أو يصوّر الذكاء الاصطناعي كمحترف مرخّص؛"}
              </li>
              <li>
                {en
                  ? "probe, scrape, overload, reverse engineer, or circumvent security or usage limits, or resell the Service except under a written reseller agreement."
                  : "يفحص أو يستخرج أو يحمّل أو يعكس هندسة أو يتجاوز حدود الأمن أو الاستخدام، أو يعيد بيع الخدمة إلا بموجب اتفاقية إعادة بيع مكتوبة."}
              </li>
            </ul>

            <h2 className="legal-h2">
              {en ? "5. Third-party channels & services" : "5. قنوات وخدمات الأطراف الثالثة"}
            </h2>
            <p>
              {en
                ? "The Service integrates with third-party channels and tools (e.g., WhatsApp/Meta, telephony/SMS carriers, AI model providers, calendars, CRMs, payment processors). Your use of those services is subject to their own terms, and their availability, pricing, and behavior are outside our control. We are not responsible for third-party outages, changes, suspensions, or actions taken by those providers."
                : "تندمج الخدمة مع قنوات وأدوات أطراف ثالثة (مثل واتساب/ميتا وشركات الهاتف/الرسائل ومزوّدي نماذج الذكاء الاصطناعي والتقويمات وأنظمة إدارة العلاقات ومعالجي المدفوعات). يخضع استخدامك لتلك الخدمات لشروطها، وتوافرها وأسعارها وسلوكها خارج سيطرتنا. لسنا مسؤولين عن انقطاعات الأطراف الثالثة أو تغييراتها أو تعليقها أو إجراءاتها."}
            </p>

            <h2 className="legal-h2">{en ? "6. Fees" : "6. الرسوم"}</h2>
            <p>
              {en
                ? "Paid plans, usage limits, and billing terms are as described at sign-up or in an order form. Fees are exclusive of taxes; you are responsible for applicable taxes. Except as required by law or expressly stated, fees are non-refundable. We may change pricing prospectively with reasonable notice."
                : "الخطط المدفوعة وحدود الاستخدام وشروط الفوترة كما تُوصف عند التسجيل أو في نموذج طلب. الرسوم بلا ضرائب؛ وأنت مسؤول عن الضرائب السارية. ما لم يقتضِ القانون أو يُنص صراحة، الرسوم غير قابلة للاسترداد. قد نغيّر الأسعار مستقبلاً بإشعار معقول."}
            </p>

            <h2 className="legal-h2">{en ? "7. AI disclaimer" : "7. إخلاء مسؤولية الذكاء الاصطناعي"}</h2>
            <p>
              {en ? (
                <>
                  The Service uses generative AI and automated systems. Outputs may be{" "}
                  <strong>inaccurate, incomplete, or unexpected</strong> (&quot;hallucinations&quot;) and should not
                  be relied upon as the sole basis for decisions.
                </>
              ) : (
                <>
                  تستخدم الخدمة ذكاءً اصطناعيًا توليديًا وأنظمة آلية. قد تكون المخرجات{" "}
                  <strong>غير دقيقة أو غير مكتملة أو غير متوقعة</strong> («هلوسات») ولا ينبغي الاعتماد عليها
                  وحدها لاتخاذ القرارات.
                </>
              )}
            </p>
            <p>
              {en ? (
                <>
                  AI responses <strong>do not constitute professional advice</strong> (medical, legal,
                  financial, or otherwise). You are responsible for reviewing outputs and for any actions the
                  agent takes based on your configuration.
                </>
              ) : (
                <>
                  ردود الذكاء الاصطناعي <strong>لا تشكّل مشورة مهنية</strong> (طبية أو قانونية أو مالية أو
                  غيرها). أنت مسؤول عن مراجعة المخرجات وعن أي إجراءات يتخذها الوكيل بناءً على إعداداتك.
                </>
              )}
            </p>
            <p>
              {en
                ? `To the maximum extent permitted by law, ${brand.short} is not liable for the content of AI-generated messages or for actions performed by the agent under your instructions/configuration.`
                : `إلى أقصى حد يسمح به القانون، لا تتحمل ${brand.short} المسؤولية عن محتوى الرسائل المولَّدة بالذكاء الاصطناعي أو عن الإجراءات التي ينفّذها الوكيل وفق تعليماتك/إعداداتك.`}
            </p>

            <h2 className="legal-h2">{en ? "8. Intellectual property" : "8. الملكية الفكرية"}</h2>
            <p>
              {en
                ? `${brand.short} and its licensors own all rights in the Service, software, models, and website. You receive a limited, non-exclusive, non-transferable right to use the Service during your subscription. You retain ownership of your content and data; you grant us a limited license to host and process it to provide the Service. If you send feedback or suggestions, you grant us a perpetual, royalty-free license to use them.`
                : `تمتلك ${brand.short} ومرخّصوها جميع الحقوق في الخدمة والبرمجيات والنماذج والموقع. تحصل على حق محدود وغير حصري وغير قابل للنقل لاستخدام الخدمة أثناء اشتراكك. تحتفظ بملكية محتواك وبياناتك؛ وتمنحنا ترخيصًا محدودًا لاستضافتها ومعالجتها لتقديم الخدمة. وإذا أرسلت ملاحظات أو اقتراحات، تمنحنا ترخيصًا دائمًا وخاليًا من الرسوم لاستخدامها.`}
            </p>

            <h2 className="legal-h2">{en ? "9. Data protection" : "9. حماية البيانات"}</h2>
            <p>
              {en ? (
                <>
                  Our handling of personal data is described in the{" "}
                  <Link href={routes.privacy}>Privacy Policy</Link>. Where we process personal data on your
                  behalf, our Data Processing Addendum (&quot;DPA&quot;) applies and is incorporated by reference.
                  You remain the controller of end-user data processed through your agent.
                </>
              ) : (
                <>
                  وصف تعاملنا مع البيانات الشخصية وارد في{" "}
                  <Link href={routes.privacy}>سياسة الخصوصية</Link>. وحيث نعالج بيانات شخصية نيابة عنك، يسري
                  ملحق معالجة البيانات (&quot;DPA&quot;) ويُدمج بالإحالة. وتبقى أنت المتحكم ببيانات المستخدمين
                  النهائيين المعالجة عبر وكيلك.
                </>
              )}
            </p>

            <h2 className="legal-h2">{en ? "10. Confidentiality" : "10. السرية"}</h2>
            <p>
              {en
                ? "Each party will protect the other's non-public information disclosed in connection with the Service using at least reasonable care, and use it only to perform under these Terms, except where disclosure is required by law."
                : "يحمي كل طرف معلومات الطرف الآخر غير العلنية المفصح عنها بخصوص الخدمة بعناية معقولة على الأقل، ويستخدمها فقط للأداء بموجب هذه الشروط، إلا حيث يُطلب الإفصاح قانونًا."}
            </p>

            <h2 className="legal-h2">{en ? "11. Limited warranty" : "11. الضمان المحدود"}</h2>
            <p>
              {en
                ? "We will provide the Service with reasonable skill and care. Except for this, and to the fullest extent permitted by law, the Service is provided without other warranties."
                : "سنقدّم الخدمة بمهارة وعناية معقولتين. وبخلاف ذلك، وإلى أقصى حد يسمح به القانون، تُقدَّم الخدمة بلا ضمانات أخرى."}
            </p>

            <h2 className="legal-h2">
              {en ? '12. Disclaimer: "AS IS"' : "12. إخلاء المسؤولية: «كما هي»"}
            </h2>
            <p>
              {en ? (
                <>
                  To the maximum extent permitted by law, the Service and website are provided{" "}
                  <strong>&quot;as is&quot; and &quot;as available&quot;</strong>, without warranties of any kind,
                  express or implied, including merchantability, fitness for a particular purpose,
                  non-infringement, accuracy, or uninterrupted or error-free operation. We do not warrant that
                  the AI will meet your requirements or that outputs will be accurate or complete.
                </>
              ) : (
                <>
                  إلى أقصى حد يسمح به القانون، تُقدَّم الخدمة والموقع{" "}
                  <strong>«كما هما» و«حسب التوافر»</strong>، بلا ضمانات من أي نوع صريحة أو ضمنية، بما في ذلك
                  القابلية للتسويق أو الملاءمة لغرض معيّن أو عدم الانتهاك أو الدقة أو التشغيل دون انقطاع أو
                  أخطاء. لا نضمن أن الذكاء الاصطناعي سيحقق متطلباتك أو أن المخرجات ستكون دقيقة أو مكتملة.
                </>
              )}
            </p>

            <h2 className="legal-h2">
              {en ? "13. Limitation of liability" : "13. تحديد المسؤولية"}
            </h2>
            <p>{en ? "To the maximum extent permitted by law:" : "إلى أقصى حد يسمح به القانون:"}</p>
            <ul className="legal-list">
              <li>
                {en
                  ? "neither party is liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, goodwill, or data; and"
                  : "لا يتحمل أي طرف مسؤولية الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو التأديبية أو العقابية، أو خسائر الأرباح أو الإيرادات أو السمعة أو البيانات؛ و"}
              </li>
              <li>
                {en
                  ? `${brand.short}'s total aggregate liability arising out of or relating to the Service or these Terms will not exceed the greater of (a) the fees you paid to ${brand.short} in the 12 months before the event giving rise to liability, or (b) AED 500.`
                  : `لا تتجاوز المسؤولية الإجمالية لـ ${brand.short} الناشئة عن الخدمة أو هذه الشروط أو المتعلقة بهما الأكبر من (أ) الرسوم التي دفعتها إلى ${brand.short} خلال 12 شهرًا قبل الحدث المسبب للمسؤولية، أو (ب) 500 درهم إماراتي.`}
              </li>
            </ul>
            <p>
              {en
                ? "Nothing limits liability that cannot be limited by law (e.g., certain cases of fraud, willful misconduct, or death/personal injury caused by negligence)."
                : "لا يحدّ شيء من المسؤولية التي لا يجوز تحديدها قانونًا (مثل بعض حالات الاحتيال أو سوء السلوك المتعمد أو الوفاة/الإصابة الشخصية بسبب الإهمال)."}
            </p>

            <h2 className="legal-h2">{en ? "14. Indemnification" : "14. التعويض"}</h2>
            <p>
              {en
                ? `You will defend, indemnify, and hold harmless ${brand.short} and its affiliates from claims, damages, and costs (including reasonable legal fees) arising from: (a) your content or data; (b) your use of the Service in violation of these Terms or law; (c) your failure to obtain required consents/notices from end-users; or (d) your violation of a third-party channel's policies or of third-party rights.`
                : `ستقوم بالدفاع عن ${brand.short} وشركاتها التابعة وتعويضهما وإبراء ذمتهما من المطالبات والأضرار والتكاليف (بما في ذلك أتعاب قانونية معقولة) الناشئة عن: (أ) محتواك أو بياناتك؛ (ب) استخدامك للخدمة بالمخالفة لهذه الشروط أو القانون؛ (ج) إخفاقك في الحصول على الموافقات/الإشعارات المطلوبة من المستخدمين النهائيين؛ أو (د) انتهاكك لسياسات قناة طرف ثالث أو لحقوق طرف ثالث.`}
            </p>

            <h2 className="legal-h2">
              {en ? "15. Term, suspension & termination" : "15. المدة والتعليق والإنهاء"}
            </h2>
            <p>
              {en
                ? "These Terms apply while you use the Service. Either party may terminate as set out in the applicable order or with reasonable notice. We may suspend or terminate access immediately for material breach, security risk, non-payment, or legal requirement. On termination, your right to use the Service ends and, subject to the Privacy Policy and DPA, we will delete or return your data within a reasonable period. Sections that by nature should survive (e.g., IP, disclaimers, liability, indemnity, governing law) survive termination."
                : "تسري هذه الشروط طالما تستخدم الخدمة. يجوز لأي طرف الإنهاء كما في الطلب الساري أو بإشعار معقول. قد نعلّق أو ننهي الوصول فورًا عند مخالفة جوهرية أو خطر أمني أو عدم الدفع أو متطلب قانوني. عند الإنهاء ينتهي حقك في استخدام الخدمة، ووفق سياسة الخصوصية وDPA نحذف بياناتك أو نعيدها خلال فترة معقولة. البنود التي بطبيعتها تستمر (مثل الملكية الفكرية وإخلاء المسؤولية والمسؤولية والتعويض والقانون الحاكم) تبقى بعد الإنهاء."}
            </p>

            <h2 className="legal-h2">
              {en ? "16. Governing law & disputes" : "16. القانون الحاكم والنزاعات"}
            </h2>
            <p>
              {en
                ? "These Terms are governed by the laws of the United Arab Emirates, without regard to conflict-of-laws rules. The courts (or arbitration seat) of Dubai, United Arab Emirates have exclusive jurisdiction, except that either party may seek injunctive relief to protect its IP or confidential information in any competent court."
                : "تخضع هذه الشروط لقوانين الإمارات العربية المتحدة دون اعتبار لقواعد تنازع القوانين. لمحاكم (أو مقر التحكيم في) دبي، الإمارات، اختصاص حصري، باستثناء أنه يجوز لأي طرف طلب تدبير زجري لحماية ملكيته الفكرية أو معلوماته السرية لدى أي محكمة مختصة."}
            </p>

            <h2 className="legal-h2">
              {en ? "17. Changes to these Terms" : "17. تغييرات هذه الشروط"}
            </h2>
            <p>
              {en
                ? "We may update these Terms from time to time. Material changes will be posted here with a revised date and, where appropriate, additional notice. Continued use after changes take effect constitutes acceptance."
                : "قد نحدّث هذه الشروط من وقت لآخر. تُنشر التغييرات الجوهرية هنا بتاريخ منقّح، ومع إشعار إضافي حيث يناسب. استمرار الاستخدام بعد سريان التغييرات يعد قبولًا."}
            </p>

            <h2 className="legal-h2">{en ? "18. General" : "18. أحكام عامة"}</h2>
            <p>
              {en ? (
                <>
                  These Terms (with the Privacy Policy, DPA, and any order form) are the entire agreement between
                  the parties and supersede prior agreements on the subject. If any provision is unenforceable,
                  the rest remains in effect. We may assign these Terms in connection with a merger,
                  acquisition, or sale of assets. Neither party is liable for delays or failures due to events
                  beyond reasonable control (force majeure). Notices to {brand.short}:{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>, {brand.name}, {registeredAddress}.
                </>
              ) : (
                <>
                  تشكّل هذه الشروط (مع سياسة الخصوصية وDPA وأي نموذج طلب) الاتفاق الكامل بين الطرفين وتحل محل
                  الاتفاقات السابقة في الموضوع. وإذا تعذّر إنفاذ أي بند يبقى الباقي ساريًا. قد ننقل هذه الشروط
                  في اندماج أو استحواذ أو بيع أصول. لا يتحمل أي طرف تأخيرات أو إخفاقات بسبب أحداث خارج السيطرة
                  المعقولة (القوة القاهرة). الإشعارات إلى {brand.short}:{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>، {brand.name}، {registeredAddress}.
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
