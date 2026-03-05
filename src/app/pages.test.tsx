import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("@/components/portfolio/hero-section", () => ({
  HeroSection: ({ locale }: { locale?: string }) => <div>hero-{locale ?? "ko"}</div>
}));

vi.mock("@/components/portfolio/contact-section", () => ({
  ContactSection: ({ locale }: { locale?: string }) => <div>contact-{locale ?? "ko"}</div>
}));

vi.mock("@/components/portfolio/about-section", () => ({
  AboutSection: ({ locale }: { locale?: string }) => <div>about-{locale ?? "ko"}</div>
}));

vi.mock("@/components/portfolio/portfolio-section", () => ({
  PortfolioSection: ({ locale }: { locale?: string }) => <div>portfolio-{locale ?? "ko"}</div>
}));

vi.mock("@/lib/career", () => ({
  getAboutCareer: vi.fn(async () => ({
    experienceLabel: "Career: Jan 2019 -",
    items: [{ company: "A", position: "B", period: "C" }]
  }))
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn()
}));

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import HomePage from "@/app/page";
import PortfolioPage from "@/app/portfolio/page";
import LocalizedAboutPage, {
  generateMetadata as generateAboutLocaleMetadata,
  generateStaticParams as generateAboutStaticParams
} from "@/app/[locale]/about/page";
import LocalizedContactPage, {
  generateMetadata as generateContactLocaleMetadata,
  generateStaticParams as generateContactStaticParams
} from "@/app/[locale]/contact/page";
import LocalizedHomePage, {
  generateMetadata as generateHomeLocaleMetadata,
  generateStaticParams as generateHomeStaticParams
} from "@/app/[locale]/page";
import LocalizedPortfolioPage, { generateMetadata as generatePortfolioLocaleMetadata } from "@/app/[locale]/portfolio/page";

describe("app pages", () => {
  it("renders default pages", async () => {
    render(<HomePage />);
    render(await AboutPage());
    render(<PortfolioPage />);
    render(<ContactPage />);

    expect(screen.getByText("hero-ko")).toBeInTheDocument();
    expect(screen.getByText("about-ko")).toBeInTheDocument();
    expect(screen.getByText("portfolio-ko")).toBeInTheDocument();
    expect(screen.getAllByText("contact-ko").length).toBeGreaterThanOrEqual(1);
  });

  it("renders localized pages", async () => {
    render(await LocalizedHomePage({ params: Promise.resolve({ locale: "en" }) }));
    render(await LocalizedAboutPage({ params: Promise.resolve({ locale: "en" }) }));
    render(await LocalizedPortfolioPage({ params: Promise.resolve({ locale: "en" }) }));
    render(await LocalizedContactPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByText("hero-en")).toBeInTheDocument();
    expect(screen.getByText("about-en")).toBeInTheDocument();
    expect(screen.getByText("portfolio-en")).toBeInTheDocument();
    expect(screen.getAllByText("contact-en").length).toBeGreaterThanOrEqual(1);
  });

  it("generates locale metadata and static params", async () => {
    const homeMd = await generateHomeLocaleMetadata({ params: Promise.resolve({ locale: "ja" }) });
    const aboutMd = await generateAboutLocaleMetadata({ params: Promise.resolve({ locale: "ja" }) });
    const portfolioMd = await generatePortfolioLocaleMetadata({ params: Promise.resolve({ locale: "ja" }) });
    const contactMd = await generateContactLocaleMetadata({ params: Promise.resolve({ locale: "ja" }) });

    expect(homeMd.title).toBeDefined();
    expect(aboutMd.title).toBeDefined();
    expect(portfolioMd.title).toBeDefined();
    expect(contactMd.title).toBeDefined();
    expect(generateHomeStaticParams()).toEqual([{ locale: "ko" }, { locale: "en" }, { locale: "ja" }]);
    expect(generateAboutStaticParams()).toEqual([{ locale: "ko" }, { locale: "en" }, { locale: "ja" }]);
    expect(generateContactStaticParams()).toEqual([{ locale: "ko" }, { locale: "en" }, { locale: "ja" }]);
  });
});
