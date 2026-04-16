   export const handleEmailSuccess = ({ email: nextEmail }: { email: string }) => {
      moveToStep('otp', { email: nextEmail, resetToken: '' });
   };

   export const handleOtpSuccess = ({
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

  export const handlePasswordResetSuccess = () => {
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


export const handlePasswordReset = (data: ResetPassSchema) => {
      if (!email || !resetToken) {
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: 'Your reset session is missing. Please request a new verification code.',
                  }}
               />
            ),
            { closeButton: false }
         );
         return;
      }

      resetPassword({
         email,
         token: resetToken,
         password: data.password,
      });
   };