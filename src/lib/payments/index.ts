import Razorpay from "razorpay";
import Stripe from "stripe";
import { requireEnv, getAppUrl } from "@/lib/env";

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
  const key_id = requireEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID", "Razorpay client Key ID");
  const key_secret = requireEnv("RAZORPAY_KEY_SECRET", "Razorpay backend Key Secret");

  return new Razorpay({
    key_id,
    key_secret,
  });
}

// Lazy initialization of Stripe
export function getStripeClient() {
  const secretKey = requireEnv("STRIPE_SECRET_KEY", "Stripe backend Secret Key");

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
        key: requireEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID", "Razorpay client Key ID"),
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
    const appUrl = getAppUrl();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: params.notes?.packageName || "DOW Consulting Strategic Engagement",
              description: "Business Consulting Engagement with Niraj Kumar & Advisory Team",
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
      success_url: `${appUrl}/account?session_id={CHECKOUT_SESSION_ID}&payment=success`,
      cancel_url: `${appUrl}/checkout?payment=cancelled`,
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
