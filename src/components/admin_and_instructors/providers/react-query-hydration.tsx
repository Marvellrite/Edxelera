import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { reactQueryDehydrateOptions } from "@/lib/react-query/hydration";

export default function ReactQueryHydration({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient, reactQueryDehydrateOptions)}>
      {children}
    </HydrationBoundary>
  );
}
