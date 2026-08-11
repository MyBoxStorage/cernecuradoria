import type { MetadataRoute } from "next";
import { PAGE_LAST_MODIFIED, PUBLIC_ROUTES, getSiteUrl } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: PAGE_LAST_MODIFIED[route],
    changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.8 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
