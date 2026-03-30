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
