# DOW Consulting — Architecture Audit & Transformation Report

> **Audit Date:** October 2026  
> **Repository:** `dowconsulting`  
> **Firm Leadership:** Niraj Kumar, Consultant  
> **Descriptor:** GTM Strategy, Distribution & Brand Building  
> **Core Architecture:** Pure Static-First Portfolio & Direct Enquiry Website (Non-Transactional)  
> **Ground Rules Status:** Strict adherence to client-confirmed facts. Zero invented facts. All unconfirmed items made configurable and hidden when undefined.

---

## 🎯 1. Architectural Mandate & Site Definition

Per the client's direct mandate:
> *"DOW Consulting is a business-consulting firm led by Niraj Kumar. This website is a professional portfolio and enquiry site. Its job is to make visitors and prospective clients see the firm as trustworthy, credible and highly professional, to show clearly what the firm does and how it works, and to make it effortless to enquire by phone call or WhatsApp.*  
> *It is not a transactional platform. There are no accounts, no online payments, no client portal, no database and no admin area. Customers enquire directly by phone or WhatsApp, and the consultant takes it from there.*  
> *If a product decision is missing, make it configurable and note it in AUDIT_REPORT.md. Do not invent facts."*

---

## 🚫 2. Complete Purge of Unneeded Modules

All unnecessary code, routes, dependencies, environment variables, and documentation were permanently removed from the repository:

| Removed Component | Items Deleted | Rationale |
| :--- | :--- | :--- |
| **Authentication & Accounts** | `@clerk/nextjs`, Clerk routes (`/login`, `/signup`, `/sign-in`, `/sign-up`, `/sso-callback`, webhooks), Clerk middleware, Clerk environment keys | Zero accounts. Clients enquire directly by phone or WhatsApp. |
| **Databases & Migrations** | `@prisma/client`, `prisma`, `@neondatabase/serverless`, `sqlite3`, `prisma/schema.prisma`, migrations, seed scripts, DB clients | Pure static-first compilation. Zero database or ORM footprint. |
| **Payments & Quotes** | `razorpay`, `stripe`, `/checkout`, `/api/checkout`, `/api/payments`, pricing tables, quote generators | Zero online payments. Engagements are tailored and billed offline. |
| **Admin Area & Roles** | `/admin`, `/account`, client portal, case workflows, staff permissions, team roles, back-office API routes | No admin portal. Enquiries route directly to the consultant. |
| **Packages & Intake Wizard** | `/packages`, `packages.ts`, `/intake`, `IntakeForm.tsx`, `intakeQuestions.ts` | The firm does not sell fixed online package tiers or run a multi-step intake wizard. |
| **Testimonials & Email Modules** | `/testimonials`, `TestimonialsSection.tsx`, `testimonials.ts`, `team.ts`, `resend.ts`, `resend` dependency | Unverified testimonials and team profiles removed; email delivery module purged. |
| **Refund & Pricing Policies** | `/refund-policy`, `/pricing-policy` | Removed completely because there are no online transactions or public pricing tables. |
| **Astrology & Vastu Leftovers** | `EcosystemCrossPromotion.tsx`, cross-promotional sections, Vastu/muhurta terms | All astrology, Vastu, and platform positioning purged from the main content. |
| **API Routes & Secrets** | Entire `src/app/api` directory, all required environment secrets | 100% static compilation. Zero API endpoints and zero runtime secrets required. |

---

## 💼 3. Confirmed Facts (Used Exactly — Zero Invention)

Every fact on the live site is derived strictly from confirmed sources without extrapolation:

| Fact Area | Confirmed Detail | Source / Exact Wording |
| :--- | :--- | :--- |
| **Brand Name** | `DOW Consulting` | Business card / Client confirmation |
| **Consultant Name** | `Niraj Kumar` | Business card |
| **Consultant Title** | `"Consultant"` | Exactly as on his business card (no alternate titles used) |
| **Descriptor Line** | `"GTM Strategy, Distribution & Brand Building"` | Exactly as on his business card |
| **Primary Phone** | `+91 93107 09233` | From the business card. Single config value across dial and WhatsApp. |
| **Primary Email** | `niraj@dairyonwheels.com` | From the business card. Single config value. |
| **Head Office** | `1212-D, Tower A, Spectrum @Metro Phase 1, Sector 75, Noida, Uttar Pradesh` | Business card / Confirmed coordinates |
| **Background** | *"over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food; B.Sc. (Hons.) in Physics; PGDBM in International Business & Marketing; Leadership Development & Change Management certification from XLRI."* | Quoted verbatim from client wording. No campus name or per-company titles added. |
| **Clients Served** | `start-ups, small companies and MSMEs` | Client confirmed target audience |
| **Consultation Modes** | 1. **Online**: via Google Meet or Zoom<br>2. **In person**: On request. For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry. | Client confirmed delivery model |

---

## 📋 4. The 9 Confirmed Client Services & Detail Pages

The site architecture features a services overview page (`/services`) plus one comprehensive detail page per service (`/services/[slug]`):

