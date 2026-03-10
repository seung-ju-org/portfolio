const { redisInstance, redisConstructor } = vi.hoisted(() => ({
  redisInstance: { sentinel: "redis-client" },
  redisConstructor: vi.fn(function RedisMock() {
    return redisInstance;
  })
}));

vi.mock("ioredis", () => ({
  default: redisConstructor
}));

describe("getRedisClient", () => {
  beforeEach(() => {
    vi.resetModules();
    redisConstructor.mockClear();
  });

  it("creates a lazy redis client with env config", async () => {
    process.env.REDIS_HOST = "10.0.0.5";
    process.env.REDIS_PORT = "6380";
    process.env.REDIS_PASSWORD = "secret";

    const { getRedisClient } = await import("@/lib/redis");

    expect(getRedisClient()).toEqual(redisInstance);
    expect(redisConstructor).toHaveBeenCalledWith({
      host: "10.0.0.5",
      port: 6380,
      password: "secret",
      lazyConnect: true,
      maxRetriesPerRequest: 1
    });
  });

  it("reuses the existing singleton client", async () => {
    process.env.REDIS_HOST = "127.0.0.1";
    process.env.REDIS_PORT = "6379";
    process.env.REDIS_PASSWORD = "";

    const { getRedisClient } = await import("@/lib/redis");

    const first = getRedisClient();
    const second = getRedisClient();

    expect(first).toBe(second);
    expect(redisConstructor).toHaveBeenCalledTimes(1);
  });
});
