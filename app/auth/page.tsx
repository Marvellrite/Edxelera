'use client';

import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { InputIconned } from '@/components/data/input-iconned';
import { LockOutline, Sms } from '@/components/icons/modified';
import { Eye, EyeSlash } from '@/components/icons/modified';


const Page: React.FC = () => {

   const [isPasswordVisible, setIsPasswordVisible] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
   });

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

   const onSubmit = async (data: LoginSchema) => {
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
      <section className="  max-sm:py-0 flex justify-center  min-h-screen items-center h-screen md:h-auto md:w-auto md:items-center lg:py-16.25">
         <div className=" basis-full rounded-none md:rounded-[20px] px-5 max-sm:px-4 pt-6  bg-neutral-50 md:max-w-117  md:h-auto py-7.5 w-screen md:w-auto h-full">
            <div className=" w-53.5 mx-auto ">
               <Image
                  className=" w-full h-auto"
                  src="/images/edx_logo_1.png"
                  alt="Edxelera Logo"
                  width={256}
                  height={63}
               />
            </div>{' '}
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className=" mb-4 space-y-2 ">
                  <label className=' font-medium text-black block' htmlFor="email">Email</label>
                  <InputIconned
                     LeftIcon={Sms}
                     register={register}
                     input_id="email"
                     name="email"
                     placeholder="Enter your meail"
                  />
                  {errors.email && (
                     <FormError>{errors.email.message}</FormError>
                  )}
               </div>
               <div className=' mb-6 space-y-2 '>
                  <label className=' font-medium text-black block' htmlFor="password">Password</label>
                  <InputIconned
                     LeftIcon={LockOutline}
                     RightIcon={<span className='cursor-pointer' onClick={()=>setIsPasswordVisible((visible)=>!visible)}>{isPasswordVisible?<EyeSlash/>:<Eye/>}</span>}
                     register={register}
                     input_id="password"
                     name="password"
                     placeholder="Password"
                     type={isPasswordVisible?"text":"password"}
                  />
                  {errors.password && (
                     <FormError>{errors.password.message}</FormError>
                  )}
               </div>
               <div className=" flex justify-between mt mb-5">
               <Link
                  className=" hover:underline underline-offset-2"
                  href={'/auth/reset-password'}
               >
                  Remember me
               </Link>{' '}
               <Link
                  className=" hover:underline underline-offset-2"
                  href={'/auth/reset-password'}
               >
                  Forgot Password?
               </Link>
            </div>

               <div>
                  <button
                     type="submit"
                     className=" font-medium flex items-center justify-center hover:bg-primary  hover:cursor-pointer mt-5.5 h-12.5 w-full bg-primary text-white px-2.5 py-4.25 rounded-[500px]"
                  >
                     <span>Login</span>
                  </button>
               </div>
            </form>
            
            <div className=' mt-10 flex flex-col justify-between gap-5'>
               <div className=" relative ">
                  <hr className="border-neutral-500 border" />
                  <span className=" px-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-neutral-50">
                     Or continue with
                  </span>
               </div>
               <div className="flex justify-stretch gap-3 w-fit self-center">
                  <button
                     className=" text-neutral-600 flex justify-center items-center text-center grow border-neutral-600  size-16 rounded-full bg-white"
                     title="Login with Apple"
                  >
                     <ReactSVG src="/icons/apple.svg" />
                  </button>
                  <button
                     className=" flex justify-center items-center text-center grow border-neutral-600 size-16 text-white rounded-full bg-white"
                     title="Login with Google"
                  >
                     <ReactSVG
                        src="/icons/google.svg"
                        className=" text-neutral-600 "
                     />
                  </button>
               </div>
               <div className=' text-md basis-full text-center'>Don’t have an account? <Button variant={'link'} className=' font-medium text-primary p-0'><Link href="/auth/sign-up">Sign Up</Link></Button></div>
            </div>
         </div>
      </section>
   );
};

export default Page;
