'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { useHeaderTitleStore } from '@/stores';

type SettingsToggleKey =
   | 'pushNotifications'
   | 'emailNotifications'
   | 'darkMode';

type SettingsToggleRow = {
   type: 'toggle';
   id: SettingsToggleKey;
   label: string;
   defaultChecked?: boolean;
};

type SettingsActionRow = {
   type: 'action';
   id: string;
   label: string;
   destructive?: boolean;
};

type SettingsRow = SettingsToggleRow | SettingsActionRow;

type SettingsSection = {
   id: string;
   title: string;
   rows: SettingsRow[];
};

export type SettingsViewProps = {
   title?: string;
   sections?: SettingsSection[];
   onAction?: (id: string) => void;
   onToggleChange?: (id: SettingsToggleKey, checked: boolean) => void;
};

const defaultSections: SettingsSection[] = [
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

type TogglePillProps = {
   checked: boolean;
   onChange: (checked: boolean) => void;
   label: string;
};

function TogglePill({ checked, onChange, label }: TogglePillProps) {
   return (
      <button
         type="button"
         role="switch"
         aria-checked={checked}
         aria-label={label}
         onClick={() => onChange(!checked)}
         className={`flex h-10 w-[72px] items-center rounded-full px-4 transition-colors duration-200 ${
            checked ? 'justify-end bg-primary/15' : 'justify-start bg-[#F3F3F3]'
         }`}
      >
         <span
            className={`block rounded-full transition-all duration-200 ${
               checked
                  ? 'size-5 bg-primary shadow-[0_4px_14px_rgba(0,17,70,0.22)]'
                  : 'size-4 bg-[#939393]'
            }`}
         />
      </button>
   );
}

type SettingsRowItemProps = {
   row: SettingsRow;
   checked?: boolean;
   onToggleChange?: (id: SettingsToggleKey, checked: boolean) => void;
   onAction?: (id: string) => void;
};

function SettingsRowItem({
   row,
   checked,
   onToggleChange,
   onAction,
}: SettingsRowItemProps) {
   const commonClassName =
      'flex h-14 w-full items-center justify-between gap-2 rounded-xl bg-white px-5 py-4 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.01)] transition-colors duration-200 hover:bg-white/90 md:px-6';

   if (row.type === 'toggle') {
      return (
         <div className={commonClassName}>
            <span className="text-sm font-medium leading-[150%] text-[#2C2C2C]">
               {row.label}
            </span>
            <TogglePill
               label={row.label}
               checked={Boolean(checked)}
               onChange={(nextChecked) => onToggleChange?.(row.id, nextChecked)}
            />
         </div>
      );
   }

   return (
      <button
         type="button"
         className={commonClassName}
         onClick={() => onAction?.(row.id)}
      >
         <span
            className={`text-sm font-medium leading-[150%] ${
               row.destructive ? 'text-[#6C0507]' : 'text-[#2C2C2C]'
            }`}
         >
            {row.label}
         </span>
         <ChevronRight className="size-6 text-[#494949]" strokeWidth={2} />
      </button>
   );
}

export function SettingsView({
   title = 'Settings',
   sections = defaultSections,
   onAction,
   onToggleChange,
}: SettingsViewProps) {
   const [toggleState, setToggleState] = useState<Record<string, boolean>>({});
   const setHeaderTitle = useHeaderTitleStore((state) => state.setHeaderTitle);

   useEffect(() => {
      setHeaderTitle(title);
   }, [setHeaderTitle, title]);

   const defaultToggleState = useMemo(() => {
      const initialState: Record<string, boolean> = {};

      sections.forEach((section) => {
         section.rows.forEach((row) => {
            if (row.type === 'toggle') {
               initialState[row.id] = Boolean(row.defaultChecked);
            }
         });
      });

      return initialState;
   }, [sections]);

   useEffect(() => {
      setToggleState(defaultToggleState);
   }, [defaultToggleState]);

   const handleToggleChange = (id: SettingsToggleKey, checked: boolean) => {
      setToggleState((currentState) => ({
         ...currentState,
         [id]: checked,
      }));
      onToggleChange?.(id, checked);
   };

   return (
      <section className="min-h-screen bg-background px-4 pb-10 pt-5 sm:px-6 sm:pb-14 md:pt-6 lg:px-8 lg:pb-16 xl:pb-20">
         <div className="mx-auto flex w-full max-w-[820px] flex-col gap-6 md:max-w-[860px] lg:gap-7 xl:max-w-[960px] xl:gap-8">
            <div className="flex flex-col gap-9 lg:gap-10 xl:gap-11">
               {sections.map((section) => (
                  <section
                     key={section.id}
                     className="space-y-3 md:space-y-3.5"
                  >
                     <h2 className="text-base font-normal leading-[150%] text-primary">
                        {section.title}
                     </h2>

                     <div className="space-y-2 md:space-y-2.5">
                        {section.rows.map((row) => (
                           <SettingsRowItem
                              key={row.id}
                              row={row}
                              checked={
                                 row.type === 'toggle'
                                    ? toggleState[row.id]
                                    : undefined
                              }
                              onAction={onAction}
                              onToggleChange={handleToggleChange}
                           />
                        ))}
                     </div>
                  </section>
               ))}
            </div>
         </div>
      </section>
   );
}

const Page = () => {
   return <SettingsView />;
};

export default Page;
