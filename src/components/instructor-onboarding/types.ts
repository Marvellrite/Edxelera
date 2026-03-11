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
