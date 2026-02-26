import type { CourseProgress } from "@/features/_shared/types";
import { demoLessons } from "@/features/_shared/contract-data";

export async function getCourseProgress(courseSlug: string): Promise<CourseProgress> {
  const lessons = demoLessons.filter((l) => l.courseSlug === courseSlug);
  const completed = ["js-basics"];
  const completedCount = lessons.filter((l) => completed.includes(l.slug)).length;
  return {
    courseSlug,
    percentComplete: lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0,
    completedLessons: completedCount,
    totalLessons: lessons.length,
    lessons: lessons.map((l) => ({ lessonSlug: l.slug, title: l.title, completed: completed.includes(l.slug), unlockState: "unlocked" })),
  };
}
