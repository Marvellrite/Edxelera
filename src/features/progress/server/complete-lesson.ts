import type { CompleteLessonInput, CompleteLessonResult } from "@/features/_shared/types";
import { getCourseProgress } from "./get-course-progress";

export async function completeLesson(input: CompleteLessonInput): Promise<CompleteLessonResult> {
  const progress = await getCourseProgress(input.courseSlug);
  return { courseSlug: input.courseSlug, lessonSlug: input.lessonSlug, completed: true, coursePercentComplete: Math.min(progress.percentComplete + 50, 100) };
}
