"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  FileCheck,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";

interface SubmissionItem {
  id: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessType: string;
  businessStage: string;
  locationCity: string;
  currentTimeline: string;
  primaryGoals: string;
  keyChallenges: string;
  preferredChannel: "WHATSAPP_CALL" | "GOOGLE_MEET";
  status: "UNDER_REVIEW" | "QUOTE_SENT" | "SCHEDULED" | "COMPLETED";
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([
    {
      id: "SUB-1049",
      businessName: "Singhania Logistics & Retail LLP",
      contactName: "Vikram Singhania",
      contactEmail: "vikram@singhanialogistics.in",
      contactPhone: "+91 98101 23456",
      businessType: "RETAIL",
      businessStage: "EXPANDING_SCALING",
      locationCity: "Delhi NCR",
      currentTimeline: "IMMEDIATE",
      primaryGoals: "Evaluate 3,500 sq.ft. commercial retail flagship space prior to lease execution.",
      keyChallenges: "Previous two tenants in the exact unit closed down within a year. Need spatial and timing audit.",
      preferredChannel: "WHATSAPP_CALL",
      status: "UNDER_REVIEW",
      createdAt: "Today, 11:30 AM",
    },
    {
      id: "SUB-1048",
      businessName: "Apex Precision Components",
      contactName: "Sunil Agrawal",
      contactEmail: "sunil@apexprecision.com",
      contactPhone: "+91 99202 34567",
      businessType: "MANUFACTURING",
      businessStage: "MATURE_ENTERPRISE",
      locationCity: "Greater Noida",
      currentTimeline: "NEXT_30_DAYS",
      primaryGoals: "Industrial plant shed expansion and reorienting administrative cabins.",
      keyChallenges: "Working capital delays and recurring dispatch choke points since shed expansion.",
      preferredChannel: "GOOGLE_MEET",
      status: "QUOTE_SENT",
      createdAt: "Yesterday, 4:10 PM",
    },
    {
      id: "SUB-1047",
      businessName: "Vanguard Cloud Technologies",
      contactName: "Ananya Roy",
      contactEmail: "ananya@vanguardcloud.io",
      contactPhone: "+91 98450 12389",
      businessType: "TECH_SAAS",
      businessStage: "EARLY_TRACTION",
      locationCity: "Bengaluru",
      currentTimeline: "NEXT_QUARTER",
      primaryGoals: "Calculate Series A investor term-sheet closing timing windows and founder cabin layout.",
      keyChallenges: "Term-sheet negotiations stalled despite term interest; seeking favorable milestone window.",
      preferredChannel: "GOOGLE_MEET",
      status: "SCHEDULED",
      createdAt: "Oct 02, 2026",
    },
  ]);

  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(submissions[0]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const filtered = submissions.filter((s) => {
    if (filterStatus === "ALL") return true;
    return s.status === filterStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Intake Review Inbox
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838]">Client Business Submissions</h1>
          <p className="text-xs text-[#5A6472]">
            Review structured business profiles, premises layouts, and operational timelines for diagnostic formulation.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          {["ALL", "UNDER_REVIEW", "QUOTE_SENT", "SCHEDULED", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded transition-colors ${
                filterStatus === st
                  ? "bg-[#1B2838] text-[#F7F6F3] font-bold"
                  : "bg-[#FFFFFF] border border-[#E2E8F0] text-[#5A6472] hover:bg-[#F7F6F3]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List + Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSub(item)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedSub?.id === item.id
                  ? "border-[#1B2838] bg-[#FFFFFF] shadow-md ring-1 ring-[#1B2838]"
                  : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#1B2838]/40"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#1B2838]">{item.businessName}</h4>
                  <span className="text-[11px] text-[#5A6472]">{item.contactName} • {item.locationCity}</span>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                    item.status === "UNDER_REVIEW"
                      ? "bg-amber-100 text-amber-800"
                      : item.status === "QUOTE_SENT"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {item.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-[#5A6472] line-clamp-2">{item.primaryGoals}</p>
              <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex justify-between items-center text-[10px] text-[#8C96A5]">
                <span>Ref: {item.id}</span>
                <span>{item.createdAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Inspector */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          {selectedSub ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
                    Submission Details ({selectedSub.id})
                  </span>
                  <h3 className="text-xl font-bold text-[#1B2838]">{selectedSub.businessName}</h3>
                  <p className="text-xs text-[#5A6472]">
                    Contact: <strong>{selectedSub.contactName}</strong> ({selectedSub.contactEmail}) • {selectedSub.contactPhone}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[#8C96A5] text-[11px] font-semibold">Change Pipeline State:</span>
                    <select
                      value={selectedSub.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value as any;
                        setSubmissions((prev) =>
                          prev.map((s) => (s.id === selectedSub.id ? { ...s, status: newStatus } : s))
                        );
                        setSelectedSub({ ...selectedSub, status: newStatus });
                        try {
                          await fetch("/api/admin/submissions/status", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ submissionId: selectedSub.id, status: newStatus }),
                          });
                        } catch (err) {
                          console.error("Failed to update status", err);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded border border-[#E2E8F0] bg-white font-bold text-xs text-[#1B2838]"
                    >
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="QUOTE_SENT">Quote Sent</option>
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <Link
                    href={`/admin/quotes?submissionId=${selectedSub.id}&name=${encodeURIComponent(selectedSub.contactName)}&business=${encodeURIComponent(selectedSub.businessName)}&email=${encodeURIComponent(selectedSub.contactEmail)}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#C9A24B] text-[#1B2838] font-bold text-xs uppercase hover:bg-[#B8913B] transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Issue Custom Quote</span>
                  </Link>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-[#F7F6F3] p-4 rounded border border-[#E2E8F0]">
                <div>
                  <span className="text-[#8C96A5] block">Industry Sector:</span>
                  <strong className="text-[#1B2838]">{selectedSub.businessType}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Operating Stage:</span>
                  <strong className="text-[#1B2838]">{selectedSub.businessStage}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Commercial Region:</span>
                  <strong className="text-[#1B2838]">{selectedSub.locationCity}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Timeline Urgency:</span>
                  <strong className="text-[#1B2838]">{selectedSub.currentTimeline}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Preferred Session Channel:</span>
                  <strong className="text-[#1B2838]">
                    {selectedSub.preferredChannel === "WHATSAPP_CALL" ? "WhatsApp Call" : "Google Meet Video"}
                  </strong>
                </div>
              </div>

              {/* Strategic Goals & Challenges */}
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#1B2838] uppercase tracking-wide text-[11px]">Primary Strategic Objectives:</h4>
                  <p className="p-3 bg-[#FFFFFF] rounded border border-[#E2E8F0] mt-1 text-[#5A6472] leading-relaxed">
                    {selectedSub.primaryGoals}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2838] uppercase tracking-wide text-[11px]">Key Operational Challenges / Choke Points:</h4>
                  <p className="p-3 bg-[#FFFFFF] rounded border border-[#E2E8F0] mt-1 text-[#5A6472] leading-relaxed">
                    {selectedSub.keyChallenges}
                  </p>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap gap-3 text-xs">
                <a
                  href={`https://wa.me/${selectedSub.contactPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#2A3D54] bg-[#1B2838] text-[#F7F6F3] font-semibold hover:bg-[#2A3D54]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Message Client on WhatsApp</span>
                </a>

                <Link
                  href={`/admin/bookings?submissionId=${selectedSub.id}&clientName=${encodeURIComponent(selectedSub.contactName)}&channel=${selectedSub.preferredChannel}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#E2E8F0] bg-[#F7F6F3] text-[#1B2838] font-semibold hover:bg-[#E2E8F0]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Consultation Slot</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-[#8C96A5]">
              Select a submission to review complete business context.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
