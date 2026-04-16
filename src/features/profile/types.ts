import type { ChangeEventHandler, ComponentType } from 'react';

import type IconProp from '@/components/icons/generated/IconType';

export type EditProfileFormValues = {
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

export type EditProfileFieldConfig = {
   name: keyof EditProfileFormValues;
   label: string;
   placeholder: string;
   LeftIcon: ComponentType<IconProp>;
   required?: boolean;
};


export type AchievementBadgeCardProps = {
   id?: string;
   earnedAt?: string;
   title?: string;
   description?: string;
   unlockedOn?: string;
   imageSrc?: string;
   className?: string;
};

export interface CertificateCardProps {
   id?: string;
   receivedAt?: string;
   posterSrc?: string;
   title: string;
   reception_date: string;
}


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


export type ProfileLinkItem = {
   label: string;
   value: string;
   href?: string;
};

export type ProfileLinksProps = {
   title?: string;
   items?: ProfileLinkItem[];
   className?: string;
};