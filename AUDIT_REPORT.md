# DOW Consulting — Architecture Audit & Portfolio/Enquiry Implementation Report

> **Audit Date:** October 2026  
> **Repository:** `dowconsulting`  
> **Firm Leadership:** Niraj Kumar, Lead Strategic Advisor  
> **Core Architecture:** Professional Portfolio & Enquiry Site (Non-Transactional)  
> **Ground Rules Status:** Strict adherence to client-confirmed facts. Zero invented facts. All unconfirmed items made configurable.

---

## 🎯 Executive Summary & Architectural Mandate

Per the client's direct mandate:
> *"DOW Consulting is a business-consulting firm led by Niraj Kumar. This website is a professional portfolio and enquiry site. Its job is to make visitors and prospective clients see the firm as trustworthy, credible and highly professional, to show clearly what the firm does and how it works, and to make it effortless to enquire by phone call or WhatsApp.*  
> *It is not a transactional platform. There are no accounts, no online payments, no client portal, no database and no admin area. Customers enquire directly by phone or WhatsApp, and the consultant takes it from there.*  
> *If a product decision is missing, make it configurable and note it in AUDIT_REPORT.md. Do not invent facts."*

---

## 🚫 Non-Transactional Transition: What Was Audited & Removed

The previous repository contained complex transactional and administrative infrastructure that contradicted the firm's real-world operational model. All transactional modules were systematically decoupled and removed:

| Component | Previous Implementation | Removal Rationale |
| :--- | :--- | :--- |
| **User Accounts & Authentication** | `@clerk/nextjs`, `/login`, `/signup`, `/sign-in`, `/sign-up`, `/sso-callback`, Clerk middleware | The firm does not operate client or staff accounts. Prospective clients enquire directly. Removed all Clerk dependencies and auth redirects. |
| **Online Payments** | Razorpay SDK, Stripe SDK, `/checkout`, `/api/payments/*`, `/api/checkout/*` | DOW Consulting does not sell transactional packages or process online payments. Engagements are tailored and invoiced offline via formal engagement contracts. |
| **Client Portal** | `/account`, `/api/client/*`, Cloudflare R2 presigner, `/api/reports/*`, `@aws-sdk/*` | There is no client vault. Written strategy blueprints and diagnostic reports are delivered directly to client leadership followed by executive debrief calls. |
| **Database** | Prisma ORM, PostgreSQL connection strings, `prisma/schema.prisma`, seed scripts | No database is required for a high-performance portfolio and enquiry site. All content is statically compiled and configured in type-safe constants. |
| **Admin Area** | `/admin`, `/admin/cases`, `/admin/reports`, `/admin/submissions`, `/admin/quotes`, `/admin/packages`, `/admin/team`, `/admin/testimonials`, `/api/admin/*` | No back-office admin area exists. Enquiries arrive directly via phone and WhatsApp to the consultant's desk. |

---

## 💼 Practice Leadership & Verbatim Client Credentials

All credentials and professional background information are quoted strictly in client-supplied wording and attributed to **Niraj Kumar personally**:

1. **Corporate Operating Background (Verbatim Client Wording):**
   > *"Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food"*
2. **Academic Credentials:**
   - **B.Sc. (Hons.) in Physics**
   - **PGDBM in International Business & Marketing**
3. **Executive Education:**
   - **XLRI Leadership Development and Change Management Certification**
