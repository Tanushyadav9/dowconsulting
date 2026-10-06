import { MetadataRoute } from "next";
import { requireEnv } from "@/lib/env";
import { BLOG_POSTS } from "@/lib/constants/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = requireEnv("NEXT_PUBLIC_APP_URL", "Canonical site base URL for sitemap.xml");

  const staticPages = [
    "",
    "/about",
    "/packages",
    "/case-studies",
    "/contact",
    "/blog",
    "/intake",
    "/checkout",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/disclaimer",
    "/pricing-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
