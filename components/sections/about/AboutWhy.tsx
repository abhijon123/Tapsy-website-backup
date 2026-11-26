"use client";

import { MapPin, Video, Heart, BadgeCheck, Clapperboard } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { PhoneVideo } from "@/components/ui/phone-video";
import { siteVideos } from "@/lib/content";
import { assetUrl } from "@/lib/utils";

const reasons = [
  {
    icon: MapPin,
    title: "Easy business discovery",
    body: "Find restaurants, salons, hotels, and local services the way people actually decide, by watching.",
  },
  {
    icon: Video,
    title: "Authentic video reviews",
    body: "Short, genuine clips from real customers instead of anonymous star ratings and filtered claims.",
  },
  {
    icon: Heart,
    title: "Real customer experiences",
    body: "See the vibe, the work, and the emotion, not just a polished description of it.",
  },
  {
    icon: BadgeCheck,
    title: "Verified local businesses",
    body: "Discover places and professionals who earn attention through quality you can see for yourself.",
  },
  {
    icon: Clapperboard,
    title: "User-generated video content",
    body: "Consumers trust people. Tapsy is built around that: pure video interaction, no clutter.",
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
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
            Why Tapsy?
          </p>
          <h2 className="type-section mt-3 text-foreground">
            <WordsPullUp
              text="Consumers trust people, not anonymous reviews"
              className="justify-center max-lg:flex-wrap lg:!flex-nowrap"
            />
          </h2>
          <p className="type-lead mx-auto mt-4">
            Unlike traditional review websites, Tapsy focuses on authentic video
            that showcases local services, food, hotels, and experiences exactly
            as they are.
          </p>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
          <Stagger className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {reasons.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} className="min-w-0">
                  <div className="flex gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-tapsy text-white shadow-[0_10px_24px_-12px_rgba(217,70,239,0.55)]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-500">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal from="right" delay={0.08} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.22)_0%,transparent_68%)] blur-2xl"
              />
              <div className="relative animate-[float-y_7s_ease-in-out_infinite]">
                <PhoneVideo
                  src={siteVideos.orbit}
                  poster={assetUrl("/assets/cafe-vibe.jpg")}
                  title="Real people"
                  place="Authentic video reviews"
                  widthClassName="w-full max-w-[260px] sm:max-w-[280px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
