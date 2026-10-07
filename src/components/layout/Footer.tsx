import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { FOOTER_LEGAL_LINKS } from "@/lib/constants/navigation";
import { getActiveSocialLinks } from "@/lib/constants/ecosystem";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";

export async function Footer() {
  const activeSocialLinks = getActiveSocialLinks();

  let hasPublishedTeam = false;
  let hasPublishedTestimonials = false;

  try {
    const [teamCount, testCount] = await Promise.all([
      prisma.publicTeamMember.count({ where: { isPublished: true } }),
      prisma.testimonial.count({ where: { isPublished: true, consentConfirmed: true } }),
    ]);
    hasPublishedTeam = teamCount > 0;
    hasPublishedTestimonials = testCount > 0;
  } catch (err) {
    // Safe fallback if database is pending
  }

  return (
    <footer className="bg-[#111B27] text-[#8C96A5] border-t border-[#2A3D54]">
      {/* Upper Footer: Brand, Credentials, Ecosystem */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4">
            <div>
              <span className="text-xl font-bold tracking-tight text-[#F7F6F3]">
                DOW <span className="font-light text-[#C9A24B]">CONSULTING</span>
              </span>
              <p className="text-xs text-[#C9A24B] uppercase tracking-wider font-semibold mt-0.5">
                {BRAND.tagline}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-[#8C96A5]">
              Business consulting for startups, small companies, and MSMEs. DOW Consulting operates as a collaborative team where different specialists handle research, client consultation, and information collection.
            </p>
            <div className="pt-1 text-[11px] text-[#C9A24B]">
              <span>[Draft Copy — Pending Client Confirmation]</span>
            </div>
          </div>

          {/* Col 2: Confirmed Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F6F3]">
              Consulting Services [Draft]
            </h4>
            <ul className="text-xs space-y-2 text-[#8C96A5]">
              <li>
                <Link href="/services/gtm-strategy" className="hover:text-[#C9A24B] transition-colors">
                  GTM Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/market-research" className="hover:text-[#C9A24B] transition-colors">
                  Market Research
                </Link>
              </li>
              <li>
                <Link href="/services/business-expansion-strategy" className="hover:text-[#C9A24B] transition-colors">
                  Business Expansion Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/new-business-start-consultation" className="hover:text-[#C9A24B] transition-colors">
                  New Business Start Consultation
                </Link>
              </li>
            </ul>

            {(hasPublishedTeam || hasPublishedTestimonials) && (
              <div className="pt-2 border-t border-[#2A3D54] space-y-1.5 text-xs">
                {hasPublishedTeam && (
                  <div>
                    <Link href="/team" className="hover:text-[#C9A24B] transition-colors">
                      Advisory Team
                    </Link>
                  </div>
                )}
                {hasPublishedTestimonials && (
                  <div>
                    <Link href="/testimonials" className="hover:text-[#C9A24B] transition-colors">
                      Client Testimonials
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-[#2A3D54] text-[11px] text-[#8C96A5]">
              Designed for startups, small businesses &amp; MSMEs.
            </div>
          </div>

          {/* Col 3: Real Corporate Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F6F3]">
              Lead Strategic Advisor
            </h4>
            <p className="text-xs text-[#F7F6F3] font-semibold">{BRAND.founder.name}</p>
            <ul className="text-xs space-y-2 text-[#8C96A5]">
              <li>
                <strong className="text-[#E2E8F0]">Corporate Background</strong>
                <br />Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food
              </li>
              <li>
                <strong className="text-[#E2E8F0]">Academic Credentials</strong>
                <br />B.Sc. (Hons.) Physics • PGDBM in International Business & Marketing
              </li>
              <li>
                <strong className="text-[#E2E8F0]">Executive Education</strong>
                <br />XLRI (Leadership Development and Change Management Certification)
              </li>
            </ul>
          </div>

          {/* Col 3: Sister Ecosystem & Cross-Promotion */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F6F3]">
              Sister Ecosystem Platforms
            </h4>
            <p className="text-xs text-[#8C96A5]">
              Part of the strategic advisory network founded and guided by {BRAND.founder.name}:
            </p>
            <div className="space-y-2.5 pt-1">
              {BRAND.ecosystem.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-[#1B2838] hover:bg-[#2A3D54] border border-[#2A3D54] transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-[#F7F6F3] group-hover:text-[#C9A24B]">
                      {site.name}
                    </span>
                    <p className="text-[11px] text-[#8C96A5]">{site.description}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C96A5] group-hover:text-[#C9A24B]" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Verified Contact Coordinates & Active Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F6F3]">
              Official Practice Address
            </h4>
            <div className="space-y-2.5 text-xs text-[#8C96A5]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {BRAND.contact.address.unit}, {BRAND.contact.address.complex}, {BRAND.contact.address.sector}, {BRAND.contact.address.city} - {BRAND.contact.address.state} {BRAND.contact.address.pincode}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a
                  href={BRAND.contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2E8F0] hover:text-[#C9A24B] font-semibold"
                >
                  WhatsApp: {BRAND.contact.whatsapp.display}
                </a>
              </div>
            </div>

            {/* Social Links: Centralized in ecosystem.ts; rendered ONLY when URL is set and valid */}
            {activeSocialLinks.length > 0 && (
              <div className="pt-2 border-t border-[#2A3D54] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C96A5]">
                  Official Channels
                </span>
                <div className="flex items-center gap-3">
                  {activeSocialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-[#1B2838] hover:bg-[#2A3D54] text-[#C9A24B] transition-colors"
                      aria-label={social.label}
                    >
                      {social.platform === "linkedin" && <Linkedin className="w-3.5 h-3.5" />}
                      {social.platform === "youtube" && <Youtube className="w-3.5 h-3.5" />}
                      {social.platform === "facebook" && <Facebook className="w-3.5 h-3.5" />}
                      {social.platform === "instagram" && <Instagram className="w-3.5 h-3.5" />}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Bar: Prominently Linking All Five Legal Pages From Day One */}
      <div className="bg-[#0B121B] border-t border-[#1B2838] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-[#5A6472]">
            © {new Date().getFullYear()} {BRAND.name}. All corporate advisory rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((legal) => (
              <Link
                key={legal.href}
                href={legal.href}
                className="text-[#8C96A5] hover:text-[#C9A24B] transition-colors underline"
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
