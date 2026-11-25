"use client";

import { useCallback, useEffect, useRef } from "react";
import { AppBottomNav, AppTopBar } from "@/components/ui/app-chrome";
import { cn } from "@/lib/utils";

type PhoneVideoProps = {
  src: string;
  poster?: string;
  title?: string;
  place?: string;
  className?: string;
  widthClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  /** @deprecated Play controls removed — videos always autoplay/loop when in view */
  playSize?: "sm" | "md" | "lg";
  hideControls?: boolean;
};

/**
 * Smooth phone reel player with Tapsy app chrome (Home top + scooped bottom nav).
 * Auto-plays and loops when in view — no play button.
 */
export function PhoneVideo({
  src,
  poster,
  title,
  place,
  className,
  widthClassName = "w-full max-w-[252px]",
  autoPlay = true,
  muted = true,
  loop = true,
}: PhoneVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantPlay = useRef(autoPlay);
  const inView = useRef(false);

  const syncPlayback = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    if (wantPlay.current && inView.current) {
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
        inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        syncPlayback();
      },
      { threshold: [0, 0.35, 0.6], rootMargin: "80px 0px" }
    );

    io.observe(root);
    return () => {
      io.disconnect();
      videoRef.current?.pause();
    };
  }, [syncPlayback, src]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wantPlay.current = false;
      videoRef.current?.pause();
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("hero-phone aspect-[9/19.2]", widthClassName, className)}
    >
      <div className="hero-phone-screen">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline
          autoPlay={autoPlay}
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
        />

        {/* Bottom fade only — no top darken (keeps Home chrome flush / native) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <AppTopBar />
        <AppBottomNav />

        {(title || place) && (
          <div className="pointer-events-none absolute bottom-[54px] left-0 right-0 z-20 p-3 text-left">
            {title ? (
              <p className="truncate text-[12px] font-bold text-white sm:text-[13px]">{title}</p>
            ) : null}
            {place ? (
              <p className="truncate text-[10px] text-white/70 sm:text-[11px]">{place}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
