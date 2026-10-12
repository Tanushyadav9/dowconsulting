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
| **Admin Area & Roles** | `/admin`, `/account`, case workflows, staff permissions, team roles, back-office API routes | No admin portal. Enquiries route directly to the consultant. |
| **Packages & Intake Wizard** | `/packages`, `packages.ts`, `/intake`, `IntakeForm.tsx`, `intakeQuestions.ts` | The firm does not sell fixed online package tiers or run a multi-step intake wizard. |
| **Testimonials & Email Modules** | `/testimonials`, `TestimonialsSection.tsx`, `testimonials.ts`, `team.ts`, `resend.ts`, `resend` dependency | Unverified testimonials and team profiles removed; email delivery module purged. |
| **Refund & Pricing Policies** | `/refund-policy`, `/pricing-policy` | Removed completely because there are no online transactions or public pricing tables. |
| **Astrology & Vastu Leftovers** | `EcosystemCrossPromotion.tsx`, `ecosystem.ts`, Aapka Astro & Viar.in links, Vastu/muhurta terms | All astrology, Vastu, and sister platform positioning completely purged from all routes and components. |
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

## 📋 4. The 9 Confirmed Client Services

The site architecture and copy reflect all nine services as described by the client:

1. **Market research and consumer insight**, including detailed research for a specific product or service (`market-research-consumer-insight`)
2. **Product launch strategy**: how to launch, how to position and make the offering distinctive against existing similar products, and the right place and time to launch (`product-launch-strategy`)
3. **Go-to-market strategy and distribution** (`gtm-strategy-distribution`)
4. **Brand building** (`brand-building`)
5. **Product design and packaging guidance** (`product-design-packaging-guidance`): Kept general until the client clarifies exactly what is offered.
6. **Business expansion and sales-growth strategy for existing businesses** (`business-expansion-sales-growth`)
7. **New-business and start-up guidance from scratch** (`new-business-startup-guidance`)
8. **Staff training** (`staff-training`)
9. **Customised solutions** (`customised-solutions`)

---

## ⚙️ 5. Configurable Decisions Pending from Client

In accordance with the zero-invention directive, all unconfirmed items are strictly config-driven, default to `null` or empty arrays, and are **completely hidden from the UI** when undefined (never displaying placeholders):

| Pending Item | Configuration Key | Default Value | UI Behavior When Undefined |
| :--- | :--- | :--- | :--- |
| **GSTIN** | `BRAND.pending.gstin` (`NEXT_PUBLIC_GSTIN`) | `null` | Entire GSTIN line is omitted from the footer. |
| **YouTube Channel** | `BRAND.pending.youtubeUrl` (`NEXT_PUBLIC_YOUTUBE_URL`) | `null` | Social icon block omits YouTube. |
| **LinkedIn Profile** | `BRAND.pending.linkedinUrl` (`NEXT_PUBLIC_LINKEDIN_URL`) | `null` | Social icon block omits LinkedIn. |
| **Expert Panel Profiles** | `BRAND.pending.expertPanelProfiles` | `[]` | Team section remains hidden until verified. |
| **Real Projects / Testimonials** | `BRAND.pending.testimonials` | `[]` | Testimonial carousel remains hidden until verified. |
| **Response-Time Commitment** | `BRAND.pending.responseTimeCommitment` | `null` | No claim made about turnaround speed. |
| **Domain Email (`@dowconsulting.in`)** | `BRAND.pending.domainEmail` | `null` | Site uses verified email `niraj@dairyonwheels.com`. |

---

## 📞 6. Direct Enquiry Architecture

The site functions as an effortless direct enquiry platform:
- **Direct Phone Dialing**: Single click `tel:+919310709233` available on Navbar, Floating Widget, Hero, Service cards, About page, Contact page, and Footer.
- **Direct WhatsApp Messaging**: Pre-formatted WhatsApp links (`https://wa.me/919310709233?text=...`) for general advisory, per-service inquiries, and custom briefs.
- **Direct Email**: `mailto:niraj@dairyonwheels.com` with pre-filled subject line.
- **Floating Contact Pill**: Responsive desktop pill and mobile sticky bar connecting directly via phone or WhatsApp.

---

## 🧪 7. Verification & Build Confirmation

1. **Automated Test Suite**:
   - `tests/portfolio-enquiry.test.ts` executes 16 assertions covering zero DB/API invariants, business card fact integrity, 9 services, navigation hygiene, zero astrology/Vastu leftovers, and config-driven pending items.
   - **Result**: `16 passed, 0 failed`.
2. **Next.js Production Build**:
   - `npm run build` completed successfully.
   - **Result**: `22/22 static pages generated` (`○ Static / ● SSG`). Zero dynamic API routes.
3. **Repository Search Verification**:
   - Scanned `src/` for forbidden terms (`clerk`, `prisma`, `neon`, `sqlite`, `razorpay`, `stripe`, `resend`, `admin`, `portal`, `packages`, `intake`, `vastu`, `muhurta`, `astro`, `aapka`, `viar`, `refund-policy`, `pricing-policy`).
   - **Result**: Zero unauthorized occurrences.

---

*Report certified for DOW Consulting.*
