import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { AudienceHero } from "@/components/audience/AudienceHero";
import { AudienceBenefits } from "@/components/audience/AudienceBenefits";
import { AudienceSteps } from "@/components/audience/AudienceSteps";
import { AudienceShowcase } from "@/components/audience/AudienceShowcase";
import { FaqContact } from "@/components/sections/FaqContact";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Footer } from "@/components/sections/Footer";
import { siteVideos } from "@/lib/content";
import { assetUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tapsy for Businesses | Video Testimonial App for Small Businesses",
  description:
    "Tapsy helps businesses collect authentic customer video testimonials that increase credibility, strengthen social proof, and attract new customers.",
  openGraph: {
    title: "Tapsy for Businesses | Video Testimonial App for Small Businesses",
    description:
      "Collect authentic customer video testimonials that build trust and attract new customers.",
    url: "https://tapsy.app/businesses",
  },
};

const benefits = [
  {
    icon: "video" as const,
    title: "Collect customer video testimonials",
    body: "Turn happy customers into your best marketers with short, authentic video reviews.",
  },
  {
    icon: "badge" as const,
    title: "Display authentic reviews",
    body: "Showcase real experiences that feel personal, credible, and ready to share.",
  },
  {
    icon: "eye" as const,
    title: "Increase online trust & visibility",
    body: "Stand out with visual social proof that helps new customers choose you with confidence.",
  },
  {
    icon: "clapperboard" as const,
    title: "Generate user-generated content",
    body: "Build a steady stream of real content without complicated campaigns or shoot days.",
  },
  {
    icon: "sparkles" as const,
    title: "Build stronger brand presence",
    body: "Create emotional connections that text reviews and ads simply can’t match.",
  },
];

export default function BusinessesPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <AudienceHero
        eyebrow="For businesses"
        title="Video review software"
        titleAccent="that helps businesses"
        typewriterLead="build"
        typewriterTexts={["trust.", "credibility.", "visibility.", "loyalty."]}
        description="Tapsy helps businesses collect authentic customer video testimonials that increase credibility, strengthen social proof, and attract new customers. Whether you own a restaurant, hotel, clinic, salon, or any local business, happy customers become your best marketers."
        imageSrc="/assets/cafe-vibe.jpg"
        imagePosition="object-[center_42%]"
        videoSrc={siteVideos.studio}
        videoPoster={assetUrl("/assets/creator-recording-feature.png")}
        videoTitle="Customer testimonials"
        videoPlace="Built for local businesses"
      />
      <AudienceBenefits
        eyebrow="Reason to choose Tapsy"
        title="Real people build more trust than ads ever will"
        description="Whether it’s word of mouth or video reviews, real people convert better. With Tapsy, businesses can collect, display, and grow from genuine customer stories."
        benefits={benefits}
        videoSrc={siteVideos.publish}
        videoPoster={assetUrl("/assets/cafe-vibe.jpg")}
        videoTitle="Authentic reviews"
        videoPlace="Trust that converts"
      />
      <AudienceSteps
        eyebrow="Simple for customers"
        title="No complicated forms. No lengthy registration."
        steps={[
          {
            n: "01",
            title: "Scan your QR code",
            body: "Displayed at your counter, table, or receipt. Customers start in one tap.",
          },
          {
            n: "02",
            title: "Record experience",
            body: "A short, honest video straight from their phone. No editing needed.",
          },
          {
            n: "03",
            title: "Publish instantly",
            body: "Their review goes live and reaches new customers right away.",
          },
        ]}
      />
      <AudienceShowcase
        eyebrow="Built for every local business"
        title="Perfect for restaurants, hotels, salons & more"
        description="Video testimonials create stronger emotional connections than text reviews. Showcase genuine customer videos that build credibility and influence buying decisions."
        points={[
          "Higher engagement and customer trust",
          "Better social proof and more qualified leads",
          "Ideal for restaurants, hotels, cafés, retail, clinics, gyms, salons, tourism & utility businesses",
        ]}
        shots={[
          {
            src: "/assets/cafe-vibe.jpg",
            alt: "Restaurant atmosphere",
            label: "Restaurants",
          },
          {
            src: "/assets/nightlife-vibe.jpg",
            alt: "Local nightlife venue",
            label: "Hotels & venues",
          },
          {
            src: "/assets/why-type-creators.jpg",
            alt: "Service business experience",
            label: "Salons & services",
          },
        ]}
      />
      <FaqContact />
      <StickyCTA />
      <Footer />
    </main>
  );
}
