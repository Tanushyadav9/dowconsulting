"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, UserCheck, ShieldCheck, Plus, Check, X, Lock, Trash2, RefreshCw } from "lucide-react";

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
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      if (res.status === 403) {
        setIsOwner(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.staff)) {
        setStaffList(data.staff);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const togglePermission = async (staffMember: StaffMember, perm: keyof StaffMember) => {
    if (staffMember.role === "OWNER") return;

    const updatedPermissions = {
      canManageSubmissions: staffMember.canManageSubmissions,
      canManageQuotes: staffMember.canManageQuotes,
      canManageBookings: staffMember.canManageBookings,
      canManageReports: staffMember.canManageReports,
      [perm]: !staffMember[perm],
    };

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: staffMember.email,
          targetName: staffMember.name,
          permissions: updatedPermissions,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update permissions");
      }

      setStaffList((prev) =>
        prev.map((s) => (s.id === staffMember.id ? { ...s, [perm]: !s[perm] } : s))
      );
    } catch (err: any) {
      setActionError(err.message || "Error updating permission");
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setActionError(null);

    const targetEmail = newEmail.trim().toLowerCase();
    const targetName = newName || targetEmail.split("@")[0];

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail,
          targetName,
          permissions: {
            canManageSubmissions: true,
            canManageQuotes: false,
            canManageBookings: true,
            canManageReports: false,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to grant staff access");
      }

      await fetchStaff();
      setNewEmail("");
      setNewName("");
      setShowAddModal(false);
    } catch (err: any) {
      setActionError(err.message || "Failed to grant access");
    }
  };

  const handleRevokeStaff = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/team?userId=${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to revoke access");
      }
      setStaffList((prev) => prev.filter((s) => s.id !== userId));
    } catch (err: any) {
      setActionError(err.message || "Failed to revoke staff access");
    }
  };

  if (!isOwner) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-[#1B2838]">Access Restricted — Owner Only</h1>
        <p className="text-xs text-[#5A6472]">
          Section grants and staff management are reserved strictly for the primary Owner designated via <code>OWNER_EMAIL</code>.
        </p>
      </div>
    );
  }

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

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStaff}
            className="p-2 rounded border border-[#CBD5E1] text-[#1B2838] hover:bg-[#F7F6F3]"
            title="Refresh staff list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1B2838] text-xs font-bold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#C9A24B]" />
            <span>Grant New Staff Access</span>
          </button>
        </div>
      </div>

      {actionError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {actionError}
        </div>
      )}

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
                <th className="p-4 text-center font-bold">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-[#5A6472]">
                    Loading staff members...
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-[#5A6472]">
                    No staff members with explicit permissions found in the database. Use &quot;Grant New Staff Access&quot; above to add team members.
                  </td>
                </tr>
              ) : (
                staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F7F6F3]/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1B2838] text-[#C9A24B] flex items-center justify-center font-bold text-xs shrink-0">
                          {member.name.charAt(0).toUpperCase()}
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

                    {/* Submissions */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePermission(member, "canManageSubmissions")}
                        disabled={member.role === "OWNER"}
                        className={`p-1.5 rounded transition-colors ${
                          member.canManageSubmissions
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {member.canManageSubmissions ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Quotes */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePermission(member, "canManageQuotes")}
                        disabled={member.role === "OWNER"}
                        className={`p-1.5 rounded transition-colors ${
                          member.canManageQuotes
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {member.canManageQuotes ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Bookings */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePermission(member, "canManageBookings")}
                        disabled={member.role === "OWNER"}
                        className={`p-1.5 rounded transition-colors ${
                          member.canManageBookings
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {member.canManageBookings ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Reports */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePermission(member, "canManageReports")}
                        disabled={member.role === "OWNER"}
                        className={`p-1.5 rounded transition-colors ${
                          member.canManageReports
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {member.canManageReports ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                      {member.role !== "OWNER" && (
                        <button
                          onClick={() => handleRevokeStaff(member.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Revoke staff permissions"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#FFFFFF] rounded-lg max-w-md w-full p-6 space-y-4 border border-[#E2E8F0] shadow-xl">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="font-bold text-base text-[#1B2838]">Grant Staff Access</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#5A6472] hover:text-[#1B2838]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1B2838] mb-1">Staff Member Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Operations Coordinator"
                  className="w-full p-2.5 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1B2838] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="coordinator@dowconsulting.in"
                  className="w-full p-2.5 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded border border-[#CBD5E1] text-[#5A6472] hover:bg-[#F7F6F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#1B2838] text-[#F7F6F3] font-bold hover:bg-[#2A3D54]"
                >
                  Save Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
