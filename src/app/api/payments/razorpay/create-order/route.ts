import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createConsultingOrder } from "@/lib/payments";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting: max 10 payment orders per IP per 10 minutes
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`payment_rzp:${ip}`, 10, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many payment requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": rateLimit.retryAfterSeconds.toString() },
      }
    );
  }

  try {
    const body = await req.json();
    const { packageId, quoteId, packageName, amount, customer, submissionId } = body;

    let verifiedAmount = 0;
    let verifiedTitle = packageName || "Advisory Engagement";

    // 1. Check if paying for a custom quote proposal
    if (quoteId) {
      const quote = await prisma.quote.findUnique({
        where: { id: quoteId },
      });

      if (!quote || (quote.status !== "SENT" && quote.status !== "ACCEPTED")) {
        return NextResponse.json(
          { error: "This quote proposal is invalid, expired, or already closed." },
          { status: 400 }
        );
      }

      verifiedAmount = quote.amount * 100; // paise
      verifiedTitle = quote.title;
    } else if (packageId) {
      // 2. Check if paying for a published package
      const pkg = await prisma.package.findFirst({
        where: {
          OR: [{ id: packageId }, { slug: packageId }],
          isActive: true, // STRICT FAIL-CLOSED: Must be published!
        },
      });

      if (!pkg) {
        return NextResponse.json(
          {
            error:
              "Selected package is not published for direct online checkout. Please submit an intake to receive a custom proposal.",
          },
          { status: 400 }
        );
      }

      verifiedAmount = pkg.priceINR * 100; // paise
      verifiedTitle = pkg.name;
    } else {
      return NextResponse.json(
        { error: "Missing valid packageId or quoteId for checkout." },
        { status: 400 }
      );
    }

    const receipt = `RCPT_${Date.now().toString().slice(-6)}`;

    const orderResult = await createConsultingOrder("RAZORPAY", {
      amount: verifiedAmount,
      currency: "INR",
      receipt,
      notes: {
        packageId: packageId || "",
        quoteId: quoteId || "",
        packageName: verifiedTitle,
        submissionId: submissionId || "",
      },
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });

    return NextResponse.json(orderResult);
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
