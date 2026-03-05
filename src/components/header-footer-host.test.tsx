import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/about"
}));

vi.mock("@/components/portfolio/site-header", () => ({
  SiteHeader: ({ locale }: { locale: string }) => <div>header-{locale}</div>
}));

vi.mock("@/components/portfolio/site-footer", () => ({
  SiteFooter: ({ locale }: { locale: string }) => <div>footer-{locale}</div>
}));

import { FooterHost } from "@/components/footer-host";
import { HeaderHost } from "@/components/header-host";

describe("Header/Footer host", () => {
  it("passes locale from pathname to header/footer", () => {
    render(
      <>
        <HeaderHost />
        <FooterHost />
      </>
    );

    expect(screen.getByText("header-en")).toBeInTheDocument();
    expect(screen.getByText("footer-en")).toBeInTheDocument();
  });
});
