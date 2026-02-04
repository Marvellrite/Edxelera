'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ResetPassSchema, resetPassSchema } from '@/schemas/reset-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { toast } from "react-toastify";
import { Button } from '@/components/ui/button';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline } from '@/components/icons/modified';


const ResetPassChangeForm: React.FC = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)


     const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<ResetPassSchema>({resolver: zodResolver(resetPassSchema)})

   const [ password, confirmPassword] = useWatch({control, name:['password', 'confirm_password']})

   const sendOnSubmit = async (data: ResetPassSchema) => {
      toast.success(() => <SuccessToast msg={{ title: 'Success', body: 'Login successful' }} />, {closeButton:false,});
      
   

   };

   return (
      <>
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Reset Password</h1>
            
            <form onSubmit={handleSubmit(sendOnSubmit)} className=" space-y-4">
               <div className=" flex justify-center flex-col gap-y-4">

                        <div className='space-y-2'>
                            <label className=' font-medium text-black block' htmlFor="password">Create Password</label>
                                <InputIconned
                                LeftIcon={LockOutline}
                                register={register}
                                name="password"
                                input_id="password"
                                placeholder="Create Password"
                                type={isPasswordVisible?"text":"password"}
                                RightIcon={<span className='cursor-pointer' onClick={()=>setIsPasswordVisible((visible)=>!visible)}>{isPasswordVisible?<EyeSlash/>:<Eye/>}</span>}
                                />
                                {errors.password && (
                                <FormError>{errors.password.message}</FormError>
                                )}
                        </div>
            
                        <div className='space-y-2'>
                            <label className=' font-medium text-black block' htmlFor="confirm_password">Confirm Password</label>
                                <InputIconned
                                LeftIcon={LockOutline}
                                register={register}
                                name="confirm_password"
                                input_id="confirm_password"
                                placeholder="Confirm Password"
                                type={isConfirmPasswordVisible?"text":"password"}
                                RightIcon={<span className='cursor-pointer' onClick={()=>setIsConfirmPasswordVisible((visible)=>!visible)}>{isConfirmPasswordVisible?<EyeSlash/>:<Eye/>}</span>}
                                />
                                {errors.confirm_password && (
                                <FormError>{errors.confirm_password.message}</FormError>
                                )}
                        </div>
                
               </div>
               
               <div>
                  <Button
                     type='submit'
                     className=" w-full h-14.25"
                     disabled={!password||!confirmPassword}
                  >
                     Change Password
                  </Button>
               </div>
            
               <div className=' flex justify-between font-normal text-md'><button className="p-0">Resend code</button> <Link href={'/auth/'}>Use password</Link></div>
            </form>
         </>
   );
};

export default ResetPassChangeForm;
