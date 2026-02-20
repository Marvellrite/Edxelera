## React Query SSR pattern

Use this pattern in a server page to prefetch and hydrate:

```tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { reactQueryDehydrateOptions } from "@/lib/react-query/hydration";
import CoursesClientPage from "./courses-client-page";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`, {
        cache: "no-store",
      });
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient, reactQueryDehydrateOptions)}>
      <CoursesClientPage />
    </HydrationBoundary>
  );
}
```
