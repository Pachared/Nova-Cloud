import type { MetadataRoute } from "next";
import { canIndexSite, site } from "@/shared/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndexSite) return [];
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
