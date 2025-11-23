import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import {
   UseFormRegister,
   FieldErrors,
   FieldValues,
   Path,
} from 'react-hook-form';
import FormError from './form-error';

interface Profile_img_upload_props<T extends FieldValues> {
   profileImagePreview: string;
   register: UseFormRegister<T>;
   errors: FieldErrors<T>;
   name: Path<T>;
}

const Profile_img_upload = <T extends FieldValues>({
   profileImagePreview,
   register,
   errors,
   name,
}: Profile_img_upload_props<T>) => {
   return (
      <div>
         {!profileImagePreview ? (
            <div className=" relative mx-auto bg-neutral-200 w-22 h-22 rounded-[500px] flex justify-center items-center">
               <ReactSVG src="/icons/gallery-add.svg" />
               <input
                  title="Profile Image"
                  className=" hover:cursor-pointer opacity-0 absolute w-full h-full top-0 start-0 hover:ring-2 hover:ring-primary rounded-lg"
                  type="file"
                  accept="image/*"
                  {...register(name)}
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
                  {...register(name)}
               />
            </div>
         )}
         {errors.profileImage?.message && (
            <FormError className="text-center">
               {errors.profileImage.message as React.ReactNode}
            </FormError>
         )}
      </div>
   );
};

export default Profile_img_upload;
