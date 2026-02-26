import type { DiscussionThread } from "@/features/_shared/types";

const store: Record<string, DiscussionThread> = {};

export async function getDiscussionThread(programSlug: string, weekNumber: number): Promise<DiscussionThread> {
  const key = `${programSlug}-${weekNumber}`;
  if (!store[key]) {
    store[key] = { threadId: key, programSlug, weekNumber, title: `Week ${weekNumber} Discussion`, posts: [] };
  }
  return store[key];
}

export { store as discussionStore };
