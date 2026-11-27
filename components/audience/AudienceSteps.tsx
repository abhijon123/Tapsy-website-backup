"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { TypewriterText } from "@/components/ui/hero-4";

type Step = {
  n: string;
  title: string;
  body: string;
};

export function AudienceSteps({
  eyebrow,
  title,
  titlePrefix,
  titleTypewriter,
  steps,
}: {
  eyebrow: string;
  title?: string;
  /** Static prefix before typewriter, e.g. "Scan. Record." */
  titlePrefix?: string;
  titleTypewriter?: string[];
  steps: Step[];
}) {
  return (
    <section className="site-section relative overflow-hidden bg-white">
      <div className="site-rail">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
            {eyebrow}
          </p>
          <h2 className="type-section mt-3 text-foreground">
            {titlePrefix && titleTypewriter?.length ? (
              <>
                {titlePrefix}{" "}
                <TypewriterText texts={titleTypewriter} />
              </>
            ) : (
              title
            )}
          </h2>
        </Reveal>

        <Stagger className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.n} className="min-w-0 text-left">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-tapsy text-[15px] font-bold text-white shadow-[0_10px_24px_-12px_rgba(217,70,239,0.55)]">
                  {step.n}
                </span>
                <h3 className="text-[17px] font-bold tracking-tight text-foreground sm:text-[18px]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
