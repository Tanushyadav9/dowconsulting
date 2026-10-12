/**
 * Team Directory Configuration
 * 
 * Strict Compliance:
 * Zero seeded or invented team members. Only authentic profiles published by practice leadership.
 * When empty, the site transparently explains the collaborative team model
 * (Market Research, Strategic Consultation, Information Collection) led by Niraj Kumar.
 */

export interface TeamMember {
  id: string;
  name: string;
  roleTitle: string;
  photoUrl?: string;
  bio: string;
  order: number;
}

// Configurable team members (defaults to empty array pending client authorization)
export const PUBLISHED_TEAM_MEMBERS: TeamMember[] = [];

export function getPublishedTeamMembers(): TeamMember[] {
  return PUBLISHED_TEAM_MEMBERS;
}
