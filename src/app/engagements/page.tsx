import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import {
  ENGAGEMENTS,
  TESTIMONIALS,
  hasActiveEngagements,
  hasActiveTestimonials,
} from "@/lib/constants/engagements";

export const metadata = {
  title: `Client Engagements & Testimonials | ${BRAND.name}`,
  description: `Authorized client engagements and testimonials for DOW Consulting.`,
};

export default function EngagementsPage() {
  // Hide the page completely while the files are empty
  if (!hasActiveEngagements() && !hasActiveTestimonials()) {
    notFound();
  }

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Client Engagements &amp; Testimonials
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Authorized case engagements and verified client feedback.
        </p>
      </section>

      {hasActiveEngagements() && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#1B2838]">Authorized Engagements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGAGEMENTS.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border border-[#E2E8F0]">
                <h3 className="text-lg font-bold text-[#1B2838]">{item.projectTitle}</h3>
                <p className="text-xs text-[#C9A24B]">{item.industry} &bull; {item.serviceCategory}</p>
                <p className="text-xs text-[#5A6472] mt-2">{item.scopeSummary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasActiveTestimonials() && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#1B2838]">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3">
                <p className="text-xs italic text-[#1B2838]">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="text-xs font-bold text-[#1B2838]">{item.author}</p>
                  <p className="text-[11px] text-[#8C96A5]">{item.designation}, {item.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
