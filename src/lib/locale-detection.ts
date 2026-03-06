import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export const LOCALE_COOKIE_NAME = "locale";

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  KR: "ko",
  JP: "ja"
};

function normalizeLocaleToken(token: string): Locale | null {
  const normalized = token.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "jp") return "ja";
  const base = normalized.split("-")[0];
  if (base === "jp") return "ja";
  return isLocale(base) ? base : null;
}

function parseAcceptLanguage(headerValue: string | null): Locale | null {
  if (!headerValue) return null;
  const candidates = headerValue
    .split(",")
    .map((part) => part.split(";")[0]?.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const locale = normalizeLocaleToken(candidate);
    if (locale) return locale;
  }
  return null;
}

export function detectPreferredLocale(input: {
  cookieLocale?: string | null;
  countryCode?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  const cookieLocale = normalizeLocaleToken(input.cookieLocale ?? "");
  if (cookieLocale) return cookieLocale;

  const countryCode = (input.countryCode ?? "").toUpperCase().trim();
  if (countryCode && COUNTRY_TO_LOCALE[countryCode]) {
    return COUNTRY_TO_LOCALE[countryCode];
  }

  return parseAcceptLanguage(input.acceptLanguage ?? null) ?? defaultLocale;
}
