import type { StudentProgramHome } from "@/features/_shared/types";
import { demoCourses, demoProgram, demoWeeks } from "@/features/_shared/contract-data";
import { isWeekUnlocked } from "@/features/_shared/unlock";

export async function getStudentProgramHome(programSlug: string): Promise<StudentProgramHome> {
  const now = new Date();
  const weeks = demoWeeks.map((w) => ({
    weekNumber: w.weekNumber,
    title: w.title,
    unlockState: isWeekUnlocked({ opensAt: w.opensAt, now }).unlocked ? "unlocked" as const : "locked" as const,
    releaseAtUtc: w.opensAt,
  }));
  return {
    programSlug,
    programTitle: demoProgram.title,
    timezone: demoProgram.timezone,
    currentWeekNumber: weeks.filter((w) => w.unlockState === "unlocked").at(-1)?.weekNumber ?? 1,
    enrollmentStatus: "active",
    progressPercent: 33,
    courses: demoCourses.map((c) => ({ courseSlug: c.slug, title: c.title, percentComplete: c.slug === "javascript" ? 50 : 0, completedLessons: c.slug === "javascript" ? 1 : 0, totalLessons: c.slug === "javascript" ? 2 : 1 })),
    weeks,
    upcomingDeadlines: [],
  };
}
