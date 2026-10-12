"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { HEADER_NAV_LINKS } from "@/lib/constants/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MessageSquare, Menu, X, Phone, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-sm">
      {/* Top Advisory Bar in Deep Navy */}
      <div className="bg-[#0B1B33] py-2 px-4 text-xs border-b border-[#1E3A63] text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Consultant Identity & Descriptor Line from Business Card */}
          <div className="flex items-center gap-2 text-slate-300 text-center md:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E02027] shrink-0"></span>
            <span>
              {BRAND.consultant.name} &mdash; <strong className="text-white">{BRAND.consultant.title}</strong>{" "}
              <span className="hidden sm:inline text-slate-300 font-medium">({BRAND.consultant.descriptor})</span>
            </span>
          </div>

          {/* Direct Contact Coordinates */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="flex items-center gap-1.5 text-white hover:text-[#E02027] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E02027]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:underline font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden xl:inline text-slate-600">|</span>
            <span className="hidden xl:inline text-slate-400">Sector 75, Noida</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Brand typography and rising arrow */}
          <Link href="/" className="flex items-center group py-2" aria-label="DOW Consulting Home">
            <BrandLogo variant="light" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#17477F] hover:text-[#E02027] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Direct Enquiry Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="flex items-center gap-1.5 text-xs text-[#17477F] hover:text-[#0B1B33] transition-colors px-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC]"
              title="Call Consultant"
            >
              <Phone className="w-3.5 h-3.5 text-[#17477F]" />
              <span className="font-medium">{ENQUIRY_CONFIG.phone.display}</span>
            </a>

            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-3.5 py-2 rounded text-xs font-bold tracking-wide transition-all shadow-sm"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#E02027] hover:bg-[#C7181F] text-white px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow"
            >
              <span>Enquire</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#17477F] hover:text-[#E02027] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#E02027]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#17477F]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#17477F] hover:text-[#E02027] py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-2.5">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="w-full flex items-center justify-center gap-2 bg-[#F8FAFC] border border-[#CBD5E1] text-[#17477F] py-2.5 rounded text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-[#17477F]" />
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

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#E02027] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider"
            >
              <span>Enquiry Form</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
