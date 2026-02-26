import type { DiscussionPost, ReplyToPostInput } from "@/features/_shared/types";
import { discussionStore } from "./get-thread";

export async function replyToPost(input: ReplyToPostInput): Promise<DiscussionPost> {
  const reply = { id: `reply_${Date.now()}`, authorName: "Student", authorRole: "student" as const, body: input.body, createdAtUtc: new Date().toISOString(), parentPostId: input.postId };
  Object.values(discussionStore).forEach((thread) => thread.posts.push(reply));
  return reply;
}
