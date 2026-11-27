import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prepends the repository basePath (for GitHub Pages static deployments)
 * while keeping local dev and custom domains working seamlessly.
 */
export function assetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath && cleanPath.startsWith(`${basePath}/`)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

/** Scroll to home download banner, or navigate there with correct GitHub Pages basePath. */
export function goToDownloadCta() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("download-cta");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  window.location.assign(`${basePath}/#download-cta`);
}


