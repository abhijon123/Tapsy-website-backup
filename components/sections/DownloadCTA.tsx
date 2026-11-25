"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/store-badges";
import { TypewriterText } from "@/components/ui/hero-4";
import { assetUrl } from "@/lib/utils";

export function DownloadCTA() {
  return (
    <section id="download-cta" className="site-section-tight bg-white">
      <div className="site-rail">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] text-white">
          <Image
            src={assetUrl("/assets/download-cta-official.png")}
            alt=""
            fill
            priority
            className="ken-burns object-cover object-[72%_center] sm:object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          <div className="relative z-10 flex min-h-[320px] items-center px-5 py-10 sm:min-h-[380px] sm:px-12 sm:py-14 lg:min-h-[420px] lg:px-16 lg:py-16">
            <div className="flex w-full max-w-[38rem] min-w-0 flex-col gap-5">
              <h2 className="text-[clamp(1.5rem,4.2vw,2.35rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-white drop-shadow-[0_1px_12px_rgba(76,29,149,0.35)]">
                Show It.{" "}
                <TypewriterText
                  gradient={false}
                  className="text-white"
                  texts={[
                    "Don’t Just Say It.",
                    "Film the vibe.",
                    "Share the take.",
                    "Prove the moment.",
                  ]}
                />
              </h2>
              <p className="text-[15px] leading-[1.55] text-white/95 sm:text-[18px] sm:leading-[1.55]">
                Your honest reel review will guide your community to the best
                businesses and brands. Your video voice is powerful—on Tapsy, you
                can use it.
              </p>

              <div className="mt-1 flex flex-wrap gap-3.5 sm:gap-4">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <AppStoreBadge />
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <GooglePlayBadge />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
