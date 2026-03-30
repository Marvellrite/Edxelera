'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';

import type {
   ResetPasswordFlowState,
   ResetPasswordStep,
   ResetPasswordStepCopy,
} from './reset-password-page.types';

export const FLOW_EMAIL_KEY = 'reset-password-email';
export const FLOW_TOKEN_KEY = 'reset-password-token';
export const SUCCESS_TOAST_DURATION_MS = 1800;
export const RESET_PASSWORD_LOGO =
   'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png';

export const STEP_COPY: Record<ResetPasswordStep, ResetPasswordStepCopy> = {
   email: {
      title: 'Reset your password',
      description: 'Enter the email associated with your account.',
   },
   otp: {
      title: 'Verify your code',
      description: 'Enter the verification code sent to your email.',
   },
   change: {
      title: 'Create a new password',
      description: 'Choose a new password for your account.',
   },
};

export const isResetPasswordStep = (
   value: string | null
): value is ResetPasswordStep =>
   value === 'email' || value === 'otp' || value === 'change';

export const buildStepHref = (
   pathname: string,
   step: ResetPasswordStep,
   email?: string
) => {
   const params = new URLSearchParams();
   params.set('step', step);

   if (email) {
      params.set('email', email);
   }

   return `${pathname}?${params.toString()}`;
};

export const resolveFlowState = (
   searchParams: URLSearchParams,
   storedEmail: string,
   storedToken: string
): ResetPasswordFlowState => {
   const queryEmail = searchParams.get('email') || '';
   const queryToken = searchParams.get('token') || '';
   const requestedStep = searchParams.get('step');

   const nextEmail = queryEmail || storedEmail;
   const nextResetToken = queryToken || storedToken;

   let nextStep: ResetPasswordStep = isResetPasswordStep(requestedStep)
      ? requestedStep
      : 'email';

   if (queryToken && nextEmail) {
      nextStep = 'change';
   }

   if (nextStep === 'change' && (!nextEmail || !nextResetToken)) {
      nextStep = nextEmail ? 'otp' : 'email';
   }

   if (nextStep === 'otp' && !nextEmail) {
      nextStep = 'email';
   }

   return {
      step: nextStep,
      email: nextEmail,
      resetToken: nextResetToken,
   };
};

export const AuthShell = ({
   title,
   description,
   children,
}: {
   title: string;
   description: string;
   children: ReactNode;
}) => (
   <section className="flex min-h-screen items-center justify-center py-6 sm:py-10 lg:py-16.25">
      <div className="w-full rounded-[20px] border border-neutral-400 bg-surface px-4 py-7.5 sm:px-5 md:max-w-117">
         <div className="mx-auto w-53.5">
            <Image
               className="h-auto w-full"
               src={RESET_PASSWORD_LOGO}
               alt="Edxelera Logo"
               width={256}
               height={108}
            />
         </div>

         <div className="mb-6 mt-8 space-y-2">
            <h1 className="text-3xl font-medium text-black md:text-4xl">
               {title}
            </h1>
            <p className="text-neutral-600">{description}</p>
         </div>

         {children}
      </div>
   </section>
);
