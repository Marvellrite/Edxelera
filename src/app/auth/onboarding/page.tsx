'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { WelcomeSchema, welcomeSchema } from '@/schemas/welcome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import FormError from '@/components/auth/form-error';
import DatePicker from '@/components/data/date-picker';
import Textarea from '@/components/data/textarea-iconned';
import Image from 'next/image';
import { InputIconned } from '@/components/data/input-iconned';
import { Sms } from '@/components/icons/modified';
import { Button } from '@/components/ui/button';
const Page: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<WelcomeSchema>({
      resolver: zodResolver(welcomeSchema),
   });

   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const [profileImagePreview, setProfileImagePreview] = React.useState<
      string | null
   >(null);

   const router = useRouter();

   const onSubmit = async (data: WelcomeSchema) => {
      data.profileImage = data.profileImage[0] as File;
      // console.log(data);
      console.log(data.DOB.toDateString());
      const formData = new FormData();
      formData.append('DOB', data.DOB.toDateString());
      formData.append('location', data.location);
      formData.append('bio', data.bio || '');
      formData.append('profileImage', data.profileImage);

      const response = await fetch(`${ServerURL}/profile/edit`, {
         method: 'PATCH',
         body: formData,
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

      const [ DOB, location, bio, profileImage,] = useWatch({
         control,
         name: ['DOB', 'location', 'bio', 'profileImage'],
      });


   React.useEffect(() => {
      if (profileImage && profileImage.length > 0) {
         const preview = URL.createObjectURL(profileImage[0]);
         setProfileImagePreview(preview);
         return () => {
            if (profileImagePreview) {
               URL.revokeObjectURL(preview);
            }
         };
      }
   }, [profileImage]);

   return (
      <section className="py-5 max-sm:py-0 flex justify-center max-sm:items-start items-center min-h-screen">
         <div className=" w-full sm:border border-neutral-400 rounded-[20px] px-5 pt-6 sm:w-[75%]  ">
               <div className=" w-53.5 mx-auto">
                  <Image
                     className=" w-full h-auto"
                     src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"
                     alt="Edxelera Logo"
                     width={256}
                     height={108}
                  />
               </div>
              
         <h1 className="text-5xl font-medium mt-10 mb-6 text-black">Welcome to Edxelera</h1>

            <p className=" my-6 mt-4 font-medium leading-[150%]">
               Let’s set things up so your learning experience feels just right
               for you{' '}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
               <div>
                  {!profileImagePreview ? (
                     <div className=" relative mx-auto bg-neutral-200 w-22 h-22 rounded-[500px] flex justify-center items-center">
                        <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340491/repo-images/public/icons/gallery-add.svg" />
                        <input
                           title="Profile Image"
                           className=" hover:cursor-pointer opacity-0 absolute w-full h-full top-0 start-0 hover:ring-2 hover:ring-primary rounded-lg"
                           type="file"
                           accept="image/*"
                           {...register('profileImage')}
                        />
                     </div>
                  ) : (
                     <div className=" relative mx-auto w-22 h-22 bg-neutral-200 rounded-[500px] flex justify-center items-center">
                        <Image
                           src={profileImagePreview}
                           className="  block absolute object-cover w-full h-full rounded-[500px]"
                           alt="Profile Image"
                           fill
                        />
                        <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340491/repo-images/public/icons/gallery-add.svg" className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                      
                        <input
                           title="Profile Image"
                           className=" hover:cursor-pointer opacity-0 absolute w-full h-full top-0 start-0"
                           type="file"
                           accept="image/*"
                           {...register('profileImage')}
                        />
                     </div>
                  )}
                  {errors.profileImage?.message && (
                     <FormError>
                        {errors.profileImage.message as React.ReactNode}
                     </FormError>
                  )}
               </div>
               <div className="">
                  {/* <input
                     {...register('DOB')}
                     className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none "
                     type="date"
                     placeholder="Date of Birth"
                  />
                  {errors.DOB && <FormError>{errors.DOB.message}</FormError>} */}
                  <Controller
                     control={control}
                     name="DOB"
                     render={({ field }) => (
                        <DatePicker
                           fieldValueState={field.value}
                           fieldOnChangeHandler={field.onChange}
                        />
                     )}
                  />
                  {errors.DOB && <FormError>{errors.DOB.message}</FormError>}
               </div>
               <div>
                  <InputIconned
                     register={register}
                     input_id="location"
                     name="location"
                     placeholder="Location"
                     LeftIcon={Sms}
                  />
                  {errors.location && (
                     <FormError>{errors.location.message}</FormError>
                  )}
               </div>
               <div>
                  <Textarea<WelcomeSchema>
                     register={register}
                     name="bio"
                     placeholder="Write Bio"
                     spellCheck
                     textarea_id='bio'
                     rows={3}
                     LeftIcon={Sms}
                     className='rounded-[20px]'
                  />
                  {errors.bio && (
                     <FormError className=" text-sm text- mt-1">
                        {errors.bio.message}
                     </FormError>
                  )}
               </div>
               <div>
                  <Button disabled={!profileImage || !DOB || !location}
                     type="submit"
                     className=" my-5.5 h-14.25 w-full "
                  >
                     Continue
                  </Button>
               </div>
            </form>
         </div>
      </section>
   );
};

export default Page;
