'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ReactSVG } from 'react-svg';

const TermsOfServicePage = () => {
   const router = useRouter();

   const handleDecline = () => {
      router.back();
   };

   const handleAccept = () => {
      // Handle accept logic - navigate to next step or save preference
      router.push('/auth');
   };

   return (
      <section className="flex  flex-col bg-white overflow-y-auto h-screen">
         {/* Header Section */}
         <div
            className="flex flex-col gap-6 px-4 pb-6 pt-20 md:px-[150px] md:pb-8 md:pt-16"
            style={{
               background:
                  'linear-gradient(262.15deg, var(--gradient-red-light) 19.56%, var(--gradient-red) 74.16%)',
            }}
         >
            <button
               onClick={() => router.back()}
               className="flex items-center justify-center p-0 w-fit "
               aria-label="Go back"
            >
               <ReactSVG src='/icons/back-arrow.svg' beforeInjection={(svg)=>{
                const paths = svg.querySelectorAll("path");
                paths.forEach((_)=>_.setAttribute('fill', "white"))
               }}  />
            </button>
            <p
               className="text-base font-medium leading-6 text-white"
               style={{ fontFamily: 'var(--font-google-sans)' }}
            >
               Hello. Before you create an account, please read and accept our
               Terms of Service
            </p>
         </div>

         {/* Content Section */}
         <div className="flex-1  px-4 pb-32 pt-6 md:px-[150px] md:pb-[158px] ">
            <div className="flex flex-col gap-6">
               {/* Title Section */}
               <div className="flex flex-col gap-1">
                  <h1
                     className="text-[40px] font-medium leading-[47px] text-black"
                     style={{ fontFamily: 'var(--font-helvetica)' }}
                  >
                     Terms of Service
                  </h1>
                  <p
                     className="text-sm font-normal text-neutral-600"
                     style={{ fontFamily: 'var(--font-google-sans)' }}
                  >
                     Last updated on 4 October 2025
                  </p>
               </div>

               {/* Welcome Text */}
               <p
                  className="text-base font-normal leading-6 text-neutral-800"
                  style={{ fontFamily: 'var(--font-google-sans)' }}
               >
                  Welcome to SkillBridge. By accessing or using our platform,
                  you agree to the following Terms of Service. Please read them
                  carefully.
               </p>

               {/* Terms Sections */}
               <div className="flex flex-col gap-6">
                  <p
                     className="text-base font-normal leading-6 text-neutral-800"
                     style={{ fontFamily: 'var(--font-google-sans)' }}
                  >
                     <strong>1. Conditions of use</strong>
                     <br />
                     By creating an account, purchasing a course, or using our
                     services, you agree to comply with and be bound by these
                     Terms of Service and our Privacy Policy. If you do not
                     agree, please do not use the platform.
                  </p>

                  <p
                     className="text-base font-normal leading-6 text-neutral-800"
                     style={{ fontFamily: 'var(--font-google-sans)' }}
                  >
                     <strong>1. Intellectual property</strong>
                     <br />
                     By creating an account, purchasing a course, or using our
                     services, you agree to comply with and be bound by these
                     Terms of Service and our Privacy Policy. If you do not
                     agree, please do not use the platform.
                  </p>

                  <p
                     className="text-base font-normal leading-6 text-neutral-800"
                     style={{ fontFamily: 'var(--font-google-sans)' }}
                  >
                     <strong>1. Intellectual property</strong>
                     <br />
                     By creating an account, purchasing a course, or using our
                     services, you agree to comply with and be bound by these
                     Terms of Service and our Privacy Policy. If you do not
                     agree, please do not use the platform.
                  </p>

                  <p
                     className="text-base font-normal leading-6 text-neutral-800"
                     style={{ fontFamily: 'var(--font-google-sans)' }}
                  >
                     <strong>1. Intellectual property</strong>
                     <br />
                     By creating an account, purchasing a course, or using our
                     services, you agree to comply with and be bound by these
                     Terms of Service and our Privacy Policy. If you do not
                     agree, please do not use the platform.
                  </p>
               </div>
            </div>

             <div
            className=" max-md:hidden left-0 right-0 flex items-center gap-2.5 h-[110px] mt-10 bg-[linear-gradient(180deg,rgba(var(--white-rgb),0.07)_30.53%,rgba(var(--white-rgb),1)_78.42%)]
"
            // style={{
            //    background:
            //       'linear-gradient(180deg, rgba(255,255,255,0.07) 30.53%, rgba(255,255,255,1) 78.42%)',
            // }}
         >
            <Button
               variant="outline"
               size="lg"
               onClick={handleDecline}
               className="min-w-[150px] rounded-full border-primary text-base font-normal text-primary hover:bg-primary/10"
               style={{ fontFamily: 'var(--font-helvetica)' }}
            >
               Decline
            </Button>
            <Button
               variant="default"
               size="lg"
               onClick={handleAccept}
               className="min-w-[150px] rounded-full bg-primary text-base font-normal text-white hover:bg-primary/90"
               style={{ fontFamily: 'var(--font-helvetica)' }}
            >
               Accept
            </Button>
         </div>
         </div>

         {/* Footer Section with Buttons */}
         <div
            className=" fixed md:hidden bottom-0 left-0 right-0 flex items-center justify-center gap-2.5 px-4 pb-8 pt-12 md:px-[150px]"
            style={{
               background:
                  'linear-gradient(180deg, rgba(255,255,255,0.07) 30.53%, rgba(255,255,255,1) 78.42%)',
            }}
         >
            <Button
               variant="outline"
               size="lg"
               onClick={handleDecline}
               className="min-w-[150px] rounded-full border-primary text-base font-normal text-primary hover:bg-primary/10"
               style={{ fontFamily: 'var(--font-helvetica)' }}
            >
               Decline
            </Button>
            <Button
               variant="default"
               size="lg"
               onClick={handleAccept}
               className="min-w-[150px] rounded-full bg-primary text-base font-normal text-white hover:bg-primary/90"
               style={{ fontFamily: 'var(--font-helvetica)' }}
            >
               Accept
            </Button>
         </div>
      </section>
   );
};

export default TermsOfServicePage;