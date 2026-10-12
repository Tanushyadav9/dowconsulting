import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  MessageSquare,
  Phone,
  Search,
  Compass,
  Layers,
  Sparkles,
  Rocket,
  FileCheck,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Advisory Process</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Our Approach
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
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
                className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#C9A24B]">{item.step}</span>
                  <div className="w-10 h-10 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1B2838]">{item.title}</h3>
                <p className="text-xs text-[#5A6472] leading-relaxed">{item.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation Modes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] text-[#F7F6F3] p-8 sm:p-10 rounded-lg border border-[#2A3D54] space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
              Engagement Formats
            </span>
            <h2 className="text-2xl font-bold">Consultation Delivery Modes</h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              We provide both online and in-person consultation formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#1B2838] p-5 rounded border border-[#2A3D54] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#F7F6F3]">
                <Video className="w-4 h-4 text-[#C9A24B]" />
                <span>Online Consultation</span>
              </div>
              <p className="text-xs text-[#8C96A5]">
                Conducted remotely via <strong>Google Meet or Zoom</strong>. Convenient and direct for executive teams.
              </p>
            </div>

            <div className="bg-[#1B2838] p-5 rounded border border-[#2A3D54] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#F7F6F3]">
                <Users className="w-4 h-4 text-[#C9A24B]" />
                <span>In-Person Consultation</span>
              </div>
              <p className="text-xs text-[#8C96A5]">
                Available on request. <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Enquiry CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] space-y-4">
          <h2 className="text-2xl font-bold text-[#1B2838]">
            Start Your Engagement with DOW Consulting
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] max-w-lg mx-auto">
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
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#F7F6F3] hover:bg-[#E2E8F0] text-[#1B2838] px-6 py-3 rounded font-semibold text-xs border border-[#E2E8F0]"
            >
              <span>Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
