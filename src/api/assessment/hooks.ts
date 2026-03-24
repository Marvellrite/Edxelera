import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import {
  assessmentAPI,
  type AssessmentAttemptResultParams,
  type AssessmentAttemptResultResponse,
} from "./api";

export const assessmentQueryKeys = {
  all: ["assessment"] as const,
  attemptResults: () => [...assessmentQueryKeys.all, "attempt-result"] as const,
  attemptResult: (params: AssessmentAttemptResultParams) =>
    [...assessmentQueryKeys.attemptResults(), params] as const,
};

export const useGetAssessmentAttemptResult = (
  params: AssessmentAttemptResultParams,
  options?: UseQueryOptions<AssessmentAttemptResultResponse, Error>
) => {
  return useQuery({
    queryKey: assessmentQueryKeys.attemptResult(params),
    queryFn: () => assessmentAPI.getAssessmentAttemptResult(params),
    enabled: Boolean(params.slug && params.moduleSlug && params.attemptId),
    ...options,
  });
};
