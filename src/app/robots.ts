import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog", "/blog/", "/ilce/", "/before-after", "/hizmetler", "/hakkimizda", "/iletisim"],
      disallow: ["/api/", "/scripts/"],
    },
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
    host: siteConfig.url.replace(/\/$/, ""),
  };
}
