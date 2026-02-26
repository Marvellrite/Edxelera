import type { CreateDiscussionPostInput, DiscussionPost } from "@/features/_shared/types";
import { discussionStore } from "./get-thread";

export async function createPost(input: CreateDiscussionPostInput): Promise<DiscussionPost> {
  const key = `${input.programSlug}-${input.weekNumber}`;
  const thread = discussionStore[key] ?? { threadId: key, programSlug: input.programSlug, weekNumber: input.weekNumber, title: `Week ${input.weekNumber} Discussion`, posts: [] };
  const post = { id: `post_${Date.now()}`, authorName: "Student", authorRole: "student" as const, body: input.body, createdAtUtc: new Date().toISOString() };
  thread.posts.unshift(post);
  discussionStore[key] = thread;
  return post;
}
