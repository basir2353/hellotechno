"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { IconChevron, IconWhatsApp } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, images, routes } from "@/lib/site";

const usdAmounts: Record<string, string> = {
  "90": "26",
  "250": "71",
  "599": "171",
};

type FeatureIcon = "check" | "plus" | "x";

function Mark({ kind, dark = false }: { kind: FeatureIcon; dark?: boolean }) {
  if (kind === "x") {
    return (
      <span className={`pp-mark is-x ${dark ? "is-dark" : ""}`} aria-hidden>
        ×
      </span>
    );
  }
  if (kind === "plus") {
    return (
      <span className={`pp-mark is-plus ${dark ? "is-dark" : ""}`} aria-hidden>
        +
      </span>
    );
  }
  return (
    <span className={`pp-mark is-check ${dark ? "is-dark" : ""}`} aria-hidden>
      ✓
    </span>
  );
}

function CreditSplit({
  credits,
  initialVoiceShare,
  voiceLabel,
  messagesLabel,
  hint,
}: {
  credits: number;
  initialVoiceShare: number;
  voiceLabel: string;
  messagesLabel: string;
  hint: string;
}) {
  const [share, setShare] = useState(initialVoiceShare);
  const voiceMins = Math.round((credits * share) / 2);
  const messages = Math.round(credits * (1 - share) * 20);

  return (
    <div className="pp-split">
      <p className="pp-split-line">
        <strong>{voiceMins.toLocaleString()}</strong> {voiceLabel} <span className="pp-split-plus">+</span>
      </p>
      <p className="pp-split-line">
        <strong>{messages.toLocaleString()}</strong> {messagesLabel}
      </p>
      <input
        className="pp-split-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(share * 100)}
        onChange={(e) => setShare(Number(e.target.value) / 100)}
        aria-label={hint}
      />
      <p className="pp-split-hint">{hint}</p>
    </div>
  );
}

function parseFeature(raw: string): { icon: FeatureIcon; text: string } {
  if (raw.startsWith("x:")) return { icon: "x", text: raw.slice(2) };
  if (raw.startsWith("+:")) return { icon: "plus", text: raw.slice(2) };
  if (raw.startsWith("✓:") || raw.startsWith("check:")) {
    return { icon: "check", text: raw.replace(/^(✓:|check:)/, "") };
  }
  return { icon: "check", text: raw };
}

