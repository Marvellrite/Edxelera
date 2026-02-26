import { demoProgram } from "@/features/_shared/contract-data";
import type { ProgramDTO } from "@/features/_shared/types";

export type CohortLike = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  timezone: string;
  startDate: string;
  endDate: string;
  amountMinor: number;
  currency: string;
  enrollmentCloseHours: number;
  lateJoinEnabled: boolean;
  lateJoinDays: number;
};

export function toProgramDTO(cohort: CohortLike): ProgramDTO {
  return {
    id: cohort.id,
    programSlug: cohort.slug,
    title: cohort.title,
    description: cohort.description,
    timezone: cohort.timezone,
    startDateUtc: cohort.startDate,
    endDateUtc: cohort.endDate,
    amountMinor: cohort.amountMinor,
    currency: cohort.currency,
    enrollmentCloseHours: cohort.enrollmentCloseHours,
    lateJoinEnabled: cohort.lateJoinEnabled,
    lateJoinDays: cohort.lateJoinDays,
  };
}

export function fromProgramSlug(programSlug: string): string {
  return programSlug;
}

export const programStore: CohortLike[] = [{ ...demoProgram }];
