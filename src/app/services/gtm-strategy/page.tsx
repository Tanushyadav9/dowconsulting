import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  Rocket,
  CheckCircle2,
  ArrowLeft,
  Award,
  MessageSquare,
  Phone,
  Video,
  Users,
} from "lucide-react";

export const metadata = {
  title: `Go-to-Market Strategy & Distribution | ${BRAND.name}`,
  description:
    "Go-to-market strategy and distribution consulting for start-ups, small companies and MSMEs led by Niraj Kumar, Consultant.",
};

export default function GTMStrategyPage() {
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
          <Rocket className="w-3.5 h-3.5" />
          <span>Practice Area</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Go-to-Market Strategy &amp; Distribution
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-3xl leading-relaxed">
          Structured go-to-market and distribution advisory designed for <strong>start-ups, small companies and MSMEs</strong> preparing to launch or scale commercial offerings.
        </p>
      </section>

      {/* Overview & What It Involves */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#1B2838]">
              What GTM Strategy &amp; Distribution Involves
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
              Go-to-market strategy and distribution architecture focuses on how your business effectively penetrates target markets and builds durable sales channels:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Target Customer Profiling</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Defining ideal customer profiles (ICPs), buyer personas, customer segments, and commercial buying criteria.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Value Proposition &amp; Positioning</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Articulating clear product differentiation and core positioning that distinguishes the offering against existing similar products.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Distribution &amp; Channel Architecture</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Evaluating direct vs. indirect channels, distributor networks, retail placement, or B2B sales pipelines depending on the business model.
              </p>
            </div>

            <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                <span>Launch Roadmap &amp; Rollout</span>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                Outlining phased launch milestones, commercial readiness checklists, and key operational activities to support market entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility & Consultant Profile */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            <Award className="w-4 h-4" />
            <span>Consultant Credentials</span>
          </div>
          <h2 className="text-xl font-bold text-[#1B2838]">
            Advisory Background: {BRAND.consultant.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Credibility for DOW Consulting is anchored in Niraj Kumar&apos;s executive background:
          </p>
          <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs text-[#1B2838] space-y-2">
            <p className="font-semibold text-sm">
              &ldquo;{BRAND.consultant.background}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Direct Enquiry CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#F7F6F3] p-8 rounded-lg border border-[#E2E8F0] space-y-4">
          <h3 className="text-xl font-bold text-[#1B2838]">
            Discuss Your Go-to-Market &amp; Distribution Objectives
          </h3>
          <p className="text-xs text-[#5A6472] max-w-md mx-auto">
            Connect directly with Consultant Niraj Kumar to discuss your commercial roadmap.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="inline-flex justify-center items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#C9A24B]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <a
              href={ENQUIRY_CONFIG.buildWhatsAppUrl(
                "Hello Niraj / DOW Consulting, I would like to enquire about Go-to-Market Strategy and Distribution for my business."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F6F3] border border-[#CBD5E1] text-[#1B2838] px-6 py-3 rounded font-semibold text-xs"
            >
              <span>Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
