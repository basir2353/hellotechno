"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Demo opens the homepage "Book a 30-minute demo" module. */
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#book-meeting");
  }, [router]);

  return null;
}
