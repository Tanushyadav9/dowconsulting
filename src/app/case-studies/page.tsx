import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ArrowRight, Compass, Calendar, Building, TrendingUp, CheckCircle } from "lucide-react";

export const metadata = {
  title: `Case Scenarios & Engagements | ${BRAND.name}`,
  description:
    "Representative engagement scenarios demonstrating commercial Vastu alignment and strategic milestone timing advisory by Niraj Kumar.",
};

export default function CaseStudiesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          {/* PLACEHOLDER: replace with client-approved content */}
          Commercial Advisory Scenarios
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Advisory Scenarios &amp; Case Contexts
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Representative engagement contexts illustrating how strategic milestone timing and commercial Vastu principles resolve operational stagnation and high-stakes lease decisions.
        </p>

        <div className="pt-2">
          <p className="text-[11px] text-[#8C96A5] italic">
            {/* PLACEHOLDER: replace with client-approved content */}
            Note: Client identities and precise financials are held under strict non-disclosure. Scenarios reflect authentic operational patterns handled by Niraj Kumar.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case 1 */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                Retail Expansion • Delhi NCR
              </span>
              <span className="bg-[#F7F6F3] text-[#5A6472] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#E2E8F0]">
                Commercial Vastu &amp; Timing
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838]">
              Multi-Outlet Food &amp; Beverage Chain: Flagship Location Lease &amp; Layout
            </h3>

            <div className="space-y-3 text-xs text-[#5A6472]">
              <div>
                <strong className="text-[#1B2838]">The Operational Challenge:</strong>
                <p className="mt-1">
                  A high-growth casual dining brand prepared to lease a prime 3,200 sq.ft. commercial space. Two previous restaurant tenants at the exact site had shut down within 14 months. Founders hesitated before signing a 5-year lock-in lease.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Strategic Diagnostic:</strong>
                <p className="mt-1">
                  Niraj Kumar evaluated both the directional grid of the property and the executive timing cycle of the lead operating partner. Identified severe directional clashing between the main kitchen burners (fire element) and the cash register/accounts desk.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Actionable Solution:</strong>
                <ul className="mt-1 space-y-1 list-disc pl-4">
                  <li>Relocated the billing counter to the North-East wealth convergence zone.</li>
                  <li>Reconfigured the kitchen exhaust and dry-storage layout without civil demolition.</li>
                  <li>Scheduled the lease registration and soft opening during an optimal strategic window.</li>
                </ul>
              </div>

              <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0] text-[11px]">
                <strong className="text-[#1B2838]">Outcome:</strong> Smooth launch with sustained positive unit-level EBITDA through the critical first two quarters.
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                Manufacturing &amp; Engineering • Greater Noida
              </span>
              <span className="bg-[#F7F6F3] text-[#5A6472] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#E2E8F0]">
                Industrial Facility Alignment
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838]">
              Precision Auto Component MSME: Resolving Dispatch Delays &amp; Cash Traps
            </h3>

            <div className="space-y-3 text-xs text-[#5A6472]">
              <div>
                <strong className="text-[#1B2838]">The Operational Challenge:</strong>
                <p className="mt-1">
                  A 15-year-old auto component manufacturer added a secondary shed. Following the relocation of administrative and design desks, client payments began stalling, and machinery breakdowns spiked inexplicably.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Strategic Diagnostic:</strong>
                <p className="mt-1">
                  Niraj Kumar audited the industrial site grid. The Managing Director’s cabin had been shifted directly into the zone associated with instability, while finished goods inventory was choking the primary energy intake portal.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Actionable Solution:</strong>
                <ul className="mt-1 space-y-1 list-disc pl-4">
                  <li>Repositioned executive MD seating to the South-West master stability quadrant.</li>
                  <li>Shifted outbound dispatch flow to align with kinetic natural circulation.</li>
                  <li>Instituted a 60-day recovery timing milestone for renegotiating vendor terms.</li>
                </ul>
              </div>

              <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0] text-[11px]">
                <strong className="text-[#1B2838]">Outcome:</strong> Working capital cycle contracted by 22 days within four months of spatial reorganization.
              </div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                Tech SaaS • Bengaluru / Gurugram
              </span>
              <span className="bg-[#F7F6F3] text-[#5A6472] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#E2E8F0]">
                Fundraise Milestone Timing
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838]">
              B2B SaaS Venture: Strategic Window for Institutional Series A Close
            </h3>

            <div className="space-y-3 text-xs text-[#5A6472]">
              <div>
                <strong className="text-[#1B2838]">The Operational Challenge:</strong>
                <p className="mt-1">
                  Founders had pitched over 18 venture capital funds over six months with positive feedback but inconclusive term-sheet conversions as runway narrowed to 4 months.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Strategic Diagnostic:</strong>
                <p className="mt-1">
                  Evaluated the enterprise timeline and key founder transit cycles. The outreach had been conducted during a period of prolonged commercial inertia. A powerful 45-day inflection window was approaching.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Actionable Solution:</strong>
                <ul className="mt-1 space-y-1 list-disc pl-4">
                  <li>Recommended an immediate 3-week operational quiet period to refine pitch unit economics.</li>
                  <li>Reinitiated lead investor conversations precisely as the inflection window opened.</li>
                  <li>Corrected workstation alignment of the lead product strategist.</li>
                </ul>
              </div>

              <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0] text-[11px]">
                <strong className="text-[#1B2838]">Outcome:</strong> Closed a competitive institutional round led by a Tier-1 venture firm within the target window.
              </div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                Corporate Services • Mumbai
              </span>
              <span className="bg-[#F7F6F3] text-[#5A6472] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#E2E8F0]">
                Boardroom &amp; Partner Alignment
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838]">
              Mid-Tier Law &amp; Tax Firm: Eliminating Partner Friction in New Headquarters
            </h3>

            <div className="space-y-3 text-xs text-[#5A6472]">
              <div>
                <strong className="text-[#1B2838]">The Operational Challenge:</strong>
                <p className="mt-1">
                  Following relocation to a premium commercial tower in BKC, senior equity partners experienced escalating friction over billing allocations, accompanied by unexpected associate turnover.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Strategic Diagnostic:</strong>
                <p className="mt-1">
                  Audit revealed that the managing partner&apos;s cabin faced directly toward a cut in the building&apos;s north-west zone, inducing constant disputes and flight instinct among key personnel.
                </p>
              </div>

              <div>
                <strong className="text-[#1B2838]">Actionable Solution:</strong>
                <ul className="mt-1 space-y-1 list-disc pl-4">
                  <li>Applied elemental brass and wood boundary balancing remedies without changing physical walls.</li>
                  <li>Reallocated senior partner conference seating based on strategic orientation.</li>
                  <li>Delivered a 16-page written spatial and partnership harmony protocol.</li>
                </ul>
              </div>

              <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0] text-[11px]">
                <strong className="text-[#1B2838]">Outcome:</strong> Restored executive consensus and retained all senior associates during annual appraisal cycle.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-[#1B2838] text-[#F7F6F3] p-10 rounded-lg border border-[#2A3D54] space-y-4">
          <h2 className="text-2xl font-bold">
            Face an Urgent Commercial Milestone or Spatial Dilemma?
          </h2>
          <p className="text-xs text-[#8C96A5] max-w-lg mx-auto">
            Book an executive consultation with Niraj Kumar. Every engagement is strictly confidential and backed by both a live session and a written diagnostic report.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/intake"
              className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Submit Your Business Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
