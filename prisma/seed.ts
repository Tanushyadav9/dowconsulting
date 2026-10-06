import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_PACKAGES = [
  {
    slug: "foundation-advisory",
    name: "Strategic Foundation & Timing Audit",
    subtitle: "Draft blueprint for early-stage ventures and executive timing reviews.",
    priceINR: 15000,
    priceUSD: 249,
    inclusions: [
      "60-Minute Focused Advisory Call (Google Meet or WhatsApp Call)",
      "Strategic Timing & Architectural Assessment PDF",
      "Milestone timing matrix for launch or major contracts",
      "Commercial Vastu preliminary layout evaluation",
    ],
    isPopular: false,
    isActive: false, // UNPUBLISHED DRAFT
  },
  {
    slug: "commercial-vastu-growth",
    name: "Commercial Vastu & Strategic Growth Advisory",
    subtitle: "Draft blueprint for spatial optimization & strategic business trajectory.",
    priceINR: 35000,
    priceUSD: 499,
    inclusions: [
      "90-Minute In-Depth Diagnostic & Strategy Session",
      "Full Commercial Vastu & Strategic Expansion Roadmap PDF",
      "12-Month Strategic Window Calendar for scaling",
      "Commercial site grid analysis (entrance, cabins, cash flow zones)",
      "Direct follow-up window with Niraj Kumar",
    ],
    isPopular: true,
    isActive: false, // UNPUBLISHED DRAFT
  },
  {
    slug: "executive-retainer-expansion",
    name: "Enterprise Multi-Facility & Board-Level Strategy",
    subtitle: "Draft blueprint for multi-location rollouts and enterprise advisory.",
    priceINR: 75000,
    priceUSD: 999,
    inclusions: [
      "Two 90-Minute Strategic Board & Operational Sessions",
      "Enterprise Dossier: Spatial Diagnostics & Multi-Year Strategic Trajectory",
      "Multi-year corporate inflection and partnership timing roadmap",
      "Multi-facility / warehouse / corporate HQ spatial alignment",
    ],
    isPopular: false,
    isActive: false, // UNPUBLISHED DRAFT
  },
];

export async function seedPackages() {
  console.log("Seeding placeholder packages as UNPUBLISHED drafts (isActive: false)...");

  for (const pkg of PLACEHOLDER_PACKAGES) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        name: pkg.name,
        subtitle: pkg.subtitle,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        inclusions: pkg.inclusions,
        isPopular: pkg.isPopular,
        isActive: false, // Strict: seed as unpublished drafts
      },
      create: {
        slug: pkg.slug,
        name: pkg.name,
        subtitle: pkg.subtitle,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        inclusions: pkg.inclusions,
        isPopular: pkg.isPopular,
        isActive: false, // Strict: seed as unpublished drafts
      },
    });
  }

  console.log("Seeded all 3 packages as unpublished drafts (isActive: false).");
}

if (require.main === module) {
  seedPackages()
    .catch((e) => {
      console.error("Seed error:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
