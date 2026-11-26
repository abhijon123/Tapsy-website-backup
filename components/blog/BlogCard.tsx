import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex min-w-0 flex-col">
      <Link
        href={`/blogs/${post.slug}`}
        className="relative block overflow-hidden rounded-[22px]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-zinc-200/60">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            className="media-zoom object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      </Link>

      <h3 className="mt-4 text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]">
        <Link
          href={`/blogs/${post.slug}`}
          className="transition hover:text-fuchsia-700"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-zinc-500">
        {post.excerpt}
      </p>
      <Link
        href={`/blogs/${post.slug}`}
        className="mt-3 inline-flex text-[15px] font-semibold text-gradient-tapsy-tight transition hover:brightness-110"
      >
        Read More
      </Link>
    </article>
  );
}
