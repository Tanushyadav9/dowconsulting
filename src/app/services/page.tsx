import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG } from "@/lib/constants/services";
import { RisingArrowAccent } from "@/components/ui/RisingArrowAccent";
import {
  ArrowRight,
  MessageSquare,
  Phone,
  Video,
  Users,
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
          <RisingArrowAccent size={14} color="#E02027" />
          <span>Nine Confirmed Practice Areas</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#17477F] tracking-tight font-heading">
          Business Consulting Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          DOW Consulting provides specialised business advisory for <strong>{BRAND.targetAudience}</strong>, led by Consultant <strong>{BRAND.consultant.name}</strong>.
        </p>
      </section>

      {/* Services Grid (9 Confirmed Services as concise cards linking to detail) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_CATALOG.map((service, idx) => (
            <div
              key={service.slug}
              id={service.slug}
              className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm space-y-5 hover:border-[#17477F] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#E02027]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#F8FAFC] text-[#17477F] border border-[#E2E8F0]">
                    Practice Area
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#17477F] font-heading group-hover:text-[#065A8C] transition-colors">
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-[#E02027] transition-colors"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded bg-[#17477F] hover:bg-[#0B1B33] text-white text-xs font-semibold transition-colors"
                >
                  <span>View Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <a
                    href={ENQUIRY_CONFIG.buildWhatsAppUrl(service.whatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#25D366] font-semibold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={ENQUIRY_CONFIG.phone.telLink}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-[#17477F]"
                  >
                    <Phone className="w-3 h-3 text-[#E02027]" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Modes Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B33] rounded-2xl border border-[#1E3A63] p-8 sm:p-10 text-white shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#17477F] text-white border border-[#235B9E]">
              Delivery Options
            </span>
            <h2 className="text-2xl font-bold font-heading">Consultation Modes</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We provide both online and in-person consultation formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[#17477F]/30 border border-[#1E3A63] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <Video className="w-4 h-4 text-[#60A5FA]" />
                <span>Online Consultation</span>
              </div>
              <p className="text-xs text-slate-300">
                Conducted remotely via <strong>Google Meet or Zoom</strong>. Convenient and direct for executive teams.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#17477F]/30 border border-[#1E3A63] space-y-2">
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

      {/* Target Customers Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17477F] font-heading">
            Clients Served
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our consulting engagements are dedicated to <strong>start-ups, small companies and MSMEs</strong>. Advisory is focused on actionable, pragmatic business growth rather than theoretical corporate frameworks.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#17477F]">
              Start-ups
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#17477F]">
              Small Companies
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#17477F]">
              MSMEs
            </span>
          </div>
        </div>
      </section>

      {/* Direct Enquiry CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#17477F] font-heading">
          Have a Project or Consulting Requirement?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Discuss your enterprise requirements directly with Consultant Niraj Kumar.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
            className="inline-flex justify-center items-center gap-2 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#17477F] px-6 py-3 rounded font-semibold text-xs transition-colors"
          >
            <span>Enquiry Form</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
