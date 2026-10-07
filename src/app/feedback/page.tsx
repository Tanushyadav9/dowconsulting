"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  Send,
  Lock,
} from "lucide-react";

function FeedbackFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(Boolean(token));
  const [initialData, setInitialData] = useState<{
    caseNumber?: string;
    serviceRequested?: string;
    clientName?: string;
    company?: string;
    hasSubmitted?: boolean;
  } | null>(null);

  const [tokenError, setTokenError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [serviceUsed, setServiceUsed] = useState("General Business Consulting");
  const [quote, setQuote] = useState("");
  const [attributionPreference, setAttributionPreference] = useState("Full Name and Company");
  const [consentConfirmed, setConsentConfirmed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchTokenInfo = async () => {
      try {
        const res = await fetch(`/api/feedback?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setInitialData(data);
          if (data.clientName) setName(data.clientName);
          if (data.company) setCompany(data.company);
          if (data.serviceRequested) setServiceUsed(data.serviceRequested);
        } else {
          setTokenError(data.error || "Invalid or expired feedback link.");
        }
      } catch (err: any) {
        setTokenError("Unable to verify feedback link. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenInfo();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consentConfirmed) {
      setErrorMessage("Please confirm your consent to proceed.");
      return;
    }

    if (!quote.trim() || quote.trim().length < 15) {
      setErrorMessage("Please share a brief summary of your consultation experience (at least 15 characters).");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          clientName: name,
          company,
          role,
          quote,
          consentConfirmed,
          attributionPreference,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback.");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-[#8C96A5]">Loading your advisory engagement profile...</p>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-sm text-center space-y-6">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#1B2838]">Thank You for Your Feedback</h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Your remarks have been submitted to practice leadership.
          </p>
        </div>

        <div className="bg-[#F7F6F3] p-4 rounded text-xs text-[#5A6472] text-left space-y-2 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#1B2838] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            <span>Strict Consent &amp; Transparency Policy</span>
          </div>
          <p>
            At DOW Consulting, we never publish unverified or fabricated testimonials. Every published quote requires prior client consent and explicit verification by Lead Strategic Advisor Niraj Kumar.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1B2838] text-[#F7F6F3] hover:bg-[#2A3D54] px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 px-4 sm:px-6">
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#1B2838] p-6 text-[#F7F6F3] border-b border-[#2A3D54]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider px-2 py-0.5 rounded bg-[#111B27] border border-[#2A3D54]">
              Verified Client Review
            </span>
            {initialData?.caseNumber && (
              <span className="text-xs text-[#8C96A5]">
                Case: <strong className="text-[#F7F6F3]">{initialData.caseNumber}</strong>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold mt-2">Post-Engagement Feedback</h1>
          <p className="text-xs text-[#8C96A5] mt-1">
            Share your consultation experience with Lead Strategic Advisor Niraj Kumar and the DOW Consulting advisory team.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {tokenError && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> {tokenError} You may still submit feedback below for manual verification.
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
                Your Name or Preferred Initials *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. R. Sharma or Rajesh Sharma"
                className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
                Organization / Company (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Apex Retail Tech"
                className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
                Role / Designation (Optional)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founder & CEO / Operations Head"
                className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
                Consulting Service Utilized
              </label>
              <select
                value={serviceUsed}
                onChange={(e) => setServiceUsed(e.target.value)}
                className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B] bg-[#FFFFFF]"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
              Consultation Experience &amp; Remarks *
            </label>
            <textarea
              required
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Describe how the advisory consultation, research analysis, or strategic report assisted your enterprise..."
              className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B] leading-relaxed"
            />
            <p className="text-[11px] text-[#8C96A5] mt-1">
              Please share genuine observations. At DOW Consulting, we value constructive, transparent feedback.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2838] mb-1.5">
              Preferred Attribution Format
            </label>
            <select
              value={attributionPreference}
              onChange={(e) => setAttributionPreference(e.target.value)}
              className="w-full text-xs p-3 rounded border border-[#CBD5E1] focus:outline-none focus:border-[#C9A24B] bg-[#FFFFFF]"
            >
              <option value="Full Name and Company">Display Full Name and Company (e.g. Rajesh Sharma, Apex Retail)</option>
              <option value="Initials and Company">Display Initials and Company (e.g. R. S., Apex Retail)</option>
              <option value="Name Only (Company Hidden)">Display Name Only, omit company name</option>
              <option value="Initials Only">Display Initials Only (e.g. R. S.)</option>
            </select>
          </div>

          {/* Mandatory Consent Checkbox */}
          <div className="p-4 bg-[#F7F6F3] border border-[#E2E8F0] rounded space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentConfirmed}
                onChange={(e) => setConsentConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#C9A24B] border-slate-300 rounded focus:ring-[#C9A24B]"
              />
              <span className="text-xs text-[#1B2838] leading-relaxed">
                <strong>Explicit Publication Consent:</strong> I confirm that this review reflects my genuine experience with DOW Consulting. I grant permission to quote these remarks on dowconsulting.in in accordance with my chosen attribution format.
              </span>
            </label>

            <div className="text-[11px] text-[#5A6472] pl-7 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#C9A24B]" />
              <span>Submissions arrive as pending and are published strictly upon Owner review.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Feedback...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Verified Feedback</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <FeedbackFormContent />
    </Suspense>
  );
}
