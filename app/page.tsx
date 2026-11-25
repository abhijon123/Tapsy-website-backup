import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { PublishEverywhere } from "@/components/sections/PublishEverywhere";
import { CreatorRow } from "@/components/sections/CreatorRow";
import { ScrollySteps } from "@/components/sections/ScrollySteps";
import { SpreadScene } from "@/components/sections/SpreadScene";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { OrbitShowcase } from "@/components/sections/OrbitShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FaqContact } from "@/components/sections/FaqContact";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <HeroSection />
      <PublishEverywhere />
      <CreatorRow />
      <ScrollySteps />
      <SpreadScene />
      <BeforeAfter />
      <AppShowcase />
      <BentoFeatures />
      <OrbitShowcase />
      <Testimonials />
      <DownloadCTA />
      <Pricing />
      <FaqContact />
      <TrustBanner />
      <StickyCTA />
      <Footer />
    </main>
  );
}
