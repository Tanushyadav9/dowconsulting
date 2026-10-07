import { Suspense } from "react";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { BRAND } from "@/lib/constants/brand";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: `Client Intake Assessment | ${BRAND.name}`,
  description:
    "Submit your business profile for strategic consulting across GTM strategy, market research, business expansion, or new business start consultation.",
};

export default function IntakePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1B2838] text-[11px] text-[#C9A24B] font-semibold tracking-wider uppercase">
          <Lock className="w-3.5 h-3.5 text-[#C9A24B]" />
          Confidential Business Intake
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
          Business Profile &amp; Diagnostic Intake
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6472] max-w-xl mx-auto">
          Please provide complete commercial context. Our consulting team reviews each intake to structure targeted research, consultation agenda, and strategic roadmaps.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-xs text-[#5A6472]">Loading intake assessment...</div>}>
        <IntakeForm />
      </Suspense>

      <div className="text-center text-[11px] text-[#8C96A5] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
        <span>Submissions are encrypted and reviewed solely by the Principal Advisory Desk.</span>
      </div>
    </div>
  );
}
