"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Inbox,
  FileCheck,
  Calendar,
  FileText,
  BarChart3,
  ShieldAlert,
} from "lucide-react";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: BarChart3 },
  { label: "Submissions", href: "/admin/submissions", icon: Inbox },
  { label: "Custom Quotes", href: "/admin/quotes", icon: FileCheck },
  { label: "Bookings & Sessions", href: "/admin/bookings", icon: Calendar },
  { label: "Written Reports", href: "/admin/reports", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Team & Permissions", href: "/admin/team", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-[#111B27] text-[#8C96A5] p-6 border-b md:border-b-0 md:border-r border-[#2A3D54] flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Executive Admin
          </span>
          <h2 className="text-lg font-bold text-[#F7F6F3]">DOW Consulting</h2>
        </div>

        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#1B2838] text-[#C9A24B] border-l-2 border-[#C9A24B]"
                    : "hover:bg-[#1B2838] hover:text-[#F7F6F3]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-[#2A3D54] text-[11px] space-y-1 text-[#5A6472]">
        <div className="flex items-center gap-1.5 text-[#C9A24B]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="font-bold">Strict Role Isolation</span>
        </div>
        <p>Owner permissions governed strictly by environment variables.</p>
      </div>
    </aside>
  );
}
