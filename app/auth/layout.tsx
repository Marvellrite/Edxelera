import Image from 'next/image';
// import '../globals.css';

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <section className="grid grid-cols-1 lg:grid-cols-10 grid-rows-1 h-screen w-full relative">
         <div className="relative hidden lg:block col-span-5">
            <Image
               
               src="/assets/auth.png"
               alt="side image"
               className=" object-cover"
               fill
            />
            <div className="absolute w-full h-full bg-linear-to-b from-text/75 to-text/40"></div>
         </div>
         <div className="col-span-5 w-full overflow-y-auto  md:bg-[url('/assets/auth.png')] bg-cover bg-no-repeat lg:bg-none bg-surface">{children}</div>
      </section>
   );
}
