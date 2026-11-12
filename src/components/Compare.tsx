"use client";

import { useLocale } from "@/lib/locale";

export function Compare() {
  const { t } = useLocale();

  return (
    <section id="why-os" className="compare-section">
      <div className="shell">
        <p className="compare-label">{t.compare.label}</p>

        <div className="compare-cards">
          {t.compare.cards.map((card) => (
            <article key={card} className="compare-card">
              <p>{card}</p>
            </article>
          ))}
        </div>

        <p className="compare-strip">{t.compare.strip}</p>
      </div>
    </section>
  );
}
