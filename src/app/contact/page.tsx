"use client";

import { useEffect } from "react";
import { brand } from "@/lib/site";

/** Talk to us opens WhatsApp Web — no separate contact page. */
export default function Page() {
  useEffect(() => {
    window.location.replace(brand.whatsapp);
  }, []);

  return null;
}