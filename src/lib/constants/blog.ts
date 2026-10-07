export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "retail-expansion-market-dynamics",
    title: "Why High-Growth Retail Brands Stumble During Regional Expansion: Overcoming Operational Friction",
    excerpt:
      "Drawing from executive stewardship at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food: critical considerations when scaling retail footprints.",
    category: "Business Expansion",
    readTime: "6 min read",
    date: "October 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "gtm-strategy-for-startups",
    title: "Structuring a Resilient GTM Strategy: Moving from Product Validation to Scalable Distribution",
    excerpt:
      "Early-stage ventures frequently stumble by launching before clarifying channel economics. Practical frameworks for startups and MSMEs.",
    category: "GTM Strategy",
    readTime: "8 min read",
    date: "September 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "market-research-for-msmes",
    title: "Pragmatic Market Research for MSMEs: Uncovering High-Yield Niche Opportunities",
    excerpt:
      "How small businesses and MSMEs can gather actionable competitive intelligence without enterprise research budgets.",
    category: "Market Research",
    readTime: "5 min read",
    date: "September 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "new-business-start-foundations",
    title: "Foundational Business Planning: De-risking New Commercial Ventures and Unit Economics",
    excerpt:
      "Crucial operational and business model considerations for founders before committing capital and signing commercial commitments.",
    category: "New Business Starts",
    readTime: "7 min read",
    date: "August 2026",
    author: "Niraj Kumar",
  },
];
