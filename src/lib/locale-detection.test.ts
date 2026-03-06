import { detectPreferredLocale } from "@/lib/locale-detection";

describe("detectPreferredLocale", () => {
  it("prefers cookie locale when valid", () => {
    expect(
      detectPreferredLocale({
        cookieLocale: "en",
        countryCode: "KR",
        acceptLanguage: "ja,en;q=0.9"
      })
    ).toBe("en");
  });

  it("maps country code to locale", () => {
    expect(detectPreferredLocale({ countryCode: "KR" })).toBe("ko");
    expect(detectPreferredLocale({ countryCode: "JP" })).toBe("ja");
  });

  it("falls back to accept-language", () => {
    expect(detectPreferredLocale({ acceptLanguage: "ja-JP,ja;q=0.9,en;q=0.8" })).toBe("ja");
    expect(detectPreferredLocale({ acceptLanguage: "en-US,en;q=0.9" })).toBe("en");
  });

  it("normalizes jp language code and defaults to ko", () => {
    expect(detectPreferredLocale({ acceptLanguage: "jp,en;q=0.9" })).toBe("ja");
    expect(detectPreferredLocale({ acceptLanguage: "fr-FR,fr;q=0.9" })).toBe("ko");
  });
});
