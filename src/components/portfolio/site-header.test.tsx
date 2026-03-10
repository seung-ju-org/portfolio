/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  )
}));

vi.mock("next/image", () => ({
  default: ({ alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    const safeProps = { ...props };
    Reflect.deleteProperty(safeProps, "priority");
    return <img alt={alt} {...safeProps} />;
  }
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/about"
}));

vi.mock("@/components/portfolio/brand", () => ({
  Brand: ({ href }: { href: string }) => <a href={href}>Brand</a>
}));

vi.mock("@/components/portfolio/locale-switcher", () => ({
  LocaleSwitcher: () => <div>LocaleSwitcher</div>
}));

vi.mock("@/components/portfolio/theme-toggle", () => ({
  ThemeToggle: () => <div>ThemeToggle</div>
}));

import { SiteHeader } from "@/components/portfolio/site-header";

describe("SiteHeader", () => {
  it("renders nav and opens mobile menu", () => {
    render(<SiteHeader locale="en" />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
  });

  it("closes the mobile menu from close button and nav click", () => {
    const { container } = render(<SiteHeader locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(container.querySelector("aside")).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getAllByRole("link", { name: "Contact Me" })[1]);
    expect(container.querySelector("aside")).toHaveAttribute("aria-hidden", "true");
  });
});
