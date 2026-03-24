"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";

import Provider from "@/app/providers";
import type { AssessmentAttemptResultParams } from "@/api/assessment";

import ResultPageClient from "./result-page-client";

type ResultPageShellProps = {
  dehydratedState: DehydratedState;
  params: AssessmentAttemptResultParams;
};

const ResultPageShell = ({
  dehydratedState,
  params,
}: ResultPageShellProps) => {
  return (
    <Provider>
      <HydrationBoundary state={dehydratedState}>
        <ResultPageClient {...params} />
      </HydrationBoundary>
    </Provider>
  );
};

export default ResultPageShell;
