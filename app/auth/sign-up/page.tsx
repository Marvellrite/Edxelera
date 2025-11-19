'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';

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

   const onSubmit = async (data: any) => {
      console.log(data);
      console.log(data.email);

      const response = await fetch(`${ServerURL}/auth/signup`, {
         method: 'POST',
         body: JSON.stringify(data),
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

   return (
      <section className="p-5 flex justify-center items-center min-h-screen">
         <div className=" w-full md:border border-neutral-400 rounded-[20px] px-5 pt-6 sm:w-[75%]">
            <div className=" w-[154px] mx-auto">
               <img
                  // className=" h-[65px]"
                  src="/assets/logo1.png"
                  alt="Tecbridge Logo"
               />
            </div>{' '}
            <h1 className="text-5xl font-medium mt-10">Sign Up</h1>
            <p className=" my-6 mt-4 font-normal">Create an account</p>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
               <div className="">
                  <input
                     {...register('full_name')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="text"
                     placeholder="Full Name"
                  />
                  {errors.full_name && (
                     <FormError>{errors.full_name.message}</FormError>
                  )}
               </div>
               <div>
                  <input
                     {...register('email')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="Password"
                     placeholder="Email"
                  />
                  {errors.email && (
                     <FormError>{errors.email.message}</FormError>
                  )}
               </div>
               <div>
                  <input
                     {...register('password')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="Password"
                     placeholder="Create Password"
                  />
                  {errors.password && (
                     <FormError>{errors.password.message}</FormError>
                  )}
               </div>
               <div>
                  <input
                     {...register('confirm_password')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="Confirm Password"
                     placeholder="Password"
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
                  href={'/auth/login'}
               >
                  Login to Your Account
               </Link>{' '}
            </div>
            <div className=" relative mt-13 mb-7.5">
               <hr className="border-neutral-500 border-2" />
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
               <Link href="#" className=" text-primary">
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
