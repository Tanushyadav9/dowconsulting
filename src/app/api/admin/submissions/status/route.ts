import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const authContext = await getAuthContext();

    // Check authorization: Owner or Staff with canManageSubmissions
    if (!authContext.isOwner && !authContext.permissions?.canManageSubmissions) {
      return NextResponse.json(
        { error: "Unauthorized: Only Owner or authorized staff can update submission status." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { submissionId, status } = body;

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: "Missing required submissionId or status" },
        { status: 400 }
      );
    }

    // Valid statuses
    const validStatuses = ["UNDER_REVIEW", "QUOTE_SENT", "SCHEDULED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updated = await prisma.intakeSubmission.update({
      where: { id: submissionId },
      data: { status: status as any },
    });

    return NextResponse.json({
      success: true,
      submissionId,
      status,
      message: `Status updated to ${status}`,
    });
  } catch (error: any) {
    console.error("Submission status update error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
