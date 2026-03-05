import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  )
}));

vi.mock("@/components/reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
}));

vi.mock("@/lib/projects", () => ({
  getCareerProjectCount: vi.fn(async () => 21)
}));

import { HeroSection } from "@/components/portfolio/hero-section";

describe("HeroSection", () => {
  it("renders hero with project count and no contact CTA button", async () => {
    const element = await HeroSection({ locale: "ko" });
    render(element);

    expect(screen.getByRole("heading", { name: /기술을 연결하고/i })).toBeInTheDocument();
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /프로젝트 보기/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /문의하기/i })).not.toBeInTheDocument();
  });
});
