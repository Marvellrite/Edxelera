import type { BillingStatus } from "@/features/_shared/types";

export async function getBillingStatus(programSlug: string): Promise<BillingStatus> {
  // TODO: Resolve enrollment/payment status for authenticated user.
  return {
    programSlug,
    canEnroll: false,
    enrollmentStatus: "not_enrolled",
    reason: "Billing status not implemented",
  };
}