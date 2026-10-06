"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FileCheck, Send, CheckCircle2, AlertCircle, Copy, ExternalLink } from "lucide-react";

interface QuoteItem {
  id: string;
  submissionId: string;
  title: string;
  scopeSummary: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  submission?: {
    contactName: string;
    businessName: string;
    contactEmail: string;
  };
}

interface SubmissionItem {
  id: string;
  contactName: string;
  businessName: string;
  contactEmail: string;
  businessType: string;
}

function AdminQuotesContent() {
  const searchParams = useSearchParams();
  const defaultSubId = searchParams.get("submissionId") || "";
  const defaultClientName = searchParams.get("name") || "";
  const defaultBusiness = searchParams.get("business") || "";
  const defaultEmail = searchParams.get("email") || "";

  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    submissionId: defaultSubId,
    clientName: defaultClientName,
    businessName: defaultBusiness,
    clientEmail: defaultEmail,
    quoteTitle: "Commercial Spatial Diagnostic & Milestone Timing Advisory",
    scopeSummary: "Comprehensive directional site analysis, non-demolition layout reorientation, executive seating matrix, and strategic lease / milestone timing with Niraj Kumar.",
    amount: 55000,
    currency: "INR",
  });

  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [lastCheckoutUrl, setLastCheckoutUrl] = useState<string | null>(null);

  const fetchQuotesAndSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quotes");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load quotes data");
      setQuotes(data.quotes || []);
      setSubmissions(data.submissions || []);

      // If default submission id provided, auto fill
      if (defaultSubId && data.submissions) {
        const found = data.submissions.find((s: any) => s.id === defaultSubId);
        if (found) {
          setForm((prev) => ({
            ...prev,
            submissionId: found.id,
            clientName: found.contactName,
            businessName: found.businessName,
            clientEmail: found.contactEmail,
          }));
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotesAndSubmissions();
  }, [defaultSubId]);

  const handleSubmissionSelect = (subId: string) => {
    const selected = submissions.find((s) => s.id === subId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        submissionId: selected.id,
        clientName: selected.contactName,
        businessName: selected.businessName,
        clientEmail: selected.contactEmail,
      }));
    } else {
      setForm((prev) => ({ ...prev, submissionId: subId }));
    }
  };

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccessMsg(null);
    setLastCheckoutUrl(null);

    try {
      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch quote");

      setSuccessMsg(data.message || `Quote created and proposal delivered to ${form.clientEmail}`);
      if (data.checkoutUrl) setLastCheckoutUrl(data.checkoutUrl);

      fetchQuotesAndSubmissions();
    } catch (err: any) {
      setError(err.message || "Failed to create quote proposal");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Proposal Dispatcher &amp; Pricing Desk
        </span>
        <h1 className="text-2xl font-bold text-[#1B2838]">Owner Quote Builder</h1>
        <p className="text-xs text-[#5A6472]">
          Formulate bespoke consulting scopes, define flat retainers, and dispatch proposals with direct checkout links.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quote Builder Form */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h3 className="font-bold text-sm text-[#1B2838]">Build Custom Advisory Proposal</h3>
            <p className="text-xs text-[#5A6472]">
              {form.submissionId ? `Linked to Submission #${form.submissionId}` : "Select a submission or enter client details"}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
              {lastCheckoutUrl && (
                <div className="pt-2 border-t border-emerald-200 text-[11px] flex items-center justify-between gap-2">
                  <span className="truncate">Checkout URL: {lastCheckoutUrl}</span>
                  <a
                    href={lastCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold shrink-0 flex items-center gap-1"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
            {/* Submission Selector */}
            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Link to Intake Submission *</label>
              {submissions.length > 0 ? (
                <select
                  value={form.submissionId}
                  onChange={(e) => handleSubmissionSelect(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-[#FFFFFF]"
                >
                  <option value="">-- Select an Intake Submission --</option>
                  {submissions.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      #{sub.id.slice(-6)}: {sub.businessName} ({sub.contactName}) - {sub.businessType}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  value={form.submissionId}
                  onChange={(e) => setForm({ ...form, submissionId: e.target.value })}
                  placeholder="Enter Submission ID"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Client Executive Name *</label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Business Entity Name *</label>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Client Email (Resend Proposal Delivery) *</label>
              <input
                type="email"
                required
                value={form.clientEmail}
                onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Proposal / Scope Title *</label>
              <input
                type="text"
                required
                value={form.quoteTitle}
                onChange={(e) => setForm({ ...form, quoteTitle: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1B2838]">Detailed Scope Inclusions *</label>
              <textarea
                required
                rows={4}
                value={form.scopeSummary}
                onChange={(e) => setForm({ ...form, scopeSummary: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">One-Time Retainer Fee *</label>
                <input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                >
                  <option value="INR">INR (₹ - Razorpay)</option>
                  <option value="USD">USD ($ - Stripe)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4 text-[#C9A24B]" />
              <span>{sending ? "Delivering Proposal via Resend..." : "Dispatch Proposal & Notify Client"}</span>
            </button>
          </form>
        </div>

        {/* Sent Quotes Pipeline */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3 flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#1B2838]">Active Quote Pipeline</h3>
            <span className="text-xs text-[#5A6472]">{quotes.length} total</span>
          </div>

          <div className="space-y-3 text-xs">
            {loading ? (
              <p className="text-[#5A6472] py-4 text-center">Loading quote pipeline...</p>
            ) : quotes.length === 0 ? (
              <p className="text-[#5A6472] py-4 text-center">No quotes created yet.</p>
            ) : (
              quotes.map((q) => (
                <div key={q.id} className="p-3.5 rounded border border-[#E2E8F0] bg-[#F7F6F3] space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-[#1B2838]">{q.submission?.businessName || "Custom Client"}</strong>
                      <p className="text-[11px] text-[#5A6472]">{q.submission?.contactName || "Executive"}</p>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        q.status === "ACCEPTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : q.status === "SENT"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A6472] line-clamp-1">{q.title}</p>
                  <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-center text-[10px] text-[#8C96A5]">
                    <span className="font-bold text-[#1B2838] text-xs">
                      {q.currency === "INR" ? `₹${q.amount.toLocaleString("en-IN")}` : `$${q.amount} USD`}
                    </span>
                    <a
                      href={`/checkout?quoteId=${q.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C9A24B] font-bold hover:underline"
                    >
                      View Checkout
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminQuotesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-[#5A6472]">Loading quotes manager...</div>}>
      <AdminQuotesContent />
    </Suspense>
  );
}
