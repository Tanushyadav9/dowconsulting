import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const eventType = payload.type;
    const data = payload.data;

    if (!eventType || !data) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const clerkId = data.id;
    const primaryEmail =
      data.email_addresses?.find((e: any) => e.id === data.primary_email_address_id)?.email_address ||
      data.email_addresses?.[0]?.email_address ||
      "";

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || null;
    const phone = data.phone_numbers?.[0]?.phone_number || null;
    const imageUrl = data.image_url || null;

    if (eventType === "user.created" || eventType === "user.updated") {
      if (primaryEmail) {
        await prisma.user.upsert({
          where: { clerkId },
          update: {
            email: primaryEmail.toLowerCase(),
            name,
            phone,
            imageUrl,
          },
          create: {
            clerkId,
            email: primaryEmail.toLowerCase(),
            name,
            phone,
            imageUrl,
          },
        });
      }
    } else if (eventType === "user.deleted") {
      await prisma.user.deleteMany({
        where: { clerkId },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Clerk webhook processing error:", err);
    return NextResponse.json({ error: err.message || "Webhook processing failed" }, { status: 500 });
  }
}
