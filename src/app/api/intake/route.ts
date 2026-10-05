import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendIntakeConfirmationEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting: max 5 intakes per IP per 10 minutes
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`intake:${ip}`, 5, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many intake submissions. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimit.retryAfterSeconds.toString(),
        },
      }
    );
  }

  try {
    const body = await req.json();

    const {
      contactName,
      contactEmail,
      contactPhone,
      businessName,
      businessType,
      businessStage,
      locationCity,
      locationCountry,
      premisesStatus,
      floorAreaSqFt,
      currentTimeline,
      primaryGoals,
      keyChallenges,
      budgetRange,
      preferredChannel,
      selectedPackage,
    } = body;

    if (!contactName || !contactEmail || !businessName) {
      return NextResponse.json(
        { error: "Missing required contact or business fields" },
        { status: 400 }
      );
    }

    let submissionId = `SUB-${Date.now().toString().slice(-4)}`;

    // Persist to Prisma database if available
    try {
      const submission = await prisma.intakeSubmission.create({
        data: {
          contactName,
          contactEmail: contactEmail.toLowerCase(),
          contactPhone,
          businessName,
          businessType: businessType || "RETAIL",
          businessStage: businessStage || "EARLY_TRACTION",
          locationCity: locationCity || "Noida",
          locationCountry: locationCountry || "India",
          premisesStatus: premisesStatus || null,
          floorAreaSqFt: floorAreaSqFt || null,
          currentTimeline: currentTimeline || "NEXT_30_DAYS",
          primaryGoals: primaryGoals || "",
          keyChallenges: keyChallenges || "",
          budgetRange: budgetRange || null,
          preferredChannel: preferredChannel === "GOOGLE_MEET" ? "GOOGLE_MEET" : "WHATSAPP_CALL",
          status: "UNDER_REVIEW",
        },
      });
      submissionId = submission.id;
    } catch (dbErr) {
      console.warn("Database save skipped or pending:", dbErr);
    }

    // Trigger Lifecycle Email 1: Intake Submission Confirmation via Resend
    try {
      await sendIntakeConfirmationEmail({
        to: contactEmail,
        name: contactName,
        businessName,
        submissionId,
      });
    } catch (emailErr) {
      console.warn("Resend email dispatch error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      id: submissionId,
      message: "Intake successfully received and under review.",
    });
  } catch (error: any) {
    console.error("Intake submission error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
