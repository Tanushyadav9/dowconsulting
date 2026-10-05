import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Portal | DOW Consulting",
  description: "Executive operations, intake reviews, custom quotes, bookings, and report deliveries.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F6F3] flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
