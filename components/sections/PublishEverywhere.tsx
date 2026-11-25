"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Compass,
  MapPin,
  Flame,
  Users,
  Utensils,
  Moon,
  Coffee,
  X,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { DistributeBeams } from "@/components/ui/distribute-beams";
import { AppBottomNav, AppTopBar } from "@/components/ui/app-chrome";
import { cn, assetUrl } from "@/lib/utils";
import { siteVideos } from "@/lib/content";

const destinations = [
  {
    id: "discover",
    label: "Discover feed",
    icon: Compass,
    color: "from-blue-500 to-violet-500",
    stroke: "#3B82F6",
  },
  {
    id: "followers",
    label: "Your followers",
    icon: Users,
    color: "from-violet-500 to-fuchsia-500",
    stroke: "#A855F7",
  },
  {
    id: "nearby",
    label: "Nearby map",
    icon: MapPin,
    color: "from-fuchsia-500 to-pink-400",
    stroke: "#D946EF",
  },
  {
    id: "trending",
    label: "Trending tonight",
    icon: Flame,
    color: "from-pink-500 to-orange-400",
    stroke: "#F472B6",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: Utensils,
    color: "from-blue-500 to-fuchsia-500",
    stroke: "#6366F1",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    icon: Moon,
    color: "from-indigo-500 to-violet-500",
    stroke: "#818CF8",
  },
  {
    id: "cafe",
    label: "Cafes",
    icon: Coffee,
    color: "from-fuchsia-500 to-[#FF6A3D]",
    stroke: "#FF6A3D",
  },
];

type Mode = "auto" | "manual";
type Phase = "compose" | "peeling" | "distribute" | "done";
type FlyRect = { x: number; y: number; w: number; h: number };

const COMPOSE_MS = 2800;
/** Calm peel — link.me pace */
const PEEL_MS = 2200;
const LAYOUT_SETTLE_MS = 1200;
const STEP_MS = 400;
const HOLD_MS = 3000;

const easeCalm = [0.16, 1, 0.3, 1] as const;

