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
          {/* PLACEHOLDER: replace with client-approved content */}
          Last updated: October 2026 • Statutory advisory guidelines
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Nature of Advisory Services</h2>
        <p>
          Consultations provided by {BRAND.name} and Niraj Kumar synthesize corporate management operating principles, structured commercial spatial optimization (Commercial Vastu), and milestone timing analytics. These services constitute strategic advisory opinions and are intended to assist business owners and corporate leadership in decision-making.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. No Guarantee of Specific Financial Outcomes</h2>
        <p>
          Business success depends upon diverse market factors, execution capabilities, competitive landscapes, macroeconomic cycles, and regulatory conditions. While spatial and timing optimization aim to reduce friction and improve environmental alignment, {BRAND.name} makes no explicit warranty or legal guarantee of specific revenue increases, profit margins, capital raise successes, or investment returns.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Non-Substitution for Certified Legal, Architectural or Financial Advice</h2>
        <p>
          Our recommendations do not substitute for formal structural engineering certifications, certified architectural municipal permits, statutory legal advice from registered attorneys, or registered financial investment counsel (e.g., SEBI registered advisory). Clients are advised to seek certified professionals for structural modifications and formal legal filings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall {BRAND.name}, its principal advisor Niraj Kumar, or affiliated associates be held liable for any indirect, consequential, punitive, or incidental damages arising out of commercial decisions made by the client following consultation. Total liability in any matter is strictly limited to the professional fee paid by the client for the specific engagement.
        </p>
      </section>
    </div>
  );
}
