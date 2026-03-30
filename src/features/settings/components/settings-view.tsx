'use client';

import { useEffect, useMemo, useState } from 'react';

import { useHeaderTitleStore } from '@/stores';

import { defaultSections } from '../constants';
import type { SettingsToggleKey, SettingsViewProps } from '../types';
import SettingsRowItem from './settings-row-item';

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
