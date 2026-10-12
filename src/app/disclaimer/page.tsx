import { BRAND } from "@/lib/constants/brand";

export const metadata = {
  title: `Advisory Disclaimer | ${BRAND.name}`,
  description: `Professional advisory disclaimer and statutory statements for ${BRAND.name}.`,
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Statutory Disclosures &amp; Professional Limitations
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Business Advisory Disclaimer</h1>
        <p className="text-xs text-[#8C96A5]">
          Statutory advisory statements governing consulting services by {BRAND.name}.
        </p>
      </div>

      <div className="p-4 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E]">
        <strong>Important Notice:</strong> All consulting recommendations provided by {BRAND.name} and Consultant Niraj Kumar are advisory. Outcomes depend on execution and market conditions, and no result or income is guaranteed.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Advisory Nature of Consulting</h2>
        <p>
          Consultations provided by {BRAND.name} and Consultant Niraj Kumar provide strategic business guidance across market research, product launch strategy, GTM strategy &amp; distribution, brand building, product design &amp; packaging guidance, business expansion, start-up guidance, staff training, and customised solutions. All guidance, roadmaps, and observations are strictly advisory in nature and intended to assist founders, owners, and management in commercial decision-making.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. No Guarantee of Specific Results or Income</h2>
        <p>
          Recommendations are advisory; actual commercial outcomes depend on client execution, organizational capabilities, competitive dynamics, and macroeconomic market conditions. <strong>No specific result, sales volume, profit margin, investment return, or commercial income is guaranteed.</strong>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Non-Substitution for Certified Legal, Tax or Financial Advice</h2>
        <p>
          Consulting roadmaps and observations do not substitute for formal statutory legal counsel from registered advocates, certified tax/accounting audits from Chartered Accountants, or regulated financial advisory services. Clients retain full responsibility for statutory compliance, filings, and formal legal agreements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall {BRAND.name} or Consultant Niraj Kumar be held liable for any indirect, consequential, punitive, or incidental damages arising out of commercial decisions made by the client following consultation. Total liability in any matter is strictly limited to the professional fee received for the specific engagement.
        </p>
      </section>
    </div>
  );
}
