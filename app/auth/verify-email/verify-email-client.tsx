'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { OtpInputGroup } from '@/components/auth/OtpInputGroup';
import Link from 'next/link';
import { useResendOtp, useVerifyOtp } from '@/api/auth';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { z } from 'zod';

const SUCCESS_TOAST_DURATION_MS = 1800;
const ERROR_TOAST_DURATION_MS = 2500;
const OTP_LENGTH = 6;

const verifyOtpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});

type VerifyEmailClientProps = {
  email: string;
};

const VerifyEmailClient = ({ email }: VerifyEmailClientProps) => {
  const [completeOtp, setCompleteOtp] = useState<string[]>([]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  const isOtpComplete = completeOtp.length === OTP_LENGTH && completeOtp.every((char) => char !== '');

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp({
    onSuccess: (data) => {
      toast.success(
        () => (
          <SuccessToast
            msg={{
              title: 'Success',
              body: data.message || 'Email verified successfully',
            }}
          />
        ),
        { closeButton: false, onClose: () => router.replace('/home'), autoClose: SUCCESS_TOAST_DURATION_MS }
      );
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Invalid OTP' }} />,
        { closeButton: false, autoClose: ERROR_TOAST_DURATION_MS }
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
              body: data.message || 'OTP sent to your email',
            }}
          />
        ),
        { closeButton: false }
      );

      setIsResendDisabled(true);
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Failed to resend OTP' }} />,
        { closeButton: false }
      );
    },
  });

  const onSubmit = () => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    const otp = completeOtp.join('');
    const parsed = verifyOtpSchema.safeParse({ otp });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || 'Invalid OTP');
      return;
    }

    verifyOtp({ email, otp: parsed.data.otp });
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    resendOtp({ email });
  };

  if (!email) {
    return (
      <section className="max-sm:py-0 flex justify-center min-h-screen md:h-auto lg:py-16.25 items-center">
        <div className="w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117 md:h-fit sm:border border-neutral-400 rounded-[20px] bg-surface">
          <h1 className="text-2xl font-medium mt-10 mb-6 text-black text-center">Invalid Link</h1>
          <p className="text-center mb-6 text-gray-600">
            This verification link is invalid or has expired.
          </p>
          <Button asChild className="w-full h-14.25">
            <Link href="/auth/sign-up">Back to Sign Up</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-sm:py-0 flex justify-center min-h-screen items-center h-screen md:h-auto md:w-auto md:items-center lg:py-16.25">
      <div className="basis-full md:rounded-[20px] px-5 max-sm:px-4 pt-6 md:max-w-117 md:h-auto py-7.5 w-screen md:w-auto h-full sm:border border-neutral-400 rounded-[20px] bg-surface">
        <div className="w-53.5 mx-auto">
          <Image
            className="w-full h-auto"
            src="/images/edx_logo_1.png"
            alt="Edxelera Logo"
            width={256}
            height={63}
          />
        </div>
        <h1 className="text-5xl font-medium mt-10 mb-6 text-black">OTP Verification</h1>
        <p className="my-6 mb-7 mt-4 font-medium">
          We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>. Enter it below to verify your email.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex justify-center mb-10">
            <OtpInputGroup
              onChange={(otp) => {
                setCompleteOtp(otp);
              }}
              length={OTP_LENGTH}
              inputMode="alphanumeric"
            />
          </div>
          <div className="mb-6">
            <Button
              disabled={!isOtpComplete || isVerifying}
              variant="default"
              type="submit"
              className="font-medium w-full text-white px-2.5 h-14.25"
              loading={isVerifying}
            >
              <span>{isVerifying ? 'Verifying...' : 'Verify'}</span>
            </Button>
          </div>

          <div className="text-md text-center mb-1">
            Didn&apos;t see code?{' '}
            <Button
              variant="link"
              className="text-primary font-medium px-0"
              onClick={handleResendOtp}
              disabled={isResendDisabled || isResending}
              type="button"
            >
              {isResending ? 'Sending...' : isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyEmailClient;

