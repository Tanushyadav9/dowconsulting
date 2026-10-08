import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants/brand";
import { Users, Award, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export const metadata = {
  title: `Our Advisory Team | ${BRAND.name}`,
  description:
    "Meet the consulting specialists at DOW Consulting. Profiles created and verified directly by practice leadership.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let publishedMembers: any[] = [];

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("example")) {
    try {
      publishedMembers = await prisma.publicTeamMember.findMany({
        where: { isPublished: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
    } catch (err) {
      console.warn("Could not load team members from database:", err);
    }
  }

  return (
    <div className="space-y-16 py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Consulting Practice Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
            The Advisory Team
          </h1>
          <p className="text-base sm:text-lg text-[#5A6472] leading-relaxed">
            DOW Consulting operates as a <strong>collaborative team, not a single consultant</strong>. Different specialists handle research, consulting, and information collection across each engagement.
          </p>
        </div>
      </section>

      {/* 2. Team Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {publishedMembers.length === 0 ? (
          /* Zero Seeded Profiles State: Transparent note directing to About page */
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-14 h-14 bg-[#F7F6F3] rounded-full flex items-center justify-center mx-auto text-[#1B2838] border border-[#E2E8F0]">
              <Users className="w-7 h-7 text-[#C9A24B]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#1B2838]">
                Public Team Profiles Being Updated
              </h2>
              <p className="text-sm text-[#5A6472] leading-relaxed">
                Public team profiles are currently being updated by practice leadership. At DOW Consulting, we publish only authenticated profiles of verified practitioners.
              </p>
            </div>

            <div className="bg-[#F7F6F3] p-4 rounded text-xs text-[#5A6472] text-left border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-2 text-[#1B2838] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                <span>Practice Leadership &amp; Team Model</span>
              </div>
              <p>
                Our engagements are led and supervised by <strong>{BRAND.founder.name}</strong> (Former Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food).
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Read About Our Practice &amp; Leadership</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
              </Link>
            </div>
          </div>
        ) : (
          /* Real Published Profiles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#1B2838] transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  {/* Photo or Initials Avatar */}
                  <div className="flex items-center gap-4">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#C9A24B]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#1B2838] text-[#C9A24B] font-bold text-lg flex items-center justify-center border-2 border-[#C9A24B]">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#1B2838]">{member.name}</h3>
                      <p className="text-xs font-semibold text-[#C9A24B] uppercase tracking-wide">
                        {member.roleTitle}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#5A6472] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="bg-[#F7F6F3] px-6 py-3 border-t border-[#E2E8F0] text-[11px] text-[#8C96A5] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Verified DOW Consulting Specialist</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Leadership Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] rounded-xl border border-[#2A3D54] p-8 sm:p-10 text-[#F7F6F3] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
              Practice Leadership
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Guided by Lead Strategic Advisor Niraj Kumar
            </h3>
            <p className="text-xs text-[#8C96A5] leading-relaxed">
              Every advisory engagement and diagnostic report is reviewed and approved by Niraj Kumar, former Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <span>View Full Credentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
