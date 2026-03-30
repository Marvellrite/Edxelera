// import '../globals.css';

import Header from "../../../components/shared/headers/header";

export default function MyCoursessLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <section className="col-span-10 grow overflow-y-auto flex-1 mx-auto px-4 lg:px-11.25">

         <Header />

         <div className=' pt-6 py-12'>
         {children}
         </div>
      </section>
   );
}
