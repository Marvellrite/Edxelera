import { cookies } from "next/headers";
import { dehydrate } from "@tanstack/react-query";

import {
  assessmentQueryKeys,
  getAssessmentAttemptResultPaths,
  type AssessmentAttemptResultParams,
  type AssessmentAttemptResultResponse,
} from "@/api/assessment";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { reactQueryDehydrateOptions } from "@/lib/react-query/hydration";

import ResultPageShell from "./result-page-shell";

type ResultPageProps = {
  params: Promise<AssessmentAttemptResultParams>;
};

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_SERVER_URL;

const safeReadError = async (response: Response) => {
  try {
    const error = await response.json();
    return error?.message;
  } catch {
    return undefined;
  }
};

const fetchAssessmentAttemptResultServer = async (
  params: AssessmentAttemptResultParams
) => {
  if (!BACKEND_BASE_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_SERVER_URL for assessment result requests"
    );
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const paths = getAssessmentAttemptResultPaths(params);
  let lastError: Error | undefined;

  for (const path of paths) {
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-client-type": "web",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    if (response.ok) {
      return (await response.json()) as AssessmentAttemptResultResponse;
    }

    const message = await safeReadError(response);
    lastError = new Error(
      message || `Request failed with status ${response.status}`
    );
  }

  throw (
    lastError ?? new Error("Unable to load assessment result for this attempt")
  );
};

const AssessmentResultPage = async ({ params }: ResultPageProps) => {
  const resolvedParams = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: assessmentQueryKeys.attemptResult(resolvedParams),
    queryFn: () => fetchAssessmentAttemptResultServer(resolvedParams),
  });

  return (
    <ResultPageShell
      dehydratedState={dehydrate(queryClient, reactQueryDehydrateOptions)}
      params={resolvedParams}
    />
  );
};

export default AssessmentResultPage;
