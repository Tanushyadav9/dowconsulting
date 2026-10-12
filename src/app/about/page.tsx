import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  Award,
  GraduationCap,
  MapPin,
  MessageSquare,
  Phone,
  CheckCircle2,
  Video,
  Users,
  Compass,
  Briefcase,
  ShieldCheck,
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            <span>Leadership &amp; Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            About DOW Consulting
          </h1>
          <p className="text-lg text-[#5A6472] leading-relaxed">
            A business-consulting firm led by <strong>{BRAND.consultant.name}</strong>, Consultant, helping <strong>{BRAND.targetAudience}</strong> build commercial clarity, strong distribution, and enduring brand equity.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8 text-sm text-[#5A6472] leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1B2838]">
                Our Consulting Philosophy
              </h2>
              <p>
                At DOW Consulting, we believe commercial success is earned through disciplined execution, distinctive product positioning, and resilient distribution channels &mdash; not speculative hype or abstract management buzzwords.
              </p>
              <p>
                Start-ups, small enterprises, and MSMEs operate under real capital constraints, immediate sales cycles, and aggressive competitive pressures. Our advisory work focuses directly on practical answers to fundamental commercial questions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#C9A24B] uppercase tracking-wider block">
                  Commercial Realism
                </span>
                <p className="text-xs text-[#5A6472]">
                  We anchor every strategy in realistic channel economics, working capital requirements, and customer willingness to pay.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#C9A24B] uppercase tracking-wider block">
                  Product Distinctiveness
                </span>
                <p className="text-xs text-[#5A6472]">
                  We help founders clearly define why their offering matters and how it stands apart from existing alternatives.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#C9A24B] uppercase tracking-wider block">
                  Distribution Architecture
                </span>
                <p className="text-xs text-[#5A6472]">
                  We build practical routes to market, whether through wholesale distributors, retail placement, or direct pipelines.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#C9A24B] uppercase tracking-wider block">
                  Direct Partnership
                </span>
                <p className="text-xs text-[#5A6472]">
                  Clients consult directly with senior leadership. There are no junior intermediaries or administrative roadblocks.
                </p>
              </div>
            </div>

            {/* Approach Link */}
            <div className="p-6 rounded-lg bg-[#111B27] text-[#F7F6F3] border border-[#2A3D54] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#F7F6F3]">Explore Our Step-by-Step Approach</h3>
                <p className="text-xs text-[#8C96A5]">
                  Learn about our 7-step process from discovery to implementation guidance.
                </p>
              </div>
              <Link
                href="/approach"
                className="shrink-0 px-4 py-2 rounded bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                View Approach
              </Link>
            </div>

            {/* Consultation Modes */}
            <div id="consultation-modes" className="pt-4 space-y-4">
              <h3 className="text-xl font-bold text-[#1B2838]">
                Consultation Delivery Modes
              </h3>
              <p>
                To fit each client&apos;s schedule and operational preference, consultations are provided in two formats:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                    <Video className="w-4 h-4 text-[#C9A24B]" />
                    <span>Online Consultation</span>
                  </div>
                  <p className="text-xs text-[#5A6472]">
                    Conducted remotely via <strong>Google Meet or Zoom</strong>. Direct, scheduled advisory sessions for founders and leadership teams anywhere in India or internationally.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                    <Users className="w-4 h-4 text-[#C9A24B]" />
                    <span>In-Person Consultation</span>
                  </div>
                  <p className="text-xs text-[#5A6472]">
                    Available on request for on-site reviews and strategic planning.
                  </p>
                  <p className="text-[11px] text-[#8C6A1E] bg-amber-50 border border-amber-200 rounded p-2 mt-1">
                    <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Niraj Kumar Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-lg space-y-6">
              <div className="border-b border-[#2A3D54] pb-4">
                <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                  Consultant Profile
                </span>
                <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">{BRAND.consultant.name}</h3>
                <p className="text-xs text-[#C9A24B] mt-0.5 font-medium">
                  {BRAND.consultant.title} &bull; {BRAND.consultant.descriptor}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-sm text-[#F7F6F3] block mb-1">Corporate Operating Career</strong>
                  <p className="text-[#E2E8F0] leading-relaxed">
                    &ldquo;{BRAND.consultant.background}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2A3D54] space-y-3">
                  <strong className="text-sm text-[#F7F6F3] block">Academic &amp; Executive Credentials</strong>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">B.Sc. (Hons.) in Physics</strong>
                      <p className="text-[#8C96A5]">Scientific grounding in analytical methodology.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">PGDBM in International Business &amp; Marketing</strong>
                      <p className="text-[#8C96A5]">Postgraduate qualification in trade dynamics and marketing strategy.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">XLRI</strong>
                      <p className="text-[#8C96A5]">Leadership Development &amp; Change Management certification.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A3D54] text-[11px] text-[#8C96A5]">
                <p>Direct communication: Clients enquire directly by phone or WhatsApp, and Consultant Niraj Kumar takes it from there.</p>
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] space-y-3 text-xs">
              <h4 className="font-bold text-[#1B2838] uppercase tracking-wider">
                Head Office
              </h4>
              <div className="flex items-start gap-2 text-[#5A6472]">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <p>{BRAND.headOffice.address}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={ENQUIRY_CONFIG.phone.telLink}
                  className="font-semibold text-[#1B2838] hover:text-[#C9A24B]"
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
        <div className="bg-[#FFFFFF] p-10 rounded-lg border border-[#E2E8F0] max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#1B2838]">
            Connect with Niraj Kumar
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6472] max-w-lg mx-auto">
            Discuss your go-to-market plan, distribution architecture, brand building, or start-up guidance directly with Consultant Niraj Kumar.
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
