import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TestimonialStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner && !authContext.permissions?.canManageReports) {
      return NextResponse.json(
        { error: "Unauthorized. Testimonials can only be managed by practice leadership." },
        { status: 403 }
      );
    }

    const testimonials = await prisma.testimonial.findMany({
      include: {
        case: {
          select: {
            caseNumber: true,
            clientName: true,
            serviceRequested: true,
          },
        },
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    const stats = {
      total: testimonials.length,
      published: testimonials.filter((t) => t.isPublished).length,
      pending: testimonials.filter((t) => t.status === "PENDING").length,
      consentConfirmed: testimonials.filter((t) => t.consentConfirmed).length,
    };

    return NextResponse.json({ success: true, testimonials, stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can create and approve testimonials." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      clientName,
      company,
      role,
      quote,
      serviceUsed,
      date,
      consentConfirmed,
      consentNote,
      isPublished,
      status,
      caseId,
    } = body;

    if (!clientName?.trim()) {
      return NextResponse.json({ error: "Client name or initials is required." }, { status: 400 });
    }
    if (!quote?.trim()) {
      return NextResponse.json({ error: "Quote text is required." }, { status: 400 });
    }
    if (!serviceUsed?.trim()) {
      return NextResponse.json({ error: "Service used is required." }, { status: 400 });
    }

    // Consent Rule: Cannot publish without consentConfirmed === true and non-empty consentNote
    const shouldPublish = Boolean(isPublished);
    const hasConsent = Boolean(consentConfirmed);

    if (shouldPublish && (!hasConsent || !consentNote?.trim())) {
      return NextResponse.json(
        {
          error:
            "Mandatory compliance rule: Cannot publish a testimonial without confirmed client consent and a note recording how consent was given (e.g. WhatsApp message, email verification).",
        },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: clientName.trim(),
        company: company?.trim() || null,
        role: role?.trim() || null,
        quote: quote.trim(),
        serviceUsed: serviceUsed.trim(),
        date: date ? new Date(date) : new Date(),
        consentConfirmed: hasConsent,
        consentNote: consentNote?.trim() || null,
        isPublished: shouldPublish,
        status: (status as TestimonialStatus) || (shouldPublish ? "APPROVED" : "PENDING"),
        caseId: caseId || null,
      },
    });

    return NextResponse.json({
      success: true,
      testimonial,
      message: "Testimonial record created successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can modify or publish testimonials." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      id,
      clientName,
      company,
      role,
      quote,
      serviceUsed,
      date,
      consentConfirmed,
      consentNote,
      isPublished,
      status,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required." }, { status: 400 });
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    const finalConsentConfirmed =
      typeof consentConfirmed === "boolean" ? consentConfirmed : existing.consentConfirmed;
    const finalConsentNote =
      consentNote !== undefined ? consentNote?.trim() : existing.consentNote;
    const finalIsPublished =
      typeof isPublished === "boolean" ? isPublished : existing.isPublished;

    // Strict Enforcement: Cannot publish if consent is not confirmed or consentNote is empty
    if (finalIsPublished && (!finalConsentConfirmed || !finalConsentNote)) {
      return NextResponse.json(
        {
          error:
            "Mandatory compliance rule: Cannot publish testimonial without confirmed consent and a documented consent note.",
        },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (typeof clientName === "string") updateData.clientName = clientName.trim();
    if (company !== undefined) updateData.company = company?.trim() || null;
    if (role !== undefined) updateData.role = role?.trim() || null;
    if (typeof quote === "string") updateData.quote = quote.trim();
    if (typeof serviceUsed === "string") updateData.serviceUsed = serviceUsed.trim();
    if (date) updateData.date = new Date(date);
    if (typeof consentConfirmed === "boolean") updateData.consentConfirmed = consentConfirmed;
    if (consentNote !== undefined) updateData.consentNote = consentNote?.trim() || null;
    if (typeof isPublished === "boolean") updateData.isPublished = isPublished;
    if (status) updateData.status = status as TestimonialStatus;

    const updated = await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      testimonial: updated,
      message: "Testimonial updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can delete testimonials." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required." }, { status: 400 });
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
