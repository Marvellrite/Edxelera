'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ProfileImageUpload from '@/components/auth/profile-image-upload';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import { Button } from '@/components/ui/button';
import { useHeaderTitleStore } from '@/stores';

import { defaultAvatarSrc, fieldConfigs } from '../constants';
import type { EditProfileFormValues, EditProfileViewProps } from '../types';

export function EditProfileView({
   title = 'Edit Profile',
   backHref = '/home/my-profile',
   saveLabel = 'Save',
   avatarSrc = defaultAvatarSrc,
   defaultValues,
   onSubmit,
   onAvatarChange,
}: EditProfileViewProps) {
   const [profileImagePreview, setProfileImagePreview] = useState('');

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<EditProfileFormValues>({
      defaultValues: {
         bio: '',
         location: '',
         learningGoal: '',
         website: '',
         facebook: '',
         x: '',
         linkedIn: '',
         instagram: '',
         ...defaultValues,
      },
   });

   const profileImage = watch('profileImage');

   useEffect(() => {
      if (profileImage && profileImage.length > 0) {
         const preview = URL.createObjectURL(profileImage[0]);
         setProfileImagePreview(preview);

         return () => {
            URL.revokeObjectURL(preview);
         };
      }

      setProfileImagePreview('');
   }, [profileImage]);

   const handleFormSubmit = (data: EditProfileFormValues) => {
      onSubmit?.(data);
   };

   const setHeaderTitle = useHeaderTitleStore((state) => state.setHeaderTitle);

   useEffect(() => {
      setHeaderTitle(title);
   }, [setHeaderTitle, title]);

   void backHref;

   return (
      <section className="min-h-screen px-4 pb-10 pt-1 sm:px-6 md:px-8 md:pb-14 md:pt-4 xl:px-10 xl:pb-16 xl:pt-8">
         <div className="mx-auto w-full max-w-[396px] md:max-w-2xl xl:max-w-5xl">
            <div className="flex flex-col items-center gap-6 md:gap-8 xl:grid xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] xl:items-start xl:gap-10">
               <div className="flex w-full justify-center xl:justify-start xl:pt-2">
                  <ProfileImageUpload
                     profileImagePreview={profileImagePreview}
                     defaultImageSrc={avatarSrc || defaultAvatarSrc}
                     register={register}
                     registerOptions={{
                        onChange: onAvatarChange,
                     }}
                     errors={errors}
                     name="profileImage"
                  />
               </div>

               <form
                  className="flex w-full flex-col items-start gap-5 md:gap-6 xl:max-w-3xl"
                  onSubmit={handleSubmit(handleFormSubmit)}
               >
                  {fieldConfigs.map(
                     ({ name, label, placeholder, LeftIcon, required }) => (
                        <div key={name} className="w-full space-y-2">
                           <label
                              className="block text-base font-medium leading-6 text-[#040506]"
                              htmlFor={name}
                           >
                              {label}
                           </label>
                           <InputIconned
                              LeftIcon={LeftIcon}
                              register={register}
                              registerOptions={
                                 required
                                    ? { required: `${label} is required` }
                                    : undefined
                              }
                              name={name}
                              input_id={name}
                              placeholder={placeholder}
                           />
                           {errors[name] ? (
                              <FormError>{errors[name]?.message}</FormError>
                           ) : null}
                        </div>
                     )
                  )}

                  <Button
                     type="submit"
                     className="mt-4 h-[57px] w-full px-8 py-[18px] md:mt-6 xl:min-w-[180px] xl:w-auto"
                  >
                     {saveLabel}
                  </Button>
               </form>
            </div>
         </div>
      </section>
   );
}
