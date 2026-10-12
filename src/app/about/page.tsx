import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { Award, Briefcase, GraduationCap, MapPin, MessageSquare, Phone, CheckCircle2, Video, Users } from "lucide-react";

export const metadata = {
  title: `About Niraj Kumar & DOW Consulting | ${BRAND.name}`,
  description:
    "Learn about DOW Consulting led by Niraj Kumar, Consultant (GTM Strategy, Distribution & Brand Building). Background across senior roles at Reliance Retail, Metro Cash & Carry, and NIF Food.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            <span>Consultant &bull; {BRAND.consultant.descriptor}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            About {BRAND.name}
          </h1>
          <p className="text-lg text-[#5A6472] leading-relaxed">
            DOW Consulting is a business-consulting firm led by <strong>{BRAND.consultant.name}</strong>, Consultant. We provide strategic guidance for <strong>{BRAND.targetAudience}</strong>.
          </p>
        </div>
      </section>

      {/* 2. Practice Overview & Consultant Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-sm text-[#5A6472] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#1B2838]">
              Senior Commercial Leadership
            </h2>
            <p>
              DOW Consulting brings over two decades of enterprise operating and strategic experience to early-stage and growing companies. Led by {BRAND.consultant.name}, the firm focuses on turning strategic concepts into concrete distribution channels, distinctive product launches, and sustained market expansion.
            </p>

            <div className="p-6 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-3">
              <h3 className="font-bold text-base text-[#1B2838]">
                Professional Background
              </h3>
              <p className="text-[#1B2838] font-medium leading-relaxed">
                &ldquo;{BRAND.consultant.background}&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838] pt-2">
              Who We Serve
            </h3>
            <p>
              We specifically advise <strong>start-ups, small companies and MSMEs</strong> facing pivotal commercial transitions:
            </p>
            <ul className="space-y-2 pl-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>Start-ups:</strong> Guiding new-business setup from scratch, validating commercial feasibility, and shaping launch strategy.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>Small Companies:</strong> Expanding sales channels, refining brand positioning, and elevating distribution.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>MSMEs:</strong> Overcoming scaling bottlenecks, training internal staff, and implementing customized growth solutions.</span>
              </li>
            </ul>

            {/* Consultation Modes (Anchored with id="consultation-modes") */}
            <div id="consultation-modes" className="pt-6 space-y-4">
              <h3 className="text-xl font-bold text-[#1B2838]">
                Consultation Modes
              </h3>
              <p>
                To accommodate client requirements, consultations are delivered via two primary modes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                    <Video className="w-4 h-4 text-[#C9A24B]" />
                    <span>Online Consultation</span>
                  </div>
                  <p className="text-xs text-[#5A6472]">
                    Conducted remotely via <strong>Google Meet or Zoom</strong>. Flexible, focused advisory sessions for management teams.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B2838]">
                    <Users className="w-4 h-4 text-[#C9A24B]" />
                    <span>In-Person Consultation</span>
                  </div>
                  <p className="text-xs text-[#5A6472]">
                    Available on request. <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-lg space-y-6">
              <div className="border-b border-[#2A3D54] pb-4">
                <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                  Consultant Profile
                </span>
                <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">{BRAND.consultant.name}</h3>
                <p className="text-xs text-[#C9A24B] mt-0.5">{BRAND.consultant.title} &bull; {BRAND.consultant.descriptor}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-sm text-[#F7F6F3] block mb-1">Corporate Operating Background</strong>
                  <p className="text-[#8C96A5] leading-relaxed">
                    Over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food.
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
                <p>Direct communication: All enquiries are received directly by phone or WhatsApp.</p>
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
              <div className="pt-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
                <a
                  href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1B2838] hover:text-[#C9A24B]"
                >
                  WhatsApp: {ENQUIRY_CONFIG.whatsapp.display}
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
