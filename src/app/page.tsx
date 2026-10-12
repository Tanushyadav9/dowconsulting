import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG } from "@/lib/constants/services";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageSquare,
  Award,
  Video,
  Users,
  Building,
  HelpCircle,
  Compass,
  Briefcase,
  FileText,
} from "lucide-react";

export const metadata = {
  title: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
  description: `${BRAND.name}: Business consulting for start-ups, small companies and MSMEs led by Niraj Kumar (${BRAND.consultant.descriptor}).`,
};

export default function HomePage() {
  const faqs = [
    {
      q: "Who leads the consulting engagements?",
      a: `All engagements are led directly by ${BRAND.consultant.name}, Consultant. With ${BRAND.consultant.experienceSummary}, he personally guides market research, launch strategy, distribution architecture, and business expansion.`,
    },
    {
      q: "Who does DOW Consulting work with?",
      a: "Our practice is dedicated specifically to start-ups, small companies and MSMEs across diverse commercial sectors seeking pragmatic sales growth, market entry, or brand development.",
    },
    {
      q: "What consultation modes are available?",
      a: "Consultations are conducted online via Google Meet or Zoom, or in person on request. For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.",
    },
    {
      q: "How do we initiate an enquiry?",
      a: `Enquiring is effortless: call ${ENQUIRY_CONFIG.phone.display}, message on WhatsApp, or send a quick online enquiry. There are no account registrations, client portals, or chatbots &mdash; the consultant reviews your brief directly.`,
    },
    {
      q: "Are there online payments, checkout carts, or fixed package prices on this site?",
      a: "No. DOW Consulting is a professional portfolio and enquiry site, not a transactional platform. Engagements are tailored around your specific requirements, and billing is coordinated directly with the client.",
    },
  ];

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
                  Strategic business consulting for start-ups, small companies and MSMEs.
                </h1>
                <p className="text-sm sm:text-base text-[#C9A24B] font-semibold tracking-wider uppercase">
                  {BRAND.consultant.descriptor}
                </p>
              </div>

              <p className="text-lg text-[#E2E8F0] font-normal leading-relaxed max-w-2xl">
                Pragmatic commercial leadership to launch offerings with distinction, construct robust distribution channels, and scale sales growth.
              </p>

              {/* Three Clear Actions: Call, WhatsApp, Enquire */}
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
                  <span>WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center gap-2 bg-[#111B27] hover:bg-[#2A3D54] border border-[#2A3D54] text-[#F7F6F3] px-6 py-3.5 rounded font-semibold text-xs tracking-wide transition-colors"
                >
                  <span>Enquire Online</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Consultant Overview */}
            <div className="lg:col-span-5">
              <div className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A3D54] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F7F6F3]">{BRAND.consultant.name}</h3>
                    <p className="text-xs text-[#C9A24B] uppercase tracking-wider font-semibold">
                      {BRAND.consultant.title}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-[#C9A24B]" />
                </div>

                <div className="space-y-4 text-xs text-[#8C96A5]">
                  <div>
                    <p className="text-[#E2E8F0] font-semibold text-sm mb-1">Commercial Background:</p>
                    <p className="text-[#F7F6F3] leading-relaxed">
                      &ldquo;{BRAND.consultant.background}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#2A3D54] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C96A5]">Practice Focus:</span>
                    <span className="text-[#C9A24B] font-semibold text-right">{BRAND.consultant.descriptor}</span>
                  </div>

                  <div className="border-t border-[#2A3D54] pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#8C96A5]">Head Office:</span>
                    <span className="text-[#F7F6F3]">Sector 75, Noida, UP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Credibility Strip (Using ONLY the real background) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-[#E2E8F0] pb-4 md:pb-0 md:pr-6">
              <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider block">
                Executive Credibility
              </span>
              <h2 className="text-lg font-bold text-[#1B2838] mt-1">
                Verified Background
              </h2>
              <p className="text-xs text-[#8C96A5] mt-1">
                Attributed directly to Niraj Kumar
              </p>
            </div>

            <div className="md:col-span-9 space-y-3">
              <p className="text-sm text-[#1B2838] font-medium leading-relaxed italic">
                &ldquo;{BRAND.consultant.background}&rdquo;
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#5A6472] pt-1">
                <span>&bull; Senior Operating Roles: Reliance Retail, Metro Cash &amp; Carry, NIF Food</span>
                <span>&bull; Academic: B.Sc. (Hons.) Physics, PGDBM International Business</span>
                <span>&bull; Executive: XLRI Leadership Development</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Overview (The 9 Services as concise cards linking to detail) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1B2838] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
            <span>Practice Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            What We Do
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Nine specialized consulting practice areas structured for start-ups, small companies and MSMEs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_CATALOG.map((service, idx) => (
            <div
              key={service.slug}
              className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-5 hover:border-[#1B2838] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C9A24B]">0{idx + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7F6F3] text-[#1B2838]">
                    Practice
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2838]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
                >
                  <span>Explore Scope</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={ENQUIRY_CONFIG.buildWhatsAppUrl(service.whatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#25D366] hover:underline"
                >
                  WhatsApp &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "How We Work" Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
              How We Work
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              Every client engagement follows a structured, transparent process with zero ambiguity:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1B2838] border border-[#2A3D54] p-5 rounded-lg space-y-2">
              <span className="text-xs font-bold text-[#C9A24B]">Step 01</span>
              <h4 className="font-bold text-sm text-[#F7F6F3]">Enquiry &amp; Discovery</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Direct briefing via phone or WhatsApp to understand your business stage, goals, and commercial challenges.
              </p>
            </div>

            <div className="bg-[#1B2838] border border-[#2A3D54] p-5 rounded-lg space-y-2">
              <span className="text-xs font-bold text-[#C9A24B]">Step 02</span>
              <h4 className="font-bold text-sm text-[#F7F6F3]">Scoping &amp; Format</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Defining practice boundaries, deliverables, and consultation mode (online via Meet/Zoom or in person).
              </p>
            </div>

            <div className="bg-[#1B2838] border border-[#2A3D54] p-5 rounded-lg space-y-2">
              <span className="text-xs font-bold text-[#C9A24B]">Step 03</span>
              <h4 className="font-bold text-sm text-[#F7F6F3]">Analysis &amp; Strategy</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Conducting category research, competitor benchmarking, positioning review, and channel architecture planning.
              </p>
            </div>

            <div className="bg-[#1B2838] border border-[#2A3D54] p-5 rounded-lg space-y-2">
              <span className="text-xs font-bold text-[#C9A24B]">Step 04</span>
              <h4 className="font-bold text-sm text-[#F7F6F3]">Debrief &amp; Delivery</h4>
              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Reviewing tailored strategic roadmaps and execution guidance directly with business leadership.
              </p>
            </div>
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/approach"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] hover:underline"
            >
              <span>Explore Detailed Step-by-Step Approach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "Who We Work With" & Consultation Modes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Who We Work With */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#111B27] px-2.5 py-1 rounded">
                Target Audience
              </span>
              <h3 className="text-2xl font-bold text-[#1B2838] mt-2">
                Who We Work With
              </h3>
              <p className="text-xs text-[#5A6472] mt-1 leading-relaxed">
                Our practice is tailored to three core categories of commercial enterprises:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-1">
                <h4 className="font-bold text-sm text-[#1B2838]">1. Start-ups</h4>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  Early-stage ventures and entrepreneurs validating concepts from scratch, defining buyer personas, establishing differentiation, and planning their commercial debut.
                </p>
              </div>

              <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-1">
                <h4 className="font-bold text-sm text-[#1B2838]">2. Small Companies</h4>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  Operating companies seeking wider retail distribution, partner networks, improved product packaging, or strategic brand building to stand out.
                </p>
              </div>

              <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-1">
                <h4 className="font-bold text-sm text-[#1B2838]">3. MSMEs</h4>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  Micro, Small &amp; Medium Enterprises looking to expand sales geographically, optimize revenue pipelines, train commercial staff, and execute customized solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Consultation Modes */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#111B27] px-2.5 py-1 rounded">
                Delivery Formats
              </span>
              <h3 className="text-2xl font-bold text-[#1B2838] mt-2">
                Consultation Modes
              </h3>
              <p className="text-xs text-[#5A6472] mt-1 leading-relaxed">
                Flexible consultation options tailored to your location and operational preference:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1B2838]">
                  <Video className="w-4 h-4 text-[#C9A24B]" />
                  <span>Online Consultation</span>
                </div>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  Conducted remotely via <strong>Google Meet or Zoom</strong>. Direct advisory sessions accommodating leadership teams located anywhere in India or overseas.
                </p>
              </div>

              <div className="p-5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1B2838]">
                  <Users className="w-4 h-4 text-[#C9A24B]" />
                  <span>In-Person Consultation</span>
                </div>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  Available on request for on-site reviews or strategic workshops.
                </p>
                <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-[#8C6A1E]">
                  <strong>Note:</strong> For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Short FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1B2838] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1B2838]">
            Common Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-2"
            >
              <h3 className="font-bold text-sm sm:text-base text-[#1B2838]">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing Enquiry Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#1B2838] text-[#F7F6F3] p-10 sm:p-14 rounded-2xl border border-[#2A3D54] shadow-xl space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Consult with Niraj Kumar?
          </h2>
          <p className="text-sm text-[#8C96A5] max-w-xl mx-auto leading-relaxed">
            Reach our advisory desk directly by phone call or WhatsApp to discuss your commercial growth objectives.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Consultant Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#111B27] hover:bg-[#2A3D54] border border-[#2A3D54] text-[#F7F6F3] px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Quick Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
