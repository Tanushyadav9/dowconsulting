import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { EcosystemCrossPromotion } from "@/components/home/EcosystemCrossPromotion";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HonestEngagementProof } from "@/components/home/HonestEngagementProof";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Search,
  Building,
  Rocket,
  Users,
  MessageSquare,
  Award,
  ChevronRight,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="bg-[#1B2838] text-[#F7F6F3] pt-16 pb-24 border-b border-[#2A3D54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111B27] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse"></span>
                <span>BUSINESS CONSULTING PRACTICE [DRAFT]</span>
              </div>

              {/* Draft Headline pending client confirmation */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F6F3] leading-[1.15]">
                  Business consulting for startups, small companies and MSMEs.
                </h1>
                <p className="text-xs text-[#C9A24B] font-medium tracking-wide">
                  [Draft headline pending client confirmation]
                </p>
              </div>

              <p className="text-lg text-[#E2E8F0] font-normal leading-relaxed max-w-2xl">
                A dedicated business consulting team delivering go-to-market (GTM) strategy, market research, business expansion strategy, and new business start consultation.
              </p>

              {/* Core Non-Negotiables Callout */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#8C96A5]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Focused on Startups, Small Companies &amp; MSMEs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Team Model: Research, Consulting &amp; Information Collection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>4 Confirmed Practice Areas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Lead Strategic Advisor: Niraj Kumar</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/intake"
                  className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-8 py-3.5 rounded font-bold text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg"
                >
                  <span>Submit Business Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={BRAND.contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-[#111B27] hover:bg-[#2A3D54] border border-[#2A3D54] text-[#F7F6F3] px-6 py-3.5 rounded font-semibold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
                  <span>Connect via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Card: Lead Strategic Advisor Personal Credentials */}
            <div className="lg:col-span-5">
              <div className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A3D54] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F7F6F3]">{BRAND.founder.name}</h3>
                    <p className="text-xs text-[#C9A24B] uppercase tracking-wider font-semibold">
                      {BRAND.founder.title}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-[#C9A24B]" />
                </div>

                <div className="space-y-4 text-xs text-[#8C96A5]">
                  <div>
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Corporate Operating Background:</p>
                    <p className="text-[#F7F6F3] leading-relaxed">
                      &ldquo;{BRAND.founder.corporateExperience}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Academic &amp; Executive Credentials:</p>
                    <ul className="space-y-1.5 pl-4 list-disc marker:text-[#C9A24B]">
                      {BRAND.founder.credentials.map((cred) => (
                        <li key={cred} className="text-[#E2E8F0]">{cred}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-[#8C96A5] italic border-t border-[#2A3D54] pt-3">
                    Note: Credentials quoted in client-supplied wording and attributed to Niraj Kumar personally. DOW Consulting makes no outcome claims, statistics, or firm-level history claims.
                  </p>

                  <div className="pt-2 border-t border-[#2A3D54] flex items-center justify-between">
                    <span className="text-[11px] text-[#8C96A5]">Sister Brand Founder:</span>
                    <span className="text-xs text-[#C9A24B] font-semibold">Aapka Astro &amp; Viar.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Confirmed Service Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-[#8C6A1E] text-xs font-bold uppercase tracking-wider">
            <span>Confirmed Services [Draft Copy]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            Core Business Consulting Services
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Tailored advisory services structured for startups, small companies, and MSMEs. All descriptions represent general draft outlines pending final client confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1: GTM Strategy */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2838]">GTM Strategy</h3>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Go-to-market strategy for bringing new offerings to market: defining target buyer personas, value positioning, distribution channels, pricing frameworks, and initial launch roadmaps.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Link
                href="/services/gtm-strategy"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
              >
                <span>Explore GTM Strategy</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 2: Market Research */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2838]">Market Research</h3>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Structured research into sector dynamics, competitive benchmarking, customer pain points, addressable market scoping, and actionable industry intelligence to inform strategic decisions.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Link
                href="/services/market-research"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
              >
                <span>Explore Market Research</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 3: Business Expansion Strategy */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2838]">Business Expansion Strategy</h3>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Advisory for scaling existing operations: geographical reach, multi-city or multi-channel expansion, new service line introductions, operational workflows, and resource allocation.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Link
                href="/services/business-expansion-strategy"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
              >
                <span>Explore Expansion Strategy</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 4: New Business Start Consultation */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2838]">New Business Start Consultation</h3>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Foundational guidance for new business initiatives and early-stage ventures: concept validation, business model structuring, initial operating priorities, and feasibility evaluation.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Link
                href="/services/new-business-start-consultation"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
              >
                <span>Explore Start Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Honest Social Proof Substitutes: Methodology, Deliverable Outline & Intake Preparation */}
      <HonestEngagementProof />

      {/* 4. Packages & Proposals Notice (Pending Client Confirmation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#2A3D54] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
                Advisory Proposals [Draft]
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
                Structured Business Consulting Engagements
              </h2>
              <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
                Package names, exact pricing, call durations, and report turnarounds are pending client confirmation. In the interim, advisory engagements are formulated around your business stage, target market, and strategic scope via custom proposal requests.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/intake?mode=custom-quote"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3.5 rounded font-semibold text-xs border border-[#2A3D54] transition-colors"
              >
                <span>View Engagement Overview</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-[#8C96A5]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>Tailored to startups, small businesses, and MSMEs</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>Multi-disciplinary consulting team support</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>Clear scope definition prior to formal engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Verified Client Testimonials (Renders NULL when count is 0) */}
      <TestimonialsSection />

      {/* 6. Sister Ecosystem Cross-Promotion */}
      <EcosystemCrossPromotion />

      {/* 6. Office Coordinates & Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#1B2838]">
          Ready to Consult with Our Advisory Team?
        </h2>
        <p className="text-sm text-[#5A6472] max-w-2xl mx-auto">
          Share your enterprise specifics with our advisory desk. Our team reviews each intake to prepare relevant research and strategic consultation for your business.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            href="/intake"
            className="inline-flex justify-center items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Complete Intake Form</span>
            <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
          </Link>
          <a
            href={BRAND.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
