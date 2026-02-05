'use client'

// import '../globals.css';
import { Sidebar, Tabs } from './components/nav';
// import Header from './components/header';
import ContextProvider from '../context';
import { SidebarProvider, useSidebar } from './context/sidebar-context';

function HomeLayoutContent({
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

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ContextProvider>
         <SidebarProvider>
            <HomeLayoutContent>{children}</HomeLayoutContent>
         </SidebarProvider>
      </ContextProvider>
   );
}
