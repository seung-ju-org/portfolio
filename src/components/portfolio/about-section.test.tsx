import { render, screen } from "@testing-library/react";
import type React from "react";

vi.mock("@/components/reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

import { AboutSection } from "@/components/portfolio/about-section";

describe("AboutSection", () => {
  it("renders localized career section and statement", () => {
    render(
      <AboutSection
        careerItems={[
          { company: "Actbase LLC", position: "Lead", period: "Jan 2021 - Sep 2023" },
          { company: "Naegong", position: "Staff", period: "May 2019 - May 2020" }
        ]}
        experienceLabel="Career: Jan 2019 -"
        locale="en"
      />
    );

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Career")).toBeInTheDocument();
    expect(screen.getByText("Actbase LLC")).toBeInTheDocument();
    expect(screen.getByText("Career: Jan 2019 -")).toBeInTheDocument();
    expect(screen.getByText("Statement")).toBeInTheDocument();
  });
});
