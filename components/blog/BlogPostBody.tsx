import Image from "next/image";
import type { BlogBlock } from "@/lib/blogs";

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose-blog w-full max-w-none space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="pt-2 text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p
              key={i}
              className="text-[15px] leading-relaxed text-zinc-500 sm:text-[17px] sm:leading-[1.65]"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500 sm:text-[17px]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "image") {
          return (
            <figure
              key={i}
              className="relative my-6 aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100"
            >
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 740px"
              />
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
