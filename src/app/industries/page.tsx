import { IndustriesIndexPage } from "@/components/InnerPages";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Industries",
  "Hello Techo vertical playbooks for hospitality, aesthetics and dental, restaurants and bakeries, and small businesses.",
);

export default function Page() {
  return <IndustriesIndexPage />;
}
