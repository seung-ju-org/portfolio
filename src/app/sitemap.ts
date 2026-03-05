import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

const routes = ["/", "/about", "/portfolio", "/contact"] as const;
const localePrefixes = ["", "/en", "/ja"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return localePrefixes.flatMap((prefix) =>
    routes.map((route) => {
      const path = route === "/" ? (prefix || "/") : `${prefix}${route}`;
      return {
        url: new URL(path, `${siteUrl}/`).toString(),
        lastModified: now,
        changeFrequency: route === "/portfolio" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.8
      };
    })
  );
}

