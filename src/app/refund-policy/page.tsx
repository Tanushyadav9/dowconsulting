import { BRAND } from "@/lib/constants/brand";

export const metadata = {
  title: `Refund & Cancellation Policy | ${BRAND.name}`,
  description: `Refund and cancellation terms for executive business consulting services at ${BRAND.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Commercial Terms &amp; Engagements
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Refund &amp; Cancellation Policy</h1>
        <p className="text-xs text-[#8C96A5]">
          Last updated: October 2026 • Professional advisory fee terms
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Nature of Professional Services</h2>
        <p>
          Consulting services provided by {BRAND.name} involve personalized strategic analysis, market research, diagnostic report drafting, and dedicated calendar time with Lead Strategic Advisor Niraj Kumar and our advisory team. Because intellectual advisory work commences immediately upon engagement scoping, commercial terms are governed by the specific written engagement proposal agreed upon by both parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. No Online Transactions</h2>
        <p>
          This website serves as a professional portfolio and enquiry platform. It is not a transactional platform and does not process automated checkouts, credit card charges, or online subscriptions. Consequently, payment arrangements, milestone schedules, and any cancellation terms are stipulated directly within client engagement agreements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Rescheduling of Diagnostic Sessions</h2>
        <p>
          We understand that executives and founders face unforeseen operational emergencies. Live diagnostic sessions may be rescheduled with at least 24 hours prior written notice via WhatsApp ({BRAND.contact.whatsapp.display}) or email to allow our team to reallocate consulting hours.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Post-Delivery Non-Refundability</h2>
        <p>
          Once a live strategic consultation has concluded or a written diagnostic deliverable has been delivered, professional fees are non-refundable. Clients receive direct follow-up clarifications during their designated post-delivery review window directly with the consultant.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">5. Contact &amp; Governance</h2>
        <p>
          All inquiries regarding engagement agreements, scheduling, or contract terms should be addressed to our advisory desk via email at {BRAND.contact.email} or on WhatsApp at {BRAND.contact.whatsapp.display}.
        </p>
      </section>
    </div>
  );
}
