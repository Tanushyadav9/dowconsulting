import { BRAND } from "@/lib/constants/brand";

export const metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: `Privacy policy and commercial data protection standards at ${BRAND.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Data Confidentiality &amp; Information Security
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Privacy Policy</h1>
        <p className="text-xs text-[#8C96A5]">
          {/* PLACEHOLDER: replace with client-approved content */}
          Last updated: October 2026 • Governing commercial data collection
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Information We Collect</h2>
        <p>
          To deliver rigorous strategic consulting, {BRAND.name} collects proprietary commercial information voluntarily submitted through our intake forms, client communications, and live sessions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Corporate entity name, registration jurisdiction, and industry classification</li>
          <li>Commercial premises address, floor plans, facility layouts, and orientation drawings</li>
          <li>Operating timelines, founder transit data for milestone timing calculations, and strategic expansion objectives</li>
          <li>Executive contact coordinates (email, telephone, WhatsApp) and billing records</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. Commercial Non-Disclosure &amp; Usage</h2>
        <p>
          We treat all client business data as strictly confidential. Client floor plans, revenue figures, and organizational challenges are utilized solely for diagnostic analysis and preparation of your custom written report. We do not sell, rent, or monetize client data to any third-party advertisers or brokers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Secure Storage &amp; Infrastructure</h2>
        <p>
          Consultation dossiers and PDF reports are hosted on encrypted cloud infrastructure (Cloudflare R2) and delivered via authenticated client portals. Payment transactions are processed directly via PCI-DSS compliant gateways (Razorpay and Stripe); we never store raw credit card credentials on our servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Contact Our Data Desk</h2>
        <p>
          For inquiries regarding data retention, deletion requests, or confidentiality agreements, contact our administrative desk at:
        </p>
        <p className="text-xs text-[#1B2838] font-semibold">
          {BRAND.contact.address.full}<br />
          Email: {BRAND.contact.email} • WhatsApp: {BRAND.contact.whatsapp.display}
        </p>
      </section>
    </div>
  );
}
