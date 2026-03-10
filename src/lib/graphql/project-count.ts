import { graphql } from "graphql";

import { schema } from "@/lib/graphql/schema";

const PROJECT_COUNT_QUERY = /* GraphQL */ `
  query HomeProjectCount {
    projectCount
  }
`;

export async function getProjectCountViaGraphql(): Promise<number> {
  try {
    const result = await graphql({
      schema,
      source: PROJECT_COUNT_QUERY
    });

    if (result.errors?.length || typeof result.data?.projectCount !== "number") {
      throw new Error(result.errors?.[0]?.message ?? "Failed to load project count.");
    }

    return result.data.projectCount;
  } catch (error) {
    console.error("Failed to load project count via GraphQL:", error);
    return 0;
  }
}
