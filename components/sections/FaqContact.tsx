"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What makes Tapsy different from other review platforms?",
    a: "Unlike traditional review sites, Tapsy focuses on authentic video reviews, making experiences more personal, engaging, and trustworthy.",
  },
  {
    q: "Is Tapsy free to use?",
    a: "Yes! Tapsy is completely free for users to record and share reviews. Businesses can also claim profiles and showcase top reviews.",
  },
  {
    q: "How do I share my video review?",
    a: "You can easily record on Tapsy and share across platforms like WhatsApp, Instagram, and Facebook in just one click.",
  },
  {
    q: "Can businesses use Tapsy to promote themselves?",
    a: "Absolutely. Businesses can highlight their best video reviews, respond to customers, and build stronger trust online.",
  },
  {
    q: "Where can I download the app?",
    a: "Tapsy is available on both the App Store and Google Play Store for free.",
  },
];

export function FaqContact() {
  const [open, setOpen] = useState(-1);
  const [sent, setSent] = useState(false);

  return (
    <section id="faq" className="site-section overflow-x-clip bg-[#f7f7f8]">
      <div className="site-rail grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Contact — slides in from left, meets FAQ */}
        <Reveal from="left" className="min-w-0">
          <h2 className="text-[clamp(1.85rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em] text-zinc-950">
            <WordsPullUp text="We’d love to hear from you" className="max-sm:flex-wrap sm:!flex-nowrap" />
          </h2>
          <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-zinc-500 sm:text-[17px]">
            Whether you’re curious about features, need support, or just want to share feedback. We’re
            here to listen and help.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Enter your name"
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
              />
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
              />
            </div>
            <textarea
              required
              rows={7}
              placeholder="Tell us about your question..."
              className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
            />
            <button
              type="submit"
              className="rounded-2xl bg-gradient-tapsy px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-12px_rgba(217,70,239,0.55)] transition hover:brightness-105"
            >
              {sent ? "Sent" : "Submit"}
            </button>
          </form>
        </Reveal>

        {/* FAQ — slides in from right, meets contact */}
        <Reveal from="right" delay={0.06} className="min-w-0">
          <h2 className="text-[clamp(1.85rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em] text-zinc-950">
            <WordsPullUp text="Frequently asked questions" className="max-sm:flex-wrap sm:!flex-nowrap" />
          </h2>
          <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-zinc-500 sm:text-[17px]">
            Got questions? Here are some quick answers to help you get started with Tapsy.
          </p>

          <div className="mt-8 flex flex-col gap-3.5">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-left shadow-[0_1px_2px_rgba(15,10,40,0.03)] transition hover:border-zinc-300 sm:px-5"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold leading-snug text-zinc-900 sm:text-[16px]">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-tapsy text-white shadow-sm transition-transform duration-200",
                        isOpen && "rotate-45"
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </span>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] leading-relaxed text-zinc-500">{item.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
