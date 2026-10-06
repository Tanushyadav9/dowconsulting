import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: `Client Confidentiality & Engagements | ${BRAND.name}`,
  description:
    "Information regarding client advisory engagements and confidentiality policies at DOW Consulting.",
};

export default function CaseStudiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Confidentiality &amp; Case Studies
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
          Client Advisory Engagements
        </h1>
        <p className="text-sm text-[#5A6472] max-w-xl mx-auto leading-relaxed">
          All strategic timing audits and commercial Vastu engagements conducted by Niraj Kumar are held under strict non-disclosure.
        </p>
      </div>

      {/* Notice Card */}
      <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6 text-center">
        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#C9A24B] flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#1B2838]">
          Verified Case Studies Pending Client Authorization
        </h2>
        <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed max-w-lg mx-auto">
          We do not publish simulated or unconfirmed client outcomes. Specific engagement case summaries and references are shared directly with prospective clients during one-on-one advisory reviews under mutual confidentiality agreements.
        </p>

        <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#1B2838] text-xs font-bold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
          >
            <span>Submit Business Profile for Direct Review</span>
            <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#CBD5E1] text-xs font-semibold text-[#1B2838] hover:bg-[#F7F6F3] transition-colors"
          >
            <span>Contact Principal Desk</span>
          </Link>
        </div>
      </div>

      {/* Advisory Standards Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5A6472]">
        <div className="p-4 rounded bg-[#FFFFFF] border border-[#E2E8F0] flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1B2838]">Strict NDA Protection</strong>
            <p className="mt-0.5">Corporate lease details, financial desk placements, and executive timing schedules remain private.</p>
          </div>
        </div>
        <div className="p-4 rounded bg-[#FFFFFF] border border-[#E2E8F0] flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1B2838]">Direct Founder Engagement</strong>
            <p className="mt-0.5">Every review is conducted personally by Niraj Kumar with dual delivery (Live Call + PDF Report).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
