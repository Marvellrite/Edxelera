import { User } from "@/components/icons/modified";
import EditProfileDialogue from "./edit_profile_dialog";
import ProfileLinks, { type ProfileLinkItem } from "./profile-links";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type ProfileSummaryProps = {
  name: string;
  email: string;
  dateOfBirth: string;
  location: string;
  dateJoined: string;
  bio: string;
};

export type PersonalInfoProps = ProfileSummaryProps & {
  linksTitle?: string;
  links?: ProfileLinkItem[];
};

export function ProfileSummary({
  name,
  email,
  dateOfBirth,
  location,
  dateJoined,
  bio,
}: ProfileSummaryProps) {
  return (
    <div className="space-y-3">
      <p className="font-normal text-md">Personal Information</p>
      <div className="flex flex-col items-start justify-between gap-x-3 gap-y-5 md:flex-row md:items-center">
        <div className="flex items-center gap-x-4">
          <div className="flex size-24 items-center justify-center rounded-[100px] bg-neutral-50">
            <User />
          </div>
          <div>
            <h1 className="text-[24px] font-medium">{name}</h1>
            <span className="font-normal text-neutral-600">{email}</span>
          </div>
        </div>

        <div>
          <div className="font-normal text-neutral-600">Date of Birth</div>
          <div className="font-normal text-base">{dateOfBirth}</div>
        </div>

        <div>
          <div className="font-normal text-neutral-600">Location</div>
          <div className="font-normal text-base">{location}</div>
        </div>

        <div>
          <div className="font-normal text-neutral-600">Date Joined</div>
          <div className="font-normal text-base">{dateJoined}</div>
        </div>
      </div>
      <div className="space-y-0.5">
        <span className="font-normal text-neutral-600">Bio</span>
        <p className="font-normal text-base">{bio}</p>
      </div>
      <div className=' flex justify-center md:justify-start'>
        <Button className='text-[14px] py-3 px-6 h-11.25 w-29.75' asChild variant='outline'><Link href={'/home/my-profile/edit-profile'}>Edit Profile</Link></Button>
      </div>
    </div>
  );
}

export default function PersonalInfo({
  linksTitle,
  links,
  ...profileSummary
}: PersonalInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10">
      <ProfileSummary {...profileSummary} />
      <ProfileLinks title={linksTitle} items={links} />
    </div>
  );
}
 
