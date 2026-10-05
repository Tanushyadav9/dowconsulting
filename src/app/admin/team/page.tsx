"use client";

import { useState } from "react";
import { ShieldAlert, UserCheck, ShieldCheck, Plus, Check, X, Lock } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "STAFF";
  canManageSubmissions: boolean;
  canManageQuotes: boolean;
  canManageBookings: boolean;
  canManageReports: boolean;
  canManageTeam: boolean;
}

export default function AdminTeamPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: "usr_1",
      name: "Niraj Kumar",
      email: "niraj.kumar@dowconsulting.com",
      role: "OWNER",
      canManageSubmissions: true,
      canManageQuotes: true,
      canManageBookings: true,
      canManageReports: true,
      canManageTeam: true,
    },
    {
      id: "usr_2",
      name: "Operations Associate",
      email: "operations@dowconsulting.com",
      role: "STAFF",
      canManageSubmissions: true,
      canManageQuotes: false,
      canManageBookings: true,
      canManageReports: false,
      canManageTeam: false,
    },
  ]);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const togglePermission = (staffId: string, perm: keyof StaffMember) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === staffId && s.role !== "OWNER") {
          return { ...s, [perm]: !s[perm] };
        }
        return s;
      })
    );
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setStaffList((prev) => [
      ...prev,
      {
        id: `usr_${Date.now()}`,
        name: newName || newEmail.split("@")[0],
        email: newEmail.trim().toLowerCase(),
        role: "STAFF",
        canManageSubmissions: true,
        canManageQuotes: false,
        canManageBookings: true,
        canManageReports: false,
        canManageTeam: false,
      },
    ]);

    setNewEmail("");
    setNewName("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Owner-Controlled Governance
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838]">Team &amp; Staff Section Grants</h1>
          <p className="text-xs text-[#5A6472]">
            Section-level authorization without Clerk Organizations paid tiers. Owner privileges are strictly verified via <code className="bg-[#E2E8F0] px-1 py-0.5 rounded text-[#1B2838]">process.env.OWNER_EMAIL</code> with zero hardcoded fallbacks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1B2838] text-xs font-bold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
        >
          <Plus className="w-4 h-4 text-[#C9A24B]" />
          <span>Grant New Staff Access</span>
        </button>
      </div>

      {/* Security Architecture Compliance Banner */}
      <div className="p-4 rounded border border-[#2A3D54] bg-[#1B2838] text-[#F7F6F3] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <strong className="text-[#F7F6F3]">Hardened Security Invariant (Zero Hardcoded Fallback):</strong>
          <p className="text-[#8C96A5]">
            Owner authentication reads strictly from the active <code className="text-[#C9A24B]">OWNER_EMAIL</code> environment variable. If omitted, no fallback email is ever assumed. Non-owner staff members can only access modules explicitly checked below.
          </p>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#111B27] text-[#F7F6F3]">
              <tr>
                <th className="p-4 text-left font-bold">Staff Member &amp; Role</th>
                <th className="p-4 text-center font-bold">Submissions Inbox</th>
                <th className="p-4 text-center font-bold">Custom Quotes</th>
                <th className="p-4 text-center font-bold">Session Bookings</th>
                <th className="p-4 text-center font-bold">R2 Reports Vault</th>
                <th className="p-4 text-center font-bold">Team Grants (Owner)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-[#F7F6F3]/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold text-xs shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-[#1B2838]">{member.name}</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              member.role === "OWNER"
                                ? "bg-[#F7EED9] text-[#8C6A1E]"
                                : "bg-slate-100 text-[#5A6472]"
                            }`}
                          >
                            {member.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A6472]">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Submissions toggle */}
                  <td className="p-4 text-center">
                    <button
                      disabled={member.role === "OWNER"}
                      onClick={() => togglePermission(member.id, "canManageSubmissions")}
                      className={`p-1.5 rounded transition-colors ${
                        member.canManageSubmissions
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {member.canManageSubmissions ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Quotes toggle */}
                  <td className="p-4 text-center">
                    <button
                      disabled={member.role === "OWNER"}
                      onClick={() => togglePermission(member.id, "canManageQuotes")}
                      className={`p-1.5 rounded transition-colors ${
                        member.canManageQuotes
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {member.canManageQuotes ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Bookings toggle */}
                  <td className="p-4 text-center">
                    <button
                      disabled={member.role === "OWNER"}
                      onClick={() => togglePermission(member.id, "canManageBookings")}
                      className={`p-1.5 rounded transition-colors ${
                        member.canManageBookings
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {member.canManageBookings ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Reports toggle */}
                  <td className="p-4 text-center">
                    <button
                      disabled={member.role === "OWNER"}
                      onClick={() => togglePermission(member.id, "canManageReports")}
                      className={`p-1.5 rounded transition-colors ${
                        member.canManageReports
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {member.canManageReports ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Team grants (Owner only) */}
                  <td className="p-4 text-center">
                    {member.role === "OWNER" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#C9A24B] font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        Owner Inherent
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#8C96A5]">Restricted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant Access Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-lg max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#1B2838]">Grant Staff Access</h3>
            <p className="text-xs text-[#5A6472]">
              User will log in with their Google or Email account via Clerk, and receive only the granted module rights.
            </p>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Staff Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Email Address (Google / Clerk)</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="priya@dowconsulting.com"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded border border-[#E2E8F0] text-[#5A6472] hover:bg-[#F7F6F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#1B2838] text-[#F7F6F3] font-bold hover:bg-[#2A3D54]"
                >
                  Confirm Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
