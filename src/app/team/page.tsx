import { TeamPage } from "@/components/TeamPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Team",
  "Meet the Hello Techo team building a GCC-first AI customer experience platform, led by Founder & CEO Sara Al Mansouri.",
);

export default function Page() {
  return <TeamPage />;
}
