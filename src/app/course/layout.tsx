import ContextProvider from "@/context";
import HomeLayoutContent from "../home/components/layout/homeLayout";
import Header from "@/components/sections/headers/header-4";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { reactQueryDehydrateOptions } from "@/lib/react-query/hydration";

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
            <section className="col-span-10 grow flex-1  px-8 xl:px-10 py-5 max-md:px-0 max-md:py-0 max-md:-mt-2 ">
              <Header />
              <div className=''>
              {children}
              </div>
            </section>
          </HomeLayoutContent>
      </ContextProvider>
    </HydrationBoundary>
  );
}
