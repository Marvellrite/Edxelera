import type { CompleteLessonInput, CompleteLessonResult } from "@/features/_shared/types";

export async function completeLesson(input: CompleteLessonInput): Promise<CompleteLessonResult> {
  // TODO: Enforce unlock checks, mark idempotently, and recalculate course progress.
  return {
    courseSlug: input.courseSlug,
    lessonSlug: input.lessonSlug,
    completed: true,
    coursePercentComplete: 0,
  };
}