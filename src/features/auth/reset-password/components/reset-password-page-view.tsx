'use client';

import { useMemo } from 'react';
import { toast } from 'react-toastify';

import ResetPassChangeForm from '@/features/auth/reset-password/components/reset-password-change';
import ResetPassEmailForm from '@/features/auth/reset-password/components/reset-password-email-form';
import ResetPassOtpForm from '@/features/auth/reset-password/components/reset-password-otp-form';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import EdxeleraLoader from '@/components/ui/loading-text';
import { handleEmailSuccess, handleOtpSuccess, handlePasswordResetSuccess } from '../utils'

import {
   AuthShell,
   STEP_COPY,
   SUCCESS_TOAST_DURATION_MS,
} from './reset-password-page.helpers';
import { useResetPasswordFlow } from '../hooks/use-reset-password-flow';

export default function ResetPasswordPageView() {
   const { step, email, resetToken, isReady, moveToStep, clearFlow, router } =
      useResetPasswordFlow();

   const activeCopy = useMemo(() => STEP_COPY[step], [step]);

   if (!isReady) {
      return (
            <EdxeleraLoader
                     title=""
                     showLoadingText={false}
                  />
      );
   }

   return (
      <AuthShell title={activeCopy.title} description={activeCopy.description}>
         {step === 'email' ? (
            <ResetPassEmailForm
               defaultEmail={email}
               onSuccess={handleEmailSuccess}
            />
         ) : null}

         {step === 'otp' ? (
            <ResetPassOtpForm
               email={email}
               onBack={() => moveToStep('email', { resetToken: '' })}
               onSuccess={handleOtpSuccess}
            />
         ) : null}

         {step === 'change' ? (
            <ResetPassChangeForm
               email={email}
               resetToken={resetToken}
               onBack={() => moveToStep('otp')}
               onSuccess={handlePasswordResetSuccess}
            />
         ) : null}
      </AuthShell>
   );
}
