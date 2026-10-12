import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingEnquiryWidget } from "@/components/home/FloatingEnquiryWidget";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
  description:
    "Business consulting practice for start-ups, small companies and MSMEs specializing in GTM strategy, distribution, brand building, and commercial expansion led by Niraj Kumar.",
  keywords: [
    "DOW Consulting",
    "Niraj Kumar",
    "Business Consulting",
    "GTM Strategy",
    "Distribution Strategy",
    "Brand Building",
    "Product Launch Strategy",
    "Market Research",
    "Start-ups",
    "Small Companies",
    "MSMEs",
    "Noida",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND.name,
  description:
    "Business consulting practice for start-ups, small companies and MSMEs specializing in GTM strategy, distribution, brand building, and commercial expansion led by Niraj Kumar.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://dowconsulting-r756.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.headOffice.address,
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  telephone: ENQUIRY_CONFIG.phone.display,
  email: ENQUIRY_CONFIG.email.primary,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B] font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingEnquiryWidget />
        <Footer />
      </body>
    </html>
  );
}
