"use client";

import { useCallback, useEffect, useId, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

type DistributeBeamsProps = {
  containerRef: RefObject<HTMLElement | null>;
  hubRef: RefObject<HTMLElement | null>;
  destRefs: RefObject<(HTMLElement | null)[]>;
  activeCount: number;
  strokeColors?: string[];
  className?: string;
  /** Divide measured coords when parent uses CSS transform: scale(...) */
  coordScale?: number;
};

type BeamPath = {
  d: string;
  length: number;
  color?: string;
};

/**
 * Hub → spoke beams aligned to real DOM nodes (link.me style).
 * Every destination gets a curved connector into its left edge center.
 */
export function DistributeBeams({
  containerRef,
  hubRef,
  destRefs,
  activeCount,
  strokeColors,
  className,
  coordScale = 1,
}: DistributeBeamsProps) {
  const gid = useId().replace(/:/g, "");
  const [paths, setPaths] = useState<BeamPath[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const hub = hubRef.current;
    const dests = destRefs.current;
    if (!container || !hub || !dests?.length) return;

    const s = coordScale || 1;
    const c = container.getBoundingClientRect();
    const h = hub.getBoundingClientRect();

    // Origin: vertical mid of hub, on its right edge (unscale for CSS-transformed parents)
    const x1 = (h.right - c.left) / s;
    const y1 = (h.top + h.height / 2 - c.top) / s;

    const next: BeamPath[] = dests.map((el, i) => {
      if (!el) {
        return { d: "", length: 0, color: strokeColors?.[i] };
      }
      const r = el.getBoundingClientRect();
      const x2 = (r.left - c.left) / s;
      const y2 = (r.top + r.height / 2 - c.top) / s;

      // Bundle near hub, then fan — soft cubic like link.me
      const dx = x2 - x1;
      const c1x = x1 + dx * 0.28;
      const c1y = y1;
      const c2x = x1 + dx * 0.62;
      const c2y = y2;
      const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

      // Approximate length for dash animation (overshoot so last spoke always fills)
      const length = Math.hypot(dx, y2 - y1) * 1.35 + 40;

      return { d, length, color: strokeColors?.[i] };
    });

    setPaths(next);
  }, [containerRef, hubRef, destRefs, strokeColors, coordScale]);

  useEffect(() => {
    let raf = 0;
    const softMeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    softMeasure();
    const t1 = window.setTimeout(softMeasure, 80);
    const t2 = window.setTimeout(softMeasure, 320);

    const ro = new ResizeObserver(softMeasure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (hubRef.current) ro.observe(hubRef.current);
    destRefs.current?.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", softMeasure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", softMeasure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // Paths only need remeasure on mount / size change — not every publish tick
  }, [measure, containerRef, hubRef, destRefs]);

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-visible", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`dist-${gid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="35%" stopColor="#9333EA" />
          <stop offset="65%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#FF6A3D" />
        </linearGradient>
      </defs>
      {paths.map((p, i) => {
        if (!p.d) return null;
        const on = i < activeCount;
        const len = Math.max(p.length, 120);
        return (
          <path
            key={i}
            d={p.d}
            stroke={p.color ?? `url(#dist-${gid})`}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-[stroke-dashoffset,opacity] duration-700 ease-out"
            style={{
              strokeDasharray: len,
              strokeDashoffset: on ? 0 : len,
              opacity: on ? 1 : 0.12,
              transitionDelay: `${i * 60}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}
