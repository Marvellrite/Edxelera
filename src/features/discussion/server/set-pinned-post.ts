import type { SetPinnedPostInput } from "@/features/_shared/types";

export async function setPinnedPost(input: SetPinnedPostInput): Promise<{ postId: string; pinned: boolean }> {
  // TODO: Restrict to instructor/admin and update pin state.
  return { postId: input.postId, pinned: input.pinned };
}