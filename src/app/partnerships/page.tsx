import { PartnershipsPage } from "@/components/MorePages";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Partnerships",
  "Refer, resell or embed Hello Techo across the GCC. Register interest with the Hello Techo team.",
);

export default function Page() {
  return <PartnershipsPage />;
}
