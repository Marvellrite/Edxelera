'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { useResetPassword } from '@/api/auth';
import { ResetPassSchema, resetPassSchema } from '@/schemas/reset-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPassSchema>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: (data) => {
      toast.success(
        () => (
          <SuccessToast
            msg={{
              title: 'Success',
              body: data.message || 'Password reset successfully',
            }}
          />
        ),
        { closeButton: false }
      );
      router.push('/auth');
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Failed to reset password' }} />,
        { closeButton: false }
      );
    },
  });

  const onSubmit = (data: ResetPassSchema) => {
    if (!email || !token) {
      toast.error('Invalid reset link');
      return;
    }

    resetPassword({
      email,
      token,
      password: data.password,
    });
  };

  if (!email || !token) {
    return (
      <section className="max-sm:py-0 flex justify-center min-h-screen md:h-auto lg:py-16.25 items-center">
        <div className="w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117 md:h-fit sm:border border-neutral-400 rounded-[20px] bg-surface">
          <h1 className="text-2xl font-medium mt-10 mb-6 text-black text-center">Invalid Reset Link</h1>
          <p className="text-center mb-6 text-gray-600">
            This password reset link is invalid or has expired.
          </p>
          <Button asChild className="w-full h-14.25">
            <Link href="/auth/forgotten-password">Request New Link</Link>
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

        <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Reset Password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-2">
            <label className="font-medium text-black block" htmlFor="password">
              New Password
            </label>
            <InputIconned
              autoComplete="off"
              LeftIcon={LockOutline}
              register={register}
              name="password"
              input_id="password"
              placeholder="New Password"
              type={isPasswordVisible ? 'text' : 'password'}
              RightIcon={
                <span
                  className="cursor-pointer"
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? <EyeSlash /> : <Eye />}
                </span>
              }
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>

          <div className="mb-6 space-y-2">
            <label className="font-medium text-black block" htmlFor="confirm_password">
              Confirm Password
            </label>
            <InputIconned
              autoComplete="off"
              LeftIcon={LockOutline}
              placeholder="Confirm Password"
              register={register}
              name="confirm_password"
              input_id="confirm_password"
              RightIcon={
                <span
                  className="cursor-pointer"
                  onClick={() => setIsConfirmPasswordVisible((visible) => !visible)}
                >
                  {isConfirmPasswordVisible ? <EyeSlash /> : <Eye />}
                </span>
              }
              type={isConfirmPasswordVisible ? 'text' : 'password'}
            />
            {errors.confirm_password && <FormError>{errors.confirm_password.message}</FormError>}
          </div>

          <div>
            <Button
              disabled={!password || !confirm_password || isPending}
              type="submit"
              className="w-full h-14.25"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="text-medium">
            <Button className="p-0 font-medium h-fit" variant="link" asChild>
              <Link href={'/auth'}>Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
