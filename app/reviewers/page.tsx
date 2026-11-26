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
  title: "Tapsy Reviewers | Video Review App for Real Experiences",
  description:
    "Share honest video reviews in 20 to 30 seconds and help others discover great local businesses through your real experiences.",
  openGraph: {
    title: "Tapsy Reviewers | Video Review App for Real Experiences",
    description:
      "Record and share authentic video reviews that help others discover restaurants, cafés, hotels, salons, and more.",
    url: "https://tapsy.app/reviewers",
  },
};

const benefits = [
  {
    icon: "video" as const,
    title: "More powerful than text",
    body: "Your video review lets people actually see your experience, not just read about it.",
  },
  {
    icon: "eye" as const,
    title: "Show the real context",
    body: "Traditional reviews often lack context. Video shows food quality, rooms, products, and service.",
  },
  {
    icon: "heart" as const,
    title: "Help others decide better",
    body: "Your honest take helps people discover restaurants, cafés, hotels, salons, gyms, and local services.",
  },
  {
    icon: "utensils" as const,
    title: "Capture food & vibe",
    body: "Show the meal, atmosphere, and moment so viewers know what to expect before they go.",
  },
  {
    icon: "hotel" as const,
    title: "Reveal places as they are",
    body: "From hotel rooms to product condition and customer service, show the truth in seconds.",
  },
  {
    icon: "sparkles" as const,
    title: "Fast and effortless",
    body: "Record and share authentic video reviews in just 20 to 30 seconds from your phone.",
  },
];

export default function ReviewersPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <AudienceHero
        eyebrow="For reviewers"
        title="Share honest video reviews"
        titleAccent="for"
        typewriterTexts={["Cafes.", "Hotels.", "Salons."]}
        description="Your experience matters. Tapsy makes it easy to record and share authentic video reviews in just 20 to 30 seconds, helping others discover restaurants, cafés, hotels, salons, gyms, and local services through your real experiences."
        imageSrc="/assets/hero-reviewers.jpg"
        imagePosition="object-[center_40%]"
        videoSrc={siteVideos.orbit}
        videoPoster={assetUrl("/assets/cafe-vibe.jpg")}
        videoTitle="Your honest take"
        videoPlace="20 to 30 second reviews"
      />
      <AudienceSteps
        eyebrow="How it works"
        title="Scan. Record. Publish."
        steps={[
          {
            n: "01",
            title: "Scan",
            body: "Scan the QR code displayed by a business.",
          },
          {
            n: "02",
            title: "Record",
            body: "Capture a short video review directly from your phone.",
          },
          {
            n: "03",
            title: "Publish",
            body: "Publish your review and help other customers make the right decisions.",
          },
        ]}
      />
      <AudienceBenefits
        eyebrow="Why share video reviews?"
        title="Your video is far more powerful than a"
        titleBridge=""
        titleTypewriter={["text review.", "star rating.", "written claim."]}
        description="People can actually see your experience. Traditional reviews often lack context. Video reviews let viewers see food quality, hotel rooms, product condition, and customer service."
        benefits={benefits}
        videoSrc={siteVideos.hero}
        videoPoster={assetUrl("/assets/why-type-creators.jpg")}
        videoTitle="See the experience"
        videoPlace="More powerful than text"
      />
      <AudienceShowcase
        eyebrow="See for yourself"
        title="Help others discover places worth visiting"
        description="Every short video you share helps someone make a better decision, and helps hardworking local businesses get seen for the quality of their work."
        points={[
          "Show food quality and dining vibe",
          "Reveal hotel rooms and real spaces",
          "Highlight product condition and service",
        ]}
        shots={[
          {
            src: "/assets/cafe-vibe.jpg",
            alt: "Cafe experience",
            label: "Food quality",
          },
          {
            src: "/assets/nightlife-vibe.jpg",
            alt: "Venue atmosphere",
            label: "Hotel rooms & venues",
          },
          {
            src: "/assets/steps-overview.jpg",
            alt: "Service experience",
            label: "Customer service",
          },
        ]}
      />
      <FaqContact />
      <StickyCTA />
      <Footer />
    </main>
  );
}
