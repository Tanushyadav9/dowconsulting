/**
 * DOW Consulting - Centralized Enquiry & Direct Communication Configuration
 * 
 * Mandate:
 * "DOW Consulting is a business-consulting firm led by Niraj Kumar.
 * This website is a professional portfolio and enquiry site.
 * Its job is to make visitors and prospective clients see the firm as trustworthy,
 * credible and highly professional, to show clearly what the firm does and how it works,
 * and to make it effortless to enquire by phone call or WhatsApp.
 * 
 * It is not a transactional platform. There are no accounts, no online payments,
 * no client portal, no database and no admin area. Customers enquire directly by
 * phone or WhatsApp, and the consultant takes it from there."
 */

import { getContactEmail, getContactPhone, getWhatsAppNumber } from "@/lib/env";

export const ENQUIRY_CONFIG = {
  // Single phone coordinate from business card
  phone: {
    get display(): string {
      return getContactPhone();
    },
    get dialNumber(): string {
      return getContactPhone().replace(/\s+/g, "");
    },
    get telLink(): string {
      return `tel:${getContactPhone().replace(/\s+/g, "")}`;
    },
  },

  // WhatsApp messaging coordinate (treat as call number; confirm WhatsApp availability)
  whatsapp: {
    get display(): string {
      return getWhatsAppNumber();
    },
    get internationalNumber(): string {
      return getWhatsAppNumber().replace(/[^\d]/g, "");
    },
    get baseChatUrl(): string {
      const cleanNum = getWhatsAppNumber().replace(/[^\d]/g, "");
      return `https://wa.me/${cleanNum}`;
    },
    defaultMessage:
      "Hello Niraj Kumar / DOW Consulting, I would like to enquire about business consulting advisory services for my business.",
  },

  // Direct Email Coordination (from business card: niraj@dairyonwheels.com)
  email: {
    get primary(): string {
      return getContactEmail();
    },
    get mailtoLink(): string {
      return `mailto:${getContactEmail()}?subject=Business%20Consulting%20Enquiry%20-%20DOW%20Consulting`;
    },
  },

  // Consultation Delivery Modes
  consultationModes: [
    {
      id: "online",
      name: "Online Consultation",
      channels: "Google Meet or Zoom",
      description: "Direct strategic consultation conducted online via Google Meet or Zoom.",
    },
    {
      id: "in-person",
      name: "In-Person Consultation",
      channels: "On request",
      description:
        "In-person meetings on request. Travel and visiting charges are borne by the client and are communicated at the time of enquiry.",
      terms: "Travel and visiting charges are borne by the client and are communicated at the time of enquiry.",
    },
  ],

  // Service-specific WhatsApp message templates for effortless one-click enquiry
  serviceWhatsAppTemplates: {
    "market-research-consumer-insight":
      "Hello Niraj / DOW Consulting, I would like to enquire about Market Research and Consumer Insight advisory for my business.",
    "product-launch-strategy":
      "Hello Niraj / DOW Consulting, I would like to enquire about Product Launch Strategy for my offering.",
    "gtm-strategy-distribution":
      "Hello Niraj / DOW Consulting, I would like to enquire about Go-to-Market Strategy and Distribution.",
    "brand-building":
      "Hello Niraj / DOW Consulting, I would like to enquire about Brand Building strategy for my business.",
    "product-design-packaging-guidance":
      "Hello Niraj / DOW Consulting, I would like to enquire about Product Design and Packaging Guidance.",
    "business-expansion-sales-growth":
      "Hello Niraj / DOW Consulting, I would like to enquire about Business Expansion and Sales-Growth Strategy for our business.",
    "new-business-startup-guidance":
      "Hello Niraj / DOW Consulting, I would like to enquire about New-Business and Start-up Guidance.",
    "staff-training":
      "Hello Niraj / DOW Consulting, I would like to enquire about Staff Training for our team.",
    "customised-solutions":
      "Hello Niraj / DOW Consulting, I would like to enquire about Customised Consulting Solutions for our business.",
    general:
      "Hello Niraj Kumar / DOW Consulting, I would like to enquire about business consulting advisory services.",
  },

  // Function to build a pre-filled WhatsApp link
  buildWhatsAppUrl(text?: string): string {
    const rawNumber = getWhatsAppNumber().replace(/[^\d]/g, "");
    const msg = text || ENQUIRY_CONFIG.whatsapp.defaultMessage;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  },
};
