import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/MorePages";
import { newsPosts } from "@/lib/content";

export const instant = false;

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((item) => item.slug === slug);
  return { title: post?.title.en ?? "News" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = newsPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <ArticlePage post={post} kind="news" />;
}
