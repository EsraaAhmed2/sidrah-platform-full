import type { MetadataRoute } from "next";
import { getAllCourses } from "@/lib/courses-data";
import { posts } from "@/lib/blog-data";

const BASE = "https://sidrah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/courses", "/about", "/contact", "/faq", "/blog", "/paths", "/leaderboard", "/search"].map(
    (p) => ({ url: `${BASE}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })
  );
  const coursePages = getAllCourses().map((c) => ({
    url: `${BASE}/courses/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const blogPages = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...coursePages, ...blogPages];
}
