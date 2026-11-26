"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { BlurFade } from "@/components/ui/blur-fade";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { assetUrl } from "@/lib/utils";

const story = [
  "I’m Tommy Diehl, founder of Tapsy. After forty years running a small business, I got tired of watching the little guy play by rules built by someone else. Big platforms take a piece, control visibility, and make it harder for storefront businesses and independent professionals to stand out. So I built Tapsy — a better way to be seen, discovered, and trusted through real video.",
  "Tapsy uses simple, state-of-the-art 30-second short-form videos that are authentic, current, and built for the way people communicate today, without complicated pricing. It’s simple: pure video interaction, no clutter — just tap and see. For gig professionals, clients can find you, watch you, hire you, and pay you without lead fees. For physical businesses, customers can discover what you offer, experience your vibe, and share that experience through video.",
  "I believe the best way to know if a business is good at what they do is to see it for yourself — meet the owners, watch their work, and hear from real customers. Not filtered photos, carefully written claims, or anonymous star ratings, but real video of real people doing real work.",
  "Tapsy is lighthearted on purpose because finding a great business or service provider shouldn’t feel like a chore. While the rest of the internet pulls people into endless entertainment, I wanted to create something different: scrolling with purpose. I’m for the hardworking small guy — the owners who actually care, show up, do the job right, and keep their customers happy.",
];

export function AboutFounder() {
  const reduce = useReducedMotion();

  return (
    <section id="founder" className="relative overflow-x-clip bg-white">
      <div className="site-section">
        <div className="site-rail">
          <Reveal className="mx-auto mb-10 max-w-5xl text-center sm:mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-fuchsia-600/80">
              The founder
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-zinc-950">
              <WordsPullUp
                text="Built for the hardworking small guy"
                className="justify-center max-lg:flex-wrap lg:!flex-nowrap"
              />
            </h2>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
              {/* Elias-style giant outline name */}
              <motion.p
                aria-hidden
                initial={reduce ? false : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -left-4 -top-8 z-0 select-none text-[clamp(4.5rem,14vw,7.5rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(24,24,27,0.12)] sm:-left-8 sm:-top-12"
              >
                TOMMY
              </motion.p>

              <motion.div
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [0, -10, 0],
                        rotate: [0, 2, 0],
                      }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-6 top-8 h-28 w-28 rounded-[2rem] bg-gradient-to-br from-violet-400/40 via-fuchsia-400/30 to-orange-300/40 blur-xl sm:h-36 sm:w-36"
              />
              <motion.div
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [0, 12, 0],
                        rotate: [0, -3, 0],
                      }
                }
                transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-[1.75rem] bg-gradient-to-tr from-sky-300/35 via-fuchsia-300/25 to-violet-400/35 blur-lg sm:h-32 sm:w-32"
              />

              <motion.div
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 48, scale: 0.88, filter: "blur(12px)" }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <Image
                  src={assetUrl("/assets/Tommy-Diehl-tapsy.webp")}
                  alt="Tommy Diehl, founder of Tapsy"
                  width={720}
                  height={900}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority
                />
              </motion.div>
            </div>

            <div className="min-w-0 space-y-5">
              {story.map((paragraph, i) => (
                <BlurFade key={i} delay={0.05 + i * 0.06} y={20}>
                  <p className="text-[15px] leading-relaxed text-zinc-600 sm:text-[16px] sm:leading-[1.7]">
                    {paragraph}
                  </p>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
