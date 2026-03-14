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

  it("marks the japanese about section for locale-specific mobile wrapping", () => {
    render(
      <AboutSection
        careerItems={[{ company: "Actbase LLC", position: "Lead", period: "2021年1月 - 2023年9月" }]}
        experienceLabel="経歴: 2019年1月 ~"
        locale="ja"
      />
    );

    expect(screen.getByRole("heading", { name: "About Me" }).closest("section")).toHaveAttribute("data-locale", "ja");
    expect(screen.getByRole("heading", { name: "About Me" }).closest("section")).toHaveAttribute("data-page", "about");
    expect(screen.getByRole("heading", { name: "About Me" }).closest("section")).toHaveAttribute("lang", "ja");
  });
});
