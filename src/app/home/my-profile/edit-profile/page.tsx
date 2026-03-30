'use client';

import type { ChangeEventHandler, FormEventHandler } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { GalleryAdd, ArrowLeft } from '@/components/icons/modified';

const userIconSrc =
   '"https://res.cloudinary.com/dx5iohojj/image/upload/v1773340563/repo-images/public/icons/photo.png';
const locationIconSrc =
   'https://www.figma.com/api/mcp/asset/e6998dd5-6fd6-424c-b6d1-eaddf1576157';
const defaultAvatarSrc =
   'https://www.figma.com/api/mcp/asset/5c41fc93-75e3-4d01-9aa8-f6b833e0bbc1';

type EditProfileFieldProps = {
   label: string;
   placeholder?: string;
   value?: string;
   iconSrc?: string;
   type?: 'text' | 'date';
};

export type EditProfileLinkValues = {
   website?: string;
   facebook?: string;
   x?: string;
   linkedIn?: string;
   instagram?: string;
};

export type EditProfileViewProps = {
   title?: string;
   backHref?: string;
   saveLabel?: string;
   avatarSrc?: string;
   bio?: string;
   location?: string;
   learningGoal?: string;
   links?: EditProfileLinkValues;
   onSubmit?: FormEventHandler<HTMLFormElement>;
   onAvatarChange?: ChangeEventHandler<HTMLInputElement>;
};

const fieldBaseClassName =
   'flex h-14 w-full items-center gap-2 rounded-[50px] bg-white px-5 py-4 text-sm font-medium text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] outline-none transition focus-within:ring-2 focus-within:ring-primary/20';

function EditProfileField({
   label,
   placeholder,
   value,
   iconSrc,
   type = 'text',
}: EditProfileFieldProps) {
   return (
      <div className="flex w-full flex-col gap-2">
         <label className="text-base font-medium leading-6 text-[#040506]">
            {label}
         </label>
         <div className={fieldBaseClassName}>
            {iconSrc ? (
               <img
                  src={iconSrc}
                  alt=""
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
               />
            ) : null}
            <input
               type={type}
               defaultValue={value}
               placeholder={placeholder}
               className="w-full bg-transparent text-sm font-medium text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
            />
         </div>
      </div>
   );
}

export function EditProfileView({
   title = 'Edit Profile',
   backHref = '/home/my-profile',
   saveLabel = 'Save',
   avatarSrc = defaultAvatarSrc,
   bio,
   location,
   learningGoal,
   links,
   onSubmit,
   onAvatarChange,
}: EditProfileViewProps) {
   return (
      <section className="min-h-screen bg-[#f5f6fd] px-4 pb-10 pt-1 sm:px-6">
         <div className="mx-auto flex w-full max-w-[396px] flex-col items-center gap-6">
            <div className="relative flex w-full items-center justify-center pt-1">
               <Link
                  href={backHref}
                  aria-label="Go back"
                  className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
               >
                  <ArrowLeft className="h-8 w-8" />
               </Link>
               <h1 className="text-2xl font-medium leading-9 text-neutral-900">
                  {title}
               </h1>
            </div>

            <div className="relative h-24 w-24 overflow-hidden rounded-full">
               <img
                  src={avatarSrc}
                  alt="Profile"
                  className="h-full w-full object-cover"
               />
               <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/65">
                  <input
                     type="file"
                     className="sr-only"
                     accept="image/*"
                     onChange={onAvatarChange}
                  />
                  <GalleryAdd
                     className="h-6 w-6"
                     aria-hidden="true"
                  />
                  <span className="sr-only">Change profile photo</span>
               </label>
            </div>

            <form className="flex w-full flex-col items-start gap-5" onSubmit={onSubmit}>
               <EditProfileField
                  label="Bio"
                  iconSrc={userIconSrc}
                  value={bio}
                  placeholder="Write a short bio about yourself"
               />
               <EditProfileField
                  label="Location"
                  iconSrc={locationIconSrc}
                  value={location}
                  placeholder="Select Date"
               />
               <EditProfileField
                  label="What would you like to learn?"
                  value={learningGoal}
                  placeholder="Search options"
               />
               <EditProfileField
                  label="Website"
                  value={links?.website}
                  placeholder="Link"
               />
               <EditProfileField
                  label="Facebook"
                  value={links?.facebook}
                  placeholder="Link"
               />
               <EditProfileField label="X" value={links?.x} placeholder="Link" />
               <EditProfileField
                  label="LinkedIn"
                  value={links?.linkedIn}
                  placeholder="Link"
               />
               <EditProfileField
                  label="Instagram"
                  value={links?.instagram}
                  placeholder="Link"
               />

               <Button
                  type="submit"
                  className="mt-4 h-[57px] w-full rounded-[50px] bg-[#001146] px-8 py-[18px] text-lg font-medium text-white hover:bg-[#001146]/95"
               >
                  {saveLabel}
               </Button>
            </form>
         </div>
      </section>
   );
}

export default function Page() {
   return (
      <EditProfileView
         bio=""
         location=""
         learningGoal=""
         links={{
            website: '',
            facebook: '',
            x: '',
            linkedIn: '',
            instagram: '',
         }}
      />
   );
}
