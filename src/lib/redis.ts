import Redis from "ioredis";

import { env } from "@/lib/env";

let redis: Redis | null = null;

export function getRedisClient() {
  if (redis) return redis;

  redis = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
    lazyConnect: true,
    maxRetriesPerRequest: 1
  });

  return redis;
}
