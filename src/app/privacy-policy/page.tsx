import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";

export const metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: `Privacy policy and commercial data protection standards at ${BRAND.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-slate-600">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#E02027] uppercase tracking-wider">
          Data Confidentiality &amp; Information Security
        </span>
        <h1 className="text-3xl font-black text-[#17477F] font-heading">Privacy Policy</h1>
        <p className="text-xs text-slate-500">
          Governing communications and enquiries with {BRAND.name}.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">1. Information We Collect</h2>
        <p>
          To facilitate strategic business consulting, {BRAND.name} collects commercial information voluntarily provided through enquiries, phone calls, WhatsApp messages, and meetings:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>Contact details: Name, phone number, email address, enterprise name, and city</li>
          <li>Commercial context: Industry domain, business stage, challenges, and growth objectives</li>
          <li>Operational notes shared during consultations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">2. Commercial Non-Disclosure &amp; Confidentiality</h2>
        <p>
          We treat all client business data as strictly confidential. Client documentation and operational records are utilised solely for consulting analysis and preparation of strategic recommendations. We do not sell, rent, or distribute client data to any third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">3. Non-Transactional Infrastructure</h2>
        <p>
          This website is a professional portfolio and enquiry site. It does not maintain user accounts, databases, or online payment gateways. Communications received via phone, WhatsApp, or email are handled directly by Consultant Niraj Kumar with strict confidentiality.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#17477F] font-heading">4. Contact Coordinates</h2>
        <p>
          For questions regarding data confidentiality or commercial enquiries, contact:
        </p>
        <p className="text-xs text-[#17477F] font-semibold leading-relaxed">
          {BRAND.headOffice.address}<br />
          Phone: {ENQUIRY_CONFIG.phone.display} &bull; Email: {ENQUIRY_CONFIG.email.primary} &bull; WhatsApp: {ENQUIRY_CONFIG.whatsapp.display}
        </p>
      </section>
    </div>
  );
}
