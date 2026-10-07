"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BRAND } from "@/lib/constants/brand";
import { HEADER_NAV_LINKS } from "@/lib/constants/navigation";
import { MessageSquare, Menu, X, ArrowRight, User } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(HEADER_NAV_LINKS);

  useEffect(() => {
    fetch("/api/public/meta")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          const links = [...HEADER_NAV_LINKS];
          if (data.hasPublishedTeam) {
            const aboutIdx = links.findIndex((l) => l.href === "/about");
            links.splice(aboutIdx + 1, 0, { label: "Our Team", href: "/team" });
          }
          if (data.hasPublishedTestimonials) {
            const pkgIdx = links.findIndex((l) => l.href === "/packages");
            links.splice(pkgIdx + 1, 0, { label: "Testimonials", href: "/testimonials" });
          }
          setNavLinks(links);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#1B2838] border-b border-[#2A3D54]/50 text-[#F7F6F3]">
      {/* Top Advisory Notice / WhatsApp Bar */}
      <div className="bg-[#111B27] py-1.5 px-4 text-xs border-b border-[#2A3D54]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-[#8C96A5]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A24B]"></span>
            <span>Lead Strategic Advisor: <strong>{BRAND.founder.name}</strong> (Former Vice President and Business Head at organizations such as Reliance Retail, Metro Cash & Carry, and NIF Food)</span>
          </div>
          <div className="flex items-center gap-4 text-[#8C96A5]">
            <a
              href={BRAND.contact.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#C9A24B] hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct: {BRAND.contact.whatsapp.display}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-[#8C96A5]">{BRAND.contact.address.complex}, Noida</span>
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
              Business Consulting [Draft]
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#E2E8F0] hover:text-[#C9A24B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/account"
              className="flex items-center gap-1.5 text-xs text-[#8C96A5] hover:text-[#F7F6F3] transition-colors px-3 py-2 rounded border border-[#2A3D54]"
            >
              <User className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </Link>

            <Link
              href="/intake"
              className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-4 py-2.5 rounded text-xs font-bold tracking-wide uppercase transition-all shadow-sm"
            >
              <span>Start Intake</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#8C96A5] hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111B27] border-b border-[#2A3D54] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#E2E8F0] hover:text-[#C9A24B]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#2A3D54] space-y-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm text-[#8C96A5] hover:text-[#F7F6F3]"
            >
              <User className="w-4 h-4" />
              <span>Client Portal & Deliverables Vault</span>
            </Link>
            <Link
              href="/intake"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#C9A24B] text-[#1B2838] py-2.5 rounded font-bold text-sm uppercase tracking-wide"
            >
              Start Intake Form
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
