import Redis from "ioredis";
import { env } from "./env";

let redis: Redis | null = null;

export async function getRedisClient() {
  if (!redis) redis = new Redis(env.redisUrl, { maxRetriesPerRequest: 1, lazyConnect: true });
  if (redis.status === "wait") await redis.connect();
  return redis;
}

export async function withRateLimit(key: string, limit: number, windowSeconds: number) {
  const client = await getRedisClient();
  const count = await client.incr(key);
  if (count === 1) await client.expire(key, windowSeconds);
  return { allowed: count <= limit, remaining: Math.max(limit - count, 0) };
}
