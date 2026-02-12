'use client';

import {useState} from 'react'

import { ReactSVG } from 'react-svg';
import { useForm, useWatch } from 'react-hook-form';
import { SigninSchema, signinSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
import Image from 'next/image';
import { InputIconned } from '@/components/data/input-iconned';
import { Eye, EyeSlash, LockOutline, Sms, UserOutline } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { useSignUp } from '@/api/auth';

const SUCCESS_TOAST_DURATION_MS = 1800;
const ERROR_TOAST_DURATION_MS = 2500;

const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<SigninSchema>({
      resolver: zodResolver(signinSchema),
         defaultValues: {
         fullname: '',
         email: '',
         password: '',
         confirm_password: ''
  }
   });

      const [isPasswordVisible, setIsPasswordVisible] = useState(false)
      const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

   const router = useRouter();
   const { mutate: signUp, isPending } = useSignUp({
      onSuccess: (data) => {
         toast.success(() => <SuccessToast msg={{ title: 'Success', body: data.message || 'Account created successfully' }} />, {closeButton:false, autoClose: SUCCESS_TOAST_DURATION_MS, onClose: ()=>router.push('/auth/verify-email') });
         
         // First save email to the pendingEmail cookie before routiong to the verify-email page
         document.cookie = `pendingEmail=${email}; path=/; max-age=600`; 
         
      },
      onError: (error) => {
         toast.error(() => <ErrorToast msg={{ title: 'Error', body: error.message || 'Failed to create account' }} />, {closeButton:false, autoClose: ERROR_TOAST_DURATION_MS});
      }
   });

   const onSubmit = (data:Omit<SigninSchema, "confirm_password">) => {
      signUp(data);
   };

   const [ fullname, email, password, confirm_password ] = useWatch({control, name:['fullname', 'email', 'password', 'confirm_password']})

   return (
      <section className=" max-sm:py-0 flex justify-center  min-h-screen md:h-auto lg:py-16.25 md:w-auto items-center">
         <div className=" w-full md:rounded-[20px] px-5 max-sm:px-4 py-7.5 md:max-w-117   md:h-fit md:w-auto  sm:border border-neutral-400 rounded-[20px] bg-surface">
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
                        autoComplete='off'
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
                        autoComplete='off'
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
                     <Button disabled={!fullname || !email || !password || !confirm_password || isPending}
                        type="submit"
                        className=' w-full h-14.25'
                        loading={isPending}
                     >
                        {isPending ? 'Creating Account...' : 'Sign Up'}
                     </Button>
                  </div>
               
            </form>
             <div className=' mt-6 flex flex-col justify-between gap-5 text-center'>
               <div className=' text-medium'>
               By creating an account, you agree to Edxelera’s  <Button className='p-0 h-fit' variant={"link"} asChild><Link href="/terms-and-services">terms of service</Link></Button>  and <Button  className='p-0 h-fit' variant={"link"} asChild><Link href="/terms-and-services">privacy policy</Link></Button>
               </div>
               <div className=" relative mt-4">
                  <hr className="border-neutral-500 border" />
                  <span className=" px-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-surface">
                     Or continue with
                  </span>
               </div>
               <div className="flex justify-stretch gap-3 w-fit self-center">
                  <button
                     className=" text-neutral-600 flex justify-center items-center text-center grow border-neutral-600  size-16 rounded-full bg-white hover:bg-neutral-50/70"
                     title="Login with Apple"
                  >
                     <ReactSVG src="/icons/apple.svg" />
                  </button>
                  <button
                     className=" flex justify-center items-center text-center grow border-neutral-600 size-16 text-white rounded-full bg-white hover:bg-neutral-50/70"
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
