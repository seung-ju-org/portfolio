import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("react-masonry-css", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="masonry">{children}</div>
}));

vi.mock("@/components/reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

import { PortfolioMasonry } from "@/components/portfolio/portfolio-masonry";

describe("PortfolioMasonry", () => {
  it("renders project cards with labels and links", () => {
    render(
      <PortfolioMasonry
        labels={{
          companyLabel: "Company",
          periodLabel: "Period",
          roleLabel: "Role",
          stackLabel: "Stack",
          achievementsLabel: "Achievements"
        }}
        projects={[
          {
            id: "p1",
            title: "Project One",
            company: "Acme",
            period: "2024.01 ~ 2024.02",
            role: "Frontend",
            stack: "Next.js",
            achievements: ["Built UI"],
            links: [{ label: "Service", url: "https://example.com" }]
          }
        ]}
      />
    );

    expect(screen.getByTestId("masonry")).toBeInTheDocument();
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Company: Acme")).toBeInTheDocument();
    expect(screen.getByText("Period:")).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("Built UI"))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Service" })).toHaveAttribute("href", "https://example.com");
  });
});
