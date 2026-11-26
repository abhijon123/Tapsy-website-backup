import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { PopularBlogs } from "@/components/blog/PopularBlogs";
import { FaqContact } from "@/components/sections/FaqContact";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Footer } from "@/components/sections/Footer";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRecentBlogs,
} from "@/lib/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog | Tapsy" };

  return {
    title: `${post.title} | Tapsy`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tapsy.app/blogs/${post.slug}`,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const recent = getRecentBlogs(4, post.slug);
  const popular = getRecentBlogs(3, post.slug);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <BlogHero title="Blog Details" />
      <BlogDetail post={post} recent={recent} />
      <PopularBlogs posts={popular} />
      <FaqContact />
      <StickyCTA />
      <Footer />
    </main>
  );
}
