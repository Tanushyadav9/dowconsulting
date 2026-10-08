import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("example")) {
    return NextResponse.json({
      success: true,
      hasPublishedTeam: false,
      publishedTeamCount: 0,
      hasPublishedTestimonials: false,
      publishedTestimonialsCount: 0,
    });
  }

  try {
    const [publishedTeamCount, publishedTestimonialsCount] = await Promise.all([
      prisma.publicTeamMember.count({
        where: { isPublished: true },
      }),
      prisma.testimonial.count({
        where: {
          isPublished: true,
          consentConfirmed: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      hasPublishedTeam: publishedTeamCount > 0,
      publishedTeamCount,
      hasPublishedTestimonials: publishedTestimonialsCount > 0,
      publishedTestimonialsCount,
    });
  } catch (error: any) {
    // Graceful fallback if database connection is pending
    return NextResponse.json({
      success: false,
      hasPublishedTeam: false,
      publishedTeamCount: 0,
      hasPublishedTestimonials: false,
      publishedTestimonialsCount: 0,
    });
  }
}
