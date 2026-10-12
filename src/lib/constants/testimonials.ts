/**
 * Testimonials Configuration
 * 
 * Strict Compliance:
 * Zero seeded or fabricated testimonials.
 * When empty, testimonials section on homepage renders NULL (zero empty states or fake quotes).
 * Public /testimonials route redirects to home if empty.
 */

export interface TestimonialItem {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  quote: string;
  serviceUsed: string;
  date: string;
  consentConfirmed: boolean;
  consentNote: string;
}

// Configurable list of verified testimonials (defaults to empty array pending client authorization)
export const VERIFIED_TESTIMONIALS: TestimonialItem[] = [];

export function getPublishedTestimonials(): TestimonialItem[] {
  return VERIFIED_TESTIMONIALS.filter((t) => t.consentConfirmed);
}
