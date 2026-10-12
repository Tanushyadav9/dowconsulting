import { MetadataRoute } from "next";
import { SERVICES_CATALOG } from "@/lib/constants/services";
import { hasActiveExpertPanel } from "@/lib/constants/experts";
import { hasActiveEngagements, hasActiveTestimonials } from "@/lib/constants/engagements";
import { getAppUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAppUrl();

  const coreRoutes = [
    "",
    "/services",
    "/about",
    "/approach",
    "/our-approach",
    "/contact",
    "/terms",
    "/privacy-policy",
    "/disclaimer",
  ];

  if (hasActiveExpertPanel()) {
    coreRoutes.push("/expert-panel");
  }

  if (hasActiveEngagements() || hasActiveTestimonials()) {
    coreRoutes.push("/engagements");
  }

  const staticPages = coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const servicePages = SERVICES_CATALOG.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages];
}
