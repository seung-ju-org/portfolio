import { render } from "@testing-library/react";

import { PortfolioSkeleton } from "@/components/portfolio/portfolio-skeleton";

describe("PortfolioSkeleton", () => {
  it("renders placeholder blocks", () => {
    const { container } = render(<PortfolioSkeleton count={3} />);
    expect(container.querySelectorAll(".rounded-xl").length).toBeGreaterThanOrEqual(3);
  });
});
