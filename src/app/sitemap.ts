import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const routes = ["/", "/about", "/portfolio", "/contact"] as const;
const localePrefixes = ["", "/en", "/ja"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return localePrefixes.flatMap((prefix) =>
    routes.map((route) => {
      const path = route === "/" ? prefix || "/" : `${prefix}${route}`;
      return {
        url: new URL(`${path}${path.endsWith("/") ? "" : "/"}`, `${siteUrl}/`).toString(),
        changeFrequency: route === "/portfolio" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.8
      };
    })
  );
}
