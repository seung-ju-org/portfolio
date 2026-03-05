import { PrismaClient } from "@prisma/client";

import { env } from "@/lib/env";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: env.databaseUrl
      }
    }
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
