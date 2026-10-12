"use client";

import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { Phone, MessageSquare, ArrowUpRight } from "lucide-react";

export function FloatingEnquiryWidget() {
  return (
    <>
      {/* Desktop Floating Pill: Bottom-Right */}
      <aside
        aria-label="Direct Consultant Enquiry"
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 p-1.5 bg-[#1B2838] border border-[#2A3D54] rounded-full shadow-2xl backdrop-blur-sm"
      >
        {/* Direct Call Button */}
        <a
          href={ENQUIRY_CONFIG.phone.telLink}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111B27] hover:bg-[#2A3D54] text-[#F7F6F3] text-xs font-semibold transition-all group border border-[#2A3D54]"
          title="Direct Phone Call with Advisory Desk"
        >
          <div className="w-6 h-6 rounded-full bg-[#C9A24B] text-[#1B2838] flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] text-xs font-bold transition-all shadow-md group"
          title="Enquire directly on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp Us</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </aside>

      {/* Mobile Sticky Bottom Bar */}
      <nav
        aria-label="Mobile Quick Enquiry"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111B27] border-t border-[#2A3D54] p-3 shadow-2xl flex items-center gap-3"
      >
        <a
          href={ENQUIRY_CONFIG.phone.telLink}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] text-xs font-bold text-center"
        >
          <Phone className="w-4 h-4 text-[#C9A24B]" />
          <span>Call Consultant</span>
        </a>

        <a
          href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#25D366] text-[#FFFFFF] text-xs font-bold text-center shadow-sm"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
