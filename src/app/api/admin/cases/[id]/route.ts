import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyCaseAccess } from "@/lib/cases";

/**
 * GET /api/admin/cases/[id]
 * Enforces server-side least privilege:
 * - A team member cannot open an unassigned case (HTTP 403).
 * - Owner sees everything.
 * - Staff sees only cases assigned to them, with payments/pricing excluded.
 */
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCtx = await getAuthContext();
    const caseId = params.id;

    if (!authCtx.isAuthenticated) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const access = await verifyCaseAccess(authCtx, caseId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason || "Access Denied: You are not assigned to this case." },
        { status: 403 }
      );
    }

    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        submission: true,
        stages: {
          orderBy: { order: "asc" },
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true,
                email: true,
                staffPermission: {
                  select: { roleTitle: true },
                },
              },
            },
          },
        },
        auditLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      isOwner: authCtx.isOwner,
      assignedStageNames: access.assignedStageNames || [],
      case: caseData,
    });
  } catch (error: any) {
    console.error("Case detail error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load case details" },
      { status: 500 }
    );
  }
}
