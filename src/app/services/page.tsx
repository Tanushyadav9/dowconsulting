import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  Rocket,
  Search,
  TrendingUp,
  Building,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Phone,
  Video,
  Users,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: `Consulting Services | ${BRAND.name}`,
  description:
    "Explore business consulting services across market research, product launch strategy, GTM strategy & distribution, brand building, product design & packaging, expansion, start-up guidance, staff training, and customised solutions.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Nine Confirmed Practice Areas</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Business Consulting Services
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          DOW Consulting provides specialized business advisory for <strong>{BRAND.targetAudience}</strong>, led by Consultant <strong>{BRAND.consultant.name}</strong>.
        </p>
      </section>

      {/* Services Grid (9 Confirmed Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND.services.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-5 hover:border-[#1B2838] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#C9A24B]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#F7F6F3] text-[#1B2838]">
                    Practice Area
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1B2838]">{service.name}</h3>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <a
                  href={ENQUIRY_CONFIG.buildWhatsAppUrl(
                    `Hello Niraj / DOW Consulting, I would like to enquire about ${service.name} for my business.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Enquire via WhatsApp</span>
                </a>

                <div className="text-center">
                  <a
                    href={ENQUIRY_CONFIG.phone.telLink}
                    className="text-[11px] font-semibold text-[#5A6472] hover:text-[#1B2838] transition-colors"
                  >
                    Or call consultant: {ENQUIRY_CONFIG.phone.display}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Modes Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-10 text-[#F7F6F3] shadow-lg space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
              Delivery Options
            </span>
            <h2 className="text-2xl font-bold">Consultation Modes</h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              We provide both online and in-person consultation formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#F7F6F3]">
                <Video className="w-4 h-4 text-[#C9A24B]" />
                <span>Online Consultation</span>
              </div>
              <p className="text-xs text-[#8C96A5]">
                Conducted remotely via <strong>Google Meet or Zoom</strong>. Convenient and direct for executive teams.
              </p>
            </div>

            <div className="p-5 rounded bg-[#1B2838] border border-[#2A3D54] space-y-2">
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

      {/* Target Customers Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2838]">
            Clients Served
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Our consulting engagements are dedicated to <strong>start-ups, small companies and MSMEs</strong>. Advisory is focused on actionable, pragmatic business growth rather than theoretical corporate frameworks.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <span className="px-3.5 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              Start-ups
            </span>
            <span className="px-3.5 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              Small Companies
            </span>
            <span className="px-3.5 py-1.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs font-semibold text-[#1B2838]">
              MSMEs
            </span>
          </div>
        </div>
      </section>

      {/* Direct Enquiry CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2838]">
          Have a Project or Consulting Requirement?
        </h2>
        <p className="text-xs sm:text-sm text-[#5A6472]">
          Discuss your enterprise requirements directly with Consultant Niraj Kumar.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
            className="inline-flex justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F6F3] border border-[#CBD5E1] text-[#1B2838] px-6 py-3 rounded font-semibold text-xs"
          >
            <span>Enquiry Form</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
