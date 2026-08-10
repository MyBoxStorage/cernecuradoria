import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, getSiteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
