'use client';

import { Suspense } from 'react';

import {
   AuthShell,
} from './reset-password-page.helpers';
import ResetPasswordPageView from './reset-password-page-view';

const ResetPasswordPage = () => (
   <Suspense
      fallback={
         <AuthShell
            title="Reset your password"
            description="Preparing your password reset flow."
         >
            <p className="text-center text-neutral-600">Loading reset form...</p>
         </AuthShell>
      }
   >
      <ResetPasswordPageView />
   </Suspense>
);

export default ResetPasswordPage;
