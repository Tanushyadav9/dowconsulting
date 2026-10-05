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
          {/* PLACEHOLDER: replace with client-approved content */}
          Last updated: October 2026 • Professional services fee policy
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Nature of Professional Services</h2>
        <p>
          Consulting services provided by {BRAND.name} involve personalized executive analysis, specialized directional calculations, diagnostic report drafting, and reserved calendar time with Principal Advisor Niraj Kumar. As intellectual advisory work commences immediately upon intake review, fees paid are generally non-refundable once diagnostic work or live sessions have occurred.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. Pre-Session Cancellations</h2>
        <p>
          If a client requests a full cancellation in writing more than 48 hours prior to the scheduled live consultation call, and before any customized preliminary spatial report has been drafted, a refund may be issued subject to a 10% administrative and payment gateway processing fee.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Rescheduling in Lieu of Cancellation</h2>
        <p>
          We encourage clients facing operational emergencies to reschedule their live session rather than cancel. Sessions may be rescheduled up to two times with at least 24 hours prior written notification to our desk.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Post-Delivery Non-Refundability</h2>
        <p>
          Once a live session has taken place or a customized written report PDF has been delivered to the client portal, fees are 100% non-refundable. Clients are entitled to direct follow-up clarifications during their designated post-delivery window via WhatsApp.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">5. Contact for Inquiries</h2>
        <p>
          All cancellation and refund requests must be submitted in writing with the original order number to {BRAND.contact.email} or via WhatsApp at {BRAND.contact.whatsapp.display}.
        </p>
      </section>
    </div>
  );
}
