import { defaultLocale, getMessages, isLocale, locales, withLocale } from "@/lib/i18n";

describe("i18n", () => {
  it("exports expected locales", () => {
    expect(locales).toEqual(["ko", "en", "ja"]);
    expect(defaultLocale).toBe("ko");
  });

  it("validates locale values", () => {
    expect(isLocale("ko")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ja")).toBe(true);
    expect(isLocale("jp")).toBe(false);
  });

  it("builds localized path", () => {
    expect(withLocale("ko", "/")).toBe("/ko");
    expect(withLocale("en", "/about")).toBe("/en/about");
    expect(withLocale("ja", "/portfolio")).toBe("/ja/portfolio");
  });

  it("returns messages for each locale", () => {
    expect(getMessages("ko").hero.coverageValue).toContain("Design");
    expect(getMessages("en").hero.coverageValue).toContain("Design");
    expect(getMessages("ja").hero.coverageValue).toContain("Design");
  });
});
