"use client";

import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/portfolio/site-header";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export function HeaderHost() {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0];
  const locale: Locale = segment && isLocale(segment) ? segment : defaultLocale;

  return <SiteHeader locale={locale} />;
}
