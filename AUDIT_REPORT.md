# DOW Consulting — Audit & Verification Report

> **Status Tracking, Brand Confirmation & Content Audit**  
> *Last Updated: Initial Build Phase*

---

## ⚠️ High-Priority Items Requiring Explicit Client Confirmation

### 1. Brand Display Name Confirmation
- **Current Rendering**: `DOW Consulting` (derived from domain `dowconsulting.in`).
- **Audit Flag**: Needs explicit confirmation from Niraj Kumar.
  - *Context Note*: Similar to how "Aapka Astro" required correction from "Aapaka Astro" on the sister platform, verify if "DOW" is an acronym (and if so, what casing/spacing is desired, e.g., DOW Consulting vs D.O.W. Consulting vs Dow Consulting).

---

## 🏷️ Catalog of Marked Placeholders (`{/* PLACEHOLDER: replace with client-approved content */}`)

The following items are functional and structured, but explicitly tagged as placeholders awaiting final client copy/numbers:

1. **Package Tiers & Pricing (`/packages`, `/checkout`, `src/lib/constants/packages.ts`)**:
   - Starting packages:
     - Tier 1: **Foundation Advisory** (Strategic Timing & Preliminary Spatial Review)
     - Tier 2: **Commercial Vastu & Strategic Growth Audit** (Comprehensive Site / Plan & Timeline Strategy)
     - Tier 3: **Executive Strategic Retainer & Enterprise Expansion** (Multi-Location & Board-Level Advisory)
   - *Status*: Structural definitions and deliverables are real; exact rupee amounts and international USD amounts are placeholders awaiting client sign-off.

2. **Case Studies / Testimonials (`/case-studies`, `/`)**:
   - Generic, authentic-sounding scenarios used (e.g., *NCR Retail Chain Founder*, *Manufacturing MSME Director*, *Fintech Seed-Stage Founder*).
   - *Status*: Strictly non-fabricated. No fake company names or fake precision percentage statistics were invented. Marked for replacement with real client testimonials when available.

3. **Legal Compliance Documents (`/terms`, `/privacy-policy`, `/refund-policy`, `/disclaimer`, `/pricing-policy`)**:
   - All five legal pages built and linked prominently in the global footer from Day 1.
   - *Status*: Drafted with standard professional Indian corporate consulting clauses, clearly marked as templates requiring counsel review.

---

## 🔒 Security & Architecture Compliance Checklist

| Item | Requirement | Status |
| :--- | :--- | :--- |
| **Database Isolation** | Dedicated Neon project (never shared with Aapka Astro or Viar) | ✅ Verified (Configured in Prisma) |
| **Admin Authorization** | Owner-only access via strictly configured `OWNER_EMAIL` with **zero hardcoded fallback emails** | ✅ Verified |
| **Clerk Auth Mode** | Satellite domain under shared Clerk app `app_3JoGbVxdSJXtTwELzFuSwXpw6Rf` | ✅ Configured |
| **Calling Restrictions** | Consultations strictly via WhatsApp Call or Google Meet; **no in-app audio/video calling** | ✅ Verified |
| **Payment Model** | Flat one-time orders only via Razorpay & Stripe; no wallet, no per-minute meter | ✅ Verified |
| **Delivery Model** | Both Live Session AND Written PDF Report delivered for every engagement | ✅ Verified |
| **Email Lifecycle** | 5 core transactional events built via Resend from day one | ✅ Built |
| **Report Storage** | Cloudflare R2 bucket with presigned download URLs | ✅ Integrated |

---

## 🏢 Confirmed Real Business Data (Preserved)

- **Principal Advisor**: Niraj Kumar
- **Confirmed Credentials**:
  - Vice President & Business Head at Reliance Retail, Metro Cash & Carry, NIF Food
  - B.Sc. (Hons.) in Physics
  - PGDBM in International Business & Marketing
  - XLRI Leadership Development & Change Management certification
- **Positioning**: *"Strategic Business Timing & Commercial Vastu"*
- **Office Location**: Unit No. A-1212 D, Tower A, Spectrum@Metro Phase 1, Sector 75, Noida, G.B. Nagar - U.P. 201301
- **Direct WhatsApp**: +91 93112 15564

---

## 🌐 Sister Repositories Follow-Up Tasks (Post-Launch)

The cross-promotion section linking to **Aapka Astro** (`https://aapkaastro.com`) and **Viar.in** (`https://viar.in`) is live on DOW Consulting (homepage and footer).

### Required Follow-Up Actions for Sister Repositories:
1. **Aapka Astro Repository (`aapkaastro`)**:
   - Update its cross-promotion / footer section to include **DOW Consulting** (`https://dowconsulting.in` or Vercel production URL).
   - Display positioning: *"Strategic Business Timing & Commercial Vastu"* led by Niraj Kumar for entrepreneurs, retail chains, and corporate decision-makers.
2. **Viar.in Repository (`viar`)**:
   - Update its cross-promotion banner to establish the distinction between residential architectural Vastu (handled by Viar.in) and commercial enterprise & executive timing advisory (handled by DOW Consulting).
   - Add direct outbound link to DOW Consulting.
