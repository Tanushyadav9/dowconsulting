"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG } from "@/lib/constants/services";
import { RisingArrowAccent } from "@/components/ui/RisingArrowAccent";
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Video,
  Users,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessStage: "Early-stage start-up",
    whatYouNeed: "Go-to-Market Strategy & Distribution",
    preferredMode: "Online (Google Meet / Zoom)",
  });

  const [copied, setCopied] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=1212-D,+Tower+A,+Spectrum+@Metro+Phase+1,+Sector+75,+Noida,+Uttar+Pradesh";

  const buildMessageString = () => {
    return (
      `Hello Niraj Kumar / DOW Consulting,\n\n` +
      `I would like to enquire about business consulting advisory.\n` +
      `- Name: ${formData.name || "[Not specified]"}\n` +
      `- Phone: ${formData.phone || "[Not specified]"}\n` +
      `- Business Stage: ${formData.businessStage}\n` +
      `- What I Need: ${formData.whatYouNeed}\n` +
      `- Preferred Mode: ${formData.preferredMode}\n\n` +
      `Please let me know how we can proceed.`
    );
  };

  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    const message = buildMessageString();
    window.open(ENQUIRY_CONFIG.buildWhatsAppUrl(message), "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(buildMessageString());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const mailtoUrl = `mailto:${ENQUIRY_CONFIG.email.primary}?subject=${encodeURIComponent(
    `Consulting Enquiry: ${formData.whatYouNeed} - ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(buildMessageString())}`;

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-semibold tracking-wider uppercase">
          <RisingArrowAccent size={14} color="#E02027" />
          <span>Direct Advisory Coordinates</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#17477F] tracking-tight font-heading">
          Contact DOW Consulting
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Enquire directly with Consultant <strong>{BRAND.consultant.name}</strong> by phone call or WhatsApp to discuss your business requirements.
        </p>
      </section>

      {/* Main Grid: Details + Quick Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Consultation Modes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1B33] text-white p-8 rounded-2xl border border-[#1E3A63] shadow-xl space-y-6">
              <h3 className="text-xl font-bold border-b border-[#1E3A63] pb-4 font-heading">
                Consultant Coordinates
              </h3>

              <div className="space-y-6 text-xs text-slate-300">
                {/* Direct Phone Call */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17477F] border border-[#235B9E] text-[#E02027] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-white font-heading">Direct Phone Call:</strong>
                    <p className="text-slate-300">
                      Direct phone line to Consultant Niraj Kumar:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.phone.telLink}
                      className="inline-block text-[#E02027] font-bold text-sm hover:underline pt-0.5"
                    >
                      {ENQUIRY_CONFIG.phone.display}
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366] text-[#FFFFFF] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-white font-heading">Direct WhatsApp:</strong>
                    <p className="text-slate-300">
                      Fastest channel for exploratory discussions and enquiries:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#25D366] font-bold text-sm hover:underline pt-0.5"
                    >
                      <span>{ENQUIRY_CONFIG.whatsapp.display}</span>
                    </a>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17477F] border border-[#235B9E] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-white font-heading">Direct Email:</strong>
                    <p className="text-slate-300">
                      Official communication address:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.email.mailtoLink}
                      className="inline-block text-slate-200 font-semibold text-xs hover:text-white hover:underline pt-0.5"
                    >
                      {ENQUIRY_CONFIG.email.primary}
                    </a>
                  </div>
                </div>

                {/* Head Office Address with Google Maps link */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17477F] border border-[#235B9E] text-[#E02027] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-sm text-white font-heading">Head Office Address:</strong>
                    <p className="text-slate-300 leading-relaxed">
                      {BRAND.headOffice.address}
                    </p>
                    <div className="pt-1">
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#E02027] hover:underline font-semibold text-xs"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation-Mode Details */}
              <div className="pt-6 border-t border-[#1E3A63] space-y-3 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-heading">
                  Consultation Modes
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-white">Online:</strong> Conducted remotely via Google Meet or Zoom.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <p>
                        <strong className="text-white">In Person:</strong> Available on request.
                      </p>
                      <p className="text-[11px] text-amber-300 mt-1 italic">
                        For in-person meetings, travel and visiting charges are borne by the client and are communicated at the time of enquiry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#17477F] px-2.5 py-1 rounded">
                  Quick Enquiry
                </span>
                <h3 className="text-2xl font-bold text-[#17477F] mt-2 font-heading">
                  Send a Direct Enquiry
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Fill in your details below. Submitting opens WhatsApp with a pre-filled message directly to Niraj Kumar, with a mailto alternative.
                </p>
              </div>

              <form onSubmit={handleWhatsAppEnquiry} className="space-y-5 text-xs">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-800">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#17477F] text-slate-900"
                      placeholder="e.g. Ramesh Verma"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-800">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#17477F] text-slate-900"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                {/* Business Stage */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Business Stage *</label>
                  <select
                    value={formData.businessStage}
                    onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#17477F] bg-white text-slate-900"
                  >
                    <option value="Idea / Pre-launch stage">Idea / Pre-launch stage</option>
                    <option value="Early-stage start-up">Early-stage start-up</option>
                    <option value="Operating small company">Operating small company</option>
                    <option value="Established MSME">Established MSME</option>
                  </select>
                </div>

                {/* What you need */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">What You Need *</label>
                  <select
                    value={formData.whatYouNeed}
                    onChange={(e) => setFormData({ ...formData, whatYouNeed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#17477F] bg-white text-slate-900"
                  >
                    {SERVICES_CATALOG.map((srv) => (
                      <option key={srv.slug} value={srv.name}>
                        {srv.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Mode */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Preferred Consultation Mode *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.preferredMode.startsWith("Online")
                          ? "border-[#17477F] bg-[#F8FAFC]"
                          : "border-[#CBD5E1]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredMode"
                        value="Online (Google Meet / Zoom)"
                        checked={formData.preferredMode.startsWith("Online")}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredMode: e.target.value })
                        }
                        className="text-[#17477F]"
                      />
                      <span className="text-slate-800 font-medium">Online (Meet / Zoom)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.preferredMode.startsWith("In person")
                          ? "border-[#17477F] bg-[#F8FAFC]"
                          : "border-[#CBD5E1]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredMode"
                        value="In person on request (travel charges borne by client)"
                        checked={formData.preferredMode.startsWith("In person")}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredMode: e.target.value })
                        }
                        className="text-[#17477F]"
                      />
                      <span className="text-slate-800 font-medium">In person on request</span>
                    </label>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 bg-[#17477F] hover:bg-[#0B1B33] text-white py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#E02027]" />
                    <span>Send via Email</span>
                  </a>
                </div>

                {/* Clear Fallback if WhatsApp does not open */}
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#17477F]">
                    <AlertCircle className="w-4 h-4 text-[#E02027]" />
                    <span>Fallback Options (If WhatsApp Does Not Open)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    If WhatsApp does not launch automatically on your device, you can copy the pre-formatted enquiry text or call us directly:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#17477F] hover:bg-slate-50 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#E02027]" />}
                      <span>{copied ? "Message Copied!" : "Copy Enquiry Message"}</span>
                    </button>

                    <a
                      href={ENQUIRY_CONFIG.phone.telLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#17477F] hover:bg-slate-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E02027]" />
                      <span>Call {ENQUIRY_CONFIG.phone.display}</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
