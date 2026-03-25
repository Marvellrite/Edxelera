'use client'

import { cn } from '@/lib/utils';
// import '../globals.css';
import { Tabs } from '../../components/nav';
import { useSidebar } from '../../context/sidebar-context';
import Sidebar from '@/components/admin_and_instructors/sidebar';

export default function HomeLayoutContent({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { isOpen } = useSidebar();

   return (
      <main className="flex flex-1 h-screen overflow-y-auto  w-full max-md:flex-col bg-surface-home">
         <Sidebar />
         <section className={cn('@container grow overflow-y-auto flex-1 duration-600 transition-all md:p-0 p-5', isOpen ? 'md:ml-0' : 'md:ml-0')}>
            {children}
         </section>
         <Tabs />
      </main>
   );
}
