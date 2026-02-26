export function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value == null || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  appUrl: process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  authSecret: process.env.AUTH_SECRET ?? "dev-secret",
  redisUrl: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY ?? "",
  paystackWebhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET ?? "",
  cloudFrontDomain: process.env.CLOUDFRONT_DOMAIN ?? "",
  cloudFrontKeyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID ?? "",
  cloudFrontPrivateKeyBase64: process.env.CLOUDFRONT_PRIVATE_KEY_BASE64 ?? "",
  cloudFrontSignedUrlTtlSeconds: Number(process.env.CLOUDFRONT_SIGNED_URL_TTL_SECONDS ?? 300),
};