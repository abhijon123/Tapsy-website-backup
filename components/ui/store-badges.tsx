"use client";

import Image from "next/image";
import { cn, assetUrl } from "@/lib/utils";
import { siteLinks } from "@/lib/content";

/** Official-style App Store badge */
export function AppStoreBadge({
  className,
  onClick,
  href = siteLinks.appStore,
}: {
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Download from the App Store"
      className={cn(
        "inline-flex h-[56px] max-w-full items-center gap-2.5 rounded-2xl bg-black px-4 text-white transition hover:bg-zinc-900 sm:h-[68px] sm:gap-3 sm:px-6",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" aria-hidden fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium tracking-wide text-white/80 sm:text-[12px]">
          Download From
        </span>
        <span className="mt-1 block text-[17px] font-semibold tracking-tight sm:text-[21px]">
          App Store
        </span>
      </span>
    </a>
  );
}

/** Play Store badge using provided Google Play mark */
export function GooglePlayBadge({
  className,
  onClick,
  href = siteLinks.playStore,
}: {
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Download from Play Store"
      className={cn(
        "inline-flex h-[56px] max-w-full items-center gap-2.5 rounded-2xl bg-black px-4 text-white transition hover:bg-zinc-900 sm:h-[68px] sm:gap-3 sm:px-6",
        className
      )}
    >
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md sm:h-10 sm:w-10">
        <Image
          src={assetUrl("/assets/google-play-badge.png")}
          alt=""
          fill
          className="object-cover object-center scale-150"
          sizes="40px"
        />
      </span>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium tracking-wide text-white/80 sm:text-[12px]">
          Download From
        </span>
        <span className="mt-1 block text-[17px] font-semibold tracking-tight sm:text-[21px]">
          Play Store
        </span>
      </span>
    </a>
  );
}
