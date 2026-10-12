import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingEnquiryWidget } from "@/components/home/FloatingEnquiryWidget";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Business Consulting for Startups, Small Companies & MSMEs [Draft]`,
  description:
    "Business consulting for startups, small companies, and MSMEs across GTM strategy, market research, business expansion strategy, and new business start consultation led by Niraj Kumar. [Draft copy]",
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
    "Business consulting practice for startups, small companies, and MSMEs specializing in GTM strategy, market research, business expansion strategy, and new business start consultation led by Niraj Kumar.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://dowconsulting-r756.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit No. A-1212 D, Tower A, Spectrum@Metro Phase 1, Sector 75",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  telephone: ENQUIRY_CONFIG.phone.display,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
        <FloatingEnquiryWidget />
        <Footer />
      </body>
    </html>
  );
}
