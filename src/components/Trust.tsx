"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale";
import { images } from "@/lib/site";

const badges = [
  { src: images.iso9001, alt: "ISO 9001" },
  { src: images.iso27001, alt: "ISO 27001" },
  { src: images.iso42001, alt: "ISO 42001" },
] as const;

const partners = [
  { src: images.partnerMicrosoft, labelKey: 0 },
  { src: images.partnerAws, labelKey: 1 },
  { src: images.partnerGcp, labelKey: 2 },
  { src: images.partnerAnthropic, labelKey: 3 },
  { src: images.partnerAtlassian, labelKey: 4 },
] as const;

export function Trust() {
  const { t } = useLocale();

  return (
    <>
      <section id="trust" className="trust-section">
        <div className="shell trust-layout">
          <div className="trust-copy">
            <span className="pill pill-purple">{t.trust.label}</span>
            <h2 className="type-h2 mt-5 max-w-xl">{t.trust.title}</h2>
            <p className="type-lead mt-4 max-w-xl">{t.trust.body}</p>
          </div>

          <ul className="trust-badges">
            {t.trust.items.map((item, index) => (
              <li key={item.title}>
                <div className="trust-badge-mark">
                  <Image
                    src={badges[index]?.src ?? images.iso9001}
                    alt={badges[index]?.alt ?? item.title}
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
                <p className="trust-badge-label">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="selected" className="selected-section">
        <div className="shell selected-layout">
          <div className="selected-copy">
            <p className="selected-eyebrow">{t.trust.programsLabel}</p>
            <h2 className="type-h2 mt-3">{t.trust.selected}</h2>
            <p className="type-lead mt-4 max-w-md">{t.trust.selectedBody}</p>
          </div>

          <ul className="selected-partners">
            {partners.map((partner) => {
              const label = t.trust.programs[partner.labelKey] ?? partner.src;
              return (
                <li key={label} className="selected-partner">
                  <Image
                    src={partner.src}
                    alt={label}
                    width={120}
                    height={28}
                    className="h-7 w-auto max-w-[7.5rem] object-contain"
                  />
                  <p>{label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
