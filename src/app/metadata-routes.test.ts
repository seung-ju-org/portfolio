import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("returns manifest", () => {
    const data = manifest();
    expect(data.name).toContain("Portfolio");
    expect(data.icons?.[0]?.src).toBe("/seungju-mark-black.svg");
  });

  it("returns robots config", () => {
    const data = robots();
    expect(data.host).toContain("seung-ju.com");
    expect(data.sitemap).toContain("/sitemap.xml");
  });

  it("returns sitemap entries for routes and locales", () => {
    const data = sitemap();
    expect(data.length).toBe(12);
    expect(data.some((item) => item.url.endsWith("/portfolio"))).toBe(true);
    expect(data.some((item) => item.url.endsWith("/en/contact"))).toBe(true);
    expect(data.some((item) => item.url.endsWith("/ja/about"))).toBe(true);
  });
});
