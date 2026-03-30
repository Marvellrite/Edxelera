'use client';

import { useMemo } from 'react';
import { toast } from 'react-toastify';

import ResetPassChangeForm from '@/components/auth/reset-password-change';
import ResetPassEmailForm from '@/components/auth/reset-password-email-form';
import ResetPassOtpForm from '@/components/auth/reset-password-otp-form';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';

import {
   AuthShell,
   STEP_COPY,
   SUCCESS_TOAST_DURATION_MS,
} from './reset-password-page.helpers';
import { useResetPasswordFlow } from './hooks/use-reset-password-flow';

export default function ResetPasswordPageView() {
   const { step, email, resetToken, isReady, moveToStep, clearFlow, router } =
      useResetPasswordFlow();

   const handleEmailSuccess = ({ email: nextEmail }: { email: string }) => {
      moveToStep('otp', { email: nextEmail, resetToken: '' });
   };

   const handleOtpSuccess = ({
      resetToken: nextResetToken,
   }: {
      resetToken?: string;
   }) => {
      if (!nextResetToken) {
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: 'We could not start your reset session. Please request a new code.',
                  }}
               />
            ),
            { closeButton: false }
         );
         return;
      }

      moveToStep('change', { resetToken: nextResetToken });
   };

   const handlePasswordResetSuccess = () => {
      clearFlow();

      toast.success(
         () => (
            <SuccessToast
               msg={{
                  title: 'Success',
                  body: 'Password reset successfully',
               }}
            />
         ),
         {
            closeButton: false,
            autoClose: SUCCESS_TOAST_DURATION_MS,
            onClose: () => router.push('/auth'),
         }
      );
   };

   const activeCopy = useMemo(() => STEP_COPY[step], [step]);

   if (!isReady) {
      return (
         <AuthShell
            title="Reset your password"
            description="Preparing your password reset flow."
         >
            <p className="text-center text-neutral-600">Loading reset form...</p>
         </AuthShell>
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
