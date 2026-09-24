import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getSiteContent } from "@/lib/site-content";
import { SitePage } from "./site-page";

vi.mock("next/navigation", () => ({ usePathname: () => "/en/" }));
// HeroScene sets up an IntersectionObserver/WebGL scene that jsdom doesn't provide;
// it's irrelevant to the contact heading this test covers, so stub it out.
vi.mock("./hero-scene", () => ({ HeroScene: () => null }));

describe("SitePage contact section", () => {
  it.each(["ko", "en", "ja"] as const)("avoids a duplicate portfolio heading in %s", (locale) => {
    const { container } = render(<SitePage locale={locale} page="portfolio" content={getSiteContent(locale)} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelector(".work .section-heading")).toBeNull();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it.each([
    ["ko", "연락 ↗"],
    ["en", "Contact ↗"],
    ["ja", "連絡 ↗"]
  ] as const)("localizes the contact link in %s", (locale, label) => {
    render(<SitePage locale={locale} page="contact" content={getSiteContent(locale)} />);
    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      locale === "ko" ? "/contact" : `/${locale}/contact`
    );
  });

  it("keeps the CONTACT kicker and heading on home, but not on the contact page where the hero already shows it", () => {
    const content = getSiteContent("en");

    const { unmount } = render(<SitePage locale="en" page="contact" content={content} />);
    expect(screen.getByRole("heading", { level: 1, name: "Contact" })).toBeInTheDocument();
    expect(screen.queryByText("05 / CONTACT")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Let’s work together" })).not.toBeInTheDocument();
    unmount();

    render(<SitePage locale="en" page="home" content={content} />);
    expect(screen.getByText("05 / CONTACT")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Let’s work together" })).toBeInTheDocument();
  });
});
