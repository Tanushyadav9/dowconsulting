"use client";

import { useState, useEffect } from "react";
import {
  ShieldAlert,
  UserCheck,
  ShieldCheck,
  Plus,
  Check,
  X,
  Lock,
  Trash2,
  RefreshCw,
  Tag,
  Edit2,
  Globe,
  Users,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "STAFF";
  roleTitle: string;
  canManageSubmissions: boolean;
  canManageQuotes: boolean;
  canManageBookings: boolean;
  canManageReports: boolean;
  canManageTeam: boolean;
}

interface TeamRoleItem {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
}

interface PublicMemberItem {
  id: string;
  name: string;
  roleTitle: string;
  photoUrl: string | null;
  bio: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminTeamPage() {
  const [activeTab, setActiveTab] = useState<"INTERNAL" | "PUBLIC_DIRECTORY">("INTERNAL");

  // Internal Staff & Roles State
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [availableRoles, setAvailableRoles] = useState<TeamRoleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

  // Public Directory State
  const [publicMembers, setPublicMembers] = useState<PublicMemberItem[]>([]);
  const [publicLoading, setPublicLoading] = useState(false);

  // Invite modal state
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRoleTitle, setNewRoleTitle] = useState("Consultant");
  const [showAddModal, setShowAddModal] = useState(false);

