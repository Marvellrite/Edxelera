import type {
  InstructorOnboardingResultContent,
  InstructorOnboardingResultVariant,
} from "@/components/instructor/onboarding/types";

export const DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_IMAGE =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340422/repo-images/public/assets/instructor/auth/instructor.jpg";

export const DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_LOGO =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340672/repo-images/public/images/logos/logo-dark.png";

export const INSTRUCTOR_ONBOARDING_RESULT_CONTENT: Record<
  InstructorOnboardingResultVariant,
  InstructorOnboardingResultContent
> = {
  "not-experienced-no-course": {
    title: "No experience? no worries",
    description:
      "We'll guide you step-by-step to design and deliver your first course successfully.",
    cardMaxWidth: "570px",
    cardMinHeight: "347px",
    titleMaxWidth: "490px",
  },
  "experienced-no-course": {
    title: "Let's Structure Your Knowledge",
    description: "We'll help you turn your experience into a powerful course",
    cardMaxWidth: "551px",
    cardMinHeight: "380px",
    titleMaxWidth: "360px",
  },
  "experienced-with-course": {
    title: "Great, you're good to go",
    description: "Here's what you have to do:",
    checklist: [
      "Upload course content",
      "Structure modules",
      "Add assessments and capstone project",
      "Submit for review",
    ],
    cardMaxWidth: "551px",
    cardMinHeight: "444px",
    titleMaxWidth: "450px",
  },
};
