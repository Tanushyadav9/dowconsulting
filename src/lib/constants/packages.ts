/**
 * PENDING CLIENT CONFIRMATION
 * Package names, exact pricing, call duration, report turnaround, and detailed deliverables
 * are NOT yet confirmed by the client (Niraj Kumar).
 * 
 * All packages in production database are seeded as unpublished drafts (isActive: false).
 * The public site displays the executive proposal flow until the client confirms packages and pricing.
 */

export interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  priceINR: number;
  priceUSD: number;
  popular?: boolean;
  deliverables: {
    consultation: string;
    report: string;
    scope: string;
    followUp: string;
  };
  features: string[];
  targetAudience: string;
}

export const CONSULTING_PACKAGES: PackageTier[] = [
  {
    id: "gtm-market-research-advisory",
    name: "GTM Strategy & Market Research Advisory [Draft]", // Pending client confirmation
    subtitle: "Draft framework for early-stage startups and MSMEs evaluating market entry.",
    badge: "Starting Tier [Draft]",
    priceINR: 15000, // Pending client confirmation (Unpublished)
    priceUSD: 249, // Pending client confirmation (Unpublished)
    deliverables: {
      consultation: "Strategic Advisory Session [Duration pending client confirmation]",
      report: "Advisory Roadmap PDF [Turnaround pending client confirmation]",
      scope: "Customer segmentation, initial positioning, and preliminary market landscape review",
      followUp: "Post-consultation clarification window [Terms pending client confirmation]",
    },
    features: [
      "Consulting team collaboration (research, information collection, and advisory)",
      "Target customer profiling and value positioning review",
      "Competitor benchmark overview and sector observations",
      "Written diagnostic roadmap deliverable",
      "Pricing and package name pending final client confirmation",
    ],
    targetAudience: "Startups, Small Companies, and MSMEs",
  },
  {
    id: "business-expansion-advisory",
    name: "Business Expansion & Scaling Advisory [Draft]", // Pending client confirmation
    subtitle: "Draft framework for expanding companies scaling operations or geographic reach.",
    badge: "Growth Tier [Draft]",
    popular: true,
    priceINR: 35000, // Pending client confirmation (Unpublished)
    priceUSD: 499, // Pending client confirmation (Unpublished)
    deliverables: {
      consultation: "Strategic Expansion Session [Duration pending client confirmation]",
      report: "Comprehensive Expansion Strategy Blueprint [Turnaround pending client confirmation]",
      scope: "Geographic expansion evaluation, operational capacity mapping, and workflow planning",
      followUp: "Strategic follow-up window [Terms pending client confirmation]",
    },
    features: [
      "Led by Niraj Kumar (Former VP & Business Head at Reliance Retail, Metro Cash & Carry, NIF Food)",
      "Team-based research into target regional markets and competitive presence",
      "Operational workflow and resource requirement assessment",
      "Structured expansion roadmap with phased milestone gates",
      "Pricing and package name pending final client confirmation",
    ],
    targetAudience: "Growing Companies, Multi-Unit Businesses, and MSMEs",
  },
  {
    id: "new-business-start-consultation",
    name: "New Business Start & Venture Advisory [Draft]", // Pending client confirmation
    subtitle: "Draft framework for founders launching new commercial entities.",
    badge: "Bespoke Scope [Draft]",
    priceINR: 75000, // Pending client confirmation (Unpublished)
    priceUSD: 999, // Pending client confirmation (Unpublished)
    deliverables: {
      consultation: "Foundational Venture Diagnostic Sessions [Duration pending client confirmation]",
      report: "New Venture Operating Blueprint [Turnaround pending client confirmation]",
      scope: "Business model structuring, unit economics review, and pre-launch milestone sequencing",
      followUp: "Extended advisory touchpoints [Terms pending client confirmation]",
    },
    features: [
      "Comprehensive evaluation tailored to new entity formation and early operational setup",
      "Multi-disciplinary support across research, consulting, and information gathering",
      "Concept feasibility review and operational risk identification",
      "Custom proposal mode available for tailored multi-stakeholder requirements",
      "Pricing and package name pending final client confirmation",
    ],
    targetAudience: "Founders, New Venture Initiators, and Expanding Business Owners",
  },
];
