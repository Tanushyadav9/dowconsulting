"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import {
  Calendar,
  MessageSquare,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
} from "lucide-react";

interface BookingItem {
  id: string;
  clientName: string;
  businessName: string;
  phone: string;
  email: string;
  scheduledAt: string;
  channel: "WHATSAPP_CALL" | "GOOGLE_MEET";
  meetingLink?: string;
  status: "CONFIRMED" | "COMPLETED" | "PENDING_SCHEDULE";
  tier: string;
}

function AdminBookingsContent() {
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "BK-901",
      clientName: "Vikram Singhania",
      businessName: "Singhania Logistics & Retail LLP",
      phone: "+91 98101 23456",
      email: "vikram@singhanialogistics.in",
      scheduledAt: "Oct 08, 2026 at 3:30 PM IST",
      channel: "WHATSAPP_CALL",
      status: "CONFIRMED",
      tier: "Commercial Vastu & Strategic Growth",
    },
    {
      id: "BK-902",
      clientName: "Ananya Roy",
      businessName: "Vanguard Cloud Technologies",
      phone: "+91 98450 12389",
      email: "ananya@vanguardcloud.io",
      scheduledAt: "Oct 09, 2026 at 11:00 AM IST",
      channel: "GOOGLE_MEET",
      meetingLink: "https://meet.google.com/dow-nkj-strat",
      status: "CONFIRMED",
      tier: "Enterprise Strategic Retainer",
    },
    {
      id: "BK-903",
      clientName: "Sunil Agrawal",
      businessName: "Apex Precision Components",
      phone: "+91 99202 34567",
      email: "sunil@apexprecision.com",
      scheduledAt: "Oct 11, 2026 at 4:00 PM IST",
      channel: "WHATSAPP_CALL",
      status: "PENDING_SCHEDULE",
      tier: "Commercial Vastu & Strategic Growth",
    },
  ]);

  const updateStatus = (id: string, status: "CONFIRMED" | "COMPLETED" | "PENDING_SCHEDULE") => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Live Consultation Schedule
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838]">Session Bookings &amp; Calendar</h1>
          <p className="text-xs text-[#5A6472]">
            Live advisory sessions coordinated via WhatsApp Direct Call (+91 93112 15564) or Google Meet. No in-app calling tools.
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#111B27] text-[#F7F6F3]">
              <tr>
                <th className="p-4 text-left font-bold">Client &amp; Enterprise</th>
                <th className="p-4 text-left font-bold">Scheduled Time</th>
                <th className="p-4 text-left font-bold">Channel &amp; Link</th>
                <th className="p-4 text-center font-bold">Status</th>
                <th className="p-4 text-right font-bold">Session Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#F7F6F3]/50">
                  <td className="p-4">
                    <strong className="text-[#1B2838] block">{b.businessName}</strong>
                    <span className="text-[#5A6472]">{b.clientName} • {b.phone}</span>
                    <p className="text-[10px] text-[#C9A24B] mt-0.5">{b.tier}</p>
                  </td>

                  <td className="p-4 text-[#1B2838] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>{b.scheduledAt}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    {b.channel === "WHATSAPP_CALL" ? (
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#1B2838] hover:text-[#C9A24B] font-semibold"
                      >
                        <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
                        <span>WhatsApp: {b.phone}</span>
                      </a>
                    ) : (
                      <a
                        href={b.meetingLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#1B2838] hover:text-[#C9A24B] font-semibold"
                      >
                        <Video className="w-4 h-4 text-blue-600" />
                        <span>Open Google Meet</span>
                        <ExternalLink className="w-3 h-3 text-[#8C96A5]" />
                      </a>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "COMPLETED"
                          ? "bg-slate-100 text-[#5A6472]"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {b.status !== "COMPLETED" && (
                      <button
                        onClick={() => updateStatus(b.id, "COMPLETED")}
                        className="px-2.5 py-1 rounded bg-[#1B2838] text-[#F7F6F3] font-bold hover:bg-[#2A3D54] transition-colors"
                      >
                        Mark Done
                      </button>
                    )}
                    {b.status === "PENDING_SCHEDULE" && (
                      <button
                        onClick={() => updateStatus(b.id, "CONFIRMED")}
                        className="px-2.5 py-1 rounded bg-[#C9A24B] text-[#1B2838] font-bold hover:bg-[#B8913B]"
                      >
                        Confirm Slot
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-[#5A6472]">Loading session bookings...</div>}>
      <AdminBookingsContent />
    </Suspense>
  );
}
