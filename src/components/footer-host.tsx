"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/portfolio/site-footer";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export function FooterHost() {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0];
  const locale: Locale = segment && isLocale(segment) ? segment : defaultLocale;

  return <SiteFooter locale={locale} />;
}
