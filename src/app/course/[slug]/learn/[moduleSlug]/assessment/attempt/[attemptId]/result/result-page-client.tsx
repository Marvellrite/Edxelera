"use client";

import AssessmentResult from "@/components/features/course/quiz/assessment-result";
import {
  useGetAssessmentAttemptResult,
  type AssessmentAttemptResultData,
  type AssessmentAttemptResultParams,
  type AssessmentAttemptResultResponse,
} from "@/api/assessment";

type ResultPageClientProps = AssessmentAttemptResultParams;

const getResultPayload = (
  response: AssessmentAttemptResultResponse | undefined
): AssessmentAttemptResultData | undefined => {
  if (!response) {
    return undefined;
  }

  if ("data" in response && response.data) {
    return response.data;
  }

  return response;
};

const getVariant = (result?: AssessmentAttemptResultData) => {
  if (!result) {
    return "failure" as const;
  }

  if (typeof result.passed === "boolean") {
    return result.passed ? "success" : "failure";
  }

  return result.status === "success" || result.status === "passed"
    ? "success"
    : "failure";
};

const getScore = (result?: AssessmentAttemptResultData) => {
  const score =
    result?.percentage_score ??
    result?.score_percentage ??
    result?.score ??
    0;

  return Number.isFinite(score) ? Number(score) : 0;
};

const getRemainingTrials = (result?: AssessmentAttemptResultData) => {
  const remainingTrials = result?.remaining_trials ?? result?.attempts_left ?? 0;

  return Number.isFinite(remainingTrials) ? Number(remainingTrials) : 0;
};

const ResultPageClient = ({
  slug,
  moduleSlug,
  attemptId,
}: ResultPageClientProps) => {
  const { data } = useGetAssessmentAttemptResult({
    slug,
    moduleSlug,
    attemptId,
  });

  const result = getResultPayload(data);
  const variant = getVariant(result);
  const score = getScore(result);
  const remainingTrials = getRemainingTrials(result);

  return (
    <AssessmentResult
      variant={variant}
      score={score}
      remainingTrials={remainingTrials}
      primaryAction={{
        label: variant === "success" ? "Next Module" : "Retake Test",
        href:
          variant === "success"
            ? result?.next_module_slug
              ? `/course/${slug}/learn/${result.next_module_slug}`
              : `/course/${slug}/learn/${moduleSlug}`
            : result?.retake_url ??
              `/course/${slug}/learn/${moduleSlug}/assessment`,
        variant: "default",
        className:
          variant === "success"
            ? "h-[50px] w-full text-medium text-white rounded-[500px]"
            : "h-[50px] w-full",
      }}
      secondaryAction={
        variant === "failure"
          ? {
              label: "Revisit Module",
              href:
                result?.module_url ?? `/course/${slug}/learn/${moduleSlug}`,
              variant: "secondary",
              className: "h-[50px] w-full",
            }
          : undefined
      }
      reviewAction={{
        label: "Review Answers",
        href:
          result?.review_url ??
          `/course/${slug}/learn/${moduleSlug}/assessment/attempt/${attemptId}`,
        variant: "outline",
        className: "h-[50px] w-full text-medium text-primary rounded-[500px]",
      }}
    />
  );
};

export default ResultPageClient;
