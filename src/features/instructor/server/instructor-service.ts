import { discussionStore } from "@/features/discussion/server/get-thread";
import type { DiscussionPost, ProgramDTO } from "@/features/_shared/types";
import { toProgramDTO, programStore } from "@/features/programs/server/program-contract";
import { instructorProgramsByUserId, weekStore } from "@/features/admin/server/store";

export function ensureInstructorProgramAccess(userId: string, programSlug: string) {
  return (instructorProgramsByUserId[userId] ?? []).includes(programSlug);
}

export async function listInstructorPrograms(userId: string): Promise<ProgramDTO[]> {
  const allowed = new Set(instructorProgramsByUserId[userId] ?? []);
  return programStore.filter((p) => allowed.has(p.slug)).map(toProgramDTO);
}

export async function setWeekPinnedPost(programSlug: string, weekNumber: number, postId: string) {
  const week = weekStore.find((w) => w.programSlug === programSlug && w.weekNumber === weekNumber);
  if (!week) return null;
  week.pinnedPostId = postId;
  return { programSlug, weekNumber, postId };
}

export async function updateWeekAssignment(programSlug: string, weekNumber: number, input: { title?: string; brief?: string; deadlineUtc?: string }) {
  const week = weekStore.find((w) => w.programSlug === programSlug && w.weekNumber === weekNumber);
  if (!week) return null;
  if (input.title) week.assignmentTitle = input.title;
  if (input.brief !== undefined) week.assignmentBrief = input.brief;
  if (input.deadlineUtc !== undefined) week.assignmentDeadlineUtc = input.deadlineUtc;
  return { programSlug, weekNumber, title: week.assignmentTitle, brief: week.assignmentBrief, deadlineUtc: week.assignmentDeadlineUtc };
}

export async function updateWeekLiveSession(programSlug: string, weekNumber: number, input: { title?: string; joinUrl?: string; startUtc?: string }) {
  const week = weekStore.find((w) => w.programSlug === programSlug && w.weekNumber === weekNumber);
  if (!week) return null;
  if (input.title) week.liveTitle = input.title;
  if (input.joinUrl !== undefined) week.liveSessionLink = input.joinUrl;
  if (input.startUtc !== undefined) week.liveSessionStartUtc = input.startUtc;
  return { programSlug, weekNumber, title: week.liveTitle, joinUrl: week.liveSessionLink, startUtc: week.liveSessionStartUtc };
}

export async function moderateDiscussionPost(postId: string, action: "hide" | "delete"): Promise<DiscussionPost | null> {
  for (const thread of Object.values(discussionStore)) {
    const post = thread.posts.find((entry) => entry.id === postId);
    if (post) {
      if (action === "hide") {
        post.body = "[hidden by instructor]";
        return post;
      }
      thread.posts = thread.posts.filter((entry) => entry.id !== postId);
      return post;
    }
  }
  return null;
}
