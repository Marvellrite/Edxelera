import ContextProvider from '../context';
import { SidebarProvider } from './context/sidebar-context';
import HomeLayoutContent from './components/layout/homeLayout';
import { getQueryClient } from '../lib/query-client';
import UserFetchOptions from '@/api/user/fetchOptions';
import ClearPendingEmailOnLoad from './components/clear-pending-email-on-load';
import { getAuthenticatedUserId } from '../lib/server/get-authenticated-user-id';

export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
      const queryClient = getQueryClient();
      const userId = await getAuthenticatedUserId();
      console.log(userId)

      await queryClient.prefetchQuery(UserFetchOptions.getUserDetails(userId));

   return (
      <ContextProvider>
         <SidebarProvider>
            <ClearPendingEmailOnLoad />
            <HomeLayoutContent>{children}</HomeLayoutContent>
         </SidebarProvider>
      </ContextProvider>
   );
}
