"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Star,
  Utensils,
  Plane,
  Dumbbell,
  Shirt,
} from "lucide-react";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { PhoneVideo } from "@/components/ui/phone-video";
import { AppBottomNav, AppTopBar } from "@/components/ui/app-chrome";
import { cn, assetUrl } from "@/lib/utils";
import { siteVideos } from "@/lib/content";

type VibeLevel = "bad" | "excellent" | "outstanding";

const VIBE_META: Record<
  VibeLevel,
  { label: string; knob: string }
> = {
  bad: { label: "Bad", knob: "left-[8%]" },
  excellent: { label: "Excellent", knob: "left-1/2 -translate-x-1/2" },
  outstanding: { label: "Outstanding", knob: "right-[8%] left-auto" },
};

/** Full desktop orbit composition — CSS-scaled to fit phones / small monitors */
const ORBIT_DESIGN_W = 920;
const ORBIT_DESIGN_H = 580;

function Drift({
  children,
  className,
  /** Closer peak (toward phone) — keep modest so it touches, never crosses */
  xIn = 10,
  /** Farther rest position (away from phone) */
  xOut = -24,
  duration = 3.2,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  xIn?: number;
  xOut?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <div
      className={cn("orbit-drift", className)}
      style={
        {
          "--drift-in": `${xIn}px`,
          "--drift-out": `${xOut}px`,
          "--drift-dur": `${duration}s`,
          "--drift-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

const categories = [
  { label: "Restaurant", icon: Utensils },
  { label: "Travel", icon: Plane },
  { label: "Fitness", icon: Dumbbell },
  { label: "Fashion", icon: Shirt },
] as const;

const tags = [
  { label: "Pet-friendly", activeTone: "bg-gradient-tapsy text-white", idleTone: "bg-zinc-100 text-zinc-700" },
  { label: "Live Music", activeTone: "bg-gradient-tapsy text-white", idleTone: "bg-zinc-100 text-zinc-700" },
  { label: "Outdoor Seating", activeTone: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white", idleTone: "bg-zinc-100 text-zinc-700" },
  { label: "WiFi", activeTone: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white", idleTone: "bg-zinc-100 text-zinc-700" },
];

const gallery = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=240&q=80",
];

export function OrbitShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Restaurant");
  const [vibe, setVibe] = useState<VibeLevel>("excellent");
  const [activeTags, setActiveTags] = useState<string[]>(["Live Music", "WiFi"]);
  const vibeTrackRef = useRef<HTMLDivElement>(null);
  const draggingVibe = useRef(false);
  // Start scaled down so first paint on phones doesn't clip before measure
  const [fit, setFit] = useState({ scale: 0.45, height: Math.ceil(ORBIT_DESIGN_H * 0.45) });

  const vibeFromClientX = (clientX: number) => {
    const el = vibeTrackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / Math.max(rect.width, 1);
    if (x < 0.33) setVibe("bad");
    else if (x < 0.66) setVibe("excellent");
    else setVibe("outstanding");
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingVibe.current) return;
      vibeFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingVibe.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Pause floating cards when section is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Same web composition everywhere — scale the whole stage to the board width
  useEffect(() => {
    const update = () => {
      const board = boardRef.current;
      if (!board) return;
      const available = Math.max(280, board.clientWidth);
      const scale = Math.min(1, available / ORBIT_DESIGN_W);
      setFit({
        scale,
        height: Math.ceil(ORBIT_DESIGN_H * scale),
      });
    };
    update();
    const ro = new ResizeObserver(update);
    if (boardRef.current) ro.observe(boardRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scaled = fit.scale < 0.999;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "site-section relative overflow-x-clip bg-white pt-6 sm:pt-8",
        !active && "[&_.orbit-drift]:![animation-play-state:paused]"
      )}
    >
      <div className="site-rail">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="type-section text-zinc-950">
            <WordsPullUp text="Everything in one tap" className="justify-center" />
          </h2>
          <p className="type-lead mx-auto mt-3">
            Reviews, ratings, tags, and discovery the product around the take.
          </p>
        </div>

        {/*
          One composition (desktop grid + drift). When the rail is narrower than
          design width, CSS-scale the whole stage so side cards never clip.
        */}
        <div
          ref={boardRef}
          className="relative mx-auto w-full min-w-0 overflow-x-clip"
          style={scaled ? { height: fit.height } : undefined}
        >
          <div
            className="mx-auto"
            style={
              scaled
                ? {
                    width: ORBIT_DESIGN_W * fit.scale,
                    height: fit.height,
                  }
                : { width: "100%" }
            }
          >
            <div
              className={cn(
                "relative grid items-center",
                scaled ? "gap-10" : "mx-auto w-full max-w-[920px] gap-6 sm:gap-8 lg:gap-10 xl:gap-16"
              )}
              style={{
                gridTemplateColumns: "minmax(0,1fr) 260px minmax(0,1fr)",
                ...(scaled
                  ? {
                      width: ORBIT_DESIGN_W,
                      height: ORBIT_DESIGN_H,
                      transform: `scale(${fit.scale})`,
                      transformOrigin: "top left",
                    }
                  : undefined),
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.07),transparent_70%)]"
              />

              {/* LEFT */}
              <div className="relative z-10 flex flex-col items-end justify-center gap-4 pr-2">
                <Drift xIn={12} xOut={-22} duration={3} delay={0} className="w-full max-w-[270px]">
                  <div className="rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <div className="flex gap-3">
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=200&q=80"
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400" />
                          ))}
                        </div>
                        <p className="mt-1 line-clamp-3 text-[12px] leading-snug text-zinc-600">
                          “Hands down the best pasta in downtown. The vibe was unmatched.”
                        </p>
                      </div>
                    </div>
                  </div>
                </Drift>

                <div className="flex max-w-[270px] justify-end gap-3">
                  <Drift xIn={10} xOut={-20} duration={2.8} delay={0.15} className="w-[88px] shrink-0">
                    <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-2xl bg-white shadow-[0_16px_36px_-18px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                      <p className="text-[11px] font-medium text-zinc-400">Avg rating</p>
                      <p className="mt-1 text-[22px] font-extrabold tracking-tight text-zinc-900">
                        4.5
                      </p>
                    </div>
                  </Drift>
                  <Drift xIn={14} xOut={-24} duration={3.1} delay={0.3} className="w-[88px] shrink-0">
                    <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-2xl bg-white shadow-[0_16px_36px_-18px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                      <p className="text-[11px] font-medium text-zinc-400">Reviews</p>
                      <p className="mt-1 text-[22px] font-extrabold tracking-tight text-zinc-900">
                        250
                      </p>
                    </div>
                  </Drift>
                </div>

                <Drift xIn={11} xOut={-20} duration={3.3} delay={0.1} className="w-full max-w-[240px]">
                  <div className="rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <p className="text-[12px] font-semibold text-zinc-800">Weekly trend</p>
                    <svg viewBox="0 0 180 64" className="mt-2 h-14 w-full" aria-hidden>
                      <defs>
                        <linearGradient id="orbitLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="100%" stopColor="#FF6A3D" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M4 48 C 28 46, 36 28, 54 32 S 86 52, 104 30 S 140 12, 176 18"
                        fill="none"
                        stroke="url(#orbitLine)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                  </div>
                </Drift>

                <Drift xIn={12} xOut={-22} duration={2.9} delay={0.25} className="w-full max-w-[240px]">
                  <div className="relative z-20 rounded-2xl bg-white px-4 py-3.5 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-zinc-800">
                        {VIBE_META[vibe].label}
                      </span>
                      <span className="text-zinc-400">Vibe</span>
                    </div>
                    <div
                      ref={vibeTrackRef}
                      role="slider"
                      aria-valuetext={VIBE_META[vibe].label}
                      aria-label="Vibe rating"
                      tabIndex={0}
                      className="relative mt-3 h-3 touch-none cursor-grab rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-violet-600 active:cursor-grabbing"
                      onPointerDown={(e) => {
                        draggingVibe.current = true;
                        e.currentTarget.setPointerCapture?.(e.pointerId);
                        vibeFromClientX(e.clientX);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") {
                          setVibe((v) =>
                            v === "outstanding" ? "excellent" : v === "excellent" ? "bad" : "bad"
                          );
                        }
                        if (e.key === "ArrowRight") {
                          setVibe((v) =>
                            v === "bad" ? "excellent" : v === "excellent" ? "outstanding" : "outstanding"
                          );
                        }
                      }}
                    >
                      <span
                        className={cn(
                          "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-fuchsia-500 shadow transition-all duration-200",
                          VIBE_META[vibe].knob
                        )}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px]">
                      {(
                        [
                          ["bad", "Bad"],
                          ["excellent", "Excellent"],
                          ["outstanding", "Outstanding"],
                        ] as const
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setVibe(key)}
                          className={cn(
                            "rounded-md px-1 py-0.5 font-medium transition",
                            vibe === key
                              ? "text-fuchsia-600"
                              : "text-zinc-400 hover:text-zinc-600"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Drift>
              </div>

              {/* CENTER phone */}
              <div className="relative z-30 mx-auto w-[260px]">
                <PhoneVideo
                  src={siteVideos.orbit}
                  poster={assetUrl("/assets/app-reel-bellavista.png")}
                  title="Tapsy video take"
                  place="Verified visit"
                  widthClassName="w-full"
                  autoPlay
                  muted
                  loop
                  playSize="sm"
                />
              </div>

              {/* RIGHT */}
              <div className="relative z-10 flex flex-col items-start justify-center gap-4 pl-2">
                <Drift xIn={-12} xOut={22} duration={3} delay={0.05} className="w-full max-w-[280px]">
                  <div className="relative z-20 rounded-2xl bg-white p-3 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <div className="grid grid-cols-4 gap-2">
                      {categories.map((c) => {
                        const Icon = c.icon;
                        const isOn = activeCategory === c.label;
                        return (
                          <button
                            key={c.label}
                            type="button"
                            onClick={() => setActiveCategory(c.label)}
                            className="flex flex-col items-center gap-1.5 rounded-xl outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-fuchsia-300"
                          >
                            <div
                              className={cn(
                                "flex h-11 w-11 items-center justify-center rounded-xl transition",
                                isOn
                                  ? "bg-gradient-tapsy text-white shadow-md shadow-fuchsia-500/25"
                                  : "bg-zinc-100 text-zinc-500"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span
                              className={cn(
                                "text-[10px] font-medium",
                                isOn ? "text-zinc-800" : "text-zinc-500"
                              )}
                            >
                              {c.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Drift>

                <Drift xIn={-11} xOut={20} duration={3.2} delay={0.2} className="w-full max-w-[260px]">
                  <div className="relative z-20 rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <p className="text-[12px] font-semibold leading-snug text-zinc-800">
                      How people search for spots like yours
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => {
                        const on = activeTags.includes(t.label);
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() =>
                              setActiveTags((prev) =>
                                prev.includes(t.label)
                                  ? prev.filter((x) => x !== t.label)
                                  : [...prev, t.label]
                              )
                            }
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
                              on ? t.activeTone : t.idleTone
                            )}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Drift>

                <Drift xIn={-14} xOut={24} duration={2.85} delay={0.15} className="w-[120px]">
                  {/* Same hero-phone chrome as center mockup; screen asset fills the glass */}
                  <div className="relative aspect-[9/19.2] w-[120px]">
                    <div className="hero-phone absolute left-1/2 top-1/2 aspect-[9/19.2] w-[260px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.4615]">
                      <div className="hero-phone-screen !bg-[#f6f4f4]">
                        {/* Feed sits under the top bar so search isn't covered */}
                        <div className="absolute inset-x-0 bottom-0 top-[48px]">
                          <Image
                            src={assetUrl("/assets/app-discover-screen.png")}
                            alt="Tapsy Discover"
                            fill
                            sizes="260px"
                            className="object-cover object-[center_top]"
                          />
                        </div>
                        {/* Same top/bottom chrome as the large phone */}
                        <AppTopBar title="Discover" />
                        <AppBottomNav />
                      </div>
                    </div>
                  </div>
                </Drift>

                <Drift xIn={-12} xOut={22} duration={3.15} delay={0.3} className="w-full max-w-[220px]">
                  <div className="rounded-2xl bg-white p-3 shadow-[0_18px_40px_-20px_rgba(15,10,40,0.28)] ring-1 ring-zinc-100">
                    <p className="mb-2 text-[12px] font-semibold text-zinc-800">My Gallery</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {gallery.map((src) => (
                        <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image src={src} alt="" fill className="object-cover" sizes="70px" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Drift>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
