"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Lock,
  Globe,
  FileCheck,
  Clock,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string | null;
  role: string | null;
  quote: string;
  serviceUsed: string;
  date: string;
  consentConfirmed: boolean;
  consentNote: string | null;
  isPublished: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedbackToken: string | null;
  case: {
    caseNumber: string;
    clientName: string;
    serviceRequested: string;
  } | null;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    consentConfirmed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "PUBLISHED" | "UNPUBLISHED">("ALL");

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [serviceUsed, setServiceUsed] = useState("GTM Strategy");
  const [quote, setQuote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [consentNote, setConsentNote] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setClientName("");
    setCompany("");
    setRole("");
    setServiceUsed("GTM Strategy");
    setQuote("");
    setDate(new Date().toISOString().split("T")[0]);
    setConsentConfirmed(false);
    setConsentNote("");
    setIsPublished(false);
    setActionError(null);
    setShowModal(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setClientName(item.clientName);
    setCompany(item.company || "");
    setRole(item.role || "");
    setServiceUsed(item.serviceUsed);
    setQuote(item.quote);
    setDate(item.date ? new Date(item.date).toISOString().split("T")[0] : "");
    setConsentConfirmed(item.consentConfirmed);
    setConsentNote(item.consentNote || "");
    setIsPublished(item.isPublished);
    setActionError(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);

    if (isPublished && (!consentConfirmed || !consentNote.trim())) {
      setActionError(
        "Cannot publish without confirmed client consent and a documented consent note (e.g. WhatsApp confirmation, email record)."
      );
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        clientName,
        company,
        role,
        serviceUsed,
        quote,
        date,
        consentConfirmed,
        consentNote,
        isPublished,
      };

      if (editingItem) {
        payload.id = editingItem.id;
        const res = await fetch("/api/admin/testimonials", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update testimonial");
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create testimonial");
      }

      setShowModal(false);
      fetchTestimonials();
    } catch (err: any) {
      setActionError(err.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: TestimonialItem) => {
    if (!item.isPublished && (!item.consentConfirmed || !item.consentNote)) {
      alert(
        "Cannot publish: Client consent has not been confirmed or consent note is missing. Please edit and record explicit consent first."
      );
      return;
    }

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          isPublished: !item.isPublished,
          status: !item.isPublished ? "APPROVED" : item.status,
        }),
      });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial record?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === "PENDING") return t.status === "PENDING";
    if (filter === "PUBLISHED") return t.isPublished;
    if (filter === "UNPUBLISHED") return !t.isPublished;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F7F6F3]">Client Testimonials &amp; Feedback</h1>
          <p className="text-xs text-[#8C96A5] mt-1">
            Real, consent-confirmed testimonials only. Zero seeded or fabricated content.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Testimonial</span>
        </button>
      </div>

      {/* Compliance Callout */}
      <div className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-4 flex items-start gap-3 text-xs text-[#8C96A5]">
        <ShieldCheck className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[#F7F6F3] font-semibold">Strict Consent Verification Rule</p>
          <p>
            No testimonial will appear on the public site or homepage unless <strong>Consent Confirmed</strong> is checked AND a <strong>Consent Note</strong> (e.g. WhatsApp message date, email confirmation) is documented.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111B27] border border-[#2A3D54] p-4 rounded-lg">
          <p className="text-[10px] text-[#8C96A5] uppercase font-bold tracking-wider">Total Recorded</p>
          <p className="text-2xl font-bold text-[#F7F6F3] mt-1">{stats.total}</p>
        </div>
        <div className="bg-[#111B27] border border-[#2A3D54] p-4 rounded-lg">
          <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Published Live</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.published}</p>
        </div>
        <div className="bg-[#111B27] border border-[#2A3D54] p-4 rounded-lg">
          <p className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Pending Approval</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-[#111B27] border border-[#2A3D54] p-4 rounded-lg">
          <p className="text-[10px] text-[#C9A24B] uppercase font-bold tracking-wider">Consent Confirmed</p>
          <p className="text-2xl font-bold text-[#C9A24B] mt-1">{stats.consentConfirmed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[#2A3D54] gap-6 text-xs font-semibold">
        <button
          onClick={() => setFilter("ALL")}
          className={`pb-3 transition-colors ${
            filter === "ALL" ? "text-[#C9A24B] border-b-2 border-[#C9A24B]" : "text-[#8C96A5] hover:text-[#F7F6F3]"
          }`}
        >
          All Testimonials ({testimonials.length})
        </button>
        <button
          onClick={() => setFilter("PENDING")}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            filter === "PENDING" ? "text-[#C9A24B] border-b-2 border-[#C9A24B]" : "text-[#8C96A5] hover:text-[#F7F6F3]"
          }`}
        >
          <span>Pending Post-Delivery ({stats.pending})</span>
          {stats.pending > 0 && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
        </button>
        <button
          onClick={() => setFilter("PUBLISHED")}
          className={`pb-3 transition-colors ${
            filter === "PUBLISHED" ? "text-[#C9A24B] border-b-2 border-[#C9A24B]" : "text-[#8C96A5] hover:text-[#F7F6F3]"
          }`}
        >
          Published Live ({stats.published})
        </button>
        <button
          onClick={() => setFilter("UNPUBLISHED")}
          className={`pb-3 transition-colors ${
            filter === "UNPUBLISHED" ? "text-[#C9A24B] border-b-2 border-[#C9A24B]" : "text-[#8C96A5] hover:text-[#F7F6F3]"
          }`}
        >
          Unpublished ({testimonials.length - stats.published})
        </button>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#8C96A5]">Loading testimonials...</div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-12 text-center space-y-3">
          <MessageSquare className="w-8 h-8 text-[#5A6472] mx-auto" />
          <h3 className="text-sm font-bold text-[#F7F6F3]">No Testimonials Found</h3>
          <p className="text-xs text-[#8C96A5] max-w-md mx-auto">
            Zero dummy testimonials exist in this system. Authentic testimonials accumulate automatically when clients complete post-delivery feedback or when you record consent-verified feedback.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#111B27] border border-[#2A3D54] rounded-lg p-6 space-y-4 hover:border-[#3B4D66] transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#2A3D54] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#F7F6F3]">{item.clientName}</span>
                  {item.company && (
                    <span className="text-xs text-[#8C96A5]">
                      • {item.company} {item.role ? `(${item.role})` : ""}
                    </span>
                  )}
                  {item.case && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#C9A24B]">
                      {item.case.caseNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Badges */}
                  {item.isPublished ? (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Live Public</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#8C96A5]">
                      Unpublished
                    </span>
                  )}

                  {item.status === "PENDING" && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Pending Review</span>
                    </span>
                  )}

                  {item.consentConfirmed ? (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-400 flex items-center gap-1">
                      <FileCheck className="w-3 h-3" />
                      <span>Consent Verified</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-400">
                      No Consent
                    </span>
                  )}
                </div>
              </div>

              {/* Quote Content */}
              <div className="text-xs text-[#E2E8F0] leading-relaxed italic border-l-2 border-[#C9A24B] pl-4">
                &ldquo;{item.quote}&rdquo;
              </div>

              {/* Meta & Consent Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-[#8C96A5] pt-1">
                <div>
                  <strong>Service:</strong> {item.serviceUsed} | <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div>
                  <strong>Consent Record:</strong>{" "}
                  <span className="text-[#F7F6F3]">
                    {item.consentNote || "None documented"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A3D54]/60">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className={`text-xs px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 ${
                    item.isPublished
                      ? "bg-[#1B2838] hover:bg-[#2A3D54] text-[#8C96A5]"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{item.isPublished ? "Unpublish" : "Approve & Publish Live"}</span>
                </button>

                <button
                  onClick={() => openEditModal(item)}
                  className="text-xs text-[#8C96A5] hover:text-[#F7F6F3] p-1.5 rounded hover:bg-[#1B2838]"
                  title="Edit Testimonial"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-950/40"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add / Edit Testimonial */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#111B27] border border-[#2A3D54] rounded-xl max-w-lg w-full p-6 text-[#F7F6F3] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2A3D54] pb-4">
              <h3 className="text-lg font-bold">
                {editingItem ? "Edit Testimonial" : "Add Verified Testimonial"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#8C96A5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionError && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{actionError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                    Client Name or Initials *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. R. Sharma"
                    className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Retail Tech"
                    className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                    Role / Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                    Service Used *
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                  >
                    <option value="GTM Strategy">GTM Strategy</option>
                    <option value="Market Research">Market Research</option>
                    <option value="Business Expansion Strategy">Business Expansion Strategy</option>
                    <option value="New Business Start Consultation">New Business Start Consultation</option>
                    <option value="General Business Consulting">General Business Consulting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                  Testimonial / Quote *
                </label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter verbatim quote from client..."
                  className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                />
              </div>

              {/* Consent Section (Mandatory for publication) */}
              <div className="p-3 bg-[#1B2838] border border-[#2A3D54] rounded space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentConfirmed}
                    onChange={(e) => setConsentConfirmed(e.target.checked)}
                    className="w-4 h-4 text-[#C9A24B] rounded border-slate-600 focus:ring-[#C9A24B]"
                  />
                  <span className="font-semibold text-[#F7F6F3]">
                    Client Consent Confirmed *
                  </span>
                </label>

                <div>
                  <label className="block text-[#8C96A5] uppercase font-bold tracking-wider mb-1">
                    Consent Audit Note (How was consent given?) *
                  </label>
                  <input
                    type="text"
                    value={consentNote}
                    onChange={(e) => setConsentNote(e.target.value)}
                    placeholder="e.g. Confirmed via WhatsApp message on 12-Apr-2026"
                    className="w-full p-2 rounded bg-[#111B27] border border-[#2A3D54] text-[#F7F6F3] focus:border-[#C9A24B] outline-none"
                  />
                  <span className="text-[10px] text-[#8C96A5] mt-0.5 block">
                    Record exact communication channel and date for regulatory auditability.
                  </span>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#1B2838] rounded border border-[#2A3D54]">
                <div>
                  <span className="font-semibold text-[#F7F6F3] block">Publish to Public Site</span>
                  <span className="text-[10px] text-[#8C96A5]">
                    Requires confirmed consent and documented note.
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={isPublished}
                  disabled={!consentConfirmed}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-[#C9A24B] rounded border-slate-600 focus:ring-[#C9A24B] disabled:opacity-40"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-[#1B2838] hover:bg-[#2A3D54] text-[#8C96A5] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] font-bold uppercase tracking-wider"
                >
                  {saving ? "Saving..." : editingItem ? "Update Record" : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
