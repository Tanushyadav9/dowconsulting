import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants/brand";
import { ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";

export const metadata = {
  title: `Verified Client Testimonials | ${BRAND.name}`,
  description:
    "Authentic client feedback and strategic consultation experiences from verified founders and executives. Published with explicit client consent.",
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  let testimonials: any[] = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      where: {
        isPublished: true,
        consentConfirmed: true,
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    // If database unavailable or zero, redirect cleanly
    redirect("/");
  }

  // Strict Compliance Rule: When there are none, render nothing: no empty heading, no nav link, no placeholder text.
  if (testimonials.length === 0) {
    redirect("/");
  }

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Consent-Confirmed Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            Client Experiences &amp; Feedback
          </h1>
          <p className="text-base sm:text-lg text-[#5A6472] leading-relaxed">
            Genuine remarks from enterprise founders, executives, and MSME leaders who engaged DOW Consulting for strategic advisory. Published strictly with verified client consent.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}
