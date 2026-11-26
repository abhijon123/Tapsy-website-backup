"use client";

import { MapPin, Video, Heart, BadgeCheck, Clapperboard } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { WordsPullUp } from "@/components/ui/words-pull-up";

const reasons = [
  {
    icon: MapPin,
    title: "Easy business discovery",
    body: "Find restaurants, salons, hotels, and local services the way people actually decide — by watching.",
  },
  {
    icon: Video,
    title: "Authentic video reviews",
    body: "Short, genuine clips from real customers instead of anonymous star ratings and filtered claims.",
  },
  {
    icon: Heart,
    title: "Real customer experiences",
    body: "See the vibe, the work, and the emotion — not just a polished description of it.",
  },
  {
    icon: BadgeCheck,
    title: "Verified local businesses",
    body: "Discover places and professionals who earn attention through quality you can see for yourself.",
  },
  {
    icon: Clapperboard,
    title: "User-generated video content",
    body: "Consumers trust people. Tapsy is built around that — pure video interaction, no clutter.",
  },
];

export function AboutWhy() {
  return (
    <section id="why-tapsy" className="site-section relative overflow-hidden bg-[#f7f7f8]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl"
      />

      <div className="site-rail relative">
        <Reveal className="mx-auto mb-10 max-w-5xl text-center sm:mb-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-fuchsia-600/80">
            Why Tapsy?
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.04em] text-zinc-950">
            <WordsPullUp
              text="Consumers trust people, not anonymous reviews"
              className="justify-center max-lg:flex-wrap lg:!flex-nowrap"
            />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500 sm:text-[16px]">
            Unlike traditional review websites, Tapsy focuses on authentic video
            that showcases local services, food, hotels, and experiences exactly
            as they are.
          </p>
        </Reveal>

        <Stagger className="mx-auto grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title} className="min-w-0">
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-tapsy text-white shadow-[0_10px_24px_-12px_rgba(217,70,239,0.55)]">
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold tracking-[-0.02em] text-zinc-950 sm:text-[17px]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-500 sm:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
