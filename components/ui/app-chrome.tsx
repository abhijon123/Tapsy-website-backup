"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Bell, MessageSquare, Search, User } from "lucide-react";
import { assetUrl, cn } from "@/lib/utils";

/**
 * Mirrors the Flutter dashboard chrome:
 * StylishBottomBar(hasNotch, NotchStyle.circle) +
 * FAB 56 docked miniCenterDocked.
 */
export const APP_BOTTOM_NAV_H = 48;
const FAB = 48; // scaled for phone mockups (app uses 56)
const NOTCH_MARGIN = 6; // hollow gap around QR (BottomAppBar notchMargin)
const S1 = 15;
const S2 = 1;

/** Shared top bar height — clears hero-phone-screen rounded bezel (~1.9rem). */
export const APP_TOP_BAR_H = 45;

/**
 * App home header — white → peach bar, centered tapsy, bell right.
 * Extra top padding keeps label/bell below the phone corner clip.
 */
export function AppTopBar({
  title: _title = "Home",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-30",
        className
      )}
    >
      <div
        className="relative flex items-end justify-center rounded-t-[1.9rem] px-3.5 pb-2.5"
        style={{
          height: APP_TOP_BAR_H,
          paddingTop: 18,
          background:
            "linear-gradient(90deg, #FFFFFF 0%, #FFE8E4 45%, #FFD0C8 100%)",
        }}
      >
        <span
          className="pb-0.5 text-[16px] font-extrabold lowercase leading-none tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #1e3a8a 0%, #4c1d95 45%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          tapsy
        </span>
        <span className="absolute bottom-2.5 right-3.5 text-black">
          <Bell className="h-4 w-4" strokeWidth={0} fill="currentColor" />
        </span>
      </div>
    </div>
  );
}

function HomeIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {active ? (
        <defs>
          <linearGradient id={`home-${gid}`} x1="2" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"
        stroke={active ? `url(#home-${gid})` : "#a1a1aa"}
        strokeWidth={active ? 2.1 : 1.9}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Product QR glyph for the docked FAB. */
function ScanQrIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetUrl("/assets/qr-fab-icon.png")}
      alt=""
      aria-hidden
      width={26}
      height={26}
      className="relative z-[1] h-[26px] w-[26px] object-contain"
      draggable={false}
    />
  );
}

type Pt = { x: number; y: number };

/**
 * Exact port of Flutter CircularNotchedRectangle.getOuterPath
 * (used by StylishBottomBar NotchStyle.circle).
 */
function circularNotchedPath(
  hostW: number,
  hostH: number,
  fabSize: number,
  notchMargin: number
): string {
  // guest = FAB inflated by notchMargin (BottomAppBar notchMargin)
  const guestSize = fabSize + notchMargin * 2;
  const r = guestSize / 2;
  const gx = hostW / 2;
  // miniCenterDocked: FAB center sits on the bar's top edge
  const gy = 0;

  const a = -r - S2;
  const b = 0 - gy; // host.top - guest.center.dy

  const denom = a * a + b * b;
  const under = denom - r * r;
  // Guard tiny float error when b ≈ 0
  const n2 = Math.sqrt(Math.max(0, b * b * r * r * under));
  const p2xA = (a * r * r - n2) / denom;
  const p2xB = (a * r * r + n2) / denom;
  const p2yA = Math.sqrt(Math.max(0, r * r - p2xA * p2xA));
  const p2yB = Math.sqrt(Math.max(0, r * r - p2xB * p2xB));

  const cmp = b < 0 ? -1 : 1;
  const p2: Pt =
    cmp * p2yA > cmp * p2yB
      ? { x: p2xA, y: p2yA }
      : { x: p2xB, y: p2yB };

  // Control points in guest-local space, then translate to host
  const p: Pt[] = [
    { x: a - S1, y: b },
    { x: a, y: b },
    p2,
    { x: -p2.x, y: p2.y },
    { x: -a, y: b },
    { x: -(a - S1), y: b },
  ].map((pt) => ({ x: pt.x + gx, y: pt.y + gy }));

  // SVG arc from p2 → p3, radius r, counterclockwise (Flutter clockwise:false)
  return [
    `M0 0`,
    `L${p[0].x} ${p[0].y}`,
    `Q${p[1].x} ${p[1].y} ${p[2].x} ${p[2].y}`,
    `A${r} ${r} 0 0 0 ${p[3].x} ${p[3].y}`,
    `Q${p[4].x} ${p[4].y} ${p[5].x} ${p[5].y}`,
    `L${hostW} 0`,
    `L${hostW} ${hostH}`,
    `L0 ${hostH}`,
    `Z`,
  ].join(" ");
}

/**
 * Product tab bar — StylishBottomBar circular notch + docked QR FAB.
 */
export function AppBottomNav({
  active = "home",
  className,
}: {
  active?: "home" | "search" | "messages" | "profile";
  className?: string;
}) {
  const gid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(280);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(el.clientWidth, 160));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const path = circularNotchedPath(width, APP_BOTTOM_NAV_H, FAB, NOTCH_MARGIN);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-30 overflow-visible",
        className
      )}
    >
      <div
        className="relative overflow-visible"
        style={{ height: APP_BOTTOM_NAV_H }}
      >
        {/* Full-width CircularNotchedRectangle (Flutter notch) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${APP_BOTTOM_NAV_H}`}
          preserveAspectRatio="none"
          aria-hidden
          style={{
            filter: "drop-shadow(0 -2px 8px rgba(0,0,0,0.12))",
          }}
        >
          <path fill="#ffffff" d={path} />
        </svg>

        {/*
          Docked QR FAB — matches Flutter:
          Container(56, gradient) + FAB(elevation:0, transparent)
          Location: miniCenterDocked (center on bar top edge)
        */}
        <div
          className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ top: 0 }}
        >
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: FAB,
              height: FAB,
              background:
                "linear-gradient(115deg, #f0abfc 0%, #e879f9 18%, #d946ef 38%, #a855f7 58%, #7c3aed 78%, #3b82f6 100%)",
              boxShadow: "0 4px 12px -2px rgba(0,0,0,0.28)",
            }}
          >
            <ScanQrIcon />
          </div>
        </div>

        {/* Tab icons */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-[1fr_56px_1fr] items-center px-1"
          style={{ height: APP_BOTTOM_NAV_H }}
        >
          <div className="flex items-center justify-evenly">
            <span className="flex h-9 w-9 items-center justify-center">
              <HomeIcon active={active === "home"} gid={gid} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center">
              <Search
                className={cn(
                  "h-[21px] w-[21px]",
                  active === "search" ? "text-[#a855f7]" : "text-zinc-400"
                )}
                strokeWidth={1.9}
              />
            </span>
          </div>
          <div aria-hidden />
          <div className="flex items-center justify-evenly">
            <span className="flex h-9 w-9 items-center justify-center">
              <MessageSquare
                className={cn(
                  "h-[20px] w-[20px]",
                  active === "messages" ? "text-[#a855f7]" : "text-zinc-400"
                )}
                strokeWidth={1.9}
              />
            </span>
            <span className="flex h-9 w-9 items-center justify-center">
              <User
                className={cn(
                  "h-[21px] w-[21px]",
                  active === "profile" ? "text-[#a855f7]" : "text-zinc-400"
                )}
                strokeWidth={1.9}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppChrome({
  title = "Home",
  active = "home",
  children,
  className,
}: {
  title?: string;
  active?: "home" | "search" | "messages" | "profile";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-30", className)}>
      <AppTopBar title={title} />
      {children}
      <AppBottomNav active={active} />
    </div>
  );
}
