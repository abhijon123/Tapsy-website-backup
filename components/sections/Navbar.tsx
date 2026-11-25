"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Menu, X, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Publish", href: "#publish" },
  { label: "Creators", href: "#creators" },
  { label: "Discover", href: "#discover" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
] as const;

/** top = transparent over hero; dark = frosted glass on dark band; light = solid white */
type NavTone = "top" | "dark" | "light";

export function Navbar() {
  const [navTone, setNavTone] = useState<NavTone>("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  /** Ignore scroll-spy while a nav click is scrolling to its target */
  const spyLockedUntil = useRef(0);

  const selectNav = (href: string) => {
    setActiveHref(href);
    spyLockedUntil.current = Date.now() + 900;
  };

  // Transparent → dark glass while over hero/publish → solid white after
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const publish = document.getElementById("publish");
      // Dark band ends at the bottom of Publish (or Hero if Publish missing)
      const darkEndEl = publish ?? hero;
      const darkBottom = darkEndEl?.getBoundingClientRect().bottom ?? 0;
      const y = window.scrollY;

      if (y < 12) {
        setNavTone("top");
      } else if (darkBottom > 64) {
        setNavTone("dark");
      } else {
        setNavTone("light");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Highlight the nav tab for the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const visible = new Map<string, number>();
    const hero = () => document.getElementById("hero");

    /** Still on hero → no highlighter at all */
    const onHero = () => {
      const el = hero();
      if (!el) return window.scrollY < 80;
      const bottom = el.getBoundingClientRect().bottom;
      // Hero still covers most of the reading area
      return bottom > window.innerHeight * 0.5;
    };

    const pickActive = () => {
      if (Date.now() < spyLockedUntil.current) return;

      if (onHero()) {
        setActiveHref("");
        return;
      }

      if (visible.size === 0) {
        setActiveHref("");
        return;
      }

      let bestId = "";
      let bestScore = -Infinity;
      for (const el of sections) {
        if (!visible.has(el.id)) continue;
        const rect = el.getBoundingClientRect();
        // Prefer section whose top is in/near the upper reading band
        const mid = rect.top + Math.min(rect.height * 0.15, 120);
        const score = -Math.abs(mid - window.innerHeight * 0.32);
        if (score > bestScore) {
          bestScore = score;
          bestId = el.id;
        }
      }
      setActiveHref(bestId ? `#${bestId}` : "");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }
        pickActive();
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.08, 0.2, 0.4, 0.6],
      }
    );

    sections.forEach((el) => observer.observe(el));

    // Hash only if that section is actually on screen (not while parked on hero)
    const hash = window.location.hash;
    if (hash && navLinks.some((l) => l.href === hash) && !onHero()) {
      const target = document.getElementById(hash.slice(1));
      const rect = target?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight * 0.7 && rect.bottom > 80) {
        setActiveHref(hash);
      } else {
        setActiveHref("");
      }
    } else {
      setActiveHref("");
    }

    window.addEventListener("scroll", pickActive, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const onDark = navTone !== "light";
  const compact = navTone !== "top";

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        navTone === "top" && "bg-transparent",
        navTone === "dark" &&
          "border-b border-white/10 bg-black/30 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl",
        navTone === "light" &&
          "bg-white/95 shadow-[0_12px_40px_-24px_rgba(15,10,40,0.22)] backdrop-blur-xl"
      )}
    >
      <nav
        className={cn(
          "site-rail flex w-full items-center justify-between transition-all duration-300",
          compact ? "py-2.5" : "py-3.5"
        )}
      >
        <Link href="/" className="relative z-10 flex items-center">
          <BrandLogo
            size={compact ? "md" : "lg"}
            className={cn(
              "w-auto transition-all duration-300",
              compact ? "h-9 sm:h-10" : "h-11 sm:h-12"
            )}
          />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex lg:gap-7">
          {navLinks.map((link) => {
            const active = activeHref === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "true" : undefined}
                onClick={() => selectNav(link.href)}
                className={cn(
                  "relative whitespace-nowrap pb-1.5 text-[14px] font-medium transition-colors duration-200 lg:text-[15px]",
                  active
                    ? onDark
                      ? "font-semibold text-white"
                      : "font-semibold text-zinc-950"
                    : onDark
                      ? "text-white/70 hover:text-white"
                      : "text-zinc-500 hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-tapsy transition-opacity duration-150",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button
            size="sm"
            variant="gradient"
            onClick={() =>
              document
                .getElementById("download-cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Smartphone className="h-3.5 w-3.5" />
            Get app
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={cn(
              "rounded-lg p-1.5 transition",
              onDark ? "text-white" : "text-foreground"
            )}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-16 z-50 flex max-h-[min(80vh,560px)] flex-col gap-1 overflow-y-auto rounded-3xl bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(15,10,40,0.35)] backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link) => {
              const active = activeHref === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  onClick={() => {
                    selectNav(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-[15px] font-medium transition",
                    active
                      ? "bg-zinc-100 font-semibold text-zinc-950"
                      : "text-foreground hover:bg-zinc-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button
              size="md"
              variant="gradient"
              className="mt-2 w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("download-cta")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Smartphone className="h-4 w-4" />
              Download Tapsy
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