export function PricingHero() {
  const { t } = useLocale();
  const p = t.pricing;

  return (
    <section className="pp-hero">
      <div className="pp-hero-bg" aria-hidden />
      <div className="shell relative z-[1]">
        <div className="pp-hero-inner">
          <span className="pp-hero-pill">
            <span aria-hidden />
            {p.pageEyebrow}
          </span>
          <h1 className="pp-hero-title">
            {p.pageTitleBefore}{" "}
            <span className="pp-hero-accent">{p.pageTitleAccent}</span> {p.pageTitleAfter}
          </h1>
          <p className="pp-hero-body">{p.pageBody}</p>
          <div className="pp-hero-tags">
            {p.industries.map((item) => (
              <span key={item} className="pp-hero-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ hideIntro = false }: { hideIntro?: boolean }) {
  const { t } = useLocale();
  const p = t.pricing;
  const [usd, setUsd] = useState(false);

  return (
    <section id="pricing" className="pp-section">
      <div className="shell">
        {hideIntro ? null : (
          <div className="mx-auto max-w-3xl text-center">
            <span className="pill pill-purple">{p.label}</span>
            <h2 className="type-h2 mt-5">{p.title}</h2>
            <p className="type-lead mx-auto mt-4 max-w-2xl">{p.body}</p>
          </div>
        )}

        <div className={`pp-toolbar ${hideIntro ? "" : "mt-8"}`}>
          <div className="pricing-currency">
            <button type="button" className={!usd ? "is-active" : ""} onClick={() => setUsd(false)}>
              {p.currency}
            </button>
            <button type="button" className={usd ? "is-active" : ""} onClick={() => setUsd(true)}>
              {p.usd}
            </button>
          </div>
          <p className="pp-toolbar-promo">
            {p.promo} <span>{p.promoAccent}</span>
          </p>
        </div>

        <div className="pp-grid">
          {p.plans.map((plan) => {
            const featured = "featured" in plan && plan.featured;
            const dark = "dark" in plan && plan.dark;
            const numeric = /^\d+$/.test(plan.price);
            const shown = usd && numeric ? usdAmounts[plan.price] ?? plan.price : plan.price;
            const sales = Boolean(dark) || !numeric;
            const creditCount = Number.parseInt(plan.credits, 10);
            const hasSplit = Boolean(featured || plan.name === "Connected") && Number.isFinite(creditCount);

            return (
              <article
                key={plan.name}
                className={`pp-card ${featured ? "is-featured" : ""} ${dark ? "is-dark" : ""}`}
              >
                {featured ? <span className="pp-badge">{p.recommended}</span> : null}

                <h3 className="pp-name">{plan.name}</h3>
                <p className="pp-blurb">{plan.blurb}</p>

                <p className="pp-price">
                  {usd && numeric ? "$" : ""}
                  {shown}
                  {numeric ? <span className="pp-month">{p.month}</span> : null}
                </p>

                {numeric ? (
                  <p className="pp-approx">
                    {usd ? (
                      <>
                        {p.currency} · {plan.price}
                      </>
                    ) : (
                      <>
                        {p.currency}
                        <span className="ms-2">{plan.approx}</span>
                      </>
                    )}
                  </p>
                ) : (
                  <p className="pp-approx">{plan.estimate}</p>
                )}

                {numeric ? <p className="pp-estimate">{plan.estimate}</p> : <p className="pp-estimate">{plan.approx}</p>}

                {!dark ? (
                  <div className="pp-quota">
                    {plan.credits ? (
                      <p>
                        <strong>{plan.credits.split(" ")[0]}</strong> {plan.credits.split(" ").slice(1).join(" ")}
                      </p>
                    ) : null}

                    {hasSplit ? (
                      <CreditSplit
                        credits={creditCount}
                        initialVoiceShare={plan.name === "Connected" ? 374 / 750 : 150 / 300}
                        voiceLabel={p.voiceMinutes}
                        messagesLabel={p.messagesLabel}
                        hint={p.splitHint}
                      />
                    ) : (
                      plan.detailLines.map((line) => (
                        <p key={line}>
                          <strong>{line.split(" ")[0]}</strong> {line.split(" ").slice(1).join(" ")}
                        </p>
                      ))
                    )}
                  </div>
                ) : null}

                {sales ? (
                  <a
                    href={routes.talk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pp-cta ${dark ? "is-ghost" : "is-solid"}`}
                  >
                    {p.sales}
                  </a>
                ) : (
                  <Link
                    href={routes.trial}
                    className={`pp-cta ${dark ? "is-ghost" : "is-solid"}`}
                  >
                    {p.cta}
                  </Link>
                )}

                <ul className="pp-features">
                  {plan.features.map((feature) => {
                    const item = parseFeature(feature);
                    return (
                      <li key={feature}>
                        <Mark kind={item.icon} dark={Boolean(dark)} />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        <ul className="pp-notes">
          {p.notes.map((note) => (
            <li key={note.title}>
              <p className="pp-note-title">{note.title}</p>
              <p className="pp-note-body">{note.body}</p>
            </li>
          ))}
        </ul>

        {hideIntro ? null : (
          <div className="mt-10 text-center">
            <Link href={`${routes.pricing}#compare`} className="btn-primary inline-flex">
              {p.compareLink}
            </Link>
            <p className="mt-4 text-sm text-[var(--soft)]">{p.compareHint}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function EveryPlan() {
  const { t } = useLocale();
  const p = t.pricing;

  return (
    <section className="pp-every">
      <Image src={images.team} alt="" fill className="object-cover" sizes="100vw" />
      <div className="pp-every-shade" aria-hidden />
      <div className="shell relative z-[1]">
        <p className="pp-every-label">{p.everyLabel}</p>
        <div className="pp-every-grid">
          <div className="pp-every-col">
            {p.everyItems.slice(0, 3).map((item) => (
              <p key={item} className="pp-every-item">
                <Mark kind="check" />
                <span>{item}</span>
              </p>
            ))}
          </div>
          <div className="pp-every-col">
            {p.everyItems.slice(3).map((item) => (
              <p key={item} className="pp-every-item">
                <Mark kind="check" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="pp-every-cta-wrap">
          <Link href={routes.trial} className="pp-every-cta">
            <span className="pp-every-dot" aria-hidden />
            {p.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PricingUnsure() {
  const { t } = useLocale();
  const p = t.pricing;
  return (
    <section className="pp-unsure">
      <div className="shell">
        <p>
          {p.unsure}{" "}
          <Link href={routes.demo}>{p.unsureLink}</Link>
        </p>
      </div>
    </section>
  );
}

type Cell = string | "check" | "x";

type CompareSection = {
  title: string;
  rows: { label: string; cells: [Cell, Cell, Cell, Cell] }[];
};

export function PlanCompare() {
  const { t, locale } = useLocale();
  const p = t.pricing;
  const currency = p.currency;

  const sections: CompareSection[] = useMemo(() => {
    if (locale === "ar") {
      return [
        {
          title: "الخطة",
          rows: [
            { label: "السعر الشهري", cells: [`${currency} 90`, `${currency} 250`, `${currency} 599`, "مخصص"] },
            { label: "الرصيد شهريًا", cells: ["100", "300", "750", "مجمّع حسب حجمك"] },
            { label: "إذا ذهب كل الرصيد للمكالمات", cells: ["x", "150 دقيقة", "375 دقيقة", "مخصص"] },
            { label: "إذا ذهب كل الرصيد للرسائل", cells: ["2,000 رسالة", "6,000 رسالة", "15,000 رسالة", "مخصص"] },
            {
              label: "التجربة المجانية",
              cells: ["50 رصيدًا بدون رسوم إعداد", "50 رصيدًا بدون رسوم إعداد", "50 رصيدًا بدون رسوم إعداد", "مخصص"],
            },
          ],
        },
        {
          title: "القنوات",
          rows: [
            {
              label: "المراسلة: واتساب، السوشيال، دردشة الويب، البريد والرسائل",
              cells: ["check", "check", "check", "check"],
            },
            { label: "المكالمات: واردة وإعادة اتصال على رقمك", cells: ["x", "check", "check", "check"] },
            { label: "أرقام الهاتف والواتساب", cells: ["1 (واتساب)", "حتى 2", "حتى 3", "واحد لكل فرع وعلامة"] },
            {
              label: "المكالمات تُجاب قبل الرنة الثالثة بالعربية أو الإنجليزية",
              cells: ["x", "check", "check", "check"],
            },
            { label: "نصوص المكالمات في خيط العميل", cells: ["x", "check", "check", "check"] },
          ],
        },
        {
          title: "النطاق",
          rows: [
            { label: "المواقع", cells: ["1", "حتى 2", "حتى 3", "غير محدود"] },
            { label: "مقاعد صندوق الفريق", cells: ["1", "3", "5", "حسب منظمتك"] },
            { label: "اللغات", cells: ["الإنجليزية والعربية", "حتى 5", "10+", "10+"] },
            {
              label: "معرفة من موقعك والقائمة والأسئلة والأسعار",
              cells: ["check", "check", "check", "check"],
            },
            {
              label: "متابعات استباقية حسب قواعدك",
              cells: ["x", "check", "check", "check"],
            },
          ],
        },
        {
          title: "الأنظمة",
          rows: [
            { label: "روابط الحجز وروابط الدفع الآمنة", cells: ["check", "check", "check", "check"] },
            {
              label: "مزامنة حية مع أنظمتك",
              cells: ["x", "x", "نظام واحد: نقطة بيع أو حجز أو متجر أو CRM", "تكاملات مخصصة: POS وERP وCRM والحجز والطلبات"],
            },
            {
              label: "تقارير المقر",
              cells: ["x", "x", "مجمّعة عبر مواقعك", "حسب العلامة والفرع والقناة"],
            },
            { label: "وحدة تحكم بشركاء العلامة البيضاء", cells: ["x", "x", "x", "check"] },
          ],
        },
        {
          title: "الإعداد والدعم",
          rows: [
            {
              label: "الإعداد",
              cells: ["دليل ذاتي", "مكالمة إعداد واحدة", "إعداد مخصص مع أسبوع ظل", "مدير حساب وطرح مرحلي"],
            },
            {
              label: "الدعم",
              cells: ["بريد", "دردشة وبريد", "أولوية مع جهة اتصال مسماة", "أولوية مع أوقات استجابة متفق عليها"],
            },
          ],
        },
        {
          title: "الأمن والبيانات",
          rows: [
            {
              label: "إجابات من معرفتك المعتمدة فقط؛ استلام بشري بنقرة واحدة",
              cells: ["check", "check", "check", "check"],
            },
            {
              label: "ISO 27001 وISO 42001 وISO 9001، مع سجل تدقيق كامل",
              cells: ["check", "check", "check", "check"],
            },
            {
              label: "استضافة داخل المملكة أو للمستأجرين المقيمين في الإمارات أو محليًا",
              cells: ["x", "x", "x", "check"],
            },
            {
              label: "مراجعة أمنية وتعاقدية مع فرق تقنية المعلومات والقانون لديك",
              cells: ["x", "x", "x", "check"],
            },
          ],
        },
        {
          title: "وعد النتيجة",
          rows: [
            {
              label: "وعدنا، أو يُحتسب ذلك الشهر",
              cells: [
                "**تمت الإجابة.** كل رسالة تُرد خلال أقل من 5 ثوانٍ، على مدار الساعة.",
                "**حُلّت.** إجابة، إضافةً إلى إغلاق 60% من استفسارات الاتصال الأول دون تدخل الموظفين بحلول اليوم 90.",
                "**اكتملت.** حلّ، إضافةً إلى كتابة كل حجز أو طلب مؤكد في نظامك خلال 60 ثانية.",
                "**اتفاقية مستوى خدمة.** أوقات الاستجابة والدقة والتوافر مكتوبة في عقدك.",
              ],
            },
          ],
        },
      ];
    }

    return [
      {
        title: "The plan",
        rows: [
          { label: "Monthly price", cells: [`${currency} 90`, `${currency} 250`, `${currency} 599`, "Custom"] },
          { label: "Credits a month", cells: ["100", "300", "750", "Pooled, sized to you"] },
          { label: "If every credit goes to calls", cells: ["x", "150 call minutes", "375 call minutes", "Custom"] },
          {
            label: "If every credit goes to messages",
            cells: ["2,000 messages", "6,000 messages", "15,000 messages", "Custom"],
          },
          {
            label: "Free trial",
            cells: [
              "50 credits at $0 setup cost",
              "50 credits at $0 setup cost",
              "50 credits at $0 setup cost",
              "Custom",
            ],
          },
        ],
      },
      {
        title: "Channels",
        rows: [
          {
            label: "Messaging: WhatsApp, Social Media, Web Chat, Email & SMS",
            cells: ["check", "check", "check", "check"],
          },
          { label: "Voice calls: inbound and callbacks on your number", cells: ["x", "check", "check", "check"] },
          {
            label: "Phone and WhatsApp numbers",
            cells: ["1 (WhatsApp)", "Up to 2", "Up to 3", "One per branch and brand"],
          },
          {
            label: "Calls picked up before the third ring, in the caller's Arabic or English",
            cells: ["x", "check", "check", "check"],
          },
          { label: "Call transcripts in the customer thread", cells: ["x", "check", "check", "check"] },
        ],
      },
      {
        title: "Scope",
        rows: [
          { label: "Locations", cells: ["1", "Up to 2", "Up to 3", "Unlimited"] },
          { label: "Team inbox seats", cells: ["1", "3", "5", "Sized to your organisation"] },
          { label: "Languages", cells: ["English and Arabic", "Up to 5", "10+", "10+"] },
          {
            label: "Knowledge from your website, menu, FAQ and price list",
            cells: ["check", "check", "check", "check"],
          },
          {
            label: "Proactive follow-ups by your rules: reminders, no-show recovery, promotions",
            cells: ["x", "check", "check", "check"],
          },
        ],
      },
      {
        title: "Systems",
        rows: [
          { label: "Booking links and secure payment links", cells: ["check", "check", "check", "check"] },
          {
            label: "Live sync into your systems",
            cells: ["x", "x", "One system: POS, booking, store or CRM", "Custom integrations: POS, ERP, CRM, booking, ordering"],
          },
          {
            label: "Head-office reporting",
            cells: ["x", "x", "Pooled across your locations", "By brand, branch and channel"],
          },
          { label: "Partner white-label console", cells: ["x", "x", "x", "check"] },
        ],
      },
        {
          title: "Onboarding and support",
          rows: [
            {
              label: "Setup",
              cells: [
                "Self-serve guide",
                "One guided onboarding call",
                "Dedicated onboarding with a shadow week",
                "Account manager and phased rollout",
              ],
            },
            {
              label: "Support",
              cells: [
                "Email",
                "Chat and email",
                "Priority, with a named contact",
                "Priority, with agreed response times",
              ],
            },
          ],
        },
        {
          title: "Security and data",
          rows: [
            {
              label: "Answers only from your approved knowledge; one-click human takeover",
              cells: ["check", "check", "check", "check"],
            },
            {
              label: "ISO 27001, ISO 42001 and ISO 9001, with a full audit record",
              cells: ["check", "check", "check", "check"],
            },
            {
              label: "In-Kingdom hosting, UAE-resident tenants or on-premise",
              cells: ["x", "x", "x", "check"],
            },
            {
              label: "Security and contract review with your IT and legal teams",
              cells: ["x", "x", "x", "check"],
            },
          ],
        },
        {
          title: "Outcome promise",
          rows: [
            {
              label: "Our promise, or that month is credited",
              cells: [
                "**Answered.** Every message replied to in under 5 seconds, 24 hours a day.",
                "**Resolved.** Answered, plus 60% of first-contact enquiries closed with no staff involvement by day 90.",
                "**Completed.** Resolved, plus every confirmed booking or order written into your system within 60 seconds.",
                "**Agreed SLA.** Response times, accuracy and uptime written into your contract.",
              ],
            },
          ],
        },
      ];
  }, [currency, locale]);

  const heads = locale === "ar" ? ["Starter", "Growth", "Connected", "Enterprise"] : ["Starter", "Growth", "Connected", "Enterprise"];

  const renderCell = (cell: Cell) => {
    if (cell === "check") return <Mark kind="check" />;
    if (cell === "x") return <Mark kind="x" />;
    if (cell.startsWith("**")) {
      const match = cell.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        return (
          <span className="pp-outcome">
            <strong>{match[1]}</strong> {match[2]}
          </span>
        );
      }
    }
    return <span>{cell}</span>;
  };

  return (
    <section id="compare" className="pp-compare">
      <div className="shell">
        <div className="pp-compare-head">
          <span className="pp-hero-pill">
            <span aria-hidden />
            {p.compareLabel}
          </span>
          <h2 className="pp-compare-title">{p.compareTitle}</h2>
          <p className="pp-compare-body">{p.compareBody}</p>
        </div>

        <div className="pp-table-wrap">
          <table className="pp-table">
            <thead>
              <tr>
                <th className="pp-table-label-col" scope="col">
                  <span className="sr-only">{locale === "ar" ? "الميزة" : "Feature"}</span>
                </th>
                {heads.map((head, index) => (
                  <th key={head} className={index === 1 ? "is-growth" : ""} scope="col">
                    <span className="pp-table-plan">{head}</span>
                    <span className="pp-table-price">
                      {index === 0 ? (
                        <>
                          <strong>90</strong> {p.month}
                        </>
                      ) : null}
                      {index === 1 ? (
                        <>
                          <strong>250</strong> {p.month}
                        </>
                      ) : null}
                      {index === 2 ? (
                        <>
                          <strong>599</strong> {p.month}
                        </>
                      ) : null}
                      {index === 3 ? <strong className="is-custom">{locale === "ar" ? "مخصص" : "Custom"}</strong> : null}
                    </span>
                    {index < 3 ? <span className="pp-table-currency">{p.currency}</span> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <Fragment key={section.title}>
                  <tr className="pp-table-section">
                    <th colSpan={5} scope="colgroup">
                      {section.title}
                    </th>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={`${section.title}-${row.label}`} className={section.title.toLowerCase().includes("outcome") || section.title.includes("وعد") ? "is-outcome" : ""}>
                      <th scope="row">{row.label}</th>
                      {row.cells.map((cell, index) => (
                        <td key={`${row.label}-${index}`} className={index === 1 ? "is-growth" : ""}>
                          {renderCell(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pp-compare-actions">
          <Link href={routes.trial} className="pp-action is-primary">
            {p.cta}
          </Link>
          <Link href={routes.demo} className="pp-action is-secondary">
            {p.demoCta}
          </Link>
          <a
            href={routes.talk}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-action is-whatsapp"
          >
            <IconWhatsApp className="h-4 w-4" />
            {p.whatsappCta}
          </a>
          <Link href="#enterprise" className="pp-action is-secondary">
            {p.enterpriseCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function buildNovemberDays() {
  const firstDow = 6;
  const daysInMonth = 30;
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const availableDays = new Set([12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30]);

export function PricingEnterprise() {
  const { t, locale } = useLocale();
  const p = t.pricing;
  const en = locale === "en";
  const cells = useMemo(() => buildNovemberDays(), []);
  const [selected, setSelected] = useState<number | null>(18);
  const weekdays = en
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["إث", "ثل", "أر", "خم", "جم", "سب", "أح"];

  return (
    <section id="enterprise" className="pp-enterprise">
      <div className="shell pp-enterprise-grid">
        <div className="pp-enterprise-copy">
          <p className="pp-enterprise-label">
            <span aria-hidden />
            {p.enterpriseLabel}
          </p>
          <h2 className="pp-enterprise-title">{p.enterpriseTitle}</h2>
          <p className="pp-enterprise-body">{p.enterpriseBody}</p>
          <ul className="pp-enterprise-list">
            {p.enterprisePoints.map((item) => (
              <li key={item}>
                <Mark kind="check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="pp-enterprise-small">
            {p.enterpriseSmall}{" "}
            <Link href={routes.trial}>{p.cta}</Link>
          </p>
        </div>

        <div className="pp-enterprise-cal">
          <p className="pp-enterprise-cal-title">{t.cta.selectDay}</p>
          <div className="pp-enterprise-cal-nav">
            <span>{en ? "November 2026" : "نوفمبر 2026"}</span>
            <span aria-hidden>‹ ›</span>
          </div>
          <div className="pp-enterprise-weekdays">
            {weekdays.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="pp-enterprise-days">
            {cells.map((day, idx) => {
              if (!day) return <span key={`e-${idx}`} />;
              const isAvailable = availableDays.has(day);
              const isSelected = selected === day;
              return (
                <button
                  key={day}
                  type="button"
                  disabled={!isAvailable}
                  className={`pp-day ${isAvailable ? "is-available" : ""} ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelected(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="pp-enterprise-tz">
            <span>{t.cta.timeZone}</span>
            <span>{en ? "Asia/Dubai (GST)" : "آسيا/دبي (GST)"}</span>
          </div>
          <p className="pp-enterprise-fallback">
            {t.cta.fallback}{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a> {t.cta.fallbackEnd}
          </p>
        </div>
      </div>
    </section>
  );
}

export function PricingFaq() {
  const { t } = useLocale();
  const p = t.pricing;
  const [open, setOpen] = useState(0);

  return (
    <section id="pricing-faq" className="pp-faq">
      <div className="shell">
        <div className="pp-faq-head">
          <span className="pp-hero-pill">
            <span aria-hidden />
            {p.faqLabel}
          </span>
          <h2 className="pp-faq-title">{p.faqTitle}</h2>
        </div>

        <div className="pp-faq-list">
          {p.faqItems.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className={`pp-faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="pp-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <IconChevron className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? <p className="pp-faq-body">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
