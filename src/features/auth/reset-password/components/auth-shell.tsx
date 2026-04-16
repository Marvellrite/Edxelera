'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';

import { RESET_PASSWORD_LOGO } from '../constants';

const AuthShell = ({
   title,
   description,
   children,
}: {
   title: string;
   description: string;
   children: ReactNode;
}) => (
   <section className="flex min-h-screen items-center justify-center py-6 sm:py-10 lg:py-16.25">
      <div className="w-full rounded-[20px] border border-neutral-400 bg-surface px-4 py-7.5 sm:px-5 md:max-w-117 relative">
         <div className="mx-auto w-53.5">
            <Image
               className="h-auto w-full"
               src={RESET_PASSWORD_LOGO}
               alt="Edxelera Logo"
               width={256}
               height={108}
            />
         </div>

         <div className="mb-6 mt-8 space-y-2">
            <h1 className="text-3xl font-medium text-black md:text-4xl">
               {title}
            </h1>
            <p className="text-neutral-600">{description}</p>
         </div>

         {children}
      </div>
   </section>
);

export default AuthShell;