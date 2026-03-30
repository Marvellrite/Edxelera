import type { SettingsSection } from './types';

export const defaultSections: SettingsSection[] = [
   {
      id: 'notifications',
      title: 'Notifications',
      rows: [
         {
            type: 'toggle',
            id: 'pushNotifications',
            label: 'Allow Push Notifications',
            defaultChecked: false,
         },
         {
            type: 'toggle',
            id: 'emailNotifications',
            label: 'Allow Email Notifications',
            defaultChecked: false,
         },
      ],
   },
   {
      id: 'payment-and-billing',
      title: 'Payment & Billing',
      rows: [
         { type: 'action', id: 'payment-methods', label: 'Payment Methods' },
         { type: 'action', id: 'payment-history', label: 'Payment History' },
      ],
   },
   {
      id: 'preference',
      title: 'Preference',
      rows: [
         {
            type: 'toggle',
            id: 'darkMode',
            label: 'Dark mode',
            defaultChecked: false,
         },
      ],
   },
   {
      id: 'support-and-legal',
      title: 'Support & Legal',
      rows: [
         { type: 'action', id: 'help-center', label: 'Help Center/ FAQs' },
         { type: 'action', id: 'contact-support', label: 'Contact Support' },
         { type: 'action', id: 'terms', label: 'Terms of Service' },
         { type: 'action', id: 'privacy', label: 'Privacy Policy' },
      ],
   },
   {
      id: 'account',
      title: 'Account',
      rows: [
         { type: 'action', id: 'change-email', label: 'Change Email' },
         { type: 'action', id: 'change-password', label: 'Change Password' },
         { type: 'action', id: 'forgot-password', label: 'Forgot Password' },
         { type: 'action', id: 'activity-log', label: 'Activity Log' },
         {
            type: 'action',
            id: 'delete-account',
            label: 'Delete Account',
            destructive: true,
         },
      ],
   },
];
