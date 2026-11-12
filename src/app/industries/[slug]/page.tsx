import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AestheticsPage } from "@/components/AestheticsPage";
import { HospitalityPage } from "@/components/HospitalityPage";
import { RestaurantsPage } from "@/components/RestaurantsPage";
import { SmbPage } from "@/components/SmbPage";
import { IndustryDetailPage } from "@/components/InnerPages";
import { industryPages } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = industryPages.find((item) => item.slug === slug);
  if (!page) return { title: "Industries" };
  return {
    title: page.en.title,
    description: page.en.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!industryPages.some((page) => page.slug === slug)) notFound();
  if (slug === "hospitality") return <HospitalityPage />;
  if (slug === "aesthetics-dental") return <AestheticsPage />;
  if (slug === "restaurants-cafes-bakeries") return <RestaurantsPage />;
  if (slug === "smb") return <SmbPage />;
  return <IndustryDetailPage slug={slug} />;
}
