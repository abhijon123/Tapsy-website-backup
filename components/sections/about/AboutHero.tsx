"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/ui/hero-4";
import { PhoneVideo } from "@/components/ui/phone-video";
import { Smartphone } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { siteVideos } from "@/lib/content";
import { assetUrl } from "@/lib/utils";

export function AboutHero() {
  const router = useRouter();
  const offset = useParallax(700);

  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.1)` }}
      >
        <Image
          src={assetUrl("/assets/nightlife-vibe.jpg")}
          alt=""
          fill
          priority
          className="ken-burns object-cover object-[center_35%]"
        />
      </div>
      {/* Same seamless header polish as home — one mist, not split zones */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0f]" />
        {/* Soft full-width veil so bokeh doesn’t blow out white nav */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(10,10,15,0.28)_0%,rgba(10,10,15,0.1)_50%,transparent_100%)] sm:h-32" />
        {/* Home-style logo soften — continuous strip + soft left glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.35)_40%,transparent_100%)] sm:h-28" />
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-[min(380px,65%)] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.5)_0%,transparent_72%)]" />
      </div>

      <div
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col justify-center px-5 pb-12 pt-24 sm:px-8 md:px-10 lg:px-12 xl:px-16"
        style={{ transform: `translate3d(0, ${offset * -0.08}px, 0)` }}
      >
        <div className="grid w-full min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 lg:gap-16 xl:gap-20">
          <div className="relative z-10 w-full min-w-0 max-w-2xl text-white">
            <p className="animate-in text-[13px] font-medium tracking-wide text-white/55">
              About Tapsy
            </p>

            <h1 className="animate-in animate-in-delay-1 mt-3 overflow-visible text-[clamp(1.85rem,6.5vw,3.6rem)] font-bold tracking-[-0.04em] leading-[1.15]">
              <span className="block">Built on trust,</span>
              <span className="block">
                told in{" "}
                <TypewriterText
                  texts={["video.", "reels.", "stories.", "moments."]}
                />
              </span>
            </h1>

            <p className="animate-in animate-in-delay-2 mt-5 max-w-xl text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
              An authentic video review platform that helps people discover local
              businesses through real customer experiences short, genuine clips
              instead of anonymous text.
            </p>

            <div className="animate-in animate-in-delay-3 mt-7 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                variant="gradient"
                onClick={() => router.push("/#hero")}
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
                    .getElementById("founder")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Meet the founder
              </Button>
            </div>
          </div>

          <div
            className="animate-in animate-in-delay-3 relative z-10 mx-auto flex w-full min-w-0 justify-center md:mx-0 md:justify-end"
            style={{ transform: `translate3d(0, ${offset * -0.14}px, 0)` }}
          >
            <div className="relative mx-auto w-full max-w-[min(300px,88vw)] sm:max-w-[360px] lg:max-w-[380px] md:ml-auto md:mr-0">
              <div className="relative mx-auto animate-[float-y_7s_ease-in-out_infinite]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl"
                />
                <div className="mx-auto flex w-full justify-center md:justify-end">
                  <PhoneVideo
                    src={siteVideos.publish}
                    poster={assetUrl("/assets/cafe-vibe.jpg")}
                    title="Real reviews"
                    place="30-second authentic takes"
                    widthClassName="mx-auto w-[min(250px,72vw)] sm:w-[300px] lg:w-[320px] md:mx-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
