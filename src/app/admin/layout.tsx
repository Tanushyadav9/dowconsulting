import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { getAuthContext } from "@/lib/auth";

export const metadata = {
  title: "Admin Portal | DOW Consulting",
  description: "Executive operations, intake reviews, custom quotes, bookings, and report deliveries.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/admin");
  }

  const authCtx = await getAuthContext();
  if (!authCtx.isOwner && !authCtx.permissions) {
    redirect("/sign-in?redirect_url=/admin&error=unauthorized");
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F6F3] flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
