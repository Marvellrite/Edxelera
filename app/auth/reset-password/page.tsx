'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SendPassResetSchema, sendPassResetSchema  } from '@/schemas/send-password-reset.schema';
import { ResetPassSchema, resetPassSchema } from '@/schemas/reset-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/data/input';
import FormError from '@/components/auth/form-error';
import OTPInputs from '@/components/auth/input-otp';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { toast } from "react-toastify";
import Image from 'next/image';


const Page: React.FC = () => {
 

   const [otp, setOtp] = useState<undefined | string>(undefined);
   const [tempOtp, setTempOtp] = useState<undefined | string>(undefined);
   const [otpSent, setOtpSent] = useState(false)
   const [otpVerified, setOtpVerified] = useState(false)

     const {
      register:sendRegister,
      handleSubmit:sendHandleSubmit,
      formState: { errors: sendErrors },
   } = useForm<SendPassResetSchema>({resolver: zodResolver(sendPassResetSchema)})

     const {
      register: resetRegister,
      handleSubmit: resetHandleSubmit,
      formState: { errors: resetErrors },
   } = useForm<ResetPassSchema>({resolver: zodResolver(resetPassSchema)})

   useEffect(() => {
      setOtp(tempOtp);
   }, [tempOtp]);

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

   const sendOnSubmit = async () => {
      toast.success(SuccessToast, {closeButton:false,});
      // toast.error(ErrorToast, {closeButton: false});
   

   };

   const resetOnSubmit = async () => {
      
   };

   const otpOnSubmit = async () => {
      console.log(otp);

      const response = await fetch(`${ServerURL}/auth/otp`, {
         method: 'POST',
         body: JSON.stringify({ otp }),
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

   return (
      <section className="py-5 max-md:py-0 flex justify-center items-center max-sm:items-start min-h-screen">
         <div className=" w-full max-w-[500px] sm:border border-neutral-400 rounded-[20px] p-5  max-sm:px-4 sm:w-[75%]">
           <div className=" w-[154px] mx-auto max-sm:w-[87px]">
               <Image
                  className=" w-full h-auto"
                  src="/assets/logo1.png"
                  alt="Tecbridge Logo"
                  width={256}
                  height={108}
               />
            </div>
            <h1 className="text-5xl font-medium mt-10">Reset Password</h1>
            <p className=" my-6 mb-7 mt-4 font-normal">
               {
                  !otpSent?
                  "Enter your email to receive OTP":
                  (otpSent && !otpVerified)?
                  "Enter the 6 digit OTP sent to your email to reset your password":
                  "Change your password"
               }
            </p>
            <form onSubmit={!otpSent?sendHandleSubmit(sendOnSubmit):resetHandleSubmit(resetOnSubmit)} className=" space-y-4">
               <div className=" flex justify-center flex-col gap-y-4">
                {!otpSent?   
                    <>
                        <Input input_id="email" register={sendRegister} placeholder='Email' name='email'/>
                        {sendErrors.email && <FormError>{sendErrors.email.message}</FormError>}
                    </> :
                        !otpVerified?
                    <OTPInputs OTP={otp} setOTP={setTempOtp}/>:
                    <>
                        <div>
                            <Input register={resetRegister} name="password" input_id='password' placeholder='Create Password'/>
                             {resetErrors.password && <FormError>{resetErrors.password.message}</FormError>}
                        </div>
                        <div>

                            <Input register={resetRegister} name="confirm_password"  placeholder='Confirm Password'/>
                             {resetErrors.confirm_password && <FormError>{resetErrors.confirm_password.message}</FormError>}
                        </div>
                    </>

                }
               </div>
               
               <div>
                  <button
                     type={(!otpSent || (otpSent && otpVerified)) ? 'submit': "button"}
                     onClick={(otpSent && !otpVerified)?otpOnSubmit:undefined}
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer my-5.5 h-[50px] w-full bg-primary text-white px-2.5 py-[17px] rounded-[500px] "
                  >
                     <span>{  !otpSent?"Send OTP":!otpVerified?"Verify":"Change Password"}</span>
                  </button>
               </div>
            
               <div className=' flex justify-between font-normal text-md'><button className="p-0">Resend code</button> <Link href={'/auth/'}>Use password</Link></div>
            </form>
         </div>
      </section>
   );
};

export default Page;
