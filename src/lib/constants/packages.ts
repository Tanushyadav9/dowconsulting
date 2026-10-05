/**
 * PLACEHOLDER: replace with client-approved content
 * Package names, exact pricing, and detailed inclusions are structural blueprints
 * pending final confirmation from Niraj Kumar.
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
    liveSession: string; // WhatsApp or Google Meet
    writtenReport: string; // PDF deliverable
    timingAudit: string;
    spatialAudit: string;
    followUp: string;
  };
  features: string[];
  targetAudience: string;
}

export const CONSULTING_PACKAGES: PackageTier[] = [
  {
    id: "foundation-advisory",
    name: "Strategic Foundation & Timing Audit", // PLACEHOLDER: replace with client-approved content
    subtitle: "Ideal for early-stage ventures, pre-launch pivots, or key executive transitions.",
    badge: "Starting Tier",
    priceINR: 15000, // PLACEHOLDER: replace with client-approved content
    priceUSD: 249, // PLACEHOLDER: replace with client-approved content
    deliverables: {
      liveSession: "60-Minute Focused Advisory Call (Google Meet or WhatsApp Call)",
      writtenReport: "10-Page Strategic Timing & Architectural Assessment PDF",
      timingAudit: "Key milestone timing matrix for launch, capital raise, or major contracts",
      spatialAudit: "Preliminary Commercial Vastu layout evaluation of existing or proposed office",
      followUp: "14-day WhatsApp coordination window for report clarifications",
    },
    features: [
      "Principal consultation directly with Niraj Kumar",
      "Executive review of founder/entity timing cycles",
      "Floor plan review for desk, accounts, and leadership zones",
      "Written actionable diagnostic report within 5 business days",
      "Flat one-time fee with zero hidden recurring charges",
    ],
    targetAudience: "Startups, Solo Founders, and Boutique Business Owners",
  },
  {
    id: "commercial-vastu-growth",
    name: "Commercial Vastu & Strategic Growth Advisory", // PLACEHOLDER: replace with client-approved content
    subtitle: "Comprehensive spatial optimization & strategic business trajectory advisory.",
    badge: "Most Selected",
    popular: true,
    priceINR: 35000, // PLACEHOLDER: replace with client-approved content
    priceUSD: 499, // PLACEHOLDER: replace with client-approved content
    deliverables: {
      liveSession: "90-Minute In-Depth Diagnostic & Strategy Session",
      writtenReport: "22-Page Full Commercial Vastu & Strategic Expansion Roadmap PDF",
      timingAudit: "12-Month Strategic Window Calendar for scaling, recruitment & capex",
      spatialAudit: "Exhaustive commercial site grid analysis (entrance, cabins, cash flow zones)",
      followUp: "30-day WhatsApp follow-up advisory window with Niraj Kumar",
    },
    features: [
      "Direct engagement with Niraj Kumar (ex-VP Reliance Retail & Metro)",
      "High-impact remedy recommendations with zero structural demolition",
      "Commercial zoning alignment for sales velocity and executive harmony",
      "Detailed written blueprint with architectural annotations",
      "Priority WhatsApp access for real-time implementation guidance",
    ],
    targetAudience: "Retail Chains, MSME Manufacturers, Multi-team Corporate Offices",
  },
  {
    id: "executive-retainer-expansion",
    name: "Enterprise Multi-Facility & Board-Level Strategy", // PLACEHOLDER: replace with client-approved content
    subtitle: "High-stakes corporate expansion, multi-location rollouts, and institutional M&A.",
    badge: "Custom Proposal",
    priceINR: 75000, // PLACEHOLDER: replace with client-approved content
    priceUSD: 999, // PLACEHOLDER: replace with client-approved content
    deliverables: {
      liveSession: "Two 90-Minute Strategic Board & Operational Sessions",
      writtenReport: "Enterprise Dossier: Spatial Diagnostics & Multi-Year Strategic Trajectory",
      timingAudit: "Multi-year corporate inflection and partnership timing roadmap",
      spatialAudit: "Multi-facility / warehouse / corporate HQ complete spatial alignment",
      followUp: "60-day strategic check-ins and direct executive advisory",
    },
    features: [
      "Bespoke engagement tailored to enterprise scale and multi-site operations",
      "Comprehensive corporate timing & organizational change alignment",
      "Warehousing, retail network, and headquarters synchronized audit",
      "Full executive report with priority Cloudflare R2 delivery",
      "Option for site-visit add-ons upon custom quote discussion",
    ],
    targetAudience: "Large Enterprises, Warehouses, Multi-Store Retail Brands, Industrial Units",
  },
];
