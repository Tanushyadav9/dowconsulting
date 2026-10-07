import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { assignStage, verifyOwnerOnlyAction } from "@/lib/cases";
import { CaseStageName } from "@prisma/client";

/**
 * POST /api/admin/cases/[id]/assign
 * Owner-Only Action: Assigns or reassigns a case stage to a team member.
 * Non-owners strictly receive 403 Forbidden.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCtx = await getAuthContext();
    const caseId = params.id;

    if (!verifyOwnerOnlyAction(authCtx)) {
      return NextResponse.json(
        { error: "Access Denied: Only the Owner (Niraj Kumar) can assign or reassign case stages." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { stageName, assignedToUserId } = body;

    if (!stageName) {
      return NextResponse.json({ error: "stageName is required" }, { status: 400 });
    }

    const actor = {
      id: authCtx.dbUserId || "owner",
      name: authCtx.user?.firstName
        ? `${authCtx.user.firstName} ${authCtx.user.lastName || ""}`.trim()
        : "Niraj Kumar (Owner)",
      role: "OWNER",
    };

    const updatedStage = await assignStage({
      caseId,
      stageName: stageName as CaseStageName,
      assignedToUserId: assignedToUserId || null,
      actor,
    });

    return NextResponse.json({
      success: true,
      message: `Stage ${stageName} assigned successfully.`,
      stage: updatedStage,
    });
  } catch (error: any) {
    console.error("Stage assignment error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to assign stage" },
      { status: 500 }
    );
  }
}
