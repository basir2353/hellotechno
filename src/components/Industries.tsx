"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconChat,
  IconInstagram,
  IconMail,
  IconPhone,
  IconSms,
  IconWhatsApp,
} from "@/components/Icons";
import {
  playbookImages,
  playbookLive,
  playbookMeta,
  scenarioMeta,
  scenarioScripts,
} from "@/lib/content";
import { type IndustryId } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { routes } from "@/lib/site";

const channelRow = [
  { Icon: IconWhatsApp, key: "WhatsApp" },
  { Icon: IconPhone, key: "Voice / Call" },
  { Icon: IconChat, key: "Web chat" },
  { Icon: IconSms, key: "SMS" },
  { Icon: IconInstagram, key: "Instagram" },
  { Icon: IconMail, key: "Email" },
] as const;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function Scenario() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState<IndustryId>("hospitality");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [guestLang, setGuestLang] = useState<"en" | "ar">(locale === "ar" ? "ar" : "en");
  const [replayKey, setReplayKey] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [systemDone, setSystemDone] = useState(false);
  const bubblesRef = useRef<HTMLDivElement>(null);

  const tab = t.industries.tabs.find((item) => item.id === active)!;
  const scripts = scenarioScripts[active];
  const script = scripts[Math.min(moduleIndex, scripts.length - 1)] ?? scripts[0];
  const meta = scenarioMeta[active];
  const agentName = useMemo(() => (locale === "ar" ? "يوسف كريم" : "Yousef Karim"), [locale]);
  const en = locale === "en";
  const simLang = guestLang;

  useEffect(() => {
    let cancelled = false;
    const lines = script.lines;

    setVisibleCount(0);
    setTyping(false);
    setSystemDone(false);

    const run = async () => {
      for (let i = 0; i < lines.length; i += 1) {
        if (cancelled) return;
        const line = lines[i];

        if (line.who === "agent") {
          setTyping(true);
          await wait(850);
          if (cancelled) return;
          setTyping(false);
          await wait(120);
        } else {
          await wait(i === 0 ? 450 : 700);
        }

        if (cancelled) return;
        setVisibleCount(i + 1);
        await wait(line.who === "agent" ? 1100 : 850);
      }

      if (cancelled) return;
      await wait(450);
      setSystemDone(true);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [replayKey, active, moduleIndex, guestLang, script]);

  useEffect(() => {
    const el = bubblesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount, typing, systemDone]);

  return (
    <section id="home-demo" className="scenario-section">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="selected-eyebrow justify-center">{t.scenario.label}</p>
          <h2 className="type-h2 mt-4">{t.scenario.title}</h2>
          <p className="type-lead mx-auto mt-4 max-w-2xl">{t.scenario.body}</p>
        </div>

        <div className="scenario-tabs" role="tablist" aria-label={t.industries.label}>
          {t.industries.tabs.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={selected ? "is-active" : ""}
                onClick={() => {
                  setActive(item.id as IndustryId);
                  setModuleIndex(0);
                  setReplayKey((k) => k + 1);
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="scenario-layout">
          <aside className="scenario-side">
            <p className="scenario-kicker">{t.scenario.useCase}</p>
            <div className="scenario-cases">
              {tab.cases.map((item, index) => {
                const selected = index === moduleIndex;
                return (
                  <button
                    key={item.title}
                    type="button"
                    className={`scenario-case ${selected ? "is-active" : ""}`}
                    onClick={() => {
                      setModuleIndex(index);
                      setReplayKey((k) => k + 1);
                    }}
                  >
                    <span className="scenario-case-title">{item.title}</span>
                    <span className="scenario-case-body">{item.body}</span>
                  </button>
                );
              })}
            </div>

            <p className="scenario-kicker mt-5">{t.scenario.guestLang}</p>
            <div className="scenario-lang">
              {(["en", "ar"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  className={guestLang === code ? "is-active" : ""}
                  onClick={() => {
                    setGuestLang(code);
                    setReplayKey((k) => k + 1);
                  }}
                >
                  {code === "en" ? "English" : "العربية"}
                </button>
              ))}
            </div>

            <div className="scenario-duty">
              <span className="scenario-duty-avatar">{locale === "ar" ? "ي" : "Y"}</span>
              <div>
                <p className="scenario-duty-label">{t.scenario.onDuty}</p>
                <p className="scenario-duty-name">{agentName}</p>
                <p className="scenario-duty-role">{locale === "ar" ? meta.role.ar : meta.role.en}</p>
                <p className="scenario-duty-sla">{t.scenario.sla}</p>
                <p className="scenario-duty-systems">
                  {en ? `Works with ${meta.systems}` : `يعمل مع ${meta.systems}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="scenario-replay"
              onClick={() => setReplayKey((k) => k + 1)}
            >
              {t.scenario.replay}
            </button>
          </aside>

          <div className="scenario-stage">
            <div className="scenario-transcript">
              <div className="scenario-transcript-bar">
                <span className="scenario-live">{t.scenario.transcript}</span>
                <span className="scenario-path">
                  {simLang === "ar" ? script.path.ar : script.path.en}
                </span>
                <span className="scenario-scripted">
                  {en ? "Scripted simulation" : "محاكاة مكتوبة"}
                </span>
              </div>

              <div key={replayKey} ref={bubblesRef} className="scenario-bubbles" aria-live="polite">
                {script.lines.slice(0, visibleCount).map((line, index) => (
                  <div
                    key={`${replayKey}-${index}-${line.text.en}`}
                    className={`scenario-bubble ${line.who === "guest" ? "is-guest" : "is-agent"}`}
                  >
                    {simLang === "ar" ? line.text.ar : line.text.en}
                  </div>
                ))}

                {typing ? (
                  <div className="scenario-typing" aria-label={en ? "Agent is typing" : "الوكيل يكتب"}>
                    <span />
                    <span />
                    <span />
                  </div>
                ) : null}

                {systemDone ? (
                  <p className="scenario-system">
                    ✦ {simLang === "ar" ? script.system.ar : script.system.en}
                  </p>
                ) : null}
              </div>

              <div className="scenario-stage-cta">
                <Link href={routes.demo} className="btn-primary">
                  {t.nav.demo}
                </Link>
              </div>
            </div>

            <div className="scenario-footer-card">
              <ul className="scenario-channels">
                {channelRow.map(({ Icon, key }) => (
                  <li key={key}>
                    <Icon className="h-5 w-5" />
                    <span>{key}</span>
                  </li>
                ))}
              </ul>
              <p className="scenario-note">{t.scenario.note}</p>
              <div className="scenario-footer-actions">
                <Link href={routes.trial} className="btn-primary">
                  {t.nav.trial}
                </Link>
                <Link href={routes.demo} className="btn-secondary">
                  {t.nav.demo}
                </Link>
              </div>
              <p className="scenario-footer-link">
                <Link href={routes.demo}>{t.scenario.cta}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Playbooks() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState<IndustryId>("hospitality");
  const tab = t.industries.tabs.find((item) => item.id === active)!;
  const id = active;
  const live = playbookLive[id];
  const meta = playbookMeta[id];
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section id="industries" className="playbooks-section">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="selected-eyebrow justify-center">{t.industries.label}</p>
          <h2 className="type-h2 mt-4">{t.industries.title}</h2>
          <p className="type-lead mx-auto mt-4 max-w-2xl">{t.industries.body}</p>
        </div>

        <div className="scenario-tabs mt-8">
          {t.industries.tabs.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                className={selected ? "is-active" : ""}
                onClick={() => {
                  setActive(item.id as IndustryId);
                  setActiveCase(0);
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="playbook-panel">
          <p className="playbook-focus">{tab.focus}</p>
          <h3 className="playbook-title">{tab.name}</h3>

          <div className="playbook-pw">
            <article className="is-pain">
              <p>{t.industries.pain}</p>
              <h4>{tab.pain}</h4>
            </article>
            <article className="is-win">
              <p>{t.industries.win}</p>
              <h4>{tab.win}</h4>
            </article>
          </div>

          <p className="playbook-usecases-label">
            {locale === "ar" ? "حالات الاستخدام في هذا القطاع" : "Platform use cases in this vertical"}
          </p>

          <div className="playbook-cases">
            {tab.cases.map((item, index) => {
              const extra = meta[index];
              const selected = index === activeCase;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`playbook-case ${selected ? "is-active" : ""}`}
                  onClick={() => setActiveCase(index)}
                >
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                  <div className="playbook-chips">
                    {t.scenario.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                  {extra ? (
                    <>
                      <p className="playbook-systems">{extra.systems}</p>
                      <p className="playbook-sla">
                        <span />
                        {locale === "ar" ? extra.sla.ar : extra.sla.en}
                      </p>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="playbook-live">
            <div className="playbook-live-media">
              <Image src={playbookImages[id]} alt="" fill className="object-cover" sizes="900px" />
              <div className="playbook-live-overlay" />
            </div>
            <div className="playbook-live-content">
              <p className="playbook-live-kicker">{locale === "ar" ? "عرض حي" : "Live demo"}</p>
              <h4>{locale === "ar" ? live.title.ar : live.title.en}</h4>
              <p>{locale === "ar" ? live.body.ar : live.body.en}</p>
              <div className="playbook-chips is-light">
                {t.scenario.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
              <div className="playbook-live-actions">
                <Link href={routes.demo} className="btn-primary">
                  {t.hero.live} →
                </Link>
                <p>
                  <span className="playbook-live-dot" />
                  {locale === "ar" ? "بلا تسجيل وبلا بطاقة، يبدأ بنقرة" : "No sign-up, no card, starts in one tap"}
                </p>
              </div>
            </div>
          </div>

          <p className="playbook-explore">
            <Link href={live.href}>{locale === "ar" ? live.explore.ar : live.explore.en} →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
