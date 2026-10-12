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
          Professional Disclosures &amp; Limitations
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Business Advisory Disclaimer</h1>
        <p className="text-xs text-[#8C96A5]">
          Statutory advisory guidelines for {BRAND.name}.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Nature of Advisory Services</h2>
        <p>
          Consultations provided by {BRAND.name} and Consultant Niraj Kumar provide business consulting across market research, product launch strategy, GTM strategy &amp; distribution, brand building, product design and packaging guidance, business expansion and sales-growth strategy, new-business and start-up guidance, staff training, and customised solutions. These services constitute professional advisory opinions intended to assist business owners, founders, and management in commercial decision-making.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. No Guarantee of Specific Financial Outcomes</h2>
        <p>
          Commercial success depends upon diverse market factors, execution capabilities, competitive conditions, macroeconomic trends, and regulatory environments. While structured analysis and roadmaps are provided, {BRAND.name} makes no guarantee of specific revenue figures, profitability, or commercial returns.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Non-Substitution for Certified Legal, Tax or Financial Advice</h2>
        <p>
          Consulting observations and roadmaps do not substitute for formal statutory legal advice from registered advocates, certified accounting/tax advice from Chartered Accountants, or regulated financial advisory services. Clients retain full responsibility for statutory compliance and formal legal contracting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall {BRAND.name} or Consultant Niraj Kumar be held liable for indirect, consequential, or incidental damages arising out of commercial decisions made by the client following consultation.
        </p>
      </section>
    </div>
  );
}
