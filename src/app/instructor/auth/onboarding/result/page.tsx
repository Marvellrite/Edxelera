import OnboardingQuestionsResult from "@/components/instructor/onboarding/onboarding-questions-result";
import {
  isContentValue,
  isExperienceValue,
  isInstructorOnboardingState,
  isVideoComfortValue,
  resolveInstructorOnboardingState,
} from "@/components/instructor/onboarding/onboarding-flow";
import type { InstructorOnboardingState } from "@/components/instructor/onboarding/types";

type OnboardingResultPageProps = {
  searchParams?: Promise<{
    state?: string;
    experience?: string;
    content?: string;
    video_comfort?: string;
  }>;
};

export default async function DemoPage({
  searchParams,
}: OnboardingResultPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const resolvedState = isInstructorOnboardingState(resolvedSearchParams?.state)
    ? resolvedSearchParams.state
    : undefined;
  const stateFromSignals =
    isExperienceValue(resolvedSearchParams?.experience) &&
    isContentValue(resolvedSearchParams?.content) &&
    isVideoComfortValue(resolvedSearchParams?.video_comfort)
      ? resolveInstructorOnboardingState({
          experience: resolvedSearchParams.experience,
          content: resolvedSearchParams.content,
        })
      : undefined;
  const state: InstructorOnboardingState =
    resolvedState ?? stateFromSignals ?? "guided-start";

  return (
    <main className="space-y-12">
      <OnboardingQuestionsResult
        state={state}
        ctaHref="/instructor/auth/onboarding"
      />
    </main>
  );
}
