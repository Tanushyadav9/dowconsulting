import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Client Portal Vault | DOW Consulting",
  description: "Secure advisory portal for engagement status, meeting coordinates, and diagnostic PDF reports.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/account");
  }

  return <>{children}</>;
}
