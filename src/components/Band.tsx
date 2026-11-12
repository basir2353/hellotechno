"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { routes } from "@/lib/site";

export function Band() {
  const { t } = useLocale();

  return (
    <section className="band-section" aria-label={t.band.title}>
      <div className="band-arcs" aria-hidden />
      <div className="shell relative z-[1] text-center">
        <h2 className="mx-auto max-w-3xl text-[1.55rem] font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
          {t.band.title}
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href={routes.trial} className="band-btn-primary">
            {t.band.trial}
          </Link>
          <Link href={routes.demo} className="band-btn-secondary">
            {t.band.demo}
          </Link>
        </div>
      </div>
    </section>
  );
}
