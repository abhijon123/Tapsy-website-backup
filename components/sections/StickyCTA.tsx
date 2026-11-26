"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import confetti from "canvas-confetti";

export function StickyCTA() {
  const pathname = usePathname();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const isInnerPage =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/blogs" ||
    pathname.startsWith("/blogs/") ||
    pathname === "/businesses" ||
    pathname.startsWith("/businesses/") ||
    pathname === "/reviewers" ||
    pathname.startsWith("/reviewers/");

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("section");
      const download = document.getElementById("download-cta");
      const pastHero = window.scrollY > (hero?.clientHeight ?? 640) * 0.55;
      const nearFooter =
        download &&
        download.getBoundingClientRect().top < window.innerHeight * 0.85;
      // On inner pages (no download banner), hide near page bottom
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      setShow(pastHero && !(nearFooter || (isInnerPage && nearBottom)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isInnerPage]);

  const goDownload = () => {
    confetti({
      particleCount: 36,
      spread: 56,
      origin: { y: 0.92 },
      colors: ["#3B82F6", "#9333EA", "#D946EF", "#FF6A3D"],
    });
    if (isInnerPage) {
      router.push("/#hero");
      return;
    }
    document.getElementById("download-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <button
            onClick={goDownload}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-tapsy px-5 py-3 text-[14px] font-bold text-white shadow-[0_18px_50px_-12px_rgba(147,51,234,0.55)] transition hover:brightness-105"
          >
            <Smartphone className="h-4 w-4" />
            Get the app
            {/* <span className="hidden text-[12px] font-medium text-white/80 sm:inline">
              · Free to start
            </span> */}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
