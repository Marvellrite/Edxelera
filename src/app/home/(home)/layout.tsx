// import '../globals.css';

import Header from "../components/header";

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (

            <section className="col-span-10 grow overflow-y-auto flex-1">
               <Header />

               {children}
            </section>

   );
}
