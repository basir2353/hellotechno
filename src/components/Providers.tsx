"use client";

import type { ReactNode } from "react";
import { ScrollRestore } from "@/components/ScrollRestore";
import { LocaleProvider } from "@/lib/locale";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ScrollRestore />
      {children}
    </LocaleProvider>
  );
}
