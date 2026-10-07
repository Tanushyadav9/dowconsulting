import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants/brand";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  HelpCircle,
  FileText,
  Rocket,
  Search,
  TrendingUp,
  Building,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Advisory Engagements & Proposals | ${BRAND.name}`,
  description:
    "Tailored business consulting proposals across GTM strategy, market research, business expansion, and new business start consultation for startups, small companies, and MSMEs. [Draft copy]",
};

export default async function PackagesPage() {
  let publishedPackages: any[] = [];

  try {
    publishedPackages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { priceINR: "asc" },
    });
  } catch (error) {
    console.warn("Unable to fetch published packages from database; defaulting to proposal view:", error);
  }

  const hasPublishedPackages = publishedPackages.length > 0;

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Advisory Proposals [Draft Copy]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Advisory Engagements &amp; Proposals
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Business consulting for <strong>startups, small companies, and MSMEs</strong> led by Lead Strategic Advisor <strong>{BRAND.founder.name}</strong> and our multidisciplinary consulting team.
        </p>

        {/* Pending Client Confirmation Notice */}
        <div className="p-3 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E] max-w-xl mx-auto">
          <strong>Notice:</strong> Package names, pricing, call durations, and turnaround times are pending client confirmation. Engagements are currently initiated via custom scope proposals.
        </div>
      </section>

      {/* Main Content: If packages are published, display them; if none are published, display proposal mode */}
      {hasPublishedPackages ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {publishedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg p-8 flex flex-col justify-between border ${
                  pkg.isPopular
                    ? "bg-[#FFFFFF] border-2 border-[#1B2838] shadow-xl relative"
                    : "bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:border-[#1B2838]/50"
                } transition-all`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-[#1B2838] mt-1">{pkg.name}</h3>
                    </div>
                    {pkg.isPopular && (
                      <span className="bg-[#1B2838] text-[#F7F6F3] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {pkg.subtitle && (
                    <p className="text-xs text-[#5A6472] leading-relaxed">{pkg.subtitle}</p>
                  )}

                  <div className="pt-2 border-t border-[#E2E8F0]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#1B2838]">
                        ₹{pkg.priceINR.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#5A6472]">/ ${pkg.priceUSD} USD</span>
                    </div>
                    <span className="text-[11px] text-[#8C96A5]">
                      Flat one-time fee • Scope-defined
                    </span>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3 pt-2 text-xs">
                    <p className="font-bold text-[#1B2838] uppercase tracking-wide text-[11px]">
                      Scope &amp; Inclusions:
                    </p>
                    <div className="space-y-2 text-[#5A6472]">
                      {pkg.inclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-2">
                  <Link
                    href={`/checkout?package=${pkg.slug}`}
                    className="block w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded transition-colors bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] shadow-md"
                  >
                    Confirm Engagement
                  </Link>
                  <Link
                    href={`/intake?package=${pkg.slug}`}
                    className="block w-full py-2 text-center text-[11px] font-semibold text-[#5A6472] hover:text-[#1B2838]"
                  >
                    Or Submit Business Intake First
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* PROPOSAL CALL TO ACTION VIEW (When No Packages Are Published) */
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-8">
            <div className="space-y-3 max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
                Tailored Consulting Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
                Request a Tailored Consulting Proposal
              </h2>
              <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
                While standardized packages and pricing remain pending client confirmation, DOW Consulting structures custom proposals formulated around your business stage, target audience, and operating objectives.
              </p>
            </div>

            {/* Scope Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#2A3D54]">
              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">GTM &amp; Market Research</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Target customer profiling, competitor benchmarking, positioning review, and launch sequencing.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">Expansion &amp; Scaling</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Geographic rollout evaluation, product line extension, and operational capability assessment.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">New Business Starts</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Early venture concept validation, business model structuring, and foundational milestone planning.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#2A3D54] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/intake?mode=custom-quote"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-8 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <span>Request a Proposal for Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={BRAND.contact.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-4 rounded font-semibold text-xs border border-[#2A3D54] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
                <span>Discuss Scope via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Custom Engagements Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold text-[#1B2838]">
              Custom Scope for MSMEs &amp; Multi-Team Operations
            </h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              For MSMEs with multi-branch footprints, complex supply chains, or custom advisory assignments, our team formulates bespoke proposals with clear deliverables.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/intake?mode=custom-quote"
              className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Submit Custom Request</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ on Advisory Logistics */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-xl font-bold text-[#1B2838] text-center">
          Frequently Asked Questions on Engagements
        </h3>
        <div className="space-y-4 text-xs">
          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              Who conducts the consultations?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              DOW Consulting operates as a team. Research specialists conduct market investigation, information coordinators gather intake specifics, and Lead Strategic Advisor Niraj Kumar and consulting staff conduct client advisory sessions.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              How are consultations scheduled and delivered?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              Consultation scheduling methods, call durations, and report turnaround timelines are currently arranged on a per-engagement basis pending final client confirmation.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              What payment methods are supported?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              Payment facilities support Razorpay (for domestic INR transactions) and Stripe (for international USD transactions) upon confirmed quote or package agreement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
