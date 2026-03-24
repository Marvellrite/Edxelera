'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProgressIndicator from './components/ProgressIndicator';
import QuestionStep from './components/QuestionStep';
import OptionCard from './components/OptionCard';
import {
  buildInstructorProfile,
  isResolvedOnboardingAnswers,
  ONBOARDING_STEPS,
} from '@/components/instructor/onboarding/onboarding-flow';
import type { OnboardingAnswers } from '@/components/instructor/onboarding/types';
import { cn } from '@/lib/utils';

export default function InstructorOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const step = ONBOARDING_STEPS[currentStep - 1];
  const currentAnswer = answers[step.key];
  const isAnswered = Boolean(currentAnswer);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === ONBOARDING_STEPS.length;

  const handleSelectOption = (optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step.key]: optionValue,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!isResolvedOnboardingAnswers(answers)) {
      return;
    }

    const profile = buildInstructorProfile(answers);
    const params = new URLSearchParams({
      state: profile.state,
      experience: profile.signals.experience,
      content: profile.signals.content,
      video_comfort: profile.signals.videoComfort,
    });

    router.push(`/instructor/auth/onboarding/result?${params.toString()}`);
  };

  return (
    <section className="relative grid h-screen w-full grid-cols-1 grid-rows-1 overflow-hidden lg:grid-cols-10">
      {/* Left side - Image */}
            <div className="col-span-1 h-screen w-full overflow-y-auto bg-surface lg:col-span-6 ">
        <div className="flex flex-col px-6 py-8 sm:px-8 sm:py-12">
          {/* Logo */}
          <div className="w-full mb-8 md:mb-12">
            <Image
              className="w-auto h-auto"
              src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"
              alt="Edxelera Logo"
              width={140}
              height={56}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Step Indicator */}
            <div className="mb-8 md:mb-10">
              <p className="text-sm text-neutral-600 mb-3">
                Step {currentStep} of {ONBOARDING_STEPS.length}
              </p>
              <ProgressIndicator currentStep={currentStep} totalSteps={ONBOARDING_STEPS.length} />
            </div>

            {/* Question */}
            <div className="mb-8 md:mb-12">
              <QuestionStep
                question={step.question}
                helperText={step.helperText}
              />
            </div>

            {/* Options */}
            <div className="space-y-3 mb-auto">
              {step.options.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={currentAnswer === option.value}
                  onClick={() => handleSelectOption(option.value)}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8 md:mt-12 pt-6 border-t border-neutral-200 w-full justify-between">
            {!isFirstStep && (
              <Button
                variant="secondary"
                onClick={handlePrevious}
                className=' w-30'
              >
                Previous
              </Button>
            )}
            <Button
              variant="default"
              size="default"
              onClick={handleNext}
              disabled={!isAnswered}
              className={cn('w-30')}
            >
              {isLastStep ? 'Proceed' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
      

      {/* Right side - Content */}
            <div className="relative hidden h-full lg:col-span-4 lg:block">
        <Image
          src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340424/repo-images/public/assets/instructor/auth/onboarding/right-side.jpg"
          alt="Instructor onboarding"
          className="object-cover"
          fill
        />
        {/* <div className="absolute w-full h-full bg-gradient-to-b from-black/50 to-black/20"></div> */}
      </div>
    </section>
  );
}
