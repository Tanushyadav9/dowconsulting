/**
 * INTAKE QUESTION DEFINITIONS (DRAFT)
 * 
 * NOTE: This is a draft pending the client's own list of questions.
 * Built modularly so questions, options, placeholders, and descriptions
 * are easy to edit, add, or reorganize.
 */

export type ServiceType = 
  | "GTM_STRATEGY"
  | "MARKET_RESEARCH"
  | "BUSINESS_EXPANSION"
  | "NEW_BUSINESS_START";

export interface QuestionField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "email" | "tel";
  placeholder?: string;
  helpText?: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface ServiceDefinition {
  id: ServiceType;
  title: string;
  shortName: string;
  tagline: string;
  description: string;
  questions: QuestionField[];
}

/**
 * Common questions asked to every client regardless of service.
 */
export const COMMON_QUESTIONS = {
  // Step 1: Contact Coordinates
  contact: [
    {
      id: "contactName",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. Ramesh Kumar",
      required: true,
    },
    {
      id: "contactEmail",
      label: "Business Email",
      type: "email",
      placeholder: "ramesh@company.com",
      required: true,
    },
    {
      id: "contactPhone",
      label: "Phone / WhatsApp Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      helpText: "We use WhatsApp for secure advisory coordination and scheduling.",
      required: true,
    },
    {
      id: "businessName",
      label: "Business / Entity Name",
      type: "text",
      placeholder: "e.g. Nexus Retail LLP / Working Project Title",
      required: true,
    },
  ],

  // Step 2: Entity Profile & Stage
  profile: [
    {
      id: "businessStage",
      label: "Current Business Stage",
      type: "select",
      required: true,
      options: [
        { value: "idea", label: "Idea / Pre-Formation Concept" },
        { value: "early", label: "Early-Stage / Pre-Revenue or Pilot Launch" },
        { value: "operating", label: "Operating / Commercial Revenue Generating" },
      ],
    },
    {
      id: "businessType",
      label: "Industry / Sector Classification",
      type: "select",
      required: true,
      options: [
        { value: "Retail & Consumer Goods", label: "Retail & Consumer Goods (B2C / Omnichannel)" },
        { value: "Manufacturing & Engineering", label: "Manufacturing & Industrial Engineering" },
        { value: "D2C & E-Commerce", label: "D2C Brands & E-Commerce" },
        { value: "Technology & Software (B2B SaaS)", label: "Technology & B2B Software / SaaS" },
        { value: "B2B Professional Services", label: "B2B Professional Services & Corporate Solutions" },
        { value: "Food, Beverage & Hospitality", label: "Food, Beverage & Hospitality (F&B / QSR)" },
        { value: "Healthcare & Pharmaceuticals", label: "Healthcare, Wellness & Pharma" },
        { value: "Logistics & Supply Chain", label: "Logistics, Warehousing & Supply Chain" },
        { value: "Other", label: "Other / Diversified MSME" },
      ],
    },
    {
      id: "locationCity",
      label: "City",
      type: "text",
      placeholder: "e.g. Noida, Delhi NCR, Mumbai, Bengaluru",
      required: true,
    },
    {
      id: "locationState",
      label: "State / Province",
      type: "text",
      placeholder: "e.g. Uttar Pradesh, Maharashtra, Karnataka",
      required: true,
    },
    {
      id: "locationCountry",
      label: "Country",
      type: "text",
      placeholder: "India",
      required: true,
    },
    {
      id: "teamSize",
      label: "Current Team Size",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "1 (Solo Founder)" },
        { value: "2-5", label: "2–5 Core Team" },
        { value: "6-20", label: "6–20 Employees" },
        { value: "21-50", label: "21–50 Employees" },
        { value: "50+", label: "50+ Employees" },
      ],
    },
  ],

  // Step 4: Strategic Goals, Urgency & Logistics
  logistics: [
    {
      id: "primaryGoals",
      label: "What are your primary goals for this engagement?",
      type: "textarea",
      placeholder: "Briefly describe what you want the consulting team to help you achieve...",
      required: true,
    },
    {
      id: "keyChallenges",
      label: "Main Challenges & Bottlenecks",
      type: "textarea",
      placeholder: "What are the biggest operational, market, or distribution hurdles you currently face?",
      required: true,
    },
    {
      id: "currentTimeline",
      label: "Timeline & Urgency",
      type: "select",
      required: true,
      options: [
        { value: "Immediate (Next 7-14 days)", label: "Immediate (High Urgency: Next 7–14 days)" },
        { value: "Next 30 days", label: "Active Project (Next 30 days)" },
        { value: "Next quarter (60-90 days)", label: "Next Quarter (60–90 days)" },
        { value: "Exploratory / Planning Stage", label: "Exploratory / Long-Term Planning" },
      ],
    },
    {
      id: "budgetRange",
      label: "Estimated Advisory Budget Range (INR)",
      type: "select",
      required: false,
      options: [
        { value: "Under ₹50,000", label: "Under ₹50,000" },
        { value: "₹50,000 – ₹1,50,000", label: "₹50,000 – ₹1,50,000" },
        { value: "₹1,50,000 – ₹3,50,000", label: "₹1,50,000 – ₹3,50,000" },
        { value: "₹3,50,000+", label: "₹3,50,000+" },
        { value: "Proposal-Dependent", label: "Scope-dependent / Awaiting custom quote" },
      ],
    },
    {
      id: "preferredChannel",
      label: "Preferred Connection Method",
      type: "radio",
      required: true,
      options: [
        { value: "WHATSAPP_CALL", label: "WhatsApp Audio / Video Call" },
        { value: "GOOGLE_MEET", label: "Google Meet Video Call" },
      ],
    },
  ],
} as const;

