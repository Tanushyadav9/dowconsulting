import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOwnerNewFeedbackNotificationEmail } from "@/lib/email/resend";
import { logCaseAction } from "@/lib/cases";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Feedback token is required." }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { feedbackToken: token },
      include: {
        case: {
          select: {
            caseNumber: true,
            title: true,
            serviceRequested: true,
            clientName: true,
          },
        },
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Invalid or expired feedback link. Please check your delivery email." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      caseNumber: testimonial.case?.caseNumber || null,
      serviceRequested: testimonial.serviceUsed,
      clientName: testimonial.clientName,
      company: testimonial.company,
      hasSubmitted: Boolean(testimonial.quote && testimonial.quote.length > 0),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      token,
      clientName,
      company,
      role,
      quote,
      consentConfirmed,
      attributionPreference,
    } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing feedback verification token." }, { status: 400 });
    }

    if (!clientName?.trim()) {
      return NextResponse.json(
        { error: "Please provide your name or preferred initials for attribution." },
        { status: 400 }
      );
    }

    if (!quote?.trim() || quote.trim().length < 15) {
      return NextResponse.json(
        { error: "Please provide your genuine experience (at least 15 characters)." },
        { status: 400 }
      );
    }

    if (!consentConfirmed) {
      return NextResponse.json(
        {
          error:
            "Consent confirmation is required to proceed. DOW Consulting only accepts genuine feedback where client consent has been explicitly granted.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.testimonial.findUnique({
      where: { feedbackToken: token },
      include: { case: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Invalid or expired feedback link." },
        { status: 404 }
      );
    }

    const consentNote = `Client submitted feedback form on ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}. Attribution preference: ${attributionPreference?.trim() || "Full name / agreed format"}. Token: ${token.substring(0, 8)}...`;

    // Update testimonial - always enters as PENDING and UNPUBLISHED
    const updated = await prisma.testimonial.update({
      where: { id: existing.id },
      data: {
        clientName: clientName.trim(),
        company: company?.trim() || null,
        role: role?.trim() || null,
        quote: quote.trim(),
        consentConfirmed: true,
        consentNote,
        status: "PENDING",
        isPublished: false, // Must be explicitly published by Owner
      },
    });

    // If attached to a Case, record audit log
    if (existing.caseId) {
      try {
        await logCaseAction({
          caseId: existing.caseId,
          actorId: existing.case?.userId || "client",
          actorName: clientName.trim(),
          actorRole: "CLIENT",
          action: "CLIENT_FEEDBACK_RECEIVED",
          details: {
            consentConfirmed: true,
            hasCompanyAttribution: Boolean(company),
          },
        });
      } catch (logErr) {
        console.warn("Could not log case action for client feedback:", logErr);
      }
    }

    // Notify Owner via Resend
    const ownerEmail = process.env.OWNER_EMAIL?.trim();
    if (ownerEmail && process.env.RESEND_API_KEY) {
      try {
        await sendOwnerNewFeedbackNotificationEmail({
          ownerEmail,
          clientName: clientName.trim(),
          company: company?.trim(),
          caseNumber: existing.case?.caseNumber,
          quote: quote.trim(),
          consentConfirmed: true,
        });
      } catch (emailErr) {
        console.warn("Owner feedback notification error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your feedback has been received and submitted to practice leadership for verification and review.",
      testimonial: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
