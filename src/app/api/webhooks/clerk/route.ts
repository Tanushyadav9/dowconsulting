import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[CRITICAL SECURITY ERROR] CLERK_WEBHOOK_SECRET is missing. Rejecting webhook in fail-closed mode.");
    return NextResponse.json(
      { error: "Server misconfiguration: CLERK_WEBHOOK_SECRET is required" },
      { status: 500 }
    );
  }

  // Get Svix headers for signature verification
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing required svix signature headers" },
      { status: 400 }
    );
  }

  // Get raw body for cryptographic verification
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    console.error("Svix webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Invalid cryptographic webhook signature" },
      { status: 400 }
    );
  }

  const eventType = evt.type;
  const data = evt.data;

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const clerkId = data.id;
      const primaryEmail =
        data.email_addresses?.find((e: any) => e.id === data.primary_email_address_id)?.email_address ||
        data.email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        console.warn(`User ${clerkId} has no primary email address.`);
        return NextResponse.json({ received: true });
      }

      const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || null;
      const phone = data.phone_numbers?.[0]?.phone_number || null;
      const imageUrl = data.image_url || null;

      // Upsert into local database
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

      console.log(`[Clerk Webhook] Successfully synced user ${primaryEmail} (${clerkId}) to database.`);
    } else if (eventType === "user.deleted") {
      const clerkId = data.id;
      if (clerkId) {
        await prisma.user.deleteMany({
          where: { clerkId },
        });
        console.log(`[Clerk Webhook] Successfully deleted user ${clerkId} from database.`);
      }
    }

    return NextResponse.json({ success: true, event: eventType });
  } catch (dbErr: any) {
    console.error("Database sync failed during Clerk webhook processing:", dbErr);
    return NextResponse.json(
      { error: "Database synchronization error", details: dbErr.message },
      { status: 500 }
    );
  }
}
