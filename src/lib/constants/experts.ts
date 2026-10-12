/**
 * Expert Panel / Panel of Experts Content File
 * 
 * Mandate:
 * Driven by a content file of expert profiles (name, designation, area of expertise, photo, short bio).
 * Seed nothing. Hide the page and its navigation link until at least one expert besides Niraj Kumar is added.
 * Never use "our team" — use "Expert Panel" or "Panel of Experts".
 */

export interface ExpertProfile {
  id: string;
  name: string;
  designation: string;
  areaOfExpertise: string;
  photo?: string;
  shortBio: string;
}

// Seed nothing. Must remain empty until real client-approved expert profiles are provided.
export const EXPERT_PANEL: ExpertProfile[] = [];

/**
 * Returns true only if there is at least one expert profile added besides Niraj Kumar.
 */
export function hasActiveExpertPanel(): boolean {
  if (!EXPERT_PANEL || EXPERT_PANEL.length === 0) {
    return false;
  }
  const nonLeadExperts = EXPERT_PANEL.filter(
    (e) => e.name && e.name.trim().toLowerCase() !== "niraj kumar"
  );
  return nonLeadExperts.length > 0;
}
