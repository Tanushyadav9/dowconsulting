import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { test, describe } from "node:test";
import { BRAND } from "../src/lib/constants/brand";
import { ENQUIRY_CONFIG } from "../src/lib/constants/enquiryConfig";
import { SERVICES_CATALOG, findServiceBySlug } from "../src/lib/constants/services";
import { EXPERT_PANEL, hasActiveExpertPanel } from "../src/lib/constants/experts";
import {
  ENGAGEMENTS,
  TESTIMONIALS,
  hasActiveEngagements,
  hasActiveTestimonials,
} from "../src/lib/constants/engagements";
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

    test("Consultant background matches client wording verbatim", () => {
      const expectedBackground =
        "over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food; B.Sc. (Hons.) in Physics; PGDBM in International Business & Marketing; Leadership Development & Change Management certification from XLRI.";
      assert.strictEqual(BRAND.consultant.background, expectedBackground);
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

  describe("3. Nine Confirmed Client Services & Detail Pages", () => {
    test("Exactly 9 confirmed services exist in SERVICES_CATALOG", () => {
      assert.strictEqual(SERVICES_CATALOG.length, 9);
    });

    test("Each service has required detail sections (who it is for, what it covers, how engagement runs, deliverables)", () => {
      for (const service of SERVICES_CATALOG) {
        assert.ok(service.slug, `Service ${service.name} must have a slug`);
        assert.ok(service.whoItIsFor.length >= 2, `Service ${service.name} must detail who it is for`);
        assert.ok(service.whatItCovers.length >= 3, `Service ${service.name} must detail what it covers`);
        assert.ok(service.howEngagementRuns.length >= 3, `Service ${service.name} must detail how engagement runs`);
        assert.ok(service.whatClientReceives.length >= 3, `Service ${service.name} must detail what client receives`);
        assert.ok(service.whatsAppMessage.length > 0, `Service ${service.name} must have WhatsApp message`);
      }
    });

    test("findServiceBySlug finds services by canonical slug and aliases", () => {
      const gtm = findServiceBySlug("gtm-strategy");
      assert.ok(gtm);
      assert.strictEqual(gtm.name, "Go-to-Market Strategy & Distribution");

      const marketResearch = findServiceBySlug("market-research");
      assert.ok(marketResearch);
      assert.strictEqual(marketResearch.name, "Market Research & Consumer Insight");
    });
  });

  describe("4. Expert Panel & Engagements Invariants", () => {
    test("Expert Panel content file is empty (seeded with nothing)", () => {
      assert.strictEqual(EXPERT_PANEL.length, 0);
      assert.strictEqual(hasActiveExpertPanel(), false);
    });

    test("Engagements & Testimonials content files are empty (seeded with nothing)", () => {
      assert.strictEqual(ENGAGEMENTS.length, 0);
      assert.strictEqual(TESTIMONIALS.length, 0);
      assert.strictEqual(hasActiveEngagements(), false);
      assert.strictEqual(hasActiveTestimonials(), false);
    });

    test("Navigation bar hides Expert Panel and Engagements while empty", () => {
      const navHrefs = HEADER_NAV_LINKS.map((l) => l.href);
      assert.strictEqual(navHrefs.includes("/expert-panel"), false);
      assert.strictEqual(navHrefs.includes("/engagements"), false);
    });
  });

  describe("5. Disclaimer & Legal Protection", () => {
    test("Disclaimer explicitly states recommendations are advisory and no result/income is guaranteed", () => {
      const disclaimerPath = path.join(process.cwd(), "src", "app", "disclaimer", "page.tsx");
      const disclaimerContent = fs.readFileSync(disclaimerPath, "utf-8").toLowerCase();

      assert.ok(
        disclaimerContent.includes("recommendations are advisory") ||
        disclaimerContent.includes("strictly advisory in nature")
      );
      assert.ok(
        disclaimerContent.includes("outcomes depend on execution and market conditions")
      );
      assert.ok(
        disclaimerContent.includes("no result or income is guaranteed") ||
        disclaimerContent.includes("no specific result, sales volume, profit margin, investment return, or commercial income is guaranteed")
      );
    });

    test("Footer legal links contain Terms of Use, Privacy Policy, and Disclaimer", () => {
      const legalHrefs = FOOTER_LEGAL_LINKS.map((l) => l.href);
      assert.ok(legalHrefs.includes("/terms"));
      assert.ok(legalHrefs.includes("/privacy-policy"));
      assert.ok(legalHrefs.includes("/disclaimer"));
      assert.strictEqual(legalHrefs.includes("/refund-policy"), false);
      assert.strictEqual(legalHrefs.includes("/pricing-policy"), false);
    });

    test("Related sites line is configured in a single config entry with Aapka Astro and Viar.in", () => {
      assert.ok(Array.isArray(BRAND.relatedSites));
      const siteNames = BRAND.relatedSites.map((s) => s.name);
      assert.ok(siteNames.includes("Aapka Astro"));
      assert.ok(siteNames.includes("Viar.in"));
    });
  });

  describe("6. Design Tokens, Palette & Visual Assets", () => {
    test("Tailwind configuration defines red, navy, and blue design tokens", () => {
      const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.ts");
      const tailwindContent = fs.readFileSync(tailwindConfigPath, "utf-8");

      assert.ok(tailwindContent.includes("#E02027"), "Must define Brand Red (#E02027)");
      assert.ok(tailwindContent.includes("#17477F"), "Must define Brand Navy (#17477F)");
      assert.ok(tailwindContent.includes("#065A8C"), "Must define Brand Blue (#065A8C)");
      assert.ok(tailwindContent.includes("Plus Jakarta Sans") || tailwindContent.includes("var(--font-heading)"), "Must define Plus Jakarta Sans / heading font");
    });

    test("Brand visual components and assets exist", () => {
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "src", "components", "ui", "BrandLogo.tsx")),
        "BrandLogo.tsx must exist"
      );
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "public", "favicon.svg")),
        "public/favicon.svg must exist"
      );
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "src", "app", "icon.svg")),
        "src/app/icon.svg must exist"
      );
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "src", "components", "ui", "DottedWorldMap.tsx")),
        "DottedWorldMap.tsx must exist"
      );
    });
  });

  describe("7. Copy, Tone & British/Indian Spelling Invariants", () => {
    test("Zero occurrences of '[Draft]' tags exist across all app pages", () => {
      const appFiles = [
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/about/page.tsx",
        "src/app/services/page.tsx",
        "src/app/approach/page.tsx",
        "src/app/contact/page.tsx",
        "src/app/terms/page.tsx",
        "src/app/privacy-policy/page.tsx",
        "src/app/disclaimer/page.tsx",
      ];

      for (const relFile of appFiles) {
        const fullPath = path.join(process.cwd(), relFile);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, "utf-8");
          assert.strictEqual(
            content.includes("[Draft]"),
            false,
            `File ${relFile} must not contain '[Draft]'`
          );
          assert.strictEqual(
            content.includes("[Draft copy]"),
            false,
            `File ${relFile} must not contain '[Draft copy]'`
          );
        }
      }
    });

    test("Uses British/Indian spelling 'customised' rather than 'customized'", () => {
      const servicesContent = fs.readFileSync(
        path.join(process.cwd(), "src", "lib", "constants", "services.ts"),
        "utf-8"
      );
      assert.strictEqual(
        servicesContent.includes("customized"),
        false,
        "services.ts must use British spelling 'customised' instead of 'customized'"
      );
    });
  });

  describe("8. SEO, Security Headers & Structured Data Invariants", () => {
    test("next.config.mjs defines standard security headers", () => {
      const nextConfigPath = path.join(process.cwd(), "next.config.mjs");
      const nextConfigContent = fs.readFileSync(nextConfigPath, "utf-8");

      assert.ok(nextConfigContent.includes("X-Content-Type-Options"));
      assert.ok(nextConfigContent.includes("X-Frame-Options"));
      assert.ok(nextConfigContent.includes("Referrer-Policy"));
      assert.ok(nextConfigContent.includes("Strict-Transport-Security"));
      assert.ok(nextConfigContent.includes("Permissions-Policy"));
    });

    test("RootLayout JSON-LD structured data contains ProfessionalService/Organization with real coordinates and ZERO ratings", () => {
      const layoutPath = path.join(process.cwd(), "src", "app", "layout.tsx");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");

      assert.ok(layoutContent.includes("ProfessionalService"));
      assert.ok(layoutContent.includes("Organization"));
      assert.ok(layoutContent.includes(BRAND.name));
      assert.ok(
        layoutContent.includes("BRAND.headOffice.address") ||
        layoutContent.includes(BRAND.headOffice.address)
      );
      assert.ok(
        layoutContent.includes("ENQUIRY_CONFIG.phone.display") ||
        layoutContent.includes(ENQUIRY_CONFIG.phone.display)
      );
      assert.ok(
        layoutContent.includes("ENQUIRY_CONFIG.email.primary") ||
        layoutContent.includes(ENQUIRY_CONFIG.email.primary)
      );

      // Invariant: Never put ratings or reviews into structured data
      assert.strictEqual(layoutContent.includes("aggregateRating"), false);
      assert.strictEqual(layoutContent.includes("ratingValue"), false);
      assert.strictEqual(layoutContent.includes("reviewCount"), false);
    });

    test("Quick enquiry link builds valid pre-filled WhatsApp link with all fields", () => {
      const sampleMsg =
        `Hello Niraj Kumar / DOW Consulting,\n\n` +
        `I would like to enquire about business consulting advisory.\n` +
        `- Name: Ramesh Verma\n` +
        `- Phone: +91 98765 43210\n` +
        `- Business Stage: Early-stage start-up\n` +
        `- What I Need: Go-to-Market Strategy & Distribution\n` +
        `- Preferred Mode: Online (Google Meet / Zoom)\n\n` +
        `Please let me know how we can proceed.`;

      const generatedUrl = ENQUIRY_CONFIG.buildWhatsAppUrl(sampleMsg);
      assert.ok(generatedUrl.startsWith("https://wa.me/919310709233?text="));
      assert.ok(generatedUrl.includes(encodeURIComponent("Ramesh Verma")));
      assert.ok(generatedUrl.includes(encodeURIComponent("Go-to-Market Strategy & Distribution")));
    });

    test("Screenshots exist for every page at 390px and 1440px viewports", () => {
      const screenshotsDir = path.join(process.cwd(), "screenshots");
      assert.ok(fs.existsSync(screenshotsDir));

      const requiredScreenshots = [
        "home_mobile_390px.png",
        "home_desktop_1440px.png",
        "about_mobile_390px.png",
        "about_desktop_1440px.png",
        "services_overview_mobile_390px.png",
        "services_overview_desktop_1440px.png",
        "service_detail_gtm_mobile_390px.png",
        "service_detail_gtm_desktop_1440px.png",
        "approach_mobile_390px.png",
        "approach_desktop_1440px.png",
        "contact_mobile_390px.png",
        "contact_desktop_1440px.png",
        "terms_mobile_390px.png",
        "terms_desktop_1440px.png",
        "privacy_policy_mobile_390px.png",
        "privacy_policy_desktop_1440px.png",
        "disclaimer_mobile_390px.png",
        "disclaimer_desktop_1440px.png",
      ];

      for (const shot of requiredScreenshots) {
        const fullPath = path.join(screenshotsDir, shot);
        assert.ok(fs.existsSync(fullPath), `Screenshot ${shot} must exist in screenshots/`);
        const stats = fs.statSync(fullPath);
        assert.ok(stats.size > 10000, `Screenshot ${shot} must have valid non-empty size`);
      }
    });
  });
});
