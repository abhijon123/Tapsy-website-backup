"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/lib/content";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { assetUrl } from "@/lib/utils";

export function ScrollySteps() {
  const { stepsIntro } = siteContent;
  const [activeStep, setActiveStep] = useState(0);
  const [sliderValue, setSliderValue] = useState(78);
  const [isRecording, setIsRecording] = useState(true);
  const [recSeconds, setRecSeconds] = useState(12);

  useEffect(() => {
    if (activeStep !== 0) return;
    setIsRecording(true);
    const id = setInterval(() => {
      setRecSeconds((s) => (s >= 28 ? 8 : s + 1));
    }, 1600);
    return () => clearInterval(id);
  }, [activeStep]);

  useEffect(() => {
    if (activeStep !== 1) return;
    const id = setInterval(() => {
      setSliderValue((v) => {
        const next = v + (Math.random() > 0.5 ? 2 : -2);
        return Math.min(96, Math.max(55, next));
      });
    }, 1200);
    return () => clearInterval(id);
  }, [activeStep]);

  // Auto-advance so the story plays without a long scroll gap
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const sliderLabel =
    sliderValue < 40
      ? { text: "Okay", color: "text-sky-400" }
      : sliderValue < 75
        ? { text: "Great vibe", color: "text-fuchsia-400" }
        : { text: "Outstanding", color: "text-violet-300" };

  return (
    <section id="how-it-works" className="site-section relative overflow-hidden bg-background">
      {/* Soft full-bleed wash — atmosphere instead of empty white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 70% 55%, rgba(217,70,239,0.07), transparent 60%), radial-gradient(ellipse 55% 50% at 18% 40%, rgba(124,58,237,0.06), transparent 55%), radial-gradient(ellipse 80% 40% at 50% 100%, rgba(251,146,60,0.04), transparent 50%)",
        }}
      />

      <div className="site-rail relative">
        <Reveal className="mx-auto mb-6 max-w-2xl text-center sm:mb-7">
          <h2 className="type-section text-foreground">
            <span className="block">From tap to</span>
            <span className="block italic text-gradient-tapsy max-sm:whitespace-normal sm:whitespace-nowrap">
              trusted take.
            </span>
          </h2>
          <p className="type-lead mx-auto mt-3">
            {stepsIntro.subheading}
          </p>
        </Reveal>

        {/* Compact auto-playing stage — wider, denser composition */}
        <div className="relative">
          <div className="flex items-center">
            <div className="mx-auto grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            {/* Left: step copy driven by scroll */}
            <div className="relative order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600">
                    Step {stepsIntro.steps[activeStep].stepNumber}
                  </p>
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight text-foreground">
                    {stepsIntro.steps[activeStep].title}
                  </h3>
                  <p className="mt-2 text-[17px] font-medium text-zinc-700 dark:text-zinc-200">
                    {stepsIntro.steps[activeStep].subtitle}
                  </p>
                  <p className="type-lead mt-4 max-w-md">
                    {stepsIntro.steps[activeStep].details}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {stepsIntro.steps[activeStep].bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10 text-violet-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 max-w-md text-[13px] leading-relaxed text-zinc-500">
                    <span className="font-semibold text-zinc-700">Tip — </span>
                    {stepsIntro.steps[activeStep].tip}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Autoplay progress + step dots */}
              <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-zinc-200">
                <div
                  key={activeStep}
                  className="fill-bar h-full bg-gradient-tapsy"
                  style={{ animationDuration: "6.5s" }}
                />
              </div>
              <div className="mt-3 flex items-center gap-3">
                {stepsIntro.steps.map((step, idx) => (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStep(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeStep === idx
                        ? "w-10 bg-gradient-tapsy"
                        : "w-4 bg-border hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`Go to ${step.title}`}
                  />
                ))}
                <span className="ml-2 text-xs font-semibold text-muted-foreground">
                  0{activeStep + 1} / 03
                </span>
              </div>
            </div>

            {/* Right: phone demo */}
            <div className="order-1 flex w-full min-w-0 justify-center lg:order-2 lg:justify-end">
              <div className="phone-frame aspect-[9/18.5] w-[min(250px,72vw)] sm:w-[270px] lg:w-[290px]">
                <div className="absolute left-1/2 top-5 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
                <div className="phone-screen flex flex-col p-4 text-white">
                  <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                      <motion.div
                        key="rec"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35 }}
                        className="flex h-full flex-col justify-between pt-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold">Jack Burgers</span>
                          <span className="animate-rec-pulse rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold">
                            REC 00:{String(recSeconds).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="relative my-3 h-[58%] overflow-hidden rounded-2xl bg-zinc-900">
                          <Image
                            src={assetUrl("/assets/app-reel-bellavista.png")}
                            alt="Recording viewfinder"
                            fill
                            className="phone-media"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            className="absolute inset-8 rounded-xl border border-dashed border-white/50"
                          />
                          <div className="absolute bottom-3 left-0 right-0 px-4">
                            <div className="h-1 overflow-hidden rounded-full bg-white/20">
                              <motion.div
                                className="h-full bg-gradient-tapsy"
                                animate={{ width: `${(recSeconds / 30) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 pb-1">
                          <button
                            onClick={() => setIsRecording((v) => !v)}
                            className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white"
                          >
                            <motion.div
                              animate={
                                isRecording
                                  ? { borderRadius: "20%", scale: 0.72 }
                                  : { borderRadius: "9999px", scale: 1 }
                              }
                              className="h-12 w-12 bg-gradient-tapsy"
                            />
                          </button>
                          <span className="text-[11px] text-zinc-300">
                            {isRecording ? "Tap to finish take" : "Tap to record (30s)"}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 1 && (
                      <motion.div
                        key="rate"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="flex h-full flex-col justify-between pt-4"
                      >
                        <div>
                          <div className="mb-3 text-center">
                            <h4 className="text-sm font-bold">Bella Vista</h4>
                            <p className="text-[10px] text-zinc-400">
                              123 Main Street, New York
                            </p>
                          </div>
                          <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-zinc-900">
                            <Image
                              src={assetUrl("/assets/app-reel-bellavista.png")}
                              alt="Review preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="rounded-2xl bg-zinc-900/90 p-3.5">
                            <div className="mb-2 flex items-center justify-between text-xs">
                              <span className="text-zinc-400">Experience vibe</span>
                              <span className={`font-bold ${sliderLabel.color}`}>
                                {sliderLabel.text}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={sliderValue}
                              onChange={(e) => setSliderValue(Number(e.target.value))}
                              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-400 accent-white"
                            />
                            <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
                              <span>Okay</span>
                              <span>Outstanding</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full rounded-2xl bg-gradient-tapsy py-3 text-xs font-bold shadow-lg shadow-violet-500/30"
                        >
                          Drop video review
                        </motion.button>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="social"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="flex h-full flex-col justify-between pt-4"
                      >
                        <div className="text-center">
                          <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gradient-tapsy p-1">
                            <div className="relative h-full w-full overflow-hidden rounded-full">
                              <Image
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                                alt="Creator"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <h4 className="text-sm font-bold">Sarah Johnson</h4>
                          <p className="text-[10px] text-zinc-400">
                            12.4K followers · Top foodie
                          </p>
                          <div className="mt-3 flex justify-center gap-4 pb-2 text-[11px]">
                            <span className="pb-0.5 font-bold text-fuchsia-300 underline decoration-fuchsia-400 underline-offset-4">
                              Reviews
                            </span>
                            <span className="text-zinc-400">Saved</span>
                            <span className="text-zinc-400">Badges</span>
                          </div>
                        </div>

                        <div className="my-2 grid grid-cols-2 gap-2">
                          {[
                            {
                              src: assetUrl("/assets/app-reel-bellavista.png"),
                              label: "Bella Vista",
                            },
                            {
                              src: assetUrl("/assets/cafe-vibe.jpg"),
                              label: "Coffee Lab",
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-900"
                            >
                              <Image
                                src={item.src}
                                alt={item.label}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 text-[9px] font-bold">
                                {item.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="rounded-xl bg-violet-950/50 p-2.5 text-center"
                        >
                          <span className="text-[11px] font-semibold text-violet-100">
                            You earned the City Explorer badge
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
