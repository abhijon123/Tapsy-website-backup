"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Reveal } from "@/components/ui/reveal";

export function BlogListing({
  posts,
  recent,
}: {
  posts: BlogPost[];
  recent: BlogPost[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <section className="site-section relative overflow-hidden bg-[#f7f7f8]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl"
      />

      <div className="site-rail relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-12 xl:gap-14">
        <div className="min-w-0">
          <Reveal once>
            {/* <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
              Insights
            </p> */}
            <h2 className="type-section mt-3 text-foreground">
              Latest Blogs
            </h2>
          </Reveal>

          {filtered.length === 0 ? (
            <p className="mt-8 text-[15px] text-zinc-500">
              No blogs match your search. Try another keyword.
            </p>
          ) : (
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {filtered.map((post) => (
                <Reveal key={post.slug} once>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <BlogSidebar
          recent={recent}
          onSearchChange={setQuery}
          className="lg:sticky lg:top-24 lg:self-start"
        />
      </div>
    </section>
  );
}
