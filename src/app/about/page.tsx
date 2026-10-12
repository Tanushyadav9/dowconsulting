import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { RisingArrowAccent } from "@/components/ui/RisingArrowAccent";
import {
  Award,
  GraduationCap,
  MapPin,
  MessageSquare,
  Phone,
  Video,
  Users,
} from "lucide-react";

export const metadata = {
  title: `About the Firm & Niraj Kumar | ${BRAND.name}`,
  description:
    "Learn about DOW Consulting's philosophy and approach, plus Niraj Kumar's profile (Consultant &mdash; GTM Strategy, Distribution & Brand Building).",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
            <RisingArrowAccent size={14} color="#E02027" />
            <span>Leadership &amp; Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#17477F] tracking-tight font-heading">
            About DOW Consulting
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A business-consulting firm led by <strong>{BRAND.consultant.name}</strong>, Consultant, helping <strong>{BRAND.targetAudience}</strong> build commercial clarity, strong distribution, and enduring brand equity.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#17477F] font-heading">
                Our Consulting Philosophy
              </h2>
              <p>
                At DOW Consulting, commercial success is earned through disciplined execution, distinctive product positioning, and resilient distribution channels &mdash; not speculative hype or abstract management buzzwords.
              </p>
              <p>
                Start-ups, small enterprises, and MSMEs operate under real capital constraints, immediate sales cycles, and aggressive competitive pressures. Our advisory work focuses directly on practical answers to fundamental commercial questions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                <span className="font-bold text-xs text-[#E02027] uppercase tracking-wider block font-heading">
                  Commercial Realism
                </span>
                <p className="text-xs text-slate-600">
                  Anchoring every strategy in realistic channel economics, working capital requirements, and customer willingness to pay.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                <span className="font-bold text-xs text-[#E02027] uppercase tracking-wider block font-heading">
                  Product Distinctiveness
                </span>
                <p className="text-xs text-slate-600">
                  Helping founders clearly define why their offering matters and how it stands apart from existing alternatives.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                <span className="font-bold text-xs text-[#E02027] uppercase tracking-wider block font-heading">
                  Distribution Architecture
                </span>
                <p className="text-xs text-slate-600">
                  Building practical routes to market, whether through wholesale distributors, retail placement, or direct pipelines.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                <span className="font-bold text-xs text-[#E02027] uppercase tracking-wider block font-heading">
                  Direct Partnership
                </span>
                <p className="text-xs text-slate-600">
                  Clients consult directly with senior leadership. There are no junior intermediaries or administrative roadblocks.
                </p>
              </div>
            </div>

            {/* Approach Link */}
            <div className="p-6 rounded-xl bg-[#0B1B33] text-white border border-[#1E3A63] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white font-heading">Explore Our Step-by-Step Approach</h3>
                <p className="text-xs text-slate-300">
                  Learn about our 7-step process from discovery to implementation guidance.
                </p>
              </div>
              <Link
                href="/approach"
                className="shrink-0 px-4 py-2 rounded bg-[#E02027] hover:bg-[#C7181F] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                View Approach
              </Link>
            </div>

            {/* Consultation Modes */}
            <div id="consultation-modes" className="pt-4 space-y-4">
              <h3 className="text-xl font-bold text-[#17477F] font-heading">
                Consultation Delivery Modes
              </h3>
              <p>
                To fit each client&apos;s schedule and operational preference, consultations are provided in two formats:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#17477F]">
                    <Video className="w-4 h-4 text-[#065A8C]" />
                    <span>Online Consultation</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Conducted remotely via <strong>Google Meet or Zoom</strong>. Direct, scheduled advisory sessions for founders and leadership teams anywhere in India or internationally.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#17477F]">
                    <Users className="w-4 h-4 text-[#065A8C]" />
                    <span>In-Person Consultation</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Available on request for on-site reviews and strategic planning.
                  </p>
                  <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 rounded p-2 mt-1">
                    <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Niraj Kumar Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1B33] text-white p-8 rounded-xl border border-[#1E3A63] shadow-xl space-y-6">
              <div className="border-b border-[#1E3A63] pb-4">
                <span className="text-[11px] font-bold text-[#E02027] uppercase tracking-wider">
                  Consultant Profile
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white font-heading">{BRAND.consultant.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  {BRAND.consultant.title} &bull; {BRAND.consultant.descriptor}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-sm text-white block mb-1">Corporate Operating Career</strong>
                  <p className="text-slate-200 leading-relaxed bg-[#17477F]/30 p-3.5 rounded-lg border border-[#1E3A63]">
                    &ldquo;{BRAND.consultant.background}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1E3A63] space-y-3">
                  <strong className="text-sm text-white block">Academic &amp; Executive Credentials</strong>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#E02027] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">B.Sc. (Hons.) in Physics</strong>
                      <p className="text-slate-300">Scientific grounding in analytical methodology.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#E02027] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">PGDBM in International Business &amp; Marketing</strong>
                      <p className="text-slate-300">Postgraduate qualification in trade dynamics and marketing strategy.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#E02027] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">XLRI</strong>
                      <p className="text-slate-300">Leadership Development &amp; Change Management certification.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E3A63] text-[11px] text-slate-300">
                <p>Direct communication: Clients enquire directly by phone or WhatsApp, and Consultant Niraj Kumar takes it from there.</p>
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-[#17477F] uppercase tracking-wider font-heading">
                Head Office
              </h4>
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#E02027] shrink-0 mt-0.5" />
                <p>{BRAND.headOffice.address}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E2E8F0]">
                <a
                  href={ENQUIRY_CONFIG.phone.telLink}
                  className="font-bold text-[#17477F] hover:text-[#E02027]"
                >
                  Call: {ENQUIRY_CONFIG.phone.display}
                </a>
                <a
                  href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#25D366] hover:underline"
                >
                  WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Enquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-sm max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#17477F] font-heading">
            Connect with Niraj Kumar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Discuss your go-to-market plan, distribution architecture, brand building, or start-up guidance directly with Consultant Niraj Kumar.
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
