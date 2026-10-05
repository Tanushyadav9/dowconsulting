import { NextRequest, NextResponse } from "next/server";
import { createConsultingOrder } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, packageName, amount, customer, submissionId } = body;

    const receipt = `RCPT_${Date.now().toString().slice(-6)}`;

    // If Razorpay credentials exist in env, create real order; otherwise provide fallback response
    try {
      const orderResult = await createConsultingOrder("RAZORPAY", {
        amount: amount || 3500000,
        currency: "INR",
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
    } catch (rzpErr: any) {
      console.warn("Razorpay API not active in environment; providing sandbox order payload:", rzpErr.message);

      return NextResponse.json({
        provider: "RAZORPAY",
        orderId: `order_sim_${Date.now()}`,
        amount: amount || 3500000,
        currency: "INR",
        checkoutData: {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
          orderId: `order_sim_${Date.now()}`,
          amount: amount || 3500000,
          name: "DOW Consulting",
          description: packageName || "Strategic Advisory Engagement",
          prefill: customer,
          theme: { color: "#1B2838" },
        },
      });
    }
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
