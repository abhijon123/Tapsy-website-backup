"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Scissors,
  Volume2,
  MapPin,
  ShieldCheck,
  Video,
} from "lucide-react";
import { cn, assetUrl } from "@/lib/utils";
import { siteVideos } from "@/lib/content";
import { AppBottomNav, AppTopBar } from "@/components/ui/app-chrome";

type Mode = "auto" | "manual";

const flow = [
  {
    id: "record",
    label: "Record the take",
    title: "One tap. You’re filming.",
    detail: "Capture the vibe in a short reel — no setup, no CapCut.",
    icon: Video,
    badge: "REC",
  },
  {
    id: "trim",
    label: "Smart trim",
    title: "Dead space gone.",
    detail: "Tapsy keeps the punch and cuts the silence for you.",
    icon: Scissors,
    badge: "Trim",
  },
  {
    id: "audio",
    label: "Audio clean",
    title: "Voice clear. Noise down.",
    detail: "Room buzz drops so the reaction stays front and center.",
    icon: Volume2,
    badge: "Audio",
  },
  {
    id: "tags",
    label: "Geo + vibe tags",
    title: "Place + vibe stamped.",
    detail: "Neighborhood and mood tags ride with the clip automatically.",
    icon: MapPin,
    badge: "Tags",
  },
  {
    id: "verified",
    label: "Verified + ready",
    title: "Ready to post.",
    detail: "Verified visit badge on. One take in — publish-ready out.",
    icon: ShieldCheck,
    badge: "Done",
  },
];

const STEP_MS = 3200;

/** Same reel stays looping; only overlays / active step change — like link.me */
export function StudioBoard() {
  const [mode, setMode] = useState<Mode>("auto");
  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const active = flow[step];
  const ActiveIcon = active.icon;

  // Circulate steps while section is visible
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!inView.current) return;
      setStep((s) => (s + 1) % flow.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [mode]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mt-10 overflow-hidden rounded-[32px] bg-[#0a0a0f] px-5 py-10 text-white sm:mt-14 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h3 className="text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold tracking-[-0.035em] leading-[1.1]">
          <span className="block">Record in seconds.</span>
          <span className="block italic text-gradient-tapsy">Edit in zero.</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
          One take circulates through the whole studio flow — trim, clean, tag, verify —
          without leaving the reel.
        </p>
      </div>

      <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        {/* Left copy + toggle */}
        <div className="order-2 min-w-0 lg:order-1">
          <div className="mb-5 inline-flex max-w-full flex-wrap rounded-full bg-white/[0.06] p-1">
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
                  setStep(0);
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

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${active.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
                {String(step + 1).padStart(2, "0")} / {String(flow.length).padStart(2, "0")}
              </p>
              <h4 className="mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold tracking-tight">
                {active.title}
              </h4>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
                {mode === "auto"
                  ? active.detail
                  : `${active.detail} Flip this step on or off — same reel, your call.`}
              </p>
            </motion.div>
          </AnimatePresence>

          <ul className="mt-7 space-y-2.5">
            {[
              "Same video all the way through the flow",
              "No CapCut. No exports. No waiting.",
              "Verified visit badge rides with the clip",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/75">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Center phone — one circulating video */}
        <div className="order-1 mx-auto w-[min(230px,72vw)] sm:w-[250px] lg:order-2 lg:w-[260px]">
          <div className="hero-phone aspect-[9/19.2] w-full shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65)]">
            <div className="hero-phone-screen group">
              <video
                ref={videoRef}
                src={siteVideos.studio}
                poster={assetUrl("/assets/app-reel-bellavista.png")}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <AppTopBar />
              <AppBottomNav />

              {/* Step overlay chrome — video underneath never swaps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute inset-0 z-10"
                >
                  {active.id === "record" && (
                    <div className="absolute left-3 top-11 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        Rec
                      </span>
                      <span className="rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-white/80">
                        0:14
                      </span>
                    </div>
                  )}

                  {active.id === "trim" && (
                    <div className="absolute inset-x-3 bottom-[4.5rem]">
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                          className="h-full rounded-full bg-gradient-tapsy"
                          initial={{ width: "30%" }}
                          animate={{ width: "72%" }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                      </div>
                      <p className="mt-2 text-center text-[10px] font-semibold text-white/70">
                        Trimming dead space…
                      </p>
                    </div>
                  )}

                  {active.id === "audio" && (
                    <div className="absolute inset-x-4 top-1/3 flex items-end justify-center gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-violet-400"
                          animate={{ height: [10, 28 + (i % 4) * 6, 14] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {active.id === "tags" && (
                    <div className="absolute left-3 top-11 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm">
                        Downtown
                      </span>
                      <span className="rounded-full bg-gradient-tapsy px-2.5 py-1 text-[10px] font-bold">
                        Outstanding
                      </span>
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm">
                        Nightlife
                      </span>
                    </div>
                  )}

                  {active.id === "verified" && (
                    <div className="absolute left-3 top-11 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold">
                      <ShieldCheck className="h-3 w-3" />
                      Verified visit
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-tapsy">
                        <ActiveIcon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-bold">{active.badge}</p>
                        <p className="truncate text-[10px] text-white/65">{active.label}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Right step rail — click to jump, auto circulates */}
        <div className="order-3 min-w-0 space-y-2">
          <p className="mb-3 text-[12px] font-medium text-white/40">
            Same flow · one video
          </p>
          {flow.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === step;
            const isPast = i < step;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setStep(i);
                  void videoRef.current?.play();
                }}
                className={cn(
                  "flex w-full max-w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition sm:gap-3 sm:px-3",
                  isActive
                    ? "bg-violet-500/20 ring-1 ring-violet-400/30"
                    : "bg-white/[0.035] hover:bg-white/[0.06]"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold",
                    isActive || isPast
                      ? "bg-gradient-tapsy text-white"
                      : "bg-white/10 text-white/45"
                  )}
                >
                  {isPast && !isActive ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span
                    className={cn(
                      "block truncate text-[13px] font-semibold",
                      isActive ? "text-white" : "text-white/70"
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="block truncate text-[11px] text-white/40">
                    {item.detail}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-bold text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}

          {/* Progress bar for current step — scaleX so it never overflows the card */}
          <div className="mt-3 h-1 w-full max-w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              key={step}
              className="h-full origin-left rounded-full bg-gradient-tapsy"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: STEP_MS / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
