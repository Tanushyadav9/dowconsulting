import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";
import { EcosystemCrossPromotion } from "@/components/home/EcosystemCrossPromotion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Calendar,
  Compass,
  FileText,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Award,
  ChevronRight,
  ExternalLink,
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
                <span>EXECUTIVE ADVISORY PRACTICE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F6F3] leading-[1.15]">
                Strategic Business Timing &amp;{" "}
                <span className="text-[#C9A24B]">Commercial Vastu</span>
              </h1>

              <p className="text-lg text-[#E2E8F0] font-normal leading-relaxed max-w-2xl">
                Bridging two decades of senior corporate retail and enterprise operating leadership with structured spatial alignment and milestone timing intelligence.
              </p>

              {/* Core Non-Negotiables Callout */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#8C96A5]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Dual Delivery: Live Call + Written Report</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>WhatsApp Call or Google Meet Direct</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Fixed Advisory Engagements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Led Directly by Niraj Kumar</span>
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
                  <span>WhatsApp Principal Desk</span>
                </a>
              </div>
            </div>

            {/* Right Card: Principal Credentials */}
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
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Corporate Operating Experience:</p>
                    <p className="text-[#F7F6F3] leading-relaxed">
                      {BRAND.founder.corporateExperience}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Academic &amp; Executive Credentials:</p>
                    <ul className="space-y-1 pl-4 list-disc marker:text-[#C9A24B]">
                      {BRAND.founder.credentials.map((cred) => (
                        <li key={cred} className="text-[#E2E8F0]">{cred}</li>
                      ))}
                    </ul>
                  </div>

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

      {/* 2. Three Pillars of the Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs font-bold text-[#C9A24B] tracking-widest uppercase">
            The Executive Advisory Distinction
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            Corporate Rigor Meets Spatial &amp; Timing Precision
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Standard business consulting overlooks environmental spatial friction and cosmic timing. Traditional spiritual advice ignores P&amp;L dynamics, balance sheets, and team structures. DOW Consulting bridges both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-8 rounded border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors">
            <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2838]">Strategic Milestone Timing</h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              Identifying high-velocity windows for product rollouts, contract closures, corporate restructuring, and capital deployment. We calculate inflection periods to minimize friction and maximize capital efficiency.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors">
            <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2838]">Commercial Vastu &amp; Zoning</h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              Structuring commercial real estate, corporate offices, retail stores, and warehouses. Practical, non-demolition alignments for revenue zones, executive leadership cabins, accounts desks, and workforce stability.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors">
            <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2838]">Actionable Written Blueprint</h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              Every consultation is anchored in a comprehensive, customized strategic PDF report. You receive architectural notes, directional zone allocations, operational timelines, and a 14 to 30-day WhatsApp follow-up window.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Three-Step Workflow */}
      <section className="bg-[#FFFFFF] py-20 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <p className="text-xs font-bold text-[#C9A24B] tracking-widest uppercase">Structured Engagement</p>
            <h2 className="text-3xl font-bold text-[#1B2838]">How the Advisory Process Works</h2>
            <p className="text-xs text-[#5A6472]">A streamlined corporate client journey designed for busy founders and executives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="relative p-6 space-y-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <div className="text-2xl font-black text-[#C9A24B]">01</div>
              <h4 className="font-bold text-[#1B2838]">Detailed Intake Assessment</h4>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Submit business specifics via our multi-step intake form: commercial location, operating stage, team size, premises layout, strategic goals, and current bottlenecks.
              </p>
            </div>

            <div className="relative p-6 space-y-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <div className="text-2xl font-black text-[#C9A24B]">02</div>
              <h4 className="font-bold text-[#1B2838]">Diagnostic Call with Niraj Kumar</h4>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                A focused 60 to 90-minute live session via Google Meet or WhatsApp call. Direct review of floor plans, executive timing cycles, and immediate operational remedies.
              </p>
            </div>

            <div className="relative p-6 space-y-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <div className="text-2xl font-black text-[#C9A24B]">03</div>
              <h4 className="font-bold text-[#1B2838]">Written Report &amp; Follow-up Window</h4>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Receive your comprehensive strategic PDF dossier in your secure client portal, followed by direct WhatsApp coordination during implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Packages & Transparent Pricing Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-[#C9A24B] tracking-widest uppercase">
              {/* PLACEHOLDER: replace with client-approved content */}
              Starting Advisory Packages
            </p>
            <h2 className="text-3xl font-bold text-[#1B2838]">Transparent, Flat Engagements</h2>
            <p className="text-xs text-[#5A6472] mt-1">
              One-time fixed professional fees. Self-serve booking or custom enterprise quote options.
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
          >
            <span>Compare full package matrix</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONSULTING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-lg p-8 flex flex-col justify-between border ${
                pkg.popular
                  ? "bg-[#FFFFFF] border-[#1B2838] shadow-lg relative"
                  : "bg-[#FFFFFF] border-[#E2E8F0] shadow-sm"
              }`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                      {pkg.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#1B2838] mt-1">{pkg.name}</h3>
                  </div>
                  {pkg.popular && (
                    <span className="bg-[#1B2838] text-[#F7F6F3] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A6472] leading-relaxed">{pkg.subtitle}</p>

                <div className="pt-2 border-t border-[#E2E8F0]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#1B2838]">
                      ₹{pkg.priceINR.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#5A6472]">/ ${pkg.priceUSD} USD</span>
                  </div>
                  <span className="text-[11px] text-[#8C96A5]">Flat one-time fee • Includes Call &amp; PDF Report</span>
                </div>

                <div className="space-y-2.5 text-xs text-[#5A6472]">
                  <p className="font-semibold text-[#1B2838]">Key Deliverables:</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <span>{pkg.deliverables.liveSession}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <span>{pkg.deliverables.writtenReport}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <span>{pkg.deliverables.followUp}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/checkout?package=${pkg.id}`}
                  className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                    pkg.popular
                      ? "bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3]"
                      : "bg-[#F7F6F3] hover:bg-[#E2E8F0] text-[#1B2838] border border-[#E2E8F0]"
                  }`}
                >
                  Select Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Sister Ecosystem Cross-Promotion */}
      <EcosystemCrossPromotion />

      {/* 7. Office Address & Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#1B2838]">
          Ready to Align Your Strategic Timing &amp; Commercial Space?
        </h2>
        <p className="text-sm text-[#5A6472] max-w-2xl mx-auto">
          Share your enterprise details with our advisory desk. Niraj Kumar reviews each intake directly to provide meaningful, high-conviction guidance.
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
