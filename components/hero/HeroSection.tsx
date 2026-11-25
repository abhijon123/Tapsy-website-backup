"use client";

import React from "react";
import Image from "next/image";
import { HeroMockup } from "./HeroMockup";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/ui/hero-4";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteContent } from "@/lib/content";
import { Play, Smartphone } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { assetUrl } from "@/lib/utils";

const avatarData = [
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    alt: "Reviewer Ava",
    fallback: "A",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    alt: "Reviewer Max",
    fallback: "M",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    alt: "Reviewer Priya",
    fallback: "P",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    alt: "Reviewer Dan",
    fallback: "D",
  },
];

export function HeroSection() {
  const { hero } = siteContent;
  const offset = useParallax(700);

  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.1)` }}
      >
        <Image
          src={assetUrl("/assets/hero-atmosphere.jpg")}
          alt=""
          fill
          priority
          className="ken-burns object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/65 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0f]" />
        {/* Soften only the header/logo strip of the hero image — no logo chip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.35)_40%,transparent_100%)] sm:h-28" />
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-[min(380px,65%)] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.5)_0%,transparent_72%)]" />
      </div>

      {/* Near full-bleed — fills the screen without big side voids */}
      <div
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col justify-center px-5 pb-12 pt-24 sm:px-8 md:px-10 lg:px-12 xl:px-16"
        style={{ transform: `translate3d(0, ${offset * -0.08}px, 0)` }}
      >
        <div className="grid w-full min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 lg:gap-16 xl:gap-20">
          <div className="relative z-10 w-full min-w-0 max-w-2xl text-white">
            <p className="animate-in text-[13px] font-medium tracking-wide text-white/55">
              {hero.badge}
            </p>

            <h1 className="animate-in animate-in-delay-1 mt-3 overflow-visible text-[clamp(1.85rem,6.5vw,3.6rem)] font-bold tracking-[-0.04em] leading-[1.15]">
              <span className="block">Why type when you</span>
              <span className="block">
                can{" "}
                <TypewriterText texts={["tap?", "record?", "share?", "discover?"]} />
              </span>
            </h1>

            <p className="animate-in animate-in-delay-2 mt-5 max-w-xl text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
              {hero.description}
            </p>

            <div className="animate-in animate-in-delay-3 mt-7 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                variant="gradient"
                onClick={() =>
                  document
                    .getElementById("download-cta")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Smartphone className="h-4 w-4" />
                Get the app
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="h-4 w-4 fill-white" />
                See how it works
              </Button>
            </div>

            <div className="animate-in animate-in-delay-4 mt-6 flex items-center">
              <div className="flex -space-x-3">
                {avatarData.map((avatar) => (
                  <Avatar key={avatar.alt} className="h-8 w-8 border-2 border-[#0a0a0f]">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="ml-3 text-[13px] font-medium text-white/60">
                <span className="font-semibold text-white/85">10K+</span> people joined
              </p>
            </div>
          </div>

          <div
            className="animate-in animate-in-delay-3 relative z-10 mx-auto flex w-full min-w-0 justify-center md:mx-0 md:justify-end"
            style={{ transform: `translate3d(0, ${offset * -0.14}px, 0)` }}
          >
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
