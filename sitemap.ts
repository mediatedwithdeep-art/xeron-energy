import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return navLinks.map((l) => ({
    url: `${site.url}${l.href === "/" ? "" : l.href}`,
    lastModified: now,
    changeFrequency: l.href === "/" ? "weekly" : "monthly",
    priority: l.href === "/" ? 1 : l.href === "/contact" ? 0.9 : 0.7,
  }));
}
