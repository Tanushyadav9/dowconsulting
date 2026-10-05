import Razorpay from "razorpay";
import Stripe from "stripe";

export interface CreateOrderParams {
  amount: number; // in lowest currency unit (paise for INR, cents for USD)
  currency: "INR" | "USD";
  receipt: string;
  notes?: Record<string, string>;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface PaymentProviderResult {
  provider: "RAZORPAY" | "STRIPE";
  orderId: string;
  amount: number;
  currency: string;
  checkoutData?: Record<string, any>;
}

// Lazy initialization of Razorpay
export function getRazorpayClient() {
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    console.warn("Razorpay credentials missing from environment.");
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

// Lazy initialization of Stripe
export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.warn("Stripe credentials missing from environment.");
    return null;
  }

  return new Stripe(secretKey, {
    apiVersion: "2024-11-20.acacia" as any,
  });
}

/**
 * Unified Payment Provider Abstraction
 */
export async function createConsultingOrder(
  provider: "RAZORPAY" | "STRIPE",
  params: CreateOrderParams
): Promise<PaymentProviderResult> {
  if (provider === "RAZORPAY") {
    const rzp = getRazorpayClient();
    if (!rzp) {
      throw new Error("Razorpay is not configured on this server.");
    }

    const order = await rzp.orders.create({
      amount: params.amount, // in paise
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes,
    });

    return {
      provider: "RAZORPAY",
      orderId: order.id,
      amount: typeof order.amount === "number" ? order.amount : params.amount,
      currency: "INR",
      checkoutData: {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        orderId: order.id,
        amount: order.amount,
        name: "DOW Consulting",
        description: params.notes?.packageName || "Strategic Advisory Engagement",
        prefill: {
          name: params.customer.name,
          email: params.customer.email,
          contact: params.customer.phone || "",
        },
        theme: {
          color: "#1B2838", // Charcoal Navy
        },
      },
    };
  } else {
    // Stripe Flow
    const stripe = getStripeClient();
    if (!stripe) {
      throw new Error("Stripe is not configured on this server.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: params.notes?.packageName || "DOW Consulting Strategic Engagement",
              description: "Strategic Business Timing & Commercial Vastu Consultation with Niraj Kumar",
            },
            unit_amount: params.amount, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: params.customer.email,
      metadata: {
        receipt: params.receipt,
        ...params.notes,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/account?session_id={CHECKOUT_SESSION_ID}&payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout?payment=cancelled`,
    });

    return {
      provider: "STRIPE",
      orderId: session.id,
      amount: params.amount,
      currency: "USD",
      checkoutData: {
        sessionId: session.id,
        url: session.url,
      },
    };
  }
}
