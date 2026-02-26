import type {
  AdminUserDetail,
  AdminUserSummary,
  BillingStatus,
  CanEnrollResult,
  CertificateDownloadUrlResult,
  CertificateSummary,
  CompleteLessonInput,
  CompleteLessonResult,
  ContentCourse,
  ContentLesson,
  CourseProgress,
  DiscussionPost,
  DiscussionThread,
  EnrollmentSummary,
  InitPaystackPaymentResult,
  PaginatedResult,
  PaymentSummary,
  PlaybackUrlResult,
  ProgramDTO,
  StudentProgramHome,
  VerifyPaymentResult,
  WeekHub,
} from "@/features/_shared/types";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const json = await response.json();
  if (!response.ok || !json.ok) throw new Error(json?.error?.message ?? "API error");
  return json.data as T;
}

export const canEnroll = (programSlug: string) => api<CanEnrollResult>(`/api/enrollment/${programSlug}/can-enroll`);
export const initPaystackPayment = (programSlug: string) => api<InitPaystackPaymentResult>("/api/paystack/init", { method: "POST", body: JSON.stringify({ programSlug }) });
export const verifyPayment = (reference: string) => api<VerifyPaymentResult>("/api/paystack/verify", { method: "POST", body: JSON.stringify({ reference }) });
export const getBillingStatus = (programSlug: string) => api<BillingStatus>(`/api/billing/${programSlug}/status`);
export const getStudentProgramHome = (programSlug: string) => api<StudentProgramHome>(`/api/programs/${programSlug}/home`);
export const getWeekHub = (programSlug: string, weekNumber: number) => api<WeekHub>(`/api/programs/${programSlug}/weeks/${weekNumber}`);
export const completeLesson = (payload: CompleteLessonInput) => api<CompleteLessonResult>("/api/progress/lesson/complete", { method: "POST", body: JSON.stringify(payload) });
export const getCourseProgress = (courseSlug: string) => api<CourseProgress>(`/api/progress/course/${courseSlug}`);
export const getLessonPlaybackUrl = (programSlug: string, courseSlug: string, lessonSlug: string) => api<PlaybackUrlResult>(`/api/video/${programSlug}/${courseSlug}/${lessonSlug}/playback-url`);
export const getCertificates = () => api<CertificateSummary[]>("/api/certificates");
export const getCertificateDownloadUrl = (certificateId: string) => api<CertificateDownloadUrlResult>(`/api/certificates/${certificateId}/download-url`);
export const getDiscussionThread = (programSlug: string, weekNumber: number) => api<DiscussionThread>(`/api/discussion/${programSlug}/weeks/${weekNumber}`);
export const createPost = (payload: { programSlug: string; weekNumber: number; body: string }) => api<DiscussionPost>("/api/discussion/posts", { method: "POST", body: JSON.stringify(payload) });
export const replyToPost = (postId: string, body: string) => api<DiscussionPost>(`/api/discussion/posts/${postId}/reply`, { method: "POST", body: JSON.stringify({ body }) });
export const setPinnedPost = (postId: string, pinned: boolean) => api<{ postId: string; pinned: boolean }>(`/api/discussion/posts/${postId}/pin`, { method: "POST", body: JSON.stringify({ pinned }) });

export const adminListPrograms = (page = 1, pageSize = 20) => api<PaginatedResult<ProgramDTO>>(`/api/admin/programs?page=${page}&pageSize=${pageSize}`);
export const adminGetProgram = (programSlug: string) => api<ProgramDTO>(`/api/admin/programs/${programSlug}`);
export const adminCreateProgram = (payload: Pick<ProgramDTO, "programSlug" | "title"> & Partial<ProgramDTO>) => api<ProgramDTO>("/api/admin/programs", { method: "POST", body: JSON.stringify(payload) });
export const adminUpdateProgram = (programSlug: string, payload: Partial<ProgramDTO>) => api<ProgramDTO>(`/api/admin/programs/${programSlug}`, { method: "PATCH", body: JSON.stringify(payload) });
export const adminSetProgramPricing = (programSlug: string, amountMinor: number, currency: string) => api<ProgramDTO>(`/api/admin/programs/${programSlug}/pricing`, { method: "PATCH", body: JSON.stringify({ amountMinor, currency }) });
export const adminSetEnrollmentRules = (programSlug: string, payload: { enrollmentCloseHours: number; lateJoinEnabled: boolean; lateJoinDays: number }) => api<ProgramDTO>(`/api/admin/programs/${programSlug}/enrollment-rules`, { method: "PATCH", body: JSON.stringify(payload) });

