"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteContent, Creator } from "@/lib/content";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { Star, CheckCircle, Users, Play } from "lucide-react";
import confetti from "canvas-confetti";

function CreatorCard({ creator }: { creator: Creator }) {
  const [following, setFollowing] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!following) {
      confetti({
        particleCount: 24,
        spread: 50,
        origin: { y: 0.75 },
        colors: ["#3B82F6", "#9333EA", "#D946EF", "#FF6A3D"],
      });
    }
    setFollowing(!following);
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      className="soft-card group flex w-[280px] flex-col overflow-hidden sm:w-[300px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={creator.cover}
          alt={creator.reviewTitle}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <motion.div
          animate={{ scale: hovered ? 1 : 0.9, opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
            <Play className="h-4 w-4 fill-white" />
          </div>
        </motion.div>
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {creator.category}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {creator.rating.toFixed(1)}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="line-clamp-1 text-[14px] font-semibold text-white">
            {creator.reviewTitle}
          </p>
          <p className="text-[12px] text-white/70">{creator.placeName}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3.5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-400/40">
          <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h4 className="truncate text-[14px] font-bold text-foreground">
              {creator.name}
            </h4>
            <CheckCircle className="h-3.5 w-3.5 shrink-0 fill-violet-500 text-white" />
          </div>
          <p className="truncate text-[12px] text-zinc-500">
            {creator.role} ·{" "}
            <span className="inline-flex items-center gap-0.5">
              <Users className="h-3 w-3" />
              {creator.followers}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleFollow}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
            following
              ? "border border-zinc-200 bg-zinc-50 text-foreground"
              : "bg-gradient-tapsy text-white shadow-md shadow-violet-500/20"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </motion.div>
  );
}

export function CreatorsMarquee() {
  const { creatorsSection } = siteContent;

  return (
    <section id="creators" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto mb-12 max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="type-section text-foreground">
            Real people.{" "}
            <span className="italic text-gradient-tapsy">Real places.</span>
          </h2>
          <p className="type-lead mx-auto mt-4 max-w-xl">
            {creatorsSection.description}
          </p>
        </Reveal>
      </div>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:45s]" repeat={2}>
          {creatorsSection.creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
