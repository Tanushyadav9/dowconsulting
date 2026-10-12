"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { HEADER_NAV_LINKS } from "@/lib/constants/navigation";
import { MessageSquare, Menu, X, Phone, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1B2838] border-b border-[#2A3D54]/50 text-[#F7F6F3]">
      {/* Top Advisory Bar */}
      <div className="bg-[#111B27] py-2 px-4 text-xs border-b border-[#2A3D54]/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Consultant Identity & Descriptor Line from Business Card */}
          <div className="flex items-center gap-2 text-[#8C96A5] text-center md:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A24B] shrink-0"></span>
            <span>
              {BRAND.consultant.name} &mdash; <strong className="text-[#F7F6F3]">{BRAND.consultant.title}</strong>{" "}
              <span className="hidden sm:inline text-[#C9A24B]">({BRAND.consultant.descriptor})</span>
            </span>
          </div>

          {/* Direct Contact Coordinates */}
          <div className="flex items-center gap-4 text-[#8C96A5]">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="flex items-center gap-1.5 text-[#E2E8F0] hover:text-[#C9A24B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#C9A24B] hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden xl:inline text-slate-600">|</span>
            <span className="hidden xl:inline text-[#8C96A5]">Sector 75, Noida</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Identity */}
          <Link href="/" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#F7F6F3] group-hover:text-[#C9A24B] transition-colors">
                DOW <span className="font-light text-[#C9A24B]">CONSULTING</span>
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-[#8C96A5] font-medium">
              GTM Strategy, Distribution &amp; Brand Building
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#E2E8F0] hover:text-[#C9A24B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Direct Enquiry Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="flex items-center gap-1.5 text-xs text-[#E2E8F0] hover:text-[#F7F6F3] transition-colors px-3 py-2 rounded border border-[#2A3D54] bg-[#111B27]"
              title="Call Consultant"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>{ENQUIRY_CONFIG.phone.display}</span>
            </a>

            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-4 py-2 rounded text-xs font-bold tracking-wide transition-all shadow-sm"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-4 py-2 rounded text-xs font-bold tracking-wide uppercase transition-all shadow-sm"
            >
              <span>Enquire</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#E2E8F0] hover:text-[#F7F6F3] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111B27] border-b border-[#2A3D54] px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#E2E8F0] hover:text-[#C9A24B] py-2 px-3 rounded hover:bg-[#1B2838] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#2A3D54] space-y-2.5">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="w-full flex items-center justify-center gap-2 bg-[#1B2838] border border-[#2A3D54] text-[#F7F6F3] py-2.5 rounded text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-[#C9A24B]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>

            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-[#FFFFFF] py-2.5 rounded text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
