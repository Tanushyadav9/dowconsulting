import { NextRequest, NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getAuthContext } from "@/lib/auth";
import { sendQuoteDeliveryEmail } from "@/lib/email/resend";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || (!auth.isOwner && !auth.permissions?.canManageQuotes)) {
      return NextResponse.json({ error: "Unauthorized access to quotes" }, { status: 403 });
    }

    const [quotes, submissions] = await Promise.all([
      prisma.quote.findMany({
        include: { submission: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.intakeSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    return NextResponse.json({ quotes, submissions });
  } catch (error: any) {
    console.error("GET /api/admin/quotes error:", error);
    return NextResponse.json({ error: error.message || "Failed to load quotes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || !auth.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized: Building and dispatching custom quotes is strictly restricted to the Owner (Niraj Kumar)." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      submissionId,
      clientName,
      businessName,
      clientEmail,
      quoteTitle,
      scopeSummary,
      amount,
      currency,
    } = body;

    if (!submissionId || !quoteTitle || !amount || !clientEmail) {
      return NextResponse.json(
        { error: "Missing required quote fields (submissionId, quoteTitle, amount, clientEmail)" },
        { status: 400 }
      );
    }

    const appUrl = requireEnv("NEXT_PUBLIC_APP_URL", "Base application URL for quote checkout links");

    // Persist quote to database
    const quoteRecord = await prisma.quote.create({
      data: {
        submissionId,
        title: quoteTitle,
        scopeSummary: scopeSummary || "",
        amount: Number(amount),
        currency: currency || "INR",
        status: "SENT",
      },
    });

    // Update submission status to QUOTE_SENT
    try {
      await prisma.intakeSubmission.update({
        where: { id: submissionId },
        data: { status: "QUOTE_SENT" },
      });
    } catch (e) {
      console.warn("Could not update submission status:", e);
    }

    const checkoutUrl = `${appUrl}/checkout?quoteId=${quoteRecord.id}&submissionId=${submissionId}`;

    // Trigger Lifecycle Email 2: Custom Quote Delivery via Resend
    if (clientEmail && process.env.RESEND_API_KEY) {
      try {
        await sendQuoteDeliveryEmail({
          to: clientEmail,
          name: clientName || "Client",
          businessName: businessName || "Enterprise",
          quoteTitle,
          amount: Number(amount),
          currency: currency || "INR",
          quoteId: quoteRecord.id,
          checkoutUrl,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error for quote:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      quote: quoteRecord,
      checkoutUrl,
      message: `Quote proposal #${quoteRecord.id} successfully created and delivered to ${clientEmail}.`,
    });
  } catch (error: any) {
    console.error("Quote delivery error:", error);
    return NextResponse.json({ error: error.message || "Failed to create quote" }, { status: 500 });
  }
}
