import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";

export const metadata = {
  title: `Terms of Use | ${BRAND.name}`,
  description: `Terms and conditions governing business advisory services by ${BRAND.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-slate-600">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#E02027] uppercase tracking-wider">
          Legal Terms &amp; Advisory Guidelines
        </span>
        <h1 className="text-3xl font-black text-[#17477F] font-heading">Terms of Use</h1>
        <p className="text-xs text-slate-500">
          Effective for all consulting enquiries and engagements with {BRAND.name}.
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
        <strong>Notice:</strong> The following terms govern business consulting advisory services provided by {BRAND.name}, led by Consultant {BRAND.consultant.name}.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">1. Engagement Overview</h2>
        <p>
          {BRAND.name} provides business consulting services across market research, product launch strategy, GTM strategy &amp; distribution, brand building, product design &amp; packaging guidance, business expansion &amp; sales-growth strategy, new-business &amp; start-up guidance, staff training, and customised solutions. Services are dedicated to start-ups, small companies and MSMEs, led by Niraj Kumar, Consultant.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">2. Consultation Modes &amp; Travel Expenses</h2>
        <p>
          Consultations are conducted online via Google Meet or Zoom, or in person on request. For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">3. Scope of Advisory &amp; Client Responsibility</h2>
        <p>
          All guidance, research observations, and strategic roadmaps represent professional consulting opinions formulated from commercial operating analysis. The client retains sole executive discretion regarding implementation, financial investments, hiring decisions, capital commitments, and operational changes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">4. Non-Transactional Platform</h2>
        <p>
          This website is a professional portfolio and enquiry site. It does not process online payments, user accounts, or transactional checkouts. Prospective clients enquire directly by phone ({ENQUIRY_CONFIG.phone.display}) or WhatsApp ({ENQUIRY_CONFIG.whatsapp.display}), and the consultant coordinates terms and billing directly with the client.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">5. Intellectual Property &amp; Confidentiality</h2>
        <p>
          All proprietary business information provided by the client is kept strictly confidential. Reports and advisory documents prepared for the client are customised for the client&apos;s commercial entity. All underlying analytical methodologies and copyright in written materials remain the intellectual property of {BRAND.name}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">6. Governing Law &amp; Jurisdiction</h2>
        <p>
          These terms are governed by the laws of India. Any legal disputes arising out of or in connection with services rendered shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Noida), Uttar Pradesh, India.
        </p>
      </section>
    </div>
  );
}
