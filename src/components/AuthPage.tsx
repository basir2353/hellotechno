"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { brand, routes } from "@/lib/site";

const countries = [
  { code: "AE", dial: "+971", label: "AE +971", flag: "🇦🇪" },
  { code: "SA", dial: "+966", label: "SA +966", flag: "🇸🇦" },
  { code: "BH", dial: "+973", label: "BH +973", flag: "🇧🇭" },
  { code: "QA", dial: "+974", label: "QA +974", flag: "🇶🇦" },
  { code: "PK", dial: "+92", label: "PK +92", flag: "🇵🇰" },
  { code: "US", dial: "+1", label: "US +1", flag: "🇺🇸" },
] as const;

export function AuthPage() {
  const { locale, setLocale } = useLocale();
  const en = locale === "en";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("AE");
  const [emailSent, setEmailSent] = useState(false);
  const [waSent, setWaSent] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [referral, setReferral] = useState("");

  const selected = useMemo(
    () => countries.find((c) => c.code === country) ?? countries[0],
    [country],
  );

  const copy = en
    ? {
        title: "Log in or sign up",
        body: "Use your email or your WhatsApp number, and we'll send you a 6-digit code to sign in.",
        email: "Email",
        emailPh: "name@company.com",
        sendCode: "Send code",
        or: "OR",
        wa: "WhatsApp number",
        waPh: "50 123 4567",
        waHint: "Pick your country, then the number without its leading 0.",
        waSend: "Send code on WhatsApp",
        referral: "Have a referral code?",
        referralLabel: "Referral code",
        emailOk: "Code sent to your email. Enter it to continue.",
        waOk: "Code sent on WhatsApp. Enter it to continue.",
        panelTitle: "Build agents that work for your business",
        panelBody: "Configure conversations, knowledge, and channels — then let Hello Techo handle the rest.",
        agent: "Your AI agent",
        userMsg: "What can you help with?",
        agentMsg: "I answer customers, capture leads, and hand off to your team when needed.",
        channels: "Web · WhatsApp · Voice",
        rights: `© 2026 ${brand.short}`,
        site: "hellotecho.example",
      }
    : {
        title: "تسجيل الدخول أو إنشاء حساب",
        body: "استخدم بريدك أو رقم واتساب، وسنرسل رمزًا من 6 أرقام لتسجيل الدخول.",
        email: "البريد",
        emailPh: "name@company.com",
        sendCode: "أرسل الرمز",
        or: "أو",
        wa: "رقم واتساب",
        waPh: "50 123 4567",
        waHint: "اختر الدولة ثم الرقم بدون الصفر الأول.",
        waSend: "أرسل الرمز على واتساب",
        referral: "هل لديك رمز إحالة؟",
        referralLabel: "رمز الإحالة",
        emailOk: "أُرسل الرمز إلى بريدك. أدخله للمتابعة.",
        waOk: "أُرسل الرمز على واتساب. أدخله للمتابعة.",
        panelTitle: "ابنِ وكلاء يعملون لأعمالك",
        panelBody: "اضبط المحادثات والمعرفة والقنوات — ثم دع Hello Techo تتولى الباقي.",
        agent: "وكيلك الذكي",
        userMsg: "بماذا يمكنك المساعدة؟",
        agentMsg: "أجيب العملاء، وألتقط العملاء المحتملين، وأسلّم لفريقك عند الحاجة.",
        channels: "ويب · واتساب · صوت",
        rights: `© 2026 ${brand.short}`,
        site: "hellotecho.example",
      };

  return (
    <div className="auth-page">
      <div className="auth-form-pane">
        <div className="auth-top">
          <Link href={routes.home} className="auth-logo">
            <LogoMark className="h-8 w-8" />
            <span>{brand.short}</span>
          </Link>
          <div className="auth-lang">
            <button type="button" className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")}>
              EN
            </button>
            <button type="button" className={locale === "ar" ? "is-active" : ""} onClick={() => setLocale("ar")}>
              AR
            </button>
          </div>
        </div>

        <div className="auth-form-wrap">
          <h1 className="auth-title">{copy.title}</h1>
          <p className="auth-body">{copy.body}</p>

          <form
            className="auth-block"
            onSubmit={(e) => {
              e.preventDefault();
              setEmailSent(true);
              setWaSent(false);
            }}
          >
            <label className="auth-label" htmlFor="auth-email">
              {copy.email}
            </label>
            <div className="auth-row">
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.emailPh}
                required
              />
              <button type="submit" className="auth-btn-dark">
                {copy.sendCode}
              </button>
            </div>
            {emailSent ? <p className="auth-ok">{copy.emailOk}</p> : null}
          </form>

          <div className="auth-or">
            <span>{copy.or}</span>
          </div>

          <form
            className="auth-block"
            onSubmit={(e) => {
              e.preventDefault();
              setWaSent(true);
              setEmailSent(false);
            }}
          >
            <label className="auth-label" htmlFor="auth-phone">
              {copy.wa}
            </label>
            <div className="auth-phone-row">
              <label className="auth-country">
                <span aria-hidden>{selected.flag}</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={copy.wa}>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <input
                id="auth-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={copy.waPh}
                required
              />
            </div>
            <p className="auth-hint">{copy.waHint}</p>
            <button type="submit" className="auth-btn-ghost">
              {copy.waSend}
            </button>
            {waSent ? <p className="auth-ok">{copy.waOk}</p> : null}
          </form>

          <div className="auth-referral">
            <button type="button" className="auth-referral-link" onClick={() => setShowReferral((v) => !v)}>
              {copy.referral}
            </button>
            {showReferral ? (
              <input
                type="text"
                className="auth-referral-input"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder={copy.referralLabel}
              />
            ) : null}
          </div>
        </div>

        <div className="auth-foot">
          <span>{copy.rights}</span>
          <a href={`https://${copy.site}`}>{copy.site}</a>
        </div>
      </div>

      <aside className="auth-visual" aria-hidden={false}>
        <div className="auth-visual-inner">
          <div className="auth-card">
            <p className="auth-card-title">{copy.agent}</p>
            <div className="auth-bubbles">
              <p className="auth-bubble is-user">{copy.userMsg}</p>
              <p className="auth-bubble is-agent">{copy.agentMsg}</p>
            </div>
            <p className="auth-card-meta">{copy.channels}</p>
          </div>
          <h2 className="auth-visual-title">{copy.panelTitle}</h2>
          <p className="auth-visual-body">{copy.panelBody}</p>
        </div>
      </aside>
    </div>
  );
}
