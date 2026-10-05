import { BRAND } from "@/lib/constants/brand";
import { ExternalLink, Compass, Sparkles, Building2, ArrowRight } from "lucide-react";

export function EcosystemCrossPromotion() {
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
              Specialized Guidance Across Enterprise, Space &amp; Astrology
            </h2>
            <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
              <strong>DOW Consulting</strong> is strictly focused on commercial enterprises, retail networks, and corporate milestone timing. For individual Vedic astrology consultations or residential Vastu harmony, explore our sister platforms led by Niraj Kumar:
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
                  Vedic Astrology
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F7F6F3] group-hover:text-[#C9A24B] transition-colors">
                  Aapka Astro
                </h3>
                <p className="text-xs text-[#C9A24B] font-semibold mt-0.5">
                  Personal Vedic Astrological Guidance &amp; Horoscopes
                </p>
              </div>

              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Dedicated to individual birth charts, personal life decisions, career pivots, matchmaking, and planetary transit guidance. Grounded in authentic Vedic astrology principles.
              </p>

              <div className="pt-2 text-xs text-[#E2E8F0] space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                  <span>Personal Kundli &amp; Birth Chart Reading</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                  <span>Career &amp; Relationship Transit Timing</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3D54]">
              <a
                href="https://aapkaastro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3 rounded bg-[#111B27] hover:bg-[#2A3D54] text-xs font-bold text-[#F7F6F3] transition-colors group/btn"
              >
                <span>Visit Aapka Astro</span>
                <ExternalLink className="w-4 h-4 text-[#C9A24B] group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 2: Viar.in */}
          <div className="bg-[#1B2838] rounded-lg p-6 sm:p-8 border border-[#2A3D54] flex flex-col justify-between space-y-6 hover:border-[#C9A24B]/60 transition-colors group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg bg-[#111B27] border border-[#2A3D54] flex items-center justify-center text-[#C9A24B]">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#111B27] text-[#C9A24B] border border-[#2A3D54]">
                  Residential Vastu
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F7F6F3] group-hover:text-[#C9A24B] transition-colors">
                  Viar.in
                </h3>
                <p className="text-xs text-[#C9A24B] font-semibold mt-0.5">
                  Authentic Vastu &amp; Residential Spatial Harmony
                </p>
              </div>

              <p className="text-xs text-[#8C96A5] leading-relaxed">
                Specialized in home architecture, residential floor plans, plot selections, and non-demolition domestic energy balancing to promote family harmony, health, and peaceful living.
              </p>

              <div className="pt-2 text-xs text-[#E2E8F0] space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                  <span>Residential Floor Plan &amp; Plot Layouts</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8C96A5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"></span>
                  <span>Non-Demolition Domestic Energy Harmonization</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3D54]">
              <a
                href="https://viar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3 rounded bg-[#111B27] hover:bg-[#2A3D54] text-xs font-bold text-[#F7F6F3] transition-colors group/btn"
              >
                <span>Visit Viar.in</span>
                <ExternalLink className="w-4 h-4 text-[#C9A24B] group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
