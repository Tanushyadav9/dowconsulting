import { getContactEmail } from "@/lib/env";
import { SISTER_SITES } from "@/lib/constants/ecosystem";

export const BRAND = {
  name: "DOW Consulting", // [Pending client confirmation on exact brand name and what DOW stands for]
  tagline: "Business Consulting for Startups, Small Companies and MSMEs", // [Draft pending client confirmation]
  subheading:
    "A specialized business consulting team providing go-to-market (GTM) strategy, market research, business expansion strategy, and new business start consultation for startups, small companies, and MSMEs.", // [Draft pending client confirmation]
  targetAudience: "Startups, Small Companies, and MSMEs",
  teamModel: {
    heading: "Consulting Team Model",
    description:
      "DOW Consulting operates as a collaborative advisory team, not a single consultant. Different specialists handle distinct operational tasks—for example, one team member conducts research, another consults with clients, and another collects business information.",
    roles: [
      { title: "Market Research", detail: "Conducts data gathering, industry benchmarking, and competitive landscape analysis." },
      { title: "Strategic Consultation", detail: "Structures advisory roadmaps, GTM execution, and expansion strategy." },
      { title: "Information Collection", detail: "Gathers business profiles, operational parameters, and founder requirements." },
    ],
  },
  services: [
    { id: "gtm-strategy", name: "GTM Strategy", title: "Go-to-Market (GTM) Strategy", href: "/services/gtm-strategy" },
    { id: "market-research", name: "Market Research", title: "Market Research", href: "/services/market-research" },
    { id: "business-expansion-strategy", name: "Business Expansion Strategy", title: "Business Expansion Strategy", href: "/services/business-expansion-strategy" },
    { id: "new-business-start-consultation", name: "New Business Start Consultation", title: "New Business Start Consultation", href: "/services/new-business-start-consultation" },
  ],
  founder: {
    name: "Niraj Kumar",
    title: "Lead Strategic Advisor",
    sisterBrands: "Founder of Aapka Astro and Viar.in",
    corporateExperience:
      "Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food",
    corporateRoles: [
      { role: "Vice President and Business Head", company: "Organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food" },
    ],
    credentials: [
      "B.Sc. (Hons.) in Physics",
      "PGDBM in International Business & Marketing",
      "Leadership Development & Change Management Certification, XLRI",
    ],
  },
  contact: {
    address: {
      unit: "Unit No. A-1212 D, Tower A",
      complex: "Spectrum@Metro Phase 1",
      sector: "Sector 75",
      city: "Noida, G.B. Nagar",
      state: "Uttar Pradesh",
      pincode: "201301",
      country: "India",
      full: "Unit No. A-1212 D, Tower A, Spectrum@Metro Phase 1, Sector 75, Noida, G.B. Nagar - U.P. 201301",
    },
    whatsapp: {
      number: "+91 93112 15564",
      link: "https://wa.me/919311215564",
      display: "+91 93112 15564",
    },
    get email(): string {
      return getContactEmail();
    },
  },
  consultationDelivery: {
    note: "Engagement formats, duration, and delivery details are pending final client confirmation.",
  },
  ecosystem: [
    {
      name: SISTER_SITES.aapkaAstro.name,
      url: SISTER_SITES.aapkaAstro.url,
      description: SISTER_SITES.aapkaAstro.description,
    },
    {
      name: SISTER_SITES.viar.name,
      url: SISTER_SITES.viar.url,
      description: SISTER_SITES.viar.description,
    },
  ],
};
