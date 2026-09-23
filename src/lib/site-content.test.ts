import { describe, expect, it } from "vitest";
import { getSiteContent } from "@/lib/site-content";

describe("site content", () => {
  it("contains the current professional history in every locale", () => {
    for (const locale of ["ko", "en", "ja"] as const) {
      const content = getSiteContent(locale);
      expect(content.careers).toHaveLength(5);
      expect(content.careers.map((career) => career.company)).toContain("유니코아");
      expect(content.capabilities).toHaveLength(4);
      expect(content.education).toHaveLength(2);
      expect(content.projects).toHaveLength(23);
      expect(
        content.projects.find(
          (project) =>
            project.title.includes("ENSolution") ||
            project.title.includes("이엔솔루션") ||
            project.title.includes("ENメディア")
        )?.period
      ).toContain("2025.09");
    }
    expect(getSiteContent("ko").careers.find((career) => career.company === "프리랜서")?.employment).toBe("개인 외주");
    expect(getSiteContent("en").profile.email).toBe("seung-ju@seung-ju.com");
    const projects = getSiteContent("ko").projects;
    expect(projects.find((project) => project.id === "1")?.period).toBe("2022.11 ~ 2023.03");
    expect(projects.find((project) => project.id === "2")?.period).toBe("2023.01 ~ 2023.04");
    expect(projects.find((project) => project.id === "8")?.period).toBe("2021.09 ~ 2022.03");
    expect(projects.find((project) => project.id === "10")?.period).toBe("2023.06 ~ 2023.09");
  });
});