1. **Market research and consumer insight**, including detailed research for a specific product or service (`/services/market-research-and-consumer-insight`)
2. **Product launch strategy**: how to launch, how to position and make the offering distinctive against existing similar products, and the right place and time to launch (`/services/product-launch-strategy`)
3. **Go-to-market strategy and distribution** (`/services/gtm-strategy-and-distribution`)
4. **Brand building** (`/services/brand-building`)
5. **Product design and packaging guidance** (`/services/product-design-and-packaging-guidance`): Kept general until the client clarifies exactly what is offered.
6. **Business expansion and sales-growth strategy for existing businesses** (`/services/business-expansion-and-sales-growth`)
7. **New-business and start-up guidance from scratch** (`/services/new-business-and-start-up-guidance`)
8. **Staff training** (`/services/staff-training`)
9. **Customised solutions** (`/services/customised-solutions`)

*Each detail page specifies: Who it is for, What it covers, How the engagement runs, and What the client receives, written in professional terms with zero outcome or revenue claims.*

---

## ⚙️ 5. Configurable Decisions & Items Pending Client Confirmation

In accordance with the zero-invention directive, all unconfirmed items are strictly config-driven and documented below:

### A. Items Pending Client Confirmation
1. **Our Approach Process Content (`/approach`):**
   - The 7-step process (Enquiry & discovery, scoping, market & competitor research, positioning & differentiation, launch or growth plan covering product, design and packaging, place and timing, recommendations, implementation guidance and training) represents **draft process content to be confirmed by the client**.
2. **Legal Text (Terms of Use, Privacy Policy, Disclaimer):**
   - The legal text across `/terms`, `/privacy-policy`, and `/disclaimer` is marked as **pending lawyer review**.
   - The Disclaimer explicitly states that all recommendations are advisory, outcomes depend on execution and market conditions, and no result or income is guaranteed.
3. **Product Design & Packaging Guidance Scope:**
   - Wording is kept general pending client clarification of exact design/packaging deliverables.

### B. Content-Driven Modules (Hidden When Empty — Never Showing Placeholders)
| Pending Item | Configuration Key | Current State | UI Behavior When Undefined |
| :--- | :--- | :--- | :--- |
| **Expert Panel Profiles** | `src/lib/constants/experts.ts` (`EXPERT_PANEL`) | `[]` (Empty) | Page (`/expert-panel`) returns 404; navigation link is completely hidden until at least one expert besides Niraj Kumar is added. |
| **Engagements & Testimonials** | `src/lib/constants/engagements.ts` (`ENGAGEMENTS`, `TESTIMONIALS`) | `[]` (Empty) | Page (`/engagements`) returns 404; sections and navigation links are completely hidden. Requires a recorded consent note for every entry. |
| **GSTIN** | `BRAND.pending.gstin` (`NEXT_PUBLIC_GSTIN`) | `null` | Entire GSTIN line is omitted from the footer. |
| **YouTube Channel** | `BRAND.pending.youtubeUrl` (`NEXT_PUBLIC_YOUTUBE_URL`) | `null` | Social icon block omits YouTube. |
| **LinkedIn Profile** | `BRAND.pending.linkedinUrl` (`NEXT_PUBLIC_LINKEDIN_URL`) | `null` | Social icon block omits LinkedIn. |
| **Response-Time Commitment** | `BRAND.pending.responseTimeCommitment` | `null` | No claim made about turnaround speed. |
| **Domain Email (`@dowconsulting.in`)** | `BRAND.pending.domainEmail` | `null` | Site uses verified email `niraj@dairyonwheels.com`. |
| **Related Sites Line** | `BRAND.relatedSites` | `[{ name: "Aapka Astro", url: "https://aapkaastro.com" }, { name: "Viar.in", url: "https://viar.in" }]` | Maintained in **one config entry** in `BRAND.relatedSites` so it can be toggled or removed instantly. |

---

## 📞 6. Conversion, Trust & Direct Enquiry Architecture

The site functions as an effortless direct enquiry platform:
- **Click-to-Call**: Single click `tel:+919310709233` accessible across top header, hero, service cards, contact page, and footer.
- **Per-Service WhatsApp Links**: Direct WhatsApp links (`https://wa.me/919310709233?text=...`) pre-filled with the exact name of the requested service.
- **Sticky Mobile Bottom Bar**: Fixed bottom bar on mobile viewports providing one-tap Call and WhatsApp actions.
- **Quick Enquiry Form (`/contact`)**:
  - Captures Name, Phone, Business Stage, What you need, and Preferred Mode (Online / In person).
  - No backend: submitting opens WhatsApp with a pre-filled structured message.
  - Includes a `mailto:` alternative and a prominent fallback box (Copy Message, Direct Phone Call).
- **Google Maps Link**: Head Office address links to Google Maps (`https://www.google.com/maps/search/?api=...`) without embedding an iframe.
- **Strict Trust Integrity**: Zero "Trusted by" logo strips, zero client counts, zero invented statistics, zero star ratings, and zero stock photos of people posing as staff.

---

## 🧪 7. Verification & Build Confirmation

1. **Automated Test Suite**:
   - `tests/portfolio-enquiry.test.ts` executes **19 assertions** covering zero DB/API invariants, business card fact integrity, 9 services catalog, expert panel rules, engagements consent rules, disclaimer wording, navigation hygiene, and config-driven pending items.
   - **Result**: `19 passed, 0 failed`.
2. **Next.js Production Build**:
   - `npm run build` completed successfully.
   - **Result**: `45/45 static pages generated` (`○ Static / ● SSG`). Zero dynamic API routes.
3. **Repository Search Verification**:
   - Scanned `src/` for unauthorized database, auth, payment, portal, or admin modules.
   - **Result**: Clean repository.

---

*Report certified for DOW Consulting.*
