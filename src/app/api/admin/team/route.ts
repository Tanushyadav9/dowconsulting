import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Team permissions can only be viewed by the designated Owner." },
        { status: 403 }
      );
    }

    const staffMembers = await prisma.user.findMany({
      where: {
        staffPermission: {
          isNot: null,
        },
      },
      include: {
        staffPermission: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      staff: staffMembers.map((s) => ({
        id: s.id,
        name: s.name || s.email,
        email: s.email,
        role: s.staffPermission?.role || "STAFF",
        canManageSubmissions: s.staffPermission?.canManageSubmissions ?? false,
        canManageQuotes: s.staffPermission?.canManageQuotes ?? false,
        canManageBookings: s.staffPermission?.canManageBookings ?? false,
        canManageReports: s.staffPermission?.canManageReports ?? false,
        canManageTeam: s.staffPermission?.canManageTeam ?? false,
      })),
    });
  } catch (error: any) {
    console.error("Team list error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authContext = await getAuthContext();

    // Owner-only verification enforced server-side
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Team permissions can only be granted by the designated Owner." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { targetEmail, targetName, permissions } = body;

    if (!targetEmail) {
      return NextResponse.json({ error: "Target staff email is required" }, { status: 400 });
    }

    // Persist to database
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
        canManageSubmissions: permissions?.canManageSubmissions ?? true,
        canManageQuotes: permissions?.canManageQuotes ?? false,
        canManageBookings: permissions?.canManageBookings ?? true,
        canManageReports: permissions?.canManageReports ?? false,
        canManageTeam: false,
      },
      create: {
        userId: user.id,
        role: "STAFF",
        canManageSubmissions: permissions?.canManageSubmissions ?? true,
        canManageQuotes: permissions?.canManageQuotes ?? false,
        canManageBookings: permissions?.canManageBookings ?? true,
        canManageReports: permissions?.canManageReports ?? false,
        canManageTeam: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Staff permissions updated for ${targetEmail}`,
    });
  } catch (error: any) {
    console.error("Team grant error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authContext = await getAuthContext();

    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Team permissions can only be modified by the designated Owner." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.staffPermission.deleteMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      message: "Staff member permissions revoked",
    });
  } catch (error: any) {
    console.error("Team revoke error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
