/**
 * Engagements and Testimonials Content File
 * 
 * Mandate:
 * Driven by content files. Each entry requires a recorded consent note.
 * Hide the sections, headings and navigation links entirely while the files are empty.
 * Do not write, seed or generate any client, project, quote, rating or result.
 */

export interface EngagementRecord {
  id: string;
  projectTitle: string;
  industry: string;
  serviceCategory: string;
  scopeSummary: string;
  recordedConsentNote: string; // Required consent record confirming client authorization
  dateRecorded?: string;
}

export interface TestimonialRecord {
  id: string;
  author: string;
  designation: string;
  organization: string;
  quote: string;
  recordedConsentNote: string; // Required consent record confirming client authorization
  dateRecorded?: string;
}

// Seed nothing. Must remain empty until verified client-authorized entries with recorded consent are provided.
export const ENGAGEMENTS: EngagementRecord[] = [];
export const TESTIMONIALS: TestimonialRecord[] = [];

export function hasActiveEngagements(): boolean {
  return Array.isArray(ENGAGEMENTS) && ENGAGEMENTS.length > 0;
}

export function hasActiveTestimonials(): boolean {
  return Array.isArray(TESTIMONIALS) && TESTIMONIALS.length > 0;
}
