import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_PACKAGES = [
  {
    slug: "gtm-market-research-advisory",
    name: "GTM Strategy & Market Research Advisory [Draft]",
    subtitle: "Draft blueprint for early-stage startups and MSMEs evaluating market entry.",
    priceINR: 15000,
    priceUSD: 249,
    inclusions: [
      "Consulting team collaboration (research, info gathering, advisory)",
      "Target customer profiling and value positioning review",
      "Competitor benchmark overview and sector observations",
      "Written diagnostic roadmap deliverable",
    ],
    isPopular: false,
    isActive: false, // UNPUBLISHED DRAFT
  },
  {
    slug: "business-expansion-advisory",
    name: "Business Expansion & Scaling Advisory [Draft]",
    subtitle: "Draft blueprint for growing companies scaling operations or geographic reach.",
    priceINR: 35000,
    priceUSD: 499,
    inclusions: [
      "Led by Niraj Kumar (Former VP & Business Head at Reliance Retail, Metro, NIF Food)",
      "Team-based research into target regional markets and competitors",
      "Operational workflow and resource requirement assessment",
      "Structured expansion roadmap with phased milestone gates",
    ],
    isPopular: true,
    isActive: false, // UNPUBLISHED DRAFT
  },
  {
    slug: "new-business-start-consultation",
    name: "New Business Start & Venture Advisory [Draft]",
    subtitle: "Draft blueprint for founders launching new commercial entities.",
    priceINR: 75000,
    priceUSD: 999,
    inclusions: [
      "Comprehensive evaluation tailored to new entity formation",
      "Multi-disciplinary support across research, consulting, and discovery",
      "Concept feasibility review and operational risk identification",
      "Custom proposal mode available for tailored requirements",
    ],
    isPopular: false,
    isActive: false, // UNPUBLISHED DRAFT
  },
];

const DEFAULT_TEAM_ROLES = [
  {
    name: "Information Coordinator",
    description: "Handles initial client onboarding, document intake, and proprietary briefing collection.",
    isDefault: true,
  },
  {
    name: "Research Analyst",
    description: "Conducts competitive benchmarking, secondary data analysis, and market landscape discovery.",
    isDefault: true,
  },
  {
    name: "Consultant",
    description: "Delivers live strategic sessions, analyzes operational bottlenecks, and drafts advisory deliverables.",
    isDefault: true,
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
        isActive: false,
      },
      create: {
        slug: pkg.slug,
        name: pkg.name,
        subtitle: pkg.subtitle,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        inclusions: pkg.inclusions,
        isPopular: pkg.isPopular,
        isActive: false,
      },
    });
  }

  console.log("Seeding configurable generic default team roles...");
  for (const role of DEFAULT_TEAM_ROLES) {
    await prisma.teamRole.upsert({
      where: { name: role.name },
      update: {
        description: role.description,
        isDefault: role.isDefault,
      },
      create: {
        name: role.name,
        description: role.description,
        isDefault: role.isDefault,
      },
    });
  }

  console.log("Seeded all packages and team roles.");
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
