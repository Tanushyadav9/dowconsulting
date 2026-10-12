import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG, findServiceBySlug } from "@/lib/constants/services";
import { RisingArrowAccent } from "@/components/ui/RisingArrowAccent";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
} from "lucide-react";

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const service of SERVICES_CATALOG) {
    params.push({ slug: service.slug });
    for (const alias of service.aliases) {
      params.push({ slug: alias });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = findServiceBySlug(params.slug);
  if (!service) return { title: `Service Not Found | ${BRAND.name}` };

  return {
    title: `${service.name} | Consulting Services | ${BRAND.name}`,
    description: `${service.name} consulting for start-ups, small companies and MSMEs led by Niraj Kumar, Consultant (${BRAND.consultant.descriptor}).`,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = findServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const whatsAppUrl = ENQUIRY_CONFIG.buildWhatsAppUrl(service.whatsAppMessage);

  return (
    <div className="space-y-16 py-12">
      {/* Breadcrumb / Back Link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#17477F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Consulting Services</span>
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
          <RisingArrowAccent size={14} color="#E02027" />
          <span>Consulting Practice Area</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17477F] tracking-tight font-heading">
          {service.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Action Buttons Top */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>
          <a
            href={ENQUIRY_CONFIG.phone.telLink}
            className="inline-flex items-center gap-2 bg-[#E02027] hover:bg-[#C7181F] text-white px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#17477F] px-5 py-2.5 rounded font-semibold text-xs transition-colors"
          >
            <span>Quick Enquiry Form</span>
          </Link>
        </div>
      </section>

      {/* Section 1: Who It Is For */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E02027]">
            <span>Audience &amp; Fit</span>
          </div>
          <h2 className="text-2xl font-bold text-[#17477F] font-heading">Who It Is For</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This practice area is designed specifically for start-ups, small companies and MSMEs facing these commercial situations:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {service.whoItIsFor.map((item, idx) => (
              <li
                key={idx}
                className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-slate-800 space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-[#17477F]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E02027] shrink-0" />
                  <span>Profile {idx + 1}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 2: What It Covers */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E02027]">
            <span>Scope of Advisory</span>
          </div>
          <h2 className="text-2xl font-bold text-[#17477F] font-heading">What It Covers</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Advisory engagements in {service.name} generally encompass the following scope areas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.whatItCovers.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E02027] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How the Engagement Runs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B33] text-white p-8 sm:p-10 rounded-xl border border-[#1E3A63] shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#17477F] text-white border border-[#235B9E]">
              Methodology
            </span>
            <h2 className="text-2xl font-bold font-heading">How the Engagement Runs</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every engagement is conducted with a structured, transparent process under direct consultation with Niraj Kumar:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.howEngagementRuns.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#17477F]/30 border border-[#1E3A63] p-5 rounded-lg space-y-2 text-xs"
              >
                <span className="text-xs font-bold text-[#E02027]">Stage 0{idx + 1}</span>
                <p className="text-slate-200 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: What the Client Receives */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E02027]">
            <span>Deliverables</span>
          </div>
          <h2 className="text-2xl font-bold text-[#17477F] font-heading">What the Client Receives</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Written deliverables and direct consultation are tailored to the agreed engagement parameters with zero outcome or revenue guarantees claimed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.whatClientReceives.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3"
              >
                <FileText className="w-4 h-4 text-[#065A8C] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modes & Consultant Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#17477F] font-heading">Consultation Delivery Modes</h3>
            <p>
              <strong>Online:</strong> Conducted remotely via Google Meet or Zoom.
            </p>
            <p>
              <strong>In person:</strong> On request. <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#17477F] font-heading">Consultant: {BRAND.consultant.name}</h3>
            <p>
              {BRAND.consultant.title} &mdash; {BRAND.consultant.descriptor}. Over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#0B1B33] text-white p-8 sm:p-10 rounded-2xl border border-[#1E3A63] shadow-xl space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Enquire About {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Discuss your requirements directly with Consultant Niraj Kumar by phone or WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Discuss via WhatsApp</span>
            </a>
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="inline-flex justify-center items-center gap-2 bg-[#E02027] hover:bg-[#C7181F] text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#17477F] hover:bg-[#235B9E] border border-[#235B9E] text-white px-6 py-3 rounded font-semibold text-xs transition-colors"
            >
              <span>Quick Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
