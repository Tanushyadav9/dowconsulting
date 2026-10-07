import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendIntakeConfirmationEmail } from "@/lib/email/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { createCaseFromSubmission } from "@/lib/cases";

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
      teamSize,
      locationCity,
      locationState,
      locationCountry,
      serviceRequested,
      serviceDetails,
      premisesStatus,
      floorAreaSqFt,
      currentTimeline,
      urgency,
      primaryGoals,
      keyChallenges,
      budgetRange,
      preferredChannel,
      consentConfidentiality,
    } = body;

    if (!contactName || !contactEmail || !businessName) {
      return NextResponse.json(
        { error: "Missing required contact or business fields" },
        { status: 400 }
      );
    }

    if (consentConfidentiality !== true) {
      return NextResponse.json(
        { error: "Non-disclosure and confidentiality consent is required to submit an advisory assessment." },
        { status: 400 }
      );
    }

    // Persist to Prisma database - structured data
    const submission = await prisma.intakeSubmission.create({
      data: {
        contactName: contactName.trim(),
        contactEmail: contactEmail.toLowerCase().trim(),
        contactPhone: contactPhone.trim(),
        businessName: businessName.trim(),
        businessType: businessType || "Retail & Consumer Goods",
        businessStage: businessStage || "early",
        teamSize: teamSize || "1",
        locationCity: locationCity || "Noida",
        locationState: locationState || "",
        locationCountry: locationCountry || "India",
        serviceRequested: serviceRequested || "GTM_STRATEGY",
        serviceDetails: serviceDetails || {}, // Structured branch answers
        premisesStatus: premisesStatus || null,
        floorAreaSqFt: floorAreaSqFt || null,
        currentTimeline: currentTimeline || "Next 30 days",
        urgency: urgency || currentTimeline || null,
        primaryGoals: primaryGoals || "",
        keyChallenges: keyChallenges || "",
        budgetRange: budgetRange || null,
        preferredChannel: preferredChannel === "GOOGLE_MEET" ? "GOOGLE_MEET" : "WHATSAPP_CALL",
        status: "UNDER_REVIEW",
      },
    });

    // Automatically initialize consulting Case with the 6 workflow stages
    let caseRecord = null;
    try {
      caseRecord = await createCaseFromSubmission(submission.id);
    } catch (caseErr) {
      console.error("Failed to initialize Case from submission:", caseErr);
    }

    // Trigger Lifecycle Email 1: Intake Submission Confirmation via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await sendIntakeConfirmationEmail({
          to: contactEmail,
          name: contactName,
          businessName,
          submissionId: caseRecord?.caseNumber || submission.id,
        });
      } catch (emailErr) {
        console.warn("Intake confirmation email dispatch error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: submission.id,
      caseNumber: caseRecord?.caseNumber || null,
      message: "Intake successfully received and consulting case initialized.",
    });
  } catch (error: any) {
    console.error("Intake submission error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
