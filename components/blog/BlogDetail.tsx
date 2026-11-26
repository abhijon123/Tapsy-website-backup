import Image from "next/image";
import type { BlogPost } from "@/lib/blogs";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { BlogSidebar } from "@/components/blog/BlogSidebar";

export function BlogDetail({
  post,
  recent,
}: {
  post: BlogPost;
  recent: BlogPost[];
}) {
  return (
    <section className="site-section relative overflow-hidden bg-[#f7f7f8]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-orange-200/25 blur-3xl"
      />

      <div className="site-rail relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-12 xl:gap-14">
        <article className="min-w-0">
          <div className="mx-auto w-full max-w-[46rem] lg:mx-0 lg:max-w-none">
            <h2 className="type-section text-foreground">
              {post.title}
            </h2>

            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[24px] bg-zinc-200/60">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 780px"
              />
            </div>

            <div className="mt-8 sm:mt-10">
              <BlogPostBody blocks={post.blocks} />
            </div>
          </div>
        </article>

        <BlogSidebar
          recent={recent}
          className="lg:sticky lg:top-24 lg:self-start"
        />
      </div>
    </section>
  );
}
