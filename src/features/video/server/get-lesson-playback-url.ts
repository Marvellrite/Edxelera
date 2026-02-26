import type { PlaybackUrlResult } from "@/features/_shared/types";
import { signVideoPlaybackPath } from "./signing";

export async function getLessonPlaybackUrl(_programSlug: string, _courseSlug: string, lessonSlug: string): Promise<PlaybackUrlResult> {
  const signed = signVideoPlaybackPath(`protected/videos/${lessonSlug}.mp4`);
  return { lessonSlug, playbackUrl: signed.url, expiresAtUtc: signed.expiresAtUtc };
}