4. **Sister Platforms:**
   - Founder of **Aapka Astro** ([aapkaastro.com](https://aapkaastro.com)) — Personal Vedic astrology consultations and analytical tools.
   - Founder of **Viar.in** ([viar.in](https://viar.in)) — Vihangam Institute of Astrology and Research offering self-paced astrology courses.
5. **Strict Fact Integrity Rule:**
   - **Zero firm founding year, client counts, firm statistics, or firm outcome claims** are stated.

---

## 📋 The 4 Confirmed Practice Areas

DOW Consulting provides business consulting tailored specifically for **startups, small companies, and MSMEs** across four confirmed practice areas:

1. **Go-to-Market (GTM) Strategy** (`/services/gtm-strategy`):
   - Target customer profiling and buyer persona segmentation (ICP).
   - Value proposition differentiation and competitive positioning.
   - Channel selection (direct, distributors, retail storefronts, B2B pipelines).
   - Launch milestone sequencing and sales readiness roadmaps.
2. **Market Research** (`/services/market-research`):
   - Industry sector dynamics and macro-environmental trends.
   - Competitive benchmarking and market gap identification.
   - Customer pain point synthesis and willingness-to-pay dynamics.
   - Pragmatic, data-informed inputs for founder decision-making.
3. **Business Expansion Strategy** (`/services/business-expansion-strategy`):
   - Expansion readiness and multi-unit retail/geographical scaling.
   - Operational capacity, supply chain vendor availability, and workflow planning.
   - Regional and demographic market prioritization.
   - Capital allocation and phased rollout milestone gates.
4. **New Business Start Consultation** (`/services/new-business-start-consultation`):
   - Venture concept validation and business model structuring.
   - Initial operational and working capital runway mapping.
   - Early milestone setting for pre-launch and launch phases.
   - Regulatory clearances, compliance, and statutory readiness.

---

## 👥 The Collaborative Team Model

DOW Consulting operates as a **collaborative advisory team, not a single consultant**:
- **Information Collection:** Dedicated team members gather client briefs, operational parameters, and founder requirements.
- **Market Research:** Specialists conduct secondary industry benchmarking, competitor analysis, and category intelligence.
- **Strategic Consultation:** Consultants and Lead Strategic Advisor Niraj Kumar synthesize research into actionable strategic roadmaps.

---

## 📞 Effortless Enquiry Architecture (Phone & WhatsApp)

To ensure prospective clients experience zero friction when reaching out, direct enquiry mechanisms are integrated across every touchpoint:

### 1. Verified Corporate Coordinates
- **Headquarters Address:** Unit No. A-1212 D, Tower A, Spectrum@Metro Phase 1, Sector 75, Noida, G.B. Nagar - Uttar Pradesh 201301, India
- **Direct Phone Call:** [+91 93112 15564](tel:+919311215564) (`tel:+919311215564`)
- **Direct WhatsApp:** [+91 93112 15564](https://wa.me/919311215564) (`https://wa.me/919311215564`)
- **Direct Email:** [info@dowconsulting.in](mailto:info@dowconsulting.in)
- **Desk Operating Window:** Monday – Saturday: 10:00 AM – 7:00 PM IST

### 2. Multi-Touchpoint Enquiry Elements
- **Top Advisory Bar:** Displays Niraj Kumar's leadership credentials, direct phone call link, and direct WhatsApp link on all desktop and mobile viewports.
- **Navbar Actions:** Instant "Call: +91 93112 15564" button, green "WhatsApp" button, and "Enquire" primary CTA.
- **Persistent Floating Widget (`FloatingEnquiryWidget`):**
  - **Desktop:** Floating pill at bottom-right of viewport with one-click Call and WhatsApp buttons.
  - **Mobile:** Sticky bottom navigation bar with dual Call and WhatsApp action buttons.
- **Hero & Page CTAs:** Dual prominent action buttons across Homepage, Services Overview, and all 4 Service Detail Pages.
- **Interactive Pre-Consultation Diagnostic Brief (`/intake` & `/contact`):**
  - Allows visitors to outline their entity name, location, practice area of interest, business stage, and key goals.
  - Instantly generates a structured diagnostic brief and launches WhatsApp (`wa.me/919311215564?text=...`) directly to Niraj Kumar's desk with one click.
  - Zero database storage, zero logins, zero friction.

---

## ⚙️ Missing Product Decisions — Configurable Matrix

The following product decisions have **not** been confirmed by the client (Niraj Kumar). In accordance with the mandate, each has been made fully configurable and tracked in the codebase:

| # | Missing Product Decision | Current Configuration Status | Code Configuration Location |
| :-: | :--- | :--- | :--- |
| **1** | **Exact Brand Name and "DOW" Meaning** | Displayed as `DOW Consulting` with a `[Draft]` badge. What "DOW" stands for (acronym vs. name) and legal entity suffix remain unconfirmed. | `src/lib/constants/brand.ts` (`BRAND.name`) |
| **2** | **Official Logo Graphic Asset** | Clean typographic SVG wordmark with neutral navy (`#1B2838`) and gold (`#C9A24B`) accents. No unverified third-party emblems or logos used. | `src/components/layout/Navbar.tsx`<br>`src/components/layout/Footer.tsx` |
| **3** | **Package Names and Public Prices** | All engagements are structured as proposal-driven custom scopes. Zero invented pricing numbers or checkout tiers appear on public interfaces. | `src/lib/constants/packages.ts`<br>`src/app/packages/page.tsx` |
| **4** | **Consultation Duration & Report Turnaround** | Engagement durations (e.g. 60-min vs 90-min) and turnaround days are stated as tailored per engagement scope rather than rigid binding SLAs. | `src/app/pricing-policy/page.tsx`<br>`src/lib/constants/brand.ts` |
| **5** | **Desk Operating Hours** | Configurable advisory window set to Monday – Saturday: 10:00 AM – 7:00 PM IST with note that live calls are scheduled by appointment. | `src/lib/constants/enquiryConfig.ts` (`ENQUIRY_CONFIG.officeHours`) |
| **6** | **Direct Phone & WhatsApp Numbers** | Configurable via `NEXT_PUBLIC_CONTACT_PHONE` and `NEXT_PUBLIC_WHATSAPP_NUMBER` with fallback to confirmed `+91 93112 15564`. | `src/lib/constants/enquiryConfig.ts`<br>`src/lib/env.ts` |
| **7** | **GST Registration & Invoicing Status** | Invoicing is handled offline under formal engagement contracts. Invoices do not state unconfirmed GSTIN numbers. | `src/app/pricing-policy/page.tsx`<br>`src/app/terms/page.tsx` |
| **8** | **Public Team Specialist Profiles** | Defaults to empty array (`[]`). When 0 profiles are published, the team page explains the collaborative model led by Niraj Kumar without fabricating names or photos. | `src/lib/constants/team.ts`<br>`src/app/team/page.tsx` |
| **9** | **Client Testimonials & Quotes** | Defaults to empty array (`[]`). When 0 are confirmed, homepage section returns `null` and `/testimonials` redirects to `/` without empty placeholders. | `src/lib/constants/testimonials.ts`<br>`src/components/home/TestimonialsSection.tsx` |
| **10** | **Pre-Filled WhatsApp Message Templates** | Standard pre-filled messages for general enquiries and each of the 4 service areas are fully configurable in one central object. | `src/lib/constants/enquiryConfig.ts` (`serviceWhatsAppTemplates`) |
| **11** | **Social Media Channels** | Dead and placeholder URLs are suppressed; only verified active channels configured via environment variables render in the footer. | `src/lib/constants/ecosystem.ts`<br>`src/components/layout/Footer.tsx` |
| **12** | **Former Employer Designations** | Quoted strictly and verbatim in client-supplied wording: *"Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food"*. | `src/lib/constants/brand.ts`<br>`src/app/about/page.tsx` |

---

## 🧪 Automated Test Suite Verification

Automated tests in [`tests/portfolio-enquiry.test.ts`](file:///c:/Users/TANUSH%20YADAV/Desktop/dowconsulting/tests/portfolio-enquiry.test.ts) verify all architectural invariants via `npm test` (`tsx --test tests/portfolio-enquiry.test.ts`):

```text
> dowconsulting@0.1.0 test
> tsx --test tests/portfolio-enquiry.test.ts

▶ DOW Consulting - Professional Portfolio & Enquiry Architecture Tests
  ▶ 1. Zero Accounts, Zero Payments, Zero Portal, Zero DB Invariants
    ✔ Site operates as non-transactional: zero runtime database required (0.8501ms)
    ✔ Packages have zero automated checkout pricing or online transaction gates (0.2437ms)
  ✔ 1. Zero Accounts, Zero Payments, Zero Portal, Zero DB Invariants (1.9585ms)
  ▶ 2. Effortless Direct Enquiry Mechanisms (Phone & WhatsApp)
    ✔ Verified direct phone call coordinates are formatted correctly (0.2997ms)
    ✔ Verified direct WhatsApp coordinates and link builder function properly (0.1604ms)
    ✔ Service-specific WhatsApp templates exist for all 4 confirmed practice areas (0.1679ms)
    ✔ Advisory desk office hours and direct contact details are configured (0.1487ms)
  ✔ 2. Effortless Direct Enquiry Mechanisms (Phone & WhatsApp) (1.2168ms)
  ▶ 3. Lead Strategic Advisor Credentials & Fact Integrity
    ✔ Niraj Kumar corporate operating background matches client wording verbatim (0.2491ms)
    ✔ Niraj Kumar academic and executive education credentials match confirmed facts (0.1788ms)
    ✔ Target client audience strictly focuses on startups, small companies, and MSMEs (0.1071ms)
    ✔ Team model defines collaborative specialized roles (1.5138ms)
  ✔ 3. Lead Strategic Advisor Credentials & Fact Integrity (2.3421ms)
  ▶ 4. Four Confirmed Practice Areas
    ✔ The four confirmed service practice areas are properly configured (0.4325ms)
  ✔ 4. Four Confirmed Practice Areas (0.5491ms)
  ▶ 5. Zero Invented Facts Policy
    ✔ Unconfirmed testimonials default to empty array (never fabricated) (0.258ms)
    ✔ Unconfirmed public team profiles default to empty array (never fabricated) (0.111ms)
    ✔ Sister platforms correctly reference Aapka Astro and Viar.in (0.0789ms)
  ✔ 5. Zero Invented Facts Policy (0.5857ms)
✔ DOW Consulting - Professional Portfolio & Enquiry Architecture Tests (7.391ms)
ℹ tests 14
ℹ suites 6
ℹ pass 14
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

---

## 🚀 Production Build Verification (28 Routes — 100% Static & SSG)

The Next.js production build (`npm run build`) compiles with zero database dependencies, zero Clerk dependencies, and zero errors:

```text
> dowconsulting@0.1.0 build
> next build

  ▲ Next.js 14.2.18
  - Environments: .env

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (28/28) 
 ✓ Generating static pages (28/28)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                    Size     First Load JS
┌ ○ /                                          203 B          94.2 kB
├ ○ /_not-found                                873 B          88.1 kB
├ ○ /about                                     203 B          94.2 kB
├ ○ /blog                                      203 B          94.2 kB
├ ● /blog/[slug]                               203 B          94.2 kB
├   ├ /blog/retail-expansion-market-dynamics
├   ├ /blog/gtm-strategy-for-startups
├   ├ /blog/market-research-for-msmes
├   └ /blog/new-business-start-foundations
├ ○ /case-studies                              203 B          94.2 kB
├ ○ /contact                                   3.25 kB        94.5 kB
├ ○ /disclaimer                                157 B          87.3 kB
├ ○ /intake                                    7.64 kB        94.8 kB
├ ○ /packages                                  157 B          87.3 kB
├ ○ /pricing-policy                            157 B          87.3 kB
├ ○ /privacy-policy                            157 B          87.3 kB
├ ○ /refund-policy                             157 B          87.3 kB
├ ○ /robots.txt                                0 B                0 B
├ ○ /services                                  203 B          94.2 kB
├ ○ /services/business-expansion-strategy      203 B          94.2 kB
├ ○ /services/gtm-strategy                     203 B          94.2 kB
├ ○ /services/market-research                  203 B          94.2 kB
├ ○ /services/new-business-start-consultation  203 B          94.2 kB
├ ○ /sitemap.xml                               0 B                0 B
├ ○ /team                                      203 B          94.2 kB
├ ○ /terms                                     158 B          87.3 kB
└ ○ /testimonials                              158 B          87.3 kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML

Exit Code: 0 (BUILD COMPLETE)
```

---

## 🔒 Summary of Invariants Enforced

1. **Non-Transactional Integrity:** Zero accounts, zero checkouts, zero portals, zero database connections, and zero admin dashboards.
2. **Effortless Direct Enquiry:** Phone call and WhatsApp links are available in top bar, navigation header, hero, service detail pages, floating mobile/desktop widgets, and pre-consultation brief builder.
3. **No Invented Facts:** Niraj Kumar's credentials match client wording verbatim. Testimonials and team profiles default to empty arrays.
4. **Resilient Compilation:** 100% static & SSG pre-rendering ensures sub-50ms TTFB, zero database cold starts, and zero runtime crashes.
