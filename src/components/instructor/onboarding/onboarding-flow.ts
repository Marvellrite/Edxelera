import type {
  ContentValue,
  ExperienceValue,
  InstructorOnboardingState,
  InstructorProfile,
  OnboardingAnswers,
  OnboardingStep,
  ResolvedOnboardingAnswers,
  VideoComfortValue,
} from "@/components/instructor/onboarding/types";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    key: "experience",
    question: "What best describes your experience as an instructor?",
    helperText:
      "Choose the option that feels closest to where you are right now.",
    options: [
      {
        id: "a",
        value: "new",
        label: "I'm new to teaching and creating courses",
      },
      {
        id: "b",
        value: "some_teaching",
        label: "I've taught, mentored, or coached people before",
      },
      {
        id: "c",
        value: "created_courses",
        label:
          "I've created course materials before, but haven't sold or published a full course",
      },
      {
        id: "d",
        value: "published_courses",
        label: "I've created and sold or published courses before",
      },
    ],
  },
  {
    id: 2,
    key: "content",
    question: "How much course content do you already have prepared?",
    helperText:
      "This includes videos, slides, notes, lesson outlines, or other teaching materials.",
    options: [
      {
        id: "a",
        value: "full_content",
        label: "I already have most or all of my course content ready",
      },
      {
        id: "b",
        value: "partial_content",
        label: "I have some content, but it is not complete yet",
      },
      {
        id: "c",
        value: "no_content",
        label: "I haven't created my course content yet",
      },
    ],
  },
  {
    id: 3,
    key: "video_comfort",
    question: "How comfortable are you with recording course videos?",
    helperText: "This helps us know what kind of support to show you.",
    options: [
      {
        id: "a",
        value: "very_comfortable",
        label: "I'm very comfortable recording videos",
      },
      {
        id: "b",
        value: "somewhat_comfortable",
        label: "I can do it, but I may need some guidance",
      },
      {
        id: "c",
        value: "not_comfortable",
        label: "I'm not confident with video recording yet",
      },
    ],
  },
];

export const EXPERIENCE_SCORE_MAP: Record<ExperienceValue, number> = {
  new: 0,
  some_teaching: 1,
  created_courses: 2,
  published_courses: 3,
};

export const CONTENT_SCORE_MAP: Record<ContentValue, number> = {
  full_content: 2,
  partial_content: 1,
  no_content: 0,
};

export const VIDEO_COMFORT_SCORE_MAP: Record<VideoComfortValue, number> = {
  very_comfortable: 2,
  somewhat_comfortable: 1,
  not_comfortable: 0,
};

export const resolveInstructorOnboardingState = (
  answers: Pick<ResolvedOnboardingAnswers, "experience" | "content">
): InstructorOnboardingState => {
  const totalScore =
    EXPERIENCE_SCORE_MAP[answers.experience] + CONTENT_SCORE_MAP[answers.content];

  if (totalScore <= 1) return "guided-start";
  if (totalScore >= 4) return "launch-ready";
  return "content-building";
};

export const isResolvedOnboardingAnswers = (
  answers: OnboardingAnswers
): answers is ResolvedOnboardingAnswers =>
  Boolean(answers.experience && answers.content && answers.video_comfort);

export const buildInstructorProfile = (
  answers: ResolvedOnboardingAnswers
): InstructorProfile => ({
  state: resolveInstructorOnboardingState(answers),
  signals: {
    experience: answers.experience,
    content: answers.content,
    videoComfort: answers.video_comfort,
  },
});

export const isInstructorOnboardingState = (
  value?: string
): value is InstructorOnboardingState =>
  value === "guided-start" ||
  value === "content-building" ||
  value === "launch-ready";

export const isExperienceValue = (value?: string): value is ExperienceValue =>
  value === "new" ||
  value === "some_teaching" ||
  value === "created_courses" ||
  value === "published_courses";

export const isContentValue = (value?: string): value is ContentValue =>
  value === "full_content" ||
  value === "partial_content" ||
  value === "no_content";

export const isVideoComfortValue = (
  value?: string
): value is VideoComfortValue =>
  value === "very_comfortable" ||
  value === "somewhat_comfortable" ||
  value === "not_comfortable";
