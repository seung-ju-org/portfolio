import Redis from "ioredis";
import * as Sentry from "@sentry/nextjs";

import { env } from "@/lib/env";

let redis: Redis | null = null;
let lastRedisErrorFingerprint = "";
let lastRedisErrorAt = 0;

function shouldReportRedisError(error: Error) {
  const now = Date.now();
  const fingerprint = `${error.name}:${error.message}`;
  if (fingerprint === lastRedisErrorFingerprint && now - lastRedisErrorAt < 60_000) {
    return false;
  }

  lastRedisErrorFingerprint = fingerprint;
  lastRedisErrorAt = now;
  return true;
}

export function getRedisClient() {
  if (redis) return redis;

  redis = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
    lazyConnect: true,
    maxRetriesPerRequest: 1
  });

  redis.on("error", (error) => {
    if (!(error instanceof Error)) return;
    if (!shouldReportRedisError(error)) return;

    Sentry.captureException(error, {
      tags: {
        subsystem: "redis"
      }
    });
  });

  return redis;
}
