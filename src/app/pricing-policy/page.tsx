import { BRAND } from "@/lib/constants/brand";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";

export const metadata = {
  title: `Pricing Policy | ${BRAND.name}`,
  description: `Transparent pricing and deliverables policy for ${BRAND.name}.`,
};

export default function PricingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Fee Structure &amp; Deliverables Integrity
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Pricing Policy</h1>
        <p className="text-xs text-[#8C96A5]">
          {/* PLACEHOLDER: replace with client-approved content */}
          Last updated: October 2026 • Governing fee transparency and engagement tiers
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Transparent, Flat-Fee Philosophy</h2>
        <p>
          At {BRAND.name}, we maintain complete transparency in our advisory pricing. Unlike conventional hourly billing practices with open-ended billing or retainer lock-ins, every package on our platform is quoted with clear upfront pricing. Clients know their exact investment upfront before engagement commences.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. Starting Package Tiers</h2>
        <p>
          We provide visible starting packages for self-serve online reservation, alongside bespoke custom proposals for multi-facility operations:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[#E2E8F0] mt-2">
            <thead className="bg-[#1B2838] text-[#F7F6F3]">
              <tr>
                <th className="p-3 text-left">Engagement Tier</th>
                <th className="p-3 text-left">Fee (INR)</th>
                <th className="p-3 text-left">Fee (USD)</th>
                <th className="p-3 text-left">Core Deliverable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-[#FFFFFF]">
              {CONSULTING_PACKAGES.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="p-3 font-semibold text-[#1B2838]">{pkg.name}</td>
                  <td className="p-3">₹{pkg.priceINR.toLocaleString("en-IN")}</td>
                  <td className="p-3">${pkg.priceUSD}</td>
                  <td className="p-3 text-[#5A6472]">{pkg.deliverables.liveSession} + Written PDF Report</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Custom Quotes for Enterprise Engagements</h2>
        <p>
          For multi-unit retail networks, complex manufacturing plants, or assignments requiring physical on-site visits across India, our advisory desk prepares custom written quotes. Custom quotes clearly specify the scope, timing, payment milestones, and travel disbursements (if applicable).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Payment Methods &amp; Currency</h2>
        <p>
          Payments originate through secure PCI-DSS compliant payment gateways:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Indian Clients (INR):</strong> Razorpay supporting UPI, NetBanking, and all major Debit/Credit Cards.</li>
          <li><strong>International Clients (USD):</strong> Stripe supporting major global credit cards.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">5. Inquiries &amp; Corporate Invoicing</h2>
        <p>
          GST-compliant tax invoices are issued for all corporate engagements upon provision of legal company details and GSTIN. Direct inquiries may be routed to {BRAND.contact.email} or via WhatsApp at {BRAND.contact.whatsapp.display}.
        </p>
      </section>
    </div>
  );
}