export function PublishEverywhere() {
  const [mode, setMode] = useState<Mode>("auto");
  const [phase, setPhase] = useState<Phase>("compose");
  const [published, setPublished] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);
  const [clickPulse, setClickPulse] = useState(false);
  const [flyFrom, setFlyFrom] = useState<FlyRect | null>(null);
  const [flyTo, setFlyTo] = useState<FlyRect | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const composerMediaRef = useRef<HTMLDivElement>(null);
  const hubSlotRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const destRefs = useRef<(HTMLElement | null)[]>([]);
  const inView = useRef(true);
  /**
   * Fit any viewport: keep exact desktop stage geometry + timing,
   * CSS-scale the board whenever its column is narrower than the design width.
   * (Fixes phones AND small/medium monitors — large screens stay scale 1.)
   */
  const STAGE_DESIGN_W = 640;
  const [fit, setFit] = useState({ scale: 1, height: 0 });
  const fitScaleRef = useRef(1);

  useEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      const board = boardRef.current;
      if (!stage || !board) return;

      const naturalH = Math.max(stage.scrollHeight, stage.offsetHeight, 460);
      const available = Math.max(240, board.clientWidth);
      const scale = Math.min(1, available / STAGE_DESIGN_W);

      fitScaleRef.current = scale;
      setFit({
        scale,
        height: scale < 1 ? Math.ceil(naturalH * scale) : 0,
      });
    };

    update();
    const ro = new ResizeObserver(() => update());
    if (boardRef.current) ro.observe(boardRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", update);
    // Re-fit after layout animations settle
    const t1 = window.setTimeout(update, 50);
    const t2 = window.setTimeout(update, 400);
    const t3 = window.setTimeout(update, 1400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [phase, cycle]);

  useEffect(() => {
    setPhase("compose");
    setPublished([]);
    setClickPulse(false);
    setFlyFrom(null);
    setFlyTo(null);

    const timers: number[] = [];
    const run = (fn: () => void) => {
      if (!inView.current) return;
      fn();
    };

    timers.push(
      window.setTimeout(() => run(() => setClickPulse(true)), COMPOSE_MS - 420)
    );

    // Expand side-by-side first so measure happens in the final layout
    timers.push(
      window.setTimeout(() => {
        run(() => {
          setPhase("peeling");
          setClickPulse(false);
        });
      }, COMPOSE_MS)
    );

    // Measure phone → hub after settle, then start the calm direct fly
    timers.push(
      window.setTimeout(() => {
        run(() => {
          const stage = stageRef.current?.getBoundingClientRect();
          const media = composerMediaRef.current?.getBoundingClientRect();
          const hub = hubSlotRef.current?.getBoundingClientRect();
          if (!stage || !media || !hub) return;

          // getBoundingClientRect is post-CSS-scale; absolute children use pre-scale coords
          const s = fitScaleRef.current || 1;
          const size =
            Math.min(media.width * 0.78, media.height * 0.38) / s;
          setFlyFrom({
            x: (media.left - stage.left) / s + (media.width / s - size) / 2,
            y: (media.top - stage.top) / s + (media.height / s) * 0.16,
            w: size,
            h: size,
          });
          setFlyTo({
            x: (hub.left - stage.left) / s,
            y: (hub.top - stage.top) / s,
            w: hub.width / s,
            h: hub.height / s,
          });
        });
      }, COMPOSE_MS + LAYOUT_SETTLE_MS)
    );

    const peelDone = COMPOSE_MS + LAYOUT_SETTLE_MS + PEEL_MS;

    timers.push(
      window.setTimeout(() => run(() => setPhase("distribute")), peelDone)
    );

    destinations.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          run(() =>
            setPublished((prev) => (prev.includes(i) ? prev : [...prev, i]))
          );
        }, peelDone + 120 + i * STEP_MS)
      );
    });

    const doneAt = peelDone + 120 + destinations.length * STEP_MS;

    timers.push(window.setTimeout(() => run(() => setPhase("done")), doneAt));

    timers.push(
      window.setTimeout(() => setCycle((c) => c + 1), doneAt + HOLD_MS)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle, mode]);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase, cycle]);

  const composing = phase === "compose";
  const showDistribute = phase !== "compose";
  /** Flying only once both endpoints exist (after layout settle) */
  const flying = phase === "peeling" && !!flyFrom && !!flyTo;
  const videoLeftPhone = flying || phase === "distribute" || phase === "done";
  const settled = phase === "distribute" || phase === "done";
  const fanLive = settled;
  const allDone = phase === "done" || published.length >= destinations.length;
  const selectedCount = mode === "auto" ? destinations.length : 4;

  return (
    <section
      id="publish"
      className="relative overflow-x-clip bg-[#0a0a0f] py-16 text-white sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(124,58,237,0.22),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(217,70,239,0.14),transparent_45%)]" />

      <div className="site-rail relative">
        <Reveal className="mb-12 sm:mb-14">
          <MetricsStrip />
        </Reveal>

        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="type-section text-white">
            Tap once.{" "}
            <span className="italic text-gradient-tapsy">It lands everywhere.</span>
          </h2>
          <p className="type-lead mx-auto mt-4 text-white/60">
            One take in New Post. Hit publish the clip peels out and fans to every feed.
          </p>
        </Reveal>

        <div
          className={cn(
            "grid w-full min-w-0 items-center gap-10 lg:gap-14 xl:gap-20",
            /* Side-by-side only on large screens — medium monitors get full-width board */
            showDistribute
              ? "xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.4fr)]"
              : "xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          )}
        >
          <Reveal delay={0.08}>
            <div className="max-w-md min-w-0 lg:max-w-xl">
              <div className="mb-6 inline-flex max-w-full flex-wrap rounded-full bg-white/[0.06] p-1 backdrop-blur-md">
                {(
                  [
                    { id: "auto", label: "Let Tapsy do it" },
                    { id: "manual", label: "Do it yourself" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setMode(opt.id);
                      setCycle((c) => c + 1);
                    }}
                    className={cn(
                      "rounded-full px-3 py-2 text-[12px] font-semibold transition sm:px-4 sm:text-[13px]",
                      mode === opt.id
                        ? "bg-white text-zinc-900 shadow-lg shadow-black/30"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">
                {mode === "auto"
                  ? "Compose once. Watch it split out."
                  : "Compose once. You pick the feeds."}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                {mode === "auto"
                  ? "The reel starts in New Post. On publish it leaves the composer as its own card, then beams into Discover, followers, nearby, trending, and categories."
                  : "Same peel-out — you choose which feeds get a spoke. The clip still comes out of the post as one hub first."}
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Video starts inside New Post",
                  "Peels out as its own published card",
                  "Then fans to every destination",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/80">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {/*
              Identical desktop stage (phone → hub → destinations).
              CSS-scaled whenever the board column is narrower than design width.
            */}
            <div
              ref={boardRef}
              className="relative w-full min-w-0 overflow-x-clip py-2"
              style={
                fit.scale < 1 && fit.height
                  ? { height: fit.height }
                  : undefined
              }
            >
              <div
                className={cn(fit.scale < 1 && "mx-auto")}
                style={
                  fit.scale < 1
                    ? {
                        width: STAGE_DESIGN_W * fit.scale,
                        height: fit.height,
                      }
                    : undefined
                }
              >
              <div
                ref={stageRef}
                className={cn(
                  "relative flex items-center gap-4 sm:gap-5 lg:gap-6",
                  /*
                    Mobile (scaled): fixed design width + CSS scale, centered by parent.
                    Small/medium monitors (stacked, < xl): cap width + center so the hub
                    isn’t left-packed. Large xl+: full board width, phone can ml-auto.
                  */
                  fit.scale < 1
                    ? "w-[640px] justify-center"
                    : "mx-auto w-full max-w-[720px] justify-center xl:mx-0 xl:max-w-none xl:justify-start"
                )}
                style={
                  fit.scale < 1
                    ? {
                        transform: `scale(${fit.scale})`,
                        transformOrigin: "top left",
                      }
                    : undefined
                }
              >
                {/* Real stack phone — layout anim slides calmly left on Post */}
                <motion.div
                  layout
                  className={cn(
                    "relative z-20 shrink-0 [transform:translateZ(0)]",
                    composing && fit.scale >= 1 && "xl:ml-auto"
                  )}
                  initial={false}
                  animate={{
                    opacity: composing ? 1 : 0.94,
                    scale: composing ? 1 : 0.98,
                  }}
                  transition={{
                    layout: { duration: 1.2, ease: easeCalm },
                    opacity: { duration: 0.6, ease: easeCalm },
                    scale: { duration: 0.6, ease: easeCalm },
                  }}
                >
                  <div
                    className={cn(
                      "hero-phone aspect-[9/19.2]",
                      /* Fixed px widths so mobile scale is uniform (no vw) */
                      "w-[210px] sm:w-[230px] lg:w-[252px]",
                      "shadow-[0_28px_60px_-18px_rgba(0,0,0,0.55)] ring-2 ring-white/40"
                    )}
                  >
                    <div className="hero-phone-screen">
                      {/* Full-bleed media — stays until fly starts, then Posted */}
                      <div ref={composerMediaRef} className="absolute inset-0">
                        {!videoLeftPhone ? (
                          <AlwaysPlayingVideo videoRef={videoRef} />
                        ) : (
                          <>
                            <img
                              src={assetUrl("/assets/app-reel-bellavista.png")}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover opacity-40"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-black/55" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/70 backdrop-blur-sm">
                                Posted ✓
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      <AppTopBar title="New Post" />
                      <AppBottomNav />

                      {/* New Post sheet — sits above bottom nav */}
                      <div className="absolute inset-x-0 bottom-[52px] z-20 px-2.5 pb-2 pt-6">
                        <div className="absolute left-2.5 right-2.5 top-0 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-md">
                            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-500 to-[#FF6A3D]" />
                            <span className="text-[10px] font-bold">Compose</span>
                          </div>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-md">
                            <X className="h-2.5 w-2.5" />
                          </span>
                        </div>

                        <div className="mt-7 rounded-[1.05rem] border border-white/10 bg-black/50 p-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                          <p className="text-[10px] leading-snug text-white/80">
                            Just tapped this spot — vibe check for anyone nearby…
                          </p>

                          <p className="mb-1 mt-2 text-[8px] font-semibold uppercase tracking-wider text-white/40">
                            Post to
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {destinations.map((d, i) => {
                              const Icon = d.icon;
                              const on = mode === "auto" || i < selectedCount;
                              return (
                                <span
                                  key={d.id}
                                  className={cn(
                                    "inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[8px] font-semibold",
                                    on
                                      ? cn(
                                          "border-transparent bg-gradient-to-r text-white",
                                          d.color
                                        )
                                      : "border-white/10 bg-white/[0.06] text-white/40"
                                  )}
                                >
                                  <Icon className="h-2.5 w-2.5" />
                                  {d.label.split(" ")[0]}
                                </span>
                              );
                            })}
                          </div>

                          <div className="relative mt-2.5">
                            <div
                              className={cn(
                                "flex h-9 items-center justify-center rounded-full text-[12px] font-bold transition-all duration-300",
                                composing
                                  ? "bg-white text-zinc-900"
                                  : allDone
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/85 text-zinc-900",
                                clickPulse && "scale-[0.97] brightness-95"
                              )}
                            >
                              {composing ? "Post" : allDone ? "Published" : "Posting…"}
                            </div>

                            <AnimatePresence>
                              {composing && (
                                <motion.div
                                  key={`cursor-${cycle}`}
                                  className="pointer-events-none absolute z-30"
                                  initial={{ opacity: 0, x: 36, y: 28 }}
                                  animate={
                                    clickPulse
                                      ? { opacity: 1, x: 12, y: 6, scale: 0.9 }
                                      : { opacity: 1, x: 18, y: 12, scale: 1 }
                                  }
                                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                  transition={{ duration: 0.4, ease: easeCalm }}
                                  style={{ right: 4, bottom: 0 }}
                                  aria-hidden
                                >
                                  <ClickCursor pressing={clickPulse} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Distribute — keep mounted via opacity for smoother loops */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: showDistribute ? 1 : 0,
                    x: showDistribute ? 0 : 24,
                    pointerEvents: showDistribute ? "auto" : "none",
                  }}
                  transition={{ duration: 1.15, ease: easeCalm }}
                  className={cn(
                    "relative z-10 min-w-0",
                    showDistribute
                      ? "flex-1"
                      : "pointer-events-none absolute right-0 top-1/2 w-[min(100%,420px)] -translate-y-1/2 opacity-0"
                  )}
                  aria-hidden={!showDistribute}
                >
                  <div
                    ref={fanRef}
                    className="relative flex min-h-[420px] w-full items-center sm:min-h-[460px]"
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-400",
                        fanLive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {showDistribute && (
                        <DistributeBeams
                          key={cycle}
                          containerRef={fanRef}
                          hubRef={hubRef}
                          destRefs={destRefs}
                          activeCount={published.length}
                          strokeColors={destinations.map((d) => d.stroke)}
                          coordScale={fit.scale}
                        />
                      )}
                    </div>

                    <div className="relative z-10 mr-10 w-[120px] shrink-0 sm:mr-14 sm:w-[140px] lg:mr-16">
                      <div className="relative pt-9">
                        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 whitespace-nowrap">
                          <div
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold sm:text-[11px]",
                              allDone
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-white/10 text-white/55"
                            )}
                          >
                            <Check className="h-3 w-3" />
                            {allDone ? "Published to all!" : "Publishing…"}
                          </div>
                        </div>

                        <div
                          ref={(el) => {
                            hubSlotRef.current = el;
                            hubRef.current = el;
                          }}
                          className="relative aspect-square w-full"
                        >
                          {settled && (
                            <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-black shadow-[0_24px_50px_-16px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
                              <AlwaysPlayingVideo videoRef={videoRef} showCaption />
                            </div>
                          )}
                          {flying && (
                            <div className="absolute inset-0 rounded-[20px] border border-dashed border-white/15 bg-white/[0.03]" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        /* flex-1 only on xl — below that intrinsic width so justify-center works */
                        "relative z-10 flex min-w-[210px] shrink-0 flex-col justify-center gap-2.5 transition-opacity duration-400 xl:flex-1 xl:shrink",
                        fanLive ? "opacity-100" : "opacity-35"
                      )}
                    >
                      {destinations.map((dest, i) => {
                        const Icon = dest.icon;
                        const isDone = published.includes(i);
                        return (
                          <div
                            key={dest.id}
                            ref={(el) => {
                              destRefs.current[i] = el;
                            }}
                            className={cn(
                              "flex items-center gap-2.5 rounded-2xl border bg-white/[0.07] py-1.5 pl-1.5 pr-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] transition-[border-color,background-color,opacity] duration-300",
                              isDone
                                ? "border-emerald-400/30 bg-white/[0.12]"
                                : "border-white/10"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white sm:h-9 sm:w-9",
                                dest.color
                              )}
                            >
                              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[12px] font-semibold leading-tight sm:text-[13px]">
                                {dest.label}
                              </span>
                              <span
                                className={cn(
                                  "mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold sm:text-[11px]",
                                  isDone ? "text-emerald-300" : "text-white/25"
                                )}
                              >
                                {isDone ? (
                                  <>
                                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                    Published
                                  </>
                                ) : (
                                  "Waiting…"
                                )}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Direct calm fly: phone reel square → hub (same video, no drop) */}
                <AnimatePresence>
                  {flying && flyFrom && flyTo && (
                    <motion.div
                      key={`fly-${cycle}`}
                      className="pointer-events-none absolute z-40 overflow-hidden rounded-[18px] bg-black shadow-[0_28px_55px_-14px_rgba(0,0,0,0.7)] ring-1 ring-white/20 will-change-transform [transform-origin:0_0]"
                      initial={{
                        left: flyFrom.x,
                        top: flyFrom.y,
                        width: flyFrom.w,
                        height: flyFrom.h,
                        borderRadius: 16,
                        opacity: 1,
                      }}
                      animate={{
                        left: flyTo.x,
                        top: flyTo.y,
                        width: flyTo.w,
                        height: flyTo.h,
                        borderRadius: 20,
                        opacity: 1,
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: PEEL_MS / 1000, ease: easeCalm }}
                    >
                      <video
                        src={siteVideos.publish}
                        poster={assetUrl("/assets/app-reel-bellavista.png")}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClickCursor({ pressing }: { pressing: boolean }) {
  return (
    <div className="relative">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] transition-transform duration-150",
          pressing && "translate-y-0.5"
        )}
      >
        <path
          d="M5.5 3.5 5.5 17.2 9.1 13.8 12.2 20.2 14.4 19.2 11.3 12.7 16.2 12.7Z"
          fill="white"
          stroke="#18181b"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {pressing && (
        <span className="absolute left-1 top-1 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/35 animate-ping" />
      )}
    </div>
  );
}

function AlwaysPlayingVideo({
  videoRef,
  showCaption = false,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showCaption?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={siteVideos.publish}
        poster={assetUrl("/assets/app-reel-bellavista.png")}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      {showCaption && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-[11px] font-bold">Your take</p>
          <p className="text-[9px] text-white/60">One reel → every feed</p>
        </div>
      )}
    </div>
  );
}
