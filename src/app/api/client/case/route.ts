import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { getClientCaseView } from "@/lib/cases";

/**
 * GET /api/client/case
 * Client Portal Case View:
 * - Returns simple status stages and delivered report for the authenticated client.
 * - NEVER shows internal notes.
 * - Shows staff names ONLY if the Owner enabled showStaffNamesToClient.
 */
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authCtx = await getAuthContext();

    if (!authCtx.isAuthenticated || !authCtx.email) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get("submissionId");

    // Client view is sanitized strictly
    const caseView = await getClientCaseView(authCtx.email);

    return NextResponse.json({
      success: true,
      case: caseView,
    });
  } catch (error: any) {
    console.error("Client case fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load case view" },
      { status: 500 }
    );
  }
}
