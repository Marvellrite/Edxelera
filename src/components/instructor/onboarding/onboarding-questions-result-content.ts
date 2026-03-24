import type {
  InstructorOnboardingResultContent,
  InstructorOnboardingState,
} from "@/components/instructor/onboarding/types";

export const DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_IMAGE =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340422/repo-images/public/assets/instructor/auth/instructor.jpg";

export const DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_LOGO =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340672/repo-images/public/images/logos/logo-dark.png";

export const INSTRUCTOR_ONBOARDING_RESULT_CONTENT: Record<
  InstructorOnboardingState,
  InstructorOnboardingResultContent
> = {
  "guided-start": {
    title: "No experience? You're in the right place",
    description:
      "We'll guide you step-by-step to design, record, and publish your first course successfully.",
    actions: [
      "Learn how course creation works",
      "Plan your first course structure",
      "Record your first lessons",
      "Prepare your course for publishing",
    ],
    variant: "guided",
    cardMaxWidth: "570px",
    cardMinHeight: "380px",
    titleMaxWidth: "500px",
  },
  "content-building": {
    title: "Let's turn your knowledge into a course",
    description:
      "You already have valuable experience. We'll help you structure it into a professional learning experience.",
    actions: [
      "Create your course outline",
      "Organize modules and lessons",
      "Upload or record your content",
      "Prepare assessments",
    ],
    variant: "build",
    cardMaxWidth: "551px",
    cardMinHeight: "400px",
    titleMaxWidth: "420px",
  },
  "launch-ready": {
    title: "Great, you're ready to launch",
    description: "Here's what you can do next:",
    actions: [
      "Upload your course content",
      "Structure your modules",
      "Add assessments and capstone project",
      "Submit your course for review",
    ],
    variant: "launch",
    cardMaxWidth: "551px",
    cardMinHeight: "444px",
    titleMaxWidth: "460px",
  },
};
