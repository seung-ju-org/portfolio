import { render, screen } from "@testing-library/react";
import type React from "react";

import { LocaleSwitcher } from "@/components/portfolio/locale-switcher";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/portfolio"
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  )
}));

describe("LocaleSwitcher", () => {
  it("renders locale links and highlights active locale", () => {
    render(<LocaleSwitcher locale="en" />);

    const ko = screen.getByRole("link", { name: "KO" });
    const en = screen.getByRole("link", { name: "EN" });
    const ja = screen.getByRole("link", { name: "JA" });

    expect(ko).toHaveAttribute("href", "/ko/portfolio");
    expect(en).toHaveAttribute("href", "/en/portfolio");
    expect(ja).toHaveAttribute("href", "/ja/portfolio");
    expect(en.className).toContain("bg-primary");
  });
});
