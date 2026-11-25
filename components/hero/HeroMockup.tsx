"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneVideo } from "@/components/ui/phone-video";
import { assetUrl } from "@/lib/utils";
import { siteVideos } from "@/lib/content";

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[min(300px,88vw)] sm:max-w-[360px] lg:max-w-[380px] md:ml-auto md:mr-0">
      <motion.div
        className="relative mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft CSS float — GPU-friendly, no continuous framer reflow on the video */}
        <div className="relative mx-auto animate-[float-y_7s_ease-in-out_infinite]">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl"
          />

          <div className="mx-auto flex w-full justify-center md:justify-end">
            <PhoneVideo
              src={siteVideos.hero}
              poster={assetUrl("/assets/app-reel-bellavista.png")}
              title="Handmade pappardelle"
              place="Bella Vista"
              widthClassName="mx-auto w-[min(250px,72vw)] sm:w-[300px] lg:w-[320px] md:mx-0"
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
