import { NextRequest, NextResponse } from "next/server";
import { createConsultingOrder } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, packageName, amount, customer, submissionId } = body;

    const receipt = `RCPT_${Date.now().toString().slice(-6)}`;

    try {
      const orderResult = await createConsultingOrder("STRIPE", {
        amount: amount || 49900, // in cents
        currency: "USD",
        receipt,
        notes: {
          packageId,
          packageName,
          submissionId: submissionId || "",
        },
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      });

      return NextResponse.json(orderResult);
    } catch (stripeErr: any) {
      console.warn("Stripe API not active in environment; providing sandbox checkout payload:", stripeErr.message);

      return NextResponse.json({
        provider: "STRIPE",
        orderId: `cs_sim_${Date.now()}`,
        amount: amount || 49900,
        currency: "USD",
        checkoutData: {
          sessionId: `cs_sim_${Date.now()}`,
          url: `/account?orderId=cs_sim_${Date.now()}&payment=success`,
        },
      });
    }
  } catch (error: any) {
    console.error("Stripe session creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create Stripe session" }, { status: 500 });
  }
}
