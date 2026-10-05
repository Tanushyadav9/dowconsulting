import { BRAND } from "@/lib/constants/brand";

export const metadata = {
  title: `Terms of Service | ${BRAND.name}`,
  description: `Terms and conditions governing executive business advisory services by ${BRAND.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Legal Agreement &amp; Client Standards
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Terms of Service</h1>
        <p className="text-xs text-[#8C96A5]">
          {/* PLACEHOLDER: replace with client-approved content */}
          Last updated: October 2026 • Effective for all consulting engagements
        </p>
      </div>

      <div className="p-4 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E]">
        <strong>Notice:</strong> The following terms govern executive consultations, written diagnostic reports, and digital advisory deliverables provided by {BRAND.name}.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Engagement Overview</h2>
        <p>
          {BRAND.name} provides high-level executive strategic business advisory, commercial spatial audits (Commercial Vastu), and corporate milestone timing diagnostics. Engagements are led by Principal Advisor Niraj Kumar and are delivered via two mandatory components: (a) a direct live session conducted via Google Meet or WhatsApp Call, and (b) an executive written diagnostic report delivered via the client portal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. Scope of Advisory &amp; Client Responsibility</h2>
        <p>
          All guidance, spatial recommendations, and milestone timing analyses represent professional advisory opinions formulated from corporate operating experience and classical spatial diagnostics. The client retains sole executive discretion regarding corporate implementation, financial investments, lease executions, capital commitments, and personnel changes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Flat Fee Engagements &amp; Billing</h2>
        <p>
          Engagements are billed as flat, one-time professional fees prior to the commencement of the diagnostic review. There are no subscriptions, recurring retainers without separate mutual agreement, or per-minute billing structures. Payment may be remitted via Razorpay (INR) or Stripe (USD).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Rescheduling &amp; Sessions</h2>
        <p>
          Confirmed live sessions may be rescheduled with at least 24 hours prior written notice via WhatsApp ({BRAND.contact.whatsapp.display}) or email. Unannounced client absences or cancellations within 6 hours of the scheduled time may result in rescheduling fees or forfeiture of the live session slot.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">5. Intellectual Property &amp; Confidentiality</h2>
        <p>
          Written reports and diagrams provided to the client are strictly confidential and customized for the client&apos;s commercial entity. All underlying analytical methodologies, frameworks, and copyright in written materials remain the intellectual property of {BRAND.name}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">6. Governing Law &amp; Jurisdiction</h2>
        <p>
          These terms are governed by the laws of India. Any legal disputes arising out of or in connection with services rendered shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Noida), Uttar Pradesh, India.
        </p>
      </section>
    </div>
  );
}
