import { BlogPage } from "@/components/BlogPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Blog",
  "Insights on AI customer experience for hotels, clinics, restaurants and GCC operators.",
);

export default function Page() {
  return <BlogPage />;
}
