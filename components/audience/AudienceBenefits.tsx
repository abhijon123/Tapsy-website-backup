"use client";

import {
  Video,
  BadgeCheck,
  Eye,
  Clapperboard,
  Zap,
  Megaphone,
  Heart,
  Utensils,
  Hotel,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { TypewriterText } from "@/components/ui/hero-4";
import { PhoneVideo } from "@/components/ui/phone-video";

const ICONS: Record<string, LucideIcon> = {
  video: Video,
  badge: BadgeCheck,
  eye: Eye,
  clapperboard: Clapperboard,
  zap: Zap,
  megaphone: Megaphone,
  heart: Heart,
  utensils: Utensils,
  hotel: Hotel,
};

export type AudienceBenefit = {
  icon: keyof typeof ICONS;
  title: string;
  body: string;
};

export function AudienceBenefits({
  eyebrow,
  title,
  titleBridge = "more than",
  titleTypewriter,
  description,
  benefits,
  videoSrc,
  videoPoster,
  videoTitle,
  videoPlace,
}: {
  eyebrow: string;
  title: string;
  /** Text before the typewriter on line 2 */
  titleBridge?: string;
  /** Optional typewriter words on the second headline line */
  titleTypewriter?: string[];
  description: string;
  benefits: AudienceBenefit[];
  videoSrc?: string;
  videoPoster?: string;
  videoTitle?: string;
  videoPlace?: string;
}) {
  const hasVideo = Boolean(videoSrc);

  return (
    <section className="site-section relative overflow-hidden bg-[#f7f7f8]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl"
      />

      <div className="site-rail relative">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
            {eyebrow}
          </p>
          <h2 className="type-section mt-3 text-balance text-foreground">
            {titleTypewriter?.length ? (
              <>
                <span className="block">{title}</span>
                <span className="mt-1 inline-flex max-w-full flex-wrap items-baseline justify-center gap-x-[0.28em] overflow-visible">
                  {titleBridge ? <span>{titleBridge}</span> : null}
                  <TypewriterText
                    texts={titleTypewriter}
                    className="max-w-full whitespace-normal sm:whitespace-nowrap"
                  />
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="type-lead mx-auto mt-4">
            {description}
          </p>
        </Reveal>

        <div
          className={
            hasVideo
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16"
              : undefined
          }
        >
          <Stagger
            className={
              hasVideo
                ? "grid gap-x-10 gap-y-8 sm:grid-cols-2"
                : "mx-auto grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {benefits.map((item) => {
              const Icon = ICONS[item.icon] ?? Video;
              return (
                <StaggerItem key={item.title} className="min-w-0">
                  <div className="flex gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-tapsy text-white shadow-[0_10px_24px_-12px_rgba(217,70,239,0.55)]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-500">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {hasVideo ? (
            <Reveal from="right" delay={0.08} className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.22)_0%,transparent_68%)] blur-2xl"
                />
                <div className="relative animate-[float-y_7s_ease-in-out_infinite]">
                  <PhoneVideo
                    src={videoSrc!}
                    poster={videoPoster}
                    title={videoTitle}
                    place={videoPlace}
                    widthClassName="w-full max-w-[260px] sm:max-w-[280px]"
                  />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
