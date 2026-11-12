"use client";

import { Band } from "@/components/Band";
import { Cta } from "@/components/Cta";
import { Dashboard } from "@/components/Dashboard";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Playbooks, Scenario } from "@/components/Industries";
import { Metrics } from "@/components/Metrics";
import { Platform } from "@/components/Platform";
import { Pricing } from "@/components/Pricing";
import { SiteShell } from "@/components/SiteShell";
import { Trust } from "@/components/Trust";
import { Tuned } from "@/components/Tuned";

export function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Platform />
      <Scenario />
      <Dashboard />
      <Playbooks />
      <Tuned />
      <Metrics />
      <Trust />
      <Band />
      <Pricing />
      <Cta />
      <Faq />
    </SiteShell>
  );
}
