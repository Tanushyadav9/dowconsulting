/**
 * Environment & Runtime Coordinates Configuration
 * Safe static-first fallbacks with zero secrets and zero database dependencies.
 */

export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (url && !url.includes("placeholder") && !url.includes("example")) {
    return url.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://dowconsulting-r756.vercel.app";
}

export function getContactEmail(): string {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (email && !email.includes("placeholder") && !email.includes("example")) {
    return email;
  }
  return "niraj@dairyonwheels.com";
}

export function getContactPhone(): string {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+91 93107 09233";
}

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "+91 93107 09233";
}
