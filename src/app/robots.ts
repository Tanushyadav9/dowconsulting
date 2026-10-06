import { MetadataRoute } from "next";
import { requireEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = requireEnv("NEXT_PUBLIC_APP_URL", "Canonical site base URL for robots.txt");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
