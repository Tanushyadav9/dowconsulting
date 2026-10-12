import { notFound } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { EXPERT_PANEL, hasActiveExpertPanel } from "@/lib/constants/experts";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { Award, Phone, MessageSquare } from "lucide-react";

export const metadata = {
  title: `Expert Panel | ${BRAND.name}`,
  description: `Panel of Experts collaborating with DOW Consulting on specialized practice areas.`,
};

export default function ExpertPanelPage() {
  // Hide the page completely until at least one expert besides Niraj Kumar is added
  if (!hasActiveExpertPanel()) {
    notFound();
  }

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          <span>Advisory Network</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Expert Panel
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Our Panel of Experts brings specialized cross-sector capabilities to complex commercial engagements under the guidance of Consultant Niraj Kumar.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERT_PANEL.map((expert) => (
            <div
              key={expert.id}
              className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 hover:border-[#1B2838] transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#1B2838]">{expert.name}</h3>
                <p className="text-xs text-[#C9A24B] font-semibold uppercase tracking-wider">
                  {expert.designation}
                </p>
                <p className="text-xs text-[#8C96A5]">
                  Expertise: {expert.areaOfExpertise}
                </p>
              </div>
              <p className="text-xs text-[#5A6472] leading-relaxed pt-2 border-t border-[#E2E8F0]">
                {expert.shortBio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
