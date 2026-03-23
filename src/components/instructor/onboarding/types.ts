export type OnboardingStep = {
  id: 'teaching_experience' | 'teaching_format' | 'goal';
  title: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  ctaLabel?: string;
};

export type OnboardingAnswers = Partial<Record<OnboardingStep['id'], string>>;

export type InstructorOnboardingResultVariant =
  | "not-experienced-no-course"
  | "experienced-no-course"
  | "experienced-with-course";

export type InstructorOnboardingResultProps = {
  variant: InstructorOnboardingResultVariant;
  className?: string;
  ctaHref: string;
  onGetStarted?: () => void;
  imageSrc?: string;
  logoSrc?: string;
  priority?: boolean;
};

export type InstructorOnboardingResultContent = {
  title: string;
  description?: string;
  checklist?: string[];
  cardMaxWidth: string;
  cardMinHeight: string;
  titleMaxWidth?: string;
};
