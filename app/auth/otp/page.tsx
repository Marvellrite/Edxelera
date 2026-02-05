'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { OtpInputGroup } from '@/components/auth/OtpInputGroup';

const Page: React.FC = () => {

   const [completeOtp, setCompleteOtp] = useState<string[]>([])
   const [otpLength] = useState<number>(6)

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;
   const router = useRouter();

   // Check if all OTP fields are filled
   const isOtpComplete = completeOtp.length === otpLength && completeOtp.every(char => char !== '');

   const onSubmit = async () => {
      const otp = completeOtp.join('');
      console.log(otp);

      const response = await fetch(`${ServerURL}/auth/otp`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ otp }),
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

   return (
      <section className=" max-sm:py-0 flex justify-center  min-h-screen items-center h-screen md:h-auto md:w-auto md:items-center lg:py-16.25">
         <div className="  basis-full md:rounded-[20px] px-5 max-sm:px-4 pt-6  md:max-w-117  md:h-auto py-7.5 w-screen md:w-auto h-full sm:border border-neutral-400 rounded-[20px] bg-surface">
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
            <form className=" ">
               <div className=" flex justify-center mb-10">
                  <OtpInputGroup 
                     onChange={(otp) => {
                        setCompleteOtp(otp)
                     }} 
                     length={otpLength} 
                     inputMode='alphanumeric'
                  />
               </div>
               <div className=' mb-6 '>
                  <Button 
                     disabled={!isOtpComplete} 
                     variant={'default'}
                     onClick={onSubmit}
                     type="button"
                     className=" font-medium w-full  text-white px-2.5 h-14.25"
                  >
                     <span>Verify</span>
                  </Button>
               </div>

               <div className=' text-md text-center mb-1'>
                  Didn&apos;t see code? 
                  <Button variant={'link'} className=' text-primary font-medium px-0'>
                     Resend Code
                  </Button> 
               </div>
            </form>
         </div>
      </section>
   );
};

export default Page;