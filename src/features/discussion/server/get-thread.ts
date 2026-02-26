import type { DiscussionThread } from "@/features/_shared/types";

export async function getDiscussionThread(programSlug: string, weekNumber: number): Promise<DiscussionThread> {
  // TODO: Load weekly thread + posts.
  return {
    threadId: `${programSlug}-w${weekNumber}`,
    programSlug,
    weekNumber,
    title: `Week ${weekNumber} Discussion`,
    posts: [],
  };
}