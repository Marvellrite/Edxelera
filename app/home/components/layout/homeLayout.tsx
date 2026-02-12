'use client'

// import '../globals.css';
import { Sidebar, Tabs } from '../../components/nav';
import { useSidebar } from '../../context/sidebar-context';

export default function HomeLayoutContent({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { isOpen } = useSidebar();

   return (
      <main className="flex flex-1 h-screen overflow-y-auto  w-full max-md:flex-col bg-surface-home">
         <Sidebar />
         <section className={`grow overflow-y-auto flex-1 duration-600 transition-all ${isOpen ? 'md:ml-0' : 'md:ml-0'}`}>
            {children}
         </section>
         <Tabs />
      </main>
   );
}