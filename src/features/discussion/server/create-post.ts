import type { CreateDiscussionPostInput, DiscussionPost } from "@/features/_shared/types";

export async function createPost(input: CreateDiscussionPostInput): Promise<DiscussionPost> {
  // TODO: Persist top-level discussion post.
  return {
    id: `post_${Date.now()}`,
    authorName: "System",
    authorRole: "student",
    body: input.body,
    createdAtUtc: new Date().toISOString(),
  };
}