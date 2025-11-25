'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, Controller } from 'react-hook-form';
import { WelcomeSchema, welcomeSchema } from '@/schemas/welcome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import FormError from '@/components/auth/form-error';
import DatePicker from '@/components/data/date-picker';
import Input from '@/components/data/input';
import Textarea from '@/components/data/textarea';

const Page: React.FC = () => {
   const {
      watch,
      setValue,
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
      formData.append('bio', data.bio);
      formData.append('profileImage', data.profileImage);

      const response = await fetch(`${ServerURL}/auth/signup`, {
         method: 'POST',
         body: formData,
      });

      if (response.ok) {
         return router.push('/home');
      }
      return;
   };

   const profileImage = watch('profileImage');

   React.useEffect(() => {
      if (profileImage && profileImage.length > 0) {
         const preview = URL.createObjectURL(profileImage[0]);
         setProfileImagePreview(preview);
      }
      return () => {
         if (profileImagePreview) {
            URL.revokeObjectURL(profileImagePreview);
         }
      };
   }, [profileImage]);

   return (
      <section className="py-5 max-sm:py-0 flex justify-center items-center min-h-screen">
         <div className=" w-full sm:border border-neutral-400 rounded-[20px] px-5 pt-6 sm:w-[75%]">
            <div className=" w-[154px] mx-auto">
               <img
                  // className=" h-[65px]"
                  src="/assets/logo1.png"
                  alt="Tecbridge Logo"
               />
            </div>{' '}
            <h1 className="text-lg font-medium mt-10">
               Welcome to Tech Bridge-City Academy!
            </h1>
            <p className=" my-6 mt-4 font-normal leading-[150%]">
               Let’s set things up so your learning experience feels just right
               for you{' '}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
               <div>
                  {!profileImagePreview ? (
                     <div className=" relative mx-auto bg-neutral-200 w-22 h-22 rounded-[500px] flex justify-center items-center">
                        <ReactSVG src="/icons/gallery-add.svg" />
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
                        <img
                           src={profileImagePreview}
                           className="  block absolute object-cover w-full h-full rounded-[500px]"
                           alt="Profile Image"
                        />
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
                  <Input
                     register={register}
                     input_id="location"
                     name="location"
                     placeholder="Location"
                  />
                  {errors.location && (
                     <FormError>{errors.location.message}</FormError>
                  )}
               </div>
               <div>
                  <Textarea
                     register={register}
                     name="bio"
                     input_id="bio"
                     placeholder="Bio"
                     spellCheck
                  />
                  {errors.bio && (
                     <FormError className=" text-sm text- mt-1">
                        {errors.bio.message}
                     </FormError>
                  )}
               </div>
               <div>
                  <button
                     type="submit"
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer my-5.5 h-[50px] w-full bg-primary text-white px-2.5 py-[17px] rounded-[500px]"
                  >
                     <span>Continue</span>
                  </button>
               </div>
            </form>
         </div>
      </section>
   );
};

export default Page;
