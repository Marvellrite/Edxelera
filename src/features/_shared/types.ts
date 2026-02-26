export type RoleName = "student" | "instructor" | "admin";

export type EnrollmentStatus =
  | "not_enrolled"
  | "pending_payment"
  | "active"
  | "closed"
  | "late_join"
  | "not_eligible";

export type UnlockState = "locked" | "unlocked" | "completed";

export type PaymentProvider = "paystack";
export type PaymentStatus = "initialized" | "pending" | "success" | "failed" | "abandoned";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: ApiError;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: RoleName[];
}

export interface BillingStatus {
  programSlug: string;
  canEnroll: boolean;
  enrollmentStatus: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
  amountMinor?: number;
  currency?: string;
  reason?: string;
  cutoffAtUtc?: string;
}

export interface CanEnrollResult {
  programSlug: string;
  eligible: boolean;
  window: "open" | "closed" | "late_join";
  reason?: string;
  closesAtUtc?: string;
  lateJoinEndsAtUtc?: string;
}

export interface InitPaystackPaymentResult {
  authorization_url: string;
  reference: string;
}

export interface VerifyPaymentResult {
  reference: string;
  status: "success" | "failed" | "pending";
  enrolled: boolean;
}

export interface ProgramCourseSummary {
  courseSlug: string;
  title: string;
  percentComplete: number;
  completedLessons: number;
  totalLessons: number;
}

export interface ProgramWeekSummary {
  weekNumber: number;
  title: string;
  unlockState: UnlockState;
  releaseAtUtc: string;
  assignmentDeadlineUtc?: string;
}

export interface StudentProgramHome {
  programSlug: string;
  programTitle: string;
  timezone: string;
  currentWeekNumber: number;
  enrollmentStatus: EnrollmentStatus;
  progressPercent: number;
  courses: ProgramCourseSummary[];
  weeks: ProgramWeekSummary[];
  upcomingDeadlines: Array<{
    type: "assignment" | "live_session";
    weekNumber: number;
    title: string;
    atUtc: string;
  }>;
}

export interface WeekLessonItem {
  courseSlug: string;
  lessonSlug: string;
  title: string;
  durationSeconds?: number;
  unlockState: UnlockState;
  prerequisiteLessonSlugs?: string[];
  hasVideo: boolean;
}

export interface WeekAssignment {
  title: string;
  instructions?: string;
  deadlineUtc?: string;
  unlockState: UnlockState;
}

export interface WeekLiveSession {
  title: string;
  startUtc?: string;
  endUtc?: string;
  joinUrl?: string;
}

export interface WeekHub {
  programSlug: string;
  weekNumber: number;
  title: string;
  released: boolean;
  releaseAtUtc: string;
  lessons: WeekLessonItem[];
  assignment?: WeekAssignment;
  liveSession?: WeekLiveSession;
  discussionThreadId?: string;
}

export interface CompleteLessonInput {
  courseSlug: string;
  lessonSlug: string;
}

export interface CompleteLessonResult {
  courseSlug: string;
  lessonSlug: string;
  completed: boolean;
  coursePercentComplete: number;
}

export interface CourseProgressLesson {
  lessonSlug: string;
  title: string;
  completed: boolean;
  unlockState: UnlockState;
}

export interface CourseProgress {
  courseSlug: string;
  percentComplete: number;
  completedLessons: number;
  totalLessons: number;
  completedAtUtc?: string;
  lessons: CourseProgressLesson[];
}

export interface PlaybackUrlResult {
  lessonSlug: string;
  playbackUrl: string;
  expiresAtUtc: string;
}

export type CertificateType = "course" | "program";

export interface CertificateSummary {
  id: string;
  type: CertificateType;
  title: string;
  issuedAtUtc: string;
  courseSlug?: string;
  programSlug?: string;
}

export interface CertificateDownloadUrlResult {
  certificateId: string;
  downloadUrl: string;
  expiresAtUtc: string;
}

export interface ProgramDTO {
  id: string;
  programSlug: string;
  title: string;
  description?: string;
  timezone: string;
  startDateUtc: string;
  endDateUtc: string;
  amountMinor: number;
  currency: string;
  enrollmentCloseHours: number;
  lateJoinEnabled: boolean;
  lateJoinDays: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AdminUserSummary {
  id: string;
  email: string;
  fullName: string;
  roles: RoleName[];
}

export interface AdminUserDetail extends AdminUserSummary {
  enrollments: Array<{ programSlug: string; status: string; enrolledAtUtc: string }>;
}

export interface PaymentSummary {
  id: string;
  reference: string;
  userId: string;
  programSlug: string;
  status: PaymentStatus;
  amountMinor: number;
  currency: string;
  createdAtUtc: string;
}

export interface EnrollmentSummary {
  id: string;
  userId: string;
  programSlug: string;
  status: string;
  enrolledAtUtc: string;
}

export interface ContentCourse {
  id: string;
  programSlug: string;
  courseSlug: string;
  title: string;
  description?: string;
}

export interface ContentLesson {
  id: string;
  courseSlug: string;
  weekNumber: number;
  lessonSlug: string;
  title: string;
  position: number;
  durationSeconds?: number;
}

export interface DiscussionPost {
  id: string;
  authorName: string;
  authorRole: RoleName;
  body: string;
  createdAtUtc: string;
  parentPostId?: string;
  isPinned?: boolean;
}

export interface DiscussionThread {
  threadId: string;
  programSlug: string;
  weekNumber: number;
  title: string;
  posts: DiscussionPost[];
}

export interface CreateDiscussionPostInput {
  programSlug: string;
  weekNumber: number;
  body: string;
}

export interface ReplyToPostInput {
  postId: string;
  body: string;
}

export interface SetPinnedPostInput {
  postId: string;
  pinned: boolean;
}
