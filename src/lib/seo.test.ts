import { buildPageMetadata } from "@/lib/seo";

describe("seo", () => {
  it("builds localized metadata for non-default locale", () => {
    const metadata = buildPageMetadata({
      locale: "en",
      page: "about",
      path: "/about"
    });

    expect(metadata.title).toEqual({ absolute: "About Me | Seung-Ju Oh | Portfolio" });
    expect(metadata.alternates?.canonical).toBe("https://seung-ju.com/en/about");
    expect(metadata.alternates?.languages?.ko).toBe("https://seung-ju.com/about");
    expect(metadata.alternates?.languages?.en).toBe("https://seung-ju.com/en/about");
    expect(metadata.openGraph?.siteName).toBe("Seung-Ju Oh | Portfolio");
  });

  it("builds default locale canonical without prefix", () => {
    const metadata = buildPageMetadata({
      locale: "ko",
      page: "home",
      path: "/"
    });

    expect(metadata.alternates?.canonical).toBe("https://seung-ju.com/");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("https://seung-ju.com/");
  });

  it("builds japanese localized metadata copy", () => {
    const metadata = buildPageMetadata({
      locale: "ja",
      page: "portfolio",
      path: "/portfolio"
    });

    expect(metadata.title).toEqual({ absolute: "ポートフォリオ | オ・スンジュ | ポートフォリオ" });
    expect(metadata.description).toContain("実務プロジェクト");
    expect(metadata.openGraph?.locale).toBe("ja_JP");
    expect(metadata.alternates?.canonical).toBe("https://seung-ju.com/ja/portfolio");
  });
});
