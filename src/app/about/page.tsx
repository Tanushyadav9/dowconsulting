import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { Award, Briefcase, GraduationCap, MapPin, MessageSquare, ArrowRight, Users, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: `About the Practice & Lead Advisor | ${BRAND.name}`,
  description:
    "Learn about DOW Consulting's team model and Lead Strategic Advisor Niraj Kumar's corporate background at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food. [Draft copy]",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            <span>Practice Overview &amp; Leadership [Draft Copy]</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            About DOW Consulting
          </h1>
          <p className="text-lg text-[#5A6472] leading-relaxed">
            A collaborative business consulting practice dedicated to <strong>startups, small companies, and MSMEs</strong>, supported by a specialized team and led by Lead Strategic Advisor <strong>{BRAND.founder.name}</strong>.
          </p>
          <div className="p-3 bg-[#F7EED9] border border-[#E3D1A5] rounded text-xs text-[#8C6A1E] max-w-xl">
            <strong>Draft Notice:</strong> Practice narrative and credentials are draft summaries pending final client wording from Niraj Kumar.
          </div>
        </div>
      </section>

      {/* 2. Practice Overview & Team Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-sm text-[#5A6472] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#1B2838]">
              The Advisory Practice &amp; Team Model
            </h2>
            <p>
              DOW Consulting is structured around the practical strategic requirements of emerging enterprises, small businesses, and MSMEs. We operate as a <strong>collaborative team, not a single consultant</strong>. Different team members handle specialized functions across the advisory engagement lifecycle:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#1B2838] uppercase tracking-wide block">
                  1. Information Collection
                </span>
                <p className="text-xs text-[#5A6472]">
                  Dedicated team members collect and organize client intake details, operational parameters, and founder briefs.
                </p>
              </div>

              <div className="p-4 rounded bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#1B2838] uppercase tracking-wide block">
                  2. Market Research
                </span>
                <p className="text-xs text-[#5A6472]">
                  Specialists research industry benchmarks, sector trends, competitor positioning, and customer dynamics.
                </p>
              </div>

              <div className="p-4 rounded bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-xs text-[#1B2838] uppercase tracking-wide block">
                  3. Strategic Consultation
                </span>
                <p className="text-xs text-[#5A6472]">
                  Consultants and lead advisor synthesize research into actionable GTM, expansion, or new-business roadmaps.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1B2838] pt-4">
              Focus Areas for Emerging Enterprises
            </h3>
            <p>
              The firm concentrates on four core service areas where early and growing companies require structured guidance:
            </p>
            <ul className="space-y-2 pl-4 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>GTM (Go-to-Market) Strategy:</strong> Target customer definition, positioning, channels, and launch sequencing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>Market Research:</strong> Competitive benchmarking, demand dynamics, and sector opportunity assessment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>Business Expansion Strategy:</strong> Geographic rollouts, new service lines, and operational scaling planning.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span><strong>New Business Start Consultation:</strong> Feasibility review, business model structuring, and foundational planning.</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#1B2838] pt-4">
              Lead Strategic Advisor Corporate Background
            </h3>
            <p>
              Strategic guidance is led by <strong>{BRAND.founder.name}</strong>, drawing upon his executive corporate operating career as <strong>&ldquo;{BRAND.founder.corporateExperience}&rdquo;</strong>.
            </p>
            <p className="text-xs text-[#5A6472]">
              This corporate stewardship provides practical insight into merchandising, store networks, supply chains, sales channel development, and organizational execution.
            </p>
          </div>

          {/* Right Column: Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-lg space-y-6">
              <div className="border-b border-[#2A3D54] pb-4">
                <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                  Lead Strategic Advisor Credentials
                </span>
                <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">{BRAND.founder.name}</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-sm text-[#F7F6F3] block mb-1">Corporate Operating Experience</strong>
                  <p className="text-[#8C96A5] leading-relaxed">
                    &ldquo;{BRAND.founder.corporateExperience}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2A3D54] space-y-3">
                  <strong className="text-sm text-[#F7F6F3] block">Academic &amp; Executive Credentials</strong>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">B.Sc. (Hons.) in Physics</strong>
                      <p className="text-[#8C96A5]">Scientific grounding in analytical methodology and quantitative mechanics.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">PGDBM in International Business &amp; Marketing</strong>
                      <p className="text-[#8C96A5]">Postgraduate qualification in trade dynamics, commercial structuring, and marketing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-[#F7F6F3]">XLRI</strong>
                      <p className="text-[#8C96A5]">Leadership Development &amp; Change Management Certification.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A3D54] text-[11px] text-[#8C96A5] italic">
                Note: All credentials above belong strictly to Niraj Kumar personally. DOW Consulting does not state a founding year, number of clients, or past financial results for the firm.
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="bg-[#FFFFFF] p-6 rounded border border-[#E2E8F0] space-y-3 text-xs">
              <h4 className="font-bold text-[#1B2838] uppercase tracking-wider">
                Consulting Desk
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
            Connect with Our Consulting Team
          </h2>
          <p className="text-xs text-[#5A6472] max-w-lg mx-auto">
            Whether you are preparing a go-to-market plan, expanding operations, conducting research, or launching a new entity.
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
              href="/services"
              className="inline-flex justify-center items-center gap-2 bg-[#F7F6F3] hover:bg-[#E2E8F0] text-[#1B2838] px-6 py-3 rounded font-semibold text-xs border border-[#E2E8F0]"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
