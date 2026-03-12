import ContextProvider from '@/context';
import HomeLayoutContent from './components/layout/homeLayout';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ClearPendingEmailOnLoad from './components/clear-pending-email-on-load';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { reactQueryDehydrateOptions } from '@/lib/react-query/hydration';

export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
      const queryClient = getQueryClient();
      // const userId = await getAuthenticatedUserId();
      // console.log(userId)

      // await queryClient.prefetchQuery(UserFetchOptions.getUserDetails(userId));

   return (
      <HydrationBoundary state={dehydrate(queryClient, reactQueryDehydrateOptions)}>
         <ContextProvider>
               <ClearPendingEmailOnLoad />
               <HomeLayoutContent>{children}</HomeLayoutContent>
         </ContextProvider>
      </HydrationBoundary>
   );
}
