"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { siteContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { StudioBoard } from "@/components/sections/StudioBoard";
import { PhoneVideo } from "@/components/ui/phone-video";
import { AppBottomNav, AppTopBar } from "@/components/ui/app-chrome";
import { cn } from "@/lib/utils";

const STACK = siteContent.venues.slice(0, 4);
const N = STACK.length;
const AUTO_MS = 5500;
const RESUME_MS = 10000;

/** Shortest signed circular distance from `from` → `to` on a ring of size N */
function circularOffset(from: number, to: number) {
  let d = to - from;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

/** Ring layout — lighter 3D; compact offsets on narrow viewports */
function ringStyle(offset: number, compact: boolean) {
  const abs = Math.abs(offset);
  const side1 = compact ? 72 : 118;
  const side2 = compact ? 110 : 190;
  const far = compact ? 130 : 180;

  if (compact && abs > 0) {
    // Mobile: only the focused phone is fully visible
    return {
      x: offset > 0 ? side1 : -side1,
      scale: 0.72,
      rotateY: 0,
      z: -60,
      opacity: abs === 1 ? 0.35 : 0,
      zIndex: abs === 1 ? 20 : 1,
    };
  }

  if (abs > 2) {
    return {
      x: offset > 0 ? far : -far,
      scale: 0.58,
      rotateY: 0,
      z: -120,
      opacity: 0,
      zIndex: 1,
    };
  }
  if (offset === 0) {
    return { x: 0, scale: 1, rotateY: 0, z: 80, opacity: 1, zIndex: 50 };
  }
  if (abs === 1) {
    return {
      x: offset > 0 ? side1 : -side1,
      scale: 0.84,
      rotateY: offset > 0 ? -6 : 6,
      z: -40,
      opacity: 1,
      zIndex: 30,
    };
  }
  return {
    x: offset > 0 ? side2 : -side2,
    scale: 0.7,
    rotateY: offset > 0 ? -8 : 8,
    z: -80,
    opacity: 0.95,
    zIndex: 20,
  };
}

export function AppShowcase() {
  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(false);
  const hoverPaused = useRef(false);
  const lockedUntil = useRef(0);
  const focused = STACK[active];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const focusPhone = (index: number) => {
    setActive(index);
    // Keep clicked focus intact — auto-scroll waits before continuing
    lockedUntil.current = Date.now() + RESUME_MS;
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (hoverPaused.current || Date.now() < lockedUntil.current) return;
      setActive((i) => (i + 1) % N);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, []);

  const items = useMemo(() => {
    return STACK.map((venue, i) => ({
      venue,
      index: i,
      offset: circularOffset(active, i),
    })).sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset));
  }, [active]);

  return (
    <section id="discover" className="relative overflow-x-clip">
      {/* Equal top/bottom padding around the stack */}
      <div className="py-16 sm:py-20">
        <div className="site-rail relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-12">
          <div className="relative z-10 min-w-0">
            <Reveal from="left" className="overflow-visible">
              <h2 className="type-section overflow-visible text-foreground [font-size:clamp(1.65rem,3.4vw,2.85rem)]">
                <span className="block">Find top spots</span>
                <span className="block overflow-visible italic text-gradient-tapsy">
                  without guesswork
                </span>
              </h2>
              <p className="type-lead mt-4 max-w-md">
                Browse genuine video reels recorded at the venue. See the lighting, hear the music,
                know before you go.
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={focused.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-8 max-w-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-zinc-500">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
                      {focused.category}
                    </span>
                    <span className="font-mono text-zinc-400">{focused.duration}</span>
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      {focused.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[22px] font-bold tracking-tight text-zinc-950">
                    {focused.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-zinc-500">{focused.place}</p>
                </motion.div>
              </AnimatePresence>

              {/* <p className="mt-6 text-[13px] font-medium text-zinc-400">
                Auto-rotates — tap a phone to focus it
              </p> */}
            </Reveal>
          </div>

          <Reveal
            from="right"
            delay={0.08}
            className="relative isolate z-0 w-full min-w-0 pb-6 pt-2 sm:h-[500px] sm:pb-0 sm:pt-0 lg:h-[540px]"
          >
            <div
              className="relative flex h-full w-full min-w-0 items-center justify-center overflow-x-clip sm:overflow-visible lg:justify-end"
              style={{ perspective: 1600 }}
              onMouseEnter={() => {
                hoverPaused.current = true;
              }}
              onMouseLeave={() => {
                hoverPaused.current = false;
              }}
            >
              <div
                className="relative aspect-[9/19.2] w-[min(252px,68vw)] sm:h-[500px] sm:w-[252px] sm:aspect-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                {items.map(({ venue, index, offset }) => {
                  const style = ringStyle(offset, compact);
                  const isActive = offset === 0;
                  const phoneWidth =
                    "w-[min(210px,70vw)] sm:w-[230px] lg:w-[252px]";

                  return (
                    <motion.div
                      key={venue.id}
                      className={cn(
                        "absolute left-0 top-0 origin-center",
                        Math.abs(offset) > 2 && "pointer-events-none"
                      )}
                      style={{ zIndex: style.zIndex }}
                      initial={false}
                      animate={{
                        x: style.x,
                        z: style.z,
                        scale: style.scale,
                        rotateY: style.rotateY,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {isActive && venue.video ? (
                        <PhoneVideo
                          src={venue.video}
                          poster={venue.image}
                          title={venue.title}
                          place={venue.place}
                          widthClassName={cn(
                            phoneWidth,
                            "shadow-[0_28px_60px_-18px_rgba(0,0,0,0.55)] ring-2 ring-white/40"
                          )}
                          autoPlay
                          muted
                          loop
                          playSize="sm"
                        />
                      ) : (
                        <button
                          type="button"
                          aria-label={`Focus ${venue.title}`}
                          onClick={() => focusPhone(index)}
                          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                        >
                          <div className={cn("hero-phone aspect-[9/19.2] shadow-lg", phoneWidth)}>
                            <div className="hero-phone-screen">
                              <Image
                                src={venue.image}
                                alt={venue.title}
                                fill
                                className="object-cover"
                                sizes="252px"
                              />
                              <div className="absolute inset-0 bg-black/25 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                              <AppTopBar />
                              <AppBottomNav />
                              <div className="absolute bottom-[54px] left-0 right-0 p-3 text-left">
                                <p className="truncate text-[12px] font-bold text-white">
                                  {venue.title}
                                </p>
                                <p className="truncate text-[10px] text-white/70">{venue.place}</p>
                              </div>
                            </div>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="site-rail mt-4 pb-16 pt-2 sm:mt-0 sm:pb-20 sm:pt-0">
        <StudioBoard />
      </div>
    </section>
  );
}
