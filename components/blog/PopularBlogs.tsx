import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/reveal";

export function PopularBlogs({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="site-section relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-fuchsia-200/25 blur-3xl"
      />
      <div className="site-rail relative">
        <Reveal once>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
                Keep reading
              </p>
              <h2 className="type-section mt-3 text-foreground">
                Popular Blogs
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex rounded-full bg-gradient-tapsy px-4 py-2 text-[13px] font-bold text-white shadow-sm transition hover:brightness-105"
            >
              See all
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Reveal key={post.slug} once>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
