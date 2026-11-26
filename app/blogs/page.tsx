import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { FaqContact } from "@/components/sections/FaqContact";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Footer } from "@/components/sections/Footer";
import { getAllBlogs, getRecentBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Tapsy Blog: Video Testimonial Platform Tips & Trends",
  description:
    "Latest insights on video reviews, authentic customer stories, and how businesses build trust with Tapsy.",
  openGraph: {
    title: "Tapsy Blog: Video Testimonial Platform Tips & Trends",
    description:
      "Read the latest Tapsy blogs on video reviews, trust, and user-generated content.",
    url: "https://tapsy.app/blogs",
  },
};

export default function BlogsPage() {
  const posts = getAllBlogs();
  const recent = getRecentBlogs(4);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <BlogHero
        title="Blogs"
        subtitle="Tips, trends, and stories on authentic video reviews."
      />
      <BlogListing posts={posts} recent={recent} />
      <FaqContact />
      <StickyCTA />
      <Footer />
    </main>
  );
}
