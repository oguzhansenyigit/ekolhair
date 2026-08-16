import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/db";
import { absoluteUrl, ISTANBUL_DISTRICTS, PRIORITY_DISTRICTS, slugify } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/before-after"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/hizmetler"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/hakkimizda"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/iletisim"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const districts: MetadataRoute.Sitemap = ISTANBUL_DISTRICTS.map((d) => ({
    url: absoluteUrl(`/ilce/${slugify(d)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: (PRIORITY_DISTRICTS as readonly string[]).includes(d) ? 0.95 : 0.8,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const rows = await getAllPostSlugs();
    posts = rows.map((row) => ({
      url: absoluteUrl(`/blog/${row.slug}`),
      lastModified: new Date(row.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    posts = [];
  }

  return [...staticRoutes, ...districts, ...posts];
}

export const dynamic = "force-dynamic";
