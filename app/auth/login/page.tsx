'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';

type LoginFormInputs = {
   email: string;
   password: string;
};

const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
   });

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

   const onSubmit = async (data: any) => {
      console.log(data);
      console.log(data.email);

      const response = await fetch(`${ServerURL}/auth/signin`, {
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
            <h1 className="text-5xl font-medium mt-10">Login</h1>
            <p className=" my-6 mt-4 font-normal">Login to your account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className=" mb-4">
                  <input
                     {...register('email')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="text"
                     placeholder="Email"
                  />
                  {errors.email && (
                     <FormError>{errors.email.message}</FormError>
                  )}
               </div>
               <div>
                  <input
                     {...register('password', { required: true })}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="Password"
                     placeholder="Password"
                  />
                  {errors.password && (
                     <FormError>{errors.password.message}</FormError>
                  )}
               </div>
               <div>
                  <button
                     type="submit"
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer my-5.5 h-[50px] w-full bg-primary text-white px-2.5 py-[17px] rounded-[500px]"
                  >
                     <span>Login</span>
                  </button>
               </div>
            </form>
            <div className=" flex justify-between">
               <Link
                  className=" hover:underline underline-offset-2"
                  href={'/auth/forgot-password'}
               >
                  Forgot Password?
               </Link>{' '}
               <Link
                  className=" hover:underline underline-offset-2"
                  href={'/auth/sign-up'}
               >
                  Create an Account
               </Link>
            </div>
            <div className=" relative mt-13 mb-7.5">
               <hr className="border-neutral-500 border-2" />
               <span className=" px-3 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white">
                  Or
               </span>
            </div>
            <div className="flex justify-stretch gap-2 w-full mb-5">
               <button
                  className=" text-neutral-600 flex justify-center items-center text-center grow border border-neutral-600 rounded-xl px-3 py-4"
                  title="Login with Apple"
               >
                  <ReactSVG src="/icons/apple.svg" />
               </button>
               <button
                  className=" flex justify-center items-center text-center grow border border-neutral-600 rounded-xl px-3 py-4"
                  title="Login with Google"
               >
                  <ReactSVG
                     src="/icons/google.svg"
                     className=" text-neutral-600 "
                  />
               </button>
            </div>
         </div>
      </section>
   );
};

export default Page;
