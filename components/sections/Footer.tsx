"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { siteLinks } from "@/lib/content";

const quickLinksLeft = [
  { label: "About Tapsy", href: "/about" },
  { label: "For Reviewers", href: "/#how-it-works" },
  { label: "For Business", href: "/#features" },
  { label: "Testimonials", href: "/#testimonials" },
];

const quickLinksRight = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Blogs", href: "/#faq" },
  { label: "Contact", href: "/about#faq" },
];

/** Brand gradient for social glyphs — purple → magenta → coral */
function SocialGrad({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#7C3AED" />
      <stop offset="45%" stopColor="#D946EF" />
      <stop offset="100%" stopColor="#FF6A3D" />
    </linearGradient>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-14 sm:py-16 lg:py-20">
      <div className="site-rail">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-14 xl:gap-20">
          {/* Brand + contact */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <BrandLogo size="md" />
            </Link>
            <p className="mt-3.5 text-[14px] text-zinc-500 sm:text-[15px]">
              © Copyright Tapsy 2026
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-500 sm:text-[16px]">
              Empowering businesses with innovative digital solutions. We create meaningful
              experiences that drive success.
            </p>
            <a
              href="mailto:hello@tapsy.app"
              className="mt-6 inline-flex items-center gap-2.5 text-[15px] font-medium text-zinc-600 transition hover:text-zinc-900 sm:text-[16px]"
            >
              <Mail className="h-5 w-5 text-zinc-400" />
              hello@tapsy.app
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[16px] font-bold text-zinc-900 sm:text-[17px]">
              Quick Links
              <span className="mt-2 block h-px w-12 bg-zinc-300" />
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-0">
              <ul className="space-y-3.5">
                {quickLinksLeft.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-zinc-500 transition hover:text-zinc-900 sm:text-[16px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3.5">
                {quickLinksRight.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-zinc-500 transition hover:text-zinc-900 sm:text-[16px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stay Connected */}
          <div className="max-w-xs">
            <h3 className="text-[16px] font-bold text-zinc-900 sm:text-[17px]">
              Stay Connected
              <span className="mt-2 block h-px w-12 bg-zinc-300" />
            </h3>
            <p className="mt-6 text-[15px] leading-relaxed text-zinc-500 sm:text-[16px]">
              Subscribe to our newsletter and stay updated with the latest news and insights
            </p>
            <div className="mt-7 flex items-center gap-3.5">
              <a
                href={siteLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 transition hover:border-fuchsia-300"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <defs>
                    <SocialGrad id="ig-grad" />
                  </defs>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig-grad)" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.15" fill="url(#ig-grad)" />
                </svg>
              </a>
              <a
                href={siteLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 transition hover:border-fuchsia-300"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                  <defs>
                    <SocialGrad id="x-grad" />
                  </defs>
                  <path
                    fill="url(#x-grad)"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
              <a
                href={siteLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 transition hover:border-orange-300"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <defs>
                    <SocialGrad id="yt-grad" />
                  </defs>
                  <path
                    fill="url(#yt-grad)"
                    d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.15C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.37.55A3.03 3.03 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.15C4.5 20.5 12 20.5 12 20.5s7.5 0 9.37-.55a3.03 3.03 0 0 0 2.13-2.15A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
