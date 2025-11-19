// import '../globals.css';
import { Sidebar, Tabs } from './_components/nav';
import Header from './_components/header';
import ContextProvider from '../context';

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ContextProvider>
         <main className="flex flex-col md:grid md:grid-cols-12 h-screen">
            <Sidebar />
            <section className="col-span-10 h-full">
               <Header />
               {children}
            </section>
            <Tabs />
         </main>
      </ContextProvider>
   );
}
