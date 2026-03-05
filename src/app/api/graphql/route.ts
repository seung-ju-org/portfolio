import { createYoga } from "graphql-yoga";

import { schema } from "@/lib/graphql/schema";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  landingPage: process.env.NODE_ENV !== "production"
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export { yoga as GET, yoga as POST };
