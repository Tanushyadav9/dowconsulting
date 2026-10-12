import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
}

export const BRAND = {
  name: "DOW Consulting",
  tagline: "GTM Strategy, Distribution & Brand Building",
  subheading:
    "Business consulting for start-ups, small companies and MSMEs led by Niraj Kumar.",
  targetAudience: "start-ups, small companies and MSMEs",

  // Consultant details strictly from business card and confirmed client wording
  consultant: {
    name: "Niraj Kumar",
    title: "Consultant",
    descriptor: "GTM Strategy, Distribution & Brand Building",
    background:
      "over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food; B.Sc. (Hons.) in Physics; PGDBM in International Business & Marketing; Leadership Development & Change Management certification from XLRI.",
    education: [
      "B.Sc. (Hons.) in Physics",
      "PGDBM in International Business & Marketing",
      "Leadership Development & Change Management certification from XLRI",
    ],
    experienceSummary:
      "over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food",
  },

  // Head Office exactly as confirmed
  headOffice: {
    address: "1212-D, Tower A, Spectrum @Metro Phase 1, Sector 75, Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
  },

  // Confirmed 9 Client Services
  services: [
    {
      id: "market-research-consumer-insight",
      name: "Market Research & Consumer Insight",
      shortDescription:
        "Market research and consumer insight, including detailed research for a specific product or service.",
      fullDescription:
        "Comprehensive market research and consumer insight tailored to your commercial space, including detailed research for a specific product or service to validate market opportunities and customer demand.",
    },
    {
      id: "product-launch-strategy",
      name: "Product Launch Strategy",
      shortDescription:
        "How to launch, how to position and make the offering distinctive against existing similar products, and the right place and time to launch.",
      fullDescription:
        "Product launch strategy: how to launch, how to position and make the offering distinctive against existing similar products, and identifying the right place and time to launch.",
    },
    {
      id: "gtm-strategy-distribution",
      name: "Go-to-Market Strategy & Distribution",
      shortDescription: "Go-to-market strategy and distribution.",
      fullDescription:
        "Structured go-to-market strategy and distribution architecture to scale market penetration and build robust sales channels.",
    },
    {
      id: "brand-building",
      name: "Brand Building",
      shortDescription: "Brand building.",
      fullDescription:
        "Strategic brand building to establish trust, distinctiveness, and long-term customer equity in competitive markets.",
    },
    {
      id: "product-design-packaging-guidance",
      name: "Product Design & Packaging Guidance",
      shortDescription:
        "Product design and packaging guidance support for commercial offerings.",
      fullDescription:
        "Product design and packaging guidance support. Tailored advisory and assistance for developing distinctive packaging and product presentation.",
    },
    {
      id: "business-expansion-sales-growth",
      name: "Business Expansion & Sales-Growth Strategy",
      shortDescription:
        "Business expansion and sales-growth strategy for existing businesses.",
      fullDescription:
        "Business expansion and sales-growth strategy for existing businesses seeking regional scale, channel diversification, or market share acceleration.",
    },
    {
      id: "new-business-startup-guidance",
      name: "New-Business & Start-up Guidance",
      shortDescription: "New-business and start-up guidance from scratch.",
      fullDescription:
        "Foundational new-business and start-up guidance from scratch, assisting founders through validation, initial setup, and operational launch readiness.",
    },
    {
      id: "staff-training",
      name: "Staff Training",
      shortDescription: "Staff training.",
      fullDescription:
        "Targeted staff training and capability building to upskill internal teams on sales execution, distribution, and operational standards.",
    },
    {
      id: "customised-solutions",
      name: "Customised Solutions",
      shortDescription: "Customised solutions.",
      fullDescription:
        "Customised solutions tailored to the unique operational, strategic, and commercial needs of your enterprise.",
    },
  ] as ServiceItem[],

  // Consultation Modes
  consultationModes: [
    {
      id: "online",
      title: "Online Consultation",
      medium: "Google Meet or Zoom",
      details: "Conducted remotely via Google Meet or Zoom.",
    },
    {
      id: "in-person",
      title: "In-Person Consultation",
      medium: "On request",
      details:
        "In person on request. Travel and visiting charges are borne by the client and are communicated at the time of enquiry.",
      feeNote:
        "Travel and visiting charges are borne by the client and are communicated at the time of enquiry.",
    },
  ],

  // Single config entry for related sites line in footer so it can be removed instantly
  relatedSites: [
    { name: "Aapka Astro", url: "https://aapkaastro.com" },
    { name: "Viar.in", url: "https://viar.in" },
  ] as { name: string; url: string }[] | null,

  // Contact details mapped directly to ENQUIRY_CONFIG
  contact: {
    get phone(): string {
      return ENQUIRY_CONFIG.phone.display;
    },
    get phoneTel(): string {
      return ENQUIRY_CONFIG.phone.telLink;
    },
    get whatsapp(): string {
      return ENQUIRY_CONFIG.whatsapp.display;
    },
    get whatsappLink(): string {
      return ENQUIRY_CONFIG.whatsapp.baseChatUrl;
    },
    get email(): string {
      return ENQUIRY_CONFIG.email.primary;
    },
    get headOffice(): string {
      return "1212-D, Tower A, Spectrum @Metro Phase 1, Sector 75, Noida, Uttar Pradesh";
    },
  },

  // Pending items from client - config-driven, strictly hidden when empty/null
  pending: {
    gstin: process.env.NEXT_PUBLIC_GSTIN?.trim() || null,
    youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || null,
    linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || null,
    expertPanelProfiles: [] as { name: string; role: string; bio: string }[],
    testimonials: [] as { quote: string; author: string; company: string }[],
    responseTimeCommitment: null as string | null,
    domainEmail: null as string | null,
  },
};
