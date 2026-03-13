'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline, Sms } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { useSignIn } from '@/api/auth';

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      toast.success(
        () => <SuccessToast msg={{ title: 'Success', body: data.message || 'Signed in successfully' }} />,
        { closeButton: false }
      );
      router.push('/home');
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Failed to sign in' }} />,
        { closeButton: false }
      );
    },
  });

  const onSubmit = (data: LoginSchema) => {
    signIn(data);
  };

  const email = watch('email');
  const password = watch('password');

  return (
    <section className="max-sm:py-0 flex justify-center min-h-screen md:h-auto lg:py-16.25 items-center">
      <div className="w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117 md:h-fit sm:border border-neutral-400 rounded-[20px] bg-surface">
        <div className="w-53.5 mx-auto">
          <Image
            className="w-full h-auto"
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"
            alt="Edxelera Logo"
            width={256}
            height={108}
          />
        </div>

        <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-2">
            <label className="font-medium text-black block" htmlFor="email">
              Email
            </label>
            <InputIconned
              LeftIcon={Sms}
              register={register}
              name="email"
              input_id="email"
              placeholder="Email"
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div className="mb-6 space-y-2">
            <label className="font-medium text-black block" htmlFor="password">
              Password
            </label>
            <InputIconned
              autoComplete="off"
              LeftIcon={LockOutline}
              register={register}
              name="password"
              input_id="password"
              placeholder="Password"
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

          <div className="mb-5 text-md text-center">
            <Button className="p-0 font-medium h-fit" variant="link" asChild>
              <Link href={'/auth/forgotten-password'}>Forgot password?</Link>
            </Button>
          </div>

          <div>
            <Button
              disabled={!email || !password || isPending}
              type="submit"
              className="w-full h-14.25"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-col justify-between gap-5 text-center">
          <div className="text-medium">
            Don&apos;t have an account?{' '}
            <Button className="p-0 font-medium h-fit" variant="link" asChild>
              <Link href={'/auth/sign-up'}>Sign Up</Link>
            </Button>
          </div>

          <div className="relative mt-4">
            <hr className="border-neutral-500 border" />
            <span className="px-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-surface">
              Or continue with
            </span>
          </div>

          <div className="flex justify-stretch gap-3 w-fit self-center">
            <button
              className="text-neutral-600 flex justify-center items-center text-center grow border-neutral-600 size-16 rounded-full bg-white hover:bg-neutral-50/70"
              title="Login with Apple"
            >
              <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340447/repo-images/public/icons/apple.svg" />
            </button>
            <button
              className="flex justify-center items-center text-center grow border-neutral-600 size-16 text-white rounded-full bg-white hover:bg-neutral-50/70"
              title="Login with Google"
            >
              <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340494/repo-images/public/icons/google.svg" className="text-neutral-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
