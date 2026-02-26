import type { DiscussionPost, ReplyToPostInput } from "@/features/_shared/types";

export async function replyToPost(input: ReplyToPostInput): Promise<DiscussionPost> {
  // TODO: Persist reply post with parent linkage.
  return {
    id: `reply_${Date.now()}`,
    authorName: "System",
    authorRole: "student",
    body: input.body,
    createdAtUtc: new Date().toISOString(),
    parentPostId: input.postId,
  };
}