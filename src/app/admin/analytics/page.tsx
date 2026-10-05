"use client";

import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  FileCheck,
  CheckCircle2,
  PieChart,
  BarChart,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: "Total Completed Consultations", value: "32", period: "All Time" },
    { label: "Total Gross Consulting Revenue", value: "₹14,85,000", period: "All Time (INR)" },
    { label: "Active Pipeline Inquiries", value: "14", period: "Under Review" },
    { label: "Quote Conversion Ratio", value: "68.4%", period: "Last 90 Days" },
  ];

  const breakdownBySector = [
    { sector: "Retail & QSR Chains", percent: "38%", revenue: "₹5,64,000" },
    { sector: "Manufacturing & Industrial MSME", percent: "29%", revenue: "₹4,30,000" },
    { sector: "Tech, SaaS & High-Growth Startups", percent: "21%", revenue: "₹3,12,000" },
    { sector: "Corporate Services & Real Estate", percent: "12%", revenue: "₹1,79,000" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Practice Performance
        </span>
        <h1 className="text-2xl font-bold text-[#1B2838]">Advisory Pipeline &amp; Revenue Analytics</h1>
        <p className="text-xs text-[#5A6472]">
          Real-time tracking of intake conversion velocity, package selections, and gross revenue.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] shadow-sm space-y-2">
            <span className="text-xs text-[#5A6472] font-medium">{m.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#1B2838]">{m.value}</span>
              <span className="text-[10px] font-bold text-[#C9A24B]">{m.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Industry Sector Breakdown */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <h3 className="font-bold text-sm text-[#1B2838]">Revenue by Commercial Industry Sector</h3>

          <div className="space-y-4">
            {breakdownBySector.map((item) => (
              <div key={item.sector} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-[#1B2838]">
                  <span>{item.sector}</span>
                  <span>{item.revenue} ({item.percent})</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1B2838] h-full"
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#1B2838]">Operational Delivery Highlights</h3>

          <div className="space-y-3 text-xs text-[#5A6472]">
            <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <strong className="text-[#1B2838] block">Dual Delivery Integrity:</strong>
              <p className="mt-0.5">
                100% of completed sessions included both the direct live consultation call with Niraj Kumar and a customized written diagnostic report.
              </p>
            </div>

            <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <strong className="text-[#1B2838] block">Session Channel Distribution:</strong>
              <p className="mt-0.5">
                62% WhatsApp Direct Call • 38% Google Meet Video Call. Zero reliance on in-app calling tools.
              </p>
            </div>

            <div className="p-3 bg-[#F7F6F3] rounded border border-[#E2E8F0]">
              <strong className="text-[#1B2838] block">Payment Gateway Reliability:</strong>
              <p className="mt-0.5">
                84% Razorpay (INR - UPI &amp; Cards) • 16% Stripe (USD - International Cards). All flat one-time fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
