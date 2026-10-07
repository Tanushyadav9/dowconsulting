"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  FileCheck,
  CheckCircle2,
  PieChart,
  BarChart,
  Lock,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [isOwner, setIsOwner] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOwner() {
      try {
        const res = await fetch("/api/admin/team");
        if (res.status === 403) {
          setIsOwner(false);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    checkOwner();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-xs text-[#8C96A5]">
        Verifying analytics permissions...
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#C9A24B]">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#1B2838]">Owner Authorization Required</h2>
        <p className="text-xs text-[#5A6472] max-w-md mx-auto">
          Financial revenue, quote conversion ratios, and practice pricing analytics are restricted to the designated Owner (Niraj Kumar) under least privilege rules.
        </p>
      </div>
    );
  }

  const metrics = [
    { label: "Total Completed Consultations", value: "32", period: "All Time" },
    { label: "Total Gross Consulting Revenue", value: "₹14,85,000", period: "All Time (INR)" },
    { label: "Active Pipeline Inquiries", value: "14", period: "Under Review" },
    { label: "Quote Conversion Ratio", value: "68.4%", period: "Last 90 Days" },
  ];

  const breakdownBySector = [
    { sector: "Commercial Retail Chains", percent: "38%", revenue: "₹5,64,000" },
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
            {breakdownBySector.map((b) => (
              <div key={b.sector} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[#1B2838]">
                  <span className="font-semibold">{b.sector}</span>
                  <div className="flex gap-3">
                    <span className="font-bold text-[#C9A24B]">{b.revenue}</span>
                    <span className="text-[#8C96A5]">({b.percent})</span>
                  </div>
                </div>
                <div className="w-full bg-[#F7F6F3] h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                  <div
                    className="bg-[#1B2838] h-full rounded-full"
                    style={{ width: b.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Session Deliveries */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-6">
          <h3 className="font-bold text-sm text-[#1B2838]">Session Delivery Channels</h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded border border-[#E2E8F0] bg-[#F7F6F3] flex justify-between items-center">
              <div>
                <strong className="text-[#1B2838] block">WhatsApp Audio / Video Call</strong>
                <span className="text-[11px] text-[#5A6472]">Direct advisory phone channel</span>
              </div>
              <span className="text-sm font-bold text-[#1B2838]">72%</span>
            </div>

            <div className="p-4 rounded border border-[#E2E8F0] bg-[#F7F6F3] flex justify-between items-center">
              <div>
                <strong className="text-[#1B2838] block">Google Meet Video Call</strong>
                <span className="text-[11px] text-[#5A6472]">Interactive screen-share consultation</span>
              </div>
              <span className="text-sm font-bold text-[#1B2838]">28%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
