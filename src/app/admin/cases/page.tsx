"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  serviceRequested: string;
  currentStage: string;
  createdAt: string;
  stages: {
    stageName: string;
    order: number;
    status: string;
    assignedTo?: {
      name: string;
      email: string;
      staffPermission?: { roleTitle: string };
    } | null;
  }[];
}

const STAGE_LABELS: Record<string, string> = {
  INFORMATION_COLLECTION: "1. Information Collection",
  RESEARCH: "2. Market Research",
  CONSULTATION: "3. Strategic Consultation",
  REPORT_PREPARATION: "4. Report Preparation",
  OWNER_REVIEW: "5. Owner Review",
  DELIVERED: "6. Delivered to Client",
};

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/cases");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to load cases");
      }
      const data = await res.json();
      setCases(data.cases || []);
      setIsOwner(Boolean(data.isOwner));
    } catch (err: any) {
      setError(err.message || "Failed to load consulting cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = stageFilter === "ALL" || c.currentStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Case Lifecycle Management
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838] mt-1">
            Active Consulting Engagements
          </h1>
          <p className="text-xs text-[#5A6472] mt-0.5">
            {isOwner
              ? "All consulting cases. The Owner assigns stages and approves final reports."
              : "Showing only cases and stages assigned to you under server-side least privilege."}
          </p>
        </div>

        <button
          onClick={fetchCases}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838] transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#FFFFFF] p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C96A5] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by case #, entity, or client..."
            className="w-full pl-9 pr-3.5 py-2 rounded text-xs border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#8C96A5]" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded text-xs border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
          >
            <option value="ALL">All Stages ({cases.length})</option>
            <option value="INFORMATION_COLLECTION">1. Information Collection</option>
            <option value="RESEARCH">2. Market Research</option>
            <option value="CONSULTATION">3. Strategic Consultation</option>
            <option value="REPORT_PREPARATION">4. Report Preparation</option>
            <option value="OWNER_REVIEW">5. Owner Review</option>
            <option value="DELIVERED">6. Delivered to Client</option>
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#8C96A5] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0]">
            Loading cases...
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#8C96A5] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0]">
            No consulting cases match your criteria.
          </div>
        ) : (
          filteredCases.map((c) => {
            const currentStageLabel = STAGE_LABELS[c.currentStage] || c.currentStage;
            const isDelivered = c.currentStage === "DELIVERED";

            return (
              <div
                key={c.id}
                className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] hover:border-[#1B2838] transition-all p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#1B2838] px-2 py-0.5 rounded bg-[#F7F6F3] border border-[#E2E8F0]">
                        {c.caseNumber}
                      </span>
                      <span className="text-xs font-semibold text-[#C9A24B] uppercase tracking-wider">
                        {c.serviceRequested}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1B2838] mt-1">{c.title}</h3>
                    <p className="text-xs text-[#5A6472] mt-0.5">
                      Client Contact: <strong>{c.clientName}</strong> ({c.clientEmail})
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                        isDelivered
                          ? "bg-emerald-100 text-emerald-800"
                          : c.currentStage === "OWNER_REVIEW"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {currentStageLabel}
                    </span>
                    <span className="text-[10px] text-[#8C96A5]">
                      Initiated: {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* 6 Stages Visual Pipeline */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1 text-[11px]">
                  {c.stages.map((stg) => {
                    const isDone = stg.status === "COMPLETED";
                    const isCurrent = stg.status === "IN_PROGRESS";
                    const shortName = STAGE_LABELS[stg.stageName]?.split(". ")[1] || stg.stageName;

                    return (
                      <div
                        key={stg.stageName}
                        className={`p-2 rounded border text-center transition-colors ${
                          isDone
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold"
                            : isCurrent
                            ? "bg-[#1B2838] border-[#1B2838] text-[#F7F6F3] font-bold"
                            : "bg-[#F7F6F3] border-[#E2E8F0] text-[#8C96A5]"
                        }`}
                      >
                        <div className="truncate">{shortName}</div>
                        <div className="text-[9px] mt-0.5 opacity-80 truncate">
                          {stg.assignedTo?.name || "Unassigned"}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Link */}
                <div className="flex justify-end pt-2">
                  <Link
                    href={`/admin/cases/${c.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors"
                  >
                    <span>Open Case Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
