"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Video, Wifi, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagicCard } from "@/components/ui/magic-card";
import { useSectionParallax } from "@/hooks/useParallax";

export function BentoFeatures() {
  const { ref, y } = useSectionParallax(0.04);

  return (
    <section id="features" ref={ref} className="site-section relative overflow-hidden pb-20 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl will-change-transform"
        style={{ transform: `translate3d(0, ${y}px, 0)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-fuchsia-200/25 blur-3xl will-change-transform"
        style={{ transform: `translate3d(0, ${-y}px, 0)` }}
      />
      <div className="site-rail relative">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="type-section text-foreground">
            Built for how people{" "}
            <span className="italic text-gradient-tapsy">actually decide</span>
          </h2>
          <p className="type-lead mx-auto mt-4">
            Old review sites give you walls of text. Tapsy gives you authentic 30s
            clips food, fitness, travel, beauty, nightlife from people you can see and hear.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          <Reveal from="left" className="lg:col-span-8">
            <MagicCard className="rounded-[24px] bg-white shadow-[0_20px_50px_-28px_rgba(15,10,40,0.18)]">
            <motion.div
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-[24px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/10]">
                <Image
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80"
                  alt="30 second video reviews"
                  fill
                  className="media-zoom object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                    <Video className="h-5 w-5" />
                  </div>
                  <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.14em] text-violet-200">
                    Zero fluff
                  </p>
                  <h3 className="text-[22px] font-bold tracking-tight text-white sm:text-[28px]">
                    30-second express video reels
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/75">
                    No 10-minute vlogs. Just direct looks at restaurants, gyms,
                    hotels, salons, and nights out.
                  </p>
                  <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                    30.00s clip limit
                  </div>
                </div>
              </div>
            </motion.div>
            </MagicCard>
          </Reveal>

          <Reveal from="right" delay={0.08} className="lg:col-span-4">
            <MagicCard className="h-full rounded-[24px] bg-white shadow-[0_20px_50px_-28px_rgba(15,10,40,0.18)]">
            <motion.div
              id="business"
              whileHover={{ y: -3 }}
              className="flex h-full flex-col overflow-hidden rounded-[24px]"
            >
              <div className="group relative h-36 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                  alt="NFC standees for venues"
                  fill
                  className="media-zoom object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 pt-1">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">
                  <Wifi className="h-5 w-5 rotate-45" />
                </div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.14em] text-violet-600">
                  For local venues
                </p>
                <h3 className="text-[20px] font-bold tracking-tight text-foreground">
                  NFC tap standees
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
                  Customers tap the counter standee and jump straight into a
                  verified video review.
                </p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-violet-50 px-3 py-2.5 text-[12px] font-semibold text-violet-700">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    Free standee for claimed businesses
                  </div>
                </div>
              </div>
            </motion.div>
            </MagicCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
