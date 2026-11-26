"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { cn } from "@/lib/utils";

export function BlogSidebar({
  recent,
  onSearchChange,
  className,
}: {
  recent: BlogPost[];
  onSearchChange?: (query: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");

  return (
    <aside className={cn("flex flex-col gap-5", className)}>
      <label className="relative block">
        <span className="sr-only">Search blogs</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          value={query}
          placeholder="Search..."
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            onSearchChange?.(v);
          }}
          className="w-full rounded-2xl border border-zinc-200/80 bg-white/90 py-3 pl-10 pr-4 text-[14px] text-zinc-900 outline-none placeholder:text-zinc-400 shadow-[0_1px_2px_rgba(15,10,40,0.03)] backdrop-blur focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
        />
      </label>

      <div className="rounded-[22px] border border-zinc-200/70 bg-white/80 px-5 py-5 shadow-[0_1px_2px_rgba(15,10,40,0.03)] backdrop-blur">
        <h3 className="text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]">
          Recent Blogs
        </h3>
        <ul className="mt-3 divide-y divide-zinc-100">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blogs/${post.slug}`}
                className="block py-3 text-[15px] font-medium leading-snug text-zinc-500 transition hover:text-fuchsia-700"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
