'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useForgottenPassword } from '@/api/auth';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Sms } from '@/components/icons/modified';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { Button } from '@/components/ui/button';
import {
   SendPassResetSchema,
   sendPassResetSchema,
} from '@/schemas/send-password-reset.schema';

type ResetPassEmailFormProps = {
   defaultEmail?: string;
   submitLabel?: string;
   onSuccess: (payload: { email: string }) => void;
};

export default function ResetPassEmailForm({
   defaultEmail = '',
   submitLabel = 'Send OTP',
   onSuccess,
}: ResetPassEmailFormProps) {
   const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm<SendPassResetSchema>({
      resolver: zodResolver(sendPassResetSchema),
      defaultValues: {
         email: defaultEmail,
      },
   });

   useEffect(() => {
      reset({ email: defaultEmail });
   }, [defaultEmail, reset]);

   const email = watch('email');

   const { mutate: forgottenPassword, isPending } = useForgottenPassword({
      onSuccess: (data, variables) => {
         toast.success(
            () => (
               <SuccessToast
                  msg={{
                     title: 'Success',
                     body: data.message || 'Verification code sent to your email',
                  }}
               />
            ),
            { closeButton: false }
         );

         onSuccess({ email: variables.email });
      },
      onError: (error) => {
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: error.message || 'Failed to send verification code',
                  }}
               />
            ),
            { closeButton: false }
         );
      },
   });

   const sendOnSubmit = (data: SendPassResetSchema) => {
      forgottenPassword(data);
   };

   return (
      <>
         <form className="space-y-4" onSubmit={handleSubmit(sendOnSubmit)}>
            <div className="flex flex-col gap-y-4">
               <div className="mb-4 space-y-2">
                  <label className="block font-medium text-black" htmlFor="email">
                     Email
                  </label>
                  <InputIconned
                     LeftIcon={Sms}
                     input_id="email"
                     name="email"
                     register={register}
                     placeholder="Enter your email"
                  />
                  {errors.email ? (
                     <FormError>{errors.email.message}</FormError>
                  ) : null}
               </div>

               <div>
                  <Button
                     disabled={!email || isPending}
                     type="submit"
                     className="h-14.25 w-full"
                     loading={isPending}
                  >
                     {isPending ? 'Sending...' : submitLabel}
                  </Button>
               </div>
            </div>
         </form>

         <div className="mt-6 text-center text-medium">
            Remember your password?{' '}
            <Button className="h-fit p-0 font-medium" variant="link" asChild>
               <Link href="/auth">Sign In</Link>
            </Button>
         </div>
      </>
   );
}
