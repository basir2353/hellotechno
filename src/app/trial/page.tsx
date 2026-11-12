import { AuthPage } from "@/components/AuthPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Start Free Trial",
  "Log in or sign up to Hello Techo with email or WhatsApp. Start with 50 free credits at $0 setup.",
);

export default function Page() {
  return <AuthPage />;
}
