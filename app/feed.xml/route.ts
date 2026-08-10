import { getSiteUrl } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = getSiteUrl();
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const link = `${base}/blog/${post.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid>${escapeXml(link)}</guid>`,
        `<pubDate>${new Date(`${post.date}T12:00:00`).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<author>${escapeXml(post.author)}</author>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>Cerne Curadoria — Blog</title>",
    `<link>${escapeXml(`${base}/blog`)}</link>`,
    "<description>Notas sobre curadoria, herança e o que fazer com o que fica.</description>",
    "<language>pt-BR</language>",
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
