import { render, screen } from "@testing-library/react";
import type React from "react";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(() => "/")
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  )
}));

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock()
}));

import NotFound from "@/app/not-found";

describe("NotFound", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/");
  });

  it("renders 404 page home link", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "홈으로 이동" })).toHaveAttribute("href", "/ko");
  });

  it("renders english copy for english locale path", () => {
    usePathnameMock.mockReturnValue("/en/missing-page");
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to Home" })).toHaveAttribute("href", "/en");
  });
});
