"use client";

import Image from "next/image";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const quotes = [
  {
    name: "Sarah K.",
    role: "Foodie · NYC",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Nothing beats a 30s take. I can show the exact vibe of a place before friends commit.",
  },
  {
    name: "Marcus T.",
    role: "Stylist · LA",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "Salon and studio takes on Tapsy work like free commercials. Real reactions sell better than ads.",
  },
  {
    name: "Daniel L.",
    role: "Homeowner · Austin",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    text: "I watched contractor walkthroughs before hiring. Saved me from a bad quote.",
  },
  {
    name: "Priya M.",
    role: "Traveler · Miami",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    text: "Hotel and beach clips beat any written “great view.” You see it in 30 seconds.",
  },
  {
    name: "Jordan A.",
    role: "Gym owner · Chicago",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
    text: "Members film the floor, classes, and trainers. New sign-ups trust video more than stars.",
  },
  {
    name: "Elena R.",
    role: "Creator · Seattle",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    text: "One tap and my take hits Discover. No edit drama. Just honest vibe.",
  },
  {
    name: "Chris P.",
    role: "Nightlife · Brooklyn",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    text: "You hear the music and see the crowd. Text reviews never captured that.",
  },
];

function QuoteCard({ q }: { q: (typeof quotes)[number] }) {
  return (
    <MagicCard className="w-[260px] shrink-0 rounded-2xl bg-zinc-50 sm:w-[280px]">
      <article className="group flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <p className="text-[12px] tracking-[0.16em] text-fuchsia-500">★★★★★</p>
          <p className="mt-2.5 text-[13px] leading-[1.55] text-zinc-700 sm:text-[14px]">
            “{q.text}”
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white shadow-md">
            <Image src={q.image} alt={q.name} fill className="media-zoom object-cover" sizes="36px" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-zinc-900">{q.name}</p>
            <p className="text-[11px] text-zinc-500">{q.role}</p>
          </div>
        </div>
      </article>
    </MagicCard>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="site-section bg-white">
      <div className="site-rail">
        <BlurFade className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="type-section text-zinc-950">
              <WordsPullUp text="Loved by real reviewers" />
            </h2>
            <p className="type-lead mt-3">
              Food, fitness, travel, nightlife people trust a 30s take over a wall of text.
            </p>
          </div>
          <p className="shrink-0 text-[15px] font-semibold text-zinc-800">
            <NumberTicker value={4.9} decimals={1} className="text-zinc-900" /> average ·{" "}
            <NumberTicker value={10} suffix="K+" className="text-zinc-900" /> ratings
          </p>
        </BlurFade>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />
        <Marquee pauseOnHover className="[--duration:42s] [--gap:0.85rem]">
          {quotes.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
