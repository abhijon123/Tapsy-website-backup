"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Video } from "lucide-react";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { BlurFade } from "@/components/ui/blur-fade";
import { Reveal } from "@/components/ui/reveal";
import { cn, assetUrl } from "@/lib/utils";
import { siteVideos } from "@/lib/content";

function BannerVideo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);

  const sync = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView.current) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        sync();
      },
      { threshold: [0, 0.3, 0.6], rootMargin: "60px 0px" }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      videoRef.current?.pause();
    };
  }, [sync]);

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden rounded-[28px] bg-zinc-950 shadow-[0_24px_60px_-28px_rgba(124,58,237,0.45)]"
    >
      {/* Landscape stock reel — full-bleed cover fits the wide banner */}
      <div className="relative min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[420px]">
        <video
          ref={videoRef}
          src={siteVideos.beforeAfter}
          poster={assetUrl("/assets/app-reel-bellavista.png")}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

        <div className="absolute left-4 top-4 z-20 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2 sm:left-6 sm:top-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" />
            Live take
          </span>
          <span className="rounded-full bg-gradient-tapsy px-2.5 py-1 text-[11px] font-bold text-white">
            Verified visit
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 sm:bottom-7 sm:left-7 sm:right-7">
          <p className="text-[18px] font-bold text-white sm:text-[20px]">Real venue. Real take.</p>
          <p className="mt-1 text-[13px] text-white/75 sm:text-[14px]">
            See the room. Hear the buzz. Know before you go.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [mode, setMode] = useState<"text" | "video">("video");

  return (
    <section className="site-section bg-zinc-50">
      <div className="site-rail">
        <BlurFade className="mx-auto max-w-2xl text-center">
          <h2 className="type-section text-foreground">
            <WordsPullUp
              text="Same place. Totally different trust."
              className="justify-center max-sm:flex-wrap sm:!flex-nowrap sm:whitespace-nowrap"
            />
          </h2>
          <p className="type-lead mx-auto mt-3">
            Reading “great vibes” is guesswork. Watching a 30-second take is proof.
          </p>
        </BlurFade>

        <div className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center rounded-full bg-white p-1 shadow-[0_12px_40px_-24px_rgba(15,10,40,0.35)]">
          <button
            onClick={() => setMode("text")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition sm:px-4 sm:text-[13px]",
              mode === "text" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-foreground"
            )}
          >
            <Type className="h-3.5 w-3.5 shrink-0" />
            Old text review
          </button>
          <button
            onClick={() => setMode("video")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition sm:px-4 sm:text-[13px]",
              mode === "video" ? "bg-gradient-tapsy text-white" : "text-zinc-500 hover:text-foreground"
            )}
          >
            <Video className="h-3.5 w-3.5 shrink-0" />
            Tapsy 30s take
          </button>
        </div>

        <Reveal from="left" className="relative mt-8 w-full overflow-x-clip">
          <AnimatePresence mode="wait">
            {mode === "text" ? (
              <motion.article
                key="text"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(15,10,40,0.3)] sm:p-8 lg:p-10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-bold text-zinc-900">Bella Vista</p>
                    <p className="text-[12px] text-zinc-400">★★★★★ · “Amazing!!!”</p>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-500">
                    Text wall
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-zinc-500 sm:text-[16px]">
                  Food was good. Service was nice. Ambience was great. Would recommend to friends
                  and family. Parking was okay. Wait time was fine. Pasta was delicious. Overall a
                  solid experience if you like Italian…
                </p>
                <p className="mt-4 text-[13px] font-medium text-zinc-400">
                  You still don’t know the lighting, noise, or plate size.
                </p>
              </motion.article>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full"
              >
                <BannerVideo />
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
