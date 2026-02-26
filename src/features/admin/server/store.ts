import { demoCourses, demoLessons, demoWeeks } from "@/features/_shared/contract-data";
import type { ContentCourse, ContentLesson, EnrollmentSummary, PaymentSummary } from "@/features/_shared/types";

type AdminUserStoreItem = { id: string; email: string; fullName: string; roles: Array<"student" | "instructor" | "admin"> };

export const instructorProgramsByUserId: Record<string, string[]> = {
  "instructor-1": ["web-dev-101"],
};

export const adminUsers: AdminUserStoreItem[] = [
  { id: "admin-1", email: "admin@edxelera.dev", fullName: "Admin User", roles: ["admin"] },
  { id: "instructor-1", email: "instructor@edxelera.dev", fullName: "Instructor User", roles: ["instructor"] },
  { id: "student-1", email: "student@edxelera.dev", fullName: "Student User", roles: ["student"] },
];

export const paymentStore: PaymentSummary[] = [
  {
    id: "pay-1",
    reference: "ref_demo_1",
    userId: "student-1",
    programSlug: "web-dev-101",
    status: "success",
    amountMinor: 150000,
    currency: "NGN",
    createdAtUtc: new Date().toISOString(),
  },
];

export const enrollmentStore: EnrollmentSummary[] = [
  { id: "enr-1", userId: "student-1", programSlug: "web-dev-101", status: "active", enrolledAtUtc: new Date().toISOString() },
];

export const courseStore: ContentCourse[] = demoCourses.map((course) => ({
  id: course.id,
  programSlug: "web-dev-101",
  courseSlug: course.slug,
  title: course.title,
}));

export const weekStore = demoWeeks.map((week) => ({
  id: `week-${week.weekNumber}`,
  programSlug: "web-dev-101",
  weekNumber: week.weekNumber,
  title: week.title,
  opensAtUtc: week.opensAt,
  pinnedPostId: undefined as string | undefined,
  assignmentTitle: `Assignment Week ${week.weekNumber}`,
  assignmentBrief: "",
  assignmentDeadlineUtc: undefined as string | undefined,
  liveTitle: `Live Session Week ${week.weekNumber}`,
  liveSessionLink: undefined as string | undefined,
  liveSessionStartUtc: undefined as string | undefined,
}));

export const lessonStore: ContentLesson[] = demoLessons.map((lesson, index) => ({
  id: lesson.id,
  courseSlug: lesson.courseSlug,
  weekNumber: lesson.weekNumber,
  lessonSlug: lesson.slug,
  title: lesson.title,
  position: index + 1,
  durationSeconds: lesson.durationSeconds,
}));

export const prerequisiteStore: Array<{ lessonSlug: string; prerequisiteLessonSlug: string }> = demoLessons.flatMap((lesson) =>
  lesson.prerequisites.map((prerequisiteLessonSlug) => ({ lessonSlug: lesson.slug, prerequisiteLessonSlug })),
);
