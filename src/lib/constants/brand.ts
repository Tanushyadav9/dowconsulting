import { requireEnv } from "@/lib/env";
import { SISTER_SITES } from "@/lib/constants/ecosystem";

export const BRAND = {
  name: "DOW Consulting", // Flagged in AUDIT_REPORT.md for client confirmation
  tagline: "Strategic Business Timing & Commercial Vastu",
  subheading:
    "Executive business advisory bridging two decades of senior corporate operating leadership with structured spatial and timing intelligence.",
  founder: {
    name: "Niraj Kumar",
    title: "Principal Strategist & Corporate Advisor",
    sisterBrands: "Founder of Aapka Astro and Viar.in",
    corporateExperience:
      "Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food",
    corporateRoles: [
      { role: "Vice President & Business Head", company: "Organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food" },
    ],
    totalExperience: "20+ Years Senior Corporate Leadership",
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
      return requireEnv("NEXT_PUBLIC_CONTACT_EMAIL", "Official client advisory contact email");
    },
  },
  consultationDelivery: {
    modalities: [
      "Live Strategy Call (via WhatsApp Call or Google Meet)",
      "Comprehensive Written Strategic Report (Secure PDF Delivery)",
    ],
    note: "All consultations include both a direct live call and an executive written report.",
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
