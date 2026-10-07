import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyOwnerOnlyAction, logCaseAction } from "@/lib/cases";

/**
 * PATCH /api/admin/cases/[id]/settings
 * Owner-Only Action: Toggle whether the client portal displays staff names or generic role titles.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCtx = await getAuthContext();
    const caseId = params.id;

    if (!verifyOwnerOnlyAction(authCtx)) {
      return NextResponse.json(
        { error: "Access Denied: Only the Owner can modify case visibility settings." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { showStaffNamesToClient } = body;

    const updatedCase = await prisma.case.update({
      where: { id: caseId },
      data: {
        showStaffNamesToClient: Boolean(showStaffNamesToClient),
      },
    });

    await logCaseAction({
      caseId,
      actorId: authCtx.dbUserId || "owner",
      actorName: authCtx.email || "Owner",
      actorRole: "OWNER",
      action: "SETTINGS_UPDATED",
      details: {
        showStaffNamesToClient: Boolean(showStaffNamesToClient),
      },
    });

    return NextResponse.json({
      success: true,
      case: updatedCase,
      message: `Client portal staff name visibility set to ${Boolean(showStaffNamesToClient)}.`,
    });
  } catch (error: any) {
    console.error("Case settings update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update case settings" },
      { status: 500 }
    );
  }
}
