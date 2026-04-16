'use client';

import { Suspense } from 'react';
import EdxeleraLoader from '@/components/ui/loading-text';

// import {
//    AuthShell,
// } from './reset-password-page.helpers';
import ResetPasswordPageView from './reset-password-page-view';

const ResetPasswordPage = () => (
   <Suspense
      fallback={<EdxeleraLoader
            title=""
            showLoadingText={false}
         />
      }
   >
      <ResetPasswordPageView />
   </Suspense>
);

export default ResetPasswordPage;
