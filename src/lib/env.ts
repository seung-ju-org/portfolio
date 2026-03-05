const databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/portfolio?schema=public";

export const env = {
  databaseUrl,
  redis: {
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? ""
  }
};
