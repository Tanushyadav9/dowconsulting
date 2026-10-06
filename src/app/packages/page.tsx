import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants/brand";
import { CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, HelpCircle, FileText, Calendar, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Advisory Engagements & Proposals | ${BRAND.name}`,
  description:
    "Tailored executive advisory bridging senior corporate retail leadership with strategic commercial Vastu and milestone timing.",
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
          Executive Advisory Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Strategic Engagements &amp; Proposals
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Direct advisory led by <strong>{BRAND.founder.name}</strong>. Engagements are formulated around your commercial footprint, operational complexity, and critical expansion milestones.
        </p>

        {/* Dual Delivery Guarantee Pill */}
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs text-[#5A6472]">
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Live Strategy Call (WhatsApp Call or Google Meet)
          </span>
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Comprehensive Written Strategic PDF Report
          </span>
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Direct Clarification Window with Niraj Kumar
          </span>
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
                        Most Selected
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
                Tailored Executive Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
                Request a Bespoke Advisory Proposal
              </h2>
              <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
                Rather than generic predetermined price tiers, Niraj Kumar formulates structured proposals calibrated to your enterprise scale, facility floor plans, and critical decision calendars.
              </p>
            </div>

            {/* Structured Scope Architecture Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#2A3D54]">
              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">Strategic Milestone Timing</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Founder cycle audits, lease signing timing, brand launches, leadership transitions, and capital deployment windows.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">Commercial Vastu Alignment</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Retail outlets, corporate HQs, industrial manufacturing sheds, and warehouse spatial zoning with zero structural demolition.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#1B2838] p-5 rounded-lg border border-[#2A3D54]">
                <div className="w-10 h-10 rounded bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#F7F6F3]">Dual Deliverable Guarantee</h3>
                <p className="text-xs text-[#8C96A5] leading-relaxed">
                  Every engagement includes both an executive live strategy call and a comprehensive written strategic PDF report.
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

      {/* Bespoke / Custom Engagements Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold text-[#1B2838]">
              Multi-Facility, Enterprise &amp; On-Site Spatial Audits
            </h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              For complex manufacturing plants, multi-city retail networks, or physical on-site audit visits across India, our advisory desk formulates bespoke enterprise quotes with custom deliverable scopes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/intake?mode=custom-quote"
              className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Submit Enterprise Request</span>
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
              How are consultations conducted?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              All live consultations are conducted strictly via <strong>Google Meet</strong> or direct <strong>WhatsApp Call</strong> (+91 93112 15564). We deliberately do not use unstable third-party in-app calling tools to guarantee high-definition recording and screen sharing of floor plans.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              When and how is the written report delivered?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              Your written strategic diagnostic PDF report is delivered to your authenticated client portal following your live consultation. You will also receive an automated email notification with secure download links.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              What payment methods are supported?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              We accept Indian payments (UPI, NetBanking, Debit/Credit Cards) via Razorpay, and International payments in USD via Stripe. All engagements are flat, one-time retainers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
