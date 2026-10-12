/**
 * Engagement Models & Advisory Proposals Configuration
 * 
 * Strict Mandate:
 * "It is not a transactional platform. There are no accounts, no online payments,
 * no client portal, no database and no admin area. Customers enquire directly by
 * phone or WhatsApp, and the consultant takes it from there."
 * 
 * Package names, exact pricing, call durations, and turnaround times are pending client confirmation.
 * Advisory engagements are formulated individually via custom proposals.
 */

export interface PracticeEngagementTier {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
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

export const CONSULTING_PACKAGES: PracticeEngagementTier[] = [
  {
    id: "gtm-market-research-advisory",
    name: "GTM Strategy & Market Research Advisory [Draft]",
    subtitle: "Strategic advisory framework for early-stage startups and MSMEs evaluating market entry.",
    badge: "Market Entry [Draft]",
    deliverables: {
      consultation: "Strategic Advisory Diagnostic Session [Scope defined upon enquiry]",
      report: "Advisory Roadmap & Strategy Document [Scope defined upon enquiry]",
      scope: "Customer segmentation, initial positioning, and preliminary market landscape review",
      followUp: "Post-consultation executive debrief with the consultant",
    },
    features: [
      "Collaborative consulting team support (research, information collection, and strategic advisory)",
      "Target customer profiling and value proposition differentiation review",
      "Competitor benchmark overview and sector dynamics observations",
      "Actionable diagnostic roadmap tailored to your product or service",
      "No automated online checkout — scoped individually upon initial enquiry",
    ],
    targetAudience: "Startups, Small Companies, and MSMEs",
  },
  {
    id: "business-expansion-advisory",
    name: "Business Expansion & Scaling Advisory [Draft]",
    subtitle: "Strategic advisory framework for growing companies scaling operations, multi-unit retail, or geographic footprint.",
    badge: "Scaling & Growth [Draft]",
    popular: true,
    deliverables: {
      consultation: "Executive Expansion Diagnostic Sessions [Scope defined upon enquiry]",
      report: "Comprehensive Expansion Strategy Blueprint [Scope defined upon enquiry]",
      scope: "Geographic expansion evaluation, operational capacity mapping, and workflow planning",
      followUp: "Strategic follow-up debrief with Lead Strategic Advisor Niraj Kumar",
    },
    features: [
      "Guided by Lead Strategic Advisor Niraj Kumar (Former VP & Business Head at Reliance Retail, Metro Cash & Carry, NIF Food)",
      "Team-based research into target regional markets and competitive presence",
      "Operational workflow, supply chain readiness, and resource allocation assessment",
      "Phased expansion roadmap with milestone review gates",
      "No automated online checkout — scoped individually upon initial enquiry",
    ],
    targetAudience: "Growing Companies, Multi-Unit Businesses, and MSMEs",
  },
  {
    id: "new-business-start-consultation",
    name: "New Business Start & Venture Advisory [Draft]",
    subtitle: "Foundational advisory framework for founders launching new commercial ventures.",
    badge: "Venture Advisory [Draft]",
    deliverables: {
      consultation: "Foundational Venture Diagnostic Sessions [Scope defined upon enquiry]",
      report: "New Venture Operating Blueprint [Scope defined upon enquiry]",
      scope: "Business model structuring, unit economics review, and pre-launch milestone sequencing",
      followUp: "Extended advisory touchpoints directly with the consultant",
    },
    features: [
      "Comprehensive evaluation tailored to new entity formation and early operational setup",
      "Multi-disciplinary team support across research, consulting, and information gathering",
      "Concept feasibility review and operational risk identification",
      "Custom proposal formulated after initial diagnostic call",
      "No automated online checkout — scoped individually upon initial enquiry",
    ],
    targetAudience: "Founders, New Venture Initiators, and Expanding Business Owners",
  },
];
