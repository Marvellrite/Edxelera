'use client';

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
import { useForgottenPassword } from '@/features/auth/reset-password/hooks/use-reset-password';
import { z } from 'zod';

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
      router.push('/auth');
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
    <section className="flex min-h-screen items-center justify-center py-6 sm:py-10 lg:py-16.25">
      <div className="w-full rounded-[20px] border border-neutral-400 bg-surface px-4 py-7.5 sm:px-5 md:max-w-117 relative">
        <div className="w-53.5 mx-auto">
          <Image className="w-full h-auto" src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png" alt="Edxelera Logo" width={256} height={108} />
        </div>

        <h1 className="mt-8 mb-4 text-3xl font-medium text-black md:text-4xl">Reset Password</h1>
        <p className="text-gray-600 mb-6">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-2">
            <label className="font-medium text-black block" htmlFor="email">
              Email
            </label>
            <InputIconned LeftIcon={Sms} register={register} name="email" input_id="email" placeholder="Email" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div>
            <Button disabled={!email || isPending} type="submit" className="w-full h-14.25" loading={isPending}>
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
