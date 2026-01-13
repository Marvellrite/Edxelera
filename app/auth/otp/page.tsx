'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import OTPInputs from '@/components/auth/input-otp';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { OtpInputGroup } from './components/OtpInputGroup';

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
      <section className=" max-sm:py-0 flex justify-center  min-h-screen items-center h-screen md:h-auto md:w-auto md:items-center lg:py-16.25">
         <div className="  basis-full rounded-none md:rounded-[20px] px-5 max-sm:px-4 pt-6  bg-neutral-50 md:max-w-117  md:h-auto py-7.5 w-screen md:w-auto h-full">
              <div className=" w-53.5 mx-auto">
               <Image
                  className=" w-full h-auto"
                  src="/images/edx_logo_1.png"
                  alt="Edxelera Logo"
                  width={256}
                  height={63}
               />
            </div>
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">OTP Verification</h1>
                        <p className=" my-6 mb-7 mt-4 font-medium">
               Enter the 6 digit OTP sent to your email
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
               <div className=" flex justify-center mb-10">
                  <OtpInputGroup length={6} inputMode='alphanumeric'/>
               </div>
               <div className=' mb-6 '>
                  <Button variant={'default'}
                     onClick={onSubmit}
                     className=" font-medium w-full  text-white px-2.5 "
                  >
                     <span>Verify</span>
                  </Button>
               </div>

               <div className=' text-md text-center'>Didn&apos;t see code? <span className=' text-primary font-medium'>Resend Code</span> </div>
            </form>
         </div>
      </section>
   );
};

export default Page;