/**
 * Service-specific branching questions.
 * When a user picks a service, the form presents these custom questions.
 */
export const SERVICE_BRANCHES: Record<ServiceType, ServiceDefinition> = {
  GTM_STRATEGY: {
    id: "GTM_STRATEGY",
    title: "Go-to-Market (GTM) Strategy",
    shortName: "GTM Strategy",
    tagline: "Channel strategy, customer segment validation, and launch architecture.",
    description: "For founders and leaders taking a new product, service, or business unit to commercial market.",
    questions: [
      {
        id: "gtmProductService",
        label: "What product or service are you bringing to market?",
        type: "textarea",
        placeholder: "Describe the core offering, value proposition, and key differentiators...",
        required: true,
        helpText: "Draft question pending client confirmation.",
      },
      {
        id: "gtmTargetCustomer",
        label: "Who is your primary target customer?",
        type: "textarea",
        placeholder: "Specify B2B or B2C, target demographics, company size, or ideal buyer profile...",
        required: true,
      },
      {
        id: "gtmCurrentChannels",
        label: "What are your current or intended sales channels?",
        type: "textarea",
        placeholder: "e.g. Direct sales, distributors, online marketplace, modern trade retail, institutional sales...",
        required: true,
      },
      {
        id: "gtmPricing",
        label: "Current or proposed pricing structure & unit economics",
        type: "textarea",
        placeholder: "Expected price points, margins, average order value, or pricing tiers...",
        required: true,
      },
      {
        id: "gtmCompetitors",
        label: "Who are your known direct or indirect competitors?",
        type: "textarea",
        placeholder: "List primary competitors in your market and how you plan to differentiate...",
        required: false,
      },
    ],
  },

  MARKET_RESEARCH: {
    id: "MARKET_RESEARCH",
    title: "Market Research & Intelligence",
    shortName: "Market Research",
    tagline: "Competitive benchmarking, customer discovery, and industry landscape audits.",
    description: "For companies needing verified field or desk research to derisk strategic investments.",
    questions: [
      {
        id: "mrGeographySegments",
        label: "Target geography and customer segments of interest",
        type: "textarea",
        placeholder: "Which specific territories, cities, tier-2/3 clusters, or demographics should we evaluate?",
        required: true,
      },
      {
        id: "mrSpecificQuestions",
        label: "What specific questions do you need answered by this research?",
        type: "textarea",
        placeholder: "e.g. Competitor pricing models, customer willingness-to-pay, supply chain vendor availability, regulatory constraints...",
        required: true,
      },
      {
        id: "mrExistingData",
        label: "What existing data or internal reports do you already possess?",
        type: "textarea",
        placeholder: "Describe any customer interviews, pilot results, industry surveys, or sales data available...",
        required: false,
      },
    ],
  },

  BUSINESS_EXPANSION: {
    id: "BUSINESS_EXPANSION",
    title: "Business Expansion Strategy",
    shortName: "Business Expansion",
    tagline: "Multi-unit scaling, new territory rollouts, and operational capacity balancing.",
    description: "For operational businesses planning regional, national, or channel scale.",
    questions: [
      {
        id: "beCurrentMarkets",
        label: "Current operating markets and physical/digital presence",
        type: "textarea",
        placeholder: "Where do you operate today (cities, branches, sales volumes, or store footprint)?",
        required: true,
      },
      {
        id: "beTargetMarkets",
        label: "Target new markets, regions, or cities for expansion",
        type: "textarea",
        placeholder: "Which specific geographies or new commercial segments are slated for rollout?",
        required: true,
      },
      {
        id: "beCurrentCapacity",
        label: "Current operational capacity and resource utilization",
        type: "textarea",
        placeholder: "Current fulfillment, manufacturing, supply chain, or team capacity bandwidth...",
        required: true,
      },
      {
        id: "beFundingPosition",
        label: "Current funding position & capital allocated for expansion",
        type: "textarea",
        placeholder: "Self-funded / bootstrapped, debt facility, active equity raise, or allocated capex budget...",
        required: true,
      },
    ],
  },

  NEW_BUSINESS_START: {
    id: "NEW_BUSINESS_START",
    title: "New Business Start Consultation",
    shortName: "New Business Start",
    tagline: "Business model structuring, commercial validation, and launch sequencing.",
    description: "For entrepreneurs and founders evaluating or preparing to launch a new venture.",
    questions: [
      {
        id: "nbsIdeaDescription",
        label: "Comprehensive idea description and business concept",
        type: "textarea",
        placeholder: "Explain the proposed business concept, the problem it solves, and how it will monetize...",
        required: true,
      },
      {
        id: "nbsFounderBackground",
        label: "Founder background and relevant industry experience",
        type: "textarea",
        placeholder: "Summary of founder education, prior corporate or operational roles, and domain expertise...",
        required: true,
      },
      {
        id: "nbsCapitalAvailable",
        label: "Capital available and planned launch runway",
        type: "textarea",
        placeholder: "Approximate initial launch budget, planned runway in months, and working capital plan...",
        required: true,
      },
      {
        id: "nbsLocationOptions",
        label: "Location options under consideration (if physical presence required)",
        type: "textarea",
        placeholder: "Cities or commercial hubs under review, leased vs co-working vs owned options...",
        required: false,
      },
      {
        id: "nbsRegulatoryConcerns",
        label: "Known licences, certifications or regulatory considerations",
        type: "textarea",
        placeholder: "Any FSSAI, GST, MSME, shop establishment, or statutory clearance queries...",
        required: false,
      },
    ],
  },
};

/**
 * Returns service list for selection
 */
export const SERVICES_LIST = Object.values(SERVICE_BRANCHES);
