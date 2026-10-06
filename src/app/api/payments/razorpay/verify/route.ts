import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { sendPaymentReceiptEmail, sendBookingConfirmationEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      submissionId,
      customer,
      packageName,
      amount,
    } = body;

    const secret = requireEnv("RAZORPAY_KEY_SECRET", "Razorpay Key Secret for verifying payment signatures");

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required Razorpay payment verification parameters" },
        { status: 400 }
      );
    }

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Trigger Lifecycle Emails 3 & 4 via Resend
    if (customer?.email) {
      try {
        // Email 3: Payment Receipt
        await sendPaymentReceiptEmail({
          to: customer.email,
          name: customer.name || "Client",
          orderNumber,
          packageName: packageName || "Strategic Business Timing Advisory",
          amount: amount ? amount / 100 : 35000,
          currency: "INR",
          provider: "Razorpay (UPI / NetBanking / Cards)",
        });

        // Email 4: Booking Confirmation with WhatsApp Desk
        await sendBookingConfirmationEmail({
          to: customer.email,
          name: customer.name || "Client",
          packageName: packageName || "Strategic Business Timing Advisory",
          scheduledAt: "Scheduled upon calendar coordination",
          meetingChannel: "WHATSAPP_CALL",
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Payment successfully verified and booking confirmed.",
    });
  } catch (error: any) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 500 });
  }
}
