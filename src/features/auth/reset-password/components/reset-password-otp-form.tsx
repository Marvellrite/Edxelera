'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { useResendOtp, useVerifyOtp } from '../../hooks';
import FormError from '@/components/auth/form-error';
import { OtpInputGroup } from '@/components/auth/otp-input-group';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { Button } from '@/components/ui/button';
import { maskEmail } from '../../utils';
import { extractResetToken } from '../utils';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

type ResetPassOtpFormProps = {
   email: string;
   onBack?: () => void;
   onSuccess: (payload: { resetToken?: string }) => void;
};

const useResendCooldown = (initialSeconds = RESEND_COOLDOWN_SECONDS) => {
   const [secondsLeft, setSecondsLeft] = useState(0);

   useEffect(() => {
      if (secondsLeft <= 0) {
         return;
      }

      const timeoutId = setTimeout(() => {
         setSecondsLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearTimeout(timeoutId);
   }, [secondsLeft]);

   return {
      secondsLeft,
      isActive: secondsLeft > 0,
      start: () => setSecondsLeft(initialSeconds),
   };
};

const ResetPassOtpForm: React.FC<ResetPassOtpFormProps> = ({
   email,
   onBack,
   onSuccess,
}) => {
   const [completeOtp, setCompleteOtp] = useState<string[]>([]);
   const [otpError, setOtpError] = useState<string | null>(null);
   const resendCooldown = useResendCooldown();
   const maskedEmail = useMemo(() => maskEmail(email), [email]);

   const isOtpComplete =
      completeOtp.length === OTP_LENGTH && completeOtp.every((otp) => otp !== '');

   const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp({
      onSuccess: (data) => {
         const resetToken = extractResetToken(data);

         toast.success(
            () => (
               <SuccessToast
                  msg={{
                     title: 'Success',
                     body: data.message || 'Verification successful',
                  }}
               />
            ),
            { closeButton: false }
         );

         onSuccess({ resetToken });
      },
      onError: (error) => {
         setOtpError(error.message || 'Invalid verification code');
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: error.message || 'Invalid verification code',
                  }}
               />
            ),
            { closeButton: false }
         );
      },
   });

   const { mutate: resendOtp, isPending: isResending } = useResendOtp({
      onSuccess: (data) => {
         toast.success(
            () => (
               <SuccessToast
                  msg={{
                     title: 'Success',
                     body: data.message || 'Verification code sent again',
                  }}
               />
            ),
            { closeButton: false }
         );
         resendCooldown.start();
      },
      onError: (error) => {
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: error.message || 'Failed to resend verification code',
                  }}
               />
            ),
            { closeButton: false }
         );
      },
   });

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email) {
         setOtpError('Email is required to verify this step.');
         return;
      }

      const otp = completeOtp.join('');
      setOtpError(null);
      verifyOtp({ email, otp, otp_type: 'password_reset' });
   };

   const handleResendOtp = () => {
      if (!email) {
         setOtpError('Email is required to resend a verification code.');
         return;
      }

      resendOtp({ email });
   };

   return (
      <>
         <p className="mb-7 mt-4 text-center font-medium sm:text-left">
            We&apos;ve sent a 6 digit OTP to <strong>{maskedEmail}</strong>.
         </p>

         <form onSubmit={handleSubmit}>
            <div className="mb-10 flex justify-center">
               <OtpInputGroup
                  onChange={(otp) => {
                     setCompleteOtp(otp);
                     if (otpError) {
                        setOtpError(null);
                     }
                  }}
                  length={OTP_LENGTH}
                  inputMode="alphanumeric"
               />
            </div>

            {otpError ? (
               <div className="mb-6 text-center">
                  <FormError>{otpError}</FormError>
               </div>
            ) : null}

            <div className="mb-6">
               <Button
                  disabled={!isOtpComplete || isVerifying}
                  type="submit"
                  variant="default"
                  className="h-14.25 w-full px-2.5 font-medium text-white"
                  loading={isVerifying}
               >
                  {isVerifying ? 'Verifying...' : 'Verify'}
               </Button>
            </div>

            <div className="mb-1 text-center text-md">
               Didn&apos;t see code?{' '}
               <Button
                  variant="link"
                  className="px-0 font-medium text-primary"
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown.isActive || isResending}
               >
                  {isResending ? 'Sending...' : 'Resend Code'}
               </Button>
            </div>

            {resendCooldown.isActive ? (
               <p className="mb-1 text-center text-sm text-neutral-600">
                  You can resend in {resendCooldown.secondsLeft}s
               </p>
            ) : null}

            <div className="mt-4 flex flex-col items-center gap-2 text-md">
               {onBack ? (
                  <Button
                     type="button"
                     variant="link"
                     className="h-fit px-0 font-medium"
                     onClick={onBack}
                  >
                     Use a different email
                  </Button>
               ) : null}

               <Button className="h-fit px-0 font-medium" variant="link" asChild>
                  <Link href="/auth">Login with password</Link>
               </Button>
            </div>
         </form>
      </>
   );
};

export default ResetPassOtpForm;
