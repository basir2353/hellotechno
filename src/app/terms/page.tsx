import { TermsPage } from "@/components/TermsPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Terms & Conditions",
  "Terms for using the Hello Techo Solutions website and conversational-AI service.",
);

export default function Page() {
  return <TermsPage />;
}
