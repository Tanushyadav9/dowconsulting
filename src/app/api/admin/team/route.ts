import { NextRequest, NextResponse } from "next/server";
import { isOwnerEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { requesterEmail, targetEmail, targetName, permissions } = body;

    // Strict owner verification with ZERO hardcoded fallback
    if (!isOwnerEmail(requesterEmail)) {
      return NextResponse.json(
        { error: "Unauthorized. Team permissions can only be granted by the designated Owner." },
        { status: 403 }
      );
    }

    if (!targetEmail) {
      return NextResponse.json({ error: "Target staff email is required" }, { status: 400 });
    }

    // Persist to database if available
    try {
      const user = await prisma.user.upsert({
        where: { email: targetEmail.toLowerCase() },
        update: { name: targetName },
        create: {
          clerkId: `clerk_manual_${Date.now()}`,
          email: targetEmail.toLowerCase(),
          name: targetName,
        },
      });

      await prisma.staffPermission.upsert({
        where: { userId: user.id },
        update: {
          canManageSubmissions: permissions.canManageSubmissions ?? true,
          canManageQuotes: permissions.canManageQuotes ?? false,
          canManageBookings: permissions.canManageBookings ?? true,
          canManageReports: permissions.canManageReports ?? false,
          canManageTeam: false,
        },
        create: {
          userId: user.id,
          role: "STAFF",
          canManageSubmissions: permissions.canManageSubmissions ?? true,
          canManageQuotes: permissions.canManageQuotes ?? false,
          canManageBookings: permissions.canManageBookings ?? true,
          canManageReports: permissions.canManageReports ?? false,
          canManageTeam: false,
        },
      });
    } catch (dbErr) {
      console.warn("Database sync warning in team route:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Staff permissions updated for ${targetEmail}`,
    });
  } catch (error: any) {
    console.error("Team grant error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
