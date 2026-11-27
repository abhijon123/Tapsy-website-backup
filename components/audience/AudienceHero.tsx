"use client";

import Image from "next/image";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/ui/hero-4";
import { PhoneVideo } from "@/components/ui/phone-video";
import { useParallax } from "@/hooks/useParallax";
import { assetUrl, cn, goToDownloadCta } from "@/lib/utils";

export function AudienceHero({
  eyebrow,
  title,
  titleAccent,
  typewriterTexts,
  /** Static word before typewriter on the last line, e.g. "build" */
  typewriterLead,
  description,
  /** Distinct full-bleed hero image (not the home atmosphere) */
  imageSrc,
  /** object-position for the parallax plate */
  imagePosition = "object-center",
  /** Put the phone mockup on the left on desktop */
  phoneLeft = false,
  videoSrc,
  videoPoster,
  videoTitle,
  videoPlace,
}: {
  eyebrow: string;
  title: string;
  /** Second headline line */
  titleAccent?: string;
  /** Gradient typewriter on the third headline line */
  typewriterTexts?: string[];
  typewriterLead?: string;
  description: string;
  imageSrc: string;
  imagePosition?: string;
  phoneLeft?: boolean;
  videoSrc: string;
  videoPoster?: string;
  videoTitle?: string;
  videoPlace?: string;
}) {
  const offset = useParallax(700);

  const copy = (
    <div className="relative z-10 w-full min-w-0 max-w-2xl text-white">
      <p className="animate-in text-[13px] font-medium tracking-wide text-white/55">
        {eyebrow}
      </p>

      <h1 className="animate-in animate-in-delay-1 mt-3 overflow-visible text-[clamp(1.85rem,6.5vw,3.6rem)] font-bold tracking-[-0.04em] leading-[1.15]">
        <span>{title} </span>
        {titleAccent ? <span>{titleAccent} </span> : null}
        {typewriterTexts?.length ? (
          <span className="mt-0.5 inline-block max-sm:block">
            {typewriterLead ? `${typewriterLead} ` : null}
            <TypewriterText texts={typewriterTexts} />
          </span>
        ) : null}
      </h1>

      <p className="animate-in animate-in-delay-2 mt-5 max-w-xl text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
        {description}
      </p>
      <div className="animate-in animate-in-delay-3 mt-7 flex flex-wrap items-center gap-3">
        <Button size="lg" variant="gradient" onClick={goToDownloadCta}>
          <Smartphone className="h-4 w-4" />
          Get the app
        </Button>
      </div>
    </div>
  );

  const phone = (
    <div
      className={cn(
        "animate-in animate-in-delay-3 relative z-10 mx-auto flex w-full min-w-0 justify-center md:mx-0",
        phoneLeft ? "md:justify-start" : "md:justify-end"
      )}
      style={{ transform: `translate3d(0, ${offset * -0.14}px, 0)` }}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-[min(300px,88vw)] sm:max-w-[360px] lg:max-w-[380px]",
          phoneLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
        )}
      >
        <div className="relative mx-auto animate-[float-y_7s_ease-in-out_infinite]">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl"
          />
          <div
            className={cn(
              "mx-auto flex w-full justify-center",
              phoneLeft ? "md:justify-start" : "md:justify-end"
            )}
          >
            <PhoneVideo
              src={videoSrc}
              poster={videoPoster}
              title={videoTitle}
              place={videoPlace}
              widthClassName="mx-auto w-[min(250px,72vw)] sm:w-[300px] lg:w-[320px] md:mx-0"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.1)` }}
      >
        <Image
          src={assetUrl(imageSrc)}
          alt=""
          fill
          priority
          className={cn("ken-burns object-cover", imagePosition)}
        />
      </div>
      {/* Same seamless header polish as home */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/65 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0f]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(10,10,15,0.22)_0%,rgba(10,10,15,0.08)_50%,transparent_100%)] sm:h-32" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.35)_40%,transparent_100%)] sm:h-28" />
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-[min(380px,65%)] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.5)_0%,transparent_72%)]" />
      </div>

      <div
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col justify-center px-5 pb-12 pt-24 sm:px-8 md:px-10 lg:px-12 xl:px-16"
        style={{ transform: `translate3d(0, ${offset * -0.08}px, 0)` }}
      >
        <div
          className={cn(
            "grid w-full min-w-0 items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20",
            phoneLeft
              ? "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
              : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
          )}
        >
          {phoneLeft ? (
            <>
              <div className="order-2 md:order-1">{phone}</div>
              <div className="order-1 md:order-2">{copy}</div>
            </>
          ) : (
            <>
              {copy}
              {phone}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
