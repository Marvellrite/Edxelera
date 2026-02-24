'use client';

import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, useWatch } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { InputIconned } from '@/components/data/input-iconned';
import { LockOutline, Sms } from '@/components/icons/modified';
import { Eye, EyeSlash } from '@/components/icons/modified';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { toast } from 'react-toastify';
import { useSignIn } from '@/api/auth';

const Page: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      toast.success(
        () => <SuccessToast msg={{ title: 'Success', body: data.message || 'Login successful' }} />,
        { closeButton: false, onClose: () => router.push('/home') }
      );
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Login failed' }} />,
        { closeButton: false }
      );
    },
  });

  const onSubmit = (data: LoginSchema) => {
    signIn(data);
  };

  const [email, password] = useWatch({ control, name: ['email', 'password'] });

  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-linear-to-b from-white to-surface-home">
      <div className="hidden lg:flex items-end p-10 bg-linear-to-br from-primary to-primary-400 text-white">
        <div className="max-w-md space-y-4 pb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">Welcome to Edxelera</p>
          <h2 className="text-4xl font-semibold leading-[120%]">A structured learning path built for career growth.</h2>
          <p className="text-white/90">Join thousands of learners mastering in-demand skills with instructor-led classes, practical projects, and peer community.</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-6 sm:py-10 lg:py-16.25 px-4">
        <div className="w-full rounded-[24px] border border-neutral-300 bg-white px-4 pt-6 py-7.5 sm:px-6 md:max-w-117 shadow-[0_24px_50px_rgba(4,5,6,0.08)]">
          <div className="w-53.5 mx-auto">
            <Image className="w-full h-auto" src="/images/edx_logo_1.png" alt="Edxelera Logo" width={256} height={63} />
          </div>
          <h1 className="mt-8 text-3xl font-semibold text-black md:text-4xl">Welcome back</h1>
          <p className="text-neutral-700 mt-1 mb-6">Log in to continue your learning journey.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-2">
              <label className="font-medium text-black block" htmlFor="email">
                Email
              </label>
              <InputIconned
                LeftIcon={Sms}
                register={register}
                input_id="email"
                name="email"
                placeholder="Enter your mail"
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
            <div className="mb-6 space-y-2">
              <label className="font-medium text-black block" htmlFor="password">
                Password
              </label>
              <InputIconned
                LeftIcon={LockOutline}
                RightIcon={
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  >
                    {isPasswordVisible ? <EyeSlash /> : <Eye />}
                  </button>
                }
                register={register}
                input_id="password"
                name="password"
                placeholder="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="off"
              />
              {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>
            <div className="mb-5 flex justify-end">
              <Link className="hover:underline underline-offset-2" href={'/auth/reset-password'}>
                Forgot Password?
              </Link>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full h-14.25"
                disabled={!email || !password || isPending}
                loading={isPending}
              >
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>

          <div className="mt-10 flex flex-col justify-between gap-5">
            <div className="relative">
              <hr className="border-neutral-300 border" />
              <span className="px-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-neutral-700 text-sm">
                Or continue with
              </span>
            </div>
            <div className="flex flex-col gap-3 w-full self-center">
              <button
                className="text-neutral-700 flex justify-center items-center gap-2 border border-neutral-300 h-12 rounded-full bg-white hover:bg-neutral-50/70"
                title="Login with Apple"
              >
                <ReactSVG src="/icons/apple.svg" /> Continue with Apple
              </button>
              <button
                className="flex justify-center items-center gap-2 border border-neutral-300 h-12 rounded-full bg-white hover:bg-neutral-50/70 text-neutral-700"
                title="Login with Google"
              >
                <ReactSVG src="/icons/google.svg" className="text-neutral-600" /> Continue with Google
              </button>
            </div>
            <div className="text-md basis-full text-center">
              Don&apos;t have an account?{' '}
              <Button variant={'link'} className="font-medium text-primary p-0">
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
