import { NewsPage } from "@/components/NewsPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "News and Updates",
  "Announcements, milestones and product updates from Hello Techo Solutions.",
);

export default function Page() {
  return <NewsPage />;
}
