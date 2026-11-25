"use client";

import { useState } from "react";
import Image from "next/image";
import { TypewriterText } from "@/components/ui/hero-4";
import { Marquee } from "@/components/ui/marquee";

const people = [
  {
    name: "Marcus",
    role: "Gym reviewer",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Aisha",
    role: "Travel creator",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Leo",
    role: "Nightlife",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Studio 12",
    role: "Salon",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Jordan",
    role: "Local guide",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Harbor House",
    role: "Venue",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
  },
];

function PersonCard({
  person,
  following,
  onToggle,
}: {
  person: (typeof people)[number];
  following: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group relative h-[280px] w-[min(210px,72vw)] shrink-0 overflow-hidden rounded-[22px] bg-zinc-100 shadow-[0_18px_40px_-24px_rgba(15,10,40,0.35)] transition duration-300 hover:-translate-y-1.5 sm:h-[320px] sm:w-[230px]">
      <Image
        src={person.image}
        alt={person.name}
        fill
        className="media-zoom object-cover"
        sizes="230px"
      />
      <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-2xl bg-white px-2.5 py-2 shadow-lg sm:inset-x-3 sm:bottom-3 sm:px-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-zinc-900 sm:text-[14px]">{person.name}</p>
          <p className="truncate text-[11px] text-zinc-400">{person.role}</p>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold text-white transition sm:px-3 sm:text-[12px] ${
            following ? "bg-zinc-800" : "bg-gradient-tapsy"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </article>
  );
}

export function CreatorRow() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <section id="creators" className="site-section bg-white">
      <div className="site-rail">
        <h2 className="type-section overflow-visible text-center text-zinc-950">
          Why type when you can{" "}
          <TypewriterText texts={["tap?", "film?", "post?", "glow?"]} />
        </h2>
        <p className="type-lead mx-auto mt-4 text-center">
          Forget outdated text and long paragraphs. With Tapsy, recording a review is as easy as
          hitting play restaurants, gyms, hotels, salons, nightlife. One tap shares your take.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />
        <Marquee pauseOnHover repeat={2} className="[--duration:45s] [--gap:1rem] p-0">
          {people.map((person) => (
            <PersonCard
              key={person.name}
              person={person}
              following={!!following[person.name]}
              onToggle={() =>
                setFollowing((s) => ({ ...s, [person.name]: !s[person.name] }))
              }
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
