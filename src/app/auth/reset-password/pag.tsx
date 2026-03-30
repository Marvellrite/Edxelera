'use client';

import { useState, } from 'react';

import Image from 'next/image';
import ResetPassEmailForm from '@/components/auth/reset-password-email-form';
import ResetPassOtpForm from '@/components/auth/reset-password-otp-form';
import ResetPassChangeForm from '@/components/auth/reset-password-change';


const Page = () => {

   return (
      <section className="py-5 max-md:py-0 flex justify-center items-center max-sm:items-start min-h-screen">
         <div className=" w-full max-w-125 p-5  max-sm:px-4 sm:w-[75%]  sm:border border-neutral-400 rounded-[20px] bg-surface">
           <div className=" w-53.5 mx-auto">
                          <Image
                             className=" w-full h-auto"
                             src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"
                             alt="Edxelera Logo"
                             width={256}
                             height={108}
                          /></div>

                 <ResetPassEmailForm/>
                 <ResetPassOtpForm/>
                 <ResetPassChangeForm/>
                
   
         </div>
      </section>
   );
};

export default Page;
