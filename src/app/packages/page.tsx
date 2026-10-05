import Link from "next/link";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";
import { BRAND } from "@/lib/constants/brand";
import { CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata = {
  title: `Advisory Packages & Pricing | ${BRAND.name}`,
  description:
    "Explore transparent, flat-fee consulting packages for commercial Vastu and strategic business timing. Direct advisory with Niraj Kumar.",
};

export default function PackagesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          {/* PLACEHOLDER: replace with client-approved content */}
          Transparent Executive Engagements
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Advisory Packages &amp; Scope
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Flat, one-time fees with zero per-minute meters or subscriptions. Every package guarantees both a focused live session and an exhaustive written strategic PDF report.
        </p>

        {/* Dual Delivery Guarantee Pill */}
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs text-[#5A6472]">
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Live Strategy Call (WhatsApp or Google Meet)
          </span>
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Written Strategic Diagnostic Report PDF
          </span>
          <span className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            Direct Follow-Up Window with Niraj Kumar
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CONSULTING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-lg p-8 flex flex-col justify-between border ${
                pkg.popular
                  ? "bg-[#FFFFFF] border-2 border-[#1B2838] shadow-xl relative"
                  : "bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:border-[#1B2838]/50"
              } transition-all`}
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
                      Most Chosen
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A6472] leading-relaxed">{pkg.subtitle}</p>

                <div className="pt-2 border-t border-[#E2E8F0]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#1B2838]">
                      ₹{pkg.priceINR.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#5A6472]">/ ${pkg.priceUSD} USD</span>
                  </div>
                  <span className="text-[11px] text-[#8C96A5]">
                    Flat one-time fee • No hidden charges
                  </span>
                </div>

                {/* Scope Breakdown */}
                <div className="space-y-3 pt-2 text-xs">
                  <p className="font-bold text-[#1B2838] uppercase tracking-wide text-[11px]">
                    Included Scope &amp; Deliverables:
                  </p>

                  <div className="space-y-2 text-[#5A6472]">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2838]">Live Strategy Session:</strong>
                        <p>{pkg.deliverables.liveSession}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2838]">Written Diagnostic Report:</strong>
                        <p>{pkg.deliverables.writtenReport}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2838]">Milestone Timing Matrix:</strong>
                        <p>{pkg.deliverables.timingAudit}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2838]">Commercial Vastu Alignment:</strong>
                        <p>{pkg.deliverables.spatialAudit}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2838]">Follow-up Window:</strong>
                        <p>{pkg.deliverables.followUp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target profile */}
                <div className="p-3 bg-[#F7F6F3] rounded text-[11px] text-[#5A6472]">
                  <strong className="text-[#1B2838]">Target Fit:</strong> {pkg.targetAudience}
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 space-y-2">
                <Link
                  href={`/checkout?package=${pkg.id}`}
                  className={`block w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                    pkg.popular
                      ? "bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] shadow-md"
                      : "bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3]"
                  }`}
                >
                  Book Package Now
                </Link>
                <Link
                  href={`/intake?package=${pkg.id}`}
                  className="block w-full py-2 text-center text-[11px] font-semibold text-[#5A6472] hover:text-[#1B2838]"
                >
                  Or Submit Profile First
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Quote Request Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold text-[#1B2838]">
              Need a Bespoke Engagement or Multi-Site Corporate Audit?
            </h3>
            <p className="text-xs text-[#5A6472] leading-relaxed">
              For complex multi-city retail networks, manufacturing industrial plants, institutional mergers, or physical on-site audit visits across India, our advisory desk issues structured custom quotes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/intake?mode=custom-quote"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BRAND.contact.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#F7F6F3] hover:bg-[#E2E8F0] text-[#1B2838] px-5 py-3 rounded text-xs font-semibold border border-[#E2E8F0]"
            >
              <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
              <span>Discuss via WhatsApp</span>
            </a>
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
              All live consultations are conducted strictly via <strong>Google Meet</strong> or direct <strong>WhatsApp Call</strong> (+91 93112 15564). We deliberately do not use unstable in-app calling tools to guarantee crystal-clear recording and screen sharing of floor plans.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              When and how is the written report delivered?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              Your written diagnostic PDF report is delivered to your authenticated client portal within 5 to 7 business days following your live consultation. You will also receive an automated email notification with secure download links.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded border border-[#E2E8F0] space-y-1.5">
            <h4 className="font-bold text-[#1B2838] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C9A24B]" />
              What payment methods are supported?
            </h4>
            <p className="text-[#5A6472] leading-relaxed">
              We accept Indian payments (UPI, NetBanking, Debit/Credit Cards) via Razorpay, and International cards in USD via Stripe. All engagements are flat, one-time fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
