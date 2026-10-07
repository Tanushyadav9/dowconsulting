import { BRAND } from "@/lib/constants/brand";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";

export const metadata = {
  title: `Pricing Policy | ${BRAND.name}`,
  description: `Transparent pricing and proposal policy for ${BRAND.name}. [Draft copy]`,
};

export default function PricingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm text-[#5A6472]">
      <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Fee Structure &amp; Deliverables Policy [Draft]
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">Pricing Policy</h1>
        <p className="text-xs text-[#8C96A5]">
          Last updated: October 2026 • Governing fee transparency and proposal tiers [Draft copy]
        </p>
      </div>

      <div className="p-4 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E]">
        <strong>Pending Client Confirmation:</strong> Standard package names, pricing tiers, call durations, report turnarounds, and GST status are currently pending client confirmation. Engagements are arranged on a custom scope proposal basis.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">1. Transparent, Flat-Fee Philosophy</h2>
        <p>
          At {BRAND.name}, we maintain complete transparency in our advisory pricing. Rather than unexpected open-ended hourly fees, consulting engagements are formulated with clear upfront scope agreements before work commences.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">2. Draft Practice Tiers (Pending Client Confirmation)</h2>
        <p>
          The table below indicates draft advisory practice tiers. Final package names and commercial pricing remain subject to client confirmation:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[#E2E8F0] mt-2">
            <thead className="bg-[#1B2838] text-[#F7F6F3]">
              <tr>
                <th className="p-3 text-left">Practice Tier [Draft]</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Core Scope Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-[#FFFFFF]">
              {CONSULTING_PACKAGES.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="p-3 font-semibold text-[#1B2838]">{pkg.name}</td>
                  <td className="p-3 text-[#C9A24B] font-medium">Pending Client Confirmation</td>
                  <td className="p-3 text-[#5A6472]">{pkg.deliverables.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">3. Custom Proposals for Enterprise &amp; MSME Engagements</h2>
        <p>
          For multi-branch retail networks, growing MSMEs, or assignments requiring multi-phased research and strategy, our team prepares custom written proposals specifying deliverables, team allocation, and milestones.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">4. Payment Methods &amp; Currency</h2>
        <p>
          Upon proposal acceptance, payments are processed securely:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Indian Clients (INR):</strong> Razorpay supporting UPI, NetBanking, and major Debit/Credit Cards.</li>
          <li><strong>International Clients (USD):</strong> Stripe supporting major global cards.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1B2838]">5. Inquiries &amp; Corporate Invoicing</h2>
        <p>
          Official commercial receipts and invoices are issued for all corporate engagements upon provision of corporate details. Statutory GST status and registration specifics are pending client confirmation. Direct inquiries may be routed to {BRAND.contact.email} or via WhatsApp at {BRAND.contact.whatsapp.display}.
        </p>
      </section>
    </div>
  );
}
