import type { SetPinnedPostInput } from "@/features/_shared/types";
import { discussionStore } from "./get-thread";

export async function setPinnedPost(input: SetPinnedPostInput): Promise<{ postId: string; pinned: boolean }> {
  Object.values(discussionStore).forEach((thread) => {
    thread.posts = thread.posts.map((p) => ({ ...p, isPinned: p.id === input.postId ? input.pinned : false }));
  });
  return { postId: input.postId, pinned: input.pinned };
}
