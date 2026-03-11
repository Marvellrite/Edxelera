'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { OnboardingShell } from '@/components/instructor-onboarding/onboarding-shell';
import { ProgressIndicator } from '@/components/instructor-onboarding/progress-indicator';
import { SingleSelectQuestionStep } from '@/components/instructor-onboarding/single-select-question-step';
import { OnboardingAnswers, OnboardingStep } from '@/components/instructor-onboarding/types';

const INSTRUCTOR_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'teaching_experience',
    title: 'How much teaching experience do you have?',
    options: [
      { value: 'beginner', label: 'I am just getting started' },
      { value: 'intermediate', label: 'I have taught a few classes before' },
      { value: 'advanced', label: 'I have years of teaching experience' },
    ],
  },
  {
    id: 'teaching_format',
    title: 'What type of courses do you want to create?',
    options: [
      { value: 'video', label: 'Pre-recorded video classes' },
      { value: 'live', label: 'Live online sessions' },
      { value: 'blended', label: 'A mix of live and recorded content' },
    ],
  },
  {
    id: 'goal',
    title: 'What is your primary goal for joining Edxelera?',
    options: [
      { value: 'grow-business', label: 'Grow my teaching business' },
      { value: 'impact', label: 'Share knowledge and create impact' },
      { value: 'community', label: 'Build a learning community' },
    ],
    ctaLabel: 'Finish setup',
  },
];

export default function InstructorOnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const currentStep = INSTRUCTOR_ONBOARDING_STEPS[currentStepIndex];
  const currentSelection = answers[currentStep.id];
  const isLastStep = currentStepIndex === INSTRUCTOR_ONBOARDING_STEPS.length - 1;

  const stepLabel = useMemo(
    () => `Step ${currentStepIndex + 1} of ${INSTRUCTOR_ONBOARDING_STEPS.length}`,
    [currentStepIndex],
  );

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!currentSelection) return;

    if (isLastStep) {
      handleSubmit();
      return;
    }

    setCurrentStepIndex((prev) => Math.min(INSTRUCTOR_ONBOARDING_STEPS.length - 1, prev + 1));
  };

  const handleSubmit = () => {
    // TODO: replace with API integration once instructor onboarding endpoint is finalized.
    console.log('Instructor onboarding answers:', answers);
  };

  return (
    <OnboardingShell>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-600">{stepLabel}</p>
          <ProgressIndicator currentStep={currentStepIndex} totalSteps={INSTRUCTOR_ONBOARDING_STEPS.length} />
        </div>

        <SingleSelectQuestionStep step={currentStep} selectedValue={currentSelection} onSelect={handleSelect} />

        <div className="flex flex-wrap gap-3 pt-2">
          {currentStepIndex > 0 ? (
            <Button type="button" variant="outline" className="min-w-32" onClick={handlePrevious}>
              Previous
            </Button>
          ) : null}

          <Button type="button" className="min-w-32" onClick={handleNext} disabled={!currentSelection}>
            {isLastStep ? currentStep.ctaLabel ?? 'Continue' : 'Next'}
          </Button>
        </div>
      </div>
    </OnboardingShell>
  );
}
