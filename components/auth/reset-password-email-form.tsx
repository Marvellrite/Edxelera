'use client';

import { useForm } from 'react-hook-form';
import { SendPassResetSchema, sendPassResetSchema  } from '@/schemas/send-password-reset.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormError from '@/components/auth/form-error';
// import OTPInputs from '@/components/auth/input-otp';
import { ErrorToast, SuccessToast } from '@/components/toast/toaster';
import { toast } from "react-toastify";
import { Button } from '@/components/ui/button';
import { InputIconned } from '@/components/data/input-iconned';
import { Sms } from '@/components/icons/modified';
import { useMutation } from '@tanstack/react-query';
import { getOtp } from '@/api/auth';

export default function ResetPassEmailForm () {
 
     const {
      register:sendRegister,
      handleSubmit,
      formState: { errors: sendErrors },
   } = useForm<SendPassResetSchema>({resolver: zodResolver(sendPassResetSchema)})


   const router = useRouter();




   // const { data, isPending, error, mutate} = useMutation({
   //  mutationFn: getOtp,
   //  mutationKey: ['getOtp'],
    
   // })


const sendOnSubmit = async (data: {email:string}) => {
   //  mutate(data.email)

    //   toast.success(SuccessToast, {closeButton:false,});
      // toast.error(ErrorToast, {closeButton: false});
   

   };



   return (
        <>

         <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Reset Password</h1>
          
                <form  className=" space-y-4" onSubmit={()=>handleSubmit(sendOnSubmit)}>
               <div className=" flex justify-center flex-col gap-y-4">
             
                {/* To-do: add otp here  */}

                 <div className=' mb-4 space-y-2'>
                  <label className=' font-medium text-black block' htmlFor="full_name">Email</label>
                  <InputIconned
                     LeftIcon={Sms}
                     input_id="full_name"
                     name="email"
                     register={sendRegister}
                     placeholder="Enter your email"
                  />
                  {sendErrors.email && (
                     <FormError>{sendErrors.email.message}</FormError>
                  )}
               </div>
                
               </div>
               
               <div>
                  <Button
                     type='submit'
                     className=" w-full h-14.25"
                  >
                     Send OTP
                  </Button>
               </div>
            </form>
        </>
   );
};

