"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { SISTER_SITES } from "@/lib/constants/ecosystem";
import { MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated submission / API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          Official Advisory Coordinates
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Contact DOW Consulting
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Reach Niraj Kumar&apos;s executive advisory desk directly. Consultations are conducted globally via WhatsApp Call and Google Meet, or in person by scheduled appointment at our Noida headquarters.
        </p>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] shadow-md space-y-6">
              <h3 className="text-xl font-bold border-b border-[#2A3D54] pb-4">
                Executive Desk Contact
              </h3>

              <div className="space-y-5 text-xs text-[#E2E8F0]">
                {/* Physical Office Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Headquarters Office:</strong>
                    <p className="text-[#8C96A5] leading-relaxed">
                      {BRAND.contact.address.unit}<br />
                      {BRAND.contact.address.complex}<br />
                      {BRAND.contact.address.sector}, {BRAND.contact.address.city}<br />
                      {BRAND.contact.address.state} — {BRAND.contact.address.pincode}, {BRAND.contact.address.country}
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <MessageSquare className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Direct Advisory WhatsApp:</strong>
                    <p className="text-[#8C96A5]">
                      Primary executive messaging channel for fast coordination:
                    </p>
                    <a
                      href={BRAND.contact.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#C9A24B] font-bold text-sm hover:underline pt-0.5"
                    >
                      {BRAND.contact.whatsapp.display}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-sm text-[#F7F6F3]">Desk Operating Window:</strong>
                    <p className="text-[#8C96A5]">
                      Monday – Saturday: 10:00 AM – 7:00 PM IST<br />
                      Consultations scheduled by prior appointment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A3D54] text-[11px] text-[#8C96A5] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>All corporate and client disclosures are strictly confidential.</span>
              </div>
            </div>

            {/* Cross-Promotion note */}
            <div className="p-6 bg-[#FFFFFF] rounded border border-[#E2E8F0] space-y-2 text-xs">
              <strong className="text-[#1B2838]">Part of the Niraj Kumar Advisory Ecosystem:</strong>
              <p className="text-[#5A6472]">
                Clients with personal Vedic astrological inquiries or Vastu consultation may connect with our sister practice at{" "}
                <a href={SISTER_SITES.aapkaAstro.url} target="_blank" rel="noopener noreferrer" className="text-[#1B2838] underline font-semibold">
                  {SISTER_SITES.aapkaAstro.name}
                </a>{" "}
                (Vedic astrology consultations, residential and commercial Vastu), or explore self-paced astrology courses at{" "}
                <a href={SISTER_SITES.viar.url} target="_blank" rel="noopener noreferrer" className="text-[#1B2838] underline font-semibold">
                  {SISTER_SITES.viar.name}
                </a>{" "}
                (Vihangam Institute of Astrology and Research).
              </p>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-lg border border-[#E2E8F0] shadow-sm">
              <h3 className="text-2xl font-bold text-[#1B2838] mb-2">
                Send an Executive Inquiry
              </h3>
              <p className="text-xs text-[#5A6472] mb-8">
                For detailed project intake, please use our dedicated <a href="/intake" className="text-[#1B2838] underline font-semibold">Intake Assessment Form</a>. Use this form for initial questions, custom corporate inquiries, or media queries.
              </p>

              {submitted ? (
                <div className="bg-[#F7EED9] border border-[#E3D1A5] p-8 rounded text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#8C6A1E] mx-auto" />
                  <h4 className="text-lg font-bold text-[#1B2838]">Inquiry Received</h4>
                  <p className="text-xs text-[#5A6472] max-w-md mx-auto">
                    Thank you, {formData.name}. Our executive advisory desk will review your message and reply via WhatsApp or email within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
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
                        placeholder="e.g. Apex Logistics Pvt Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1B2838]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                        placeholder="ramesh@company.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1B2838]">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1B2838]">Inquiry Details *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                      placeholder="Please summarize your commercial requirements, location, or questions regarding our advisory formats..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C9A24B]" />
                    <span>{loading ? "Sending..." : "Submit Inquiry to Advisory Desk"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
