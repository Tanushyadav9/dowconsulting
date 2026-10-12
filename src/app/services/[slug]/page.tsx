import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG, findServiceBySlug } from "@/lib/constants/services";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageSquare,
  Video,
  Users,
  Award,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6472] hover:text-[#1B2838]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Consulting Services</span>
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Consulting Practice Area</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2838] tracking-tight">
          {service.name}
        </h1>
        <p className="text-base sm:text-lg text-[#5A6472] max-w-3xl leading-relaxed">
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
            className="inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C9A24B]" />
            <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F6F3] border border-[#CBD5E1] text-[#1B2838] px-5 py-2.5 rounded font-semibold text-xs transition-colors"
          >
            <span>Quick Enquiry Form</span>
          </Link>
        </div>
      </section>

      {/* Section 1: Who It Is For */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            <span>Audience &amp; Fit</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1B2838]">Who It Is For</h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            This practice area is designed specifically for start-ups, small companies and MSMEs facing these commercial situations:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {service.whoItIsFor.map((item, idx) => (
              <li
                key={idx}
                className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] text-xs text-[#1B2838] space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-[#1B2838]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span>Profile {idx + 1}</span>
                </div>
                <p className="text-xs text-[#5A6472] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 2: What It Covers */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            <span>Scope of Advisory</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1B2838]">What It Covers</h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Advisory engagements in {service.name} generally encompass the following scope areas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.whatItCovers.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#1B2838] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How the Engagement Runs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] text-[#F7F6F3] p-8 sm:p-10 rounded-lg border border-[#2A3D54] shadow-md space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B2838] text-[#C9A24B] border border-[#2A3D54]">
              Methodology
            </span>
            <h2 className="text-2xl font-bold">How the Engagement Runs</h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              Every engagement is conducted with a structured, transparent process under direct consultation with Niraj Kumar:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.howEngagementRuns.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#1B2838] border border-[#2A3D54] p-5 rounded-lg space-y-2 text-xs"
              >
                <span className="text-xs font-bold text-[#C9A24B]">Stage 0{idx + 1}</span>
                <p className="text-[#E2E8F0] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: What the Client Receives */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            <span>Deliverables</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1B2838]">What the Client Receives</h2>
          <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
            Written deliverables and direct consultation are tailored to the agreed engagement parameters with zero outcome or revenue guarantees claimed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.whatClientReceives.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] flex items-start gap-3"
              >
                <FileText className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#1B2838] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modes & Consultant Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F6F3] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5A6472]">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#1B2838]">Consultation Delivery Modes</h3>
            <p>
              <strong>Online:</strong> Conducted remotely via Google Meet or Zoom.
            </p>
            <p>
              <strong>In person:</strong> On request. <em>For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.</em>
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#1B2838]">Consultant: {BRAND.consultant.name}</h3>
            <p>
              {BRAND.consultant.title} &mdash; {BRAND.consultant.descriptor}. Over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#1B2838] text-[#F7F6F3] p-8 sm:p-10 rounded-lg border border-[#2A3D54] space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">
            Enquire About {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#8C96A5] max-w-lg mx-auto">
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
              className="inline-flex justify-center items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-[#111B27] hover:bg-[#2A3D54] border border-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded font-semibold text-xs transition-colors"
            >
              <span>Quick Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
