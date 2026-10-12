"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Video,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    city: "",
    serviceRequested: "Go-to-Market Strategy & Distribution",
    consultationMode: "Online (Google Meet / Zoom)",
    message: "",
  });

  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `Hello Niraj Kumar / DOW Consulting,
My name is ${formData.name || "[Not specified]"} from ${formData.businessName || "[Not specified]"} (${formData.city || "India"}).
I am enquiring about ${formData.serviceRequested} advisory services.
Preferred Mode: ${formData.consultationMode}.
Details: ${formData.message || "I would like to discuss our business requirements and explore an advisory engagement."}`;

    window.open(ENQUIRY_CONFIG.buildWhatsAppUrl(formattedMessage), "_blank");
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          Direct Consultant Coordinates
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Contact DOW Consulting
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Reach Consultant <strong>{BRAND.consultant.name}</strong> directly by phone call or WhatsApp to discuss your business requirements.
        </p>
      </section>

      {/* Main Grid: Info + Interactive Quick Enquiry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates */}
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
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
                      Email enquiries directly:
                    </p>
                    <a
                      href={ENQUIRY_CONFIG.email.mailtoLink}
                      className="inline-block text-[#C9A24B] font-semibold text-xs hover:underline pt-0.5"
                    >
                      {ENQUIRY_CONFIG.email.primary}
                    </a>
                  </div>
                </div>

                {/* Head Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#111B27] border border-[#2A3D54] text-[#C9A24B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Head Office:</strong>
                    <p className="text-[#8C96A5] leading-relaxed">
                      {BRAND.headOffice.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Modes Notice */}
              <div className="pt-4 border-t border-[#2A3D54] text-xs text-[#8C96A5] space-y-2">
                <p className="text-[#F7F6F3] font-semibold">Consultation Delivery Modes:</p>
                <div className="flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Online via Google Meet or Zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>In person on request (travel and visiting charges borne by client)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Consultation WhatsApp Brief Builder */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#111B27] px-2.5 py-1 rounded">
                  Effortless Enquiry
                </span>
                <h3 className="text-2xl font-bold text-[#1B2838] mt-2">
                  Send a Direct Enquiry to Niraj Kumar
                </h3>
                <p className="text-xs text-[#5A6472] mt-1 leading-relaxed">
                  Fill in your details below to start a pre-formatted WhatsApp enquiry directly with the consultant, or call directly.
                </p>
              </div>

              <form onSubmit={handleWhatsAppEnquiry} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">Your Full Name *</label>
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
                    <label className="font-semibold text-[#1B2838]">Business / Enterprise Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      placeholder="e.g. Apex Retail Pvt Ltd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">City / Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      placeholder="e.g. Noida / Delhi / Mumbai"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">Consulting Practice Area *</label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] bg-white"
                    >
                      {BRAND.services.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">Preferred Consultation Mode *</label>
                  <select
                    value={formData.consultationMode}
                    onChange={(e) => setFormData({ ...formData, consultationMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838] bg-white"
                  >
                    <option value="Online (Google Meet / Zoom)">Online (Google Meet or Zoom)</option>
                    <option value="In-person on request (Travel/visiting charges borne by client)">
                      In person on request (Travel &amp; visiting charges borne by client)
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#1B2838]">
                    Brief Summary of Requirements or Current Challenges
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                    placeholder="Briefly describe your current business stage, challenges, or what you would like the consultation to address..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>

                  <a
                    href={ENQUIRY_CONFIG.phone.telLink}
                    className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C9A24B]" />
                    <span>Call Consultant Directly</span>
                  </a>
                </div>

                <p className="text-[11px] text-[#8C96A5] text-center pt-2">
                  Prefer email? Contact directly at{" "}
                  <a href={ENQUIRY_CONFIG.email.mailtoLink} className="underline text-[#1B2838]">
                    {ENQUIRY_CONFIG.email.primary}
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
