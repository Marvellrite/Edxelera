import type { BillingStatus } from "@/features/_shared/types";
import { canEnroll } from "./can-enroll";
import { demoProgram } from "@/features/_shared/contract-data";

export async function getBillingStatus(programSlug: string): Promise<BillingStatus> {
  const status = await canEnroll(programSlug);
  return {
    programSlug,
    canEnroll: status.eligible,
    enrollmentStatus: status.eligible ? "not_enrolled" : "closed",
    amountMinor: demoProgram.amountMinor,
    currency: demoProgram.currency,
    reason: status.reason,
    cutoffAtUtc: status.closesAtUtc,
  };
}