  // Role edit / add modal state
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleNameInput, setRoleNameInput] = useState("");
  const [roleDescInput, setRoleDescInput] = useState("");

  // Public Member modal state
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [editingPublicMember, setEditingPublicMember] = useState<PublicMemberItem | null>(null);
  const [pubName, setPubName] = useState("");
  const [pubRoleTitle, setPubRoleTitle] = useState("");
  const [pubPhotoUrl, setPubPhotoUrl] = useState("");
  const [pubBio, setPubBio] = useState("");
  const [pubOrder, setPubOrder] = useState(0);
  const [pubIsPublished, setPubIsPublished] = useState(false);

  const [actionError, setActionError] = useState<string | null>(null);

  const fetchStaffAndRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      if (res.status === 403) {
        setIsOwner(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.staff)) setStaffList(data.staff);
        if (Array.isArray(data.roles)) setAvailableRoles(data.roles);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicMembers = async () => {
    setPublicLoading(true);
    try {
      const res = await fetch("/api/admin/public-team");
      const data = await res.json();
      if (data.success && Array.isArray(data.members)) {
        setPublicMembers(data.members);
      }
    } catch (err: any) {
      console.warn("Error fetching public members:", err);
    } finally {
      setPublicLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffAndRoles();
    fetchPublicMembers();
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
          roleTitle: staffMember.roleTitle,
          permissions: updatedPermissions,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update permission");
      }

      setStaffList((prev) =>
        prev.map((s) => (s.id === staffMember.id ? { ...s, [perm]: !s[perm] } : s))
      );
    } catch (err: any) {
      setActionError(err.message || "Error updating permission");
    }
  };

  const handleUpdateRoleTitle = async (staffMember: StaffMember, newTitle: string) => {
    if (staffMember.role === "OWNER") return;

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: staffMember.email,
          targetName: staffMember.name,
          roleTitle: newTitle,
          permissions: {
            canManageSubmissions: staffMember.canManageSubmissions,
            canManageQuotes: staffMember.canManageQuotes,
            canManageBookings: staffMember.canManageBookings,
            canManageReports: staffMember.canManageReports,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update role title");
      }

      setStaffList((prev) =>
        prev.map((s) => (s.id === staffMember.id ? { ...s, roleTitle: newTitle } : s))
      );
    } catch (err: any) {
      setActionError(err.message || "Error updating role title");
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
          roleTitle: newRoleTitle,
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

      await fetchStaffAndRoles();
      setNewEmail("");
      setNewName("");
      setShowAddModal(false);
    } catch (err: any) {
      setActionError(err.message || "Failed to grant access");
    }
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleNameInput.trim()) return;

    try {
      const res = await fetch("/api/admin/team/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: editingRoleId,
          name: roleNameInput.trim(),
          description: roleDescInput.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save role");
      }

      await fetchStaffAndRoles();
      setShowRoleModal(false);
      setEditingRoleId(null);
      setRoleNameInput("");
      setRoleDescInput("");
    } catch (err: any) {
      setActionError(err.message || "Failed to save configurable role");
    }
  };

  const handleRevokeStaff = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/team?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStaffList((prev) => prev.filter((s) => s.id !== userId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Public Member Actions
  const openCreatePublicModal = () => {
    setEditingPublicMember(null);
    setPubName("");
    setPubRoleTitle("");
    setPubPhotoUrl("");
    setPubBio("");
    setPubOrder(publicMembers.length);
    setPubIsPublished(false);
    setActionError(null);
    setShowPublicModal(true);
  };

  const openEditPublicModal = (member: PublicMemberItem) => {
    setEditingPublicMember(member);
    setPubName(member.name);
    setPubRoleTitle(member.roleTitle);
    setPubPhotoUrl(member.photoUrl || "");
    setPubBio(member.bio);
    setPubOrder(member.order);
    setPubIsPublished(member.isPublished);
    setActionError(null);
    setShowPublicModal(true);
  };

  const handleSavePublicMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);

    if (!pubName.trim() || !pubRoleTitle.trim() || !pubBio.trim()) {
      setActionError("Name, role title, and bio are all required.");
      return;
    }

    try {
      const payload: any = {
        name: pubName.trim(),
        roleTitle: pubRoleTitle.trim(),
        photoUrl: pubPhotoUrl.trim() || null,
        bio: pubBio.trim(),
        order: Number(pubOrder),
        isPublished: pubIsPublished,
      };

      if (editingPublicMember) {
        payload.id = editingPublicMember.id;
        const res = await fetch("/api/admin/public-team", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update profile");
      } else {
        const res = await fetch("/api/admin/public-team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create profile");
      }

      setShowPublicModal(false);
      fetchPublicMembers();
    } catch (err: any) {
      setActionError(err.message || "Failed to save profile");
    }
  };

  const handleTogglePublishPublicMember = async (member: PublicMemberItem) => {
    try {
      const res = await fetch("/api/admin/public-team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,
          isPublished: !member.isPublished,
        }),
      });
      if (res.ok) {
        fetchPublicMembers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePublicMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this public team profile?")) return;
    try {
      const res = await fetch(`/api/admin/public-team?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPublicMembers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOwner) {
    return (
      <div className="p-8 text-center space-y-4 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl max-w-xl mx-auto my-12">
        <Lock className="w-12 h-12 text-[#C9A24B] mx-auto" />
        <h2 className="text-xl font-bold text-[#1B2838]">Owner Authorization Required</h2>
        <p className="text-xs text-[#5A6472] max-w-md mx-auto">
          Team role assignment and permission granting is restricted exclusively to the Owner (Niraj Kumar).
        </p>
      </div>
    );
  }

  const publishedCount = publicMembers.filter((m) => m.isPublished).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Practice Administration
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838] mt-1">
            Team Model &amp; Public Directory
          </h1>
          <p className="text-xs text-[#5A6472] mt-0.5">
            Manage operational team permissions and authenticated public profiles for the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "INTERNAL" ? (
            <>
              <button
                onClick={() => {
                  setEditingRoleId(null);
                  setRoleNameInput("");
                  setRoleDescInput("");
                  setShowRoleModal(true);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838] transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Manage Roles</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Invite Team Member</span>
              </button>
            </>
          ) : (
            <button
              onClick={openCreatePublicModal}
              className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Public Profile</span>
            </button>
          )}
        </div>
      </div>

      {actionError && (
        <div className="p-3.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex justify-between items-center">
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] gap-8 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("INTERNAL")}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === "INTERNAL"
              ? "text-[#1B2838] border-b-2 border-[#C9A24B]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
          <span>Internal Staff &amp; Least Privilege ({staffList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("PUBLIC_DIRECTORY")}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === "PUBLIC_DIRECTORY"
              ? "text-[#1B2838] border-b-2 border-[#C9A24B]"
              : "text-[#8C96A5] hover:text-[#1B2838]"
          }`}
        >
          <Globe className="w-4 h-4 text-[#C9A24B]" />
          <span>Public Team Page Profiles ({publicMembers.length})</span>
          {publishedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {publishedCount} live
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: INTERNAL STAFF & LEAST PRIVILEGE */}
      {activeTab === "INTERNAL" && (
        <div className="space-y-6">
          {/* Configurable Roles Overview Banner */}
          <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2838] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Configurable Generic Default Roles (Client Can Rename)</span>
              </h3>
              <span className="text-[10px] text-[#8C96A5]">Owner is Final Reviewer</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableRoles.map((r) => (
                <div key={r.id} className="p-3 rounded bg-[#F7F6F3] border border-[#E2E8F0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1B2838]">{r.name}</span>
                    <button
                      onClick={() => {
                        setEditingRoleId(r.id);
                        setRoleNameInput(r.name);
                        setRoleDescInput(r.description || "");
                        setShowRoleModal(true);
                      }}
                      className="text-[#8C96A5] hover:text-[#1B2838]"
                      title="Rename role"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#5A6472] line-clamp-2">
                    {r.description || "Active team workflow role"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Policies Notice */}
          <div className="bg-amber-50/60 border border-[#C9A24B]/30 rounded-lg p-4 text-xs text-[#1B2838] space-y-1">
            <div className="flex items-center gap-2 text-[#C9A24B] font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Server-Side Least Privilege Enforcement</span>
            </div>
            <p className="text-[11px] text-[#5A6472]">
              • Team members see <strong>ONLY</strong> the cases and stages assigned to them.<br />
              • Staff <strong>cannot see</strong> payments, revenue, pricing, other staff permissions, or unassigned cases.<br />
              • Assigning, reassigning, building quotes, and approving the final report are <strong>Owner-only</strong> actions.
            </p>
          </div>

          {/* Staff Table */}
          <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F7F6F3]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B2838]">
                Active Team Members ({staffList.length})
              </h3>
              <button
                onClick={fetchStaffAndRoles}
                disabled={loading}
                className="text-xs text-[#5A6472] hover:text-[#1B2838] flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-[#8C96A5]">Loading team members...</div>
            ) : staffList.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#8C96A5]">
                No team members invited yet. Click "Invite Team Member" above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F6F3] text-[#5A6472] font-semibold border-b border-[#E2E8F0]">
                    <tr>
                      <th className="py-3 px-4">Staff Member</th>
                      <th className="py-3 px-4">Configured Role</th>
                      <th className="py-3 px-4 text-center">Assigned Cases</th>
                      <th className="py-3 px-4 text-center">Manage Bookings</th>
                      <th className="py-3 px-4 text-center">Manage Quotes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {staffList.map((staff) => {
                      const isStaffOwner = staff.role === "OWNER";

                      return (
                        <tr key={staff.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-[#1B2838]">{staff.name}</div>
                            <div className="text-[11px] text-[#8C96A5]">{staff.email}</div>
                          </td>

                          <td className="py-3 px-4">
                            {isStaffOwner ? (
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-[#1B2838] font-bold text-[10px]">
                                Lead Strategic Advisor (Owner)
                              </span>
                            ) : (
                              <select
                                value={staff.roleTitle || "Consultant"}
                                onChange={(e) => handleUpdateRoleTitle(staff, e.target.value)}
                                className="text-[11px] px-2 py-1 rounded border border-[#E2E8F0] bg-[#FFFFFF] font-semibold text-[#1B2838]"
                              >
                                {availableRoles.map((r) => (
                                  <option key={r.id} value={r.name}>
                                    {r.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Assigned Only
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <button
                              disabled={isStaffOwner}
                              onClick={() => togglePermission(staff, "canManageBookings")}
                              className={`p-1 rounded ${
                                staff.canManageBookings
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-400"
                              } ${isStaffOwner ? "cursor-not-allowed opacity-60" : "hover:opacity-80"}`}
                            >
                              {staff.canManageBookings ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <X className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <button
                              disabled={isStaffOwner}
                              onClick={() => togglePermission(staff, "canManageQuotes")}
                              className={`p-1 rounded ${
                                staff.canManageQuotes
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-400"
                              } ${isStaffOwner ? "cursor-not-allowed opacity-60" : "hover:opacity-80"}`}
                            >
                              {staff.canManageQuotes ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <X className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-right">
                            {!isStaffOwner && (
                              <button
                                onClick={() => handleRevokeStaff(staff.id)}
                                className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                                title="Revoke staff access"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PUBLIC DIRECTORY (REAL PEOPLE ONLY) */}
      {activeTab === "PUBLIC_DIRECTORY" && (
        <div className="space-y-6">
          {/* Policy Notice: Real People Only */}
          <div className="bg-[#111B27] text-[#F7F6F3] border border-[#2A3D54] rounded-lg p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#C9A24B] font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Team Policy: Real People Only (Zero Seeded Content)</span>
            </div>
            <p className="text-xs text-[#8C96A5] leading-relaxed">
              Every profile shown on the public <code className="text-[#C9A24B]">/team</code> page must represent a real individual created directly by practice leadership. If no profiles are published, the link is automatically hidden from public navigation, and Niraj Kumar is featured on the About page with his corporate credentials.
            </p>
          </div>

          {/* Public Profiles Grid / Table */}
          <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F7F6F3]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B2838]">
                Public Profiles ({publicMembers.length} Total, {publishedCount} Published Live)
              </h3>
              <button
                onClick={fetchPublicMembers}
                disabled={publicLoading}
                className="text-xs text-[#5A6472] hover:text-[#1B2838] flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${publicLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>

            {publicLoading ? (
              <div className="p-12 text-center text-xs text-[#8C96A5]">Loading public directory...</div>
            ) : publicMembers.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#8C96A5] space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-400" />
                <p className="font-semibold text-slate-700">No public profiles created yet.</p>
                <p className="max-w-md mx-auto text-[11px]">
                  Zero profiles are seeded by design. Click "Add Public Profile" to add real team members when confirmed.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E2E8F0]">
                {publicMembers.map((member) => (
                  <div key={member.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#C9A24B]"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#1B2838] text-[#C9A24B] font-bold text-sm flex items-center justify-center shrink-0">
                          {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1B2838]">{member.name}</span>
                          <span className="text-xs font-semibold text-[#C9A24B]">• {member.roleTitle}</span>
                        </div>
                        <p className="text-xs text-[#5A6472] line-clamp-2 max-w-xl">{member.bio}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleTogglePublishPublicMember(member)}
                        className={`text-xs px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 ${
                          member.isPublished
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {member.isPublished ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Live Public</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Unpublished</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => openEditPublicModal(member)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                        title="Edit profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeletePublicMember(member.id)}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                        title="Delete profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="font-bold text-sm text-[#1B2838]">Invite Team Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#8C96A5] hover:text-[#1B2838]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="priya@dowconsulting.in"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Configured Role Title</label>
                <select
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                >
                  {availableRoles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#8C96A5]">
                  Information Coordinator (collection), Research Analyst (intelligence), Consultant (strategy).
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded text-[#5A6472] hover:text-[#1B2838]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-4 py-2 rounded font-bold uppercase tracking-wider"
                >
                  Grant Staff Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="font-bold text-sm text-[#1B2838]">
                {editingRoleId ? "Rename Role" : "Add Configurable Team Role"}
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="text-[#8C96A5] hover:text-[#1B2838]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Role Title *</label>
                <input
                  type="text"
                  required
                  value={roleNameInput}
                  onChange={(e) => setRoleNameInput(e.target.value)}
                  placeholder="e.g. Field Research Associate"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Role Description</label>
                <textarea
                  rows={3}
                  value={roleDescInput}
                  onChange={(e) => setRoleDescInput(e.target.value)}
                  placeholder="Briefly describe what this role typically handles..."
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 rounded text-[#5A6472] hover:text-[#1B2838]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-4 py-2 rounded font-bold uppercase tracking-wider"
                >
                  {editingRoleId ? "Save Changes" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Public Member Modal */}
      {showPublicModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="font-bold text-sm text-[#1B2838]">
                {editingPublicMember ? "Edit Public Team Profile" : "Add Public Team Profile"}
              </h3>
              <button onClick={() => setShowPublicModal(false)} className="text-[#8C96A5] hover:text-[#1B2838]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePublicMember} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={pubName}
                  onChange={(e) => setPubName(e.target.value)}
                  placeholder="e.g. Alok Mathur"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Public Role Title *</label>
                <input
                  type="text"
                  required
                  value={pubRoleTitle}
                  onChange={(e) => setPubRoleTitle(e.target.value)}
                  placeholder="e.g. Senior Market Research Analyst"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Photo URL (Optional)</label>
                <input
                  type="url"
                  value={pubPhotoUrl}
                  onChange={(e) => setPubPhotoUrl(e.target.value)}
                  placeholder="https://... (or leave blank for initials avatar)"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Short Professional Bio *</label>
                <textarea
                  required
                  rows={3}
                  value={pubBio}
                  onChange={(e) => setPubBio(e.target.value)}
                  placeholder="Briefly state this team member's domain expertise and advisory focus..."
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-[#E2E8F0]">
                <div>
                  <span className="font-bold text-[#1B2838] block">Publish to Public /team Page</span>
                  <span className="text-[11px] text-[#8C96A5]">
                    If unchecked, stays draft in admin area.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pubIsPublished}
                  onChange={(e) => setPubIsPublished(e.target.checked)}
                  className="w-4 h-4 text-[#C9A24B] rounded border-slate-300 focus:ring-[#C9A24B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowPublicModal(false)}
                  className="px-4 py-2 rounded text-[#5A6472] hover:text-[#1B2838]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-4 py-2 rounded font-bold uppercase tracking-wider"
                >
                  {editingPublicMember ? "Update Profile" : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
