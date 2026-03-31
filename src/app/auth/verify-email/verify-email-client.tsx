'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { OtpInputGroup } from '@/components/auth/otp-input-group';
import Link from 'next/link';
import { useResendOtp, useVerifyOtp } from '@/api/auth';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { z } from 'zod';

const SUCCESS_TOAST_DURATION_MS = 1800;
const ERROR_TOAST_DURATION_MS = 2500;
const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

const verifyOtpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});

type VerifyEmailClientProps = {
  email: string;
};

const maskEmail = (value: string) => {
  const [localPart = '', domain = ''] = value.split('@');
  if (!localPart || !domain) {
    return value;
  }

  if (localPart.length <= 2) {
    return `${localPart[0] ?? '*'}***@${domain}`;
  }

  return `${localPart.slice(0, 2)}***@${domain}`;
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

const AuthShell = ({ children }: { children: ReactNode }) => (
  <section className="flex min-h-screen items-center justify-center py-6 sm:py-10 lg:py-16.25">
    <div className="w-full rounded-[20px] border border-neutral-400 bg-surface px-4 py-7.5 sm:px-5 md:max-w-117 relative">
      {children}
    </div>
  </section>
);

const InvalidLinkState = () => (
  <AuthShell>
    <h1 className="mt-8 mb-4 text-center text-2xl font-medium text-black">Invalid Link</h1>
    <p className="mb-6 text-center text-gray-600">This verification link is invalid or has expired.</p>
    <Button asChild className="h-14.25 w-full">
      <Link href="/auth/sign-up">Back to Sign Up</Link>
    </Button>
  </AuthShell>
);

const VerifyEmailClient = ({ email }: VerifyEmailClientProps) => {
  const [completeOtp, setCompleteOtp] = useState<string[]>([]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const router = useRouter();
  const resendCooldown = useResendCooldown();

  const isOtpComplete = completeOtp.length === OTP_LENGTH && completeOtp.every((char) => char !== '');
  const maskedEmail = useMemo(() => maskEmail(email), [email]);

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
      setOtpError(error.message || 'Invalid OTP');
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
      resendCooldown.start();
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
      const validationError = parsed.error.issues[0]?.message || 'Invalid OTP';
      setOtpError(validationError);
      toast.error(validationError);
      return;
    }

    setOtpError(null);
    verifyOtp({ email, otp: parsed.data.otp, otp_type: 'account_verification' });
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    resendOtp({ email });
  };

  if (!email) return <InvalidLinkState />;

  return (
    <AuthShell>
      <div>
        <div className="w-53.5 mx-auto">
          <Image
            className="w-full h-auto"
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"
            alt="Edxelera Logo"
            width={256}
            height={63}
          />
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-medium text-black md:text-4xl">OTP Verification</h1>
        <p className="mt-4 mb-6 font-medium">
          We&apos;ve sent a 6-digit OTP to <strong>{maskedEmail}</strong>. Enter it below to verify your email.
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
                if (otpError) {
                  setOtpError(null);
                }
              }}
              length={OTP_LENGTH}
              inputMode="alphanumeric"
            />
          </div>
          {otpError && (
            <p aria-live="polite" className="mb-6 text-center text-sm text-danger">
              {otpError}
            </p>
          )}
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
              disabled={resendCooldown.isActive || isResending}
              type="button"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </Button>
          </div>
          {resendCooldown.isActive && (
            <p className="mb-1 text-center text-sm text-neutral-600">
              You can resend in {resendCooldown.secondsLeft}s
            </p>
          )}
        </form>
      </div>
    </AuthShell>
  );
};

export default VerifyEmailClient;
