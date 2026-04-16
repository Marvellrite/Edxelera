'use client';

import { useMemo } from 'react';

import ResetPassChangeForm from '@/features/auth/reset-password/components/reset-password-change';
import ResetPassEmailForm from '@/features/auth/reset-password/components/reset-password-email-form';
import ResetPassOtpForm from '@/features/auth/reset-password/components/reset-password-otp-form';
import EdxeleraLoader from '@/components/ui/loading-text';

import {
  handleEmailSuccess,
  handleOtpSuccess,
  handlePasswordResetSuccess,
} from '../utils';

import AuthShell from './auth-shell';
import { STEP_COPY } from '../constants';
import { useResetPasswordFlow } from '../hooks/use-reset-password-flow';

export default function ResetPasswordPageView() {
  const {
    step,
    email,
    resetToken,
    isReady,
    moveToStep,
    clearFlow,
    router,
  } = useResetPasswordFlow();

  const activeCopy = useMemo(() => STEP_COPY[step], [step]);

  if (!isReady) {
    return (
      <EdxeleraLoader title="" showLoadingText={false} />
    );
  }

  return (
    <AuthShell title={activeCopy.title} description={activeCopy.description}>
      
      {step === 'email' && (
        <ResetPassEmailForm
          defaultEmail={email}
          onSuccess={(data) =>
            handleEmailSuccess(moveToStep, data)
          }
        />
      )}

      {step === 'otp' && (
        <ResetPassOtpForm
          email={email}
          onBack={() => moveToStep('email', { resetToken: '' })}
          onSuccess={(data) =>
            handleOtpSuccess(moveToStep, data)
          }
        />
      )}

      {step === 'change' && (
        <ResetPassChangeForm
          email={email}
          resetToken={resetToken}
          onBack={() => moveToStep('otp')}
          onSuccess={() =>
            handlePasswordResetSuccess(clearFlow, router)
          }
        />
      )}

    </AuthShell>
  );
}