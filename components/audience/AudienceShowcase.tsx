"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { assetUrl } from "@/lib/utils";

type Shot = {
  src: string;
  alt: string;
  label: string;
};

export function AudienceShowcase({
  eyebrow,
  title,
  description,
  points,
  shots,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  shots: Shot[];
}) {
  return (
    <section className="site-section relative overflow-hidden bg-white">
      <div className="site-rail grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <Reveal from="left" className="min-w-0">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
            {eyebrow}
          </p>
          <h2 className="type-section mt-3 text-foreground">{title}</h2>
          <p className="type-lead mt-4">{description}</p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[15px] font-medium text-zinc-600"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-tapsy" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="right" delay={0.06} className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {shots.map((shot, i) => (
              <div
                key={shot.src}
                className={`relative overflow-hidden rounded-[22px] ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={assetUrl(shot.src)}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 sm:p-4">
                  <p className="text-[13px] font-semibold text-white sm:text-[14px]">
                    {shot.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
