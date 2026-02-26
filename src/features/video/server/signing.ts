import { signCloudFrontPath } from "@/lib/server/cloudfront";

export function signVideoPlaybackPath(cloudFrontPath: string) {
  return signCloudFrontPath(cloudFrontPath);
}