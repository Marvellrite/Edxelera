import type { CanEnrollResult } from "@/features/_shared/types";
import { demoProgram, demoWeeks } from "@/features/_shared/contract-data";

export async function canEnroll(programSlug: string): Promise<CanEnrollResult> {
  const now = new Date();
  const start = new Date(demoProgram.startDate);
  const closeAt = new Date(start.getTime() - demoProgram.enrollmentCloseHours * 3600_000);
  const lateJoinEnds = new Date(start.getTime() + demoProgram.lateJoinDays * 86400_000);
  const week2Open = new Date(demoWeeks.find((w) => w.weekNumber === 2)?.opensAt ?? start.toISOString());
  if (programSlug !== demoProgram.slug) return { programSlug, eligible: false, window: "closed", reason: "Program not found" };
  if (now <= closeAt) return { programSlug, eligible: true, window: "open", closesAtUtc: closeAt.toISOString() };
  if (demoProgram.lateJoinEnabled && now <= lateJoinEnds && now < week2Open) {
    return { programSlug, eligible: true, window: "late_join", reason: "Late join enabled", lateJoinEndsAtUtc: lateJoinEnds.toISOString() };
  }
  return { programSlug, eligible: false, window: "closed", reason: "Enrollment closed" };
}
