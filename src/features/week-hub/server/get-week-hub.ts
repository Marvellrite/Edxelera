import type { WeekHub } from "@/features/_shared/types";

export async function getWeekHub(programSlug: string, weekNumber: number): Promise<WeekHub> {
  // TODO: Enforce calendar release and prerequisite unlocks.
  return {
    programSlug,
    weekNumber,
    title: `Week ${weekNumber}`,
    released: false,
    releaseAtUtc: new Date(0).toISOString(),
    lessons: [],
  };
}