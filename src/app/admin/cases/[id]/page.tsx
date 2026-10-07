"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Send,
  User,
  FileText,
  Lock,
  Eye,
  EyeOff,
  History,
  Check,
  AlertCircle,
  Paperclip,
  Save,
} from "lucide-react";

interface CaseDetails {
  id: string;
  caseNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceRequested: string;
  currentStage: string;
  showStaffNamesToClient: boolean;
  finalReportTitle: string | null;
  finalReportUrl: string | null;
  finalReportApproved: boolean;
  deliveredAt: string | null;
  createdAt: string;
  submission: {
    businessName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    businessStage: string;
    businessType: string;
    teamSize: string;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    primaryGoals: string;
    keyChallenges: string;
    currentTimeline: string;
    budgetRange: string;
    preferredChannel: string;
    serviceDetails: Record<string, string>;
  } | null;
  stages: {
    id: string;
    stageName: string;
    order: number;
    status: string;
    assignedToId: string | null;
    internalNotes: string | null;
    attachments: any;
    startedAt: string | null;
    completedAt: string | null;
    assignedTo?: {
      id: string;
      name: string;
      email: string;
      staffPermission?: { roleTitle: string };
    } | null;
  }[];
  auditLogs: {
    id: string;
    actorName: string;
    actorRole: string;
    action: string;
    details: any;
    createdAt: string;
  }[];
}

interface StaffOption {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
}

const STAGE_LABELS: Record<string, { label: string; defaultRole: string }> = {
  INFORMATION_COLLECTION: { label: "1. Information Collection", defaultRole: "Information Coordinator" },
  RESEARCH: { label: "2. Market & Field Research", defaultRole: "Research Analyst" },
  CONSULTATION: { label: "3. Strategic Consultation", defaultRole: "Consultant" },
  REPORT_PREPARATION: { label: "4. Report Preparation", defaultRole: "Consultant" },
  OWNER_REVIEW: { label: "5. Owner Review & Approval", defaultRole: "Lead Strategic Advisor / Owner" },
  DELIVERED: { label: "6. Delivered to Client", defaultRole: "Advisory Desk" },
};