export const adminListCourses = (page = 1, pageSize = 20) => api<PaginatedResult<ContentCourse>>(`/api/admin/content/courses?page=${page}&pageSize=${pageSize}`);
export const adminCreateCourse = (payload: ContentCourse) => api<ContentCourse>("/api/admin/content/courses", { method: "POST", body: JSON.stringify(payload) });
export const adminUpdateCourse = (courseSlug: string, payload: Partial<ContentCourse>) => api<ContentCourse>(`/api/admin/content/courses/${courseSlug}`, { method: "PATCH", body: JSON.stringify(payload) });
export const adminDeleteCourse = (courseSlug: string) => api<{ deleted: boolean }>(`/api/admin/content/courses/${courseSlug}`, { method: "DELETE" });
export const adminListModules = (page = 1, pageSize = 20) => api<PaginatedResult<{ id: string; programSlug: string; weekNumber: number; title: string; opensAtUtc: string }>>(`/api/admin/content/modules?page=${page}&pageSize=${pageSize}`);
export const adminCreateModule = (payload: { id: string; programSlug: string; weekNumber: number; title: string; opensAtUtc: string }) => api<{ id: string; programSlug: string; weekNumber: number; title: string; opensAtUtc: string }>("/api/admin/content/modules", { method: "POST", body: JSON.stringify(payload) });
export const adminUpdateModule = (weekId: string, payload: Record<string, unknown>) => api<Record<string, unknown>>(`/api/admin/content/modules/${weekId}`, { method: "PATCH", body: JSON.stringify(payload) });
export const adminDeleteModule = (weekId: string) => api<{ deleted: boolean }>(`/api/admin/content/modules/${weekId}`, { method: "DELETE" });
export const adminListLessons = (page = 1, pageSize = 20) => api<PaginatedResult<ContentLesson>>(`/api/admin/content/lessons?page=${page}&pageSize=${pageSize}`);
export const adminCreateLesson = (payload: ContentLesson) => api<ContentLesson>("/api/admin/content/lessons", { method: "POST", body: JSON.stringify(payload) });
export const adminUpdateLesson = (lessonSlug: string, payload: Partial<ContentLesson>) => api<ContentLesson>(`/api/admin/content/lessons/${lessonSlug}`, { method: "PATCH", body: JSON.stringify(payload) });
export const adminDeleteLesson = (lessonSlug: string) => api<{ deleted: boolean }>(`/api/admin/content/lessons/${lessonSlug}`, { method: "DELETE" });
export const adminSetPrerequisite = (lessonSlug: string, prerequisiteLessonSlug: string) => api<{ lessonSlug: string; prerequisiteLessonSlug: string }>("/api/admin/content/prerequisites", { method: "POST", body: JSON.stringify({ lessonSlug, prerequisiteLessonSlug }) });

export const adminListUsers = (page = 1, pageSize = 20) => api<PaginatedResult<AdminUserSummary>>(`/api/admin/users?page=${page}&pageSize=${pageSize}`);
export const adminGetUser = (userId: string) => api<AdminUserDetail>(`/api/admin/users/${userId}`);
export const adminUpdateUserRole = (userId: string, role: "student" | "instructor" | "admin") => api<AdminUserSummary>(`/api/admin/users/${userId}`, { method: "PATCH", body: JSON.stringify({ role }) });

export const adminListPayments = (params?: { status?: string; programSlug?: string; userId?: string; page?: number; pageSize?: number }) => {
  const qs = new URLSearchParams({ page: String(params?.page ?? 1), pageSize: String(params?.pageSize ?? 20), ...(params?.status ? { status: params.status } : {}), ...(params?.programSlug ? { programSlug: params.programSlug } : {}), ...(params?.userId ? { userId: params.userId } : {}) });
  return api<PaginatedResult<PaymentSummary>>(`/api/admin/payments?${qs.toString()}`);
};
export const adminListEnrollments = (programSlug?: string, page = 1, pageSize = 20) => api<PaginatedResult<EnrollmentSummary>>(`/api/admin/enrollments?page=${page}&pageSize=${pageSize}${programSlug ? `&programSlug=${programSlug}` : ""}`);
export const adminRevokeEnrollment = (enrollmentId: string) => api<EnrollmentSummary>(`/api/admin/enrollments/${enrollmentId}/revoke`, { method: "POST" });

export const instructorListPrograms = () => api<ProgramDTO[]>("/api/instructor/programs");
export const instructorSetPinnedPost = (programSlug: string, weekNumber: number, postId: string) => api<{ programSlug: string; weekNumber: number; postId: string }>(`/api/instructor/programs/${programSlug}/weeks/${weekNumber}/pin`, { method: "PATCH", body: JSON.stringify({ postId }) });
export const instructorUpdateAssignment = (programSlug: string, weekNumber: number, payload: { title?: string; brief?: string; deadlineUtc?: string }) => api<{ programSlug: string; weekNumber: number; title: string; brief?: string; deadlineUtc?: string }>(`/api/instructor/programs/${programSlug}/weeks/${weekNumber}/assignment`, { method: "PATCH", body: JSON.stringify(payload) });
export const instructorUpdateLiveSession = (programSlug: string, weekNumber: number, payload: { title?: string; joinUrl?: string; startUtc?: string }) => api<{ programSlug: string; weekNumber: number; title: string; joinUrl?: string; startUtc?: string }>(`/api/instructor/programs/${programSlug}/weeks/${weekNumber}/live-session`, { method: "PATCH", body: JSON.stringify(payload) });
export const instructorModeratePost = (postId: string, action: "hide" | "delete") => api<DiscussionPost>(`/api/instructor/discussion/posts/${postId}`, { method: "PATCH", body: JSON.stringify({ action }) });
