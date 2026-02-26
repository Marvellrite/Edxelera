import { addSeconds, toIso } from "./time";
import { env } from "./env";

export function signCloudFrontPath(path: string) {
  // TODO: Replace with real CloudFront signed URL generation.
  const expiresAt = addSeconds(new Date(), env.cloudFrontSignedUrlTtlSeconds);
  const base = env.cloudFrontDomain ? `https://${env.cloudFrontDomain}` : "https://example.invalid";
  return {
    url: `${base}/${path.replace(/^\/+/, "")}`,
    expiresAtUtc: toIso(expiresAt),
  };
}