import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { approveAndDeliverReport, verifyOwnerOnlyAction } from "@/lib/cases";

/**
 * POST /api/admin/cases/[id]/approve-report
 * Owner-Only Action: Approves the final advisory report and releases it to the client portal.
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
        { error: "Access Denied: Only the Owner can approve and deliver the final report." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { reportTitle, reportUrl } = body;

    if (!reportTitle || !reportUrl) {
      return NextResponse.json(
        { error: "Both reportTitle and reportUrl are required." },
        { status: 400 }
      );
    }

    const ownerUser = {
      id: authCtx.dbUserId || "owner",
      name: authCtx.user?.firstName
        ? `${authCtx.user.firstName} ${authCtx.user.lastName || ""}`.trim()
        : "Niraj Kumar (Owner)",
      email: authCtx.email || "",
    };

    const updatedCase = await approveAndDeliverReport({
      caseId,
      reportTitle,
      reportUrl,
      ownerUser,
    });

    return NextResponse.json({
      success: true,
      message: "Report approved by Owner and delivered to client portal vault.",
      case: updatedCase,
    });
  } catch (error: any) {
    console.error("Report approval error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to approve report" },
      { status: 500 }
    );
  }
}
