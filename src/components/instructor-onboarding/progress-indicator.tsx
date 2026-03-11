import { cn } from '@/lib/utils';

type ProgressIndicatorProps = {
  totalSteps: number;
  currentStep: number;
};

export function ProgressIndicator({ totalSteps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompletedOrCurrent = index <= currentStep;

        return (
          <div
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              isCompletedOrCurrent ? 'bg-primary' : 'bg-neutral-200',
            )}
          />
        );
      })}
    </div>
  );
}
