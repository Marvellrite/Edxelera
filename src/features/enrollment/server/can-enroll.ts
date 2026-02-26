import type { CanEnrollResult } from "@/features/_shared/types";

export async function canEnroll(programSlug: string): Promise<CanEnrollResult> {
  // TODO: Enforce 48h close, 7-day late join, and Week 2 cutoff.
  return {
    programSlug,
    eligible: false,
    window: "closed",
    reason: "Enrollment rules not implemented yet",
  };
}