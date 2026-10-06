/**
 * Centralized Ecosystem and Cross-Promotion Configuration
 * 
 * SISTER PLATFORMS:
 * - Aapka Astro: Vedic astrology consultations, Vastu consultation (residential & commercial), Kundli and Panchang tools.
 * - Viar.in: Astrology education institute (Vihangam Institute of Astrology and Research) selling self-paced astrology courses.
 * 
 * SOCIAL LINKS:
 * - Centralized links for LinkedIn, YouTube, Facebook, Instagram.
 * - STRICT POLICY: Render a link only when its URL is set and valid; never render a dead or placeholder link.
 */

export interface SisterSite {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  tagline: string;
  description: string;
  offerings: string[];
  url: string;
}

export const SISTER_SITES: Record<"aapkaAstro" | "viar", SisterSite> = {
  aapkaAstro: {
    id: "aapka-astro",
    name: "Aapka Astro",
    fullName: "Aapka Astro",
    badge: "Vedic Astrology & Vastu",
    tagline: "Vedic Astrology Consultations & Vastu Solutions",
    description:
      "Offers Vedic astrology consultations, residential and commercial Vastu consultation, Kundli and Panchang tools.",
    offerings: [
      "Vedic Astrology Consultations & Horoscopes",
      "Residential & Commercial Vastu Consultation",
      "Kundli & Panchang Planning Tools",
    ],
    url: process.env.NEXT_PUBLIC_AAPKAASTRO_URL?.trim() || "https://aapkaastro.com",
  },
  viar: {
    id: "viar",
    name: "Viar.in",
    fullName: "Vihangam Institute of Astrology and Research (VIAR)",
    badge: "Astrology Education Institute",
    tagline: "Self-Paced Astrology & Research Courses",
    description:
      "An astrology education institute (Vihangam Institute of Astrology and Research) selling self-paced astrology courses.",
    offerings: [
      "Vihangam Institute of Astrology and Research (VIAR) Curriculum",
      "Self-Paced Foundational & Advanced Astrology Courses",
      "Research-Led Vedic Astrological Education",
    ],
    url: process.env.NEXT_PUBLIC_VIAR_URL?.trim() || "https://viar.in",
  },
};

export interface SocialLinkConfig {
  platform: "linkedin" | "youtube" | "facebook" | "instagram";
  label: string;
  url: string;
}

const RAW_SOCIAL_CONFIG: { platform: SocialLinkConfig["platform"]; label: string; envVar?: string }[] = [
  { platform: "linkedin", label: "LinkedIn", envVar: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN },
  { platform: "youtube", label: "YouTube", envVar: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE },
  { platform: "facebook", label: "Facebook", envVar: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK },
  { platform: "instagram", label: "Instagram", envVar: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM },
];

/**
 * Returns only verified, non-empty, non-placeholder social links.
 * Never returns dead links, '#', or placeholder strings.
 */
export function getActiveSocialLinks(): SocialLinkConfig[] {
  return RAW_SOCIAL_CONFIG.filter((item) => {
    if (!item.envVar) return false;
    const trimmed = item.envVar.trim();
    if (trimmed === "" || trimmed === "#") return false;
    if (trimmed.includes("example.com") || trimmed.includes("placeholder")) return false;
    return trimmed.startsWith("http://") || trimmed.startsWith("https://");
  }).map((item) => ({
    platform: item.platform,
    label: item.label,
    url: item.envVar!.trim(),
  }));
}
