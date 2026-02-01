'use client';

import {useState} from 'react'

import { ReactSVG } from 'react-svg';
import { useForm } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import Image from 'next/image';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline, Sms, UserOutline } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';

const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SigninSchema>({
      resolver: zodResolver(signinSchema),
   });

      const [isPasswordVisible, setIsPasswordVisible] = useState(false)
      const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

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
      <section className=" max-sm:py-0 flex justify-center  min-h-screen  h-screen md:h-auto lg:py-16.25 md:w-auto">
         <div className=" w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117   md:h-auto md:w-auto  sm:border border-neutral-400 rounded-[20px]">
            <div className=" w-53.5 mx-auto">
               <Image
                  className=" w-full h-auto"
                  src="/images/edx_logo_1.png"
                  alt="Edxelera Logo"
                  width={256}
                  height={108}
               />
            </div>{' '}
            <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
              
                  <div className=' mb-4 space-y-2'>
                     <label className=' font-medium text-black block' htmlFor="full_name">Full Name</label>
                     <InputIconned
                        LeftIcon={UserOutline}
                        input_id="full_name"
                        name="fullname"
                        register={register}
                        placeholder="Full Name"
                     />
                     {errors.fullname && (
                        <FormError>{errors.fullname.message}</FormError>
                     )}
                  </div>

                  <div className=' mb-4 space-y-2'>
                     <label className=' font-medium text-black block' htmlFor="email">Email</label>
                     <InputIconned
                        LeftIcon={Sms}
                        register={register}
                        name="email"
                        input_id="email"
                        placeholder="Email"
                     />
                     {errors.email && (
                        <FormError>{errors.email.message}</FormError>
                     )}
                  </div>
                  <div className=' mb-4 space-y-2'>
                  <label className=' font-medium text-black block' htmlFor="email">Create Password</label>
                     <InputIconned
                        LeftIcon={LockOutline}
                        register={register}
                        name="password"
                        input_id="password"
                        placeholder="Create Password"
                        type={isPasswordVisible?"text":"password"}
                        RightIcon={<span className='cursor-pointer' onClick={()=>setIsPasswordVisible((visible)=>!visible)}>{isPasswordVisible?<EyeSlash/>:<Eye/>}</span>}
                     />
                     {errors.password && (
                        <FormError>{errors.password.message}</FormError>
                     )}
                  </div>
                  <div className=' mb-6 space-y-2'>
                     <label className=' font-medium text-black block' htmlFor="confirm_pasword">Confirm Password</label>
                     <InputIconned
                        LeftIcon={LockOutline}
                        placeholder="Confirm Password"
                        register={register}
                        name="confirm_password"
                        input_id="confirm_password"
                        RightIcon={<span className='cursor-pointer' onClick={()=>setIsConfirmPasswordVisible((visible)=>!visible)}>{isConfirmPasswordVisible?<EyeSlash/>:<Eye/>}</span>}
                        type={isConfirmPasswordVisible?"text":"password"}
                     />
                     {errors.confirm_password && (
                        <FormError>{errors.confirm_password.message}</FormError>
                     )}
                  </div>

                  <div className=' mb-5 text-md text-center'>Already have an account? <Button className='p-0 font-medium h-fit' variant="link" asChild><Link href={"/auth"}>Login</Link></Button> </div>

                  <div>
                     <Button
                        type="submit"
                        className=' w-full h-14.25'
                     >
                        Sign Up
                     </Button>
                  </div>
               
            </form>
             <div className=' mt-6 flex flex-col justify-between gap-5 text-center'>
               <div className=' text-medium'>
               By creating an account, you agree to Edxelera’s  <Button className='p-0 h-fit' variant={"link"} asChild><Link href="/terms-and-services">terms of service</Link></Button>  and <Button className='p-0 h-fit' variant={"link"} asChild><Link href="/terms-and-services">privacy policy</Link></Button>
               </div>
               <div className=" relative mt-4">
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

            </div>
         </div>
      </section>
   );
};

export default Page;
