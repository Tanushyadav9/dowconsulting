import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users,
  Award,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: `Market Research | ${BRAND.name}`,
  description:
    "Market research consulting for startups, small companies, and MSMEs. Industry landscape analysis, competitive benchmarking, and team delivery model. [Draft copy]",
};

export default function MarketResearchPage() {
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
          <Search className="w-3.5 h-3.5" />
          <span>Confirmed Service [Draft Copy]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Market Research
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-3xl leading-relaxed">
          Structured research and industry investigation designed for <strong>startups, small companies, and MSMEs</strong> seeking objective insights before committing resources.
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
              What Market Research Typically Involves
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
              Market research provides business decision-makers with a grounded view of their operating environment. In general terms, advisory engagements in this area focus on several standard investigative areas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Industry &amp; Sectoral Dynamics</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Reviewing sector structure, regulatory parameters, emerging category trends, and macro supply-demand patterns relevant to the client&apos;s product or service.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Competitor Benchmarking</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Analyzing direct and indirect competitors, cataloging product features, pricing models, market positioning, and visible market vulnerabilities.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Customer Need &amp; Pain Point Analysis</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Gathering insights into customer friction points, unmet expectations, purchasing behavior, and feedback on existing market solutions.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Market Opportunity Scoping</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Identifying unserved or underserved niches, potential expansion angles, and data-backed observations to guide strategic roadmap planning.
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
              <span>Collaborative Execution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Team-Based Research Execution
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              DOW Consulting is an advisory team where different specialists focus on distinct aspects of each research mandate:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">1. Information Collection</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Team members collect background context from the client regarding specific research questions, target segments, and geographic focus.
              </p>
            </div>

            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">2. Dedicated Research</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Research team members gather secondary data, sector reports, competitive literature, and industry observations.
              </p>
            </div>

            <div className="p-4 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <h4 className="font-bold text-sm text-[#F7F6F3]">3. Strategic Synthesis</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Lead advisor Niraj Kumar and consulting staff interpret data points into practical, actionable business takeaways for the client.
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
            Need Targeted Market Research for Your Business?
          </h3>
          <p className="text-xs text-[#5A6472] max-w-md mx-auto">
            Submit your research inquiries or business profile through our intake form to discuss research scope and arrangements.
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
