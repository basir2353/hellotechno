"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { images, routes } from "@/lib/site";

const tunedImages = [
  images.hospitality,
  images.clinics,
  images.bakery,
  images.smb,
] as const;

const tunedHrefs = [
  routes.hospitality,
  routes.aesthetics,
  routes.dining,
  routes.smb,
] as const;

export function Tuned() {
  const { t } = useLocale();

  return (
    <section className="tuned-section">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill pill-purple">{t.tuned.label}</span>
          <h2 className="type-h2 mt-5">{t.tuned.title}</h2>
          <p className="type-lead mx-auto mt-4 max-w-2xl">{t.tuned.body}</p>
        </div>

        <div className="tuned-grid">
          {t.tuned.cards.map((card, index) => (
            <Link
              key={card.title}
              href={tunedHrefs[index] ?? routes.industries}
              className="tuned-card"
            >
              <Image
                src={tunedImages[index] ?? images.hospitality}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="tuned-card-overlay" />
              <div className="tuned-card-content">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span>
                  {card.cta} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
