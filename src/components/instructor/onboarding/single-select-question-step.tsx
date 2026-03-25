import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

import { OnboardingStep } from './types';

type SingleSelectQuestionStepProps = {
  step: OnboardingStep;
  selectedValue?: string;
  onSelect: (value: string) => void;
};

export function SingleSelectQuestionStep({ step, selectedValue, onSelect }: SingleSelectQuestionStepProps) {
  return (
    <section aria-labelledby={`step-question-${step.id}`} className="space-y-5">
      <h1 id={`step-question-${step.id}`} className="text-2xl font-medium text-black sm:text-3xl">
        {step.question}
      </h1>

      <RadioGroup value={selectedValue} onValueChange={onSelect} className="space-y-3">
        {step.options.map((option) => {
          const checked = selectedValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={`${step.id}-${option.value}`}
              className={cn(
                'flex w-full items-start gap-3 rounded-2xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-ring',
                checked ? 'border-primary bg-primary-50' : 'border-neutral-300 bg-white hover:border-neutral-400',
              )}
            >
              <RadioGroupItem id={`${step.id}-${option.value}`} value={option.value} className="mt-1" />
              <span className="space-y-1">
                <span className="block text-base font-medium text-black">{option.label}</span>
                {option.description ? <span className="block text-sm text-neutral-600">{option.description}</span> : null}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </section>
  );
}
