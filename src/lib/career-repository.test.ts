const { prisma } = vi.hoisted(() => ({
  prisma: {
    career: {
      findMany: vi.fn()
    }
  }
}));

vi.mock("@/lib/prisma", () => ({
  prisma
}));

import { getCareerHistoryFromDb } from "@/lib/career-repository";

describe("career-repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns localized translation by locale", async () => {
    prisma.career.findMany.mockResolvedValueOnce([
      {
        company: "액트베이스유한책임회사",
        position: "팀장",
        overview: "ko overview",
        startDate: new Date("2021-01-01T00:00:00.000Z"),
        endDate: new Date("2023-09-01T00:00:00.000Z"),
        isOngoing: false,
        displayOrder: 1,
        translations: [
          { locale: "KO", company: "액트베이스유한책임회사", position: "팀장", overview: "ko overview" },
          { locale: "EN", company: "Actbase LLC", position: "Lead", overview: "en overview" }
        ]
      }
    ]);

    const rows = await getCareerHistoryFromDb("en");
    expect(rows[0]).toMatchObject({
      company: "Actbase LLC",
      position: "Lead",
      overview: "en overview"
    });
  });
});
