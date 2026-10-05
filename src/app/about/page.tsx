import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { Award, Briefcase, GraduationCap, MapPin, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: `About Niraj Kumar | ${BRAND.name}`,
  description:
    "Learn about Niraj Kumar's 20+ years of corporate leadership at Reliance Retail, Metro Cash & Carry, and his unique methodology in Strategic Business Timing & Commercial Vastu.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            Executive Profile &amp; Practice Foundations
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            About {BRAND.founder.name}
          </h1>
          <p className="text-lg text-[#5A6472] leading-relaxed">
            Over two decades of senior corporate leadership, retail operating stewardship, and enterprise business scaling — combined with structured commercial spatial and timing advisory.
          </p>
        </div>
      </section>

      {/* 2. Executive Bio & The Bridge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-sm text-[#5A6472] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#1B2838]">
              The Genesis of DOW Consulting
            </h2>
            <p>
              In corporate leadership, strategic timing and physical environment dictate operational efficiency far more than traditional spreadsheets acknowledge. During his tenure leading multi-crore retail chains, distribution networks, and supply chains, <strong>{BRAND.founder.name}</strong> observed recurring patterns: businesses with viable products often stumbled due to ill-timed expansions or spatially disruptive workspaces that created friction in decision-making and cash flow.
            </p>
            <p>
              DOW Consulting was established to address this precise intersection. It is not an astrology practice, nor is it generic management consulting. It is an executive advisory practice anchored in <strong>Strategic Business Timing &amp; Commercial Vastu</strong>.
            </p>

            <div className="bg-[#FFFFFF] border-l-4 border-[#C9A24B] p-6 rounded shadow-sm space-y-2 text-[#1B2838]">
              <p className="font-bold text-base">The Core Philosophy:</p>
              <p className="text-xs text-[#5A6472] leading-relaxed">
                &ldquo;Every commercial enterprise operates within two non-negotiable vectors: <strong>Time</strong> (when you sign leases, deploy capital, or launch divisions) and <strong>Space</strong> (how your leadership cabins, financial desks, and operational zones are physically oriented). Aligning both eliminates invisible drag on your balance sheet.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838] pt-4">
              Real Corporate Leadership Experience
            </h3>
            <p>
              Unlike conventional Vastu practitioners who have never run a P&amp;L or managed a corporate workforce, Niraj Kumar brings direct experience from India’s leading corporate enterprises:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B2838]">Vice President &amp; Business Head — Reliance Retail:</strong>
                  <p className="text-xs text-[#5A6472] mt-0.5">
                    Orchestrated large-scale retail operations, network expansion, supply chain logistics, and business turnaround strategies.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B2838]">Senior Corporate Head — Metro Cash &amp; Carry:</strong>
                  <p className="text-xs text-[#5A6472] mt-0.5">
                    Led strategic B2B wholesale distribution, inventory turnover, and institutional client engagement across regional clusters.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B2838]">Business Head — NIF Food:</strong>
                  <p className="text-xs text-[#5A6472] mt-0.5">
                    Oversaw production facility layout, supply chain governance, and commercial sales expansion.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-lg space-y-6">
              <div className="border-b border-[#2A3D54] pb-4">
                <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                  Academic &amp; Executive Credentials
                </span>
                <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">Verified Qualifications</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#F7F6F3]">B.Sc. (Hons.) in Physics</strong>
                    <p className="text-[#8C96A5]">Rigorous scientific grounding in mechanics, energy dynamics, and spatial fields.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#F7F6F3]">PGDBM in International Business &amp; Marketing</strong>
                    <p className="text-[#8C96A5]">Postgraduate mastery in cross-border trade, commercial economics, and market structuring.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-[#F7F6F3]">XLRI Jamshedpur</strong>
                    <p className="text-[#8C96A5]">Executive Certification in Leadership Development &amp; Change Management.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A3D54] space-y-2 text-xs">
                <p className="font-semibold text-[#C9A24B]">Advisory Delivery Non-Negotiables:</p>
                <div className="flex items-center gap-2 text-[#8C96A5]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>Every session includes both Live Call &amp; Written PDF Report</span>
                </div>
                <div className="flex items-center gap-2 text-[#8C96A5]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>WhatsApp Call or Google Meet direct with Niraj Kumar</span>
                </div>
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="bg-[#FFFFFF] p-6 rounded border border-[#E2E8F0] space-y-3 text-xs">
              <h4 className="font-bold text-[#1B2838] uppercase tracking-wider">
                Consulting Headquarters
              </h4>
              <div className="flex items-start gap-2 text-[#5A6472]">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <p>{BRAND.contact.address.full}</p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
                <a
                  href={BRAND.contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1B2838] hover:text-[#C9A24B]"
                >
                  WhatsApp: {BRAND.contact.whatsapp.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-[#FFFFFF] p-10 rounded border border-[#E2E8F0] max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#1B2838]">
            Work Directly with Niraj Kumar
          </h2>
          <p className="text-xs text-[#5A6472] max-w-lg mx-auto">
            Whether you are choosing a commercial property, planning a major expansion, or seeking clarity during organizational shifts.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/intake"
              className="inline-flex justify-center items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider"
            >
              <span>Submit Intake Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex justify-center items-center gap-2 bg-[#F7F6F3] hover:bg-[#E2E8F0] text-[#1B2838] px-6 py-3 rounded font-semibold text-xs border border-[#E2E8F0]"
            >
              <span>View Advisory Packages</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
