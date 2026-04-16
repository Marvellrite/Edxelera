'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useResetPassword } from '@/api/auth';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline } from '@/components/icons/modified';
import { ErrorToast } from '@/components/toast/toaster';
import { Button } from '@/components/ui/button';
import {
   ResetPassSchema,
   resetPassSchema,
} from '@/schemas/reset-password.schema';
import { handlePasswordReset } from '../utils'

type ResetPassChangeFormProps = {
   email: string;
   resetToken?: string;
   onBack?: () => void;
   onSuccess?: () => void;
};

const ResetPassChangeForm: React.FC<ResetPassChangeFormProps> = ({
   email,
   resetToken,
   onBack,
   onSuccess,
}) => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<ResetPassSchema>({
      resolver: zodResolver(resetPassSchema),
      defaultValues: {
         password: '',
         confirm_password: '',
      },
   });

   const [password, confirmPassword] = useWatch({
      control,
      name: ['password', 'confirm_password'],
   });

   const { mutate: resetPassword, isPending } = useResetPassword({
      onSuccess: () => {
         onSuccess?.();
      },
      onError: (error) => {
         toast.error(
            () => (
               <ErrorToast
                  msg={{
                     title: 'Error',
                     body: error.message || 'Failed to reset password',
                  }}
               />
            ),
            { closeButton: false }
         );
      },
   });

   return (
      <>
         <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-4">
            <div className="flex flex-col gap-y-4">
               <div className="space-y-2">
                  <label className="block font-medium text-black" htmlFor="password">
                     Create Password
                  </label>
                  <InputIconned
                     LeftIcon={LockOutline}
                     register={register}
                     name="password"
                     input_id="password"
                     placeholder="Create Password"
                     type={isPasswordVisible ? 'text' : 'password'}
                     RightIcon={
                        <button
                           type="button"
                           className="cursor-pointer"
                           onClick={() =>
                              setIsPasswordVisible((visible) => !visible)
                           }
                           aria-label={
                              isPasswordVisible ? 'Hide password' : 'Show password'
                           }
                        >
                           {isPasswordVisible ? <EyeSlash /> : <Eye />}
                        </button>
                     }
                  />
                  {errors.password ? (
                     <FormError>{errors.password.message}</FormError>
                  ) : null}
               </div>

               <div className="space-y-2">
                  <label
                     className="block font-medium text-black"
                     htmlFor="confirm_password"
                  >
                     Confirm Password
                  </label>
                  <InputIconned
                     LeftIcon={LockOutline}
                     register={register}
                     name="confirm_password"
                     input_id="confirm_password"
                     placeholder="Confirm Password"
                     type={isConfirmPasswordVisible ? 'text' : 'password'}
                     RightIcon={
                        <button
                           type="button"
                           className="cursor-pointer"
                           onClick={() =>
                              setIsConfirmPasswordVisible((visible) => !visible)
                           }
                           aria-label={
                              isConfirmPasswordVisible
                                 ? 'Hide confirm password'
                                 : 'Show confirm password'
                           }
                        >
                           {isConfirmPasswordVisible ? <EyeSlash /> : <Eye />}
                        </button>
                     }
                  />
                  {errors.confirm_password ? (
                     <FormError>{errors.confirm_password.message}</FormError>
                  ) : null}
               </div>
            </div>

            <div>
               <Button
                  type="submit"
                  className="h-14.25 w-full"
                  disabled={!password || !confirmPassword || isPending}
                  loading={isPending}
               >
                  {isPending ? 'Changing Password...' : 'Change Password'}
               </Button>
            </div>
         </form>

         <div className="mt-6 flex flex-col items-center gap-2 text-md">
            {onBack ? (
               <Button
                  type="button"
                  variant="link"
                  className="h-fit px-0 font-medium"
                  onClick={onBack}
               >
                  Back to verification
               </Button>
            ) : null}

            <Button className="h-fit px-0 font-medium" variant="link" asChild>
               <Link href="/auth">Back to Sign In</Link>
            </Button>
         </div>
      </>
   );
};

export default ResetPassChangeForm;
