import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPresignedDownloadUrl } from "@/lib/storage/r2";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    const authContext = await getAuthContext();

    if (!authContext.isAuthenticated || !authContext.email) {
      return NextResponse.json(
        { error: "Authentication required to download confidential consultation reports." },
        { status: 401 }
      );
    }

    // Lookup report and linked booking
    let report: any = null;
    try {
      report = await prisma.report.findUnique({
        where: { id: reportId },
        include: {
          booking: {
            include: {
              submission: true,
            },
          },
        },
      });
    } catch (dbErr) {
      console.warn("DB lookup error for report:", dbErr);
    }

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Authorization Verification (Server-Side)
    const isOwner = authContext.isOwner;
    const isAuthorizedStaff = authContext.permissions?.canManageReports;
    const isReportClient =
      report?.booking?.clientEmail?.toLowerCase() === authContext.email.toLowerCase() ||
      report?.booking?.submission?.contactEmail?.toLowerCase() === authContext.email.toLowerCase();

    if (!isOwner && !isAuthorizedStaff && !isReportClient) {
      console.warn(`[UNAUTHORIZED DOWNLOAD ATTEMPT] User ${authContext.email} attempted to access report ${reportId}`);
      return NextResponse.json(
        { error: "Access Denied: You are not authorized to view or download this report." },
        { status: 403 }
      );
    }

    // Increment download count
    if (report?.id) {
      try {
        await prisma.report.update({
          where: { id: report.id },
          data: { downloadCount: { increment: 1 } },
        });
      } catch (e) {
        // non-blocking
      }
    }

    // Generate short-lived presigned download URL (valid for 5 minutes)
    const fileReference = report?.fileReference || `reports/${reportId}.pdf`;
    const downloadUrl = await getPresignedDownloadUrl(fileReference, 300);

    return NextResponse.redirect(downloadUrl);
  } catch (error: any) {
    console.error("Report download authorization error:", error);
    return NextResponse.json({ error: error.message || "Failed to process download" }, { status: 500 });
  }
}
