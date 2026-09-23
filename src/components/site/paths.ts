import type { Locale, PageKind } from "@/lib/site-content";

export function pagePath(locale: Locale, page: PageKind) {
  const suffix = page === "home" ? "/" : `/${page}/`;
  return locale === "ko" ? suffix : `/${locale}${suffix}`;
}

export function localePath(locale: Locale, pathname: string) {
  const bare = pathname.replace(/^\/(en|ja)(?=\/|$)/, "") || "/";
  return locale === "ko" ? bare : `/${locale}${bare}`;
}
