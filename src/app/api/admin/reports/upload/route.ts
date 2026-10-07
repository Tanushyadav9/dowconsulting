import { NextRequest, NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";
import { uploadReportToR2 } from "@/lib/storage/r2";
import { sendReportDeliveredEmail } from "@/lib/email/resend";
import { getAuthContext } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || !auth.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized: Authorizing and delivering final reports is strictly restricted to the Owner." },
        { status: 403 }
      );
    }
    const formData = await req.formData();
    const clientName = formData.get("clientName") as string;
    const businessName = formData.get("businessName") as string;
    const clientEmail = formData.get("clientEmail") as string;
    const reportTitle = formData.get("reportTitle") as string;
    const file = formData.get("file") as File | null;

    if (!clientEmail || !reportTitle) {
      return NextResponse.json({ error: "Client email and report title are required." }, { status: 400 });
    }

    let fileKey = `reports/${Date.now()}_${businessName?.replace(/\s+/g, "_") || "report"}.pdf`;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      await uploadReportToR2({
        fileBuffer: buffer,
        key: fileKey,
        contentType: "application/pdf",
      });
    }

    const appUrl = requireEnv("NEXT_PUBLIC_APP_URL", "Base application URL for report portal link");
    const portalUrl = `${appUrl}/account?tab=deliverables`;

    // Trigger Lifecycle Email 5: Written Report Delivered Notification via Resend
    if (process.env.RESEND_API_KEY) {
      await sendReportDeliveredEmail({
        to: clientEmail,
        name: clientName || "Valued Client",
        businessName: businessName || "Commercial Practice",
        reportTitle,
        portalUrl,
      });
    }

    return NextResponse.json({
      success: true,
      fileKey,
      message: `Report uploaded and delivered to client ${clientEmail}`,
    });
  } catch (error: any) {
    console.error("Report delivery error:", error);
    return NextResponse.json({ error: error.message || "Failed to deliver report" }, { status: 500 });
  }
}
