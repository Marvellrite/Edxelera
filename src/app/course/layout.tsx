import ContextProvider from "@/context";
import HomeLayoutContent from "../home/components/layout/homeLayout";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { reactQueryDehydrateOptions } from "@/lib/react-query/hydration";
import CourseHeaderShell from "./course-header-shell";

export default async function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient, reactQueryDehydrateOptions)}>
      <ContextProvider>  
          <HomeLayoutContent>
            <section className="col-span-10 flex flex-col grow flex-1  px-8 xl:px-10 py-5 max-md:px-0 max-md:py-0 max-md:-mt-2 min-h-full">
              <CourseHeaderShell />
              <div className='grow flex '>
              {children}
              </div>
            </section>
          </HomeLayoutContent>
      </ContextProvider>
    </HydrationBoundary>
  );
}

