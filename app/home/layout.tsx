// import '../globals.css';
import { Sidebar, Tabs } from './components/nav';
import Header from './components/header';
import ContextProvider from '../context';

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ContextProvider>
         <main className="flex flex-1 h-screen overflow-y-auto  w-full max-md:flex-col">
            <Sidebar />
            <section className="col-span-10 grow overflow-y-auto flex-1">
               {children}
            </section>
            <Tabs />
         </main>
      </ContextProvider>
   );
}
