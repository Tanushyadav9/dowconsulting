import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users,
  Award,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: `Business Expansion Strategy | ${BRAND.name}`,
  description:
    "Business expansion strategy consulting for startups, small companies, and MSMEs. Scaling operations, multi-location rollouts, and team delivery model. [Draft copy]",
};

export default function BusinessExpansionStrategyPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Breadcrumb / Back Link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6472] hover:text-[#1B2838]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Consulting Services</span>
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Confirmed Service [Draft Copy]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Business Expansion Strategy
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-3xl leading-relaxed">
          Structured expansion advisory designed for <strong>startups, small companies, and MSMEs</strong> planning to scale operations, enter new geographic markets, or introduce new service lines.
        </p>
        <div className="p-3 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E] max-w-2xl">
          <strong>Draft Scope Notice:</strong> All descriptions on this page are general draft summaries pending final client wording and package definitions from Niraj Kumar.
        </div>
      </section>

      {/* Overview & What It Typically Involves */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#1B2838]">
              What Business Expansion Strategy Typically Involves
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
              Expanding a growing enterprise requires balancing commercial ambition with operational capacity. In general terms, advisory engagements in this area focus on several standard considerations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Geographic &amp; Regional Rollout Planning</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Evaluating new target cities, territories, or retail clusters; assessing local competitive presence, supply chain dependencies, and rollout phasing.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Product &amp; Service Line Diversification</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Structuring adjacencies in offerings; identifying how existing customer relationships and brand equity can be extended to complementary categories.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Operational Capacity &amp; Resource Mapping</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Reviewing staffing requirements, managerial bandwidth, inventory and supplier capabilities, and workflow adaptations necessary to handle increased volume.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Risk Management &amp; Phasing Frameworks</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Designing staged milestone gates and monitoring indicators to prevent overextension while executing expansion plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Model Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-lg p-8 sm:p-10 text-[#F7F6F3] border border-[#2A3D54] space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
              <Users className="w-4 h-4" />
              <span>Multi-Disciplinary Team Execution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Team-Based Expansion Consulting
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              DOW Consulting approaches expansion assignments collaboratively across specialized roles:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">1. Information Collection</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Team members gather data regarding your existing operational baseline, footprint, team structure, and expansion priorities.
              </p>
            </div>

            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">2. Expansion Research</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Research team members analyze potential new geographies, customer demographics, and competitor operational patterns.
              </p>
            </div>

            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">3. Strategic Advisory</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Lead advisor Niraj Kumar and consulting personnel formulate phased scaling recommendations and strategic roadmaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility & Advisor Profile */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            <Award className="w-4 h-4" />
            <span>Lead Strategic Advisor</span>
          </div>
          <h2 className="text-xl font-bold text-[#1B2838]">
            Advisory Background: Niraj Kumar
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Credibility for DOW Consulting is anchored in Niraj Kumar&apos;s personal executive background:
          </p>
          <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs text-[#1B2838] space-y-2">
            <p className="font-semibold text-sm">
              &ldquo;{BRAND.founder.corporateExperience}&rdquo;
            </p>
            <p className="text-[#5A6472]">
              Academic and Executive Credentials: <strong>B.Sc. (Hons.) in Physics</strong>, <strong>PGDBM in International Business &amp; Marketing</strong>, and an <strong>XLRI leadership development and change management certification</strong>.
            </p>
          </div>
          <p className="text-[11px] text-[#8C96A5] italic">
            Note: All credentials belong strictly to Niraj Kumar personally. DOW Consulting makes no outcome guarantees, statistics, or firm longevity claims.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#F7F6F3] p-8 rounded-lg border border-[#E2E8F0] space-y-4">
          <h3 className="text-xl font-bold text-[#1B2838]">
            Planning a Scale-Up or Expansion Phase?
          </h3>
          <p className="text-xs text-[#5A6472] max-w-md mx-auto">
            Share your enterprise scale and expansion goals through our intake form to discuss customized advisory scope.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/intake"
              className="inline-flex justify-center items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider"
            >
              <span>Submit Business Profile</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </Link>
            <a
              href={BRAND.contact.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
