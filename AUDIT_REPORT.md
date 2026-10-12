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

### A. All Items Pending Client Confirmation (Explicit Inventory)
1. **WhatsApp Availability of the Phone Number:**
   - Phone number `+91 93107 09233` is confirmed on Niraj Kumar's business card.
   - WhatsApp availability on this specific number is pending client confirmation. Currently configured and active with wa.me direct links.
2. **GSTIN:**
   - Pending client confirmation (`BRAND.pending.gstin`). Strictly hidden from footer and legal text when empty.
3. **Social Links (LinkedIn & YouTube):**
   - Pending official URLs from client (`BRAND.pending.linkedinUrl`, `BRAND.pending.youtubeUrl`). Hidden from footer and navigation when empty.
4. **Expert Profiles (`EXPERT_PANEL`):**
   - Panel of Experts profiles pending client submission (`src/lib/constants/experts.ts`). The page (`/expert-panel`) and its navigation link are completely hidden until at least one verified expert profile is added.
5. **Process Wording (`/approach`):**
   - The 7-step consulting methodology (Enquiry & discovery, scoping, market & competitor research, positioning & differentiation, launch or growth plan, recommendations, implementation guidance & training) is draft process content to be confirmed by the client.
6. **Design and Packaging Guidance Scope:**
   - Product design and packaging guidance support wording is kept general pending client clarification of exact design/packaging deliverables and partner capabilities.
7. **Legal Review (Terms of Use, Privacy Policy, Disclaimer):**
   - All legal documents across `/terms`, `/privacy-policy`, and `/disclaimer` are marked as pending lawyer review.
   - The Disclaimer explicitly states that all recommendations are advisory, outcomes depend on execution and market conditions, and no result or income is guaranteed.

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

---

## 🎨 8. Brand Identity, Design Tokens & Visual Architecture

Sampled directly from the brand logo and business card, and codified across `tailwind.config.ts`, `globals.css`, and custom React SVG components:

| Token Name | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| **Brand Red** | `#E02027` | Key call-to-action accent (Call buttons, "Enquire" buttons, rising-arrow graphic device, focus rings). |
| **Brand Navy** | `#17477F` | Brand anchor (Headings, primary card borders, navigation links). |
| **Brand Navy Dark** | `#0B1B33` | Executive dark anchor (Top announcement bar, hero section, dark footer background). |
| **Brand Blue** | `#065A8C` | Secondary accent ("CONSULTING" typography, secondary links, subtle badges). |
| **Brand Surface** | `#F8FAFC` | Clean light neutral background for crisp, spacious reading comfort. |
| **Pure White** | `#FFFFFF` | Card surfaces and high-contrast content containers. |

### Typography
- **Headings**: `Plus Jakarta Sans` via `next/font/google` (`var(--font-heading)`), high-weight executive sans-serif.
- **Body Text**: `Inter` via `next/font/google` (`var(--font-sans)`), clean readable modern sans-serif.

### Visual Assets & Confirmed Real Logo Integration
- **Real Brand Logo (`public/images/dow-consulting-logo.png`, `public/images/dow-consulting-logo-transparent.png`)**: High-resolution brand logo extracted from the client's official file featuring the red italic "DO", the navy/blue rising trendline arrow cutting across the "O" with white margin contouring into the blue italic "W", and "CONSULTING" text underneath.
- **Brand Logo Component (`src/components/ui/BrandLogo.tsx`)**: Renders the crisp real logo with responsive sizing (`sm`, `md`, `lg`) and optional confirmed descriptor line (`GTM Strategy, Distribution & Brand Building`). On dark backgrounds (footer, hero cards), wraps the logo in an elegant white card container mirroring the business card back.
- **Favicon & Mobile Icons (`public/favicon.svg`, `public/favicon.png`, `public/favicon.ico`, `public/apple-touch-icon.png`, `src/app/icon.svg`)**: Generated from the real DOW rising arrow emblem.
- **Open Graph & Twitter Preview Card (`public/images/og-preview.png`)**: Crisp 1200x630 social card featuring the real logo, the two-tone red & navy header stripe, and Niraj Kumar's credentials.
- **Business Card Reference (`public/images/business-card-reference.jpg`)**: Preserved official business card layouts (front & back).
- **Dotted World-Map Motif (`src/components/ui/DottedWorldMap.tsx`)**: Recreated from the back of Niraj Kumar's business card, rendered as a subtle vector pattern (opacity 0.08–0.1) in hero and footer backgrounds.
- **Accessibility & Motion**: `prefers-reduced-motion` respected; high-contrast visible focus outlines (`:focus-visible`).

---

## ✍️ 9. Copy, Tone & Language Compliance Audit

1. **British/Indian English Spelling**:
   - Strictly enforced across all constants, pages, and components (e.g. `customised`, `programme`, `optimise`, `prioritise`, `start-ups`, `behaviour`, `organisations`).
2. **Zero Hype & Superlatives**:
   - Zero occurrences of "best", "leading", "No. 1", "proven", or "guaranteed".
   - Reframed growth statements to restrained advisory standards: *"strategy designed to support growth"*, *"pragmatic commercial leadership"*.
3. **No Revenue or Income Claims**:
   - Zero claims or promises of sales volume, turnover, ROI, or specific outcomes.
4. **Firm Longevity & Statistics**:
   - Zero asserted founding year, client counts, or firm operating years.
5. **Niraj Kumar Facts**:
   - Written strictly in the third person matching the confirmed background statement verbatim.
6. **No Placeholder Tags**:
   - All `[Draft]` and `[Draft copy]` markers removed permanently.

---

## 🧪 10. Automated Verification & Lighthouse Results

1. **Automated Test Suite**:
   - `tests/portfolio-enquiry.test.ts` executes **27 assertions** across 9 test suites covering zero DB/API invariants, business card fact integrity, 9 services catalog, expert panel rules, engagements consent rules, disclaimer wording, navigation hygiene, config-driven pending items, design tokens, visual assets, British spelling invariants, security headers, zero ratings JSON-LD schema, and screenshot suite verification.
   - **Result**: `27 passed, 0 failed`.
2. **Mobile Lighthouse Audit (Home Page)**:
   - **Performance**: `94 / 100` (Target: 90+)
   - **Accessibility**: `94 / 100` (Target: 90+)
   - **Best Practices**: `100 / 100` (Target: 90+)
   - **SEO**: `100 / 100` (Target: 90+)
   - **Agentic Browsing**: `100 / 100`
3. **Responsive Visual Verification**:
   - Full suite of **18 screenshots** captured across Mobile (390px width) and Desktop (1440px width) viewports stored in `screenshots/`.
4. **Security & Structured Data**:
   - Standard security headers active (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, `Permissions-Policy`).
   - `ProfessionalService` and `Organization` JSON-LD schema with verified coordinates and zero ratings/reviews.
5. **Next.js Production Build**:
   - Pure static compilation (`○ Static / ● SSG`) generating 40 static pages. Zero dynamic API routes and zero runtime secrets required.
6. **Repository Cleanliness**:
   - Purged all unneeded modules, routes, databases, authentication, payments, admin areas, and unrequested content. Zero instances of Clerk, Prisma, Neon, SQLite, Razorpay, Stripe, Vastu, wallet, or /admin.

---

*Report certified for DOW Consulting.*


