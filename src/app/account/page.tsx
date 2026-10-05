"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  MessageSquare,
  Video,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building,
} from "lucide-react";

function AccountPortalContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId") || "SUB-7842";
  const paymentStatus = searchParams.get("payment");

  // Simulated client engagement state for portal demonstration
  // States: UNDER_REVIEW, QUOTE_SENT, SCHEDULED, COMPLETED
  const [activeTab, setActiveTab] = useState<"STATUS" | "DELIVERABLES" | "HISTORY">("STATUS");

  const engagement = {
    id: submissionId,
    businessName: "Singhania Logistics & Retail LLP",
    tier: "Commercial Vastu & Strategic Growth Advisory",
    status: paymentStatus === "success" ? "SCHEDULED" : "UNDER_REVIEW",
    scheduledAt: "October 12, 2026 at 3:30 PM IST",
    channel: "WHATSAPP_CALL",
    meetingDetails: "Niraj Kumar will call your registered WhatsApp: +91 98765 43210",
    report: {
      title: "Commercial Spatial Diagnostics & Strategic Timing Roadmap.pdf",
      size: "4.8 MB",
      deliveredAt: "Ready upon session completion",
      isDelivered: false,
    },
  };

  const steps = [
    { label: "Under Review", state: "UNDER_REVIEW", desc: "Profile & premises under review by Niraj Kumar" },
    { label: "Quote / Booking Confirmed", state: "QUOTE_SENT", desc: "Advisory package reserved" },
    { label: "Session Scheduled", state: "SCHEDULED", desc: "Live session coordinated via WhatsApp/Meet" },
    { label: "Report Delivered", state: "COMPLETED", desc: "Written diagnostic PDF dossier generated" },
  ];

  const currentStepIndex =
    engagement.status === "UNDER_REVIEW"
      ? 0
      : engagement.status === "QUOTE_SENT"
      ? 1
      : engagement.status === "SCHEDULED"
      ? 2
      : 3;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Authenticated Client Portal
          </span>
          <h1 className="text-3xl font-bold text-[#1B2838] mt-1">
            Advisory Deliverables &amp; Status Vault
          </h1>
          <p className="text-xs text-[#5A6472]">
            Engagement Reference: <strong className="text-[#1B2838]">{engagement.id}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={BRAND.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#2A3D54] bg-[#1B2838] text-xs font-semibold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Direct WhatsApp Desk</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] gap-8 text-xs font-bold">
        <button
          onClick={() => setActiveTab("STATUS")}
          className={`pb-3 uppercase tracking-wider transition-colors ${
            activeTab === "STATUS"
              ? "border-b-2 border-[#1B2838] text-[#1B2838]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          Lifecycle Tracker
        </button>
        <button
          onClick={() => setActiveTab("DELIVERABLES")}
          className={`pb-3 uppercase tracking-wider transition-colors ${
            activeTab === "DELIVERABLES"
              ? "border-b-2 border-[#1B2838] text-[#1B2838]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          Written Report Vault
        </button>
        <button
          onClick={() => setActiveTab("HISTORY")}
          className={`pb-3 uppercase tracking-wider transition-colors ${
            activeTab === "HISTORY"
              ? "border-b-2 border-[#1B2838] text-[#1B2838]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          Past Engagements
        </button>
      </div>

      {/* TAB 1: LIFECYCLE TRACKER */}
      {activeTab === "STATUS" && (
        <div className="space-y-8">
          {/* Visual 4-Step State Machine Tracker */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            <h3 className="text-base font-bold text-[#1B2838] mb-6">
              Engagement Lifecycle Status
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {steps.map((st, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={st.state}
                    className={`p-4 rounded border flex flex-col justify-between space-y-2 ${
                      isCurrent
                        ? "border-[#1B2838] bg-[#F7F6F3] shadow-sm"
                        : isPassed
                        ? "border-[#E2E8F0] bg-[#FFFFFF]"
                        : "border-[#E2E8F0]/60 bg-[#FAFAFA] opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
                        Stage 0{idx + 1}
                      </span>
                      {isPassed && <CheckCircle2 className="w-4 h-4 text-[#1B2838]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1B2838]">{st.label}</h4>
                      <p className="text-[11px] text-[#5A6472] mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Session Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <Calendar className="w-5 h-5 text-[#C9A24B]" />
                <h4 className="text-sm font-bold text-[#1B2838]">Live Advisory Session Coordinates</h4>
              </div>

              <div className="space-y-3 text-xs text-[#5A6472]">
                <div>
                  <strong className="text-[#1B2838]">Engagement Tier:</strong>
                  <p>{engagement.tier}</p>
                </div>
                <div>
                  <strong className="text-[#1B2838]">Scheduled Timing:</strong>
                  <p className="text-sm font-bold text-[#1B2838] mt-0.5">{engagement.scheduledAt}</p>
                </div>
                <div>
                  <strong className="text-[#1B2838]">Delivery Channel:</strong>
                  <p className="mt-0.5">
                    {engagement.channel === "WHATSAPP_CALL" ? "Direct WhatsApp Call" : "Google Meet Video Call"}
                  </p>
                  <p className="text-[11px] text-[#8C96A5] mt-0.5">{engagement.meetingDetails}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <FileText className="w-5 h-5 text-[#C9A24B]" />
                <h4 className="text-sm font-bold text-[#1B2838]">Written Report Status</h4>
              </div>

              <div className="space-y-3 text-xs text-[#5A6472]">
                <p>
                  Every engagement includes both the live diagnostic session and an exhaustive written report. Niraj Kumar generates this report within 5 to 7 days following the live call.
                </p>
                <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0] text-[11px]">
                  <strong>Current Status:</strong> Draft in preparation after live call review.
                </div>
                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#8C96A5]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>Encrypted PDF delivery via Cloudflare R2 repository.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPORT VAULT */}
      {activeTab === "DELIVERABLES" && (
        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#1B2838]">
            Client Written Diagnostic Report Vault
          </h3>

          <div className="p-6 rounded border border-[#E2E8F0] bg-[#F7F6F3] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#1B2838]">{engagement.report.title}</h4>
                <p className="text-xs text-[#5A6472]">
                  Comprehensive directional site analysis, executive zoning recommendations, and strategic milestone timing matrix.
                </p>
                <span className="text-[10px] text-[#8C96A5]">Delivery Pipeline: Cloudflare R2 Secure Presigned Bucket</span>
              </div>
            </div>

            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#E2E8F0] text-[#8C96A5] cursor-not-allowed shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Available After Session</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: PAST ENGAGEMENTS */}
      {activeTab === "HISTORY" && (
        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#1B2838]">Consultation History</h3>
          <p className="text-xs text-[#5A6472]">
            Previous consultation cycles and archived reports for your commercial entity will be listed here.
          </p>
          <div className="p-4 bg-[#F7F6F3] rounded text-xs text-[#8C96A5] text-center">
            No archived prior engagements found.
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-[#5A6472]">Loading client portal...</div>}>
      <AccountPortalContent />
    </Suspense>
  );
}
