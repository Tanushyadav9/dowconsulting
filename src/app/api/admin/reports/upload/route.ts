import { NextRequest, NextResponse } from "next/server";
import { uploadReportToR2 } from "@/lib/storage/r2";
import { sendReportDeliveredEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  try {
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

    const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/account?tab=deliverables`;

    // Trigger Lifecycle Email 5: Written Report Delivered Notification via Resend
    try {
      await sendReportDeliveredEmail({
        to: clientEmail,
        name: clientName || "Valued Client",
        businessName: businessName || "Commercial Practice",
        reportTitle,
        portalUrl,
      });
    } catch (emailErr) {
      console.warn("Resend email dispatch error:", emailErr);
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
