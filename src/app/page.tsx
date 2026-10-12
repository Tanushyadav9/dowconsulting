import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { HonestEngagementProof } from "@/components/home/HonestEngagementProof";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Search,
  Building,
  Rocket,
  Users,
  MessageSquare,
  Award,
  ChevronRight,
  ShieldCheck,
  Phone,
  Video,
  MapPin,
  Sparkles,
  Layers,
  GraduationCap,
} from "lucide-react";

export const metadata = {
  title: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
  description: `${BRAND.name}: Business consulting for start-ups, small companies and MSMEs led by Niraj Kumar (${BRAND.consultant.descriptor}).`,
};

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="bg-[#1B2838] text-[#F7F6F3] pt-16 pb-24 border-b border-[#2A3D54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111B27] border border-[#C9A24B]/40 text-xs text-[#C9A24B] font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse"></span>
                <span>{BRAND.consultant.name} &bull; {BRAND.consultant.title}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F6F3] leading-[1.15]">
                  Business consulting for start-ups, small companies and MSMEs.
                </h1>
                <p className="text-sm sm:text-base text-[#C9A24B] font-medium tracking-wide uppercase">
                  {BRAND.consultant.descriptor}
                </p>
              </div>

              <p className="text-lg text-[#E2E8F0] font-normal leading-relaxed max-w-2xl">
                Practical, senior commercial guidance helping emerging enterprises navigate market entry, product launches, distribution channels, and sales expansion.
              </p>

              {/* Core Non-Negotiables Callout */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#8C96A5]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Start-ups, Small Companies &amp; MSMEs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Online (Meet / Zoom) or In-Person</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>9 Practice Areas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Direct Advisory &mdash; No Gateways</span>
                </div>
              </div>

              {/* Direct Enquiry Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={ENQUIRY_CONFIG.phone.telLink}
                  className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-7 py-3.5 rounded font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
                </a>

                <a
                  href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3.5 rounded font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center gap-2 bg-[#111B27] hover:bg-[#2A3D54] border border-[#2A3D54] text-[#F7F6F3] px-5 py-3.5 rounded font-semibold text-xs tracking-wide transition-colors"
                >
                  <span>Enquiry Form</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Consultant Credentials */}
            <div className="lg:col-span-5">
              <div className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A3D54] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F7F6F3]">{BRAND.consultant.name}</h3>
                    <p className="text-xs text-[#C9A24B] uppercase tracking-wider font-semibold">
                      {BRAND.consultant.title} &bull; {BRAND.consultant.descriptor}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-[#C9A24B]" />
                </div>

                <div className="space-y-4 text-xs text-[#8C96A5]">
                  <div>
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Professional Background:</p>
                    <p className="text-[#F7F6F3] leading-relaxed">
                      &ldquo;{BRAND.consultant.background}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#2A3D54] space-y-2">
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Academic &amp; Executive Education:</p>
                    <ul className="space-y-1.5 pl-4 list-disc marker:text-[#C9A24B]">
                      {BRAND.consultant.education.map((item) => (
                        <li key={item} className="text-[#E2E8F0]">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#2A3D54] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C96A5]">Head Office:</span>
                    <span className="text-[#F7F6F3] font-medium text-right">Sector 75, Noida, UP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Confirmed Practice Areas (All 9 Client Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1B2838] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
            <span>Consulting Practice Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            What We Do
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Tailored business advisory for start-ups, small companies and MSMEs across nine confirmed service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND.services.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C9A24B]">0{idx + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7F6F3] text-[#1B2838]">
                    Practice
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2838]">{service.name}</h3>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0]">
                <a
                  href={ENQUIRY_CONFIG.buildWhatsAppUrl(
                    `Hello Niraj / DOW Consulting, I would like to enquire about ${service.name} for my business.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
                >
                  <span>Enquire about this service</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Consultation Modes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
              Engagement Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
              Consultation Modes
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              We offer flexible consultation options tailored to your location and operational preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Mode 1: Online */}
            <div className="bg-[#1B2838] border border-[#2A3D54] rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#111B27] text-[#C9A24B] flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F7F6F3]">Online Consultation</h3>
              <p className="text-xs text-[#C9A24B] font-semibold">Via Google Meet or Zoom</p>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Direct strategic consultation conducted online via Google Meet or Zoom. Flexible scheduling for founders, business owners, and management teams anywhere in India or internationally.
              </p>
            </div>

            {/* Mode 2: In Person */}
            <div className="bg-[#1B2838] border border-[#2A3D54] rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#111B27] text-[#C9A24B] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F7F6F3]">In-Person Consultation</h3>
              <p className="text-xs text-[#C9A24B] font-semibold">Available on request</p>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                In-person meetings on request. For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Methodology & Deliverable Outline */}
      <HonestEngagementProof />

      {/* 5. Direct Enquiry Final Action Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#1B2838]">
          Ready to Consult with Niraj Kumar?
        </h2>
        <p className="text-sm text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Enquire directly by phone call or WhatsApp to discuss your business requirements. No accounts, no portals &mdash; the consultant takes it from there.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <a
            href={ENQUIRY_CONFIG.phone.telLink}
            className="inline-flex justify-center items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#C9A24B]" />
            <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
          </a>
          <a
            href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Consultant Direct</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F6F3] text-[#1B2838] border border-[#CBD5E1] px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Enquiry Form</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
