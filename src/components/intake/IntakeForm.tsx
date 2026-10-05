"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CONSULTING_PACKAGES } from "@/lib/constants/packages";
import { BRAND } from "@/lib/constants/brand";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  Compass,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  Send,
} from "lucide-react";

export function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get("package") || "";
  const isCustomQuoteMode = searchParams.get("mode") === "custom-quote";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Contact
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessName: "",

    // Step 2: Profile & Stage
    businessType: "RETAIL", // RETAIL, MANUFACTURING, TECH_SAAS, SERVICES, HOSPITALITY, REAL_ESTATE, OTHER
    businessStage: "EARLY_TRACTION", // IDEA_STAGE, EARLY_TRACTION, EXPANDING_SCALING, MATURE_ENTERPRISE, TURNAROUND
    teamSize: "1-10",

    // Step 3: Premises & Spatial Alignment
    locationCity: "",
    locationCountry: "India",
    premisesStatus: "LEASED", // OWNED, LEASED, SEARCHING, VIRTUAL
    floorAreaSqFt: "1000 - 3000 sq.ft.",
    floorPlanAvailable: "YES", // YES, NO, SKETCH

    // Step 4: Strategic Goals & Challenges
    currentTimeline: "NEXT_30_DAYS", // IMMEDIATE, NEXT_30_DAYS, NEXT_QUARTER, EXPLORATORY
    primaryGoals: "",
    keyChallenges: "",
    budgetRange: "₹25,000 - ₹50,000",

    // Step 5: Session Logistics & Packaging
    selectedPackage: preselectedPackage || "commercial-vastu-growth",
    preferredChannel: "WHATSAPP_CALL", // WHATSAPP_CALL, GOOGLE_MEET
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit intake");
      }

      // If user selected a direct package and not in pure custom quote mode, proceed to checkout
      if (formData.selectedPackage && !isCustomQuoteMode) {
        router.push(`/checkout?submissionId=${data.id}&package=${formData.selectedPackage}`);
      } else {
        router.push(`/account?submissionId=${data.id}&status=submitted`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while submitting your intake. Please try again.");
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
          <span className="text-[#C9A24B] uppercase tracking-wider">
            {step === 1 && "Executive Contact Details"}
            {step === 2 && "Business Profile & Stage"}
            {step === 3 && "Commercial Premises & Spatial Data"}
            {step === 4 && "Timing, Goals & Strategic Bottlenecks"}
            {step === 5 && "Advisory Format & Package Selection"}
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

      <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {/* STEP 1: CONTACT DETAILS */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#1B2838]">Executive Contact Details</h3>
            <p className="text-xs text-[#5A6472]">
              All details submitted to {BRAND.name} are held under strict commercial non-disclosure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Business / Enterprise Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Apex Industrial Solutions"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="vikram@apexsolutions.com"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
                <span className="text-[10px] text-[#8C96A5]">We use this for session scheduling &amp; report delivery.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BUSINESS PROFILE & STAGE */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#1B2838]">Business Profile &amp; Operating Stage</h3>
            <p className="text-xs text-[#5A6472]">
              Helps Niraj Kumar calibrate corporate scale and market dynamics.
            </p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Industry &amp; Operating Sector *</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="RETAIL">Retail &amp; QSR Chain / Showroom</option>
                  <option value="MANUFACTURING">Manufacturing, Industrial &amp; MSME</option>
                  <option value="TECH_SAAS">Technology, SaaS &amp; Digital Ventures</option>
                  <option value="SERVICES">Corporate Professional Services / B2B</option>
                  <option value="HOSPITALITY">Hospitality, Hotels &amp; Healthcare</option>
                  <option value="REAL_ESTATE">Real Estate Development &amp; Commercial Infrastructure</option>
                  <option value="OTHER">Other Enterprise Sector</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Current Business Stage *</label>
                <select
                  value={formData.businessStage}
                  onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="IDEA_STAGE">Idea Stage / Pre-Incorporation / Site Selection</option>
                  <option value="EARLY_TRACTION">Early Traction / Initial Facility Operating</option>
                  <option value="EXPANDING_SCALING">Expanding / Opening Additional Locations / Scaling Capex</option>
                  <option value="MATURE_ENTERPRISE">Established Enterprise / Corporate Restructuring</option>
                  <option value="TURNAROUND">Operational Stagnation / Turnaround Required</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Current Workforce / Team Size</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="1-5">1 – 5 personnel (Founders &amp; Core Staff)</option>
                  <option value="6-25">6 – 25 personnel (Growing Office / Facility)</option>
                  <option value="26-100">26 – 100 personnel (Mid-sized Corporate)</option>
                  <option value="100+">100+ personnel (Enterprise / Multi-Facility)</option>
                </select>
              </div>

              {/* DYNAMIC BRANCH: RETAIL & QSR SPECIFIC */}
              {formData.businessType === "RETAIL" && (
                <div className="p-4 rounded border border-[#C9A24B]/40 bg-[#F7EED9]/30 space-y-3 mt-3">
                  <div className="flex items-center gap-1.5 text-[#8C6A1E] font-bold text-xs uppercase tracking-wide">
                    <span>Retail &amp; Storefront Specific Diagnostics</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">Store Format</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>High-Street Commercial Market Showroom</option>
                        <option>Enclosed Premium Mall Store</option>
                        <option>Standalone Flagship Commercial Property</option>
                        <option>QSR Cloud Kitchen / Delivery Hub</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">Billing Counter / POS Location</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>Near Main Entrance (Left)</option>
                        <option>Near Main Entrance (Right)</option>
                        <option>Central Island Counter</option>
                        <option>Deep In Store / Back Quadrant</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC BRANCH: MANUFACTURING & INDUSTRIAL MSME */}
              {formData.businessType === "MANUFACTURING" && (
                <div className="p-4 rounded border border-[#1B2838]/30 bg-[#F7F6F3] space-y-3 mt-3">
                  <div className="flex items-center gap-1.5 text-[#1B2838] font-bold text-xs uppercase tracking-wide">
                    <span>Industrial Plant &amp; MSME Diagnostics</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">Heavy Machinery &amp; Generator Zone</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>South / South-West Heavy Load Zone</option>
                        <option>North / North-East Light Quadrant</option>
                        <option>Distributed across entire floor</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">MD / Administrative Seating</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>Mezzanine overlooking shop floor</option>
                        <option>Separate front commercial block</option>
                        <option>Adjacent to dispatch dock</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC BRANCH: TECH & SAAS VENTURES */}
              {formData.businessType === "TECH_SAAS" && (
                <div className="p-4 rounded border border-blue-200 bg-blue-50/40 space-y-3 mt-3">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wide">
                    <span>Tech Startup &amp; Capital Inflection Diagnostics</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">Target Inflection Milestone</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>Institutional Series A/B Term Sheet Closure</option>
                        <option>Major Product Version Launch / Scale</option>
                        <option>Enterprise B2B Pilot Conversion</option>
                        <option>Co-Founder Equity &amp; Alignment Restructuring</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-[#1B2838] block mb-1">Lead Strategist Seating Orientation</label>
                      <select className="w-full px-3 py-2 rounded border border-[#E2E8F0] bg-white text-xs">
                        <option>Facing North (Wealth &amp; Opportunity)</option>
                        <option>Facing East (Clarity &amp; Execution)</option>
                        <option>Facing West or South</option>
                        <option>Open Desk / Hot-desking</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC STAGE-SPECIFIC BRANCH */}
              {formData.businessStage === "IDEA_STAGE" && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 mt-2">
                  <strong className="block text-[11px] uppercase tracking-wide">Pre-Lease Site Comparison:</strong>
                  <p className="text-[11px] mt-0.5">
                    Niraj Kumar can compare 2 to 3 candidate properties before you sign a binding 3-to-5 year commercial lease to prevent structural lock-in mistakes.
                  </p>
                </div>
              )}

              {formData.businessStage === "TURNAROUND" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-900 mt-2">
                  <strong className="block text-[11px] uppercase tracking-wide">Stagnation / Remedial Audit:</strong>
                  <p className="text-[11px] mt-0.5">
                    We focus on non-demolition commercial remedies that unblock cash collection delays and restore executive stability immediately.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: PREMISES & SPATIAL DATA */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#1B2838]">Commercial Premises &amp; Spatial Alignment</h3>
            <p className="text-xs text-[#5A6472]">
              Commercial Vastu evaluates physical geometry, entry orientations, and leadership zones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">City / Commercial Region *</label>
                <input
                  type="text"
                  required
                  value={formData.locationCity}
                  onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                  placeholder="e.g. Noida, Delhi NCR, Mumbai, Bengaluru"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
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

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Premises Tenure Status *</label>
                <select
                  value={formData.premisesStatus}
                  onChange={(e) => setFormData({ ...formData, premisesStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="LEASED">Commercial Lease / Rented</option>
                  <option value="OWNED">Self-Owned Commercial Property</option>
                  <option value="SEARCHING">Currently Searching / Evaluating Multiple Sites</option>
                  <option value="VIRTUAL">Remote / Co-working Setup</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Approximate Floor Area</label>
                <select
                  value={formData.floorAreaSqFt}
                  onChange={(e) => setFormData({ ...formData, floorAreaSqFt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="Under 1000 sq.ft.">Under 1,000 sq.ft.</option>
                  <option value="1000 - 3000 sq.ft.">1,000 – 3,000 sq.ft.</option>
                  <option value="3000 - 10000 sq.ft.">3,000 – 10,000 sq.ft.</option>
                  <option value="10000+ sq.ft.">10,000+ sq.ft. / Industrial Shed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#1B2838]">Do you have an existing floor layout drawing / sketch?</label>
              <div className="flex gap-4">
                {["YES", "NO", "SKETCH"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="floorPlanAvailable"
                      value={opt}
                      checked={formData.floorPlanAvailable === opt}
                      onChange={() => setFormData({ ...formData, floorPlanAvailable: opt })}
                      className="text-[#1B2838]"
                    />
                    <span>{opt === "YES" ? "Yes, CAD/PDF layout available" : opt === "SKETCH" ? "Rough sketch available" : "No, need assistance"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: TIMING & STRATEGIC CHALLENGES */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#1B2838]">Timing, Goals &amp; Strategic Bottlenecks</h3>
            <p className="text-xs text-[#5A6472]">
              Every consultation pairs spatial layout with executive timing windows.
            </p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Target Milestone Timeline *</label>
                <select
                  value={formData.currentTimeline}
                  onChange={(e) => setFormData({ ...formData, currentTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                >
                  <option value="IMMEDIATE">Urgent: Within next 7 – 14 days (Upcoming lease / contract / launch)</option>
                  <option value="NEXT_30_DAYS">Near Term: Next 30 – 45 days</option>
                  <option value="NEXT_QUARTER">Quarterly Planning: Next 3 – 6 months</option>
                  <option value="EXPLORATORY">Exploratory / Strategic Alignment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Primary Strategic Goals *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.primaryGoals}
                  onChange={(e) => setFormData({ ...formData, primaryGoals: e.target.value })}
                  placeholder="e.g. Ensure new retail outlet reaches profitability quickly; optimize founder cabin for clear decision making; schedule launch date for expansion."
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1B2838]">Key Current Operational Challenges / Stagnation *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.keyChallenges}
                  onChange={(e) => setFormData({ ...formData, keyChallenges: e.target.value })}
                  placeholder="e.g. Persistent cash flow delay despite sales growth; frequent team friction in new cabin layout; hesitation closing high-value contracts."
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PACKAGE & SESSION LOGISTICS */}
        {step === 5 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#1B2838]">Advisory Format &amp; Package Selection</h3>
            <p className="text-xs text-[#5A6472]">
              Select a starting package for self-serve confirmation, or submit for custom quote review.
            </p>

            {/* Package selector */}
            <div className="space-y-3">
              <label className="font-semibold text-xs text-[#1B2838]">Select Desired Advisory Tier:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CONSULTING_PACKAGES.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`p-4 rounded border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.selectedPackage === pkg.id
                        ? "border-[#1B2838] bg-[#F7F6F3] shadow-sm"
                        : "border-[#E2E8F0] hover:border-[#1B2838]/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="selectedPackage"
                          value={pkg.id}
                          checked={formData.selectedPackage === pkg.id}
                          onChange={() => setFormData({ ...formData, selectedPackage: pkg.id })}
                        />
                        <span className="font-bold text-xs text-[#1B2838]">{pkg.name}</span>
                      </div>
                      <p className="text-[11px] text-[#5A6472] mt-1 line-clamp-2">{pkg.subtitle}</p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-[#E2E8F0] font-bold text-xs text-[#1B2838]">
                      ₹{pkg.priceINR.toLocaleString("en-IN")}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery channel preference */}
            <div className="space-y-2 pt-2">
              <label className="font-semibold text-xs text-[#1B2838]">
                Preferred Live Strategy Session Channel:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="p-3.5 rounded border border-[#E2E8F0] flex items-center gap-3 cursor-pointer bg-[#FFFFFF]">
                  <input
                    type="radio"
                    name="preferredChannel"
                    value="WHATSAPP_CALL"
                    checked={formData.preferredChannel === "WHATSAPP_CALL"}
                    onChange={() => setFormData({ ...formData, preferredChannel: "WHATSAPP_CALL" })}
                  />
                  <div>
                    <strong className="text-[#1B2838]">WhatsApp Direct Call</strong>
                    <p className="text-[11px] text-[#5A6472]">Direct call to {BRAND.contact.whatsapp.display}</p>
                  </div>
                </label>

                <label className="p-3.5 rounded border border-[#E2E8F0] flex items-center gap-3 cursor-pointer bg-[#FFFFFF]">
                  <input
                    type="radio"
                    name="preferredChannel"
                    value="GOOGLE_MEET"
                    checked={formData.preferredChannel === "GOOGLE_MEET"}
                    onChange={() => setFormData({ ...formData, preferredChannel: "GOOGLE_MEET" })}
                  />
                  <div>
                    <strong className="text-[#1B2838]">Google Meet Video Session</strong>
                    <p className="text-[11px] text-[#5A6472]">Calendar invite with screen sharing for floor plans</p>
                  </div>
                </label>
              </div>
              <p className="text-[10px] text-[#8C96A5]">
                Note: In-app calling tools are not used. Consultations are delivered via Google Meet or WhatsApp call to guarantee reliable quality.
              </p>
            </div>
          </div>
        )}

        {/* Form Navigation Buttons */}
        <div className="pt-8 mt-8 border-t border-[#E2E8F0] flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-semibold text-[#5A6472] hover:text-[#1B2838] border border-[#E2E8F0] hover:bg-[#F7F6F3]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#F7F6F3] bg-[#1B2838] hover:bg-[#2A3D54] transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#1B2838] bg-[#C9A24B] hover:bg-[#B8913B] transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : isCustomQuoteMode ? "Submit for Custom Quote" : "Confirm & Proceed to Checkout"}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
