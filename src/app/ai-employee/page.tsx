import { AiEmployeePage } from "@/components/AiEmployeePage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "AI Employee · Noor",
  "Noor is Hello Techo’s AI order-taking employee for bakeries and cafes in Dubai — Gulf Arabic and English on phone and WhatsApp.",
);

export default function Page() {
  return <AiEmployeePage />;
}
