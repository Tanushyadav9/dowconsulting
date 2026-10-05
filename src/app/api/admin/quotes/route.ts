import { NextRequest, NextResponse } from "next/server";
import { sendQuoteDeliveryEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  try {
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

    const quoteId = `QT-${Date.now().toString().slice(-4)}`;
    const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout?quoteId=${quoteId}&submissionId=${submissionId}&amount=${amount}&currency=${currency}`;

    // Trigger Lifecycle Email 2: Custom Quote Delivery via Resend
    if (clientEmail) {
      try {
        await sendQuoteDeliveryEmail({
          to: clientEmail,
          name: clientName,
          businessName,
          quoteTitle,
          amount: Number(amount),
          currency: currency || "INR",
          quoteId,
          checkoutUrl,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: quoteId,
      message: `Quote proposal delivered to ${clientEmail}`,
    });
  } catch (error: any) {
    console.error("Quote delivery error:", error);
    return NextResponse.json({ error: error.message || "Failed to create quote" }, { status: 500 });
  }
}
