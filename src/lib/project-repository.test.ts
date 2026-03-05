const { redis, prisma } = vi.hoisted(() => ({
  redis: {
    get: vi.fn(),
    set: vi.fn()
  },
  prisma: {
    project: {
      findMany: vi.fn(),
      count: vi.fn()
    }
  }
}));

vi.mock("@/lib/redis", () => ({
  getRedisClient: () => redis
}));

vi.mock("@/lib/prisma", () => ({
  prisma
}));

import {
  getCareerProjectCountFromDb,
  getCareerProjectsConnectionFromDb,
  getCareerProjectsFromDb
} from "@/lib/project-repository";

function buildDbProject(id: string, title: string) {
  return {
    id,
    startDate: new Date(Date.UTC(2024, 0, 1)),
    endDate: new Date(Date.UTC(2024, 1, 1)),
    isOngoing: false,
    links: [{ label: "Site", url: "https://example.com" }, { label: 1 }],
    translations: [
      {
        locale: "KO",
        title: `${title} KO`,
        company: "회사",
        role: "개발",
        achievements: ["A", "B", 1]
      }
    ],
    technologies: [
      { displayOrder: 2, technology: { name: "React" } },
      { displayOrder: 1, technology: { name: "Next.js" } }
    ]
  };
}

describe("project-repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns cached project list when redis has data", async () => {
    redis.get.mockResolvedValueOnce(
      JSON.stringify([
        {
          id: "cached-id",
          title: "Cached Project",
          period: "2024.01 ~ 2024.02",
          role: "Role",
          achievements: [],
          stack: "Next.js"
        }
      ])
    );

    const result = await getCareerProjectsFromDb("ko");
    expect(result[0].id).toBe("cached-id");
    expect(prisma.project.findMany).not.toHaveBeenCalled();
  });

  it("maps db records and writes cache on miss", async () => {
    redis.get.mockResolvedValueOnce(null);
    prisma.project.findMany.mockResolvedValueOnce([buildDbProject("db-1", "프로젝트")]);

    const result = await getCareerProjectsFromDb("ja");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "db-1",
      title: "프로젝트 KO",
      company: "회사",
      role: "개발",
      period: "2024.01 ~ 2024.02",
      stack: "Next.js, React",
      achievements: ["A", "B"],
      links: [{ label: "Site", url: "https://example.com" }]
    });
    expect(redis.set).toHaveBeenCalledTimes(1);
  });

  it("returns cached count and skips db", async () => {
    redis.get.mockResolvedValueOnce("22");
    const count = await getCareerProjectCountFromDb();
    expect(count).toBe(22);
    expect(prisma.project.count).not.toHaveBeenCalled();
  });

  it("builds connection with pagination info and clamped first", async () => {
    redis.get.mockResolvedValueOnce(null);
    prisma.project.findMany.mockResolvedValueOnce([
      buildDbProject("id-1", "One"),
      buildDbProject("id-2", "Two")
    ]);
    prisma.project.count.mockResolvedValueOnce(2);

    const result = await getCareerProjectsConnectionFromDb("en", 1);

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 2
      })
    );
    expect(result.pageInfo.hasNextPage).toBe(true);
    expect(result.edges).toHaveLength(1);
    expect(result.pageInfo.startCursor).toBe("id-1");
    expect(result.totalCount).toBe(2);
  });

  it("clamps oversized first to 24", async () => {
    redis.get.mockResolvedValueOnce(null);
    prisma.project.findMany.mockResolvedValueOnce([buildDbProject("id-1", "One")]);
    prisma.project.count.mockResolvedValueOnce(1);

    await getCareerProjectsConnectionFromDb("ko", 999);

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 25
      })
    );
  });
});
