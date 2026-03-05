vi.mock("@/lib/project-repository", () => ({
  getCareerProjectsFromDb: vi.fn(async () => [
    {
      id: "id-1",
      title: "Project 1",
      company: "Company",
      period: "2024.01 ~ 2024.02",
      role: "Frontend",
      stack: "Next.js",
      achievements: ["A"],
      links: [{ label: "site", url: "https://example.com" }]
    }
  ]),
  getCareerProjectsConnectionFromDb: vi.fn(async () => ({
    edges: [
      {
        cursor: "id-1",
        node: {
          id: "id-1",
          title: "Project 1",
          company: "Company",
          period: "2024.01 ~ 2024.02",
          role: "Frontend",
          stack: "Next.js",
          achievements: ["A"],
          links: []
        }
      }
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "id-1",
      endCursor: "id-1"
    },
    totalCount: 1
  })),
  getCareerProjectCountFromDb: vi.fn(async () => 1)
}));

import { POST } from "@/app/api/graphql/route";

async function graphqlRequest(query: string) {
  const request = new Request("http://localhost/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query })
  });
  return POST(request);
}

describe("POST /api/graphql", () => {
  it("returns projects list", async () => {
    const response = await graphqlRequest(`
      query {
        projects(locale: KO) {
          id
          title
          links {
            label
            url
          }
        }
      }
    `);

    expect(response.status).toBe(200);
    const data = (await response.json()) as {
      data: { projects: Array<{ id: string; title: string; links: Array<{ label: string; url: string }> }> };
    };
    expect(data.data.projects[0]).toEqual({
      id: "id-1",
      title: "Project 1",
      links: [{ label: "site", url: "https://example.com" }]
    });
  });

  it("returns projectsConnection and projectCount", async () => {
    const response = await graphqlRequest(`
      query {
        projectsConnection(locale: EN, first: 8) {
          totalCount
          edges {
            cursor
            node {
              id
              title
            }
          }
        }
        projectCount
      }
    `);

    expect(response.status).toBe(200);
    const data = (await response.json()) as {
      data: {
        projectsConnection: {
          totalCount: number;
          edges: Array<{ cursor: string; node: { id: string; title: string } }>;
        };
        projectCount: number;
      };
    };
    expect(data.data.projectsConnection.totalCount).toBe(1);
    expect(data.data.projectsConnection.edges[0]).toEqual({
      cursor: "id-1",
      node: { id: "id-1", title: "Project 1" }
    });
    expect(data.data.projectCount).toBe(1);
  });
});
