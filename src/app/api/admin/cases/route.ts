import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/cases
 * Least Privilege Enforcement:
 * - Owner sees ALL cases.
 * - Staff sees ONLY cases where at least one stage is assigned to them.
 * - Non-staff/clients get 403 Forbidden.
 */
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authCtx = await getAuthContext();

    if (!authCtx.isAuthenticated) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!authCtx.isOwner && !authCtx.permissions) {
      return NextResponse.json(
        { error: "Access Denied: You do not have staff or owner privileges." },
        { status: 403 }
      );
    }

    // Owner Query: All cases
    if (authCtx.isOwner) {
      const allCases = await prisma.case.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          submission: {
            select: {
              locationCity: true,
              locationState: true,
              businessStage: true,
              businessType: true,
              currentTimeline: true,
            },
          },
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
        },
      });

      return NextResponse.json({
        success: true,
        isOwner: true,
        cases: allCases,
      });
    }

    // Staff Query: ONLY cases where user is assigned to at least one stage
    const staffCases = await prisma.case.findMany({
      where: {
        stages: {
          some: {
            assignedToId: authCtx.dbUserId,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        submission: {
          select: {
            locationCity: true,
            locationState: true,
            businessStage: true,
            businessType: true,
            currentTimeline: true,
          },
        },
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
      },
    });

    // Staff cannot see pricing/payments: sanitized cases returned
    return NextResponse.json({
      success: true,
      isOwner: false,
      cases: staffCases,
    });
  } catch (error: any) {
    console.error("Cases list error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load cases" },
      { status: 500 }
    );
  }
}
