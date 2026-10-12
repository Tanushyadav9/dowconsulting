import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { FOOTER_LEGAL_LINKS } from "@/lib/constants/navigation";
import { SERVICES_CATALOG } from "@/lib/constants/services";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DottedWorldMap } from "@/components/ui/DottedWorldMap";
import { MapPin, MessageSquare, Phone, Mail, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const hasSocials = Boolean(BRAND.pending.linkedinUrl || BRAND.pending.youtubeUrl);

  return (
    <footer className="relative bg-[#0B1B33] text-slate-300 border-t border-[#1E3A63] pb-16 md:pb-0 overflow-hidden">
      {/* Subtle Dotted World Map Motif in Footer */}
      <DottedWorldMap opacity={0.07} className="text-white" />

      {/* Upper Footer: Brand, Services, Consultant, Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4">
            <Link href="/" aria-label="DOW Consulting Home">
              <BrandLogo variant="dark" size="sm" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Business-consulting firm led by Niraj Kumar, Consultant. Dedicated portfolio and enquiry site for start-ups, small companies and MSMEs.
            </p>
            <div className="pt-2 text-xs space-y-1">
              <p className="font-semibold text-white">Consultation Modes:</p>
              <p className="text-slate-400">Online via Google Meet or Zoom, or in person on request.</p>
              <p className="text-[11px] text-slate-400 italic">
                For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.
              </p>
            </div>
          </div>

          {/* Col 2: Confirmed 9 Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Consulting Services
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              {SERVICES_CATALOG.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Consultant Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Consultant Profile
            </h4>
            <div>
              <p className="text-sm text-white font-semibold">{BRAND.consultant.name}</p>
              <p className="text-xs text-[#E02027] font-medium">
                {BRAND.consultant.title} &mdash; {BRAND.consultant.descriptor}
              </p>
            </div>
            <div className="text-xs space-y-2 text-slate-400">
              <p className="leading-relaxed">
                <strong className="text-slate-200">Background:</strong> {BRAND.consultant.background}
              </p>
              <div className="pt-1 border-t border-[#1E3A63] text-[11px]">
                <span className="text-slate-200 font-semibold">Clients Served:</span> {BRAND.targetAudience}
              </div>
            </div>
          </div>

          {/* Col 4: Direct Enquiry Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Head Office &amp; Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E02027] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-slate-200">
                  {BRAND.headOffice.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E02027] shrink-0" />
                <a
                  href={ENQUIRY_CONFIG.phone.telLink}
                  className="text-white hover:text-[#E02027] font-semibold"
                >
                  Call: {ENQUIRY_CONFIG.phone.display}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#25D366] font-semibold"
                >
                  WhatsApp: {ENQUIRY_CONFIG.whatsapp.display}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#065A8C] shrink-0" />
                <a
                  href={ENQUIRY_CONFIG.email.mailtoLink}
                  className="text-slate-300 hover:text-white"
                >
                  {ENQUIRY_CONFIG.email.primary}
                </a>
              </div>

              {/* GSTIN: Rendered ONLY when set */}
              {BRAND.pending.gstin && (
                <div className="pt-1 text-[11px] text-slate-400">
                  <span>GSTIN: {BRAND.pending.gstin}</span>
                </div>
              )}

              {/* Social links: Rendered ONLY when set */}
              {hasSocials && (
                <div className="pt-2 border-t border-[#1E3A63] flex items-center gap-3">
                  {BRAND.pending.linkedinUrl && (
                    <a
                      href={BRAND.pending.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-[#17477F] hover:bg-[#235B9E] text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {BRAND.pending.youtubeUrl && (
                    <a
                      href={BRAND.pending.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-[#17477F] hover:bg-[#235B9E] text-white transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Small "Related sites" line (one config entry so it can be removed instantly) */}
              {BRAND.relatedSites && BRAND.relatedSites.length > 0 && (
                <div className="pt-2 border-t border-[#1E3A63] text-[11px] text-slate-400">
                  <span>Related sites: </span>
                  {BRAND.relatedSites.map((site, idx) => (
                    <span key={site.name}>
                      {idx > 0 && <span className="text-slate-600"> &bull; </span>}
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white hover:underline"
                      >
                        {site.name}
                      </a>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Legal Bar */}
      <div className="relative z-10 bg-[#061224] border-t border-[#173055] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. Consultant: Niraj Kumar. Professional portfolio &amp; enquiry site.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((legal) => (
              <Link
                key={legal.href}
                href={legal.href}
                className="text-slate-400 hover:text-white transition-colors underline"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
