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
    slug: "retail-location-spatial-friction",
    title: "Why High-Growth Retail Brands Stumble at Prime Commercial Locations: The Invisible Spatial Friction",
    excerpt:
      "Having led retail expansions at Reliance Retail and Metro Cash & Carry, here is what balance sheets miss when evaluating footfall vs. directional orientation.",
    category: "Commercial Real Estate",
    readTime: "6 min read",
    date: "October 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "timing-the-strategic-inflection",
    title: "Timing the Strategic Inflection: Calculating Optimal Windows for Capital Allocation & Leases",
    excerpt:
      "Signing a long-term commercial lease or issuing shares during an adverse temporal cycle creates persistent operational drag. How to calculate executive timing windows.",
    category: "Strategic Timing",
    readTime: "8 min read",
    date: "September 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "executive-seating-board-governance",
    title: "The South-West Anchor: Executive Seating Orientation, Board Stability, and Retention",
    excerpt:
      "A pragmatic review of leadership cabin layouts. Why founder positioning in destabilizing zones correlates directly with unexpected executive churn and partnership friction.",
    category: "Executive Environment",
    readTime: "5 min read",
    date: "September 2026",
    author: "Niraj Kumar",
  },
  {
    slug: "non-demolition-commercial-vastu",
    title: "Non-Demolition Commercial Vastu: Zero Civil Destruction Remedies for Modern Corporate Workspaces",
    excerpt:
      "Modern corporate tenants cannot demolish landlord walls. Practical remedial strategies using directional elements, lighting vectors, and administrative layout shifts.",
    category: "Commercial Vastu",
    readTime: "7 min read",
    date: "August 2026",
    author: "Niraj Kumar",
  },
];
