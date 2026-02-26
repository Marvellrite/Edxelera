import type { AdminUserDetail, AdminUserSummary, ContentCourse, ContentLesson, EnrollmentSummary, PaginatedResult, PaymentSummary, ProgramDTO, RoleName } from "@/features/_shared/types";
import { fromProgramSlug, programStore, toProgramDTO } from "@/features/programs/server/program-contract";
import { adminUsers, courseStore, enrollmentStore, lessonStore, paymentStore, prerequisiteStore, weekStore } from "./store";

function paginate<T>(items: T[], page = 1, pageSize = 20): PaginatedResult<T> {
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page, pageSize, total: items.length };
}

export async function listPrograms(page?: number, pageSize?: number) { return paginate(programStore.map(toProgramDTO), page, pageSize); }
export async function getProgram(programSlug: string): Promise<ProgramDTO | null> { return programStore.find((c) => c.slug === fromProgramSlug(programSlug)) ? toProgramDTO(programStore.find((c) => c.slug === programSlug)!) : null; }
export async function createProgram(input: Partial<ProgramDTO> & { programSlug: string; title: string }): Promise<ProgramDTO> {
  const cohort = { id: crypto.randomUUID(), slug: input.programSlug, title: input.title, description: input.description, timezone: input.timezone ?? "UTC", startDate: input.startDateUtc ?? new Date().toISOString(), endDate: input.endDateUtc ?? new Date().toISOString(), amountMinor: input.amountMinor ?? 0, currency: input.currency ?? "NGN", enrollmentCloseHours: input.enrollmentCloseHours ?? 48, lateJoinEnabled: input.lateJoinEnabled ?? false, lateJoinDays: input.lateJoinDays ?? 7 };
  programStore.push(cohort);
  return toProgramDTO(cohort);
}
export async function updateProgram(programSlug: string, input: Partial<ProgramDTO>) {
  const row = programStore.find((c) => c.slug === fromProgramSlug(programSlug));
  if (!row) return null;
  if (input.title) row.title = input.title;
  if (input.description !== undefined) row.description = input.description;
  if (input.timezone) row.timezone = input.timezone;
  if (input.startDateUtc) row.startDate = input.startDateUtc;
  if (input.endDateUtc) row.endDate = input.endDateUtc;
  return toProgramDTO(row);
}
export async function setProgramPricing(programSlug: string, amountMinor: number, currency: string) {
  const row = programStore.find((c) => c.slug === programSlug); if (!row) return null;
  row.amountMinor = amountMinor; row.currency = currency; return toProgramDTO(row);
}
export async function setEnrollmentRules(programSlug: string, enrollmentCloseHours: number, lateJoinEnabled: boolean, lateJoinDays: number) {
  const row = programStore.find((c) => c.slug === programSlug); if (!row) return null;
  row.enrollmentCloseHours = enrollmentCloseHours; row.lateJoinEnabled = lateJoinEnabled; row.lateJoinDays = lateJoinDays; return toProgramDTO(row);
}

export async function listCourses(page?: number, pageSize?: number) { return paginate(courseStore, page, pageSize); }
export async function createCourse(input: ContentCourse) { courseStore.push(input); return input; }
export async function updateCourse(courseSlug: string, input: Partial<ContentCourse>) { const row = courseStore.find((c) => c.courseSlug === courseSlug); if (!row) return null; Object.assign(row, input); return row; }
export async function deleteCourse(courseSlug: string) { const idx = courseStore.findIndex((c) => c.courseSlug === courseSlug); if (idx < 0) return false; courseStore.splice(idx, 1); return true; }

export async function listModules(page?: number, pageSize?: number) { return paginate(weekStore, page, pageSize); }
export async function createModule(input: (typeof weekStore)[number]) { weekStore.push(input); return input; }
export async function deleteModule(weekId: string) { const idx = weekStore.findIndex((w) => w.id === weekId); if (idx < 0) return false; weekStore.splice(idx, 1); return true; }
export async function updateModule(weekId: string, input: Partial<(typeof weekStore)[number]>) { const row = weekStore.find((w) => w.id === weekId); if (!row) return null; Object.assign(row, input); return row; }

export async function listLessons(page?: number, pageSize?: number) { return paginate(lessonStore, page, pageSize); }
export async function createLesson(input: ContentLesson) { lessonStore.push(input); return input; }
export async function updateLesson(lessonSlug: string, input: Partial<ContentLesson>) { const row = lessonStore.find((l) => l.lessonSlug === lessonSlug); if (!row) return null; Object.assign(row, input); return row; }
export async function deleteLesson(lessonSlug: string) { const idx = lessonStore.findIndex((l) => l.lessonSlug === lessonSlug); if (idx < 0) return false; lessonStore.splice(idx, 1); return true; }

export async function upsertPrerequisite(lessonSlug: string, prerequisiteLessonSlug: string) {
  if (!prerequisiteStore.some((x) => x.lessonSlug === lessonSlug && x.prerequisiteLessonSlug === prerequisiteLessonSlug)) prerequisiteStore.push({ lessonSlug, prerequisiteLessonSlug });
  return { lessonSlug, prerequisiteLessonSlug };
}

export async function listUsers(page?: number, pageSize?: number): Promise<PaginatedResult<AdminUserSummary>> { return paginate(adminUsers.map((u) => ({ ...u })), page, pageSize); }
export async function getUserDetail(userId: string): Promise<AdminUserDetail | null> {
  const user = adminUsers.find((u) => u.id === userId); if (!user) return null;
  return { ...user, enrollments: enrollmentStore.filter((e) => e.userId === userId).map(({ programSlug, status, enrolledAtUtc }) => ({ programSlug, status, enrolledAtUtc })) };
}
export async function updateUserRole(userId: string, role: RoleName) {
  const user = adminUsers.find((u) => u.id === userId); if (!user) return null;
  user.roles = [role]; return user;
}

export async function listPayments(filters: { status?: string; programSlug?: string; userId?: string; page?: number; pageSize?: number }): Promise<PaginatedResult<PaymentSummary>> {
  const items = paymentStore.filter((p) => (!filters.status || p.status === filters.status) && (!filters.programSlug || p.programSlug === filters.programSlug) && (!filters.userId || p.userId === filters.userId));
  return paginate(items, filters.page, filters.pageSize);
}

export async function listEnrollments(programSlug: string | undefined, page?: number, pageSize?: number): Promise<PaginatedResult<EnrollmentSummary>> {
  return paginate(enrollmentStore.filter((e) => !programSlug || e.programSlug === programSlug), page, pageSize);
}
export async function revokeEnrollment(enrollmentId: string) {
  const row = enrollmentStore.find((e) => e.id === enrollmentId); if (!row) return null;
  row.status = "revoked"; return row;
}
