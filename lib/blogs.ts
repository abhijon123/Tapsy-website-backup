import { assetUrl } from "@/lib/utils";

/** Content blocks, add new blog posts by composing these types */
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string YYYY-MM-DD */
  date: string;
  category: string;
  cover: string;
  coverAlt: string;
  blocks: BlogBlock[];
};

/**
 * Source of truth for all blog posts.
 * To add a new post later: append one BlogPost object here, listing + detail
 * pages pick it up automatically via getAllBlogs / getBlogBySlug.
 */
export const blogs: BlogPost[] = [
  {
    slug: "video-review-best-practices-what-every-business-should-know",
    title: "Video Review Best Practices: What Every Business Should Know",
    excerpt:
      "In today’s digital-first marketplace, trust has become one of the most valuable assets a business can earn. While traditional star ratings still matter, video reviews go further.",
    date: "2026-07-20",
    category: "Video Review",
    cover: assetUrl("/assets/blogs/blog-video-best-practices.jpg"),
    coverAlt: "Customer recording an authentic video review on a phone",
    blocks: [
      {
        type: "paragraph",
        text: "In today’s digital-first marketplace, trust has become one of the most valuable assets a business can earn. While traditional star ratings and written reviews still influence buying decisions, video reviews have emerged as a far more compelling way for customers to share their experiences.",
      },
      {
        type: "paragraph",
        text: "A short, authentic video allows viewers to see facial expressions, hear tone of voice, and observe real-world product or service outcomes, factors that written reviews simply cannot capture. Not every video review provides meaningful value, though. Businesses should focus on collecting and highlighting reviews that are authentic, informative, and helpful rather than simply positive.",
      },
      {
        type: "heading",
        text: "1. Authenticity Is More Important Than Perfection",
      },
      {
        type: "paragraph",
        text: "The strongest video reviews feel genuine rather than scripted. Customers are far more likely to trust someone speaking naturally than a perfectly rehearsed testimonial with polished marketing language. Encourage customers to speak in their own words instead of providing scripts. A simple smartphone recording with good lighting and clear audio is usually far more persuasive than an overly produced promotional video.",
      },
      {
        type: "heading",
        text: "2. Specific Experiences Build Trust",
      },
      {
        type: "paragraph",
        text: "Vague statements like “Great service!” provide little information. The best video reviews explain why the experience was positive, the problem faced, why they chose the business, how the product or service helped, and what results they achieved. Look for reviews that answer practical buyer questions: quality, ease of use, support, delivery, and long-term satisfaction.",
      },
      {
        type: "heading",
        text: "3. Show, Don’t Just Tell",
      },
      {
        type: "paragraph",
        text: "The greatest advantage of video reviews is visual demonstration. A restaurant guest can showcase a meal, a traveler can film a hotel room, and a customer reviewing a gadget can show it working in real time. Visual evidence increases trust because viewers can verify claims with their own eyes.",
      },
      {
        type: "image",
        src: assetUrl("/assets/cafe-vibe.jpg"),
        alt: "Real venue atmosphere captured in a video review",
      },
      {
        type: "heading",
        text: "4. Clear Audio and Good Lighting Matter",
      },
      {
        type: "paragraph",
        text: "Authenticity matters, but technical quality shouldn’t be ignored. Record in natural daylight, hold the phone steadily, speak clearly, and minimize background noise. Even a one-minute video can have a big impact if viewers can hear and see clearly.",
      },
      {
        type: "heading",
        text: "5. Balanced Reviews Feel More Credible",
      },
      {
        type: "paragraph",
        text: "The most trustworthy reviews aren’t always overwhelmingly positive. Acknowledging a small drawback while explaining why the overall experience was worthwhile often feels more believable. Welcome constructive feedback, it strengthens credibility and drives improvement.",
      },
      {
        type: "heading",
        text: "6. Encourage Diversity and Fresh Content",
      },
      {
        type: "paragraph",
        text: "A strong review library represents a wide range of customers, backgrounds, and use cases. Collect fresh reviews regularly instead of relying on a handful of older testimonials. Variety keeps content engaging and answers questions from multiple perspectives.",
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-inline-recording.jpg"),
        alt: "Customer filming a real video review of a dining experience",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Video reviews are rapidly becoming one of the most trusted forms of social proof because they combine emotion, authenticity, and visual evidence into a single customer story. Focus on quality over quantity, genuine, specific, visually engaging reviews reduce purchase hesitation and strengthen long-term brand credibility.",
      },
    ],
  },
  {
    slug: "the-trust-gap-why-consumers-are-losing-faith-in-text-reviews",
    title: "The Trust Gap: Why Consumers Are Losing Faith in Text Reviews",
    excerpt:
      "Online reviews are crucial to the customer journey, but trust in traditional text reviews is declining. Here’s why video is closing the gap.",
    date: "2026-07-03",
    category: "Blog",
    cover: assetUrl("/assets/blogs/blog-trust-gap.jpg"),
    coverAlt: "Person comparing traditional ratings with authentic video proof",
    blocks: [
      {
        type: "heading",
        text: "Introduction",
      },
      {
        type: "paragraph",
        text: "Online reviews have become a crucial part of the customer journey. Whether purchasing a product, booking a service, or choosing a restaurant, consumers rely on customer reviews to make informed decisions.",
      },
      {
        type: "paragraph",
        text: "However, trust in traditional text reviews is declining. Concerns about fake reviews, generic ratings, and unverifiable feedback have made consumers more skeptical than ever. As a result, people are looking for more authentic reviews and transparent customer experiences, driving the growing popularity of video reviews.",
      },
      {
        type: "heading",
        text: "Lack of Context",
      },
      {
        type: "paragraph",
        text: "Text reviews often fail to provide the full picture. Comments like “Great product” or “Highly recommended” offer little insight into why the customer had a positive experience. Without visual proof, consumers are left guessing about quality, usability, or service outcomes.",
      },
      {
        type: "heading",
        text: "Generic Ratings",
      },
      {
        type: "paragraph",
        text: "Star ratings simplify experiences into a single number, but they rarely tell the complete story. A five-star rating doesn’t explain what specifically impressed the customer, while a lower rating may result from a minor issue rather than a poor overall experience.",
      },
      {
        type: "heading",
        text: "Difficulty Verifying Authenticity",
      },
      {
        type: "paragraph",
        text: "One of the biggest challenges with online reviews is determining whether they are genuine. Consumers are increasingly aware of:",
      },
      {
        type: "list",
        items: [
          "Fake reviews",
          "Paid testimonials",
          "AI-generated feedback",
          "Competitor-driven reviews",
        ],
      },
      {
        type: "paragraph",
        text: "This uncertainty has created a significant trust gap between businesses and potential customers.",
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-trust-gap.jpg"),
        alt: "Authentic video proof closing the trust gap",
      },
      {
        type: "heading",
        text: "How Video Reviews Bridge the Trust Gap",
      },
      {
        type: "heading",
        text: "Real Customer Experiences",
      },
      {
        type: "paragraph",
        text: "Video reviews allow consumers to see and hear real customers discussing their experiences. Facial expressions, tone of voice, and unscripted reactions make reviews feel more authentic than traditional text-based feedback.",
      },
      {
        type: "heading",
        text: "Better Context",
      },
      {
        type: "paragraph",
        text: "Unlike written reviews, video reviews provide visual demonstrations and real-world examples. Customers can showcase products, explain their experiences, and highlight specific features, giving buyers a clearer understanding of what to expect.",
      },
      {
        type: "heading",
        text: "Increased Consumer Confidence",
      },
      {
        type: "paragraph",
        text: "When consumers can verify experiences visually, they feel more confident in their decisions. Video reviews help answer questions about quality, performance, and satisfaction, reducing doubt and increasing trust.",
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-inline-trust-gap.jpg"),
        alt: "The trust gap between traditional text reviews and authentic video reviews",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Trust is built through transparency. While text reviews still play a role, growing concerns around fake reviews and unverifiable experiences have created demand for more credible feedback. Platforms like Tapsy empower businesses to collect genuine video reviews that increase transparency, strengthen reputation, and foster lasting customer trust.",
      },
    ],
  },
  {
    slug: "why-thousands-are-switching-to-tapsy-for-real-reviews",
    title: "Why Thousands Are Switching to Tapsy for Real Reviews",
    excerpt:
      "Online reviews influence almost every buying decision, but as fake reviews rise, people are switching to authentic video on Tapsy.",
    date: "2026-07-15",
    category: "Latest",
    cover: assetUrl("/assets/blogs/blog-switching-tapsy.jpg"),
    coverAlt: "Friends discovering a local cafe through video reviews",
    blocks: [
      {
        type: "heading",
        text: "Introduction",
      },
      {
        type: "paragraph",
        text: "Online reviews influence almost every buying decision we make, from choosing a restaurant and booking a hotel to discovering local attractions and shopping online. But as fake reviews, AI-generated content, and anonymous ratings become more common, consumers are asking: can these reviews really be trusted?",
      },
      {
        type: "paragraph",
        text: "That’s why thousands of users are making the switch to Tapsy. Instead of relying on text alone, Tapsy puts video reviews, real customer experiences, and authentic recommendations at the heart of every discovery. Because the best way to trust a place is to see for yourself.",
      },
      {
        type: "heading",
        text: "Why Traditional Reviews Are Losing Trust",
      },
      {
        type: "paragraph",
        text: "Many reviews are too short, lack context, or fail to show what a place actually looks like. Consumers worry about fake reviews, paid testimonials, and AI-generated feedback. Today’s buyers want transparency, and they expect proof before making a decision.",
      },
      {
        type: "heading",
        text: "Authentic Video Reviews",
      },
      {
        type: "paragraph",
        text: "Unlike traditional platforms, Tapsy lets users watch video reviews shared by real people. Instead of reading about an experience, you can see the atmosphere, products, food, service, and surroundings before deciding to visit.",
      },
      {
        type: "image",
        src: assetUrl("/assets/nightlife-vibe.jpg"),
        alt: "Local venue discovered through authentic video",
      },
      {
        type: "heading",
        text: "What Makes Tapsy Different?",
      },
      {
        type: "paragraph",
        text: "Tapsy isn’t just another review platform, it’s a smarter way to discover places. With Tapsy, you can:",
      },
      {
        type: "list",
        items: [
          "Watch authentic video reviews from real users",
          "Explore places through real customer experiences",
          "Find trusted community recommendations",
          "Support local businesses with greater visibility",
          "Make confident buying and travel decisions",
        ],
      },
      {
        type: "heading",
        text: "Discover Hidden Gems",
      },
      {
        type: "paragraph",
        text: "The best places aren’t always the most popular. Tapsy helps users discover hidden cafés, local restaurants, scenic spots, and unique attractions through community-driven recommendations and authentic video content.",
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-inline-decide.jpg"),
        alt: "Friends deciding where to go after watching a video review",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Trust is no longer built by star ratings alone. Today’s consumers want real customer experiences, authentic video reviews, and recommendations they can believe. That’s why thousands of people are switching to Tapsy, to discover hidden gems, support local businesses, and make smarter decisions with confidence.",
      },
    ],
  },
  {
    slug: "the-future-of-reviews-is-video",
    title: "The Future of Reviews Is Video: See Why Text Reviews Are Outdated",
    excerpt:
      "Let’s be honest, when was the last time you actually read a long text review before buying something? Today’s consumers want authenticity, not paragraphs.",
    date: "2025-11-11",
    category: "Video Review",
    cover: assetUrl("/assets/blogs/blog-future-video.jpg"),
    coverAlt: "Smartphone showing a glowing customer video review",
    blocks: [
      {
        type: "paragraph",
        text: "Let’s be honest, when was the last time you actually read a long text review before buying something? Maybe once in a while, but most of us have moved on. Today’s consumers want authenticity, not paragraphs. They want to see how a product feels, not just read about it.",
      },
      {
        type: "paragraph",
        text: "We’re living in a visual-first era where trust is built through real people, not perfect words. Video reviews are taking over because they deliver what text never could, emotion, tone, and proof. The question isn’t “Will video reviews replace text?” It’s “How fast will the switch happen?”",
      },
      {
        type: "heading",
        text: "Why Reviews Still Matter More Than Ever",
      },
      {
        type: "paragraph",
        text: "Reviews remain the backbone of modern commerce. They provide social proof, create transparency, influence buying decisions, and shape reputations. In short, reviews are digital word-of-mouth, and for Gen Z and Millennials, they carry more weight than traditional advertising.",
      },
      {
        type: "heading",
        text: "Why Text Reviews Are Falling Behind",
      },
      {
        type: "paragraph",
        text: "Fake reviews are everywhere. Written reviews can be edited, copied, or purchased in bulk. Text can’t capture emotion, reading “I loved it!” doesn’t hit the same as seeing someone smile and explain why. And decision fatigue is real: scrolling through dozens of conflicting reviews is exhausting. Video simplifies the process in seconds.",
      },
      {
        type: "image",
        src: assetUrl("/assets/hero-atmosphere.jpg"),
        alt: "Visual-first world of authentic customer stories",
      },
      {
        type: "heading",
        text: "How Video Reviews Are Changing the Game",
      },
      {
        type: "list",
        items: [
          "Real people, real trust, faces and voices create instant credibility",
          "More senses, stronger impact, people remember far more of what they watch",
          "Social platforms amplify everything, short clips are built to share",
          "Faster decisions, higher conversions, seeing is believing",
        ],
      },
      {
        type: "heading",
        text: "How Businesses Can Get Started",
      },
      {
        type: "list",
        items: [
          "Ask for honest, unscripted clips",
          "Keep videos short, 30 to 60 seconds is the sweet spot",
          "Show variety across demographics and use cases",
          "Promote across your website, social, and email",
          "Engage back, thank and reshare customer videos",
          "Use a reliable platform like Tapsy",
        ],
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-inline-trust-flow.jpg"),
        alt: "How video reviews build trust from recording to growth",
      },
      {
        type: "heading",
        text: "Final Thoughts",
      },
      {
        type: "paragraph",
        text: "Consumers don’t want perfect, they want real. Video reviews bring humanity back into online discovery, and platforms like Tapsy make that transformation effortless for both customers and brands. If you’re ready to stand out in an authentic way, start your video review journey with Tapsy today.",
      },
    ],
  },
  {
    slug: "why-user-generated-video-content-drives-purchase-decisions",
    title: "Why User-Generated Video Content Drives Purchase Decisions",
    excerpt:
      "Today’s consumers don’t just want to read about products or places, they want to see for themselves before they buy, book, or visit.",
    date: "2026-07-07",
    category: "Blog",
    cover: assetUrl("/assets/blogs/blog-ugc-purchase.jpg"),
    coverAlt: "Shopper watching a user-generated video before buying",
    blocks: [
      {
        type: "paragraph",
        text: "Today’s consumers don’t just want to read about products or places, they want to see for themselves. Before making a purchase, booking a service, or visiting a new spot, people look for proof from real customers. That’s why user-generated video content has become one of the most influential drivers of purchase decisions.",
      },
      {
        type: "heading",
        text: "People Trust People, Not Ads",
      },
      {
        type: "paragraph",
        text: "Marketing claims are easy to ignore. A short video from a real customer, unscripted, honest, and specific, feels like a recommendation from a friend. That social proof lowers risk and shortens the path from curiosity to conversion.",
      },
      {
        type: "heading",
        text: "Visual Proof Reduces Uncertainty",
      },
      {
        type: "paragraph",
        text: "User-generated videos show atmosphere, quality, and outcomes in context. Buyers can evaluate vibe, presentation, and service before they commit, something star ratings and short text snippets rarely deliver.",
      },
      {
        type: "image",
        src: assetUrl("/assets/cafe-vibe.jpg"),
        alt: "Seeing a place before visiting through customer video",
      },
      {
        type: "heading",
        text: "Short-Form Video Matches How People Decide",
      },
      {
        type: "paragraph",
        text: "Attention is scarce. Thirty-second clips fit the way people already browse on social platforms. When discovery and decision-making happen in the same format, conversion becomes natural instead of forced.",
      },
      {
        type: "heading",
        text: "How Businesses Benefit",
      },
      {
        type: "list",
        items: [
          "Higher trust and credibility with authentic customer voices",
          "Better conversion from visitors who can “see before they believe”",
          "Shareable content that extends organic reach",
          "Clearer feedback loops from real experiences",
        ],
      },
      {
        type: "image",
        src: assetUrl("/assets/blogs/blog-ugc-purchase.jpg"),
        alt: "Shopper gaining confidence from a user-generated video review",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "User-generated video content turns everyday experiences into powerful social proof. Platforms like Tapsy make it simple for customers to record and share authentic reviews, helping businesses build trust, win attention, and drive purchase decisions with real stories.",
      },
    ],
  },
];

export function getAllBlogs(): BlogPost[] {
  return [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

export function getRecentBlogs(limit = 4, excludeSlug?: string): BlogPost[] {
  return getAllBlogs()
    .filter((b) => b.slug !== excludeSlug)
    .slice(0, limit);
}

export function formatBlogDate(iso: string): { day: string; month: string; full: string } {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: String(d.getDate()),
    month: d.toLocaleString("en-US", { month: "short" }),
    full: d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}
