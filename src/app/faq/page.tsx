"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** FAQ opens the homepage "Direct questions, direct answers" module. */
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#faq");
  }, [router]);

  return null;
}
