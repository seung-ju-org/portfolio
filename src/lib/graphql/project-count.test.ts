const { graphqlMock } = vi.hoisted(() => ({
  graphqlMock: vi.fn()
}));

vi.mock("graphql", async () => {
  const actual = await vi.importActual<typeof import("graphql")>("graphql");

  return {
    ...actual,
    graphql: graphqlMock
  };
});

describe("getProjectCountViaGraphql", () => {
  beforeEach(() => {
    graphqlMock.mockReset();
    vi.resetModules();
  });

  it("returns projectCount when graphql responds successfully", async () => {
    graphqlMock.mockResolvedValue({
      data: {
        projectCount: 21
      }
    });

    const { getProjectCountViaGraphql } = await import("@/lib/graphql/project-count");

    await expect(getProjectCountViaGraphql()).resolves.toBe(21);
  });

  it("returns 0 when graphql responds with errors", async () => {
    const { GraphQLError } = await import("graphql");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    graphqlMock.mockResolvedValue({
      data: {
        projectCount: null
      },
      errors: [new GraphQLError("failed")]
    });

    const { getProjectCountViaGraphql } = await import("@/lib/graphql/project-count");

    await expect(getProjectCountViaGraphql()).resolves.toBe(0);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it("returns 0 when graphql throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    graphqlMock.mockRejectedValue(new Error("network down"));

    const { getProjectCountViaGraphql } = await import("@/lib/graphql/project-count");

    await expect(getProjectCountViaGraphql()).resolves.toBe(0);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
