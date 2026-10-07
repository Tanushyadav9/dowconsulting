"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SERVICE_BRANCHES,
  SERVICES_LIST,
  ServiceType,
  COMMON_QUESTIONS,
} from "@/lib/constants/intakeQuestions";
import { BRAND } from "@/lib/constants/brand";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  Send,
  HelpCircle,
} from "lucide-react";

export function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedServiceParam = (searchParams.get("service") as ServiceType) || "GTM_STRATEGY";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Contact & Location
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessName: "",
    locationCity: "",
    locationState: "",
    locationCountry: "India",

    // Step 2: Profile & Stage
    businessStage: "early", // idea, early, operating
    businessType: "Retail & Consumer Goods",
    teamSize: "2-5",
    premisesStatus: "LEASED", // LEASED, OWNED, SEARCHING, VIRTUAL

    // Step 3: Service Selection & Dynamic Branch Answers
    serviceRequested: (requestedServiceParam in SERVICE_BRANCHES
      ? requestedServiceParam
      : "GTM_STRATEGY") as ServiceType,
    serviceDetails: {} as Record<string, string>,

    // Step 4: Goals, Timeline, Urgency & Logistics
    primaryGoals: "",
    keyChallenges: "",
    currentTimeline: "Next 30 days",
    budgetRange: "₹50,000 – ₹1,50,000",
    preferredChannel: "WHATSAPP_CALL" as "WHATSAPP_CALL" | "GOOGLE_MEET",

    // Step 5: Confidentiality / Consent Checkbox
    consentConfidentiality: false,
  });

  const activeBranch = SERVICE_BRANCHES[formData.serviceRequested] || SERVICE_BRANCHES.GTM_STRATEGY;

  const handleBranchAnswerChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [questionId]: value,
      },
    }));
  };

  const nextStep = () => {
    setError(null);
    // Simple per-step validations
    if (step === 1) {
      if (!formData.contactName || !formData.contactEmail || !formData.contactPhone || !formData.businessName) {
        setError("Please complete all required contact fields.");
        return;
      }
      if (!formData.locationCity || !formData.locationState) {
        setError("Please provide your city and state.");
        return;
      }
    }
    if (step === 3) {
      // Validate required branch questions
      const missing = activeBranch.questions
        .filter((q) => q.required && !formData.serviceDetails[q.id]?.trim())
        .map((q) => q.label);
      if (missing.length > 0) {
        setError(`Please answer the following required service question: "${missing[0]}"`);
        return;
      }
    }
    if (step === 4) {
      if (!formData.primaryGoals.trim() || !formData.keyChallenges.trim()) {
        setError("Please outline your primary strategic goals and key challenges.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.consentConfidentiality) {
      setError("Please confirm your consent to the Non-Disclosure & Confidentiality terms to submit this assessment.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to submit intake assessment");
      }

      router.push(`/account?submissionId=${data.id}&status=submitted`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while submitting your assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Stepper Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-[#5A6472] mb-3">
          <span>Step {step} of 5</span>
          <span className="text-[#C9A24B] uppercase tracking-wider font-bold">
            {step === 1 && "1. Executive Contact & Location"}
            {step === 2 && "2. Business Stage & Profile"}
            {step === 3 && `3. ${activeBranch.shortName} Details`}
            {step === 4 && "4. Goals, Timeline & Urgency"}
            {step === 5 && "5. Confidentiality & Confirmation"}
          </span>
        </div>
        <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#1B2838] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: CONTACT & LOCATION */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1B2838]">Executive Contact &amp; Entity Coordinates</h3>
              <p className="text-xs text-[#5A6472] mt-1">
                All client information is handled under strict commercial confidentiality by our team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Business Email *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="ramesh@company.com"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
                <p className="text-[11px] text-[#8C96A5]">Used for direct advisory scheduling coordinates.</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Business / Entity Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Apex Retail LLP / Project Nexus"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">City *</label>
                <input
                  type="text"
                  required
                  value={formData.locationCity}
                  onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                  placeholder="e.g. Noida, Delhi NCR, Mumbai"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">State / Province *</label>
                <input
                  type="text"
                  required
                  value={formData.locationState}
                  onChange={(e) => setFormData({ ...formData, locationState: e.target.value })}
                  placeholder="e.g. Uttar Pradesh, Maharashtra"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-[#1B2838]">Country *</label>
                <input
                  type="text"
                  required
                  value={formData.locationCountry}
                  onChange={(e) => setFormData({ ...formData, locationCountry: e.target.value })}
                  placeholder="India"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE & STAGE */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1B2838]">Business Stage, Industry &amp; Team</h3>
              <p className="text-xs text-[#5A6472] mt-1">
                Helps our team tailor strategic frameworks for your operating scale.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-semibold text-[#1B2838]">Current Business Stage *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "idea", label: "Idea / Concept Stage", desc: "Formulation, validation, pre-incorporation" },
                    { value: "early", label: "Early-Stage / Pre-Revenue", desc: "Pilot launch, MVP, initial traction" },
                    { value: "operating", label: "Operating / Scaling", desc: "Commercial revenue, operational team" },
                  ].map((stg) => (
                    <div
                      key={stg.value}
                      onClick={() => setFormData({ ...formData, businessStage: stg.value })}
                      className={`p-3.5 rounded border cursor-pointer transition-all ${
                        formData.businessStage === stg.value
                          ? "border-[#1B2838] bg-[#1B2838] text-[#F7F6F3]"
                          : "border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838]"
                      }`}
                    >
                      <strong className="block text-xs">{stg.label}</strong>
                      <span className={`text-[11px] block mt-1 ${formData.businessStage === stg.value ? "text-[#C9A24B]" : "text-[#5A6472]"}`}>
                        {stg.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Industry Classification *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  >
                    <option value="Retail & Consumer Goods">Retail &amp; Consumer Goods</option>
                    <option value="Manufacturing & Industrial">Manufacturing &amp; Industrial</option>
                    <option value="D2C & E-Commerce">D2C Brands &amp; E-Commerce</option>
                    <option value="Technology & Software (B2B SaaS)">Technology &amp; B2B Software / SaaS</option>
                    <option value="B2B Professional Services">B2B Professional Services</option>
                    <option value="Food, Beverage & Hospitality">Food, Beverage &amp; Hospitality</option>
                    <option value="Healthcare & Wellness">Healthcare &amp; Wellness</option>
                    <option value="Logistics & Warehousing">Logistics &amp; Warehousing</option>
                    <option value="Other Diversified MSME">Other Diversified MSME</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Current Team Size *</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  >
                    <option value="1">1 (Solo Founder)</option>
                    <option value="2-5">2–5 Core Members</option>
                    <option value="6-20">6–20 Employees</option>
                    <option value="21-50">21–50 Employees</option>
                    <option value="50+">50+ Employees</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="font-semibold text-[#1B2838]">Commercial Presence / Physical Setup</label>
                <select
                  value={formData.premisesStatus}
                  onChange={(e) => setFormData({ ...formData, premisesStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="LEASED">Commercial Lease / Rented Office or Facility</option>
                  <option value="OWNED">Self-Owned Commercial Facility / Industrial Unit</option>
                  <option value="SEARCHING">Currently Searching / Evaluating Sites</option>
                  <option value="VIRTUAL">Remote / Digital-First / Co-Working</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SERVICE SELECTION & BRANCHING QUESTIONS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1B2838]">What do you want help with?</h3>
              <p className="text-xs text-[#5A6472] mt-1">
                Select your primary advisory service. The questions below adapt dynamically to your requirements.
              </p>
            </div>

            {/* Service selector tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SERVICES_LIST.map((srv) => {
                const isSelected = formData.serviceRequested === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setFormData({ ...formData, serviceRequested: srv.id })}
                    className={`p-4 rounded border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-[#1B2838] bg-[#1B2838] text-[#F7F6F3] shadow-sm"
                        : "border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838] bg-[#FFFFFF]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <strong className="text-xs">{srv.title}</strong>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />}
                      </div>
                      <p className={`text-[11px] mt-1 ${isSelected ? "text-[#E2E8F0]" : "text-[#5A6472]"}`}>
                        {srv.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Branching Questions for the selected service */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
              <div className="bg-[#F7F6F3] p-4 rounded border border-[#E2E8F0] text-xs">
                <span className="font-bold text-[#1B2838] block">{activeBranch.title} Focus Area</span>
                <p className="text-[#5A6472] mt-0.5">{activeBranch.description}</p>
                <span className="text-[10px] text-[#C9A24B] font-bold uppercase tracking-wider block mt-1">
                  Draft questions pending final client wording
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {activeBranch.questions.map((q) => (
                  <div key={q.id} className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838] flex items-center gap-1.5">
                      <span>{q.label}</span>
                      {q.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      rows={3}
                      required={q.required}
                      value={formData.serviceDetails[q.id] || ""}
                      onChange={(e) => handleBranchAnswerChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    />
                    {q.helpText && <p className="text-[11px] text-[#8C96A5]">{q.helpText}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: GOALS, TIMELINE & LOGISTICS */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1B2838]">Goals, Urgency &amp; Advisory Format</h3>
              <p className="text-xs text-[#5A6472] mt-1">
                Help our consulting team understand your timeline, priorities, and preferred connection channel.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Primary Strategic Goals for this Engagement *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.primaryGoals}
                  onChange={(e) => setFormData({ ...formData, primaryGoals: e.target.value })}
                  placeholder="What specific outcome or decision are you seeking guidance on from the consulting team?"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Main Challenges &amp; Bottlenecks *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.keyChallenges}
                  onChange={(e) => setFormData({ ...formData, keyChallenges: e.target.value })}
                  placeholder="What are the biggest operational, market, or distribution hurdles you currently face?"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Timeline &amp; Urgency *</label>
                  <select
                    value={formData.currentTimeline}
                    onChange={(e) => setFormData({ ...formData, currentTimeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  >
                    <option value="Immediate (Next 7-14 days)">Immediate (Next 7–14 days)</option>
                    <option value="Next 30 days">Next 30 days</option>
                    <option value="Next quarter (60-90 days)">Next Quarter (60–90 days)</option>
                    <option value="Exploratory / Planning Stage">Exploratory / Planning Stage</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Advisory Budget Range</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  >
                    <option value="Under ₹50,000">Under ₹50,000</option>
                    <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                    <option value="₹1,50,000 – ₹3,50,000">₹1,50,000 – ₹3,50,000</option>
                    <option value="₹3,50,000+">₹3,50,000+</option>
                    <option value="Proposal-Dependent">Scope-Dependent / Custom Quote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-semibold text-[#1B2838]">Preferred Way to Connect *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: "WHATSAPP_CALL", label: "Direct WhatsApp Call", desc: "Direct coordination with consulting desk" },
                    { value: "GOOGLE_MEET", label: "Google Meet Video Call", desc: "Screen sharing and slide review" },
                  ].map((ch) => (
                    <div
                      key={ch.value}
                      onClick={() => setFormData({ ...formData, preferredChannel: ch.value as any })}
                      className={`p-3.5 rounded border cursor-pointer transition-all ${
                        formData.preferredChannel === ch.value
                          ? "border-[#1B2838] bg-[#1B2838] text-[#F7F6F3]"
                          : "border-[#E2E8F0] hover:border-[#1B2838] text-[#1B2838]"
                      }`}
                    >
                      <strong className="block text-xs">{ch.label}</strong>
                      <span className={`text-[11px] block mt-0.5 ${formData.preferredChannel === ch.value ? "text-[#C9A24B]" : "text-[#5A6472]"}`}>
                        {ch.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & MANDATORY CONFIDENTIALITY */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1B2838]">Review &amp; Non-Disclosure Agreement</h3>
              <p className="text-xs text-[#5A6472] mt-1">
                Please review your submission summary and confirm non-disclosure terms.
              </p>
            </div>

            <div className="bg-[#F7F6F3] p-5 rounded border border-[#E2E8F0] space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 border-b border-[#E2E8F0] pb-3">
                <div>
                  <span className="text-[#8C96A5] block">Client Name:</span>
                  <strong className="text-[#1B2838]">{formData.contactName}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Business Name:</span>
                  <strong className="text-[#1B2838]">{formData.businessName}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Service Requested:</span>
                  <strong className="text-[#C9A24B]">{activeBranch.title}</strong>
                </div>
                <div>
                  <span className="text-[#8C96A5] block">Location:</span>
                  <strong className="text-[#1B2838]">{formData.locationCity}, {formData.locationState}</strong>
                </div>
              </div>

              <div>
                <span className="text-[#8C96A5] block">Primary Goal:</span>
                <p className="text-[#1B2838] line-clamp-2 mt-0.5">{formData.primaryGoals}</p>
              </div>
            </div>

            {/* Mandatory NDA and Confidentiality Checkbox */}
            <div className="p-4 bg-amber-50/50 border border-[#C9A24B]/30 rounded space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentConfidentiality}
                  onChange={(e) => setFormData({ ...formData, consentConfidentiality: e.target.checked })}
                  className="mt-1 h-4 w-4 text-[#1B2838] focus:ring-[#1B2838] border-gray-300 rounded"
                />
                <span className="text-xs text-[#1B2838]">
                  <strong>Mandatory Non-Disclosure &amp; Information Security Consent:</strong><br />
                  I confirm that all commercial information submitted is proprietary to my enterprise. I understand that DOW Consulting treats this data under strict commercial non-disclosure. Data is restricted strictly to the Owner and the assigned consulting team handling my case, and will never be shared or monetized.
                </span>
              </label>
            </div>

            <div className="text-[11px] text-[#8C96A5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
              <span>Transmitted over TLS 1.3 encrypted channel and saved to isolated Neon PostgreSQL.</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-semibold text-[#5A6472] hover:text-[#1B2838] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#F7F6F3] bg-[#1B2838] hover:bg-[#2A3D54] transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#1B2838] bg-[#C9A24B] hover:bg-[#B8913B] transition-colors shadow-md disabled:opacity-50"
            >
              {submitting ? (
                <span>Submitting Assessment...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Strategic Assessment</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
