import { prisma } from "@/lib/prisma";
import { MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export async function TestimonialsSection() {
  let testimonials: any[] = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      where: {
        isPublished: true,
        consentConfirmed: true,
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take: 6,
    });
  } catch (err) {
    // Graceful fallback if database connection is pending
    return null;
  }

  // Strict Compliance Rule: When there are none, render nothing: no empty heading, no nav link, no placeholder text.
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-[#8C6A1E] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Verified Client Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
          Client Perspectives &amp; Engagement Outcomes
        </h2>
        <p className="text-sm text-[#5A6472] leading-relaxed">
          Remarks from founders, business heads, and enterprise leaders who engaged DOW Consulting for strategic advisory. Published exclusively with verified client consent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#1B2838] transition-colors flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8C96A5]">
                <span className="font-semibold text-[#C9A24B] uppercase tracking-wider">
                  {t.serviceUsed}
                </span>
                <span>
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-sm text-[#1B2838] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#1B2838]">{t.clientName}</p>
                {t.company && (
                  <p className="text-[11px] text-[#5A6472]">
                    {t.company} {t.role ? `• ${t.role}` : ""}
                  </p>
                )}
              </div>

              <div
                className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold"
                title="Explicit client consent verified on record"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Consent Confirmed</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
