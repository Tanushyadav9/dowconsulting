import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import { EXPERT_PANEL, hasActiveExpertPanel } from "@/lib/constants/experts";

export const metadata = {
  title: `Expert Panel | ${BRAND.name}`,
  description: `Panel of Experts collaborating with DOW Consulting on specialised practice areas.`,
};

export default function ExpertPanelPage() {
  // Hide the page completely until at least one expert besides Niraj Kumar is added
  if (!hasActiveExpertPanel()) {
    notFound();
  }

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
          <span>Advisory Network</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#17477F] tracking-tight font-heading">
          Expert Panel
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Our Panel of Experts brings specialised cross-sector capabilities to complex commercial engagements under the guidance of Consultant Niraj Kumar.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERT_PANEL.map((expert) => (
            <div
              key={expert.id}
              className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#17477F] transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#17477F] font-heading">{expert.name}</h3>
                <p className="text-xs text-[#E02027] font-semibold uppercase tracking-wider">
                  {expert.designation}
                </p>
                <p className="text-xs text-slate-500">
                  Expertise: {expert.areaOfExpertise}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-[#E2E8F0]">
                {expert.shortBio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
