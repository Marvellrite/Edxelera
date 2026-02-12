'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FormError from '@/components/auth/form-error';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { useVerifyOtp, useResendOtp } from '@/api/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema for OTP verification
const verifyOtpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});

type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

const OtpVerificationPage: React.FC = () => {
  const router = useRouter();
  const email = (typeof window !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('pendingEmail='))?.split('=')[1] : '') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<VerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otp = useWatch({
           control,
           name: 'otp',
        });

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp(
    {
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
        { closeButton: false, onClose: () => router.push('/home') }
      );
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Invalid OTP' }} />,
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
              body: data.message || 'OTP sent to your email',
            }}
          />
        ),
        { closeButton: false }
      );

      // Disable resend button for 60 seconds
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

  const onSubmit = (data: VerifyOtpSchema) => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    verifyOtp({ email, otp: data.otp });
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
    <section className="max-sm:py-0 flex justify-center min-h-screen md:h-auto lg:py-16.25 items-center">
      <div className="w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117 md:h-fit sm:border border-neutral-400 rounded-[20px] bg-surface">
        <div className="w-53.5 mx-auto">
          <Image
            className="w-full h-auto"
            src="/images/edx_logo_1.png"
            alt="Edxelera Logo"
            width={256}
            height={108}
          />
        </div>

        <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Verify Email</h1>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>. Enter it below to verify your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-2">
            <label className="font-medium text-black block" htmlFor="otp">
              Verification Code
            </label>
            <input
              {...register('otp')}
              id="otp"
              type="text"
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-3 border border-neutral-400 rounded-lg text-center text-2xl tracking-widest"
            />
            {errors.otp && <FormError>{errors.otp.message}</FormError>}
          </div>

          <div className="mb-6">
            <Button
              disabled={!otp || isVerifying}
              type="submit"
              className="w-full h-14.25"
              loading={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </form>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Didn&apos;t receive the code?{' '}
            <Button
              variant="link"
              className="p-0 font-medium h-fit"
              onClick={handleResendOtp}
              disabled={isResendDisabled || isResending}
            >
              {isResending ? 'Sending...' : isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </Button>
          </p>

          <div className="text-medium">
            <Button className="p-0 font-medium h-fit" variant="link" asChild>
              <Link href={'/auth/sign-up'}>Back to Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtpVerificationPage;
