import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/MorePages";
import { blogPosts } from "@/lib/content";

export const instant = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title.en ?? "Blog" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <ArticlePage post={post} kind="blog" />;
}
