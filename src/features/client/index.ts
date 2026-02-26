import type {
  BillingStatus,
  CanEnrollResult,
  CertificateDownloadUrlResult,
  CertificateSummary,
  CompleteLessonInput,
  CompleteLessonResult,
  CourseProgress,
  DiscussionPost,
  DiscussionThread,
  InitPaystackPaymentResult,
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
export const getCertificates = () => api<CertificateSummary[]>("/api/certificates");
export const getCertificateDownloadUrl = (certificateId: string) => api<CertificateDownloadUrlResult>(`/api/certificates/${certificateId}/download-url`);
export const getDiscussionThread = (programSlug: string, weekNumber: number) => api<DiscussionThread>(`/api/discussion/${programSlug}/weeks/${weekNumber}`);
export const createPost = (payload: { programSlug: string; weekNumber: number; body: string }) => api<DiscussionPost>("/api/discussion/posts", { method: "POST", body: JSON.stringify(payload) });
export const replyToPost = (postId: string, body: string) => api<DiscussionPost>(`/api/discussion/posts/${postId}/reply`, { method: "POST", body: JSON.stringify({ body }) });
export const setPinnedPost = (postId: string, pinned: boolean) => api<{ postId: string; pinned: boolean }>(`/api/discussion/posts/${postId}/pin`, { method: "POST", body: JSON.stringify({ pinned }) });
