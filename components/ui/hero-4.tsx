"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface HeroTypewriterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  animatedTexts: string[];
  subtitle: string;
  infoBadgeText: string;
  ctaButtonText: string;
  socialProofText: string;
  avatars: {
    src: string;
    alt: string;
    fallback: string;
  }[];
  onCtaClick?: () => void;
  /** Dark hero overlay — keeps Tapsy brand contrast */
  tone?: "light" | "dark";
}

function useTypewriter(animatedTexts: string[]) {
  const [textIndex, setTextIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const fullText = animatedTexts[textIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
    } else {
      const speed = isDeleting ? 55 : 110;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, animatedTexts]);

  return displayText;
}

/** Standalone typewriter — locked width, same baseline as surrounding copy */
export function TypewriterText({
  texts,
  className,
  gradient = true,
}: {
  texts: string[];
  className?: string;
  gradient?: boolean;
}) {
  const displayText = useTypewriter(texts);
  const longest = React.useMemo(
    () => texts.reduce((a, b) => (b.length > a.length ? b : a), texts[0] ?? ""),
    [texts]
  );

  return (
    <span
      className={cn(
        // Extra right pad so italic glyphs + cursor never clip
        "relative inline-block max-w-full overflow-visible align-baseline italic leading-[inherit] pr-[0.55em] max-sm:whitespace-normal sm:whitespace-nowrap",
        className
      )}
    >
      {/* Invisible sizer — same font metrics, reserves longest width (desktop+) */}
      <span className="invisible max-sm:hidden" aria-hidden>
        {longest}
      </span>
      <span
        className={cn(
          "overflow-visible pr-[0.55em] max-sm:relative sm:absolute sm:left-0 sm:top-0 sm:whitespace-nowrap",
          gradient ? "text-gradient-typewriter" : "text-inherit"
        )}
      >
        {displayText || "\u00A0"}
      </span>
    </span>
  );
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroTypewriterProps>(
  (
    {
      className,
      title,
      animatedTexts,
      subtitle,
      infoBadgeText,
      ctaButtonText,
      socialProofText,
      avatars,
      onCtaClick,
      tone = "light",
      ...props
    },
    ref
  ) => {
    const displayText = useTypewriter(animatedTexts);
    const dark = tone === "dark";

    return (
      <section
        className={cn(
          "container mx-auto flex flex-col items-center justify-center py-20 text-center md:py-32",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="max-w-4xl">
          <h1
            className={cn(
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              dark ? "text-white" : "text-foreground"
            )}
          >
            {title}
            <span
              className={cn(
                "mt-2 inline-block min-h-[1.2em]",
                dark ? "text-gradient-tapsy" : "text-primary"
              )}
            >
              {displayText || "\u00A0"}
            </span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-8",
              dark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div
            className={cn(
              "inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium",
              dark
                ? "bg-white/10 text-white/85"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {infoBadgeText}
          </div>

          <Button size="lg" variant="gradient" onClick={onCtaClick}>
            {ctaButtonText}
          </Button>

          <div className="mt-4 flex items-center justify-center">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className={cn(
                    "h-9 w-9 border-2",
                    dark ? "border-[#0a0a0f]" : "border-background"
                  )}
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p
              className={cn(
                "ml-4 text-sm font-medium",
                dark ? "text-white/60" : "text-muted-foreground"
              )}
            >
              {socialProofText}
            </p>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";
