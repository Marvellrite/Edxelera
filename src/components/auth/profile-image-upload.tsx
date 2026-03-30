import { ReactSVG } from 'react-svg';
import {
   UseFormRegister,
   FieldErrors,
   FieldValues,
   Path,
   RegisterOptions,
   get,
} from 'react-hook-form';
import FormError from './form-error';

interface ProfileImageUploadProps<T extends FieldValues> {
   profileImagePreview: string;
   defaultImageSrc?: string;
   register: UseFormRegister<T>;
   registerOptions?: RegisterOptions<T, Path<T>>;
   errors: FieldErrors<T>;
   name: Path<T>;
}

const ProfileImageUpload = <T extends FieldValues>({
   profileImagePreview,
   defaultImageSrc,
   register,
   registerOptions,
   errors,
   name,
}: ProfileImageUploadProps<T>) => {
   const imageSrc = profileImagePreview || defaultImageSrc;
   const errorMessage = get(errors, name)?.message as React.ReactNode;

   return (
      <div>
         <div className="relative mx-auto flex h-22 w-22 items-center justify-center overflow-hidden rounded-[500px] bg-neutral-200">
            {imageSrc ? (
               <img
                  src={imageSrc}
                  className="absolute block h-full w-full rounded-[500px] object-cover"
                  alt="Profile Image"
               />
            ) : null}

            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
               <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340491/repo-images/public/icons/gallery-add.svg" />
            </div>

            <input
               title="Profile Image"
               className="absolute start-0 top-0 h-full w-full cursor-pointer opacity-0"
               type="file"
               accept="image/*"
               {...register(name, registerOptions)}
            />
         </div>
         {errorMessage && (
            <FormError className="text-center">
               {errorMessage}
            </FormError>
         )}
      </div>
   );
};

export default ProfileImageUpload;
