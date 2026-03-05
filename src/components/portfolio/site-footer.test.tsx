import { render, screen } from "@testing-library/react";

vi.mock("@/components/portfolio/brand", () => ({
  Brand: ({ href }: { href: string }) => <a href={href}>Brand</a>
}));

import { SiteFooter } from "@/components/portfolio/site-footer";

describe("SiteFooter", () => {
  it("renders localized home link and copyright", () => {
    render(<SiteFooter locale="en" />);

    expect(screen.getByRole("link", { name: "Brand" })).toHaveAttribute("href", "/en");
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument();
  });
});
