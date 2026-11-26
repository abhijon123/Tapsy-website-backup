"use client";

import { Reveal } from "@/components/ui/reveal";

const BANNER_GRADIENT =
  "bg-[linear-gradient(90deg,#7C3AED_0%,#4F46E5_28%,#2563EB_52%,#F97316_100%)]";

function AboutGradientBanner({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <div
        id={id}
        className={`relative overflow-hidden rounded-[28px] px-6 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[200px] lg:px-14 lg:py-14 ${BANNER_GRADIENT}`}
      >
        <div className="relative z-10 w-full max-w-none">
          <h2 className="text-[clamp(1.65rem,3.4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-[1.15] text-white">
            {title}
          </h2>
          <p className="mt-3 max-w-[72rem] text-[15px] leading-relaxed text-white sm:mt-4 sm:text-[17px] sm:leading-[1.65] lg:text-[18px] xl:max-w-none">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function AboutMission() {
  return (
    <section className="site-section-tight overflow-x-clip bg-white">
      <div className="site-rail flex flex-col gap-6 sm:gap-8">
        <AboutGradientBanner
          id="mission"
          title="Our Mission:"
          body="Our mission is to make local business discoveries more transparent by replacing fake reviews with authentic customer videos. Every review helps another customer make a better decision."
        />
        <AboutGradientBanner
          id="why-video"
          title="Why Video Reviews Matter:"
          body="People trust video reviews because they show real experiences and genuine emotions. Tapsy helps businesses build trust with authentic, engaging customer videos."
        />
      </div>
    </section>
  );
}
