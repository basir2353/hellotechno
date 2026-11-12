import { AuthPage } from "@/components/AuthPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Sign Up / Login",
  "Log in or sign up to Hello Techo with email or WhatsApp. A 6-digit code signs you in.",
);

export default function Page() {
  return <AuthPage />;
}
