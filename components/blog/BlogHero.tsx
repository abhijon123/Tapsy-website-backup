"use client";

import { cn } from "@/lib/utils";
import { ShaderBackground } from "@/components/ui/animated-shader-hero";

export function BlogHero({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section
      id="hero"
      className={cn(
        "relative isolate flex min-h-[280px] items-center overflow-hidden bg-black pt-24 pb-10 sm:min-h-[340px] sm:pt-28 sm:pb-14",
        className
      )}
    >
      <ShaderBackground />

      {/* Soft read-ability veil + header mist (keeps navbar contrast) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.2)_40%,rgba(0,0,0,0.45)_100%)]"
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(10,10,15,0.22)_0%,rgba(10,10,15,0.08)_50%,transparent_100%)] sm:h-32" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.35)_40%,transparent_100%)] sm:h-28" />
        <div className="absolute left-0 top-0 h-32 w-[min(380px,65%)] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.5)_0%,transparent_72%)]" />
      </div>

      <div className="site-rail relative flex w-full flex-col items-center justify-center text-center">
        {/* <p className="text-[13px] font-medium tracking-wide text-white/55">
          Tapsy Journal
        </p> */}
        <h1 className="mt-3 text-[clamp(1.85rem,6.5vw,3.6rem)] font-bold tracking-[-0.04em] leading-[1.15] text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
