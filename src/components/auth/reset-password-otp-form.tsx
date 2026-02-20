'use client';

import { Button } from '@/components/ui/button';
import { OtpInputGroup } from '@/components/auth/OtpInputGroup';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPassOtpForm: React.FC = () => {
   const [completeOtp, setCompleteOtp] = useState<string[]>([])
   const [otpLength] = useState<number>(6)

   const isOtpComplete = completeOtp.length === otpLength && completeOtp.every(otp=>otp!=='')


   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;
   const router = useRouter();
   

    const handleSubmit = async () => {
      const otp = completeOtp.join('');

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
        <>
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">OTP Verification</h1>
                        <p className=" my-6 mb-7 mt-4 font-medium">
               Enter the 6 digit OTP sent to your email to reset your password
            </p>
            <form onSubmit={handleSubmit} className=" ">
               <div className=" flex justify-center mb-10">
                  <OtpInputGroup onChange={(otp) =>{
                     setCompleteOtp(otp)}} length={otpLength} inputMode='alphanumeric'/>
               </div>
               <div className=' mb-6 '>
                  <Button disabled={!isOtpComplete} type='submit' variant={'default'}
                     className=" font-medium w-full  text-white px-2.5 h-14.25"
                  >
                     <span>Verify</span>
                  </Button>
               </div>

               <div className=' text-md text-center mb-1'>Didn&apos;t see code? <Button disabled={completeOtp.length<otpLength} variant={'link'} className=' text-primary font-medium px-0'>Resend Code</Button> </div>
               <div className='text-center text-md'><Button className='font-medium h-0' variant={'link'} asChild><Link className='' href='/auth'>Login with  password</Link></Button></div>
            </form>
         </>
   );
};

export default ResetPassOtpForm;
