import { NextResponse, type NextRequest } from "next/server";

import { isLocale, withLocale } from "@/lib/i18n";
import { detectPreferredLocale, LOCALE_COOKIE_NAME } from "@/lib/locale-detection";

const redirectPaths = new Set(["/", "/about", "/portfolio", "/contact"]);

function hasLocalePrefix(pathname: string) {
  const [first] = pathname.split("/").filter(Boolean);
  return Boolean(first && isLocale(first));
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (hasLocalePrefix(pathname)) {
    const [locale] = pathname.split("/").filter(Boolean);
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
    return response;
  }

  if (!redirectPaths.has(pathname)) {
    return NextResponse.next();
  }

  const preferredLocale = detectPreferredLocale({
    cookieLocale: request.cookies.get(LOCALE_COOKIE_NAME)?.value,
    countryCode:
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      request.headers.get("cloudfront-viewer-country") ??
      request.headers.get("x-country-code"),
    acceptLanguage: request.headers.get("accept-language")
  });

  const targetPath = withLocale(preferredLocale, pathname as "/" | "/about" | "/portfolio" | "/contact");
  const url = new URL(`${targetPath}${search}`, request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE_NAME, preferredLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax"
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
