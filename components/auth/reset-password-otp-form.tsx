'use client';

import { Button } from '@/components/ui/button';
import { OtpInputGroup } from '@/components/auth/OtpInputGroup';
import Link from 'next/link';

const ResetPassOtpForm: React.FC = () => {

   return (
        <>
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">OTP Verification</h1>
                        <p className=" my-6 mb-7 mt-4 font-medium">
               Enter the 6 digit OTP sent to your email to reset your password
            </p>
            <form className=" ">
               <div className=" flex justify-center mb-10">
                  <OtpInputGroup length={6} inputMode='alphanumeric'/>
               </div>
               <div className=' mb-6 '>
                  <Button type='submit' variant={'default'}
                     className=" font-medium w-full  text-white px-2.5 h-14.25"
                  >
                     <span>Verify</span>
                  </Button>
               </div>

               <div className=' text-md text-center mb-3'>Didn&apos;t see code? <Button variant={'link'} className=' text-primary font-medium'>Resend Code</Button> </div>
               <div className='text-center '><Button className='font-medium h-0' variant={'link'} asChild><Link className='' href='/auth'>Login with  password</Link></Button></div>
            </form>
         </>
   );
};

export default ResetPassOtpForm;
