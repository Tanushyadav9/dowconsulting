import { hasActiveExpertPanel } from "@/lib/constants/experts";
import { hasActiveEngagements, hasActiveTestimonials } from "@/lib/constants/engagements";
import { SERVICES_CATALOG } from "@/lib/constants/services";

export function getHeaderNavLinks() {
  const links = [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Our Approach", href: "/approach" },
  ];

  // Hide Expert Panel navigation link until at least one expert besides Niraj Kumar is added
  if (hasActiveExpertPanel()) {
    links.push({ label: "Expert Panel", href: "/expert-panel" });
  }

  // Hide Engagements / Testimonials navigation link while files are empty
  if (hasActiveEngagements() || hasActiveTestimonials()) {
    links.push({ label: "Engagements", href: "/engagements" });
  }

  links.push({ label: "Contact", href: "/contact" });
  return links;
}

export const HEADER_NAV_LINKS = getHeaderNavLinks();

export const SERVICE_LINKS = SERVICES_CATALOG.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];
