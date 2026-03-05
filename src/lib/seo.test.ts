import { buildPageMetadata, siteName } from "@/lib/seo";

describe("seo", () => {
  it("builds localized metadata for non-default locale", () => {
    const metadata = buildPageMetadata({
      locale: "en",
      page: "about",
      path: "/about"
    });

    expect(metadata.title).toBe("About Me");
    expect(metadata.alternates?.canonical).toBe("https://seung-ju.com/en/about");
    expect(metadata.alternates?.languages?.ko).toBe("https://seung-ju.com/about");
    expect(metadata.alternates?.languages?.en).toBe("https://seung-ju.com/en/about");
    expect(metadata.openGraph?.siteName).toBe(siteName);
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
});
