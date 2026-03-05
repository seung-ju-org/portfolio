import { createSchema } from "graphql-yoga";

import { getCareerProjectCountFromDb, getCareerProjectsConnectionFromDb, getCareerProjectsFromDb } from "@/lib/project-repository";

const typeDefs = /* GraphQL */ `
  enum Locale {
    KO
    EN
    JA
  }

  type ProjectLink {
    label: String!
    url: String!
  }

  type Project {
    id: ID!
    title: String!
    company: String
    period: String!
    role: String!
    achievements: [String!]!
    stack: String!
    links: [ProjectLink!]!
  }

  type Query {
    projects(locale: Locale = KO): [Project!]!
    projectsConnection(locale: Locale = KO, first: Int = 8, after: String): ProjectConnection!
    projectCount: Int!
  }

  type ProjectEdge {
    cursor: String!
    node: Project!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type ProjectConnection {
    edges: [ProjectEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
`;

type GraphqlLocale = "KO" | "EN" | "JA";

const localeMap: Record<GraphqlLocale, "ko" | "en" | "ja"> = {
  KO: "ko",
  EN: "en",
  JA: "ja"
};

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      projects: async (_parent, args: { locale?: GraphqlLocale }) => {
        const locale = localeMap[args.locale ?? "KO"];
        const projects = await getCareerProjectsFromDb(locale);
        return projects.map((project) => ({
          ...project,
          id: String(project.id),
          links: project.links ?? []
        }));
      },
      projectsConnection: async (_parent, args: { locale?: GraphqlLocale; first?: number; after?: string | null }) => {
        const locale = localeMap[args.locale ?? "KO"];
        const connection = await getCareerProjectsConnectionFromDb(locale, args.first ?? 8, args.after ?? null);
        return {
          ...connection,
          edges: connection.edges.map((edge) => ({
            cursor: edge.cursor,
            node: {
              ...edge.node,
              id: String(edge.node.id),
              links: edge.node.links ?? []
            }
          }))
        };
      },
      projectCount: async () => getCareerProjectCountFromDb()
    }
  }
});
