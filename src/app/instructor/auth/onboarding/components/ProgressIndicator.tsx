import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index + 1}
          className={`h-2.75 flex-1 rounded-full transition-colors ${
            index + 1 <= currentStep
              ? 'bg-primary'
              : 'bg-neutral-300'
          }`}
          aria-label={`Step ${index + 1}`}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        />
      ))}
    </div>
  );
}
