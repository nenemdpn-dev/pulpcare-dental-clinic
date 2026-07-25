import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://pulpcaredentalclinic.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const serviceSlugs = [
  "general-dentistry",
  "dental-cleaning",
  "tooth-extraction",
  "teeth-whitening",
  "paediatric-dentistry",
  "root-canal",
  "cosmetic-dentistry",
  "emergency-dental-care",
];

const blogSlugs = [
  "importance-of-regular-dental-checkups",
  "tips-for-childrens-dental-health",
  "what-to-do-in-dental-emergency",
];

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/book-appointment", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  ...serviceSlugs.map((s) => ({ path: `/services/${s}`, changefreq: "monthly" as const, priority: "0.8" })),
  ...blogSlugs.map((s) => ({ path: `/blog/${s}`, changefreq: "monthly" as const, priority: "0.6" })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n")
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
