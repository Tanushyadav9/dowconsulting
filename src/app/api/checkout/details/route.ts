import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`checkout_details:${ip}`, 30, 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": rateLimit.retryAfterSeconds.toString() },
      }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const quoteId = searchParams.get("quoteId");
    const packageParam = searchParams.get("package");

    // Case 1: Custom Quote Flow
    if (quoteId) {
      const quote = await prisma.quote.findUnique({
        where: { id: quoteId },
        include: { submission: true },
      });

      if (!quote) {
        return NextResponse.json({ error: "Quote proposal not found or expired." }, { status: 404 });
      }

      return NextResponse.json({
        type: "QUOTE",
        quoteId: quote.id,
        title: quote.title,
        scopeSummary: quote.scopeSummary,
        amount: quote.amount,
        currency: quote.currency,
        status: quote.status,
        clientName: quote.submission?.contactName || "",
        clientEmail: quote.submission?.contactEmail || "",
        businessName: quote.submission?.businessName || "",
        isCheckoutAllowed: quote.status === "SENT" || quote.status === "ACCEPTED",
      });
    }

    // Case 2: Package Flow
    if (packageParam) {
      const pkg = await prisma.package.findFirst({
        where: {
          OR: [{ slug: packageParam }, { id: packageParam }],
        },
      });

      if (!pkg) {
        return NextResponse.json({
          type: "PACKAGE",
          isCheckoutAllowed: false,
          error: "Selected package does not exist or has not been published.",
        }, { status: 404 });
      }

      return NextResponse.json({
        type: "PACKAGE",
        packageId: pkg.id,
        slug: pkg.slug,
        title: pkg.name,
        subtitle: pkg.subtitle,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        inclusions: pkg.inclusions,
        isActive: pkg.isActive,
        isCheckoutAllowed: pkg.isActive === true, // STRICT: Only allow checkout if published!
      });
    }

    return NextResponse.json({ error: "No package or quote specified." }, { status: 400 });
  } catch (error: any) {
    console.error("GET /api/checkout/details error:", error);
    return NextResponse.json({ error: error.message || "Failed to load checkout details" }, { status: 500 });
  }
}
