describe("career empty fallback", () => {
  it("returns empty items and null experience label when both db and fallback are empty", async () => {
    vi.resetModules();

    vi.doMock("@/lib/career-repository", () => ({
      getCareerHistoryFromDb: vi.fn(async () => [])
    }));
    vi.doMock("@/lib/career-history", () => ({
      careerHistory: []
    }));

    const { getAboutCareer } = await import("@/lib/career");
    const result = await getAboutCareer("en");

    expect(result.experienceLabel).toBeNull();
    expect(result.items).toEqual([]);
  });
});
