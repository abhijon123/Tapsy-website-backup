"use client";

import Image from "next/image";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { Reveal } from "@/components/ui/reveal";
import { useSectionParallax } from "@/hooks/useParallax";

export function SpreadScene() {
  const { ref, y } = useSectionParallax(0.08);

  return (
    <section className="site-section overflow-x-clip bg-white">
      <div className="site-rail grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <Reveal from="left">
          <div ref={ref} className="group relative overflow-hidden rounded-[28px]">
            <div className="absolute -left-4 -top-4 z-10 h-24 w-24 rounded-3xl bg-violet-100 sm:h-32 sm:w-32" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_28px_60px_-28px_rgba(124,58,237,0.35)]">
              <div
                className="absolute inset-[-10%] will-change-transform"
                style={{ transform: `translate3d(0, ${y}px, 0)` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80"
                  alt="Friends sharing a meal"
                  fill
                  className="ken-burns object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <h2 className="type-section text-zinc-950">
            <WordsPullUp text="Spread the scene, seamless" />
          </h2>
          <p className="type-lead mt-4">
            Record your real review in seconds to Tapsy, Insta, TikTok, or WhatsApp. Your story
            travels fast because real moments deserve to be seen, heard, and believed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
