import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyStageModification, completeStageAndHandoff, logCaseAction } from "@/lib/cases";
import { CaseStageName } from "@prisma/client";

/**
 * POST /api/admin/cases/[id]/stages/[stageName]
 * Updates stage status, internal notes, attachments.
 * If status is COMPLETED, triggers workflow handoff and Resend emails to next assignee & Owner.
 * Enforces least privilege: Staff can only modify their assigned stage. Owner can modify any.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; stageName: string } }
) {
  try {
    const authCtx = await getAuthContext();
    const caseId = params.id;
    const stageName = params.stageName as CaseStageName;

    if (!authCtx.isAuthenticated) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const canModify = await verifyStageModification(authCtx, caseId, stageName);
    if (!canModify) {
      return NextResponse.json(
        { error: "Access Denied: You are not assigned to modify this specific stage." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { status, internalNotes, attachments } = body;

    const actor = {
      id: authCtx.dbUserId || authCtx.user?.id || "unknown",
      name: authCtx.user?.firstName
        ? `${authCtx.user.firstName} ${authCtx.user.lastName || ""}`.trim()
        : authCtx.email || "Staff Member",
      email: authCtx.email || "",
      role: authCtx.isOwner ? "OWNER" : "STAFF",
    };

    if (status === "COMPLETED") {
      // Trigger completion, next stage advancement, and hand-off emails
      const result = await completeStageAndHandoff({
        caseId,
        stageName,
        actor,
        internalNotes,
        attachments,
      });

      return NextResponse.json({
        success: true,
        message: `Stage ${stageName} marked as completed and handed off.`,
        nextStage: result.nextStage,
      });
    }

    // Otherwise standard update (e.g. updating internal notes or setting to IN_PROGRESS)
    const updatedStage = await prisma.caseStage.update({
      where: {
        caseId_stageName: { caseId, stageName },
      },
      data: {
        status: status || undefined,
        internalNotes: internalNotes !== undefined ? internalNotes : undefined,
        attachments: attachments !== undefined ? attachments : undefined,
        startedAt: status === "IN_PROGRESS" ? new Date() : undefined,
      },
    });

    await logCaseAction({
      caseId,
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: "STAGE_UPDATED",
      details: {
        stageName,
        status: updatedStage.status,
        notesUpdated: internalNotes !== undefined,
      },
    });

    return NextResponse.json({
      success: true,
      stage: updatedStage,
      message: `Stage ${stageName} successfully updated.`,
    });
  } catch (error: any) {
    console.error("Stage update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update stage" },
      { status: 500 }
    );
  }
}
