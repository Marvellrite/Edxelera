'use client';

import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import OTPInputs from '@/components/auth/input-otp';

const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SigninSchema>({
      resolver: zodResolver(signinSchema),
   });

   const [otp, setOtp] = useState<undefined | string>(undefined);
   const [tempOtp, setTempOtp] = useState<undefined | string>(undefined);

   useEffect(() => {
      setOtp(tempOtp);
   }, [tempOtp]);

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

   const onSubmit = async () => {
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
      <section className="p-5 flex justify-center items-center min-h-screen">
         <div className=" w-full max-w-[500px] md:border border-neutral-400 rounded-[20px] px-5 pt-6 sm:w-[75%]">
            <div className=" w-[154px] mx-auto">
               <img
                  // className=" h-[65px]"
                  src="/assets/logo1.png"
                  alt="Tecbridge Logo"
               />
            </div>{' '}
            <h1 className="text-5xl font-medium mt-10">OTP Verification</h1>
            <p className=" my-6 mb-7 mt-4 font-normal">
               Enter the 6 digit OPT sent to your email
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
               <div className=" flex justify-center ">
                  <OTPInputs OTP={otp} setOTP={setTempOtp} />
               </div>
               <div>
                  <button
                     onClick={onSubmit}
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer my-5.5 h-[50px] w-full bg-primary text-white px-2.5 py-[17px] rounded-[500px]"
                  >
                     <span>Verify</span>
                  </button>
               </div>
            </form>
         </div>
      </section>
   );
};

export default Page;
