const { getCareerHistoryFromDb } = vi.hoisted(() => ({
  getCareerHistoryFromDb: vi.fn()
}));

vi.mock("@/lib/career-repository", () => ({
  getCareerHistoryFromDb
}));

import { getAboutCareer } from "@/lib/career";

describe("career", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds localized period and experience label", async () => {
    getCareerHistoryFromDb.mockResolvedValue([
      {
        company: "Actbase LLC",
        position: "Lead",
        overview: "overview",
        startDate: new Date(Date.UTC(2021, 0, 1)),
        endDate: new Date(Date.UTC(2023, 8, 1)),
        isOngoing: false,
        displayOrder: 1
      }
    ]);

    const en = await getAboutCareer("en");
    const ja = await getAboutCareer("ja");

    expect(en.experienceLabel).toContain("Career:");
    expect(en.items[0].period).toContain("-");
    expect(ja.experienceLabel).toContain("経歴:");
    expect(ja.items[0].period).toContain("~");
  });

  it("uses ongoing label for each locale", async () => {
    getCareerHistoryFromDb.mockResolvedValue([
      {
        company: "Company",
        position: "Role",
        overview: "overview",
        startDate: new Date(Date.UTC(2024, 0, 1)),
        endDate: null,
        isOngoing: true,
        displayOrder: 1
      }
    ]);

    const ko = await getAboutCareer("ko");
    const en = await getAboutCareer("en");
    const ja = await getAboutCareer("ja");

    expect(ko.items[0].period).toContain("현재");
    expect(en.items[0].period).toContain("Present");
    expect(ja.items[0].period).toContain("現在");
  });

  it("returns empty items when db returns empty", async () => {
    getCareerHistoryFromDb.mockResolvedValueOnce([]);
    const result = await getAboutCareer("ko");

    expect(result.items).toEqual([]);
    expect(result.experienceLabel).toBeNull();
  });

  it("throws when db query fails", async () => {
    getCareerHistoryFromDb.mockRejectedValueOnce(new Error("db down"));
    await expect(getAboutCareer("ko")).rejects.toThrow("db down");
  });
});
