import Link from "next/link";
import {
  Inbox,
  FileCheck,
  Calendar,
  FileText,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    { label: "New Inquiries / Submissions", value: "14", change: "+4 this week", href: "/admin/submissions", icon: Inbox },
    { label: "Custom Quotes Active", value: "6", change: "₹3,40,000 pipeline", href: "/admin/quotes", icon: FileCheck },
    { label: "Confirmed Upcoming Sessions", value: "9", change: "WhatsApp / Meet", href: "/admin/bookings", icon: Calendar },
    { label: "Reports Delivered (R2 Vault)", value: "28", change: "100% delivered on-time", href: "/admin/reports", icon: FileText },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Principal Advisory Control Panel
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838]">Operations &amp; Practice Overview</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/submissions"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#1B2838] text-xs font-bold text-[#F7F6F3] hover:bg-[#2A3D54] transition-colors"
          >
            <span>Review New Submissions</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm hover:border-[#1B2838] transition-colors group space-y-3"
            >
              <div className="flex justify-between items-center text-[#5A6472]">
                <span className="text-xs font-semibold">{s.label}</span>
                <Icon className="w-4 h-4 text-[#C9A24B]" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-[#1B2838]">{s.value}</span>
                <span className="text-[11px] font-medium text-[#C9A24B]">{s.change}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Section: Recent Activity & Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-8 bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
            <h3 className="font-bold text-sm text-[#1B2838]">Incoming Intake Pipeline</h3>
            <Link href="/admin/submissions" className="text-xs font-semibold text-[#1B2838] hover:text-[#C9A24B]">
              View All →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded border border-[#E2E8F0] flex justify-between items-center hover:bg-[#F7F6F3]">
              <div>
                <span className="font-bold text-[#1B2838]">Singhania Logistics &amp; Retail LLP</span>
                <p className="text-[11px] text-[#5A6472]">Retail Chain • Delhi NCR • Commercial Lease Review</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  Under Review
                </span>
                <p className="text-[10px] text-[#8C96A5] mt-1">Today, 2:15 PM</p>
              </div>
            </div>

            <div className="p-3.5 rounded border border-[#E2E8F0] flex justify-between items-center hover:bg-[#F7F6F3]">
              <div>
                <span className="font-bold text-[#1B2838]">Apex Industrial Components</span>
                <p className="text-[11px] text-[#5A6472]">Industrial Engineering • Greater Noida • Machine Shop Expansion</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Quote Dispatched
                </span>
                <p className="text-[10px] text-[#8C96A5] mt-1">Yesterday</p>
              </div>
            </div>

            <div className="p-3.5 rounded border border-[#E2E8F0] flex justify-between items-center hover:bg-[#F7F6F3]">
              <div>
                <span className="font-bold text-[#1B2838]">Vanguard Cloud Technologies</span>
                <p className="text-[11px] text-[#5A6472]">Tech SaaS • Bengaluru • Series A Milestone Timing</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Session Scheduled
                </span>
                <p className="text-[10px] text-[#8C96A5] mt-1">Oct 03, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Advisor Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1B2838] text-[#F7F6F3] p-6 rounded-lg border border-[#2A3D54] shadow-md space-y-4">
            <h3 className="font-bold text-sm text-[#F7F6F3] border-b border-[#2A3D54] pb-2">
              Principal Workflow
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/quotes"
                className="flex items-center justify-between p-2.5 rounded bg-[#111B27] hover:bg-[#2A3D54] text-[#E2E8F0] transition-colors"
              >
                <span>Draft Custom Quote</span>
                <FileCheck className="w-4 h-4 text-[#C9A24B]" />
              </Link>
              <Link
                href="/admin/bookings"
                className="flex items-center justify-between p-2.5 rounded bg-[#111B27] hover:bg-[#2A3D54] text-[#E2E8F0] transition-colors"
              >
                <span>View Session Calendar</span>
                <Calendar className="w-4 h-4 text-[#C9A24B]" />
              </Link>
              <Link
                href="/admin/reports"
                className="flex items-center justify-between p-2.5 rounded bg-[#111B27] hover:bg-[#2A3D54] text-[#E2E8F0] transition-colors"
              >
                <span>Upload Report PDF (R2)</span>
                <FileText className="w-4 h-4 text-[#C9A24B]" />
              </Link>
              <Link
                href="/admin/team"
                className="flex items-center justify-between p-2.5 rounded bg-[#111B27] hover:bg-[#2A3D54] text-[#E2E8F0] transition-colors"
              >
                <span>Manage Staff Grants</span>
                <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
