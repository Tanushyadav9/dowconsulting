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
  title: `${BRAND.name} | Business Consulting for Startups, Small Companies & MSMEs [Draft]`,
  description:
    "Business consulting for startups, small companies, and MSMEs across GTM strategy, market research, business expansion strategy, and new business start consultation. [Draft copy pending client confirmation]",
  keywords: [
    "Business Consulting",
    "GTM Strategy",
    "Go-to-Market Strategy",
    "Market Research",
    "Business Expansion Strategy",
    "New Business Start Consultation",
    "Startups",
    "Small Companies",
    "MSMEs",
    "Niraj Kumar",
    "DOW Consulting",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DOW Consulting",
  description:
    "Business consulting for startups, small companies, and MSMEs specializing in GTM strategy, market research, business expansion strategy, and new business start consultation.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://dowconsulting.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit No. A-1212 D, Tower A, Spectrum@Metro Phase 1, Sector 75",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  telephone: "+91 93112 15564",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = Boolean(
    clerkKey &&
      clerkKey.startsWith("pk_") &&
      !clerkKey.includes("placeholder") &&
      !clerkKey.includes("dGVzdC1jbGVyay1hcHAk")
  );

  const content = (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F6F3] text-[#1B2838]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );

  if (isClerkConfigured) {
    return (
      <ClerkProvider publishableKey={clerkKey}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}
