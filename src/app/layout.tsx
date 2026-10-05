import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description:
    "Executive strategic business timing and commercial Vastu advisory for founders, startups, and corporate decision-makers led by Niraj Kumar.",
  keywords: [
    "Commercial Vastu",
    "Strategic Business Timing",
    "Business Consultation",
    "Niraj Kumar",
    "Executive Business Advisory",
    "Corporate Strategy",
    "Office Vastu Noida",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder_for_build"}
    >
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen flex flex-col bg-[#F7F6F3] text-[#1B2838]">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
