import { PrivacyPage } from "@/components/PrivacyPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Privacy Policy",
  "How Hello Techo Solutions handles information submitted through this website and the AI customer-experience platform.",
);

export default function Page() {
  return <PrivacyPage />;
}
