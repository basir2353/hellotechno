"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header, PromoBar } from "@/components/Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="site-sticky-top sticky top-0 z-50">
        <PromoBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
