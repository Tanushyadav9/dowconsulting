import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { RisingArrowAccent } from "@/components/ui/RisingArrowAccent";
import {
  MessageSquare,
  Phone,
  Search,
  Compass,
  Sparkles,
  Rocket,
  FileCheck,
  GraduationCap,
  Video,
  Users,
} from "lucide-react";

export const metadata = {
  title: `Our Approach | ${BRAND.name}`,
  description:
    "A clear step-by-step method for business consulting engagements at DOW Consulting led by Niraj Kumar, Consultant.",
};

export default function ApproachPage() {
  const steps = [
    {
      step: "01",
      title: "Enquiry & Discovery",
      icon: MessageSquare,
      summary:
        "Initial direct contact via phone call or WhatsApp to discuss your current business stage, operational context, and core commercial objectives.",
    },
    {
      step: "02",
      title: "Scoping & Engagement Definition",
      icon: Compass,
      summary:
        "Defining the specific consulting scope (such as GTM, market research, expansion, or brand building), consultation format (online or in person), and milestones.",
    },
    {
      step: "03",
      title: "Market & Competitor Research",
      icon: Search,
      summary:
        "Conducting structured analysis of sector dynamics, category trends, competing offerings, and customer need dynamics to inform strategic decisions.",
    },
    {
      step: "04",
      title: "Positioning & Differentiation",
      icon: Sparkles,
      summary:
        "Formulating the core value proposition and distinctive positioning that separates your offering from existing similar products in the marketplace.",
    },
    {
      step: "05",
      title: "Launch or Growth Plan",
      icon: Rocket,
      summary:
        "Structuring an actionable plan covering product proposition, design and packaging guidance, distribution channels, and optimal launch timing.",
    },
    {
      step: "06",
      title: "Strategic Recommendations",
      icon: FileCheck,
      summary:
        "Delivering comprehensive written strategic blueprints and debriefing leadership on key observations and priority action items.",
    },
    {
      step: "07",
      title: "Implementation Guidance & Training",
      icon: GraduationCap,
      summary:
        "Providing follow-up execution guidance and targeted staff training to align internal teams on sales and distribution standards.",
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
          <RisingArrowAccent size={14} color="#E02027" />
          <span>Advisory Process</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#17477F] tracking-tight font-heading">
          Our Approach
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A disciplined, step-by-step methodology turning commercial ambiguity into actionable business growth.
        </p>
      </section>

      {/* Step-by-Step Flow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#17477F] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#E02027] font-heading">{item.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-[#0B1B33] text-[#E02027] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#17477F] font-heading">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation Modes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B33] text-white p-8 sm:p-10 rounded-2xl border border-[#1E3A63] shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#17477F] text-white border border-[#235B9E]">
              Engagement Formats
            </span>
            <h2 className="text-2xl font-bold font-heading">Consultation Delivery Modes</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We provide both online and in-person consultation formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#17477F]/30 p-5 rounded-xl border border-[#1E3A63] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <Video className="w-4 h-4 text-[#60A5FA]" />
                <span>Online Consultation</span>
              </div>
              <p className="text-xs text-slate-300">
                Conducted remotely via <strong>Google Meet or Zoom</strong>. Convenient and direct for executive teams.
              </p>
            </div>

            <div className="bg-[#17477F]/30 p-5 rounded-xl border border-[#1E3A63] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <Users className="w-4 h-4 text-[#60A5FA]" />
                <span>In-Person Consultation</span>
              </div>
              <p className="text-xs text-slate-300">
                Available on request. <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Enquiry CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-[#17477F] font-heading">
            Start Your Engagement with DOW Consulting
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Connect directly with Consultant Niraj Kumar to discuss your commercial roadmap.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="inline-flex justify-center items-center gap-2 bg-[#E02027] hover:bg-[#C7181F] text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#17477F] px-6 py-3 rounded font-semibold text-xs border border-[#CBD5E1]"
            >
              <span>Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
