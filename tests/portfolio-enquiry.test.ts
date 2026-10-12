import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { test, describe } from "node:test";
import { BRAND } from "../src/lib/constants/brand";
import { ENQUIRY_CONFIG } from "../src/lib/constants/enquiryConfig";
import { HEADER_NAV_LINKS, FOOTER_LEGAL_LINKS } from "../src/lib/constants/navigation";

describe("DOW Consulting - Professional Portfolio & Enquiry Architecture Tests", () => {
  describe("1. Zero Accounts, Payments, DB, Portal, or API Invariants", () => {
    test("Zero runtime API routes exist in src/app/api", () => {
      const apiDir = path.join(process.cwd(), "src", "app", "api");
      assert.strictEqual(
        fs.existsSync(apiDir),
        false,
        "src/app/api directory must not exist"
      );
    });

    test("Forbidden directories and pages have been deleted", () => {
      const forbiddenPaths = [
        "src/app/admin",
        "src/app/account",
        "src/app/intake",
        "src/app/packages",
        "src/app/refund-policy",
        "src/app/pricing-policy",
        "src/app/team",
        "src/app/testimonials",
        "src/lib/email",
        "prisma",
      ];

      for (const relPath of forbiddenPaths) {
        const fullPath = path.join(process.cwd(), relPath);
        assert.strictEqual(
          fs.existsSync(fullPath),
          false,
          `Forbidden path ${relPath} must not exist`
        );
      }
    });

    test("package.json contains no DB, payment, auth, or email dependencies", () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
      );
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      const forbiddenDeps = [
        "@clerk/nextjs",
        "@prisma/client",
        "prisma",
        "razorpay",
        "stripe",
        "resend",
        "@neondatabase/serverless",
        "sqlite3",
      ];

      for (const dep of forbiddenDeps) {
        assert.strictEqual(
          allDeps[dep],
          undefined,
          `Dependency ${dep} must not be in package.json`
        );
      }
    });
  });

  describe("2. Confirmed Facts & Single Config Coordinates", () => {
    test("Brand name and consultant title match business card exactly", () => {
      assert.strictEqual(BRAND.name, "DOW Consulting");
      assert.strictEqual(BRAND.consultant.name, "Niraj Kumar");
      assert.strictEqual(BRAND.consultant.title, "Consultant");
      assert.strictEqual(
        BRAND.consultant.descriptor,
        "GTM Strategy, Distribution & Brand Building"
      );
    });

    test("Phone and email coordinates match business card single config value", () => {
      assert.strictEqual(ENQUIRY_CONFIG.phone.display, "+91 93107 09233");
      assert.strictEqual(ENQUIRY_CONFIG.phone.dialNumber, "+919310709233");
      assert.strictEqual(ENQUIRY_CONFIG.phone.telLink, "tel:+919310709233");
      assert.strictEqual(ENQUIRY_CONFIG.email.primary, "niraj@dairyonwheels.com");
      assert.strictEqual(
        ENQUIRY_CONFIG.email.mailtoLink,
        "mailto:niraj@dairyonwheels.com?subject=Business%20Consulting%20Enquiry%20-%20DOW%20Consulting"
      );
    });

    test("WhatsApp coordinates build valid direct WhatsApp links", () => {
      assert.strictEqual(ENQUIRY_CONFIG.whatsapp.display, "+91 93107 09233");
      assert.strictEqual(ENQUIRY_CONFIG.whatsapp.internationalNumber, "919310709233");
      assert.strictEqual(ENQUIRY_CONFIG.whatsapp.baseChatUrl, "https://wa.me/919310709233");

      const testMsg = ENQUIRY_CONFIG.buildWhatsAppUrl("Test enquiry message");
      assert.strictEqual(
        testMsg,
        "https://wa.me/919310709233?text=Test%20enquiry%20message"
      );
    });

    test("Head Office matches confirmed location", () => {
      assert.strictEqual(
        BRAND.headOffice.address,
        "1212-D, Tower A, Spectrum @Metro Phase 1, Sector 75, Noida, Uttar Pradesh"
      );
    });

    test("Consultant background and academic credentials match client wording verbatim", () => {
      const expectedBackground =
        "over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food; B.Sc. (Hons.) in Physics; PGDBM in International Business & Marketing; Leadership Development & Change Management certification from XLRI.";
      assert.strictEqual(BRAND.consultant.background, expectedBackground);

      assert.ok(
        BRAND.consultant.education.some((e) => e.includes("B.Sc. (Hons.) in Physics"))
      );
      assert.ok(
        BRAND.consultant.education.some((e) =>
          e.includes("PGDBM in International Business & Marketing")
        )
      );
      assert.ok(
        BRAND.consultant.education.some((e) =>
          e.includes("Leadership Development & Change Management certification from XLRI")
        )
      );
    });

    test("Clients served specifies start-ups, small companies and MSMEs", () => {
      assert.strictEqual(BRAND.targetAudience, "start-ups, small companies and MSMEs");
    });

    test("Consultation modes specify online and in-person with client-borne travel charges", () => {
      assert.strictEqual(BRAND.consultationModes.length, 2);
      const onlineMode = BRAND.consultationModes.find((m) => m.id === "online");
      const inPersonMode = BRAND.consultationModes.find((m) => m.id === "in-person");

      assert.ok(onlineMode);
      assert.ok(onlineMode.medium.includes("Google Meet or Zoom"));

      assert.ok(inPersonMode);
      assert.ok(
        inPersonMode.details.toLowerCase().includes(
          "travel and visiting charges are borne by the client and are communicated at the time of enquiry"
        )
      );
    });
  });

  describe("3. Nine Confirmed Client Services", () => {
    test("All 9 client-described services are configured", () => {
      assert.strictEqual(BRAND.services.length, 9);

      const serviceIds = BRAND.services.map((s) => s.id);
      assert.ok(serviceIds.includes("market-research-consumer-insight"));
      assert.ok(serviceIds.includes("product-launch-strategy"));
      assert.ok(serviceIds.includes("gtm-strategy-distribution"));
      assert.ok(serviceIds.includes("brand-building"));
      assert.ok(serviceIds.includes("product-design-packaging-guidance"));
      assert.ok(serviceIds.includes("business-expansion-sales-growth"));
      assert.ok(serviceIds.includes("new-business-startup-guidance"));
      assert.ok(serviceIds.includes("staff-training"));
      assert.ok(serviceIds.includes("customised-solutions"));
    });

    test("Service WhatsApp templates exist for all 9 practice areas", () => {
      for (const service of BRAND.services) {
        assert.ok(
          (ENQUIRY_CONFIG.serviceWhatsAppTemplates as any)[service.id],
          `WhatsApp template for ${service.id} must be defined`
        );
      }
    });
  });

  describe("4. Navigation & Legal Invariants", () => {
    test("Navigation does not link to packages, intake, or deleted pages", () => {
      for (const link of HEADER_NAV_LINKS) {
        assert.notStrictEqual(link.href, "/packages");
        assert.notStrictEqual(link.href, "/intake");
        assert.notStrictEqual(link.href, "/pricing-policy");
        assert.notStrictEqual(link.href, "/refund-policy");
      }
    });

    test("Legal footer contains only Terms, Privacy Policy, and Disclaimer", () => {
      const legalHrefs = FOOTER_LEGAL_LINKS.map((l) => l.href);
      assert.ok(legalHrefs.includes("/terms"));
      assert.ok(legalHrefs.includes("/privacy-policy"));
      assert.ok(legalHrefs.includes("/disclaimer"));
      assert.strictEqual(legalHrefs.includes("/refund-policy"), false);
      assert.strictEqual(legalHrefs.includes("/pricing-policy"), false);
    });
  });

  describe("5. Zero Astrology / Vastu Leftovers & Pure Static First", () => {
    test("Source directory contains zero references to astrology, Vastu, or sister platforms", () => {
      const srcDir = path.join(process.cwd(), "src");
      const forbiddenTokens = [
        "vastu",
        "muhurta",
        "astrology",
        "aapkaastro",
        "aapka astro",
        "viar.in",
      ];

      function checkDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            checkDir(fullPath);
          } else if (
            entry.isFile() &&
            (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))
          ) {
            const content = fs.readFileSync(fullPath, "utf-8").toLowerCase();
            for (const token of forbiddenTokens) {
              assert.strictEqual(
                content.includes(token),
                false,
                `Found forbidden token "${token}" in ${fullPath}`
              );
            }
          }
        }
      }

      checkDir(srcDir);
    });

    test("Config-driven pending items default to null/empty without placeholders", () => {
      assert.strictEqual(BRAND.pending.expertPanelProfiles.length, 0);
      assert.strictEqual(BRAND.pending.testimonials.length, 0);
      assert.strictEqual(BRAND.pending.responseTimeCommitment, null);
      assert.strictEqual(BRAND.pending.domainEmail, null);
    });
  });
});
