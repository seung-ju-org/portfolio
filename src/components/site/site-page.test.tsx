import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getSiteContent } from "@/lib/site-content";
import { SitePage } from "./site-page";

vi.mock("next/navigation", () => ({ usePathname: () => "/en/" }));
// HeroScene sets up an IntersectionObserver/WebGL scene that jsdom doesn't provide;
// it's irrelevant to the contact heading this test covers, so stub it out.
vi.mock("./hero-scene", () => ({ HeroScene: () => null }));

describe("SitePage contact section", () => {
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
