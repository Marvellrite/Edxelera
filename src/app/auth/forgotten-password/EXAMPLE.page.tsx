'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Sms } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { useForgottenPassword } from '@/api/auth';
import { z } from 'zod';

// Schema for forgotten password
const forgottenPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});

type ForgottenPasswordSchema = z.infer<typeof forgottenPasswordSchema>;

const ForgottenPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgottenPasswordSchema>({
    resolver: zodResolver(forgottenPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();
  const email = watch('email');

  const { mutate: forgottenPassword, isPending } = useForgottenPassword({
    onSuccess: (data) => {
      toast.success(
        () => (
          <SuccessToast
            msg={{
              title: 'Success',
              body: data.message || 'Check your email for password reset instructions',
            }}
          />
        ),
        { closeButton: false }
      );
      router.push('/auth'); // Redirect after a timeout
    },
    onError: (error) => {
      toast.error(
        () => <ErrorToast msg={{ title: 'Error', body: error.message || 'Failed to process request' }} />,
        { closeButton: false }
      );
    },
  });

  const onSubmit = (data: ForgottenPasswordSchema) => {
    forgottenPassword(data);
  };

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
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-2">
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

          <div>
            <Button
              disabled={!email || isPending}
              type="submit"
              className="w-full h-14.25"
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="text-medium">
            Remember your password?{' '}
            <Button className="p-0 font-medium h-fit" variant="link" asChild>
              <Link href={'/auth'}>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgottenPasswordPage;
