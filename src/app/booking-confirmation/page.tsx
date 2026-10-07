"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  CheckCircle2,
  MessageSquare,
  Video,
  FileText,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Clock,
  PhoneCall,
} from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "ORD-CONFIRMED";
  const packageName = searchParams.get("packageName") || "Business Consulting Advisory Engagement";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Success Badge & Header */}
      <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-lg border border-[#E2E8F0] shadow-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Booking Confirmed &amp; Reserved
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
          Your Advisory Engagement is Confirmed
        </h1>

        <p className="text-sm text-[#5A6472] max-w-xl mx-auto">
          Order Reference: <strong className="text-[#1B2838]">{orderNumber}</strong> • {packageName}
        </p>

        {/* WhatsApp Direct Handoff Box (Non-negotiable primary channel) */}
        <div className="mt-8 p-6 bg-[#F7F6F3] rounded-lg border-2 border-[#1B2838] max-w-2xl mx-auto text-left space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded bg-[#1B2838] text-[#C9A24B] flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1B2838]">
                Direct Principal WhatsApp Handoff
              </h3>
              <p className="text-xs text-[#5A6472] mt-0.5">
                Niraj Kumar and our advisory desk coordinate session scheduling and briefing materials directly on WhatsApp:
              </p>
              <p className="text-sm font-bold text-[#1B2838] mt-1">
                {BRAND.contact.whatsapp.display}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`${BRAND.contact.whatsapp.link}?text=Hello%20Niraj%20ji,%20I%20have%20confirmed%20my%20consulting%20booking%20(${orderNumber})%20for%20DOW%20Consulting.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
              <span>Open WhatsApp &amp; Message Niraj Kumar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Clear Next Steps & Preparation Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#1B2838] border-b border-[#E2E8F0] pb-3">
            What Happens Next
          </h3>
          <ol className="space-y-3 text-xs text-[#5A6472]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#1B2838] shrink-0">1.</span>
              <span>
                <strong>Confirmation Email Sent:</strong> A payment receipt and session confirmation email has been dispatched to your inbox via Resend.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#1B2838] shrink-0">2.</span>
              <span>
                <strong>Time Slot Lock:</strong> Our desk coordinates your exact calendar slot via WhatsApp Call or Google Meet based on your preference.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#1B2838] shrink-0">3.</span>
              <span>
                <strong>Written Diagnostic Report:</strong> Following your live call, your custom written report PDF will be prepared and delivered to your portal vault.
              </span>
            </li>
          </ol>
        </div>

        <div className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#1B2838] border-b border-[#E2E8F0] pb-3">
            What to Prepare for the Call
          </h3>
          <ul className="space-y-3 text-xs text-[#5A6472]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>
                <strong>Business Overview / Pitch Deck:</strong> Share your pitch deck, executive summary, or notes regarding your target market ahead of time.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>
                <strong>Key Commercial Objectives:</strong> Target launch dates, expansion milestones, planned capex/budget, or distribution goals.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <span>
                <strong>Core Discussion Points:</strong> Specific bottlenecks or strategic priorities you want the consulting team to focus on.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
        >
          <span>Go to Client Portal &amp; Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="text-xs text-[#5A6472] hover:text-[#1B2838] underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-[#5A6472]">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
