import assert from "node:assert";
import { test, describe } from "node:test";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";
import { getPublishedTeamMembers } from "@/lib/constants/team";
import { getPublishedTestimonials } from "@/lib/constants/testimonials";
import { SISTER_SITES } from "@/lib/constants/ecosystem";

describe("DOW Consulting - Professional Portfolio & Enquiry Architecture Tests", () => {
  describe("1. Zero Accounts, Zero Payments, Zero Portal, Zero DB Invariants", () => {
    test("Site operates as non-transactional: zero runtime database required", () => {
      // Functions return clean arrays without DB connections
      const team = getPublishedTeamMembers();
      const testimonials = getPublishedTestimonials();
      assert.ok(Array.isArray(team), "Team should be an array");
      assert.ok(Array.isArray(testimonials), "Testimonials should be an array");
    });

    test("Packages have zero automated checkout pricing or online transaction gates", () => {
      assert.ok(CONSULTING_PACKAGES.length >= 3, "Should have confirmed engagement models");
      for (const pkg of CONSULTING_PACKAGES) {
        // Must NOT have automated checkout prices
        assert.strictEqual(
          (pkg as any).priceINR,
          undefined,
          `Package ${pkg.id} must not have transactional priceINR`
        );
        assert.strictEqual(
          (pkg as any).priceUSD,
          undefined,
          `Package ${pkg.id} must not have transactional priceUSD`
        );
      }
    });
  });

  describe("2. Effortless Direct Enquiry Mechanisms (Phone & WhatsApp)", () => {
    test("Verified direct phone call coordinates are formatted correctly", () => {
      assert.strictEqual(ENQUIRY_CONFIG.phone.display, "+91 93112 15564");
      assert.strictEqual(ENQUIRY_CONFIG.phone.dialNumber, "+919311215564");
      assert.strictEqual(ENQUIRY_CONFIG.phone.telLink, "tel:+919311215564");
      assert.strictEqual(BRAND.contact.phone.display, "+91 93112 15564");
      assert.strictEqual(BRAND.contact.phone.link, "tel:+919311215564");
    });

    test("Verified direct WhatsApp coordinates and link builder function properly", () => {
      assert.strictEqual(ENQUIRY_CONFIG.whatsapp.display, "+91 93112 15564");
      assert.strictEqual(ENQUIRY_CONFIG.whatsapp.internationalNumber, "919311215564");
      assert.ok(
        ENQUIRY_CONFIG.whatsapp.baseChatUrl.includes("919311215564"),
        "Base WhatsApp URL must point to 919311215564"
      );

      const generatedUrl = ENQUIRY_CONFIG.buildWhatsAppUrl("Testing enquiry");
      assert.ok(generatedUrl.startsWith("https://wa.me/919311215564?text="));
      assert.ok(generatedUrl.includes("Testing%20enquiry"));
    });

    test("Service-specific WhatsApp templates exist for all 4 confirmed practice areas", () => {
      const templates = ENQUIRY_CONFIG.serviceWhatsAppTemplates;
      assert.ok(templates["gtm-strategy"].includes("Go-to-Market"));
      assert.ok(templates["market-research"].includes("Market Research"));
      assert.ok(templates["business-expansion-strategy"].includes("Business Expansion"));
      assert.ok(templates["new-business-start-consultation"].includes("New Business Start"));
    });

    test("Advisory desk office hours and direct contact details are configured", () => {
      assert.ok(ENQUIRY_CONFIG.officeHours.window.includes("Monday"));
      assert.ok(BRAND.contact.address.full.includes("Noida"));
      assert.ok(BRAND.contact.address.pincode === "201301");
    });
  });

  describe("3. Lead Strategic Advisor Credentials & Fact Integrity", () => {
    test("Niraj Kumar corporate operating background matches client wording verbatim", () => {
      const expectedCorporate =
        "Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food";
      assert.strictEqual(BRAND.founder.name, "Niraj Kumar");
      assert.strictEqual(BRAND.founder.corporateExperience, expectedCorporate);
    });

    test("Niraj Kumar academic and executive education credentials match confirmed facts", () => {
      assert.ok(
        BRAND.founder.credentials.some((c) => c.includes("Physics")),
        "B.Sc. (Hons.) in Physics must be present"
      );
      assert.ok(
        BRAND.founder.credentials.some((c) => c.includes("International Business & Marketing")),
        "PGDBM must be present"
      );
      assert.ok(
        BRAND.founder.credentials.some((c) => c.includes("XLRI")),
        "XLRI leadership certification must be present"
      );
    });

    test("Target client audience strictly focuses on startups, small companies, and MSMEs", () => {
      assert.strictEqual(BRAND.targetAudience, "Startups, Small Companies, and MSMEs");
    });

    test("Team model defines collaborative specialized roles", () => {
      assert.strictEqual(BRAND.teamModel.roles.length, 3);
      const titles = BRAND.teamModel.roles.map((r) => r.title);
      assert.ok(titles.includes("Market Research"));
      assert.ok(titles.includes("Strategic Consultation"));
      assert.ok(titles.includes("Information Collection"));
    });
  });

  describe("4. Four Confirmed Practice Areas", () => {
    test("The four confirmed service practice areas are properly configured", () => {
      const services = BRAND.services;
      assert.strictEqual(services.length, 4);
      const serviceIds = services.map((s) => s.id);
      assert.ok(serviceIds.includes("gtm-strategy"));
      assert.ok(serviceIds.includes("market-research"));
      assert.ok(serviceIds.includes("business-expansion-strategy"));
      assert.ok(serviceIds.includes("new-business-start-consultation"));
    });
  });

  describe("5. Zero Invented Facts Policy", () => {
    test("Unconfirmed testimonials default to empty array (never fabricated)", () => {
      const testimonials = getPublishedTestimonials();
      assert.strictEqual(
        testimonials.length,
        0,
        "No unverified testimonials should be published"
      );
    });

    test("Unconfirmed public team profiles default to empty array (never fabricated)", () => {
      const team = getPublishedTeamMembers();
      assert.strictEqual(
        team.length,
        0,
        "No unverified team profiles should be published"
      );
    });

    test("Sister platforms correctly reference Aapka Astro and Viar.in", () => {
      assert.strictEqual(SISTER_SITES.aapkaAstro.name, "Aapka Astro");
      assert.strictEqual(SISTER_SITES.viar.name, "Viar.in");
    });
  });
});
