"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  MessageSquare,
  ShieldCheck,
  Building,
  RefreshCw,
  Lock,
} from "lucide-react";

interface ClientStage {
  stageName: string;
  order: number;
  label: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";
  startedAt: string | null;
  completedAt: string | null;
  assignedStaff: string;
}

interface ClientCaseView {
  id: string;
  caseNumber: string;
  title: string;
  serviceRequested: string;
  currentStage: string;
  stages: ClientStage[];
  report: {
    title: string;
    url: string;
    deliveredAt: string | null;
  } | null;
}

function AccountPortalContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId") || "";

  const [activeTab, setActiveTab] = useState<"STATUS" | "DELIVERABLES" | "COMMUNICATION">("STATUS");
  const [caseView, setCaseView] = useState<ClientCaseView | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClientCase = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/client/case?submissionId=${submissionId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.case) {
          setCaseView(data.case);
        }
      }
    } catch (e) {
      console.warn("Client case fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientCase();
  }, [submissionId]);

  // Fallback defaults if no live case has been synced yet
  const defaultStages: ClientStage[] = [
    { stageName: "INFORMATION_COLLECTION", order: 1, label: "Information Collection", status: "IN_PROGRESS", startedAt: null, completedAt: null, assignedStaff: "Information Coordinator" },
    { stageName: "RESEARCH", order: 2, label: "Market & Field Research", status: "PENDING", startedAt: null, completedAt: null, assignedStaff: "Research Analyst" },
    { stageName: "CONSULTATION", order: 3, label: "Strategic Consultation", status: "PENDING", startedAt: null, completedAt: null, assignedStaff: "Consultant" },
    { stageName: "REPORT_PREPARATION", order: 4, label: "Report Preparation", status: "PENDING", startedAt: null, completedAt: null, assignedStaff: "Consultant" },
    { stageName: "OWNER_REVIEW", order: 5, label: "Owner Review & Approval", status: "PENDING", startedAt: null, completedAt: null, assignedStaff: "Lead Strategic Advisor" },
    { stageName: "DELIVERED", order: 6, label: "Delivered to Client", status: "PENDING", startedAt: null, completedAt: null, assignedStaff: "Advisory Desk" },
  ];

  const stagesToRender = caseView?.stages || defaultStages;
  const caseNumberDisplay = caseView?.caseNumber || submissionId || "IN_REVIEW";
  const serviceTitleDisplay = caseView?.serviceRequested || "General Business Consulting Advisory";

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
            Engagement Reference: <strong className="text-[#1B2838]">{caseNumberDisplay}</strong> • {serviceTitleDisplay}
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
            <span>Direct Advisory Desk</span>
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
          Lifecycle Stages
        </button>
        <button
          onClick={() => setActiveTab("DELIVERABLES")}
          className={`pb-3 uppercase tracking-wider transition-colors ${
            activeTab === "DELIVERABLES"
              ? "border-b-2 border-[#1B2838] text-[#1B2838]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          Deliverable Vault {caseView?.report ? "(1 Ready)" : ""}
        </button>
        <button
          onClick={() => setActiveTab("COMMUNICATION")}
          className={`pb-3 uppercase tracking-wider transition-colors ${
            activeTab === "COMMUNICATION"
              ? "border-b-2 border-[#1B2838] text-[#1B2838]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          Coordination Desk
        </button>
      </div>

      {/* TAB 1: 6 STATUS STAGES */}
      {activeTab === "STATUS" && (
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1B2838]">
                  Consulting Workflow Lifecycle
                </h3>
                <p className="text-xs text-[#5A6472]">
                  Your engagement advances through 6 structured advisory milestones.
                </p>
              </div>

              <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
                {caseView?.currentStage ? caseView.currentStage.replace(/_/g, " ") : "In Progress"}
              </span>
            </div>

            {/* Stages List */}
            <div className="space-y-4">
              {stagesToRender.map((stage, idx) => {
                const isCompleted = stage.status === "COMPLETED";
                const isCurrent = stage.status === "IN_PROGRESS";

                return (
                  <div
                    key={stage.stageName}
                    className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      isCompleted
                        ? "bg-emerald-50/50 border-emerald-200"
                        : isCurrent
                        ? "bg-[#1B2838] border-[#1B2838] text-[#F7F6F3]"
                        : "bg-[#F7F6F3] border-[#E2E8F0] text-[#8C96A5]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-[#C9A24B] text-[#1B2838]"
                            : "bg-[#E2E8F0] text-[#5A6472]"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.order}
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? "text-[#F7F6F3]" : isCompleted ? "text-emerald-900" : "text-[#1B2838]"
                          }`}
                        >
                          {stage.label}
                        </h4>
                        <p
                          className={`text-[11px] ${
                            isCurrent ? "text-[#C9A24B]" : "text-[#5A6472]"
                          }`}
                        >
                          Assigned: {stage.assignedStaff}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : isCurrent
                            ? "bg-amber-100 text-amber-900"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPORT DELIVERABLE VAULT */}
      {activeTab === "DELIVERABLES" && (
        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h3 className="text-base font-bold text-[#1B2838]">
              Final Written Diagnostic Report Vault
            </h3>
            <p className="text-xs text-[#5A6472]">
              Reports are released here following Owner review and authorization by Niraj Kumar.
            </p>
          </div>

          {caseView?.report ? (
            <div className="p-6 rounded border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1B2838]">{caseView.report.title}</h4>
                  <p className="text-xs text-[#5A6472]">
                    Comprehensive market assessment, executive strategic recommendations, and actionable roadmap.
                  </p>
                  <span className="text-[10px] text-[#8C96A5]">
                    Delivered: {caseView.report.deliveredAt ? new Date(caseView.report.deliveredAt).toLocaleDateString() : "Active Engagement"}
                  </span>
                </div>
              </div>

              <a
                href={caseView.report.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] transition-colors shrink-0"
              >
                <Download className="w-4 h-4 text-[#C9A24B]" />
                <span>Download Report</span>
              </a>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#F7F6F3] rounded border border-[#E2E8F0] space-y-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-[#5A6472]">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#1B2838]">Report in Preparation</h4>
              <p className="text-xs text-[#5A6472] max-w-md mx-auto">
                Your custom written strategic report is prepared by the consulting team and authorized by Lead Strategic Advisor Niraj Kumar before release.
              </p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C96A5] block">
                Available After Owner Review &amp; Approval
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: COORDINATION DESK */}
      {activeTab === "COMMUNICATION" && (
        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6 text-xs text-[#5A6472]">
          <h3 className="text-base font-bold text-[#1B2838] border-b border-[#E2E8F0] pb-3">
            Direct Concierge Coordination
          </h3>

          <div className="space-y-4">
            <p>
              For scheduling adjustments, supplementary data submissions, or emergency timeline updates, contact our coordination desk:
            </p>

            <div className="p-4 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-2">
              <p className="font-bold text-[#1B2838]">Office &amp; Advisory Desk</p>
              <p>{BRAND.contact.address.full}</p>
              <p>Email: <a href={`mailto:${BRAND.contact.email}`} className="text-[#1B2838] underline">{BRAND.contact.email}</a></p>
              <p>WhatsApp: <a href={BRAND.contact.whatsapp.link} className="text-[#1B2838] underline">{BRAND.contact.whatsapp.display}</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-xs text-[#8C96A5]">
          Loading client account vault...
        </div>
      }
    >
      <AccountPortalContent />
    </Suspense>
  );
}
