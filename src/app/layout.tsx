import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { DraftPreviewBanner } from "@/components/layout/DraftPreviewBanner";
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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dowconsulting-r756.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Business consulting practice for start-ups, small companies and MSMEs specialising in GTM strategy, distribution, brand building, and commercial expansion led by Niraj Kumar.",
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
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
    description:
      "Strategic business consulting for start-ups, small companies and MSMEs led by Niraj Kumar (GTM Strategy, Distribution & Brand Building).",
    siteName: BRAND.name,
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: `${BRAND.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | ${BRAND.consultant.name} &mdash; ${BRAND.consultant.title}`,
    description:
      "Strategic business consulting for start-ups, small companies and MSMEs led by Niraj Kumar.",
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": `${siteUrl}/#organization`,
      name: BRAND.name,
      url: siteUrl,
      description:
        "Business consulting practice for start-ups, small companies and MSMEs specialising in GTM strategy, distribution, brand building, and commercial expansion led by Niraj Kumar.",
      telephone: ENQUIRY_CONFIG.phone.display,
      email: ENQUIRY_CONFIG.email.primary,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRAND.headOffice.address,
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      founder: {
        "@type": "Person",
        name: BRAND.consultant.name,
        jobTitle: BRAND.consultant.title,
        description: BRAND.consultant.descriptor,
      },
      areaServed: "IN",
      knowsAbout: [
        "Go-to-Market Strategy",
        "Distribution Channel Architecture",
        "Brand Building",
        "Market Research and Consumer Insight",
        "Product Launch Strategy",
        "Business Expansion Strategy",
        "Start-up Advisory",
      ],
    },
  ],
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
        <DraftPreviewBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingEnquiryWidget />
        <Footer />
      </body>
    </html>
  );
}
