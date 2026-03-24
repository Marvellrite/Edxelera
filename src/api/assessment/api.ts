export type AssessmentAttemptResultParams = {
  slug: string;
  moduleSlug: string;
  attemptId: string;
};

export type AssessmentAttemptResultData = {
  status?: string;
  passed?: boolean;
  score?: number;
  percentage_score?: number;
  score_percentage?: number;
  remaining_trials?: number;
  attempts_left?: number;
  next_module_slug?: string | null;
  review_url?: string | null;
  retake_url?: string | null;
  module_url?: string | null;
};

export type AssessmentAttemptResultResponse =
  | {
      success: boolean;
      message?: string;
      data?: AssessmentAttemptResultData;
    }
  | AssessmentAttemptResultData;

const WEB_CLIENT_HEADER = { "x-client-type": "web" } as const;

export const getAssessmentAttemptResultPaths = ({
  slug,
  moduleSlug,
  attemptId,
}: AssessmentAttemptResultParams) => [
  `/courses/${slug}/modules/${moduleSlug}/assessment/attempt/${attemptId}/result`,
  `/courses/${slug}/modules/${moduleSlug}/assessments/attempt/${attemptId}/result`,
  `/courses/${slug}/learn/${moduleSlug}/assessment/attempt/${attemptId}/result`,
  `/courses/${slug}/learn/${moduleSlug}/assessments/attempt/${attemptId}/result`,
];

const safeReadError = async (response: Response) => {
  try {
    const error = await response.json();
    return error?.message;
  } catch {
    return undefined;
  }
};

const fetchFromProxy = async <T>(path: string) => {
  const response = await fetch(`/api/proxy${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      ...WEB_CLIENT_HEADER,
    },
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const assessmentAPI = {
  getAssessmentAttemptResult: async (
    params: AssessmentAttemptResultParams
  ): Promise<AssessmentAttemptResultResponse> => {
    const paths = getAssessmentAttemptResultPaths(params);
    let lastError: Error | undefined;

    for (const path of paths) {
      try {
        return await fetchFromProxy<AssessmentAttemptResultResponse>(path);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Request failed");
      }
    }

    throw (
      lastError ??
      new Error("Unable to load assessment result for this attempt")
    );
  },
};
