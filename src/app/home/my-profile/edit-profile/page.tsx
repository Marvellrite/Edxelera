'use client';

import { useEffect, useState, type ChangeEventHandler } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
   siFacebook,
   siInstagram,
   siLinkerd,
   siX,
   type SimpleIcon,
} from 'simple-icons';
import { useHeaderTitleStore } from '@/stores';

import ProfileImageUpload from '@/components/auth/profile-image-upload';
import FormError from '@/components/auth/form-error';
import { InputIconned } from '@/components/data/input-iconned';
import type IconProp from '@/components/icons/generated/IconType';
import {
   SearchOutline,
   UserOutline,
} from '@/components/icons/modified';
import { Button } from '@/components/ui/button';

const defaultAvatarSrc =
   'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340563/repo-images/public/icons/photo.png';

function createSimpleBrandIcon(icon: SimpleIcon) {
   return function SimpleBrandIcon({
      className,
      size = 20,
      ...props
   }: IconProp) {
      return (
         <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className ?? 'size-5 text-neutral-800'}
            aria-hidden="true"
            fill="currentColor"
            {...props}
         >
            <path d={icon.path} />
         </svg>
      );
   };
}

const SimpleFacebookIcon = createSimpleBrandIcon(siFacebook);
const SimpleXIcon = createSimpleBrandIcon(siX);
const SimpleLinkedInIcon = createSimpleBrandIcon(siLinkerd);
const SimpleInstagramIcon = createSimpleBrandIcon(siInstagram);

type EditProfileFormValues = {
   bio: string;
   location: string;
   learningGoal: string;
   website: string;
   facebook: string;
   x: string;
   linkedIn: string;
   instagram: string;
   profileImage: FileList;
};

export type EditProfileViewProps = {
   title?: string;
   backHref?: string;
   saveLabel?: string;
   avatarSrc?: string;
   defaultValues?: Partial<EditProfileFormValues>;
   onSubmit?: (data: EditProfileFormValues) => void;
   onAvatarChange?: ChangeEventHandler<HTMLInputElement>;
};

type EditProfileFieldConfig = {
   name: keyof EditProfileFormValues;
   label: string;
   placeholder: string;
   LeftIcon:
      | typeof UserOutline
      | typeof MapPin
      | typeof SearchOutline
      | typeof Globe
      | typeof SimpleFacebookIcon
      | typeof SimpleXIcon
      | typeof SimpleLinkedInIcon
      | typeof SimpleInstagramIcon;
   required?: boolean;
};

const fieldConfigs: EditProfileFieldConfig[] = [
   {
      name: 'bio',
      label: 'Bio',
      placeholder: 'Write a short bio about yourself',
      LeftIcon: UserOutline,
      required: true,
   },
   {
      name: 'location',
      label: 'Location',
      placeholder: 'Select location',
      LeftIcon: MapPin,
      required: true,
   },
   {
      name: 'learningGoal',
      label: 'What would you like to learn?',
      placeholder: 'Search options',
      LeftIcon: SearchOutline,
      required: true,
   },
   {
      name: 'website',
      label: 'Website',
      placeholder: 'Link',
      LeftIcon: Globe,
   },
   {
      name: 'facebook',
      label: 'Facebook',
      placeholder: 'Link',
      LeftIcon: SimpleFacebookIcon,
   },
   {
      name: 'x',
      label: 'X',
      placeholder: 'Link',
      LeftIcon: SimpleXIcon,
   },
   {
      name: 'linkedIn',
      label: 'LinkedIn',
      placeholder: 'Link',
      LeftIcon: SimpleLinkedInIcon,
   },
   {
      name: 'instagram',
      label: 'Instagram',
      placeholder: 'Link',
      LeftIcon: SimpleInstagramIcon,
   },
];

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

   const setHeaderTitle = useHeaderTitleStore(state => state.setHeaderTitle);

   useEffect(() => {
      setHeaderTitle('Edit Profile');
   }, [setHeaderTitle]);

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
                     Save
                  </Button>
               </form>
            </div>
         </div>
      </section>
   );
}

export default function Page() {
   return (
      <EditProfileView
         defaultValues={{
            bio: '',
            location: '',
            learningGoal: '',
            website: '',
            facebook: '',
            x: '',
            linkedIn: '',
            instagram: '',
         }}
      />
   );
}
