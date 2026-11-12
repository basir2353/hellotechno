import { PricingPage } from "@/components/InnerPages";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Pricing",
  "Simple monthly Hello Techo plans for hotels, clinics, restaurants, bakeries and stores. Start free with 50 credits.",
);

export default function Page() {
  return <PricingPage />;
}
