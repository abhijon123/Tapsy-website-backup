"use client";

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchActive = useRef(false);

  const pause = useCallback(() => {
    if (pauseOnHover) setPaused(true);
  }, [pauseOnHover]);

  const resume = useCallback(() => {
    touchActive.current = false;
    setPaused(false);
  }, []);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Desktop: pause for the whole hover (same as before)
      if (pauseOnHover && e.pointerType === "mouse") pause();
    },
    [pause, pauseOnHover]
  );

  const onPointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") resume();
      // Touch leave (drag off strip) also resumes
      if (e.pointerType === "touch") resume();
    },
    [resume]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Phone: pause while finger is down — mirrors web hover
      if (pauseOnHover && e.pointerType === "touch") {
        touchActive.current = true;
        pause();
      }
    },
    [pause, pauseOnHover]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Lift finger → resume (incl. after Follow tap)
      if (e.pointerType === "touch") resume();
    },
    [resume]
  );

  // Safety: if touch ends outside the marquee, still resume
  useEffect(() => {
    if (!pauseOnHover) return;

    const endTouch = () => {
      if (touchActive.current) resume();
    };

    window.addEventListener("touchend", endTouch);
    window.addEventListener("touchcancel", endTouch);
    return () => {
      window.removeEventListener("touchend", endTouch);
      window.removeEventListener("touchcancel", endTouch);
    };
  }, [pauseOnHover, resume]);

  return (
    <div
      {...props}
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={resume}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.25rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee flex-col [writing-mode:horizontal-tb]": vertical,
              "[animation-direction:reverse]": reverse,
            })}
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
