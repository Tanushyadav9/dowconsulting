"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  SERVICE_BRANCHES,
  ServiceType,
} from "@/lib/constants/intakeQuestions";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  MessageSquare,
  Phone,
  ShieldCheck,
  Send,
  HelpCircle,
  Mail,
} from "lucide-react";

export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [submittedBrief, setSubmittedBrief] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Contact & Location
    contactName: "",
    contactPhone: "",
    businessName: "",
    locationCity: "",

    // Step 2: Profile & Stage
    businessStage: "early", // idea, early, operating
    businessType: "Retail & Consumer Goods",

    // Step 3: Service Selection & Dynamic Branch Answers
    serviceRequested: "GTM_STRATEGY" as ServiceType,
    serviceDetails: {} as Record<string, string>,

    // Step 4: Goals & Strategic Challenges
    primaryGoals: "",
    keyChallenges: "",
  });

  const activeBranch =
    SERVICE_BRANCHES[formData.serviceRequested] || SERVICE_BRANCHES.GTM_STRATEGY;

  const handleBranchAnswerChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [questionId]: value,
      },
    }));
  };

  const generateBriefText = () => {
    const lines = [
      `*DOW Consulting - Pre-Consultation Diagnostic Brief*`,
      `• *Client Name:* ${formData.contactName || "[Not specified]"}`,
      `• *Business Name:* ${formData.businessName || "[Not specified]"}`,
      `• *Location:* ${formData.locationCity || "India"}`,
      `• *Stage:* ${formData.businessStage.toUpperCase()} (${formData.businessType})`,
      `• *Service Requested:* ${activeBranch.title}`,
      `• *Primary Goals:* ${formData.primaryGoals || "Strategic guidance"}`,
      `• *Key Challenges:* ${formData.keyChallenges || "Not specified"}`,
    ];

    if (Object.keys(formData.serviceDetails).length > 0) {
      lines.push(`\n*Service-Specific Details:*`);
      for (const [key, val] of Object.entries(formData.serviceDetails)) {
        if (val && val.trim()) {
          const qLabel =
            activeBranch.questions.find((q) => q.id === key)?.label || key;
          lines.push(`- ${qLabel}: ${val.trim()}`);
        }
      }
    }

    return lines.join("\n");
  };

  const handleSendViaWhatsApp = () => {
    const brief = generateBriefText();
    window.open(ENQUIRY_CONFIG.buildWhatsAppUrl(brief), "_blank");
    setSubmittedBrief(true);
  };

  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Progress Indicator */}
      {!submittedBrief && (
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-[#8C96A5] mb-2">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && "1. Entity & Contact"}
              {step === 2 && "2. Business Stage & Sector"}
              {step === 3 && `3. ${activeBranch.title}`}
              {step === 4 && "4. Goals & Direct Enquiry"}
            </span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C9A24B] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {submittedBrief ? (
        <div className="text-center py-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#1B2838]">
              Diagnostic Brief Prepared
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6472] max-w-md mx-auto leading-relaxed">
              Your brief has been formatted for Lead Strategic Advisor Niraj Kumar and our consulting desk. If your WhatsApp chat did not open automatically, please click below or call us directly.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F6F3] border border-[#E2E8F0] text-left max-w-lg mx-auto text-xs text-[#5A6472] whitespace-pre-wrap font-mono">
            {generateBriefText()}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={handleSendViaWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Launch WhatsApp Chat</span>
            </button>

            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#C9A24B]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
          </div>

          <p className="text-[11px] text-[#8C96A5]">
            The consultant will review your parameters directly and guide next steps.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Entity & Contact */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3">
                <h3 className="text-lg font-bold text-[#1B2838]">
                  Entity Coordinates &amp; Contact Details
                </h3>
                <p className="text-xs text-[#5A6472]">
                  Who should our advisory desk coordinate with regarding this consultation?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    placeholder="e.g. Ramesh Verma"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Business / Entity Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    placeholder="e.g. Apex Retail Pvt Ltd"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">City / Headquarters *</label>
                  <input
                    type="text"
                    required
                    value={formData.locationCity}
                    onChange={(e) =>
                      setFormData({ ...formData, locationCity: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    placeholder="e.g. Noida / Mumbai / Bengaluru"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile & Stage */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3">
                <h3 className="text-lg font-bold text-[#1B2838]">
                  Business Stage &amp; Industry Classification
                </h3>
                <p className="text-xs text-[#5A6472]">
                  Helps our research specialists benchmark relevant sector dynamics.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="font-semibold text-[#1B2838]">Business Operating Stage *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "idea", label: "Idea / Pre-Launch", desc: "Concept validation & business modeling" },
                      { id: "early", label: "Early-Stage Startup", desc: "Initial launch & GTM sequencing" },
                      { id: "operating", label: "Operating MSME / Company", desc: "Expanding existing commercial operations" },
                    ].map((stage) => (
                      <div
                        key={stage.id}
                        onClick={() => setFormData({ ...formData, businessStage: stage.id })}
                        className={`p-3.5 rounded border cursor-pointer transition-colors ${
                          formData.businessStage === stage.id
                            ? "border-[#1B2838] bg-[#F7F6F3]"
                            : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                        }`}
                      >
                        <p className="font-bold text-[#1B2838]">{stage.label}</p>
                        <p className="text-[11px] text-[#5A6472] mt-0.5">{stage.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Industry Classification *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] bg-white"
                  >
                    <option value="Retail & Consumer Goods">Retail &amp; Consumer Goods</option>
                    <option value="Manufacturing & Industrial">Manufacturing &amp; Industrial</option>
                    <option value="D2C & E-Commerce">D2C &amp; E-Commerce</option>
                    <option value="B2B Services & SaaS">B2B Services &amp; SaaS</option>
                    <option value="F&B & Hospitality">F&amp;B &amp; Hospitality</option>
                    <option value="Healthcare & Wellness">Healthcare &amp; Wellness</option>
                    <option value="Logistics & Supply Chain">Logistics &amp; Supply Chain</option>
                    <option value="Other">Other Enterprise Sector</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Service Selection & Dynamic Diagnostic Branch */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3">
                <h3 className="text-lg font-bold text-[#1B2838]">
                  Select Practice Area &amp; Key Focus
                </h3>
                <p className="text-xs text-[#5A6472]">
                  Select the practice area where you need advisory guidance.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Consulting Service Requested *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "GTM_STRATEGY", label: "Go-to-Market (GTM) Strategy" },
                      { id: "MARKET_RESEARCH", label: "Market Research & Intelligence" },
                      { id: "BUSINESS_EXPANSION_STRATEGY", label: "Business Expansion Strategy" },
                      { id: "NEW_BUSINESS_START_CONSULTATION", label: "New Business Start Consultation" },
                    ].map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            serviceRequested: svc.id as ServiceType,
                          })
                        }
                        className={`p-3 rounded border cursor-pointer font-bold transition-colors ${
                          formData.serviceRequested === svc.id
                            ? "border-[#1B2838] bg-[#F7F6F3] text-[#1B2838]"
                            : "border-[#E2E8F0] text-[#5A6472] hover:border-[#CBD5E1]"
                        }`}
                      >
                        {svc.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <h4 className="font-bold text-[#1B2838]">
                    Diagnostic Questions for {activeBranch.title}:
                  </h4>
                  {activeBranch.questions.slice(0, 3).map((q) => (
                    <div key={q.id} className="space-y-1.5">
                      <label className="font-semibold text-[#1B2838]">
                        {q.label} {q.required && "*"}
                      </label>
                      <input
                        type="text"
                        value={formData.serviceDetails[q.id] || ""}
                        onChange={(e) => handleBranchAnswerChange(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Strategic Goals & Direct Enquiry */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3">
                <h3 className="text-lg font-bold text-[#1B2838]">
                  Primary Goals &amp; Strategic Challenges
                </h3>
                <p className="text-xs text-[#5A6472]">
                  Summarize your main priorities to complete your pre-consultation brief.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">
                    What is your primary commercial goal over the next 3–6 months? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.primaryGoals}
                    onChange={(e) => setFormData({ ...formData, primaryGoals: e.target.value })}
                    placeholder="e.g., Successfully launch in 3 northern cities, achieve product-market fit, establish retail distributor network..."
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">
                    What is the biggest operational or market challenge you currently face? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.keyChallenges}
                    onChange={(e) => setFormData({ ...formData, keyChallenges: e.target.value })}
                    placeholder="e.g., Unclear customer willingness to pay, competitor price pressure, supply chain bottlenecks..."
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                  />
                </div>

                <div className="p-3.5 rounded bg-[#F7EED9] border border-[#E3D1A5] text-[#8C6A1E] space-y-1">
                  <strong className="block font-semibold">Direct Communication Standard:</strong>
                  <p>
                    Clicking below will format your brief and open WhatsApp directly with our advisory desk. Customers enquire directly by phone or WhatsApp, and the consultant takes it from there.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="pt-6 border-t border-[#E2E8F0] flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(s - 1, 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded border border-[#E2E8F0] text-xs font-semibold text-[#5A6472] hover:bg-[#F7F6F3]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(s + 1, 4))}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] text-xs font-bold uppercase tracking-wider"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="inline-flex items-center gap-2 px-7 py-3 rounded bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enquire via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
