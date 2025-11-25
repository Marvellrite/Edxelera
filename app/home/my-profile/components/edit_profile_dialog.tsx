'use client';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import DatePicker from '@/components/data/date-picker';
import Profile_img_upload from '@/components/auth/Profile-img-upload';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileSchema, editProfileSchema } from '@/schemas/edit_profile';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormError from '@/components/auth/form-error';
import { ReactSVG } from 'react-svg';
import Input from '@/components/data/input';
import Textarea from '@/components/data/textarea';

const Edit_profile_dialog = () => {
   const [profileImagePreview, setProfileImagePreview] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const router = useRouter();
   const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;

   const {
      watch,
      setValue,
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileSchema),
   });

   const [datePickerSide, setdatePickerSide] = useState<
      'top' | 'right' | 'bottom' | 'left' | undefined
   >(undefined);

   const onSubmit = async (data: EditProfileSchema) => {
      data.profileImage = data.profileImage[0] as File;
      // console.log(data);
      console.log(data.DOB.toDateString());
      const formData = new FormData();
      formData.append('DOB', data.DOB.toDateString());
      formData.append('location', data.location);
      formData.append('bio', data.bio);
      formData.append('profileImage', data.profileImage);

      const response = await fetch(`${ServerURL}/users/:_id/edit`, {
         method: 'PATCH',
         body: formData,
      });

      if (response.ok) {
         setIsOpen(false);
      }
      return;
   };

   const profileImage = watch('profileImage');

   useEffect(() => {
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

   useEffect(() => {
      const adjustSide = () => {
         let side: 'top' | 'right' | 'bottom' | 'left' | undefined;
         const isDesktop = window.matchMedia('(min-width:768px)').matches;

         if (isDesktop) {
            side = 'left';
         } else {
            side = undefined;
         }
         setdatePickerSide(side);
      };
      adjustSide();
      window.addEventListener('resize', adjustSide);
      return window.removeEventListener('resizse', adjustSide);
   }, []);

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button
               variant={'outline'}
               className=" rounded-[500px] text-[14px] py-3 px-6 h-[45px] w-[119px] border-primary text-primary font-medium"
            >
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent
            className=" bg-white sm:max-w-[732px] overflow-y-auto"
            showCloseButton={false}
            aria-description="Dialog for editing user profile"
         >
            <DialogHeader>
               <DialogTitle asChild>
                  <div className="flex justify-between">
                     <h1 className="text-left font-medium text-[32px]">
                        Edit Profile
                     </h1>
                     <DialogClose asChild>
                        <button title="Dialog Clode Button" type="button">
                           <ReactSVG src="/icons/x.svg" />
                        </button>
                     </DialogClose>
                  </div>
               </DialogTitle>
            </DialogHeader>
            <form
               className=" rounded-lg mt-6"
               onSubmit={handleSubmit(onSubmit)}
            >
               <Profile_img_upload
                  profileImagePreview={profileImagePreview}
                  register={register}
                  name="profileImage"
                  errors={errors}
               />

               <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-3">
                  <div>
                     <Input
                        register={register}
                        name="location"
                        input_id="location"
                        placeholder="Location"
                     />
                     {errors.location && (
                        <FormError>{errors.location.message}</FormError>
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
                     {/* <div className="w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none text-left relative">
                        <span>Date of Birth</span>
                        <input
                           className=" w-full h-full top-0 left-0 absolute opacity-0 hover:cursor-pointer"
                           type="date"
                           {...register('DOB')}
                           id={register('DOB').name}
                        />
                     </div> */}
                     <Controller
                        control={control}
                        name="DOB"
                        render={({ field }) => (
                           <DatePicker
                              fieldValueState={field.value}
                              fieldOnChangeHandler={field.onChange}
                              side={datePickerSide}
                           />
                        )}
                     />
                     {errors.DOB && <FormError>{errors.DOB.message}</FormError>}
                  </div>
                  <div className=" md:col-span-2 ">
                     <Textarea
                        register={register}
                        rows={2}
                        name="bio"
                        textarea_id="bio"
                        placeholder="Bio"
                        spellCheck
                     />
                     {errors.location && (
                        <FormError>{errors.location.message}</FormError>
                     )}
                  </div>
               </div>
               <div className="w-full md:w-[175px] md:h-[50px] mt-4">
                  {/* <DialogClose asChild> */}
                  <button
                     type="submit"
                     className=" font-medium flex items-center justify-center hover:bg-primary-500  hover:cursor-pointer h-[50px] w-full bg-primary text-white rounded-[500px] px-2.5 py-[17px]"
                  >
                     <span>Save</span>
                  </button>
                  {/* </DialogClose> */}
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default Edit_profile_dialog;
