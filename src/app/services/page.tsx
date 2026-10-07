import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  Rocket,
  Search,
  TrendingUp,
  Building,
  ArrowRight,
  Users,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: `Consulting Services | ${BRAND.name}`,
  description:
    "Explore business consulting services across GTM strategy, market research, business expansion strategy, and new business start consultation for startups, small companies, and MSMEs. [Draft copy]",
};

export default function ServicesPage() {
  const services = [
    {
      slug: "gtm-strategy",
      title: "GTM (Go-to-Market) Strategy",
      icon: Rocket,
      badge: "Market Entry",
      summary:
        "Structured go-to-market planning for product or service launches: target customer segmentation, positioning, pricing frameworks, sales channels, and rollout roadmaps.",
      typicalScope: [
        "Ideal customer profile (ICP) and buyer persona definition",
        "Value proposition and competitive positioning review",
        "Channel selection and route-to-market prioritization",
        "Launch milestone planning and sales readiness guidance",
      ],
    },
    {
      slug: "market-research",
      title: "Market Research",
      icon: Search,
      badge: "Industry Intelligence",
      summary:
        "Secondary and preliminary market exploration: industry structure, competitor benchmarking, customer pain point analysis, and addressable opportunity scoping.",
      typicalScope: [
        "Industry landscape and sectoral dynamics overview",
        "Competitor analysis and market gap identification",
        "Target audience pain point synthesis and demand trends",
        "Data-informed inputs for executive decision-making",
      ],
    },
    {
      slug: "business-expansion-strategy",
      title: "Business Expansion Strategy",
      icon: TrendingUp,
      badge: "Scaling & Growth",
      summary:
        "Strategic planning for growing enterprises: regional expansion, multi-location rollouts, service portfolio diversification, and operating scaling.",
      typicalScope: [
        "Expansion readiness and operational capability review",
        "Geographic and demographic expansion planning",
        "Product/service line extension considerations",
        "Operational workflow and resource planning guidance",
      ],
    },
    {
      slug: "new-business-start-consultation",
      title: "New Business Start Consultation",
      icon: Building,
      badge: "Foundational Advisory",
      summary:
        "Early-stage advisory for founders and new initiatives: concept validation, business model clarification, initial operational setup, and feasibility review.",
      typicalScope: [
        "Venture concept clarity and business model structuring",
        "Initial operational and resource requirement mapping",
        "Risk identification and mitigation considerations",
        "Early milestone setting for pre-launch and launch phases",
      ],
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Advisory Practice Areas [Draft Copy]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Business Consulting Services
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          DOW Consulting provides structured consulting services for <strong>startups, small companies, and MSMEs</strong>. The copy below describes typical service scope in general terms pending final client sign-off.
        </p>
        <p className="text-xs text-[#8C6A1E] bg-[#F7EED9] border border-[#E3D1A5] rounded px-4 py-2 max-w-xl mx-auto">
          [Draft — All service descriptions are preliminary drafts pending Niraj Kumar&apos;s final confirmation]
        </p>
      </section>

      {/* Team Model Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B2838] rounded-xl p-8 sm:p-10 text-[#F7F6F3] border border-[#2A3D54] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
              <Users className="w-4 h-4" />
              <span>Multi-Disciplinary Team Model</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Delivered by a Dedicated Advisory Team
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              DOW Consulting is an advisory team, not a single consultant. Different team members handle distinct tasks—for example, one team member focuses on research, one leads strategic consultation, and one oversees information collection.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 px-5 py-2.5 rounded bg-[#111B27] border border-[#2A3D54] text-xs font-semibold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
          >
            Learn About the Team &amp; Advisor
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6 hover:border-[#1B2838] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F7F6F3] text-[#5A6472] border border-[#E2E8F0]">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#1B2838]">{service.title}</h3>
                    <p className="text-xs text-[#5A6472] mt-2 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1B2838]">
                      What this typically involves:
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#5A6472]">
                      {service.typicalScope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C96A5] italic">[Draft scope description]</span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Customers Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2838]">
            Tailored for Startups, Small Companies, and MSMEs
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Our consulting engagements are specifically geared towards the practical realities of early and expanding enterprises. Rather than generic corporate theory, advisory work is structured to offer straightforward, actionable frameworks suitable for founders, business owners, and growing managerial teams.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <span className="px-3 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              Early &amp; Growth-Stage Startups
            </span>
            <span className="px-3 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              Small Companies Seeking Expansion
            </span>
            <span className="px-3 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              Micro, Small &amp; Medium Enterprises (MSMEs)
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2838]">
          Have a Project or Consulting Requirement?
        </h2>
        <p className="text-xs sm:text-sm text-[#5A6472]">
          Submit your business profile through our intake form to discuss customized scope and advisory arrangements.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
      </section>
    </div>
  );
}
