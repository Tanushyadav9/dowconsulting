import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/payments";
import { requireEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { sendPaymentReceiptEmail, sendBookingConfirmationEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  const stripe = getStripeClient();
  const webhookSecret = requireEnv(
    "STRIPE_WEBHOOK_SECRET",
    "Stripe Webhook Secret for fail-closed event verification"
  );

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: any;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || "Client";
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const packageName = metadata.packageName || "Strategic Advisory Engagement";

    try {
      // 1. Record payment in Prisma database
      await prisma.payment.create({
        data: {
          paymentNumber: orderNumber,
          provider: "STRIPE",
          amount: Math.round(amountPaid),
          currency: (session.currency || "USD").toUpperCase(),
          status: "PAID",
          providerOrderId: session.id,
          providerPaymentId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
          packageId: metadata.packageId || null,
          quoteId: metadata.quoteId || null,
        },
      });

      // 2. If linked to quote, update quote status
      if (metadata.quoteId) {
        await prisma.quote.update({
          where: { id: metadata.quoteId },
          data: { status: "ACCEPTED" },
        }).catch((e) => console.warn("Could not update quote status:", e));
      }

      // 3. Dispatch Lifecycle Email 3: Payment Receipt via Resend
      if (customerEmail && process.env.RESEND_API_KEY) {
        await sendPaymentReceiptEmail({
          to: customerEmail,
          name: customerName,
          orderNumber,
          packageName,
          amount: amountPaid,
          currency: (session.currency || "USD").toUpperCase(),
          provider: "Stripe (International Cards)",
        }).catch((e) => console.warn("Failed to dispatch Stripe payment receipt email:", e));

        // 4. Dispatch Lifecycle Email 4: Booking Confirmation with WhatsApp desk
        await sendBookingConfirmationEmail({
          to: customerEmail,
          name: customerName,
          packageName,
          scheduledAt: "Scheduled upon direct coordination",
          meetingChannel: "WHATSAPP_CALL",
        }).catch((e) => console.warn("Failed to dispatch Stripe booking confirmation email:", e));
      }
    } catch (dbError) {
      console.error("Error processing Stripe successful checkout:", dbError);
    }
  }

  return NextResponse.json({ received: true });
}
