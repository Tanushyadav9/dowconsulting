import { SISTER_SITES } from "@/lib/constants/ecosystem";
import { ExternalLink, GraduationCap, Sparkles } from "lucide-react";

export function EcosystemCrossPromotion() {
  const { aapkaAstro, viar } = SISTER_SITES;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-12 text-[#F7F6F3] space-y-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A3D54] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2838] border border-[#C9A24B]/30 text-[11px] text-[#C9A24B] font-bold uppercase tracking-wider">
              <span>The Niraj Kumar Advisory Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
              The Niraj Kumar Advisory &amp; Educational Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              <strong>DOW Consulting</strong> is dedicated to general business consulting—specializing in GTM strategy, market research, business expansion strategy, and new business starts for startups, small companies, and MSMEs. For individual Vedic astrology consultations, personal charts, or self-paced astrology education, explore our sister platforms founded and guided by Niraj Kumar:
            </p>
          </div>
        </div>

        {/* The Two Sister Platforms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Aapka Astro */}
          <div className="bg-[#1B2838] rounded-lg p-6 sm:p-8 border border-[#2A3D54] flex flex-col justify-between space-y-6 hover:border-[#C9A24B]/60 transition-colors group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#111B27] text-[#C9A24B] border border-[#2A3D54]">
                  {aapkaAstro.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F7F6F3] group-hover:text-[#C9A24B] transition-colors">
                  {aapkaAstro.name}
                </h3>
                <p className="text-xs text-[#C9A24B] font-semibold mt-0.5">
                  {aapkaAstro.tagline}
                </p>
              </div>

              <p className="text-xs text-[#8C96A5] leading-relaxed">
                {aapkaAstro.description}
              </p>

              <div className="pt-2 text-xs text-[#E2E8F0] space-y-1.5">
                {aapkaAstro.offerings.map((offering, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                    <span>{offering}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3D54]">
              <a
                href={aapkaAstro.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3 rounded bg-[#111B27] hover:bg-[#2A3D54] text-xs font-bold text-[#F7F6F3] transition-colors group/btn"
              >
                <span>Visit {aapkaAstro.name}</span>
                <ExternalLink className="w-4 h-4 text-[#C9A24B] group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 2: Viar.in */}
          <div className="bg-[#1B2838] rounded-lg p-6 sm:p-8 border border-[#2A3D54] flex flex-col justify-between space-y-6 hover:border-[#C9A24B]/60 transition-colors group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#111B27] text-[#C9A24B] border border-[#2A3D54]">
                  {viar.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F7F6F3] group-hover:text-[#C9A24B] transition-colors">
                  {viar.name}
                </h3>
                <p className="text-xs text-[#C9A24B] font-semibold mt-0.5">
                  {viar.tagline}
                </p>
              </div>

              <p className="text-xs text-[#8C96A5] leading-relaxed">
                {viar.description}
              </p>

              <div className="pt-2 text-xs text-[#E2E8F0] space-y-1.5">
                {viar.offerings.map((offering, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                    <span>{offering}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3D54]">
              <a
                href={viar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3 rounded bg-[#111B27] hover:bg-[#2A3D54] text-xs font-bold text-[#F7F6F3] transition-colors group/btn"
              >
                <span>Visit {viar.name}</span>
                <ExternalLink className="w-4 h-4 text-[#C9A24B] group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
