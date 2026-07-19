import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/pitch" },
    sitemap: "https://landing-page-three-lac-54.vercel.app/sitemap.xml",
  };
}
