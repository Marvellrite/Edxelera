export type ExperienceValue =
  | "new"
  | "some_teaching"
  | "created_courses"
  | "published_courses";

export type ContentValue =
  | "full_content"
  | "partial_content"
  | "no_content";

export type VideoComfortValue =
  | "very_comfortable"
  | "somewhat_comfortable"
  | "not_comfortable";

export type InstructorOnboardingState =
  | "guided-start"
  | "content-building"
  | "launch-ready";

export type OnboardingResultVisualVariant = "guided" | "build" | "launch";

export type OnboardingOption = {
  id: string;
  label: string;
  value: string;
};

export type OnboardingStepKey =
  | "experience"
  | "content"
  | "video_comfort";

export type OnboardingStep = {
  id: number;
  key: OnboardingStepKey;
  question: string;
  helperText?: string;
  options: OnboardingOption[];
};

export type OnboardingAnswers = Partial<{
  experience: ExperienceValue;
  content: ContentValue;
  video_comfort: VideoComfortValue;
}>;

export type ResolvedOnboardingAnswers = {
  experience: ExperienceValue;
  content: ContentValue;
  video_comfort: VideoComfortValue;
};

export type InstructorProfile = {
  state: InstructorOnboardingState;
  signals: {
    experience: ExperienceValue;
    content: ContentValue;
    videoComfort: VideoComfortValue;
  };
};

export type InstructorOnboardingResultProps = {
  state: InstructorOnboardingState;
  className?: string;
  ctaHref: string;
  onGetStarted?: () => void;
  imageSrc?: string;
  logoSrc?: string;
  priority?: boolean;
};

export type InstructorOnboardingResultContent = {
  title: string;
  description: string;
  actions?: string[];
  variant: OnboardingResultVisualVariant;
  cardMaxWidth: string;
  cardMinHeight: string;
  titleMaxWidth?: string;
};
