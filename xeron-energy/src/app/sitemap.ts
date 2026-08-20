import type { MetadataRoute } from "next";
import { navLinks, utilityLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const priority = (href: string) => {
    if (href === "/") return 1;
    if (href === "/contact") return 0.9;
    if (utilityLinks.some((l) => l.href === href)) return 0.3;
    return 0.7;
  };

  return [...navLinks, ...utilityLinks].map((l) => ({
    url: `${site.url}${l.href === "/" ? "" : l.href}`,
    lastModified: now,
    changeFrequency:
      l.href === "/" ? "weekly" : utilityLinks.some((u) => u.href === l.href) ? "yearly" : "monthly",
    priority: priority(l.href),
  }));
}
