import { render, screen } from "@testing-library/react";
import type React from "react";

const { getCareerProjectsConnectionFromDb } = vi.hoisted(() => ({
  getCareerProjectsConnectionFromDb: vi.fn(async () => ({
    edges: [],
    pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
    totalCount: 0
  }))
}));

vi.mock("@/lib/project-repository", () => ({
  getCareerProjectsConnectionFromDb
}));

vi.mock("@/components/portfolio/portfolio-relay-content", () => ({
  PortfolioRelayContent: ({ locale }: { locale: string }) => <div>relay:{locale}</div>
}));

import { PortfolioSection } from "@/components/portfolio/portfolio-section";

describe("PortfolioSection", () => {
  it("loads initial connection on server and renders relay content", async () => {
    const element = await PortfolioSection({ locale: "en" });
    render(element as React.ReactElement);

    expect(getCareerProjectsConnectionFromDb).toHaveBeenCalledWith("en", 8, null);
    expect(screen.getByText("relay:en")).toBeInTheDocument();
  });
});
