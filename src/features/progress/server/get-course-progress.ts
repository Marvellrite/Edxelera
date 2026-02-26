import type { CourseProgress } from "@/features/_shared/types";

export async function getCourseProgress(courseSlug: string): Promise<CourseProgress> {
  // TODO: Load lesson states and completion summary for authenticated user.
  return {
    courseSlug,
    percentComplete: 0,
    completedLessons: 0,
    totalLessons: 0,
    lessons: [],
  };
}