import { Globe, MapPin } from 'lucide-react';

import {
   SearchOutline,
   UserOutline,
} from '@/components/icons/modified';

import type { EditProfileFieldConfig } from './types';
import {
   SimpleFacebookIcon,
   SimpleInstagramIcon,
   SimpleLinkedInIcon,
   SimpleXIcon,
} from './components/simple-brand-icon';

export const defaultAvatarSrc =
   'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340563/repo-images/public/icons/photo.png';

export const fieldConfigs: EditProfileFieldConfig[] = [
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
