"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Use Cases opens the homepage "Pick an industry and watch it work" module. */
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#home-demo");
  }, [router]);

  return null;
}
