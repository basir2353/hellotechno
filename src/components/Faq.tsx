"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevron } from "@/components/Icons";
import { useLocale } from "@/lib/locale";
import { images, routes } from "@/lib/site";

export function Faq({ hideIntro = false }: { hideIntro?: boolean }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(1);

  return (
    <section
      id="faq"
      className="faq-section"
      style={{ backgroundImage: `url(${images.dashboard})` }}
    >
      <div className="faq-overlay" />
      <div className="shell relative z-[1]">
        <div className="mx-auto max-w-3xl">
          {hideIntro ? null : (
            <div className="text-center">
              <span className="faq-eyebrow">{t.faq.label}</span>
              <h2 className="mt-5 text-[1.85rem] font-semibold tracking-[-0.03em] text-white md:text-[2.35rem]">
                {t.faq.title}
              </h2>
            </div>
          )}

          <div className={`${hideIntro ? "mt-0" : "mt-10"} space-y-3`}>
            {t.faq.items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-item-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <IconChevron
                      className={`h-5 w-5 shrink-0 text-white/70 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? <p className="faq-item-body">{item.a}</p> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[0.95rem] text-white/75">{t.faq.more}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link href={routes.trial} className="btn-primary">
                {t.cta.trial}
              </Link>
              <Link href={routes.demo} className="faq-demo-btn">
                {t.cta.demo}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
