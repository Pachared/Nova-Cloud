import type { MetadataRoute } from "next";
import { site } from "@/shared/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Leave UI routes crawlable so crawlers can read their noindex tags.
        disallow: ["/api/", "/auth/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
