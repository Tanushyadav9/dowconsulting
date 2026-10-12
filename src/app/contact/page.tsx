"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { SERVICES_CATALOG } from "@/lib/constants/services";
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          Direct Advisory Coordinates
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Contact DOW Consulting
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Enquire directly with Consultant <strong>{BRAND.consultant.name}</strong> by phone call or WhatsApp to discuss your business requirements.
        </p>
      </section>

      {/* Main Grid: Details + Quick Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Consultation Modes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-md space-y-6">
              <h3 className="text-xl font-bold border-b border-[#2A3D54] pb-4">
                Consultant Coordinates
              </h3>

              <div className="space-y-6 text-xs text-[#E2E8F0]">
                {/* Direct Phone Call */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#111B27] border border-[#2A3D54] text-[#C9A24B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Direct Phone Call:</strong>
                    <p className="text-[#8C96A5]">
                      Direct phone line to Consultant Niraj Kumar:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.phone.telLink}
                      className="inline-block text-[#C9A24B] font-bold text-sm hover:underline pt-0.5"
                    >
                      {ENQUIRY_CONFIG.phone.display}
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#25D366] text-[#FFFFFF] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Direct WhatsApp:</strong>
                    <p className="text-[#8C96A5]">
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
                  <div className="w-8 h-8 rounded bg-[#111B27] border border-[#2A3D54] text-[#C9A24B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Direct Email:</strong>
                    <p className="text-[#8C96A5]">
                      Official communication address:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.email.mailtoLink}
                      className="inline-block text-[#C9A24B] font-semibold text-xs hover:underline pt-0.5"
                    >
                      {ENQUIRY_CONFIG.email.primary}
                    </a>
                  </div>
                </div>

                {/* Head Office Address with Google Maps link */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#111B27] border border-[#2A3D54] text-[#C9A24B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-sm text-[#F7F6F3]">Head Office Address:</strong>
                    <p className="text-[#8C96A5] leading-relaxed">
                      {BRAND.headOffice.address}
                    </p>
                    <div className="pt-1">
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#C9A24B] hover:underline font-semibold text-xs"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation-Mode Details */}
              <div className="pt-6 border-t border-[#2A3D54] space-y-3 text-xs">
                <h4 className="font-bold text-[#F7F6F3] uppercase tracking-wider text-[11px]">
                  Consultation Modes
                </h4>
                <div className="space-y-2 text-[#8C96A5]">
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-[#E2E8F0]">Online:</strong> Conducted remotely via Google Meet or Zoom.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <p>
                        <strong className="text-[#E2E8F0]">In Person:</strong> Available on request.
                      </p>
                      <p className="text-[11px] text-[#C9A24B] mt-1 italic">
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
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#111B27] px-2.5 py-1 rounded">
                  Quick Enquiry
                </span>
                <h3 className="text-2xl font-bold text-[#1B2838] mt-2">
                  Send a Direct Enquiry
                </h3>
                <p className="text-xs text-[#5A6472] mt-1 leading-relaxed">
                  Fill in your details below. Submitting opens WhatsApp with a pre-filled message directly to Niraj Kumar, with a mailto alternative.
                </p>
              </div>

              <form onSubmit={handleWhatsAppEnquiry} className="space-y-5 text-xs">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      placeholder="e.g. Ramesh Verma"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                {/* Business Stage */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Business Stage *</label>
                  <select
                    value={formData.businessStage}
                    onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] bg-white"
                  >
                    <option value="Idea / Pre-launch stage">Idea / Pre-launch stage</option>
                    <option value="Early-stage start-up">Early-stage start-up</option>
                    <option value="Operating small company">Operating small company</option>
                    <option value="Established MSME">Established MSME</option>
                  </select>
                </div>

                {/* What you need */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">What You Need *</label>
                  <select
                    value={formData.whatYouNeed}
                    onChange={(e) => setFormData({ ...formData, whatYouNeed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] bg-white"
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
                  <label className="font-semibold text-[#1B2838]">Preferred Consultation Mode *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label
                      className={`flex items-center gap-2 p-3 rounded border cursor-pointer transition-colors ${
                        formData.preferredMode.startsWith("Online")
                          ? "border-[#1B2838] bg-[#F7F6F3]"
                          : "border-[#E2E8F0]"
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
                        className="text-[#1B2838]"
                      />
                      <span>Online (Meet / Zoom)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-3 rounded border cursor-pointer transition-colors ${
                        formData.preferredMode.startsWith("In person")
                          ? "border-[#1B2838] bg-[#F7F6F3]"
                          : "border-[#E2E8F0]"
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
                        className="text-[#1B2838]"
                      />
                      <span>In person on request</span>
                    </label>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C9A24B]" />
                    <span>Send via Email</span>
                  </a>
                </div>

                {/* Clear Fallback if WhatsApp does not open */}
                <div className="p-4 rounded-lg bg-[#F7F6F3] border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2838]">
                    <AlertCircle className="w-4 h-4 text-[#C9A24B]" />
                    <span>Fallback Options (If WhatsApp Does Not Open)</span>
                  </div>
                  <p className="text-[11px] text-[#5A6472] leading-relaxed">
                    If WhatsApp does not launch automatically on your device, you can copy the pre-formatted enquiry text or call us directly:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#1B2838] hover:bg-slate-50 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#C9A24B]" />}
                      <span>{copied ? "Message Copied!" : "Copy Enquiry Message"}</span>
                    </button>

                    <a
                      href={ENQUIRY_CONFIG.phone.telLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#1B2838] hover:bg-slate-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
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
