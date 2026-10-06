"use client";

import { useState } from "react";
import { FileText, Upload, CheckCircle2, Download, AlertCircle, ShieldCheck } from "lucide-react";

interface ReportDeliverable {
  id: string;
  clientName: string;
  businessName: string;
  clientEmail: string;
  reportTitle: string;
  fileName: string;
  fileSize: string;
  deliveredAt: string;
  downloadCount: number;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ReportDeliverable[]>([
    {
      id: "REP-401",
      clientName: "Ananya Roy",
      businessName: "Vanguard Cloud Technologies",
      clientEmail: "ananya@vanguardcloud.io",
      reportTitle: "Enterprise Series A Milestone Timing & Executive Layout Blueprint",
      fileName: "Vanguard_Strategic_Timing_Dossier.pdf",
      fileSize: "5.2 MB",
      deliveredAt: "Oct 04, 2026",
      downloadCount: 3,
    },
    {
      id: "REP-400",
      clientName: "Kavita Rao",
      businessName: "Nectar Organic Foods",
      clientEmail: "kavita@nectarorganic.com",
      reportTitle: "Retail Storefront Commercial Vastu & Launch Schedule",
      fileName: "Nectar_Commercial_Vastu_Report.pdf",
      fileSize: "4.1 MB",
      deliveredAt: "Oct 02, 2026",
      downloadCount: 5,
    },
  ]);

  const [form, setForm] = useState({
    clientName: "Vikram Singhania",
    businessName: "Singhania Logistics & Retail LLP",
    clientEmail: "vikram@singhanialogistics.in",
    reportTitle: "Commercial Spatial Diagnostics & Strategic Lease Timing Roadmap",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("clientName", form.clientName);
      formData.append("businessName", form.businessName);
      formData.append("clientEmail", form.clientEmail);
      formData.append("reportTitle", form.reportTitle);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/admin/reports/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload report to Cloudflare R2");
      }

      setReports((prev) => [
        {
          id: data.fileKey ? data.fileKey.replace("reports/", "REP-") : `REP-${Date.now().toString().slice(-3)}`,
          clientName: form.clientName,
          businessName: form.businessName,
          clientEmail: form.clientEmail,
          reportTitle: form.reportTitle,
          fileName: file?.name || "Report.pdf",
          fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "Ready",
          deliveredAt: "Just now",
          downloadCount: 0,
        },
        ...prev,
      ]);
      setSuccessMsg(data.message || "Report securely dispatched to Cloudflare R2.");
      setFile(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Deliverable Vault &amp; Cloudflare R2 Storage
        </span>
        <h1 className="text-2xl font-bold text-[#1B2838]">Written Report Deliveries</h1>
        <p className="text-xs text-[#5A6472]">
          Every consultation pairs a live call with a customized written PDF report. Upload dossiers to Cloudflare R2 and trigger automatic Resend notification emails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Form */}
        <div className="lg:col-span-6 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h3 className="font-bold text-sm text-[#1B2838]">Deliver Written Strategic Report</h3>
            <p className="text-xs text-[#5A6472]">Uploaded directly to encrypted Cloudflare R2 repository</p>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Client Name *</label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Business Entity *</label>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Client Email (Resend Notification) *</label>
              <input
                type="email"
                required
                value={form.clientEmail}
                onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Report Title *</label>
              <input
                type="text"
                required
                value={form.reportTitle}
                onChange={(e) => setForm({ ...form, reportTitle: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Select PDF Report File *</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
              />
              <span className="text-[10px] text-[#8C96A5]">PDF documents up to 50MB</span>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Upload className="w-4 h-4 text-[#C9A24B]" />
              <span>{uploading ? "Uploading to Cloudflare R2..." : "Deliver Report & Send Email"}</span>
            </button>
          </form>
        </div>

        {/* Delivered Reports List */}
        <div className="lg:col-span-6 bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <h3 className="font-bold text-sm text-[#1B2838]">Delivered Reports History</h3>
          </div>

          <div className="space-y-3 text-xs">
            {reports.map((r) => (
              <div key={r.id} className="p-4 rounded border border-[#E2E8F0] bg-[#F7F6F3] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-[#1B2838]">{r.businessName}</strong>
                    <p className="text-[11px] text-[#5A6472]">{r.reportTitle}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Delivered
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-center text-[10px] text-[#8C96A5]">
                  <span>File: {r.fileName} ({r.fileSize})</span>
                  <span>Delivered: {r.deliveredAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