export default function CaseWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  const [caseData, setCaseData] = useState<CaseDetails | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [assignedStages, setAssignedStages] = useState<string[]>([]);
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active stage tab in workspace
  const [activeStageTab, setActiveStageTab] = useState<string>("INFORMATION_COLLECTION");

  // Stage editing states
  const [notesInput, setNotesInput] = useState<Record<string, string>>({});
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Report approval modal/form (Owner-only)
  const [reportTitleInput, setReportTitleInput] = useState("");
  const [reportUrlInput, setReportUrlInput] = useState("");

  const fetchCase = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to load case workspace");
      }
      const data = await res.json();
      setCaseData(data.case);
      setIsOwner(Boolean(data.isOwner));
      setAssignedStages(data.assignedStageNames || []);

      // Initialize notes inputs
      const initialNotes: Record<string, string> = {};
      data.case?.stages?.forEach((s: any) => {
        initialNotes[s.stageName] = s.internalNotes || "";
      });
      setNotesInput(initialNotes);

      // Default active tab to current active stage
      if (data.case?.currentStage) {
        setActiveStageTab(data.case.currentStage);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load case");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffOptions = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.staff)) {
          setStaffOptions(data.staff);
        }
      }
    } catch (e) {
      // non-blocking
    }
  };

  useEffect(() => {
    if (caseId) {
      fetchCase();
      fetchStaffOptions();
    }
  }, [caseId]);

  const handleSaveNotes = async (stageName: string) => {
    setProcessing(true);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/stages/${stageName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internalNotes: notesInput[stageName] || "",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save internal notes");
      }

      setActionSuccess(`Internal notes saved for ${stageName}.`);
      await fetchCase();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCompleteStage = async (stageName: string) => {
    setProcessing(true);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/stages/${stageName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "COMPLETED",
          internalNotes: notesInput[stageName] || "",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to complete stage");
      }

      const data = await res.json();
      setActionSuccess(`Stage completed! Handed off to: ${data.nextStage || "End of Pipeline"}`);
      await fetchCase();
      if (data.nextStage) {
        setActiveStageTab(data.nextStage);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleAssignStage = async (stageName: string, userId: string) => {
    setProcessing(true);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stageName,
          assignedToUserId: userId || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to assign stage");
      }

      setActionSuccess(`Stage assigned successfully.`);
      await fetchCase();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleStaffVisibility = async () => {
    if (!caseData) return;
    try {
      const nextVal = !caseData.showStaffNamesToClient;
      const res = await fetch(`/api/admin/cases/${caseId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          showStaffNamesToClient: nextVal,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update settings");
      }

      setCaseData({ ...caseData, showStaffNamesToClient: nextVal });
      setActionSuccess(`Client portal staff name visibility set to ${nextVal ? "Visible" : "Hidden"}.`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitleInput || !reportUrlInput) return;
    setProcessing(true);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}/approve-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportTitle: reportTitleInput,
          reportUrl: reportUrlInput,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to approve report");
      }

      setActionSuccess("Report approved by Owner and delivered to client vault.");
      await fetchCase();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-xs text-[#8C96A5]">
        Loading case workspace...
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#1B2838]">Access Denied / Not Found</h2>
        <p className="text-xs text-[#5A6472] max-w-md mx-auto">
          {error || "You do not have authorization to view this case."}
        </p>
        <Link
          href="/admin/cases"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B2838] underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Assigned Cases</span>
        </Link>
      </div>
    );
  }

  const currentStageObj = caseData.stages.find((s) => s.stageName === activeStageTab);
  const isDelivered = caseData.currentStage === "DELIVERED";
  const canModifyActiveStage = isOwner || assignedStages.includes(activeStageTab);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <Link
          href="/admin/cases"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6472] hover:text-[#1B2838]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cases</span>
        </Link>

        {isOwner && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleStaffVisibility}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                caseData.showStaffNamesToClient
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-[#FFFFFF] border-[#E2E8F0] text-[#5A6472]"
              }`}
            >
              {caseData.showStaffNamesToClient ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>
                Client Portal Staff Names: {caseData.showStaffNamesToClient ? "Visible" : "Hidden"}
              </span>
            </button>
          </div>
        )}
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-600 hover:text-emerald-800">
            Dismiss
          </button>
        </div>
      )}

      {/* Case Header Card */}
      <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#1B2838] px-2.5 py-0.5 rounded bg-[#F7F6F3] border border-[#E2E8F0]">
                {caseData.caseNumber}
              </span>
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                {caseData.serviceRequested}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#1B2838] mt-1">{caseData.title}</h1>
            <p className="text-xs text-[#5A6472] mt-0.5">
              Client: <strong>{caseData.clientName}</strong> • {caseData.clientEmail} • {caseData.clientPhone}
            </p>
          </div>

          <div className="text-right">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider ${
                isDelivered
                  ? "bg-emerald-100 text-emerald-800"
                  : caseData.currentStage === "OWNER_REVIEW"
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              Current Stage: {STAGE_LABELS[caseData.currentStage]?.label || caseData.currentStage}
            </span>
          </div>
        </div>

        {/* 6 Stages Progress Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-4 border-t border-[#E2E8F0] text-xs">
          {caseData.stages.map((stg) => {
            const isDone = stg.status === "COMPLETED";
            const isSelected = activeStageTab === stg.stageName;
            const isAssignedToUser = assignedStages.includes(stg.stageName) || isOwner;

            return (
              <button
                key={stg.stageName}
                onClick={() => setActiveStageTab(stg.stageName)}
                className={`p-3 rounded border text-left transition-all ${
                  isSelected
                    ? "border-[#1B2838] bg-[#1B2838] text-[#F7F6F3] shadow-md"
                    : isDone
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                    : "bg-[#FFFFFF] border-[#E2E8F0] text-[#1B2838] hover:border-[#1B2838]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] truncate">
                    {STAGE_LABELS[stg.stageName]?.label.split(". ")[1]}
                  </span>
                  {isDone && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
                </div>
                <div
                  className={`text-[10px] mt-1 truncate ${
                    isSelected ? "text-[#C9A24B]" : "text-[#8C96A5]"
                  }`}
                >
                  {stg.assignedTo?.name || "Unassigned"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid: Stage Workspace & Structured Intake Responses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stage Workspace (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {currentStageObj && (
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
                    Stage Workspace
                  </span>
                  <h2 className="text-lg font-bold text-[#1B2838]">
                    {STAGE_LABELS[currentStageObj.stageName]?.label}
                  </h2>
                  <p className="text-xs text-[#5A6472]">
                    Status: <strong className="uppercase">{currentStageObj.status}</strong>
                  </p>
                </div>

                {/* Stage Assignee Control */}
                <div className="text-xs space-y-1">
                  <span className="text-[#8C96A5] block">Stage Assignee:</span>
                  {isOwner ? (
                    <select
                      value={currentStageObj.assignedToId || ""}
                      onChange={(e) => handleAssignStage(currentStageObj.stageName, e.target.value)}
                      className="px-2.5 py-1.5 rounded border border-[#E2E8F0] font-semibold text-[#1B2838] bg-[#F7F6F3]"
                    >
                      <option value="">Unassigned</option>
                      {staffOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name} ({opt.roleTitle})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-bold text-[#1B2838]">
                      {currentStageObj.assignedTo?.name || "Unassigned"}
                    </span>
                  )}
                </div>
              </div>

              {/* Internal Notes: Private to Staff and Owner */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1B2838] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Internal Stage Notes (Strictly Confidential — Private to Team)</span>
                  </label>
                  <span className="text-[10px] text-[#8C96A5]">Never shown on client portal</span>
                </div>
                <textarea
                  rows={6}
                  disabled={!canModifyActiveStage}
                  value={notesInput[currentStageObj.stageName] ?? ""}
                  onChange={(e) =>
                    setNotesInput({
                      ...notesInput,
                      [currentStageObj.stageName]: e.target.value,
                    })
                  }
                  placeholder={
                    canModifyActiveStage
                      ? "Record findings, research sources, client call observations, or next-step instructions..."
                      : "Only the assigned team member or Owner can edit these notes."
                  }
                  className="w-full p-3 text-xs rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] disabled:bg-[#F7F6F3] font-mono"
                />
              </div>

              {/* Action Buttons for this Stage */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
                {canModifyActiveStage ? (
                  <button
                    onClick={() => handleSaveNotes(currentStageObj.stageName)}
                    disabled={processing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838] transition-colors"
                  >
                    <Save className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Save Internal Notes</span>
                  </button>
                ) : <div />}

                {canModifyActiveStage && currentStageObj.status !== "COMPLETED" && (
                  <button
                    onClick={() => handleCompleteStage(currentStageObj.stageName)}
                    disabled={processing}
                    className="inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                    <span>Complete Stage &amp; Hand Off</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Owner Final Approval & Deliverable Release Card (Owner-Only) */}
          {isOwner && (
            <div className="bg-[#1B2838] text-[#F7F6F3] p-6 sm:p-8 rounded-lg border border-[#2A3D54] shadow-md space-y-4">
              <div className="border-b border-[#2A3D54] pb-3">
                <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
                  Owner Gatekeeper
                </span>
                <h3 className="text-base font-bold text-[#F7F6F3] mt-0.5">
                  Approve Final Report &amp; Release to Client Vault
                </h3>
                <p className="text-xs text-[#8C96A5]">
                  Only Niraj Kumar (Owner) can authorize final deliverables before they become accessible to the client.
                </p>
              </div>

              {caseData.finalReportApproved ? (
                <div className="p-4 rounded bg-[#111B27] border border-emerald-500/40 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approved &amp; Delivered by Owner</span>
                  </div>
                  <p className="text-[#E2E8F0]">
                    Document: <strong>{caseData.finalReportTitle}</strong>
                  </p>
                  <a
                    href={caseData.finalReportUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#C9A24B] underline text-[11px] block"
                  >
                    View / Download Deliverable
                  </a>
                </div>
              ) : (
                <form onSubmit={handleApproveReport} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#E2E8F0]">Report Title *</label>
                    <input
                      type="text"
                      required
                      value={reportTitleInput}
                      onChange={(e) => setReportTitleInput(e.target.value)}
                      placeholder="e.g. Strategic Expansion & GTM Roadmap.pdf"
                      className="w-full px-3.5 py-2 rounded bg-[#111B27] border border-[#2A3D54] text-[#F7F6F3]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#E2E8F0]">Cloudflare R2 / Storage URL *</label>
                    <input
                      type="url"
                      required
                      value={reportUrlInput}
                      onChange={(e) => setReportUrlInput(e.target.value)}
                      placeholder="https://.../reports/..."
                      className="w-full px-3.5 py-2 rounded bg-[#111B27] border border-[#2A3D54] text-[#F7F6F3]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
                  >
                    {processing ? "Releasing Report..." : "Approve & Deliver to Client"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Structured Intake Data & Audit Log */}
        <div className="space-y-6">
          {/* Structured Intake Responses */}
          {caseData.submission && (
            <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[#1B2838] border-b border-[#E2E8F0] pb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#C9A24B]" />
                <span>Structured Intake Brief</span>
              </h3>

              <div className="space-y-3 text-[#5A6472]">
                <div>
                  <strong className="text-[#1B2838] block">Entity &amp; Scale:</strong>
                  <p>{caseData.submission.businessName} • {caseData.submission.businessType}</p>
                  <p>Stage: {caseData.submission.businessStage} • Team: {caseData.submission.teamSize}</p>
                </div>

                <div>
                  <strong className="text-[#1B2838] block">Location &amp; Channel:</strong>
                  <p>{caseData.submission.locationCity}, {caseData.submission.locationState}, {caseData.submission.locationCountry}</p>
                  <p>Prefers: {caseData.submission.preferredChannel}</p>
                </div>

                <div>
                  <strong className="text-[#1B2838] block">Goals:</strong>
                  <p className="mt-0.5">{caseData.submission.primaryGoals}</p>
                </div>

                <div>
                  <strong className="text-[#1B2838] block">Challenges:</strong>
                  <p className="mt-0.5">{caseData.submission.keyChallenges}</p>
                </div>

                {/* Service Branch Specific Answers */}
                {caseData.submission.serviceDetails && Object.keys(caseData.submission.serviceDetails).length > 0 && (
                  <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                    <strong className="text-[#C9A24B] block font-bold uppercase tracking-wider text-[10px]">
                      {caseData.serviceRequested} Branch Data:
                    </strong>
                    {Object.entries(caseData.submission.serviceDetails).map(([key, val]) => (
                      <div key={key} className="bg-[#F7F6F3] p-2.5 rounded border border-[#E2E8F0]">
                        <span className="font-mono text-[10px] text-[#8C96A5] block">{key}</span>
                        <p className="text-[#1B2838] text-[11px] mt-0.5">{val}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Forensic Audit Log */}
          <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-[#1B2838] border-b border-[#E2E8F0] pb-2 flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#C9A24B]" />
              <span>Case Audit Log</span>
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {caseData.auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B2838]">{log.action}</span>
                    <span className="text-[10px] text-[#8C96A5]">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A6472]">
                    By: <strong>{log.actorName}</strong> ({log.actorRole})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
