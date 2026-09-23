import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { getSiteContent } from "@/lib/site-content";
import { evidenceProjects } from "@/lib/project-evidence";

describe("site content", () => {
  it("contains the current professional history in every locale", () => {
    for (const locale of ["ko", "en", "ja"] as const) {
      const content = getSiteContent(locale);
      expect(content.careers).toHaveLength(5);
      expect(content.careers.map((career) => career.company)).toContain("유니코아");
      expect(content.capabilities).toHaveLength(4);
      expect(content.education).toHaveLength(2);
      expect(content.projects).toHaveLength(46);
      expect(new Set(content.projects.map((project) => project.id)).size).toBe(content.projects.length);
      for (const project of content.projects.filter((item) => item.image)) {
        expect(project.image?.alt.trim()).not.toBe("");
        expect(project.image?.caption.trim()).not.toBe("");
      }
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
    expect(projects.find((project) => project.id === "1")?.period).toBe("2021.09–2022.03 / 2022.11–2023.03");
    expect(projects.find((project) => project.id === "2")?.period).toBe("2023.01 ~ 2023.04");
    expect(projects.find((project) => project.id === "8")).toBeUndefined();
    expect(projects.find((project) => project.id === "10")?.period).toBe("2023.06 ~ 2023.09");
  });

  it("localizes the capability cards instead of leaving Korean on /en and /ja", () => {
    for (const locale of ["en", "ja"] as const) {
      for (const capability of getSiteContent(locale).capabilities) {
        expect(`${capability.title} ${capability.description}`).not.toMatch(/[가-힣]/);
      }
    }
    expect(getSiteContent("ja").capabilities[0]?.title).toBe("Web・アプリ");
    expect(getSiteContent("en").capabilities[1]?.description).toBe("Service APIs and data processing");
  });

  it("localizes every evidence project without Korean fallback copy", () => {
    const ids = evidenceProjects.ko.map((project) => project.id);
    expect(evidenceProjects.en.map((project) => project.id)).toEqual(ids);
    expect(evidenceProjects.ja.map((project) => project.id)).toEqual(ids);
    for (const locale of ["en", "ja"] as const) {
      for (const project of evidenceProjects[locale]) {
        expect(`${project.title} ${project.role} ${project.achievements.join(" ")}`).not.toMatch(/[가-힣]/);
        if (project.image) {
          expect(project.image.alt).not.toMatch(/[가-힣]/);
          expect(project.image.caption).not.toMatch(/[가-힣]/);
          expect(project.image.provenance).not.toMatch(/[가-힣]/);
        }
      }
    }
    expect(evidenceProjects.ja.find((project) => project.id === "dear-app-design-2018")?.role).toContain("グループ");
    for (const locale of ["ko", "en", "ja"] as const) {
      for (const id of ["dear-app-design-2018", "dear-my-pet-poster-2018"]) {
        const project = evidenceProjects[locale].find((item) => item.id === id);
        expect(project?.company).toBe(
          locale === "ko" ? "디자인 그룹 과제" : locale === "en" ? "Group design assignment" : "グループデザイン課題"
        );
        expect(`${project?.role} ${project?.achievements.join(" ")} ${project?.image?.caption}`).toMatch(
          locale === "ko" ? /그룹/ : locale === "en" ? /Group/ : /グループ/
        );
      }
    }
    expect(evidenceProjects.ja.find((project) => project.id === "prismabook-2020")?.achievements.join(" ")).toContain(
      "Facebook"
    );
    expect(new Set(evidenceProjects.ja.map((project) => project.achievements.join(" "))).size).toBeGreaterThan(10);
  });

  it("orders the portfolio by recorded start date and localizes ongoing periods", () => {
    const projects = getSiteContent("ko").projects;
    const starts = projects.map((project) => {
      const match = project.period.match(/(\d{4})(?:\.(\d{2}))?/);
      return match ? Number(match[1]) * 100 + Number(match[2] ?? 0) : 0;
    });
    expect(starts).toEqual([...starts].sort((left, right) => right - left));
    for (const locale of ["ko", "en", "ja"] as const) {
      expect(getSiteContent(locale).projects.find((project) => project.id === "brassone")?.period).toBe(
        "2026.03–2026.06"
      );
    }
    expect(getSiteContent("ja").projects.find((project) => project.id === "unicorea-payment")?.period).toBe(
      "2026.04–現在"
    );
    const categories = getSiteContent("ko").projects.reduce<Record<string, number>>((counts, project) => {
      const category = project.category ?? "work";
      counts[category] = (counts[category] ?? 0) + 1;
      return counts;
    }, {});
    expect(categories).toEqual({ work: 25, design: 13, archive: 2, opensource: 6 });
    expect(getSiteContent("ko").projects.filter((project) => project.image)).toHaveLength(18);
  });

  it("references existing local images", () => {
    for (const project of getSiteContent("ko").projects) {
      if (!project.image) continue;
      const imagePath = resolve(process.cwd(), "public", project.image.src.replace(/^\//, ""));
      expect(existsSync(imagePath)).toBe(true);
    }
  });
});
