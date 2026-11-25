"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Default false — replay every time the block enters view */
  once?: boolean;
};

export function BlurFade({
  children,
  className,
  delay = 0,
  y = 16,
  once = false,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fallback = window.setTimeout(() => setShown(true), 900 + delay * 1000);
    let lastY = window.scrollY;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const goingDown = y >= lastY;
      lastY = y;

      if (rect.bottom < 0 || rect.top > vh) {
        if (!once) setShown(false);
        return;
      }

      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      if (visible <= 0) return;
      const ratio = visible / Math.min(rect.height, vh);

      if (goingDown) {
        if (rect.top < vh * 0.92 && ratio >= 0.15) {
          setShown(true);
          window.clearTimeout(fallback);
        }
      } else if (rect.top < vh * 0.72 && rect.top > -24 && ratio >= 0.15) {
        setShown(true);
        window.clearTimeout(fallback);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [delay, once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        shown
          ? "translate-y-0 opacity-100 blur-0"
          : "opacity-0 blur-[6px]",
        className
      )}
      style={{
        transitionDelay: shown ? `${delay}s` : "0s",
        transform: shown ? undefined : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
