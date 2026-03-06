describe("career empty fallback", () => {
  it("returns empty items and null experience label when db has no rows", async () => {
    vi.resetModules();

    vi.doMock("@/lib/career-repository", () => ({
      getCareerHistoryFromDb: vi.fn(async () => [])
    }));

    const { getAboutCareer } = await import("@/lib/career");
    const result = await getAboutCareer("en");

    expect(result.experienceLabel).toBeNull();
    expect(result.items).toEqual([]);
  });
});
