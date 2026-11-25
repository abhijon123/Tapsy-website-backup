"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealFrom = "up" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Slide direction — left/right for side settle, up for default */
  from?: RevealFrom;
  /** Default false — replay every time the block enters view */
  once?: boolean;
};

/**
 * Top-scroll feel preserved (trigger as content rises into view).
 * Bottom-scroll mirrored: wait until the top of the block is on-screen
 * so the same slide is visible when approaching from below.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;
    const fallback = window.setTimeout(() => setShown(true), 1200);

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const goingDown = y >= lastY;
      lastY = y;

      const fullyOut = rect.bottom < 0 || rect.top > vh;
      if (fullyOut) {
        if (!once) setShown(false);
        return;
      }

      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      if (visible <= 0) return;
      const ratio = visible / Math.min(rect.height, vh);

      if (goingDown) {
        // Original top-scroll: fire as the block comes up from below (~12% in, above bottom 8%)
        if (rect.top < vh * 0.92 && ratio >= 0.12) {
          setShown(true);
          window.clearTimeout(fallback);
        }
      } else {
        // Bottom-scroll: same effect, but only once the TOP is in view so you can see it
        if (rect.top < vh * 0.72 && rect.top > -24 && ratio >= 0.12) {
          setShown(true);
          window.clearTimeout(fallback);
        }
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
  }, [once]);

  const hiddenClass =
    from === "left"
      ? "reveal-hidden-left"
      : from === "right"
        ? "reveal-hidden-right"
        : "reveal-hidden";

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-base",
        shown ? "reveal-shown" : hiddenClass,
        className
      )}
      style={{ transitionDelay: shown ? `${delay}s` : "0s" }}
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    const fallback = window.setTimeout(() => setShown(true), 1400);

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
        if (rect.top < vh * 0.92 && ratio >= 0.1) {
          setShown(true);
          window.clearTimeout(fallback);
        }
      } else if (rect.top < vh * 0.72 && rect.top > -24 && ratio >= 0.1) {
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
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(className, shown && "stagger-shown")}
      style={{ ["--stagger-delay" as string]: `${delay}s` }}
      data-shown={shown ? "true" : "false"}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<{ index?: number }>, {
          index: i,
        });
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={cn("stagger-item", className)}
      style={{ transitionDelay: `calc(var(--stagger-delay, 0s) + ${index * 0.08}s)` }}
    >
      {children}
    </div>
  );
}
