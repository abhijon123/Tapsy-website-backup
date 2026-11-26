import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutWhy } from "@/components/sections/about/AboutWhy";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { FaqContact } from "@/components/sections/FaqContact";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About Tapsy | Video Review Platform for Local Businesses",
  description:
    "Tapsy is an authentic video review platform that helps people discover businesses through real customer experiences. Meet founder Tommy Diehl and learn why we built scrolling with purpose.",
  openGraph: {
    title: "About Tapsy | Video Review Platform for Local Businesses",
    description:
      "Built for the hardworking small guy — authentic 30-second video reviews that help local businesses get discovered and trusted.",
    url: "https://tapsy.app/about",
    images: [
      {
        url: "/assets/Tommy-Diehl-tapsy.webp",
        width: 1200,
        height: 900,
        alt: "Tommy Diehl, founder of Tapsy",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <AboutHero />
      <AboutFounder />
      <AboutWhy />
      <AboutMission />
      <FaqContact />
      <StickyCTA />
      <Footer />
    </main>
  );
}
