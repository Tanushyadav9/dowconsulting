import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";
import {
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  HelpCircle,
  FileText,
  Rocket,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: `Engagement Models & Proposals | ${BRAND.name}`,
  description:
    "Tailored business consulting engagement models across GTM strategy, market research, business expansion, and new business start consultation for startups, small companies, and MSMEs. [Draft copy]",
};

export default function PackagesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Advisory Engagement Models [Draft Copy]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Advisory Engagements &amp; Proposals
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Business consulting for <strong>startups, small companies, and MSMEs</strong> led by Lead Strategic Advisor <strong>{BRAND.founder.name}</strong> and our multidisciplinary consulting team.
        </p>

        {/* Pending Client Confirmation Notice */}
        <div className="p-3 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E] max-w-xl mx-auto">
          <strong>Notice:</strong> Standard package names, pricing tiers, call durations, and turnaround times are pending client confirmation. All engagements are scoped individually via custom proposals.
        </div>
      </section>

      {/* Engagement Models Grid */}
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#111B27] px-2.5 py-1 rounded">
                      {pkg.badge || "Advisory Scope [Draft]"}
                    </span>
                    <h3 className="text-xl font-bold text-[#1B2838] mt-2">{pkg.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-[#5A6472] leading-relaxed">{pkg.subtitle}</p>

                <div className="p-3 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs text-[#1B2838]">
                  <p className="font-semibold text-[11px] uppercase tracking-wider text-[#8C96A5] mb-1">
                    Engagement Structure:
                  </p>
                  <p className="font-medium text-[#1B2838]">Custom Proposal Based on Scope</p>
                  <p className="text-[11px] text-[#5A6472] mt-0.5">
                    Tailored diagnostic review &amp; strategic deliverable
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#1B2838]">
                    Scope Inclusions:
                  </p>
                  <ul className="space-y-2 text-xs text-[#5A6472]">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Enquiry Actions */}
              <div className="pt-6 border-t border-[#E2E8F0] space-y-2.5">
                <a
                  href={ENQUIRY_CONFIG.buildWhatsAppUrl(
                    `Hello Niraj / DOW Consulting, I would like to discuss the scope and proposal for: ${pkg.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enquire via WhatsApp</span>
                </a>

                <a
                  href={ENQUIRY_CONFIG.phone.telLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-2.5 rounded text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Call to Discuss Scope</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Engagements Work */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
              Engagement Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              How Consulting Engagements Work
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              We do not believe in transactional one-size-fits-all advisory packages. Every business has distinct market dynamics, team capabilities, and strategic bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div className="p-5 rounded-lg bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <span className="text-2xl font-black text-[#C9A24B]">01</span>
              <h3 className="text-sm font-bold text-[#F7F6F3]">Direct Enquiry</h3>
              <p className="text-xs text-[#8C96A5]">
                Contact our advisory desk directly via phone call or WhatsApp to share your company background and immediate objectives.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <span className="text-2xl font-black text-[#C9A24B]">02</span>
              <h3 className="text-sm font-bold text-[#F7F6F3]">Diagnostic Discussion</h3>
              <p className="text-xs text-[#8C96A5]">
                The consultant reviews your commercial context, questions your market assumptions, and defines key areas requiring exploration.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <span className="text-2xl font-black text-[#C9A24B]">03</span>
              <h3 className="text-sm font-bold text-[#F7F6F3]">Custom Proposal</h3>
              <p className="text-xs text-[#8C96A5]">
                A clear written scope proposal outlines specific deliverables, research depth, advisory sessions, and milestone timelines.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <span className="text-2xl font-black text-[#C9A24B]">04</span>
              <h3 className="text-sm font-bold text-[#F7F6F3]">Execution &amp; Debrief</h3>
              <p className="text-xs text-[#8C96A5]">
                Our specialists conduct research and strategic synthesis. Niraj Kumar reviews deliverables before client debrief.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A3D54] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8C96A5]">
            <div className="flex items-center gap-2 text-[#E2E8F0]">
              <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span>No transactional checkouts, accounts, or automated billing. The consultant coordinates directly with you.</span>
            </div>
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="text-[#C9A24B] hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
