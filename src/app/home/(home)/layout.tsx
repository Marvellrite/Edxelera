// import '../globals.css';

import Header from "../../../components/shared/headers/header";

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (

            <section className="col-span-10 grow flex-1 relative">
               <Header />

               {children}
            </section>

   );
}
