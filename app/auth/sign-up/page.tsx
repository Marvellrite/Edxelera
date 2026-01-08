'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import Input from '@/components/data/input';
import Image from 'next/image';

const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SigninSchema>({
      resolver: zodResolver(signinSchema),
   });

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

   const onSubmit = async (data:Omit<SigninSchema, "confirm_password">) => {
      const response = await fetch(`${ServerURL}/auth/sign-up`, {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json"
         }
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

   return (
      <section className="p-5 max-md:py-0 px-0 max-sm:p-0 flex justify-center items-center min-h-screen">
         <div className=" w-full sm:border border-neutral-400 rounded-[20px] px-5 max-sm:px-4 py-6 sm:w-[75%]">
            <div className=" w-[154px] mx-auto">
               <Image
                  // className=" h-[65px]"
                  src="/assets/logo1.png"
                  alt="Tecbridge Logo"
                  width={256}
                  height={108}
               />
            </div>{' '}
            <h1 className="text-5xl font-medium mt-10">Sign Up</h1>
            <p className=" my-6 mt-4 font-normal">Create an account</p>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
               <div>
                  <Input
                     input_id="field_name"
                     name="fullname"
                     register={register}
                     placeholder="Full Name"
                  />
                  {errors.fullname && (
                     <FormError>{errors.fullname.message}</FormError>
                  )}
               </div>

               <div>
                  <Input
                     register={register}
                     name="email"
                     input_id="email"
                     placeholder="Email"
                  />
                  {errors.email && (
                     <FormError>{errors.email.message}</FormError>
                  )}
               </div>
               <div>
                  <Input
                     register={register}
                     name="password"
                     input_id="password"
                     placeholder="Create Password"
                     type="password"
                  />
                  {errors.password && (
                     <FormError>{errors.password.message}</FormError>
                  )}
               </div>
               <div>
                  <Input
                     placeholder="Confirm Password"
                     register={register}
                     name="confirm_password"
                     input_id="confirm_password"
                  />
                  {errors.confirm_password && (
                     <FormError>{errors.confirm_password.message}</FormError>
                  )}
               </div>
               <div>
                  <button
                     type="submit"
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer my-5.5 h-[50px] w-full bg-primary text-white px-2.5 py-[17px] rounded-[500px]"
                  >
                     <span>Create account</span>
                  </button>
               </div>
            </form>
            <div className=" flex justify-center">
               <Link
                  className=" hover:underline underline-offset-2 text-md"
                  href={'/auth'}
               >
                  Login to Your Account
               </Link>{' '}
            </div>
            <div className=" relative mt-13 mb-7.5">
               <hr className="border-neutral-500 border" />
               <span className=" px-3 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white">
                  Or
               </span>
            </div>
            <div className="flex justify-stretch gap-2 w-full mb-6">
               <button
                  className=" text-neutral-600 flex justify-center items-center text-center grow border border-neutral-600 rounded-xl px-3 py-4"
                  title="Sign in with Apple"
               >
                  <ReactSVG src="/icons/apple.svg" />
               </button>
               <button
                  className=" flex justify-center items-center text-center grow border border-neutral-600 rounded-xl px-3 py-4"
                  title="Log in with Google"
               >
                  <ReactSVG
                     src="/icons/google.svg"
                     className=" text-neutral-600 "
                  />
               </button>
            </div>
            <div className=" text-center font-normal">
               By creating an account, you agree to SkillBridge&rsquo;s{' '}
               <Link href="/terms-and-services" className=" text-primary">
                  terms of service{' '}
               </Link>{' '}
               and{' '}
               <Link href="#" className=" text-primary">
                  privacy policy
               </Link>
            </div>
         </div>
      </section>
   );
};

export default Page;
