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
  // Direct Phone Call Coordinate
  phone: {
    display: "+91 93112 15564",
    dialNumber: "+919311215564",
    telLink: "tel:+919311215564",
  },

  // Direct WhatsApp Messaging Coordinate
  whatsapp: {
    display: "+91 93112 15564",
    internationalNumber: "919311215564",
    baseChatUrl: "https://wa.me/919311215564",
    defaultMessage:
      "Hello Niraj Kumar / DOW Consulting, I would like to enquire about business consulting advisory services for my business.",
  },

  // Direct Email Coordination (Optional)
  email: {
    get primary(): string {
      return getContactEmail();
    },
    get mailtoLink(): string {
      return `mailto:${getContactEmail()}?subject=Business%20Consulting%20Enquiry%20-%20DOW%20Consulting`;
    },
  },

  // Executive Desk Availability Window
  officeHours: {
    window: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
    notice:
      "Direct phone and WhatsApp enquiries are received during operating hours. Live diagnostic calls and consultations are scheduled directly with the consultant.",
  },

  // Practice-specific WhatsApp message templates for effortless one-click enquiry
  serviceWhatsAppTemplates: {
    "gtm-strategy":
      "Hello Niraj / DOW Consulting, I would like to enquire about Go-to-Market (GTM) Strategy advisory for my business.",
    "market-research":
      "Hello Niraj / DOW Consulting, I would like to enquire about Market Research and competitive intelligence advisory for my business.",
    "business-expansion-strategy":
      "Hello Niraj / DOW Consulting, I would like to enquire about Business Expansion Strategy advisory for my business.",
    "new-business-start-consultation":
      "Hello Niraj / DOW Consulting, I would like to enquire about New Business Start Consultation for my new business venture.",
    general:
      "Hello Niraj / DOW Consulting, I would like to discuss business consulting advisory for our company.",
  },

  // Function to build a pre-filled WhatsApp link
  buildWhatsAppUrl(text?: string): string {
    const rawNumber = "919311215564";
    const msg = text || ENQUIRY_CONFIG.whatsapp.defaultMessage;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  },
};
