import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";

import { env } from "@/lib/env";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient =
  globalThis.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: env.databaseUrl
      }
    }
  });

export const prisma = prismaClient.$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        try {
          return await query(args);
        } catch (error) {
          Sentry.captureException(error, {
            tags: {
              subsystem: "prisma",
              model: String(model ?? "unknown"),
              operation
            }
          });
          throw error;
        }
      }
    }
  }
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}
