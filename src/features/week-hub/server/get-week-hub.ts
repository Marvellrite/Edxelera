import type { WeekHub } from "@/features/_shared/types";
import { demoLessons, demoWeeks } from "@/features/_shared/contract-data";
import { isLessonUnlocked, isWeekUnlocked } from "@/features/_shared/unlock";

export async function getWeekHub(programSlug: string, weekNumber: number): Promise<WeekHub> {
  const week = demoWeeks.find((w) => w.weekNumber === weekNumber) ?? demoWeeks[0];
  const weekState = isWeekUnlocked({ opensAt: week.opensAt, now: new Date() });
  const completed = ["js-basics"];
  return {
    programSlug,
    weekNumber,
    title: week.title,
    released: weekState.unlocked,
    releaseAtUtc: week.opensAt,
    lessons: demoLessons.filter((l) => l.weekNumber === weekNumber).map((l) => ({
      courseSlug: l.courseSlug,
      lessonSlug: l.slug,
      title: l.title,
      durationSeconds: l.durationSeconds,
      prerequisiteLessonSlugs: l.prerequisites,
      hasVideo: true,
      unlockState: isLessonUnlocked({ prerequisiteSlugs: l.prerequisites, completedLessonSlugs: completed, weekUnlocked: weekState.unlocked }).unlocked ? "unlocked" : "locked",
    })),
    discussionThreadId: `${programSlug}-w${weekNumber}`,
  };
}
