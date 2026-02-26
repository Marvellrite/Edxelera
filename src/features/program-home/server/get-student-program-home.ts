import type { StudentProgramHome } from "@/features/_shared/types";

export async function getStudentProgramHome(programSlug: string): Promise<StudentProgramHome> {
  // TODO: Load cohort summary, progress, and deadlines.
  return {
    programSlug,
    programTitle: "",
    timezone: "UTC",
    currentWeekNumber: 1,
    enrollmentStatus: "not_enrolled",
    progressPercent: 0,
    courses: [],
    weeks: [],
    upcomingDeadlines: [],
  };
}